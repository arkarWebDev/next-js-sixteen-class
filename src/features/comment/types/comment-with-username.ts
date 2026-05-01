import { Prisma } from "../../../../generated/prisma/client";

export type CommentwithUsername = Prisma.CommentGetPayload<{
  include: {
    user: {
      select: {
        name: true;
        isPremium: true;
      };
    };
  };
}>;
