import { getPosts } from "@/features/post/queries/get-posts";

export async function GET() {
  const posts = await getPosts(undefined, {
    search: "",
    sort: "desc",
    page: "2",
    tag: undefined,
  });

  return Response.json(posts);
}
