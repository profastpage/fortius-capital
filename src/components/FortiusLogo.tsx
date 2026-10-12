"use client";

import React from "react";
import Image from "next/image";

interface FortiusLogoProps {
  className?: string;
  variant?: "dark" | "light" | "gold";
  size?: "sm" | "md" | "lg";
  priority?: boolean;
}

export default function FortiusLogo({
  className = "",
  variant = "dark",
  size = "md",
  priority = true,
}: FortiusLogoProps) {
  // Preset sizes preserving the original 791x300 aspect ratio (~2.64:1)
  const sizeMap = {
    sm: { width: 95, height: 36, imgClass: "h-8 sm:h-9 w-auto" },
    md: { width: 132, height: 50, imgClass: "h-10 sm:h-12 w-auto" },
    lg: { width: 174, height: 66, imgClass: "h-14 sm:h-16 w-auto" },
  };

  const current = sizeMap[size] || sizeMap.md;

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <Image
        src="/images/logo-fortius.png"
        alt="Fortius Capital - RUC: 20616561082"
        width={current.width}
        height={current.height}
        className={`${current.imgClass} max-h-full object-contain`}
        priority={priority}
      />
    </div>
  );
}
