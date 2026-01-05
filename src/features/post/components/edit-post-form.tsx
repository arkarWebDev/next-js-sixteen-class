import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Post } from "../types/post";
import { updatePost } from "../actions/edit-post";
import SubmitButton from "./submit-button";
import CardWrapper from "./card-wrapper";

type EditPostFormProps = {
  post: Post;
};

function EditPostForm({ post }: EditPostFormProps) {
  return (
    <CardWrapper
      title="Update existing post"
      description="This will be update these existing post"
    >
      <form
        action={updatePost.bind(null, post?.id as string)}
        className="space-y-4"
      >
        {/* <Input name="id" defaultValue={post?.id} className="hidden" /> */}
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            type="text"
            id="title"
            name="title"
            defaultValue={post?.title}
          />
        </div>

        <div>
          <Label htmlFor="body">Description</Label>
          <Textarea id="body" name="body" defaultValue={post?.body} />
        </div>

        <SubmitButton label="Update" />
      </form>
    </CardWrapper>
  );
}

export default EditPostForm;
