import { UploadRouter } from "@/app/api/uploadthing/core";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { generateReactHelpers } from "@uploadthing/react";
import { Trash2 } from "lucide-react";
import React, { useRef, useState } from "react";
import { toast } from "sonner";

const { useUploadThing } = generateReactHelpers<UploadRouter>();

interface ImageUploadProps {
  value: string[];
  onChange: (urls: string[]) => void;
  max?: number;
}

function ImageUpload({ value, onChange, max = 4 }: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  const valueRef = useRef(value);
  const onChangeRef = useRef(onChange);

  valueRef.current = value;
  onChangeRef.current = onChange;

  const { startUpload, isUploading } = useUploadThing("postImage", {
    onClientUploadComplete: (res: { url: string }[]) => {
      const urls = res.map((file) => file.url);
      if (urls.length) {
        onChangeRef.current([...valueRef.current, ...urls].slice(0, max));
        toast.success("Image uploaded.");
      }
      setDragActive(false);
    },
  });

  const handleFiles = async (fileList: FileList | null) => {
    if (!fileList?.length) return;
    const allowed = Math.max(0, max - value.length);
    if (allowed <= 0) {
      toast.error("Maxium images reached.");
      return;
    }
    const files = Array.from(fileList).slice(0, allowed);
    await startUpload(files);
    if (fileInputRef?.current) {
      fileInputRef.current.value = "";
    }
  };

  const onDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragActive(false);
    await handleFiles(event.dataTransfer.files);
  };

  const remaining = max - value.length;
  const showLimit = remaining <= 0;

  return (
    <div className="space-y-3">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={onDrop}
        className={cn(
          "relative flex flex-col gap-3 rounded-xl border border-dashed bg-linear-to-br from-secondary/50 to-accent/40 p-4 transition-all",
          dragActive
            ? "border-primary shadow-lg shadow-primary/20"
            : "border-border",
        )}
      />
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold">Attach images</p>
          <p className="text-xs text-muted-foreground">
            Drag & drop or click to upload. Up to {max} images, 4MB each.
          </p>
        </div>
        <Button
          type="button"
          variant={"outline"}
          size={"sm"}
          onClick={() => fileInputRef.current?.click()}
          disabled={showLimit || isUploading}
        >
          {isUploading ? <p>Uploading</p> : <p>Browse</p>}
        </Button>
      </div>
      <input
        type="file"
        ref={fileInputRef}
        multiple
        className="hidden"
        accept="image/*"
        onChange={(e) => handleFiles(e.target.files)}
      />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {value.map((url, i) => (
          <figure
            key={i}
            className="group relative overflow-hidden rounded-lg border bg-card shadow-sm"
          >
            <img
              src={url}
              alt={i.toString()}
              className="h-32 w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <button
              type="button"
              onClick={() => onChange(value.filter((img) => img !== url))}
              className="absolute right-2 top-2 bg-red-600 p-2 w-8 h-8 rounded-full"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </figure>
        ))}
        {value.length === 0 && <p className="text-xs">No images yet</p>}
        {showLimit && (
          <p className="text-xs font-medium text-muted-foreground">
            Reached the image limit.
          </p>
        )}
      </div>
    </div>
  );
}

export default ImageUpload;
