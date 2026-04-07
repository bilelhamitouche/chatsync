import { socket } from "./socket";
import { queryClient } from "./router";
import type { Message } from "./types";

let initialized = false;

export function initSocket() {
  if (initialized) return;
  initialized = true;

  socket.connect();

  socket.on("connect", () => {
    console.log("✅ socket connected");
  });

  socket.on("disconnect", () => {
    console.log("❌ socket disconnected");
  });

  socket.on("receive_message", (message: Message) => {
    queryClient.setQueryData(
      ["messages", message.chatId],
      (old: Message[] = []) => {
        if (old.some((m) => m.id === message.id)) return old;
        return [...old, message];
      },
    );

    queryClient.invalidateQueries({
      queryKey: ["chats"],
    });
  });
}
