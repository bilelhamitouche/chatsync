import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function getChats() {
  const response = await fetch("/api/chats");
  const chats = await response.json();
  return chats;
}

export async function getUsers() {
  const response = await fetch("/api/users");
  const users = await response.json();
  return users;
}
