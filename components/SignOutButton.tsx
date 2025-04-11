"use client";

import { Button } from "./ui/button";
import { signOutAction } from "@/actions/auth";

export function SignOutButton() {
  return (
    <form action={signOutAction}>
      <Button variant="destructive" type="submit">
        Sign Out
      </Button>
    </form>
  );
}

export default SignOutButton;
