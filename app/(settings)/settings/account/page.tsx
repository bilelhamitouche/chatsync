"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { accountChangeSchema } from "../lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { accountChangeAction } from "../actions/account";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function Account() {
  const [isPending, setIsPending] = useState<boolean>(false);
  const form = useForm<z.infer<typeof accountChangeSchema>>({
    resolver: zodResolver(accountChangeSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });
  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Settings</CardTitle>
        <CardDescription>
          Make changes to your account here. Click save when you're done.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(
              async (data: z.infer<typeof accountChangeSchema>) => {
                setIsPending(true);
                const formData = new FormData();
                formData.append("name", data.name);
                formData.append("email", data.email);
                try {
                  const result = await accountChangeAction(formData);
                  result?.message && toast.error(result.message);
                  if (!result?.errors && !result?.message)
                    toast.success("Account settings changed successfully");
                } catch (err) {
                } finally {
                  setIsPending(false);
                }
              },
            )}
            className="space-y-4"
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
                    <Input placeholder="" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Save changes</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default Account;
