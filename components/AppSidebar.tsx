"use client";

import { signOutAction } from "@/actions/auth";
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
import { ChevronsUpDown, LogOut, Settings } from "lucide-react";
import { Input } from "./ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Label } from "./ui/label";
import { Option } from "@/components/ui/multiple-selector";
import { authClient } from "@/lib/auth-client";
import { useEffect, useRef, useState } from "react";

function AppSidebar() {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const [selectedValues, setSelectedValues] = useState<Option[]>([]);
  const hiddenInputRef = useRef<HTMLInputElement>(null);
  const chats: Option[] = [
    {
      label: "Nextjs",
      value: "nextjs",
    },
    {
      label: "React",
      value: "react",
    },
    {
      label: "Vue",
      value: "vue",
    },
  ];
  useEffect(() => {
    if (hiddenInputRef.current) {
      hiddenInputRef.current.value = JSON.stringify(
        selectedValues.map((opt) => opt.value),
      );
      console.log(hiddenInputRef.current.value);
    }
  }, [selectedValues]);
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
            <form action={createChatAction} className="space-y-6">
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
                    options={chats}
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
      <SidebarContent></SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton size="lg">
                  <div className="flex gap-2">
                    <Avatar>
                      <AvatarImage
                        src={user?.image as string}
                        alt={`${user?.name} image`}
                      />
                      <AvatarFallback>
                        {user?.name[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <p>{user?.name}</p>
                      <p className="text-xs">{user?.email}</p>
                    </div>
                  </div>
                  <ChevronsUpDown className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-56">
                <DropdownMenuItem asChild>
                  <Link href="/settings/account" className="cursor-pointer">
                    <Settings />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <form
                    action={signOutAction}
                    className="flex items-start w-full"
                  >
                    <button className="flex gap-2 items-center w-full text-left text-red-500">
                      <LogOut className="text-red-500" />
                      <span>Sign Out</span>
                    </button>
                  </form>
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
