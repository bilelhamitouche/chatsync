import { uuid } from 'drizzle-orm/pg-core';
import { pgTable } from 'drizzle-orm/pg-core';
import { users } from './users';
import { chats } from './chats';
import { timestamp } from 'drizzle-orm/pg-core';
import { boolean } from 'drizzle-orm/pg-core';

export const chatMembers = pgTable('chat_members', {
  memberId: uuid('member_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
  chatId: uuid('chat_id')
    .notNull()
    .references(() => chats.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
  isAdmin: boolean('is_admin').default(false),
  joinedAt: timestamp('joined_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .$onUpdate(() => new Date()),
});
