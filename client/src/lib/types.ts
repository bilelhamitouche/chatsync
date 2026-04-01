import type { QueryClient } from "@tanstack/react-query";

export interface RouterContext {
  queryClient: QueryClient;
  isAuthenticated: boolean;
}

export interface Member {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
  role: "Admin" | "User";
  refreshToken: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
  role: "Admin" | "User";
  refreshToken: string | null;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Chat {
  id: string;
  name: string | null;
  isGroup: boolean;
  image: string | null;
  creatorId: string;
  createdAt: Date;
  updatedAt: Date;
  members: Pick<Member, "name" | "id" | "avatar">[];
  lastMessage: Pick<Message, "content" | "sentAt" | "imageUrl">;
}

export interface Message {
  id: string;
  content: string | null;
  imageUrl: string | null;
  chatId: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  sentAt: Date;
  updatedAt: Date;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface CreateGroupData {
  name: string;
  members: string[];
  isGroup: boolean;
}

export interface CreateDmData {
  members: string[];
  isGroup: boolean;
}

export interface CreateMessageData {
  content: string;
  chatId: string;
}

export interface UpdateProfileInfoData {
  name?: string;
  email?: string;
  avatar?: string;
}

export interface UpdatePasswordData {
  currentPassword: string;
  password: string;
}

export interface DeleteAccountData {
  password: string;
}
