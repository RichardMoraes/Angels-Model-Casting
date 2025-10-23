"use client";

import { memo } from "react";
import { Input } from "../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Button } from "../../components/ui/button";
import { Search, X } from "lucide-react";

/**
 * Props for the Filters component
 */
interface FiltersProps {
  /** Current search term */
  readonly searchTerm: string;
  /** Currently selected gender filter */
  readonly selectedGender: string;
  /** Currently selected age range filter */
  readonly selectedAgeRange: string;
  /** Callback for search term changes */
  readonly onSearchChange: (value: string) => void;
  /** Callback for gender filter changes */
  readonly onGenderChange: (value: string) => void;
  /** Callback for age range filter changes */
  readonly onAgeRangeChange: (value: string) => void;
  /** Callback to clear all filters */
  readonly onClearFilters: () => void;
}

/**
 * Basic filtering component with search, gender, and age range filters
 * Features animated transitions and responsive design
 */
const Filters = memo(function Filters({
  searchTerm,
  selectedGender,
  selectedAgeRange,
  onSearchChange,
  onGenderChange,
  onAgeRangeChange,
  onClearFilters,
}: FiltersProps) {
  const hasActiveFilters = searchTerm || selectedGender || selectedAgeRange;

  return (
    <div className="space-y-6 animate-in fade-in-0 slide-in-from-top-4 duration-500">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="h-8 w-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center animate-pulse">
            <Search className="h-4 w-4 text-white" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Filters</h2>
        </div>
        {hasActiveFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={onClearFilters}
            className="flex items-center gap-2 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all duration-200 animate-in fade-in-0 slide-in-from-right-4"
          >
            <X className="h-4 w-4" />
            Clear filters
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Search Input */}
        <div
          className="space-y-3 animate-in fade-in-0 slide-in-from-left-4 duration-500"
          style={{ animationDelay: "100ms" }}
        >
          <label
            htmlFor="search-input"
            className="text-sm font-semibold text-slate-700"
          >
            Search by name
          </label>
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400 transition-colors duration-200 group-focus-within:text-blue-500" />
            <Input
              id="search-input"
              placeholder="Enter talent name..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-12 h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl bg-white/50 backdrop-blur-sm transition-all duration-200 hover:bg-white/70 focus:bg-white/90"
            />
          </div>
        </div>

        {/* Gender Filter */}
        <div
          className="space-y-3 animate-in fade-in-0 slide-in-from-left-4 duration-500"
          style={{ animationDelay: "200ms" }}
        >
          <label
            htmlFor="gender-select"
            className="text-sm font-semibold text-slate-700"
          >
            Gender
          </label>
          <Select value={selectedGender} onValueChange={onGenderChange}>
            <SelectTrigger
              id="gender-select"
              className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl bg-white/50 backdrop-blur-sm transition-all duration-200 hover:bg-white/70 focus:bg-white/90"
            >
              <SelectValue placeholder="All genders" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-slate-200">
              <SelectItem value="all">All genders</SelectItem>
              <SelectItem value="Female">Female</SelectItem>
              <SelectItem value="Male">Male</SelectItem>
              <SelectItem value="Non-binary">Non-binary</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Age Range Filter */}
        <div
          className="space-y-3 animate-in fade-in-0 slide-in-from-left-4 duration-500"
          style={{ animationDelay: "300ms" }}
        >
          <label
            htmlFor="age-select"
            className="text-sm font-semibold text-slate-700"
          >
            Age Range
          </label>
          <Select value={selectedAgeRange} onValueChange={onAgeRangeChange}>
            <SelectTrigger
              id="age-select"
              className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl bg-white/50 backdrop-blur-sm transition-all duration-200 hover:bg-white/70 focus:bg-white/90"
            >
              <SelectValue placeholder="All ages" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-slate-200">
              <SelectItem value="all">All ages</SelectItem>
              <SelectItem value="18-25">18-25 years</SelectItem>
              <SelectItem value="26-35">26-35 years</SelectItem>
              <SelectItem value="36-45">36-45 years</SelectItem>
              <SelectItem value="45+">45+ years</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
});

export default Filters;
