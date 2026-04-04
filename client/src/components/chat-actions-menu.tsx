import { socket } from "@/lib/socket";
import { IconButton, Menu, Portal, Text } from "@chakra-ui/react";
import { useState } from "react";
import { LuEllipsisVertical, LuLogOut, LuPen, LuTrash2 } from "react-icons/lu";
import { toaster } from "./ui/toaster";
import { queryClient } from "@/lib/router";
import { useNavigate, useRouterState } from "@tanstack/react-router";

interface ChatActionsMenuProps {
  chatId: string;
  isAdmin: boolean;
}

export default function ChatActionsMenu({
  chatId,
  isAdmin,
}: ChatActionsMenuProps) {
  const routerState = useRouterState();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  return (
    <Menu.Root open={open} onOpenChange={() => setOpen(!open)}>
      <Menu.Trigger asChild>
        <IconButton
          aria-label="Chat options"
          variant="ghost"
          size="xs"
          opacity="0"
          _groupHover={{ opacity: "1" }}
          onClick={(e) => {
            e.preventDefault();
            setOpen(!open);
          }}
        >
          <LuEllipsisVertical />
        </IconButton>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            {isAdmin && (
              <Menu.Item
                value="edit"
                onClick={async () => {
                  try {
                    const response = await socket.emitWithAck(
                      "edit_chat",
                      chatId,
                    );
                    if (response.error) {
                      toaster.error({
                        title: "Failed to edit chat",
                        description: response.error,
                      });
                    } else {
                      queryClient.refetchQueries({
                        queryKey: ["chats"],
                        type: "all",
                      });
                      toaster.success({
                        title: "Chat edited successfully",
                      });
                    }
                  } catch (err) {
                    toaster.error({
                      title: "Failed to edit chat",
                      description: "Something went wrong",
                    });
                  }
                }}
              >
                <LuPen />
                <Text>Edit</Text>
              </Menu.Item>
            )}
            <Menu.Item
              value="leave"
              onClick={async () => {
                try {
                  const response = await socket.emitWithAck(
                    "leave_chat",
                    chatId,
                  );
                  if (response.error) {
                    toaster.error({
                      title: "Failed to leave chat",
                      description: response.error,
                    });
                  } else {
                    queryClient.refetchQueries({
                      queryKey: ["chats"],
                      type: "all",
                    });
                    toaster.success({
                      title: "Chat deleted successfully",
                    });
                    if (routerState.location.pathname === `/chats/${chatId}`) {
                      navigate({ to: "/chats" });
                    }
                  }
                } catch (err) {
                  toaster.error({
                    title: "Failed to leave chat",
                    description: "Something went wrong",
                  });
                }
              }}
            >
              <LuLogOut />
              <Text>Leave</Text>
            </Menu.Item>
            {isAdmin && (
              <Menu.Item
                value="delete"
                onClick={async () => {
                  try {
                    const response = await socket.emitWithAck(
                      "delete_chat",
                      chatId,
                    );
                    if (response.error) {
                      toaster.error({
                        title: "Failed to delete chat",
                        description: response.error,
                      });
                    } else {
                      queryClient.refetchQueries({
                        queryKey: ["chats"],
                        type: "all",
                      });
                      toaster.success({
                        title: "Chat deleted successfully",
                      });
                      if (
                        routerState.location.pathname === `/chats/${chatId}`
                      ) {
                        navigate({ to: "/chats" });
                      }
                    }
                  } catch (err) {
                    toaster.error({
                      title: "Failed to delete chat",
                      description: "Something went wrong",
                    });
                  }
                }}
              >
                <LuTrash2 />
                <Text>Delete</Text>
              </Menu.Item>
            )}
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
}
