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
import Link from "next/link";
import { resetPasswordPath, signUpPath } from "@/path";
import GithubOauthButton from "./github-oauth-form";
import { useRouter } from "next/navigation";

function SignInForm() {
  const { isPending, execute, result } = useAction(signIn);
  const router = useRouter();

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
    const data = result.data;

    if (!data) {
      return;
    }

    if (data?.success) {
      toast.success("Signin success.");
      router.push("/");
      router.refresh();
    }

    if (!data?.success) {
      toast.error(data?.error);
    }
  }, [result]);

  const Footer = () => {
    return (
      <div className="text-sm font-medium text-muted-foreground flex justify-between w-full">
        <p>
          Don't have an account ?{" "}
          <Link href={signUpPath} className="underline">
            Sign up
          </Link>
        </p>
        <Link href={resetPasswordPath} className="underline">
          forgot password?
        </Link>
      </div>
    );
  };

  return (
    <CardWrapper
      title="Sign in"
      description="Sign in your existing account"
      footer={<Footer />}
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
      <hr className=" text-muted-foreground my-6" />
      <GithubOauthButton />
    </CardWrapper>
  );
}

export default SignInForm;
