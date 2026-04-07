import { useEffect } from "react";
import { socket } from "@/lib/socket";

export function useChatRoom(chatId: string) {
  useEffect(() => {
    function join() {
      socket.emit("join_room", chatId);
    }

    join();

    socket.on("connect", join);

    return () => {
      socket.emit("leave_room", chatId);
      socket.off("connect", join);
    };
  }, [chatId]);
}
