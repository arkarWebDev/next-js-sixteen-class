import { ABOUT, POSTS } from "@/lib/path";
import Link from "next/link";
import { Button } from "./ui/button";
import { ModeToggle } from "./theme-toggler";

function Header() {
  return (
    <div className="flex items-center justify-between mt-4 mb-8">
      <Link
        href={"/"}
        className="text-2xl font-extrabold dark:bg-white bg-black text-white dark:text-black p-2"
      >
        Dev.io
      </Link>
      <div>
        <Button variant={"link"}>
          <Link href={POSTS}>Posts</Link>
        </Button>
        <Button variant={"link"}>
          <Link href={ABOUT}>About</Link>
        </Button>
        <ModeToggle />
      </div>
    </div>
  );
}

export default Header;
