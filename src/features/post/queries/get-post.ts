import { prisma } from "@/lib/prisma";
import { Post, User } from "../../../../generated/prisma/client";

interface postWithUser extends Post {
  user: User;
}

export const getPost = async (id: string): Promise<postWithUser | null> => {
  return await prisma.post.findUnique({
    where: {
      id,
    },
    include: {
      user: true,
    },
  });
};
