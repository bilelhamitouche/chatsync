import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Chat } from "@/lib/types";
import Link from "next/link";

interface ChatListProps {
  chats: Chat[];
}

export default function ChatList({ chats }: ChatListProps) {
  return (
    <SidebarMenu>
      {chats.map((chat: Chat) => {
        return (
          <SidebarMenuItem key={chat?.id}>
            <SidebarMenuButton asChild>
              <Link href={`/chat/${chat.id}`} className="w-full">
                <div className="flex gap-2 items-center w-full">
                  <Avatar>
                    <AvatarImage
                      src={chat.userImage as string}
                      alt={`${chat.userName} image`}
                    />
                    <AvatarFallback>
                      {chat.userName[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span>{chat.name}</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
}
