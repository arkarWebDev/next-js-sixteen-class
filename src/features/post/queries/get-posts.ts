import { prisma } from "@/lib/prisma";
import { Post, User } from "../../../../generated/prisma/client";

interface postWithUser extends Post {
  user: User;
}

export const getPosts = async (): Promise<postWithUser[]> => {
  return prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: true,
    },
  });
};
