"use server";

import { createChat } from "@/lib/queries";
import { revalidatePath } from "next/cache";

export async function createChatAction(formData: FormData) {
  const name = formData.get("name") as string;
  const members = JSON.parse(formData.get("members") as string);
  await createChat(name, members);
  revalidatePath("/chat");
}
