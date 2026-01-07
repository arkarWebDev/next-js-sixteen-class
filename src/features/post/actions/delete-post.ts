"use server";

import { prisma } from "@/lib/prisma";
import { actionClient } from "@/lib/safe-action";
import { postsPath } from "@/path";
import { redirect } from "next/navigation";
import { postDeleteSchema } from "../schemas";

export const deletePost = actionClient
  .inputSchema(postDeleteSchema)
  .action(async ({ parsedInput: { id } }) => {
    await prisma.post.delete({
      where: {
        id,
      },
    });

    redirect(postsPath);
  });
