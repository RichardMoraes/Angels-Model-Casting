"use client";

import { memo } from "react";

interface LoadingSkeletonProps {
  readonly variant?: "card" | "text" | "avatar" | "button" | "image";
  readonly className?: string;
  readonly width?: string | number;
  readonly height?: string | number;
}

const LoadingSkeleton = memo(function LoadingSkeleton({
  variant = "card",
  className = "",
  width,
  height,
}: LoadingSkeletonProps) {
  const baseClasses = "loading-skeleton rounded-lg";
  
  const variantClasses = {
    card: "w-full h-80",
    text: "h-4 w-full",
    avatar: "w-12 h-12 rounded-full",
    button: "h-10 w-24",
    image: "w-full h-48",
  };

  const style = {
    ...(width && { width: typeof width === "number" ? `${width}px` : width }),
    ...(height && { height: typeof height === "number" ? `${height}px` : height }),
  };

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={style}
    />
  );
});

export default LoadingSkeleton;
