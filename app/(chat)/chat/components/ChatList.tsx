"use client";

import {
  SidebarMenu,
} from "@/components/ui/sidebar";
import { Chat } from "@/lib/types";
import ChatItem from "./ChatItem";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

interface ChatListProps {
  initialChats: Chat[];
}

export default function ChatList({ initialChats }: ChatListProps) {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const [chats, setChats] = useState(initialChats);
  useEffect(() => {
    setChats(() => initialChats.filter((chat) => chat.name.toLowerCase().includes(search as string)))
  }, [search])
  return (
    <SidebarMenu>
      {chats.map((chat: Chat) => {
        return (
          <ChatItem key={chat.id} id={chat.id} name={chat.name} userName={chat.userName} userImage={chat.userImage} />
        );
      })}
    </SidebarMenu>
  );
}
