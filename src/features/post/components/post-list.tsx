import PostItem from "@/features/post/components/post-item";
import { getPosts } from "@/features/post/queries/get-posts";

interface Props {
  userId?: string | undefined;
}

async function PostList({ userId = undefined }: Props) {
  const posts = await getPosts(userId);

  return (
    <div className="space-y-6 my-6">
      {posts.map((post) => (
        <PostItem {...post} key={post.id} />
      ))}
    </div>
  );
}

export default PostList;
