import { prisma } from "@/lib/prisma";
import { Post, User } from "../../../../generated/prisma/client";

interface postWithUser extends Post {
  user: User;
  votes: { value: number; userId: string }[];
}

export const getPost = async (id: string): Promise<postWithUser | null> => {
  return await prisma.post.findUnique({
    where: {
      id,
    },
    include: {
      user: true,
      votes: {
        select: {
          value: true,
          userId: true,
        },
      },
    },
  });
};
