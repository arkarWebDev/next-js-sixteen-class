import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, MoveUpRight } from "lucide-react";
import Link from "next/link";
import { editPostPath, singlePostPath } from "@/path";
import { cn } from "@/lib/utils";
import { Post } from "../../../../generated/prisma/client";
import { Badge } from "@/components/ui/badge";
import DeleteButton from "./delete-button";

interface Props extends Post {
  isCard?: boolean;
}

function PostItem({ id, title, body, isCard = true, status }: Props) {
  return (
    <Card className="relative">
      <Badge
        className="absolute top-4 right-4"
        variant={status === "IN_PROGRESS" ? "outline" : "default"}
      >
        {status}
      </Badge>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription className={cn(isCard && "line-clamp-2")}>
          {body}
        </CardDescription>
      </CardHeader>
      {isCard && (
        <CardContent className="space-x-4">
          <Button asChild>
            <Link href={singlePostPath(id)}>
              <MoveUpRight /> Read
            </Link>
          </Button>
          <Button variant="secondary" asChild>
            <Link href={editPostPath(id)}>
              <Edit /> Edit
            </Link>
          </Button>
        </CardContent>
      )}
      {!isCard && <DeleteButton id={id} />}
    </Card>
  );
}

export default PostItem;
