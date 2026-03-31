import { useLogoutMutation } from "@/api/mutations/auth";
import { currentUserOptions } from "@/api/queries/auth";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Menu,
  Portal,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { LuLogOut, LuSettings } from "react-icons/lu";

export default function AvatarDropdown() {
  const logout = useLogoutMutation();
  const { data } = useSuspenseQuery(currentUserOptions());
  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <Button
          variant="ghost"
          w="full"
          colorPalette="gray"
          justifyContent="start"
          h="auto"
          py="3"
        >
          <Avatar.Root size="xs">
            <Avatar.Image src={data.avatar ?? undefined} />
            <Avatar.Fallback name={data.name} />
          </Avatar.Root>
          <Stack gap="0" align="start">
            <Text>{data.name}</Text>
            <Text fontSize="xs">{data.email}</Text>
          </Stack>
        </Button>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content width="calc(var(--chakra-sizes-sm) - 2 * var(--chakra-spacing-4))">
            <Menu.Item value="username">
              <Flex gap="2" align="center">
                <Avatar.Root size="xs">
                  <Avatar.Fallback name={data.name} />
                  <Avatar.Image src={data.avatar ?? undefined} />
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
  );
}
