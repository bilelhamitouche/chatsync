import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { authClient } from "@/lib/auth-client";
import { getChats } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { toast } from "sonner";

export default function ChatList() {
  const { data: session } = authClient.useSession();
  const isAuthenticated = session !== null;
  const {
    data: userChats,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["chats"],
    queryFn: getChats,
    enabled: isAuthenticated,
  });
  console.log(userChats);
  if (isError) toast.error("Cannot fetch chats");
  if (userChats?.chats != null)
    return (
      <SidebarMenu>
        {userChats.chats.map((chat: any) => {
          if (chat.chat != null) {
            return (
              <SidebarMenuItem key={chat.chat?.id}>
                <SidebarMenuButton asChild>
                  <Link href={`/chat/${chat.chat.id}`}>
                    {isPending ? (
                      <div className="flex gap-2 items-center">
                        <Skeleton className="rounded-full size-8" />
                        <Skeleton className="h-6 w-[200px]" />
                      </div>
                    ) : (
                      <div className="flex gap-2 items-center">
                        <Avatar>
                          <AvatarImage
                            src={chat.user?.image as string}
                            alt={`${chat.user?.name} image`}
                          />
                          <AvatarFallback>
                            {chat.user?.name[0].toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <span>{chat.chat?.name}</span>
                      </div>
                    )}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          }
        })}
      </SidebarMenu>
    );
}
