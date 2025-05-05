import { getChatMessages } from "@/lib/queries";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ chatId: string }> },
) {
  const { chatId } = await params;
  const messages = await getChatMessages(chatId);
  return NextResponse.json(messages, { status: 200 });
}
