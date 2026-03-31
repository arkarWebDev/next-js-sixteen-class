"use server";

import { postsPath, signInPath } from "@/path";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { actionClient } from "@/lib/safe-action";
import { postUpdateSchema } from "../schemas";
import { getSession } from "@/lib/getSession";
import { isOwner } from "@/lib/isOwner";

export const updatePost = actionClient
  .inputSchema(postUpdateSchema)
  .action(async ({ parsedInput: { id, title, body, status, images = [] } }) => {
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

    await prisma.post.update({
      where: {
        id,
      },
      data: {
        title,
        body,
        status,
        images,
      },
    });

    revalidatePath(postsPath);
    redirect(postsPath);
  });
