"use server";

import { getSession } from "@/lib/getSession";
import { prisma } from "@/lib/prisma";
import { postsPath, signInPath, singlePostPath } from "@/path";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function voteOnPost(postId: string, value: number) {
  const session = await getSession();

  if (!session) {
    return redirect(signInPath);
  }

  const userId = session.user.id;

  try {
    const existingVote = await prisma.vote.findUnique({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    });

    if (existingVote) {
      if (existingVote.value === value) {
        await prisma.vote.delete({
          where: {
            id: existingVote.id,
          },
        });
      } else {
        await prisma.vote.update({
          where: {
            id: existingVote.id,
          },
          data: {
            value,
          },
        });
      }
    } else {
      await prisma.vote.create({
        data: {
          userId,
          postId,
          value,
        },
      });
    }

    revalidatePath(postsPath);
    revalidatePath(singlePostPath(postId));

    return { success: true };
  } catch (error) {
    console.error("(Error voting:", error);
    throw new Error("Failed to vote");
  }
}
