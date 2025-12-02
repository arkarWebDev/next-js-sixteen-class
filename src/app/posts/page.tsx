import Heading from "@/components/heading";
import { FAKE_POSTS } from "@/data";
import PostItem from "@/features/post/components/post-item";

function Posts() {
  return (
    <main>
      <Heading title="All posts" description="View all forum posts." />
      <div className="space-y-6">
        {FAKE_POSTS.map((post) => (
          <PostItem {...post} key={post.id} />
        ))}
      </div>
    </main>
  );
}

export default Posts;
