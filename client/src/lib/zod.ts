import { z } from "zod";

export const loginSchema = z.object({
  email: z.email({ error: "Must be a valid email" }).trim(),
  password: z
    .string()
    .trim()
    .min(8, { error: "Password must be at least 8 characters long" }),
});

export const registerSchema = z.object({
  name: z.string().trim().min(1, { error: "Name is required" }),
  email: z.email({ error: "Must be a valid email" }).trim(),
  password: z
    .string()
    .trim()
    .min(8, { error: "Password must be at least 8 characters long" }),
});

export const createDmSchema = z.object({
  members: z
    .array(z.string().trim())
    .max(1, { error: "Direct message needs two members" }),
});

export const createGroupSchema = z.object({
  name: z.string().trim().min(1, { error: "Group needs a name" }),
  members: z
    .array(z.string().trim())
    .min(1, { error: "Group needs at least 2 members" }),
});

export const createMessageSchema = z.object({
  content: z
    .string()
    .trim()
    .refine((value) => value.split(" ").length < 500),
});
