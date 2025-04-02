"use client";

import { signUp } from "@/actions/auth";
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
import { signUpSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
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
    toast.error(error?.message);
  }, [error?.message]);
  return (
    <Card className="min-w-sm">
      <CardHeader>
        <CardTitle className="text-center">Sign Up</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form action={action} className="space-y-4">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormDescription>Your Name</FormDescription>
                  <FormMessage />
                  {error?.errors?.name && (
                    <span className="text-red-700">{error?.errors.name}</span>
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
                  <FormDescription>Your Email Address</FormDescription>
                  <FormMessage />
                  {error?.errors?.email && (
                    <span className="text-red-700">{error?.errors.email}</span>
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
                  <FormDescription>Your Password</FormDescription>
                  <FormMessage />
                  {error?.errors?.password && (
                    <span className="text-red-700">
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
                  <span>Submitting</span>
                </div>
              ) : (
                <span>Submit</span>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default SignUpForm;
