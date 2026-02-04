"use server";

import { actionClient } from "@/lib/safe-action";
import { signInSchema } from "../schemas";
import { auth } from "@/lib/auth";

export const signIn = actionClient
  .inputSchema(signInSchema)
  .action(async ({ parsedInput: { email, password } }) => {
    try {
      await auth.api.signInEmail({
        body: {
          email,
          password,
        },
      });

      return {
        success: true,
        error: null,
      };
    } catch (error: any) {
      console.log(error);

      const errorMessage =
        error.message || error.body.message || "Something went wrong.";

      return {
        success: false,
        error: errorMessage,
      };
    }
  });
