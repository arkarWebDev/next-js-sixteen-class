import { prisma } from "@/lib/prisma";
import { Post } from "../types/post";

export const getPost = async (id: string): Promise<Post | null> => {
  return await prisma.post.findUnique({
    where: {
      id,
    },
  });
};
