import {
  SidebarMenu,
} from "@/components/ui/sidebar";
import { Chat } from "@/lib/types";
import ChatItem from "./ChatItem";

interface ChatListProps {
  chats: Chat[];
}

export default function ChatList({ chats }: ChatListProps) {
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
