"use client";

import { signUp } from "@/actions/auth";
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
import { signUpSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useActionState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const initialState = {
  errors: {
    email: "",
    password: "",
  },
  message: "",
};

function SignUpForm() {
  const [error, action, isPending] = useActionState(signUp, initialState);
  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  useEffect(() => {
    if (error?.message) {
      toast.error(error?.message);
    }
  }, [error?.message]);
  return (
    <Card className="min-w-sm">
      <CardHeader>
        <CardTitle className="text-xl text-center">Sign Up</CardTitle>
        <CardDescription className="text-center">
          Sign Up to Create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form action={action} className="space-y-6">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                  {error?.errors?.name && (
                    <span className="text-sm text-red-700">
                      {error?.errors.name}
                    </span>
                  )}
                </FormItem>
              )}
            />
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                  {error?.errors?.email && (
                    <span className="text-sm text-red-700">
                      {error?.errors.email}
                    </span>
                  )}
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                  {error?.errors?.password && (
                    <span className="text-sm text-red-700">
                      {error?.errors.password}
                    </span>
                  )}
                </FormItem>
              )}
            />
            <Button
              variant="default"
              type="submit"
              className="w-full"
              disabled={isPending}
            >
              {isPending ? (
                <div className="flex gap-1">
                  <Loader2 className="animate-spin" />
                  <span>Please Wait</span>
                </div>
              ) : (
                <span>Sign Up</span>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-center items-center w-full">
        <span className="text-sm">Already have an account?</span>
        <Button variant="link" size="sm" asChild>
          <Link href="/signin">Sign In</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export default SignUpForm;
