"use client";

import { memo } from "react";
import { Button } from "../../components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Props for the Pagination component
 */
interface PaginationProps {
  /** Current active page number */
  readonly currentPage: number;
  /** Total number of pages */
  readonly totalPages: number;
  /** Callback function when page changes */
  readonly onPageChange: (page: number) => void;
}

/**
 * Pagination component with smart page number display
 * Features ellipsis for large page counts and responsive design
 */
const Pagination = memo(function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  /**
   * Calculates visible page numbers with ellipsis
   * Shows current page ± delta pages, with ellipsis for gaps
   */
  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  return (
    <div className="flex items-center justify-center space-x-2 sm:space-x-3 animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center gap-1 sm:gap-2 h-9 sm:h-10 px-3 sm:px-4 rounded-xl border-slate-200 hover:border-blue-500 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 text-xs sm:text-sm hover:scale-105"
      >
        <ChevronLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        <span className="hidden sm:inline">Previous</span>
        <span className="sm:hidden">Prev</span>
      </Button>

      <div className="flex items-center space-x-1 sm:space-x-2">
        {getVisiblePages().map((page, index) => {
          if (page === "...") {
            return (
              <span
                key={`dots-${currentPage}-${index}`}
                className="px-2 sm:px-3 py-2 text-slate-400 font-medium text-xs sm:text-sm"
              >
                ...
              </span>
            );
          }

          const isActive = currentPage === page;
          return (
            <Button
              key={`page-${page}`}
              variant={isActive ? "default" : "outline"}
              size="sm"
              onClick={() => onPageChange(page as number)}
              className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl font-semibold transition-all duration-200 text-xs sm:text-sm hover:scale-105 ${
                isActive
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg hover:shadow-xl"
                  : "border-slate-200 hover:border-blue-500 hover:bg-blue-50 text-slate-700"
              }`}
              style={{
                animationDelay: `${index * 50}ms`,
              }}
            >
              {page}
            </Button>
          );
        })}
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center gap-1 sm:gap-2 h-9 sm:h-10 px-3 sm:px-4 rounded-xl border-slate-200 hover:border-blue-500 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 text-xs sm:text-sm hover:scale-105"
      >
        <span className="hidden sm:inline">Next</span>
        <span className="sm:hidden">Next</span>
        <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
      </Button>
    </div>
  );
});

export default Pagination;
