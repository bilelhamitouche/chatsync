"use server";

import { auth } from "@/lib/auth";
import { signInSchema, signUpSchema } from "@/lib/zod";
import { APIError } from "better-auth/api";

export async function signInAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  try {
    const signInSchemaValidation = signInSchema.safeParse({ email, password });
    if (!signInSchemaValidation.success) {
      return {
        errors: signInSchemaValidation.error.flatten().fieldErrors,
      };
    }
    await auth.api.signInEmail({
      body: {
        email: signInSchemaValidation.data.email,
        password: signInSchemaValidation.data.password,
      },
    });
  } catch (err) {
    if (err instanceof APIError) {
      return {
        message: err.message,
      };
    }
  }
}

export async function signUpAction(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  try {
    const signUpSchemaValidation = signUpSchema.safeParse({
      name,
      email,
      password,
    });
    if (!signUpSchemaValidation.success) {
      return {
        errors: signUpSchemaValidation.error.flatten().fieldErrors,
      };
    }
    await auth.api.signUpEmail({
      body: {
        name: signUpSchemaValidation.data.name,
        email: signUpSchemaValidation.data.email,
        password: signUpSchemaValidation.data.password,
      },
    });
  } catch (err) {
    if (err instanceof APIError) {
      return {
        message: err.message,
      };
    }
  }
}
