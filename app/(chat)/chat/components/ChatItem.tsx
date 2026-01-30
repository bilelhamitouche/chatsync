"use client";
import { deleteChatAction } from "@/actions/chat";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { useQueryClient } from "@tanstack/react-query";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface ChatItemProps {
  id: string;
  name: string;
  userName: string;
  userImage: string | null;
}

export default function ChatItem({
  id,
  name,
  userName,
  userImage,
}: ChatItemProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  async function deleteChat() {
    const formData = new FormData();
    formData.append("id", id);
    try {
      const result = await deleteChatAction(formData);
      if (result?.message) {
        toast.error(result.message);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["chats"] });
        toast.success("Chat deleted successfully");
      }
    } catch (err) {
      toast.error("Error deleting chat");
    }
  }
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild>
        <div
          role="link"
          onClick={() => router.push(`/chat/${id}`)}
          className="flex justify-between items-center w-full cursor-default"
        >
          <div className="flex gap-2 items-center w-full">
            <Avatar>
              <AvatarImage
                src={userImage as string}
                alt={`${userName} image`}
              />
              <AvatarFallback>{userName[0].toUpperCase()}</AvatarFallback>
            </Avatar>
            <span>{name}</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              deleteChat();
            }}
          >
            <Trash color="red" />
          </Button>
        </div>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
