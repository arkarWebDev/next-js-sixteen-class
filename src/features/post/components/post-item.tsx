import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, MoveUpRight } from "lucide-react";
import Link from "next/link";
import { editPostPath, singlePostPath } from "@/path";
import { cn } from "@/lib/utils";
import { Post, User } from "../../../../generated/prisma/client";
import { Badge } from "@/components/ui/badge";
import DeleteButton from "./delete-button";
import { isOwner } from "@/lib/isOwner";
import PostImages from "./post-images";

interface Props extends Post {
  isCard?: boolean;
  user: User;
}

async function PostItem({
  id,
  title,
  body,
  isCard = true,
  images,
  status,
  user,
}: Props) {
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
        <PostImages images={images} />
        <p className="text-sm font-medium text-muted-foreground">
          @{user.name}
        </p>
      </CardHeader>
      {isCard && (
        <CardContent className="space-x-4">
          <Button asChild>
            <Link href={singlePostPath(id)}>
              <MoveUpRight /> Read
            </Link>
          </Button>
          {(await isOwner(user.id)) && (
            <Button asChild variant={"outline"}>
              <Link href={editPostPath(id)}>
                <Edit /> Edit
              </Link>
            </Button>
          )}
        </CardContent>
      )}

      {!isCard && (await isOwner(user.id)) && <DeleteButton id={id} />}
    </Card>
  );
}

export default PostItem;
