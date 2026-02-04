"use server";

import { postsPath, signInPath } from "@/path";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { actionClient } from "@/lib/safe-action";
import { postCreateSchema } from "../schemas";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/getSession";

export const createPost = actionClient
  .inputSchema(postCreateSchema)
  .action(async ({ parsedInput: { title, body } }) => {
    const session = await getSession();

    if (!session) {
      redirect(signInPath);
    }

    try {
      await prisma.post.create({
        data: {
          title,
          body,
          userId: session?.user.id,
        },
      });
    } catch (error) {
      throw new Error("create-post: Something went wrong!!");
    }

    revalidatePath(postsPath);
  });
