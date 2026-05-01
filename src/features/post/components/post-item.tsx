import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Crown, Edit, MessageCircle, MoveUpRight } from "lucide-react";
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
  _count: {
    comments: number;
  };
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
  _count,
  tags,
}: Props) {
  const session = await getSession();
  const currentUserId = session?.user.id;

  const score = votes?.reduce((acc, vote) => acc + vote.value, 0) || 0;

  const userVote = currentUserId
    ? votes?.find((v) => v.userId === currentUserId)?.value || null
    : null;

  return (
    <Card className="relative overflow-hidden border-border/60 bg-card/80 backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/5">
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/40 to-transparent" />
      <Badge
        className="absolute top-4 right-4 rounded-full px-2.5"
        variant={status === "IN_PROGRESS" ? "outline" : "default"}
      >
        {status}
      </Badge>
      <CardHeader className="gap-4 pb-4">
        <CardTitle
          className={cn("pr-20 leading-tight", isCard && "line-clamp-2")}
        >
          {title}
        </CardTitle>
        <CardDescription
          className={cn(
            isCard && "line-clamp-2",
            "prose dark:prose-invert prose-sm sm:prose-base max-w-none leading-relaxed text-foreground/90",
          )}
          dangerouslySetInnerHTML={{ __html: body }}
        />
        <PostImages images={images} />
        {tags && tags.length > 0 && (
          <div className="mt-1 flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <Link key={tag} href={`/?tag=${tag}`}>
                <Badge
                  variant={"outline"}
                  className="cursor-pointer rounded-full border-border/70 px-2.5 py-0.5 text-xs transition-colors hover:bg-secondary"
                >
                  #{tag}
                </Badge>
              </Link>
            ))}
          </div>
        )}
        <div className="flex items-center justify-between gap-3 border-t border-border/60 pt-3">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5">
              <p
                className={cn(
                  "text-sm font-medium",
                  user.isPremium
                    ? "bg-linear-to-r from-amber-500 via-yellow-400 to-orange-500 bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(245,158,11,0.35)]"
                    : "text-muted-foreground",
                )}
              >
                @{user.name}
              </p>
              {user.isPremium && (
                <Crown className="h-3.5 w-3.5 text-amber-500" />
              )}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <MessageCircle className="h-3.5 w-3.5" />
              <span>{_count.comments} comments</span>
            </div>
          </div>
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
