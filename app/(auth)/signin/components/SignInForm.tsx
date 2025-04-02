"use client";

import { signIn } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signInSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useActionState, useRef } from "react";
import { useForm } from "react-hook-form";
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
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const formRef = useRef<HTMLFormElement>(null);
  const [error, action, isPending] = useActionState(signIn, initialState);
  return (
    <Card className="min-w-sm">
      <CardHeader>
        <CardTitle className="text-center">Sign In</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            ref={formRef}
            action={action}
            className="space-y-4"
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
                  <FormDescription>Your Email Address.</FormDescription>
                  <FormMessage />
                  {error?.errors && (
                    <span className="text-red-700">{error.errors.email}</span>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="" type="password" {...field} />
                  </FormControl>
                  <FormDescription>Your Password.</FormDescription>
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
              Submit
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default SignInForm;
