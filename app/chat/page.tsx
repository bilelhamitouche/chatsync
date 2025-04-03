import SignOutButton from "@/components/SignOutButton";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

async function Chat() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return (
    <div className="flex flex-col gap-2 justify-center items-center w-full h-full">
      <h1 className="text-xl">Welcome {session?.user.name}</h1>
      <p>Email: {session?.user.email}</p>
      <SignOutButton />
    </div>
  );
}

export default Chat;
