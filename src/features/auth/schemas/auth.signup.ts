import * as z from "zod";
import { authBaseSchema } from "./auth.base";

export const signUpSchema = z
  .object({
    ...authBaseSchema,
    name: z.string().min(3),
    confirmPassword: z.string().min(10),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Password not match",
        path: ["confirmPassword"],
      });
    }
  });
