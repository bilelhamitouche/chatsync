import { getUserInfo, isAuthenticated } from "@/actions/auth";
import { chat, chatMember, db, message, user } from "./drizzle";
import { eq } from "drizzle-orm";

export async function getUsers() {
  await isAuthenticated();
  try {
    const users = await db.select().from(user);
    return users;
  } catch (err) {
    throw new Error("Database Error");
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
    throw new Error("Database Error");
  }
}

export async function getChats() {
  const userInfo = await getUserInfo();
  await isAuthenticated();
  try {
    const chats = await db
      .select()
      .from(chat)
      .leftJoin(chatMember, eq(chat.id, chatMember.chatId))
      .leftJoin(user, eq(chatMember.userId, user.id))
      .where(eq(chatMember.userId, userInfo?.id as string));
    console.log(chats);
    return chats;
  } catch (err) {
    throw new Error("Database Error");
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
    throw new Error("Database Error");
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
    throw new Error("Database Error");
  }
}
