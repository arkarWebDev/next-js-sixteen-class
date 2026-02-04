import * as z from "zod";

export const changePasswordSchema = z.object({
  newPassword: z.string().min(10),
  token: z.string(),
});
