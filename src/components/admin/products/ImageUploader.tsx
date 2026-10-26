"use client";

import React, { useEffect, useRef } from "react";
import { Plus, X } from "lucide-react";

export type ImageDraft =
  | { kind: "existing"; url: string }
  | { kind: "new"; file: File; preview: string };

interface ImageUploaderProps {
  images: ImageDraft[];
  onChange: (images: ImageDraft[]) => void;
  max?: number;
}

export function ImageUploader({ images, onChange, max = 5 }: ImageUploaderProps) {
  const imagesRef = useRef(images);
  imagesRef.current = images;

  useEffect(() => {
    return () => {
      imagesRef.current.forEach((image) => {
        if (image.kind === "new") {
          URL.revokeObjectURL(image.preview);
        }
      });
    };
  }, []);

  const remaining = max - images.length;

  const addFiles = (fileList: FileList | null) => {
    if (!fileList || remaining <= 0) return;
    const next = [...images];
    Array.from(fileList)
      .filter((file) => file.type.startsWith("image/"))
      .slice(0, remaining)
      .forEach((file) => {
        next.push({ kind: "new", file, preview: URL.createObjectURL(file) });
      });
    onChange(next);
  };

  const removeAt = (index: number) => {
    const target = images[index];
    if (target?.kind === "new") {
      URL.revokeObjectURL(target.preview);
    }
    onChange(images.filter((_, current) => current !== index));
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-600">Images</span>
        <span className="text-[11px] text-slate-500">{images.length}/{max} uploaded</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {images.map((image, index) => (
          <div key={`${image.kind}-${index}`} className="relative aspect-square rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image.kind === "existing" ? image.url : image.preview}
              alt={`Product image ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={() => removeAt(index)}
              className="absolute top-1.5 right-1.5 p-1 rounded-full bg-white/90 text-slate-700 hover:text-red-600 shadow-sm"
              aria-label="Remove image"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
        {remaining > 0 ? (
          <label className="aspect-square rounded-xl border border-dashed border-slate-300 bg-white hover:border-blue-400 hover:bg-blue-50/40 cursor-pointer flex flex-col items-center justify-center gap-1 text-slate-500">
            <Plus className="w-5 h-5" />
            <span className="text-[11px] font-medium">Add image</span>
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              multiple
              className="sr-only"
              onChange={(event) => {
                addFiles(event.target.files);
                event.target.value = "";
              }}
            />
          </label>
        ) : null}
      </div>
      <p className="text-[11px] text-slate-500">JPG, PNG or WEBP. Maximum 5 images, 5MB each.</p>
    </div>
  );
}
