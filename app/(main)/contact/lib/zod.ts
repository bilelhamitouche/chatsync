import { z } from "zod";

export const messageSchema = z.object({
  name: z.string().trim(),
  email: z.string().trim().email("Must be a valid Email Address"),
  message: z
    .string()
    .trim()
    .min(10, "Must be at least 10 characters")
    .max(50, "Must be at most 50 characters"),
});
