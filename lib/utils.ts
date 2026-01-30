import { clsx, type ClassValue } from "clsx";
import { formatDistanceToNow } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function getChats() {
  const response = await fetch("/api/chats");
  if (!response.ok) {
    throw new Error("Failed to fetch chats");
  }
  const chats = await response.json();
  return chats;
}

export async function getUsers() {
  const response = await fetch("/api/users");
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }
  const users = await response.json();
  return users;
}

export async function getChatMessages(chatId: string) {
  const response = await fetch(`/api/${chatId}/messages`);
  if (!response.ok) {
    throw new Error("Failed to fetch messages");
  }
  const messages = await response.json();
  return messages;
}

export async function getUsersAndChats() {
  const [users, chats] = await Promise.all([getUsers(), getChats()]);
  return { users, chats };
}

export function formatDate(createdAt: Date) {
  return formatDistanceToNow(new Date(createdAt), { addSuffix: true });
}
