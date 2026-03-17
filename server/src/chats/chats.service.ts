import { Inject, Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { DATABASE_CONNECTION } from 'src/database/database-connection';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../database/schema';
import { eq, ilike, or } from 'drizzle-orm';

@Injectable()
export class ChatsService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly database: NodePgDatabase<typeof schema>,
  ) {}

  async create(createChatDto: CreateChatDto) {
    const chat = await this.database
      .insert(schema.chats)
      .values(createChatDto)
      .returning();
    return chat[0];
  }

  async findAll(search: string) {
    return this.database
      .select({
        chat: schema.chats,
        members: {
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
        or(ilike(schema.chats.name, search), ilike(schema.users.name, search)),
      );
  }

  async findById(id: string) {
    const chat = await this.database
      .select()
      .from(schema.chats)
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
