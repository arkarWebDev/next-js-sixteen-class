"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import CardWrapper from "@/components/card-wrapper";
import z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import SubmitButton from "@/components/submit-button";
import { useAction } from "next-safe-action/hooks";
import { useEffect } from "react";
import { toast } from "sonner";
import { changePasswordSchema } from "../schemas/auth.change-password";
import { changePassword } from "../actions/change-password";
import { notFound, useSearchParams } from "next/navigation";

function ChangePasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  if (!token) {
    return notFound();
  }

  const { isPending, execute, hasErrored, hasSucceeded } =
    useAction(changePassword);

  const form = useForm<z.infer<typeof changePasswordSchema>>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      newPassword: "",
      token,
    },
  });

  function onSubmit(values: z.infer<typeof changePasswordSchema>) {
    const { newPassword, token } = values;
    execute({ newPassword, token });
  }

  useEffect(() => {
    if (hasSucceeded) {
      form.reset();
      toast.success("Your password has changed.");
    }

    if (hasErrored) {
      toast.error("Something went wrong.");
    }
  }, [hasErrored, hasSucceeded]);

  return (
    <CardWrapper
      title="Change password"
      description="Update your account password"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New password</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="**********" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <SubmitButton label="Change password" isPending={isPending} />
        </form>
      </Form>
    </CardWrapper>
  );
}

export default ChangePasswordForm;
