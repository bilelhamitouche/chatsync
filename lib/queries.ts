import { isAuthenticated } from "@/actions/auth";
import { chat, chatMember, db, message, user } from "./drizzle";
import { DrizzleError, eq } from "drizzle-orm";

export async function getUsers() {
  await isAuthenticated();
  try {
    const users = await db.select().from(user);
    return users;
  } catch (err) {
    if (err instanceof DrizzleError) {
      return err.message;
    }
  }
}

export async function getChatMessages(chatId: string) {
  await isAuthenticated();
  try {
    const messages = await db
      .select()
      .from(message)
      .fullJoin(chatMember, eq(message.senderId, chatMember.userId))
      .where(eq(chatMember.chatId, chatId));
    return messages;
  } catch (err) {
    if (err instanceof DrizzleError) {
      return err.message;
    }
  }
}

export async function createMessage(
  content: string,
  senderId: string,
  chatId: string,
) {
  await isAuthenticated();
  try {
    const newMessage = await db
      .insert(message)
      .values({ content, senderId, chatId });
    return newMessage;
  } catch (err) {
    if (err instanceof DrizzleError) {
      return err.message;
    }
  }
}

export async function createChat(name: string, memberIds: string[]) {
  await isAuthenticated();
  try {
    await db.transaction(async (tx) => {
      const newChat = await tx.insert(chat).values({ name }).returning();
      const memberData = memberIds.map((member) => ({
        chatId: newChat[0].id,
        userId: member,
      }));
      await tx.insert(chatMember).values(memberData);
    });
  } catch (err) {
    if (err instanceof DrizzleError) {
      return err.message;
    }
  }
}
