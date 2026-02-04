"use server";

import { actionClient } from "@/lib/safe-action";
import { auth } from "@/lib/auth";
import { signInPath } from "@/path";
import { changePasswordSchema } from "../schemas/auth.change-password";
import { redirect } from "next/navigation";

export const changePassword = actionClient
  .inputSchema(changePasswordSchema)
  .action(async ({ parsedInput: { newPassword, token } }) => {
    try {
      await auth.api.resetPassword({
        body: {
          newPassword,
          token,
        },
      });
    } catch (error) {
      console.log(error);

      throw new Error("changePassword: Something went wrong!!");
    }

    redirect(signInPath);
  });
