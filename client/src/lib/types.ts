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
}

export interface CreateDmData {
  member: string;
}
