"use server";

import { actionClient } from "@/lib/safe-action";
import { signUpSchema } from "../schemas";
import { auth } from "@/lib/auth";

export const signUp = actionClient
  .inputSchema(signUpSchema)
  .action(async ({ parsedInput: { email, name, password } }) => {
    try {
      await auth.api.signUpEmail({
        body: {
          email,
          name,
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
