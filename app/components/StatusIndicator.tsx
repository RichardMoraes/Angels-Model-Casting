"use client";

import { memo } from "react";
import { Circle, Crown, Clock } from "lucide-react";

/**
 * Props for the StatusIndicator component
 */
interface StatusIndicatorProps {
  /** Whether the talent is online */
  readonly isOnline: boolean;
  /** Whether the talent is premium */
  readonly isPremium: boolean;
  /** Whether the talent is available */
  readonly isAvailable: boolean;
  /** Size of the indicators */
  readonly size?: "sm" | "md" | "lg";
}

/**
 * Status indicator component showing online/offline, premium, and availability status
 */
const StatusIndicator = memo(function StatusIndicator({
  isOnline,
  isPremium,
  isAvailable,
  size = "sm",
}: StatusIndicatorProps) {
  const sizeClasses = {
    sm: "w-2 h-2",
    md: "w-3 h-3",
    lg: "w-4 h-4",
  };

  const iconSizeClasses = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  return (
    <div className="flex items-center gap-1">
      {/* Online/Offline Status */}
      <div className="relative">
        <Circle
          className={`${sizeClasses[size]} ${
            isOnline ? "text-green-500 fill-green-500" : "text-gray-400"
          } transition-colors duration-200`}
        />
        {isOnline && (
          <div className="absolute inset-0 animate-ping">
            <Circle
              className={`${sizeClasses[size]} text-green-500 fill-green-500 opacity-75`}
            />
          </div>
        )}
      </div>

      {/* Premium Badge */}
      {isPremium && (
        <div title="Premium Talent">
          <Crown
            className={`${iconSizeClasses[size]} text-yellow-500 fill-yellow-500 transition-all duration-200 hover:scale-110`}
          />
        </div>
      )}

      {/* Availability Status */}
      <div className="relative" title={isAvailable ? "Available" : "Not Available"}>
        <Clock
          className={`${iconSizeClasses[size]} ${
            isAvailable ? "text-blue-500" : "text-gray-400"
          } transition-colors duration-200`}
        />
      </div>
    </div>
  );
});

export default StatusIndicator;
