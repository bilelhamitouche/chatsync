"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "./ui/button";
import { redirect } from "next/navigation";

function SignOutButton() {
  return (
    <Button
      variant="destructive"
      onClick={() =>
        authClient.signOut({
          fetchOptions: {
            onSuccess: () => redirect("/signin"),
          },
        })
      }
    >
      Sign Out
    </Button>
  );
}

export default SignOutButton;
