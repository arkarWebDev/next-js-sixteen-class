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
import { getSession } from "@/lib/getSession";
import VoteButtons from "./vote-buttons";

interface Props extends Post {
  isCard?: boolean;
  user: User;
  votes: { value: number; userId: string }[];
}

async function PostItem({
  id,
  title,
  body,
  isCard = true,
  images,
  status,
  user,
  votes,
}: Props) {
  const session = await getSession();
  const currentUserId = session?.user.id;

  const score = votes?.reduce((acc, vote) => acc + vote.value, 0) || 0;

  const userVote = currentUserId
    ? votes?.find((v) => v.userId === currentUserId)?.value || null
    : null;

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
        <CardDescription
          className={cn(
            isCard && "line-clamp-2",
            "prose dark:prose-invert prose-sm sm:prose-base max-w-none",
          )}
          dangerouslySetInnerHTML={{ __html: body }}
        />
        <PostImages images={images} />
        <p className="text-sm font-medium text-muted-foreground">
          @{user.name}
        </p>
        <div>
          <VoteButtons
            postId={id}
            initialScore={score}
            initialUserVote={userVote}
          />
        </div>
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
