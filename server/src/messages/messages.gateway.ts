import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessagesService } from './messages.service';
import { UseGuards } from '@nestjs/common';
import { WsJwtAuthGuard } from 'src/auth/guards/jwt-ws.guard';
import { ChatsService } from 'src/chats/chats.service';
import { CreateChatDto } from 'src/chats/dto/create-chat.dto';
import { UpdateChatDto } from 'src/chats/dto/update-chat.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@WebSocketGateway({
  cors: {
    origin: ['http://localhost:3000', 'https://chatsync-ochre.vercel.app'],
    credentials: true,
  },
})
export class MessagesGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  private connectedUsers = new Map<string, string>();

  constructor(
    private messagesService: MessagesService,
    private chatsService: ChatsService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  handleConnection(client: Socket) {
    console.log(`Client connected ${client.id}`);
    try {
      const token = client.handshake.headers.cookie
        ?.split(';')
        .find((c) => c.trim().startsWith('Authentication='))
        ?.split('=')[1];

      if (!token) {
        client.disconnect();
        return;
      }

      const payload = this.jwtService.verify(token, {
        secret: this.configService.getOrThrow('JWT_ACCESS_TOKEN_SECRET'),
      });

      client.data.userId = payload.sub;
      this.connectedUsers.set(payload.sub, client.id);
      console.log('Connected users:', this.connectedUsers);
    } catch {
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected ${client.id}`);
    const userId = client.data.userId;
    if (userId) {
      this.connectedUsers.delete(userId);
    }
  }

  @SubscribeMessage('join_room')
  handleJoinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() chatId: string,
  ) {
    client.join(chatId);
  }

  @SubscribeMessage('leave_room')
  handleLeaveRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() chatId: string,
  ) {
    client.leave(chatId);
  }

  @UseGuards(WsJwtAuthGuard)
  @SubscribeMessage('send_message')
  async handleMessage(
    @MessageBody() data: CreateMessageDto,
    @ConnectedSocket() client: Socket,
  ) {
    const user = client.data.user;
    const message = await this.messagesService.create(user.sub, data);
    this.server.to(data.chatId).emit('receive_message', message);
  }

  @UseGuards(WsJwtAuthGuard)
  @SubscribeMessage('create_chat')
  async handleCreateChat(
    @MessageBody() data: CreateChatDto,
    @ConnectedSocket() client: Socket,
  ) {
    const user = client.data.user;
    try {
      console.log('Creating');
      const chat = await this.chatsService.create(data, user.sub);
      chat.members.forEach((member) => {
        if (member.id === user.sub) return;
        console.log('Looking up member:', member.id);
        const socketId = this.connectedUsers.get(member.id);
        console.log('Found socketId:', socketId);
        if (socketId) {
          this.server.to(socketId).emit('chat_created', chat);
        }
      });
      return {
        success: true,
        chat,
      };
    } catch (error) {
      console.error(error);
      return {
        error: 'Failed to create chat',
      };
    }
  }

  @UseGuards(WsJwtAuthGuard)
  @SubscribeMessage('edit_chat')
  async handleEditChat(
    @MessageBody() updateChatDto: UpdateChatDto,
    @ConnectedSocket() client: Socket,
  ) {
    const user = client.data.user;
    try {
      console.log('Editing');
      const updatedChat = await this.chatsService.update(
        updateChatDto.chatId,
        updateChatDto,
      );
      const members = await this.chatsService.findMembersByChatId(
        updatedChat.id,
      );
      members.forEach((member) => {
        if (member.id === user.sub) return;
        const socketId = this.connectedUsers.get(member.id);
        if (socketId) {
          this.server.to(socketId).emit('chat_edited', updatedChat.id);
        }
      });
      return {
        success: true,
        updatedChat,
      };
    } catch (err: any) {
      client.emit('error', { message: err.message });
      return {
        error: 'Failed to create chat',
      };
    }
  }

  @UseGuards(WsJwtAuthGuard)
  @SubscribeMessage('leave_chat')
  async handleLeaveChat(
    @MessageBody() chatId: string,
    @ConnectedSocket() client: Socket,
  ) {
    const user = client.data.user;
    try {
      console.log('Leaving');
      await this.chatsService.leaveChat(user.sub, chatId);
      const members = await this.chatsService.findMembersByChatId(chatId);
      members.forEach((member) => {
        if (member.id === user.sub) return;
        const socketId = this.connectedUsers.get(member.id);
        if (socketId) {
          this.server.to(socketId).emit('chat_left');
        }
      });
      return {
        success: true,
      };
    } catch (err) {
      client.emit('error', { message: err.message });
      return {
        error: 'Failed to leave chat',
      };
    }
  }

  @UseGuards(WsJwtAuthGuard)
  @SubscribeMessage('delete_chat')
  async handleDeleteChat(
    @MessageBody() chatId: string,
    @ConnectedSocket() client: Socket,
  ) {
    const user = client.data.user;
    try {
      console.log('Deleting');
      const members = await this.chatsService.findMembersByChatId(chatId);
      await this.chatsService.remove(chatId);
      members.forEach((member) => {
        if (member.id === user.sub) return;
        const socketId = this.connectedUsers.get(member.id);
        if (socketId) {
          this.server.to(socketId).emit('chat_left');
        }
      });
      this.server.to(chatId).emit('chat_deleted');
      return {
        success: true,
      };
    } catch (err) {
      client.emit('error', { message: err.message });
      return {
        error: 'Failed to delete chat',
      };
    }
  }
}
