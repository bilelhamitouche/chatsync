"use client";

import { signUpAction } from "@/actions/auth";
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
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

function SignUpForm() {
  const router = useRouter();
  const [isPending, setIsPending] = useState<boolean>(false);
  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  return (
    <Card className="min-w-xs md:min-w-sm">
      <CardHeader>
        <CardTitle className="text-xl text-center">Sign Up</CardTitle>
        <CardDescription className="text-center">
          Sign Up to Create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(
              async (data: z.infer<typeof signUpSchema>) => {
                setIsPending(true);
                const formData = new FormData();
                formData.append("name", data.name);
                formData.append("email", data.email);
                formData.append("password", data.password);
                try {
                  const result = await signUpAction(formData);
                  if (result?.message) toast.error(result.message);
                  if (!result?.message && !result?.errors) {
                    toast.success("Signed Up Successfully");
                    router.push("/signin");
                  }
                } catch (err) {
                  if (err instanceof Error) {
                    toast.error(err.message);
                  }
                } finally {
                  setIsPending(false);
                }
              },
            )}
            className="space-y-6"
          >
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
