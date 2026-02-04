import EditPostForm from "@/features/post/components/edit-post-form";
import { getPost } from "@/features/post/queries/get-post";
import { isOwner } from "@/lib/isOwner";
import { notFound } from "next/navigation";

type EditPostPageProps = {
  params: Promise<{ id: string }>;
};

const EditPostPage = async ({ params }: EditPostPageProps) => {
  const { id } = await params;
  const post = await getPost(id);
  const owner = await isOwner(post?.user.id!);
  if (!owner || !post) {
    notFound();
  }

  return <EditPostForm post={post} />;
};

export default EditPostPage;
