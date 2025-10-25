import { getUserInfo, isAuthenticated } from "@/actions/auth";
import { chat, chatMember, db, message, user } from "./drizzle";
import { DrizzleError, eq } from "drizzle-orm";

export async function getUsers() {
  await isAuthenticated();
  try {
    const users = await db.select().from(user);
    return users;
  } catch (err) {
    if (err instanceof DrizzleError) {
      throw new Error("Database Error");
    }
  }
}

export async function getChatMessages(chatId: string) {
  await isAuthenticated();
  try {
    const messages = await db
      .select({
        id: message.id,
        content: message.content,
        senderId: message.senderId,
        createdAt: message.createdAt,
        senderImage: user.image,
        senderName: user.name,
      })
      .from(message)
      .leftJoin(chatMember, eq(message.senderId, chatMember.userId))
      .leftJoin(user, eq(chatMember.userId, user.id))
      .where(eq(message.chatId, chatId));
    return messages;
  } catch (err) {
    if (err instanceof DrizzleError) {
      throw new Error("Database Error");
    }
  }
}

export async function getChatMemberInfo(chatId: string) {
  await isAuthenticated();
  try {
    const memberInfo = await db
      .select({ id: user.id, name: user.name, imageUrl: user.image })
      .from(chat)
      .fullJoin(chatMember, eq(chat.id, chatMember.chatId))
      .fullJoin(user, eq(chatMember.userId, user.id))
      .where(eq(chatMember.chatId, chatId));
    return memberInfo;
  } catch (err) {
    if (err instanceof DrizzleError) {
      throw new Error("Database Error");
    }
  }
}

export async function getChats() {
  const userInfo = await getUserInfo();
  await isAuthenticated();
  try {
    const chats = await db
      .select({
        id: chat.id,
        name: chat.name,
        userName: user.name,
        userImage: user.image,
      })
      .from(chat)
      .leftJoin(chatMember, eq(chat.id, chatMember.chatId))
      .leftJoin(user, eq(chatMember.userId, user.id))
      .where(eq(chatMember.userId, userInfo?.id as string));
    return chats;
  } catch (err) {
    if (err instanceof DrizzleError) {
      throw new Error("Database Error");
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
      .values({ content, senderId, chatId })
      .returning();
    return newMessage[0];
  } catch (err) {
    if (err instanceof DrizzleError) {
      throw new Error("Database Error");
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
      throw new Error("Database Error");
    }
  }
}

export async function deleteChat(id: string) {
  await isAuthenticated();
  try {
    await db.delete(chat).where(eq(chat.id, id));
  } catch (err) {
    if (err instanceof DrizzleError) {
      throw new Error("Database Error");
    }
  }
}
