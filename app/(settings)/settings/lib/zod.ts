import { z } from "zod";

export const passwordChangeSchema = z.object({
  password: z
    .string()
    .trim()
    .min(8, { message: "Must be 8 characters long" })
    .max(20, { message: "Must be at most 20 characters long" }),
  new_password: z
    .string()
    .trim()
    .min(8, { message: "Must be 8 characters long" })
    .max(20, { message: "Must be at most 20 characters long" }),
  confirm_new_password: z
    .string()
    .trim()
    .min(8, { message: "Must be 8 characters long" })
    .max(20, { message: "Must be at most 20 characters long" }),
});

export const accountChangeSchema = z.object({
  name: z.string().trim().min(1, { message: "Name is required" }),
  email: z.string().trim().email({ message: "Must be a valid Email address" }),
});
