"use client";

import { memo } from "react";

/**
 * Skill tag types with their corresponding colors
 */
type SkillTagType = "F" | "E" | "O" | "R";

/**
 * Props for the SkillTag component
 */
interface SkillTagProps {
  /** Type of skill tag */
  readonly type: SkillTagType;
  /** Size of the tag */
  readonly size?: "sm" | "md" | "lg";
  /** Whether to show the full description */
  readonly showDescription?: boolean;
}

/**
 * Skill tag component with professional styling
 * F=Fotografia, E=Eventos, O=Online, R=Rádio/TV
 */
const SkillTag = memo(function SkillTag({
  type,
  size = "sm",
  showDescription = false,
}: SkillTagProps) {
  const tagConfig = {
    F: {
      color: "bg-blue-500",
      hoverColor: "hover:bg-blue-600",
      textColor: "text-white",
      description: "Fotografia",
    },
    E: {
      color: "bg-green-500",
      hoverColor: "hover:bg-green-600",
      textColor: "text-white",
      description: "Eventos",
    },
    O: {
      color: "bg-purple-500",
      hoverColor: "hover:bg-purple-600",
      textColor: "text-white",
      description: "Online",
    },
    R: {
      color: "bg-orange-500",
      hoverColor: "hover:bg-orange-600",
      textColor: "text-white",
      description: "Rádio/TV",
    },
  };

  const sizeClasses = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
    lg: "px-4 py-2 text-base",
  };

  const config = tagConfig[type];

  return (
    <span
      className={`
        ${config.color} ${config.hoverColor} ${config.textColor}
        ${sizeClasses[size]}
        rounded-full font-semibold
        transition-all duration-200
        hover:scale-105
        shadow-sm hover:shadow-md
        inline-flex items-center justify-center
        min-w-[24px] h-6
      `}
      title={showDescription ? undefined : config.description}
    >
      {type}
    </span>
  );
});

export default SkillTag;
