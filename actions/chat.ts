"use server";

import { createChat, createMessage } from "@/lib/queries";
import { getUserInfo } from "./auth";
import Pusher from "pusher";

export async function createChatAction(formData: FormData) {
  const name = formData.get("name") as string;
  const members = formData.get("members") as string;
  const user = await getUserInfo();
  if (members) {
    const newMembers = JSON.parse(members);
    newMembers.push(user?.id);
    await createChat(name, newMembers);
  }
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
