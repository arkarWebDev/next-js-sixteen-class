import { postsPath, profilePath, signInPath, signUpPath } from "@/path";
import Link from "next/link";
import { Button } from "./ui/button";
import { ModeToggle } from "./theme-toggler";
import { signOut } from "@/features/auth/actions/signout";
import { getSession } from "@/lib/getSession";

async function Header() {
  const session = await getSession();

  return (
    <div className="flex items-center justify-between mt-4 mb-8">
      <Link
        href={"/"}
        className="text-2xl font-extrabold dark:bg-white bg-black text-white dark:text-black p-2"
      >
        Dev.io
      </Link>
      <div className="flex items-center gap-2">
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
      <Button size={"sm"}>
        <Link href={signUpPath}>Sign up</Link>
      </Button>
      <Button variant={"outline"} size={"sm"}>
        <Link href={signInPath}>Sign in</Link>
      </Button>
    </div>
  );
}

function SignOutButton() {
  return (
    <>
      <Button variant={"link"}>
        <Link href={profilePath}>profile</Link>
      </Button>
      <Button variant={"link"}>
        <Link href={postsPath}>my posts</Link>
      </Button>
      <form action={signOut}>
        <Button
          variant={"destructive"}
          type="submit"
          className="cursor-pointer"
          size={"sm"}
        >
          Sign out
        </Button>
      </form>
    </>
  );
}
