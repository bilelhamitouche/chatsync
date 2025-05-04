import { createMessageAction } from "@/actions/chat";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ChatForm() {
  return (
    <form
      action={createMessageAction}
      className="flex gap-2 items-center p-2 w-full"
    >
      <Input placeholder="Enter message" />
      <Button type="submit">Send Message</Button>
    </form>
  );
}
