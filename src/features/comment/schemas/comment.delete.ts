import * as z from "zod";

export const commentDeleteSchema = z.object({
  commentId: z.string(),
});
