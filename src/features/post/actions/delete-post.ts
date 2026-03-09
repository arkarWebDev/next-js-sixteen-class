"use server";

import { prisma } from "@/lib/prisma";
import { actionClient } from "@/lib/safe-action";
import { postsPath, signInPath } from "@/path";
import { redirect } from "next/navigation";
import { postDeleteSchema } from "../schemas";
import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/getSession";
import { isOwner } from "@/lib/isOwner";

export const deletePost = actionClient
  .inputSchema(postDeleteSchema)
  .action(async ({ parsedInput: { id } }) => {
    const session = await getSession();

    if (!session) {
      redirect(signInPath);
    }

    const post = await prisma.post.findUnique({
      where: { id },
    });

    if (!post || !(await isOwner(post.userId))) {
      throw new Error("Not authorized");
    }

    await prisma.post.delete({
      where: {
        id,
      },
    });

    revalidatePath(postsPath);
    redirect(postsPath);
  });
