"use client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createPost } from "@/features/post/actions/create-post";
import CardWrapper from "../../../components/card-wrapper";
import { useAction } from "next-safe-action/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { postCreateSchema } from "../schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useEffect } from "react";
import { toast } from "sonner";
import SubmitButton from "../../../components/submit-button";
import ImageUpload from "./image-upload";
import RichTextEditor from "@/components/rich-text-editor";

function CreatePostForm() {
  const { execute, isPending, hasErrored, hasSucceeded } =
    useAction(createPost);

  const form = useForm<z.infer<typeof postCreateSchema>>({
    resolver: zodResolver(postCreateSchema),
    defaultValues: {
      title: "",
      body: "",
      images: [],
    },
  });

  function onSubmit(values: z.infer<typeof postCreateSchema>) {
    const { title, body, images } = values;
    execute({ title, body, images });
  }

  useEffect(() => {
    if (hasSucceeded) {
      form.reset();
      toast.success("Post created.");
    }

    if (hasErrored) {
      toast.error("Something went wrong.");
    }
  }, [hasErrored, hasSucceeded]);

  return (
    <CardWrapper
      title="Create new post"
      description="This will be create new post"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="body"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <RichTextEditor value={field.value} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Images</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value || []}
                    onChange={field.onChange}
                    max={4}
                  />
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

export default CreatePostForm;
