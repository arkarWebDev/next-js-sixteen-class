import { FAKE_POSTS } from "@/data";
import PostItem from "@/features/post/components/post-item";

interface Props {
  params: Promise<{ id: string }>;
}

async function SinglePost({ params }: Props) {
  const { id } = await params;
  const post = FAKE_POSTS.find((post) => post.id === parseInt(id));

  if (!post) {
    return <h2>Post not found.</h2>;
  }

  return <PostItem {...post} isCard={false} />;
}

export default SinglePost;
