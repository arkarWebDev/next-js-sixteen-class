"use client";

import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

interface TagFilterProps {
  tag?: string;
}

function TagFilter({ tag }: TagFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  if (!tag) return null;

  function handleRemove() {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("tag");
    // Keep other params (search, sort, page)
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    router.push(newUrl);
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground">Filtered by:</span>
      <Badge variant="secondary" className="flex items-center gap-1">
        #{tag}
        <button
          type="button"
          onClick={handleRemove}
          className="ml-1 hover:text-destructive transition-colors"
          aria-label="Remove tag filter"
        >
          <X className="w-3 h-3" />
        </button>
      </Badge>
    </div>
  );
}

export default TagFilter;
