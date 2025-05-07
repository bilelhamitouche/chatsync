import { createMessageAction } from "@/actions/chat";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default async function ChatForm({ chatId }: { chatId: string }) {
  return (
    <form
      action={createMessageAction}
      className="flex gap-2 items-center p-2 w-full"
    >
      <Input placeholder="Enter message" name="message" />
      <Input type="hidden" name="chatId" value={chatId} />
      <Button type="submit">Send Message</Button>
    </form>
  );
}
