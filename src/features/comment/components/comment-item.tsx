import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Crown } from "lucide-react";
import { CommentwithUsername } from "../types/comment-with-username";
import CommentDeleteButton from "./comment-delete-button";
import { isOwner } from "@/lib/isOwner";

interface CommentItemProps {
  comment: CommentwithUsername;
}

async function CommentItem({ comment }: CommentItemProps) {
  const commentOwner = await isOwner(comment.userId);

  return (
    <Card className="text-sm px-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-1.5">
          <p
            className={cn(
              "font-medium",
              comment.user.isPremium
                ? "bg-linear-to-r from-amber-500 via-yellow-400 to-orange-500 bg-clip-text text-transparent"
                : "text-muted-foreground",
            )}
          >
            @{comment.user.name}
          </p>
          {comment.user.isPremium && (
            <Crown className="h-3.5 w-3.5 text-amber-500" />
          )}
        </div>
        <p className="text-muted-foreground">
          {comment.createdAt.toLocaleDateString()}
        </p>
      </div>
      <p className=" whitespace-pre-line text-base">{comment.content}</p>
      {commentOwner && (
        <div className="flex justify-end">
          <CommentDeleteButton id={comment.id} />
        </div>
      )}
    </Card>
  );
}

export default CommentItem;
