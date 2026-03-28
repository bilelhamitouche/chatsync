import { pgEnum } from 'drizzle-orm/pg-core';

export const userRole = pgEnum('user_role', ['Admin', 'User']);

export const messageType = pgEnum('message_type', ['Text', 'Image', 'Mixed']);
