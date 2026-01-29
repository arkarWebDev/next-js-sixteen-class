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
import { signInSchema } from "../schemas";
import { useAction } from "next-safe-action/hooks";
import { useEffect } from "react";
import { toast } from "sonner";
import { signIn } from "../actions/signin";

function SignInForm() {
  const { isPending, execute, hasErrored, hasSucceeded } = useAction(signIn);

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof signInSchema>) {
    const { email, password } = values;
    execute({ email, password });
  }

  useEffect(() => {
    if (hasSucceeded) {
      form.reset();
      toast.success("SignUp success.");
    }

    if (hasErrored) {
      toast.error("Something went wrong.");
    }
  }, [hasErrored, hasSucceeded]);

  return (
    <CardWrapper title="Sign in" description="Sign in your existing account">
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

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="******" type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <SubmitButton label="Sign in" isPending={isPending} />
        </form>
      </Form>
    </CardWrapper>
  );
}

export default SignInForm;
