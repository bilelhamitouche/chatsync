"use client";

import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import { createChatAction } from "@/actions/chat";
import MultipleSelector from "./ui/multiple-selector";
import Link from "next/link";
import { LogOut, Settings } from "lucide-react";
import { Input } from "./ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Label } from "./ui/label";
import { Option } from "@/components/ui/multiple-selector";
import { authClient } from "@/lib/auth-client";
import { useEffect, useRef, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getUsersAndChats } from "@/lib/utils";
import ChatList from "@/app/(chat)/chat/components/ChatList";
import { User } from "@/lib/types";
import AvatarDropdownSkeleton from "./AvatarDropdownSkeleton";
import AvatarTrigger from "./AvatarTrigger";
import { signOutAction } from "@/actions/auth";
import { useRouter } from "next/navigation";

function AppSidebar() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const isAuthenticated = session !== null;
  const userInfo = session?.user;
  const [selectedValues, setSelectedValues] = useState<Option[]>([]);
  const hiddenInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const { data, isError, isLoading } = useQuery({
    queryKey: ["users-chats"],
    queryFn: getUsersAndChats,
    enabled: isAuthenticated,
  });

  if (isError) toast.error("Cannot fetch users");
  let userOptions: Option[] = [];
  if (data?.users != null) {
    const filteredUsers = data.users?.filter(
      (user: User) => user.id !== userInfo?.id,
    );
    userOptions = filteredUsers?.map((user: User) => ({
      label: user.name,
      value: user.id,
    }));
  }
  useEffect(() => {
    if (hiddenInputRef.current) {
      hiddenInputRef.current.value = JSON.stringify(
        selectedValues.map((opt) => opt.value),
      );
    }
  }, [selectedValues]);
  async function signOut() {
    try {
      const result = await signOutAction();
      if (result?.message) {
        toast.error(result.message);
      }
      router.refresh();
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    }
  }
  return (
    <Sidebar className="p-2 bg-sidebar">
      <SidebarHeader className="flex space-y-2">
        <Link href="/chat" className="text-xl font-bold text-center">
          ChatSync
        </Link>
        <Dialog>
          <DialogTrigger asChild>
            <Button>New Chat</Button>
          </DialogTrigger>
          <DialogContent>
            <form
              className="space-y-6"
              onSubmit={async (e: React.FormEvent<HTMLFormElement>) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                try {
                  await createChatAction(formData);
                  queryClient.invalidateQueries({ queryKey: ["users-chats"] });
                  toast.success("Chat created successfully");
                } catch (err) {
                  if (err !== null) {
                    toast.error("Chat can't be created");
                  }
                }
              }}
            >
              <DialogHeader>
                <DialogTitle>Create New Chat</DialogTitle>
                <DialogDescription>
                  Choose a name and the members to create the chat
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Choose chat name</Label>
                  <Input name="name" placeholder="Enter chat name" />
                </div>
                <div className="space-y-2">
                  <Label>Choose members</Label>
                  <MultipleSelector
                    value={selectedValues}
                    onChange={setSelectedValues}
                    options={userOptions}
                    placeholder="Choose members"
                    emptyIndicator={
                      <p className="text-gray-500">Nothing selected</p>
                    }
                  />
                  <input type="hidden" name="members" ref={hiddenInputRef} />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="submit" variant="default">
                    Save
                  </Button>
                </DialogClose>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
        <Input placeholder="Search for chats" />
      </SidebarHeader>
      <SidebarContent>
        {isPending || isLoading ? (
          <div className="p-2 text-sm text-center text-gray-500">
            Loading Chats...
          </div>
        ) : (
          <ChatList chats={data?.chats} />
        )}
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton size="lg">
                  {isPending || isLoading ? (
                    <AvatarDropdownSkeleton />
                  ) : (
                    <AvatarTrigger
                      name={userInfo?.name as string}
                      email={userInfo?.email as string}
                      image={userInfo?.image as string}
                    />
                  )}
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-56">
                <DropdownMenuItem asChild>
                  <Link href="/settings/account" className="cursor-pointer">
                    <Settings />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onSelect={signOut}
                  className="flex gap-2 items-center cursor-pointer"
                >
                  <LogOut className="text-red-500" />
                  <span className="text-red-500">Sign Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

export default AppSidebar;
