import Heading from "@/components/heading";
import PostList from "@/features/post/components/post-list";

import { Suspense } from "react";

async function Posts() {
  return (
    <main>
      <Heading title="All posts" description="View all forum posts." />
      <Suspense fallback={<p className="text-white">fetching posts ...</p>}>
        <PostList />
      </Suspense>
    </main>
  );
}

export default Posts;
