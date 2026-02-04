"use server";

import { getSession } from "./getSession";

export const isOwner = async (userId: string) => {
  const session = await getSession();

  return userId === session?.user.id;
};
