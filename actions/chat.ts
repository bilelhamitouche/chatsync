"use server";

import { createChat } from "@/lib/queries";
import { getUserInfo } from "./auth";

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
  const user = await getUserInfo();
}
