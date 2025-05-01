"use client";

import { signInAction } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signInSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

function SignInForm() {
  const router = useRouter();
  const [isPending, setIsPending] = useState<boolean>(false);
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  return (
    <Card className="min-w-sm">
      <CardHeader>
        <CardTitle className="text-xl text-center">Sign In</CardTitle>
        <CardDescription className="text-center">
          Sign In to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            className="space-y-2"
            onSubmit={form.handleSubmit(
              async (data: z.infer<typeof signInSchema>) => {
                setIsPending(true);
                const formData = new FormData();
                formData.append("email", data.email);
                formData.append("password", data.password);
                try {
                  const result = await signInAction(formData);
                  if (result?.message) toast.error(result.message);
                  if (!result?.errors && !result?.message) {
                    toast.success("Signed In Successfully");
                    router.push("/chat");
                  }
                } catch (err) {
                  console.log(err);
                } finally {
                  setIsPending(false);
                }
              },
            )}
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex justify-between items-center w-full">
                    <FormLabel>Password</FormLabel>
                    <Button
                      variant="link"
                      size="sm"
                      className="text-sm text-black"
                      asChild
                    >
                      <Link href="/forgot-password">Forgot Password?</Link>
                    </Button>
                  </div>
                  <FormControl>
                    <Input placeholder="" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? (
                <div className="flex gap-1">
                  <Loader2 className="animate-spin"></Loader2>
                  <span>Please Wait</span>
                </div>
              ) : (
                <span>Sign In</span>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-center items-center w-full">
        <span className="text-sm">Don&apos;t have an account?</span>
        <Button variant="link" size="sm" asChild>
          <Link href="/signup">Sign Up</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export default SignInForm;
