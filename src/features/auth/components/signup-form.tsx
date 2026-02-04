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
import { signUpSchema } from "../schemas";
import { useAction } from "next-safe-action/hooks";
import { signUp } from "../actions/signup";
import { useEffect } from "react";
import { toast } from "sonner";
import Link from "next/link";
import { signInPath } from "@/path";
import GithubOauthButton from "./github-oauth-form";
import { redirect } from "next/navigation";

function SignUpForm() {
  const { isPending, execute, result } = useAction(signUp);

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(values: z.infer<typeof signUpSchema>) {
    const { name, email, password, confirmPassword } = values;
    execute({ name, email, password, confirmPassword });
  }

  useEffect(() => {
    const data = result.data;

    if (!data) {
      return;
    }

    if (data?.success) {
      toast.success("Signup success.");
      redirect(signInPath);
    }

    if (!data?.success) {
      toast.error(data?.error);
    }
  }, [result]);

  const Footer = () => {
    return (
      <p className="text-sm font-medium text-muted-foreground">
        Already have an account ?{" "}
        <Link href={signInPath} className="underline">
          Sign in
        </Link>
      </p>
    );
  };

  return (
    <CardWrapper
      title="Sign up"
      description="Create your new account"
      footer={<Footer />}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="John Doe" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm password</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="******" type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <SubmitButton label="Sign up" isPending={isPending} />
        </form>
      </Form>
      <hr className=" text-muted-foreground my-6" />
      <GithubOauthButton />
    </CardWrapper>
  );
}

export default SignUpForm;
