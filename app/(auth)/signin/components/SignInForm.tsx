"use client";

import { signIn } from "@/actions/auth";
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
import { useActionState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const initialState: {
  errors?: {
    email: string;
    password: string;
  };
  message?: string;
} = {
  errors: {
    email: "",
    password: "",
  },
  message: "",
};

function SignInForm() {
  const [error, action, isPending] = useActionState(signIn, initialState);
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const formRef = useRef<HTMLFormElement>(null);
  useEffect(() => {
    if (error?.message) {
      toast.error(error?.message);
    }
  }, [error?.message]);
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
            ref={formRef}
            action={action}
            className="space-y-2"
            onSubmit={form.handleSubmit(() => {
              formRef.current?.submit();
            })}
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
                  {error?.errors && (
                    <span className="text-sm text-red-700">
                      {error.errors.email}
                    </span>
                  )}
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
                  {error?.errors && (
                    <span className="text-red-700">
                      {error.errors.password}
                    </span>
                  )}
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
