import Heading from "@/components/heading";
import PostList from "@/features/post/components/post-list";
import { SearchParams } from "@/features/post/types/search-params";

import { Suspense } from "react";

type Props = {
  searchParams: Promise<SearchParams>;
};

async function Home({ searchParams }: Props) {
  const params = await searchParams;

  return (
    <main>
      <Heading title="All posts" description="View all forum posts." />
      <Suspense fallback={<p className="text-white">fetching posts ...</p>}>
        <PostList searchParams={params} />
      </Suspense>
    </main>
  );
}

export default Home;
