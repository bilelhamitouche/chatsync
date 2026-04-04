import { Inject, Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { DATABASE_CONNECTION } from 'src/database/database-connection';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../database/schema';
import { and, desc, eq, exists, ilike, or } from 'drizzle-orm';

@Injectable()
export class ChatsService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly database: NodePgDatabase<typeof schema>,
  ) {}

  async create(createChatDto: CreateChatDto, adminId: string) {
    const chat = await this.database
      .insert(schema.chats)
      .values(createChatDto)
      .returning();
    const members = createChatDto.members.map((member) => ({
      memberId: member,
      chatId: chat[0].id,
      isAdmin: false,
    }));
    const chatMembers = await this.database
      .insert(schema.chatMembers)
      .values([
        ...members,
        { memberId: adminId, chatId: chat[0].id, isAdmin: true },
      ])
      .returning({
        id: schema.chatMembers.memberId,
        isAdmin: schema.chatMembers.isAdmin,
      });
    return { ...chat[0], members: chatMembers };
  }

  async findAll(userId: string, search: string = '') {
    const rows = await this.database
      .select({
        chat: schema.chats,
        member: {
          id: schema.users.id,
          name: schema.users.name,
          avatar: schema.users.avatar,
          isAdmin: schema.chatMembers.isAdmin,
        },
        lastMessage: {
          content: schema.messages.content,
          sentAt: schema.messages.sentAt,
        },
      })
      .from(schema.chats)
      .leftJoin(
        schema.chatMembers,
        eq(schema.chats.id, schema.chatMembers.chatId),
      )
      .leftJoin(schema.users, eq(schema.chatMembers.memberId, schema.users.id))
      .leftJoin(schema.messages, eq(schema.chats.id, schema.messages.chatId))
      .where(
        and(
          or(
            ilike(schema.chats.name, `%${search}%`),
            ilike(schema.users.name, `%${search}%`),
          ),
          exists(
            this.database
              .select()
              .from(schema.chatMembers)
              .where(
                and(
                  eq(schema.chatMembers.chatId, schema.chats.id),
                  eq(schema.chatMembers.memberId, userId),
                ),
              ),
          ),
        ),
      )
      .orderBy(desc(schema.messages.sentAt));

    const chatsMap = new Map();
    for (const row of rows) {
      if (!chatsMap.has(row.chat.id)) {
        chatsMap.set(row.chat.id, {
          ...row.chat,
          members: [],
          lastMessage: row.lastMessage,
        });
      }
      if (row.member?.id) {
        chatsMap.get(row.chat.id).members.push(row.member);
      }
    }

    return Array.from(chatsMap.values());
  }

  async findMessagesById(chatId: string) {
    const messages = await this.database
      .select({
        id: schema.messages.id,
        content: schema.messages.content,
        imageUrl: schema.messages.imageUrl,
        senderId: schema.messages.senderId,
        senderName: schema.users.name,
        senderAvatar: schema.users.avatar,
        sentAt: schema.messages.sentAt,
        updatedAt: schema.messages.updatedAt,
      })
      .from(schema.messages)
      .leftJoin(schema.users, eq(schema.messages.senderId, schema.users.id))
      .where(eq(schema.messages.chatId, chatId));
    return messages;
  }

  async findById(id: string) {
    const chat = await this.database
      .select()
      .from(schema.chats)
      .leftJoin(
        schema.chatMembers,
        eq(schema.users.id, schema.chatMembers.memberId),
      )
      .where(eq(schema.chats.id, id));
    return chat[0];
  }

  async findMembersByChatId(chatId: string) {
    const members = await this.database
      .select({
        id: schema.chatMembers.memberId,
        name: schema.users.name,
        avatar: schema.users.avatar,
      })
      .from(schema.chatMembers)
      .leftJoin(schema.users, eq(schema.chatMembers.memberId, schema.users.id))
      .where(eq(schema.chatMembers.chatId, chatId));
    return members;
  }

  async leaveChat(userId: string, chatId: string) {
    const members = await this.findMembersByChatId(chatId);
    if (members.length <= 2) {
      await this.remove(chatId);
    } else {
      await this.database
        .delete(schema.chatMembers)
        .where(
          and(
            eq(schema.chatMembers.memberId, userId),
            eq(schema.chatMembers.chatId, chatId),
          ),
        );
    }
  }

  async update(id: string, updateChatDto: UpdateChatDto) {
    const updatedChat = await this.database
      .update(schema.chats)
      .set(updateChatDto)
      .where(eq(schema.chats.id, id))
      .returning();
    return updatedChat[0];
  }

  async remove(id: string) {
    const deletedChat = await this.database
      .delete(schema.chats)
      .where(eq(schema.chats.id, id))
      .returning();
    return deletedChat[0];
  }
}
