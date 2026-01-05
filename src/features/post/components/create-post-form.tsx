"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createPost } from "@/features/post/actions/create-post";
import SubmitButton from "./submit-button";
import CardWrapper from "./card-wrapper";
import { useActionState } from "react";

function CreatePostForm() {
  const [actionState, formAction] = useActionState(createPost, {
    message: "",
  });

  return (
    <CardWrapper
      title="Create new post"
      description="This will be create new post"
    >
      <form action={formAction} className="space-y-4">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            type="text"
            id="title"
            name="title"
            defaultValue={(actionState.payload?.get("title") as string) ?? ""}
          />
        </div>

        <div>
          <Label htmlFor="body">Description</Label>
          <Textarea
            id="body"
            name="body"
            defaultValue={(actionState.payload?.get("body") as string) ?? ""}
          />
        </div>

        <SubmitButton label="Create" />
      </form>
      <span>{actionState.message}</span>
    </CardWrapper>
  );
}

export default CreatePostForm;
