"use client";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { Github } from "lucide-react";

function GithubOauthButton() {
  const githubAuthHandler = async () => {
    await authClient.signIn.social({
      provider: "github",
    });
  };
  return (
    <Button onClick={githubAuthHandler} variant={"outline"} className="w-full">
      <Github />
      <span>Continue with github</span>
    </Button>
  );
}

export default GithubOauthButton;
