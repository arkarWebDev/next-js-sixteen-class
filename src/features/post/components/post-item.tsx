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
import { getSession } from "@/lib/getSession";

interface Props extends Post {
  isCard?: boolean;
  user: User;
}

async function PostItem({
  id,
  title,
  body,
  isCard = true,
  status,
  user,
}: Props) {
  const session = await getSession();
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
          {user.id === session?.user.id && (
            <Link href={editPostPath(id)}>
              <Edit /> Edit
            </Link>
          )}
        </CardContent>
      )}

      {!isCard && <DeleteButton id={id} />}
    </Card>
  );
}

export default PostItem;
