"use server";

import { postsPath, signInPath, singlePostPath } from "@/path";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { actionClient } from "@/lib/safe-action";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/getSession";
import { commentCreateSchema } from "../schemas/comment.create";

export const createComment = actionClient
  .inputSchema(commentCreateSchema)
  .action(async ({ parsedInput: { content, postId } }) => {
    const session = await getSession();

    if (!session) {
      redirect(signInPath);
    }

    try {
      await prisma.comment.create({
        data: {
          content,
          postId,
          userId: session?.user.id,
        },
      });

      revalidatePath(singlePostPath(postId));
    } catch (error) {
      throw new Error("create-post: Something went wrong!!");
    }

    revalidatePath(postsPath);
  });
