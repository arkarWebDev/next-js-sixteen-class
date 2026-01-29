import { postsPath, signInPath, signUpPath } from "@/path";
import Link from "next/link";
import { Button } from "./ui/button";
import { ModeToggle } from "./theme-toggler";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { signOut } from "@/features/auth/actions/signout";

async function Header() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div className="flex items-center justify-between mt-4 mb-8">
      <Link
        href={"/"}
        className="text-2xl font-extrabold dark:bg-white bg-black text-white dark:text-black p-2"
      >
        Dev.io
      </Link>
      <div className="flex items-center gap-2">
        <Button variant={"link"}>
          <Link href={postsPath}>Posts</Link>
        </Button>
        {session ? <SignOutButton /> : <SignInAndSignUpButtons />}
        <ModeToggle />
      </div>
    </div>
  );
}

export default Header;

function SignInAndSignUpButtons() {
  return (
    <div className="space-x-2">
      <Button>
        <Link href={signUpPath}>Sign up</Link>
      </Button>
      <Button variant={"outline"}>
        <Link href={signInPath}>Sign in</Link>
      </Button>
    </div>
  );
}

function SignOutButton() {
  return (
    <form action={signOut}>
      <Button variant={"destructive"} type="submit" className="cursor-pointer">
        Sign out
      </Button>
    </form>
  );
}
