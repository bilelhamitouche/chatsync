import type { Message } from "@/lib/types";

export function isGrouped(previous: Message, current: Message) {
  if (!current || !previous) return false;
  const sameUser = current.senderId === previous.senderId;
  const currentTime = new Date(current.sentAt).getTime();
  const previousTime = new Date(previous.sentAt).getTime();
  const timeDiff = currentTime - previousTime;
  const withinOneMinute = timeDiff < 1000 * 60;
  return sameUser && withinOneMinute;
}
