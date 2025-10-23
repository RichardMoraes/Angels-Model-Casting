"use client";

import { memo } from "react";
import { Star } from "lucide-react";

/**
 * Props for the StarRating component
 */
interface StarRatingProps {
  /** Rating value from 1 to 5 */
  readonly rating: number;
  /** Whether to show the rating number */
  readonly showNumber?: boolean;
  /** Size of the stars */
  readonly size?: "sm" | "md" | "lg";
  /** Whether the rating is interactive */
  readonly interactive?: boolean;
  /** Callback when rating changes (for interactive mode) */
  readonly onRatingChange?: (rating: number) => void;
}

/**
 * Star rating component with professional styling
 * Displays 1-5 stars with optional rating number
 */
const StarRating = memo(function StarRating({
  rating,
  showNumber = true,
  size = "md",
  interactive = false,
  onRatingChange,
}: StarRatingProps) {
  const sizeClasses = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  const textSizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  const handleStarClick = (starRating: number) => {
    if (interactive && onRatingChange) {
      onRatingChange(starRating);
    }
  };

  const renderStar = (starNumber: number) => {
    const isFilled = starNumber <= Math.floor(rating);
    const isHalfFilled = starNumber === Math.ceil(rating) && rating % 1 !== 0;
    
    return (
      <Star
        key={starNumber}
        className={`${sizeClasses[size]} ${
          interactive ? "cursor-pointer hover-scale-enhanced" : ""
        } transition-all duration-200 ${
          isFilled || isHalfFilled
            ? "text-yellow-400 fill-yellow-400 hover-glow-enhanced"
            : "text-gray-300"
        } ${interactive ? "hover:text-yellow-300" : ""}`}
        onClick={() => handleStarClick(starNumber)}
      />
    );
  };

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map(renderStar)}
      </div>
      {showNumber && (
        <span className={`${textSizeClasses[size]} text-gray-600 font-medium ml-1`}>
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
});

export default StarRating;
