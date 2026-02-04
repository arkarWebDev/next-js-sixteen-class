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
  .action(async ({ parsedInput: { id, title, body, status } }) => {
    const session = await getSession();

    if (!session) {
      redirect(signInPath);
    }

    const owner = await isOwner(session.user.id);
    if (!owner) {
      throw new Error("You are not owner");
    }

    await prisma.post.update({
      where: {
        id,
      },
      data: {
        title,
        body,
        status,
      },
    });

    revalidatePath(postsPath);
    redirect(postsPath);
  });
