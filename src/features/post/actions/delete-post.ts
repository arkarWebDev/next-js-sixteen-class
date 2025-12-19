"use server";

import { prisma } from "@/lib/prisma";
import { POSTS } from "@/lib/path";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const deletePost = async (id: string) => {
  await prisma.post.delete({
    where: {
      id,
    },
  });

  revalidatePath(POSTS);
  redirect(POSTS);
};
