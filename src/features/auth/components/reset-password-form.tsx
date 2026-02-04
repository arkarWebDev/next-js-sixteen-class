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
import { resetPassword } from "../actions/reset-password";
import { resetPasswordSchema } from "../schemas/auth.reset-password";

function ResetPasswordForm() {
  const { isPending, execute, hasErrored, hasSucceeded } =
    useAction(resetPassword);

  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof resetPasswordSchema>) {
    const { email } = values;
    execute({ email });
  }

  useEffect(() => {
    if (hasSucceeded) {
      form.reset();
      toast.success("Reset password email sent.");
    }

    if (hasErrored) {
      toast.error("Something went wrong.");
    }
  }, [hasErrored, hasSucceeded]);

  return (
    <CardWrapper
      title="Reset password"
      description="Reset password using your email address."
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="example@example.com" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <SubmitButton label="Reset password" isPending={isPending} />
        </form>
      </Form>
    </CardWrapper>
  );
}

export default ResetPasswordForm;
