import { prisma } from "@/lib/prisma";
import { Post } from "../../../../generated/prisma/client";

export const getPosts = async (): Promise<Post[]> => {
  return prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};
