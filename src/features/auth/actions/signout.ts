"use server";

import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { postsPath } from "@/path";
import { headers } from "next/headers";

export const signOut = async () => {
  try {
    await auth.api.signOut({
      headers: await headers(),
    });
  } catch (error) {
    console.log(error);

    throw new Error("signOut: Something went wrong!!");
  }

  redirect(postsPath);
};
