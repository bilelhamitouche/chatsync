import { getSessionInfo } from "@/actions/auth";
import SignOutButton from "@/components/SignOutButton";
import { Button } from "@/components/ui/button";
import Link from "next/link";

async function Chat() {
  const session = await getSessionInfo();
  return (
    <div className="flex flex-col gap-2 justify-center items-center h-full">
      <h1 className="text-xl font-bold">Chat page</h1>
      <p>{session?.user.name}</p>
      <p>{session?.user.email}</p>
      <Button variant="link" size="sm" asChild>
        <Link href="/settings/account">Settings</Link>
      </Button>
      <SignOutButton />
    </div>
  );
}

export default Chat;
