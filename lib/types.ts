export type ChatMessage = {
  id: string;
  content: string;
  senderId: string;
  senderName: string | null;
  senderImage: string | null;
  createdAt: Date;
};

export type Chat = {
  id: string;
  name: string;
  userName: string;
  userImage: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  image: string;
  role: string;
  banned: boolean;
  banReason: string;
  banExpires: boolean;
  createdAt: Date;
  updatedAt: Date;
};
