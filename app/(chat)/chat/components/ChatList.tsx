"use client";

import { SidebarMenu } from "@/components/ui/sidebar";
import { Chat } from "@/lib/types";
import ChatItem from "./ChatItem";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getChats } from "@/lib/utils";

export default function ChatList() {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const { data, isPending } = useQuery({
    queryKey: ["chats"],
    queryFn: () => getChats(),
  });
  const chats = data?.filter((item: Chat) =>
    search ? item.name.toLowerCase().includes(search.toLowerCase()) : true,
  );
  if (isPending) {
    return (
      <p className="text-sm text-center text-gray-500">Loading chats...</p>
    );
  }
  return (
    <SidebarMenu>
      {chats?.map((chat: Chat) => {
        return (
          <ChatItem
            key={chat.id}
            id={chat.id}
            name={chat.name}
            userName={chat.userName}
            userImage={chat.userImage}
          />
        );
      })}
    </SidebarMenu>
  );
}
