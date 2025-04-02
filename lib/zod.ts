import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().trim().email("Must be a valid email address"),
  password: z
    .string()
    .trim()
    .min(8, { message: "Must be contain more than 8 characters" })
    .max(20, { message: "Must contain less than 20 characters" }),
});

export const signUpSchema = z.object({
  name: z.string().trim(),
  email: z.string().trim().email("Must be a valid email address"),
  password: z
    .string()
    .trim()
    .min(8, { message: "Must be contain more than 8 characters" })
    .max(20, { message: "Must contain less than 20 characters" }),
});
