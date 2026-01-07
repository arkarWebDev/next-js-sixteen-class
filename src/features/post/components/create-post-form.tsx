"use client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createPost } from "@/features/post/actions/create-post";
import CardWrapper from "./card-wrapper";
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
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { toast } from "sonner";
import SubmitButton from "./submit-button";

function CreatePostForm() {
  const { execute, isPending, hasErrored, hasSucceeded } =
    useAction(createPost);

  const form = useForm<z.infer<typeof postCreateSchema>>({
    resolver: zodResolver(postCreateSchema),
    defaultValues: {
      title: "",
      body: "",
    },
  });

  function onSubmit(values: z.infer<typeof postCreateSchema>) {
    const { title, body } = values;
    execute({ title, body });
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
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea {...field} />
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
