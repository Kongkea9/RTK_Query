"use client";

import { useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { XIcon, CloudUpload } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ImageFile {
  id: string;
  file: File;
  preview: string;
}

interface Props {
  images: ImageFile[];
  onImagesChange: (images: ImageFile[]) => void;
  maxFiles?: number;
  maxSize?: number;
  className?: string;
}

export default function ImageUpload({
  images,
  onImagesChange,
  maxFiles = 10,
  maxSize = 2 * 1024 * 1024,
  className,
}: Props) {
  const addImages = useCallback(
    (files: FileList | File[]) => {
      const newImages: ImageFile[] = [];

      Array.from(files).forEach((file) => {
        if (!file.type.startsWith("image/")) return;
        if (file.size > maxSize) return;
        if (images.length + newImages.length >= maxFiles) return;

        newImages.push({
          id: crypto.randomUUID(),
          file,
          preview: URL.createObjectURL(file),
        });
      });

      onImagesChange([...images, ...newImages]);
    },
    [images, maxFiles, maxSize, onImagesChange],
  );

  const removeImage = (id: string) => {
    onImagesChange(
      images.filter((img) => {
        if (img.id === id) URL.revokeObjectURL(img.preview);
        return img.id !== id;
      }),
    );
  };

  const openFileDialog = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.multiple = true;
    input.accept = "image/*";

    input.onchange = (e) => {
      const target = e.target as HTMLInputElement;
      if (target.files) addImages(target.files);
    };

    input.click();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    addImages(e.dataTransfer.files);
  };

  return (
    <div className={cn("w-full", className)}>
      {images.length > 0 && (
        <div className="grid grid-cols-4 gap-2 mb-4">
          {images.map((img) => (
            <Card key={img.id} className="relative group">
              <img
                src={img.preview}
                className="h-24 w-full object-cover rounded-md"
              />

              <Button
                size="icon"
                variant="outline"
                onClick={() => removeImage(img.id)}
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100"
              >
                <XIcon className="size-4" />
              </Button>
            </Card>
          ))}
        </div>
      )}

      <Card
        className="border-dashed cursor-pointer"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <CardContent className="text-center py-8">
          <CloudUpload className="mx-auto mb-3" />
          <p className="text-sm mb-3">Drag & drop images or click browse</p>

          <Button type="button" size="sm" onClick={openFileDialog}>
            Browse Files
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
