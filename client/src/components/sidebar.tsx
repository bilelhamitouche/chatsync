import {
  Avatar,
  Box,
  Button,
  Flex,
  Input,
  Menu,
  Portal,
  Separator,
  Stack,
  Text,
} from "@chakra-ui/react";
import LogoImage from "./logo-image";
import {
  LuLogOut,
  LuMessageCircle,
  LuPlus,
  LuSettings,
  LuUsers,
} from "react-icons/lu";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import CreateGroupDialog from "./create-group-dialog";
import CreateDmDialog from "./create-dm-dialog";
import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/utils/apiFetch";
import { useLogoutMutation } from "@/api/mutations/auth";

export default function Sidebar() {
  const { data, isPending } = useQuery({
    queryKey: ["currentuser"],
    queryFn: () => apiFetch("/api/auth/me"),
  });
  const logout = useLogoutMutation();
  const [DmOpen, setDmOpen] = useState(false);
  const [groupOpen, setGroupOpen] = useState(false);
  return (
    <Stack
      p="4"
      w="sm"
      shadow="sm"
      transform={{ base: "translateX(-100%)", md: "translateX(0)" }}
      transition="transform"
      transitionDuration="moderate"
    >
      <Flex align="center" justify="center">
        <LogoImage width="180" />
      </Flex>
      <Flex gap="2" w="full">
        <Box as="form" w="full">
          <Input w="full" placeholder="Search chats" />
        </Box>
        <Menu.Root variant="solid">
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
      <Stack h="full"></Stack>
      <Separator />
      <Box>
        <Menu.Root>
          <Menu.Trigger asChild>
            <Button variant="ghost" w="full" colorPalette="gray">
              Chat
            </Button>
          </Menu.Trigger>
          <Portal>
            <Menu.Positioner>
              <Menu.Content width="calc(var(--chakra-sizes-sm) - 2 * var(--chakra-spacing-4))">
                <Menu.Item value="username">
                  <Flex gap="2" align="center">
                    <Avatar.Root size="xs">
                      <Avatar.Fallback name={data.name} />
                      <Avatar.Image src={data.avatar} />
                    </Avatar.Root>
                    <Stack gap="0">
                      <Text>{data.name}</Text>
                      <Text fontSize="xs">{data.email}</Text>
                    </Stack>
                  </Flex>
                </Menu.Item>
                <Menu.Separator />
                <Menu.Item value="settings" asChild>
                  <Link to="/settings">
                    <LuSettings />
                    <Box>Settings</Box>
                  </Link>
                </Menu.Item>
                <Menu.Item
                  value="logout"
                  color="red"
                  onClick={() => logout.mutateAsync()}
                >
                  <LuLogOut />
                  <Box>Logout</Box>
                </Menu.Item>
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu.Root>
      </Box>
    </Stack>
  );
}
