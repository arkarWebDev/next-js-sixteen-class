"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { updatePost } from "../actions/update-post";
import CardWrapper from "../../../components/card-wrapper";
import z from "zod";
import { postUpdateSchema } from "../schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useAction } from "next-safe-action/hooks";
import { useEffect } from "react";
import { toast } from "sonner";
import SubmitButton from "../../../components/submit-button";
import { Post } from "../../../../generated/prisma/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type EditPostFormProps = {
  post: Post;
};

function EditPostForm({ post }: EditPostFormProps) {
  const { isPending, execute, hasErrored, hasSucceeded } =
    useAction(updatePost);

  const form = useForm<z.infer<typeof postUpdateSchema>>({
    resolver: zodResolver(postUpdateSchema),
    defaultValues: {
      id: post.id as string,
      title: post.title,
      body: post.body,
      status: post.status,
    },
  });

  function onSubmit(values: z.infer<typeof postUpdateSchema>) {
    const { title, body, id, status } = values;
    execute({ title, body, id, status });
  }

  useEffect(() => {
    if (hasSucceeded) {
      form.reset();
      toast.success("Post updated.");
    }

    if (hasErrored) {
      toast.error("Something went wrong.");
    }
  }, [hasErrored, hasSucceeded]);
  return (
    <CardWrapper
      title="Update existing post"
      description="This will be update these existing post"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="id"
            render={({ field }) => (
              <FormItem className="hidden">
                <FormLabel>Id</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <FormControl>
                  <Select
                    name={field.name}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="item-aligned">
                      <SelectItem value="DONE">DONE</SelectItem>
                      <SelectItem value="IN_PROGRESS">IN_PROGRESS</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <SubmitButton label="Update" isPending={isPending} />
        </form>
      </Form>
    </CardWrapper>
  );
}

export default EditPostForm;
