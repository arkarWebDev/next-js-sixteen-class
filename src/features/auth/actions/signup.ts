"use server";

import { actionClient } from "@/lib/safe-action";
import { signUpSchema } from "../schemas";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { signInPath } from "@/path";

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
    } catch (error) {
      console.log(error);

      throw new Error("signUp: Something went wrong!!");
    }

    redirect(signInPath);
  });
