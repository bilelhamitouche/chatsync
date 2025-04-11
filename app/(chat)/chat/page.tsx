import SignOutButton from "@/components/SignOutButton";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { revalidatePath } from "next/cache";

async function Chat() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/signin");
  }
  return (
    <div className="flex flex-col gap-2 justify-center items-center h-full">
      <p>{session?.user.name}</p>
      <p>{session?.user.email}</p>
      <Avatar>
        <AvatarImage src={session?.user.image as string} alt="profile image" />
        <AvatarFallback>{session?.user.name[0]}</AvatarFallback>
      </Avatar>
      <SignOutButton />
      <form
        action={async () => {
          "use server";
          await auth.api.signOut({
            headers: await headers(),
          });
          revalidatePath("/chat");
        }}
      >
        <Button variant="destructive">Sign Out server</Button>
      </form>
    </div>
  );
}

export default Chat;
