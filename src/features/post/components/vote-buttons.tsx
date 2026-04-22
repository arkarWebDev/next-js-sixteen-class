"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowBigDown, ArrowBigUp } from "lucide-react";
import { useState, useTransition } from "react";
import { voteOnPost } from "../actions/vote-post";

interface VoteButtonProps {
  postId: string;
  initialScore: number;
  initialUserVote: number | null;
}

function VoteButtons({
  postId,
  initialScore,
  initialUserVote,
}: VoteButtonProps) {
  const [score, setScore] = useState(initialScore);
  const [userVote, setUserVote] = useState(initialUserVote);
  const [isPending, startTransition] = useTransition();

  const handleVote = (value: number) => {
    const newVote = userVote === value ? null : value;

    const prevVoteValue = userVote || 0;
    const newVoteValue = newVote || 0;
    const scoreDiff = newVoteValue - prevVoteValue;

    setScore(score + scoreDiff);
    setUserVote(newVote);

    startTransition(async () => {
      try {
        await voteOnPost(postId, value);
      } catch (err) {
        setScore(score);
        setUserVote(userVote);
        console.error("Failed to vote:", err);
      }
    });
  };

  return (
    <div className="flex items-center gap-1">
      <Button
        variant={"ghost"}
        size={"icon"}
        className={cn(
          "h-8 w-8",
          userVote === 1
            ? "text-orange-500 hover:text-orange-600"
            : "text-muted-foreground hover:text-foreground",
        )}
        disabled={isPending}
        onClick={() => handleVote(1)}
      >
        <ArrowBigUp
          className={cn("h-6 w-6", userVote === 1 && "fill-current")}
        />
      </Button>
      <span className="text-sm font-bold text-center">{score}</span>
      <Button
        variant={"ghost"}
        size={"icon"}
        className={cn(
          "h-8 w-8",
          userVote === -1
            ? "text-blue-500 hover:text-blue-600"
            : "text-muted-foreground hover:text-foreground",
        )}
        disabled={isPending}
        onClick={() => handleVote(-1)}
      >
        <ArrowBigDown
          className={cn("h-6 w-6", userVote === -1 && "fill-current")}
        />
      </Button>
    </div>
  );
}

export default VoteButtons;
