import SignOutButton from "@/components/SignOutButton";
import Link from "next/link";

async function Chat() {
  return (
    <div className="flex flex-col gap-2 justify-center items-center h-full">
      <h1 className="text-xl font-bold">Chat page</h1>
      <Link href="/settings/account">Settings</Link>
      <SignOutButton />
    </div>
  );
}

export default Chat;
