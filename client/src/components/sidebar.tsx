import {
  Box,
  Button,
  Flex,
  Input,
  Menu,
  Portal,
  Separator,
  Stack,
} from "@chakra-ui/react";
import LogoImage from "./logo-image";
import { LuMessageCircle, LuPlus, LuUsers } from "react-icons/lu";
import { Suspense, useState } from "react";
import CreateGroupDialog from "./create-group-dialog";
import CreateDmDialog from "./create-dm-dialog";
import AvatarDropdown from "./avatar-dropdown";
import AvatarDropdownSkeleton from "./avatar-dropdown-skeleton";
import ChatsList from "./chats-list";

export default function Sidebar() {
  const [DmOpen, setDmOpen] = useState(false);
  const [groupOpen, setGroupOpen] = useState(false);
  return (
    <Stack
      p={{ base: "0", md: "4" }}
      w="sm"
      flexShrink="0"
      h="dvh"
      shadow="sm"
      width={{ base: "0", md: "fit-content" }}
      opacity={{ base: "0", md: "1" }}
      transform={{ base: "translateX(-100%)", md: "translateX(0)" }}
      transition="all"
      transitionDuration="moderate"
    >
      <Flex align="center" justify="center">
        <LogoImage width="180" />
      </Flex>
      <Flex gap="2" w="full">
        <Box as="form" w="full">
          <Input w="full" placeholder="Search chats" />
        </Box>
        <Menu.Root>
          <Menu.Trigger asChild>
            <Button variant="solid">
              <LuPlus />
            </Button>
          </Menu.Trigger>
          <Portal>
            <Menu.Positioner>
              <Menu.Content>
                <Menu.Item
                  value="direct-message"
                  onClick={() => setDmOpen(true)}
                >
                  <LuMessageCircle />
                  <Box>Direct Message</Box>
                </Menu.Item>
                <Menu.Item value="group" onClick={() => setGroupOpen(true)}>
                  <LuUsers />
                  <Box>Group</Box>
                </Menu.Item>
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu.Root>
        <CreateDmDialog isDialogOpen={DmOpen} setIsDialogOpen={setDmOpen} />

        <CreateGroupDialog
          isDialogOpen={groupOpen}
          setIsDialogOpen={setGroupOpen}
        />
      </Flex>
      <Suspense fallback={<div>Loading chats...</div>}>
        <ChatsList />
      </Suspense>
      <Separator />
      <Suspense fallback={<AvatarDropdownSkeleton />}>
        <AvatarDropdown />
      </Suspense>
    </Stack>
  );
}
