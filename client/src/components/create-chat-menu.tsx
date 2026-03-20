import { Button, Menu } from "@chakra-ui/react";
import { useState } from "react";
import { LuMessageCircle, LuPlus, LuUsers } from "react-icons/lu";

export default function CreateChatMenu() {
  const [isDmDialogOpen, setIsDmDialogOpen] = useState(false);
  const [isGroupDialogOpen, setIsGroupDialogOpen] = useState(false);
  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <Button>
          <LuPlus />
        </Button>
      </Menu.Trigger>
      <Menu.Content>
        <Menu.Item value="direct-message">
          <LuMessageCircle />
          <Menu.ItemText>Direct Message</Menu.ItemText>
        </Menu.Item>
        <Menu.Item value="group">
          <LuUsers />
          <Menu.ItemText>Group</Menu.ItemText>
        </Menu.Item>
      </Menu.Content>
    </Menu.Root>
  );
}
