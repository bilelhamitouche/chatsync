"use client";
import { formatDate } from "@/lib/utils";

interface ChatBubbleProps {
  content: string;
  createdAt: Date;
}

export default function ChatBubble({ content, createdAt }: ChatBubbleProps) {
  return (
    <div className="flex flex-col gap-1 max-w-full">
      <div className="self-end p-2 max-w-xs text-white whitespace-pre-wrap break-words rounded-lg sm:max-w-xl bg-primary text-wrap">
        {content}
      </div>
      <span className="pl-4 text-xs text-left text-gray-500">
        {formatDate(new Date(createdAt))}
      </span>
    </div>
  );
}
