import { text, timestamp } from 'drizzle-orm/pg-core';
import { uuid } from 'drizzle-orm/pg-core';
import { pgTable } from 'drizzle-orm/pg-core';
import { users } from './users';
import { chats } from './chats';
import { messageType } from './enums';

export const messages = pgTable('messages', {
  id: uuid('id').primaryKey().defaultRandom(),
  type: messageType('type'),
  content: text('content'),
  imageUrl: text('image_url'),
  senderId: uuid('sender_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
  chatId: uuid('chat_id')
    .notNull()
    .references(() => chats.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
  sentAt: timestamp('sent_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .$onUpdate(() => new Date()),
});
