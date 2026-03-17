import { Button, Flex, Input } from "@chakra-ui/react";
import { LuSend } from "react-icons/lu";

export default function MessageForm() {
  return (
    <Flex gap="2" w="full" asChild>
      <form>
        <Input placeholder="Type message" />
        <Button>
          <LuSend />
          <span>Send</span>
        </Button>
      </form>
    </Flex>
  );
}
