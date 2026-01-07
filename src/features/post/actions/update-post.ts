"use server";

import { postsPath } from "@/path";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { actionClient } from "@/lib/safe-action";
import { postUpdateSchema } from "../schemas";

export const updatePost = actionClient
  .inputSchema(postUpdateSchema)
  .action(async ({ parsedInput: { id, title, body, status } }) => {
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
