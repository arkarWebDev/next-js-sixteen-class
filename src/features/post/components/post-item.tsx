import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Post } from "../types/post";
import { Button } from "@/components/ui/button";
import { MoveUpRight } from "lucide-react";
import Link from "next/link";
import { SINGLE_POST } from "@/path";
import { cn } from "@/lib/utils";

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
    </Card>
  );
}

export default PostItem;
