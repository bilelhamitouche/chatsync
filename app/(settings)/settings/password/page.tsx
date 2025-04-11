"use client";

import {
  Card,
  CardContent,
  CardDescription,
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { passwordChangeSchema } from "../lib/zod";
import { Button } from "@/components/ui/button";
import { changePasswordAction } from "../actions/password";
import { useState } from "react";

function Password() {
  const [isPending, setIsPending] = useState<boolean>(false);
  const form = useForm<z.infer<typeof passwordChangeSchema>>({
    resolver: zodResolver(passwordChangeSchema),
    defaultValues: {
      password: "",
      new_password: "",
      confirm_new_password: "",
    },
  });
  return (
    <Card>
      <CardHeader>
        <CardTitle>Password</CardTitle>
        <CardDescription>
          Change your password here. After saving you'll be logged out.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(
              async (data: z.infer<typeof passwordChangeSchema>) => {
                const formData = new FormData();
                setIsPending(true);
                formData.append("password", data.password);
                formData.append("new_password", data.new_password);
                formData.append(
                  "confirm_new_password",
                  data.confirm_new_password,
                );
                try {
                  const result = await changePasswordAction(formData);
                } catch (err) {
                } finally {
                  setIsPending(false);
                }
              },
            )}
            className="space-y-4"
          >
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Password</FormLabel>
                  <FormControl>
                    <Input placeholder="" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="new_password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="confirm_new_password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input placeholder="" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Change Password</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default Password;
