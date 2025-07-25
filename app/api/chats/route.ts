import { getChats } from "@/lib/queries";
import { NextResponse } from "next/server";

export async function GET() {
  const chats = await getChats();
  return NextResponse.json(chats, {
    status: 200,
  });
}
