import { Inject, Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { DATABASE_CONNECTION } from 'src/database/database-connection';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../database/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class MessagesService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly database: NodePgDatabase<typeof schema>,
  ) {}

  async create(senderId: string, createMessageDto: CreateMessageDto) {
    const message = await this.database
      .insert(schema.messages)
      .values({ senderId, ...createMessageDto })
      .returning();
    return message[0];
  }

  async findAll() {
    return `This action returns all messages`;
  }

  async findById(id: string) {
    const message = await this.database
      .selectDistinct()
      .from(schema.messages)
      .where(eq(schema.messages.id, id));
    return message[0];
  }

  async update(id: string, updateMessageDto: UpdateMessageDto) {
    const updatedMessage = await this.database
      .update(schema.messages)
      .set(updateMessageDto)
      .where(eq(schema.messages.id, id))
      .returning();
    return updatedMessage[0];
  }

  async remove(id: string) {
    await this.database
      .delete(schema.messages)
      .where(eq(schema.messages.id, id));
  }
}
