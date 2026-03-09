import Heading from "@/components/heading";
import CreatePostForm from "@/features/post/components/create-post-form";
import PostList from "@/features/post/components/post-list";
import { SearchParams } from "@/features/post/types/search-params";
import { getSession } from "@/lib/getSession";
import { signInPath } from "@/path";
import { redirect } from "next/navigation";

import { Suspense } from "react";

type Props = {
  searchParams: Promise<SearchParams>;
};

async function Posts({ searchParams }: Props) {
  const params = await searchParams;

  const session = await getSession();
  if (!session) {
    redirect(signInPath);
  }

  return (
    <main>
      <Heading
        title={session.user.name}
        description="View all your forum posts ."
      />
      <CreatePostForm />
      <Suspense fallback={<p className="text-white">fetching posts ...</p>}>
        <PostList userId={session.user.id} searchParams={params} />
      </Suspense>
    </main>
  );
}

export default Posts;
