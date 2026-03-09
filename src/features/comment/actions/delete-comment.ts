"use server";

import { prisma } from "@/lib/prisma";
import { actionClient } from "@/lib/safe-action";
import { postsPath, signInPath, singlePostPath } from "@/path";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/getSession";
import { isOwner } from "@/lib/isOwner";
import { commentDeleteSchema } from "../schemas/comment.delete";

export const deleteComment = actionClient
  .inputSchema(commentDeleteSchema)
  .action(async ({ parsedInput: { commentId } }) => {
    const session = await getSession();

    if (!session) {
      redirect(signInPath);
    }

    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
    });

    if (!comment || !(await isOwner(comment.userId))) {
      throw new Error("Not authorized");
    }

    await prisma.comment.delete({
      where: {
        id: commentId,
      },
    });

    revalidatePath(singlePostPath(comment.postId));
  });
