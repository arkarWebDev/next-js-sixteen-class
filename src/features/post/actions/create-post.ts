"use server";

import { postsPath } from "@/path";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { actionClient } from "@/lib/safe-action";
import { postCreateSchema } from "../schemas";

export const createPost = actionClient
  .inputSchema(postCreateSchema)
  .action(async ({ parsedInput: { title, body } }) => {
    try {
      await prisma.post.create({
        data: {
          title,
          body,
        },
      });

      revalidatePath(postsPath);
    } catch (error) {
      throw new Error("create-post: Something went wrong!!");
    }
  });
