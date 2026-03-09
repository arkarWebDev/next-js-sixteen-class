"use client";

import { Textarea } from "@/components/ui/textarea";
import CardWrapper from "../../../components/card-wrapper";
import { useAction } from "next-safe-action/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useEffect } from "react";

import SubmitButton from "../../../components/submit-button";
import { createComment } from "../actions/create-comment";
import { commentCreateSchema } from "../schemas/comment.create";
import { toast } from "sonner";
import { useParams } from "next/navigation";

function CreateCommentForm() {
  const { execute, isPending, hasErrored, hasSucceeded } =
    useAction(createComment);

  const params = useParams<{ id: string }>();

  const form = useForm<z.infer<typeof commentCreateSchema>>({
    resolver: zodResolver(commentCreateSchema),
    defaultValues: {
      content: "",
      postId: params.id,
    },
  });

  function onSubmit(values: z.infer<typeof commentCreateSchema>) {
    const { content, postId } = values;
    execute({ content, postId });
  }

  useEffect(() => {
    if (hasSucceeded) {
      form.reset();
    }

    if (hasErrored) {
      toast.error("Something went wrong.");
    }
  }, [hasErrored, hasSucceeded]);

  return (
    <CardWrapper
      title="Create new comment"
      description="This will be create a new comment in this post"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea {...field} placeholder="..." />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <SubmitButton label="Create" isPending={isPending} />
        </form>
      </Form>
    </CardWrapper>
  );
}

export default CreateCommentForm;
