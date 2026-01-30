"use server";

import { createChat, createMessage, deleteChat } from "@/lib/queries";
import { getUserInfo } from "./auth";
import Pusher from "pusher";
import { revalidatePath } from "next/cache";

export async function createChatAction(formData: FormData) {
  const name = formData.get("name") as string;
  const members = formData.get("members") as string;
  const user = await getUserInfo();
  if (JSON.parse(members).length === 0) {
    return {
      message: "Cannot have 0 members",
    };
  }
  if (members) {
    try {
      const newMembers = JSON.parse(members);
      newMembers.push(user?.id);
      await createChat(name, newMembers);
    } catch (err) {
      if (err instanceof Error) {
        return {
          message: err.message,
        };
      }
    }
  }
  revalidatePath("/chat");
}

export async function deleteChatAction(formData: FormData) {
  const id = formData.get("id") as string;
  try {
    await deleteChat(id);
  } catch (err) {
    if (err instanceof Error) {
      return {
        message: err.message,
      };
    }
  }
  revalidatePath("/chat");
}

export async function createMessageAction(formData: FormData) {
  const newMessage = formData.get("message") as string;
  const chat = formData.get("chatId") as string;
  const user = await getUserInfo();
  const currentMessage = await createMessage(
    newMessage,
    user?.id as string,
    chat,
  );
  const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID!,
    key: process.env.NEXT_PUBLIC_PUSHER_KEY!,
    secret: process.env.PUSHER_SECRET!,
    cluster: "eu",
    useTLS: true,
  });
  await pusher.trigger(chat, "chat", {
    ...currentMessage,
    senderName: user?.name,
    senderImage: user?.image,
  });
}
