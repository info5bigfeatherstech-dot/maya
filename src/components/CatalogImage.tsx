"use client";

import React from "react";
import Image from "next/image";

interface CatalogImageProps {
  src?: string;
  alt: string;
  fill?: boolean;
  sizes?: string;
  className?: string;
  priority?: boolean;
}

export function CatalogImage({
  src,
  alt,
  fill = true,
  sizes,
  className,
  priority,
}: CatalogImageProps) {
  if (!src) {
    return <div className="w-full h-full bg-slate-100" />;
  }

  const isLocalUpload =
    src.includes("localhost") || src.includes("127.0.0.1") || src.includes("/uploads/products/");

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      sizes={sizes}
      priority={priority}
      unoptimized={isLocalUpload}
      className={className}
    />
  );
}
