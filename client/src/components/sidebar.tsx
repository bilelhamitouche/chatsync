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
import { LuLogOut, LuPlus, LuSettings } from "react-icons/lu";
import { Link } from "@tanstack/react-router";

export default function Sidebar() {
  return (
    <Stack
      p="4"
      w="sm"
      borderRight="0px solid"
      borderColor="border"
      shadow="sm"
      transform={{ base: "translateX(-100%)", md: "translateX(0)" }}
      transition="transform"
      transitionDuration="moderate"
    >
      <Flex align="center" justify="center">
        <LogoImage width="180" />
      </Flex>
      <Flex gap="2">
        <form>
          <Input placeholder="Search chats" />
        </form>
        <Menu.Root>
          <Menu.Trigger asChild>
            <Button variant="solid">
              <LuPlus />
            </Button>
          </Menu.Trigger>
          <Portal>
            <Menu.Positioner>
              <Menu.Content>
                <Menu.Item value="direct-message">Direct Message</Menu.Item>
                <Menu.Item value="group">Group</Menu.Item>
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu.Root>
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
              <Menu.Content width="calc(var(--chakra-sizes-xs) - 2 * var(--chakra-spacing-6))">
                <Menu.Item value="username">
                  <Flex gap="2" align="center">
                    <Avatar.Root size="xs">
                      <Avatar.Fallback name="Segun Adebayo" />
                      <Avatar.Image src="https://bit.ly/sage-adebayo" />
                    </Avatar.Root>
                    <Stack gap="0">
                      <Text>Bilel Hamitouche</Text>
                      <Text fontSize="xs">bilelhamitouche@gmail.com</Text>
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
                <Menu.Item value="logout" color="red">
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
