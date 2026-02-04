import { prisma } from "@/lib/prisma";
import { Post, User } from "../../../../generated/prisma/client";

interface postWithUser extends Post {
  user: User;
}

export const getPosts = async (
  userId: string | undefined,
): Promise<postWithUser[]> => {
  return prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where: {
      userId,
    },
    include: {
      user: true,
    },
  });
};
