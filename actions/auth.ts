"use server";

import { auth } from "@/lib/auth";
import { signInSchema, signUpSchema } from "@/lib/zod";
import { APIError } from "better-auth/api";
import { redirect } from "next/navigation";
import { ZodError } from "zod";

export type State = {
  errors?: {
    email: string;
    password: string;
  };
  message?: string;
};

export async function signIn(_prevState: State, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  try {
    const validationResult = signInSchema.parse({ email, password });
    await auth.api.signInEmail({
      body: {
        email: validationResult.email,
        password: validationResult.password,
      },
    });
  } catch (err) {
    if (err instanceof ZodError) {
      return {
        errors: err.flatten().fieldErrors,
      };
    }
    if (err instanceof APIError) {
      return {
        message: err.message,
      };
    }
  }
  redirect("/chat");
}

export async function signUp(_prevState: State, formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  try {
    const validationResult = signUpSchema.parse({ name, email, password });
    await auth.api.signUpEmail({
      body: {
        name: validationResult.name,
        email: validationResult.email,
        password: validationResult.password,
      },
    });
  } catch (err) {
    if (err instanceof ZodError) {
      return {
        errors: err.flatten().fieldErrors,
      };
    }
    if (err instanceof APIError) {
      return {
        message: err.message,
      };
    }
  }
}
