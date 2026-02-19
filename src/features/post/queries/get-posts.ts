import { prisma } from "@/lib/prisma";
import { Post, User } from "../../../../generated/prisma/client";
import { SearchParams } from "../types/search-params";

interface postWithUser extends Post {
  user: User;
}

interface PaginatedPosts {
  posts: postWithUser[];
  totalPages: number;
  currentPage: number;
}

export const getPosts = async (
  userId: string | undefined,
  searchParams: SearchParams,
): Promise<PaginatedPosts> => {
  const POSTS_PER_PAGE = 2;
  const currentPage = Number(searchParams.page) || 1;
  const skip = (currentPage - 1) * POSTS_PER_PAGE;

  const whereCondition = {
    userId,
    title: {
      contains: searchParams.search,
      mode: "insensitive" as const,
    },
  };

  const [totalCount, posts] = await prisma.$transaction([
    prisma.post.count({
      where: whereCondition,
    }),
    prisma.post.findMany({
      orderBy: {
        createdAt: searchParams.sort?.toString() === "asc" ? "asc" : "desc",
      },
      where: whereCondition,
      include: {
        user: true,
      },
      skip,
      take: POSTS_PER_PAGE,
    }),
  ]);

  const totalPages = Math.ceil(totalCount / POSTS_PER_PAGE);

  return {
    posts,
    totalPages,
    currentPage,
  };
};

// 10 -> 3 - 1 -> 2 <- currentPage -> 2 * 2 -> 4 <- skip -> 2
