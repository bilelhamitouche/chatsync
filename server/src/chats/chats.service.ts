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
    const chatMembers = createChatDto.members.map((member) => ({
      memberId: member,
      chatId: chat[0].id,
      isAdmin: false,
    }));
    await this.database
      .insert(schema.chatMembers)
      .values([
        ...chatMembers,
        { memberId: adminId, chatId: chat[0].id, isAdmin: true },
      ]);
    return chat[0];
  }

  async findAll(userId: string, search: string = '') {
    const rows = await this.database
      .select({
        chat: schema.chats,
        member: {
          id: schema.users.id,
          name: schema.users.name,
          avatar: schema.users.avatar,
        },
      })
      .from(schema.chats)
      .leftJoin(
        schema.chatMembers,
        eq(schema.chats.id, schema.chatMembers.chatId),
      )
      .leftJoin(schema.users, eq(schema.chatMembers.memberId, schema.users.id))
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
      );

    const chatsMap = new Map();
    for (const row of rows) {
      if (!chatsMap.has(row.chat.id)) {
        chatsMap.set(row.chat.id, { ...row.chat, members: [] });
      }
      if (row.member?.id) {
        chatsMap.get(row.chat.id).members.push(row.member);
      }
    }

    return Array.from(chatsMap.values());
  }

  async findLastMessage(id: string) {
    const lastMessage = await this.database
      .selectDistinct({
        content: schema.messages.content,
        updatedAt: schema.messages.updatedAt,
      })
      .from(schema.messages)
      .where(eq(schema.messages.chatId, id))
      .orderBy(desc(schema.messages.sentAt))
      .limit(1);
    return lastMessage[0];
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
