"use client";

import React from "react";
import Image from "next/image";
import logoImg from "@/assest/logo.4d3ab4ce51d282e13e6c.png";

interface MayaLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "light" | "dark";
  priority?: boolean;
}

export default function MayaLogo({
  className = "",
  size = "md",
  variant = "dark",
  priority = false,
}: MayaLogoProps) {
  // Sized larger for prominent, crystal-clear readability
  const heightClass = {
    sm: "h-11 sm:h-12",
    md: "h-14 sm:h-16 md:h-18",
    lg: "h-20 sm:h-24 md:h-28",
  }[size];

  return (
    <div className={`flex items-center group select-none ${className}`}>
      {/* Official Maya Exports Ltd logo with transparent background and larger sizing */}
      <Image
        src={logoImg}
        alt="Maya Exports Ltd — Fashion"
        priority={priority}
        className={`${heightClass} w-auto object-contain transition-transform duration-300 group-hover:scale-105`}
      />
    </div>
  );
}
