import { ScrollArea } from "@/components/ui/scroll-area";
import Navbar from "../components/navbar";

function Chat() {
  return (
    <div className="h-full">
      <Navbar memberInfo={[]} />
      <ScrollArea className="p-4 w-full"></ScrollArea>
    </div>
  );
}

export default Chat;
