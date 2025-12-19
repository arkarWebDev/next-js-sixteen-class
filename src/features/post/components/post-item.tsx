import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Post } from "../types/post";
import { Button } from "@/components/ui/button";
import { MoveUpRight } from "lucide-react";
import Link from "next/link";
import { SINGLE_POST } from "@/lib/path";
import { cn } from "@/lib/utils";
import { deletePost } from "../actions/delete-post";

interface Props extends Post {
  isCard?: boolean;
}

function PostItem({ id, title, body, isCard = true }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription className={cn(isCard && "line-clamp-2")}>
          {body}
        </CardDescription>
      </CardHeader>
      {isCard && (
        <CardContent>
          <Button variant="outline" size="sm" asChild>
            <Link href={SINGLE_POST(id)}>
              <MoveUpRight /> Read
            </Link>
          </Button>
        </CardContent>
      )}
      {!isCard && (
        <CardFooter>
          <form action={deletePost.bind(null, id as string)}>
            <Button variant={"destructive"} size={"sm"}>
              Delete
            </Button>
          </form>
        </CardFooter>
      )}
    </Card>
  );
}

export default PostItem;
