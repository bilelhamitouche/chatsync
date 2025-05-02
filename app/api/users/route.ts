import { getUsers } from "@/lib/queries";
import { NextResponse } from "next/server";

export async function GET() {
  const users = await getUsers();
  return NextResponse.json(users, { status: 200 });
}
