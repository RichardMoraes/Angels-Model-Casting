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
import { 
  Search, 
  X, 
  ArrowUpDown, 
  RotateCcw, 
  Settings,
  Filter,
  Plus,
  Star
} from "lucide-react";

/**
 * Props for the AdvancedFilters component
 */
interface AdvancedFiltersProps {
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
  /** Callback to clear all filters */
  readonly onClearFilters: () => void;
  /** Total number of results */
  readonly totalResults: number;
}

/**
 * Advanced filtering component with multiple filter options
 * Features search, gender, age range, ethnicity, DRT status, and location filters
 */
const AdvancedFilters = memo(function AdvancedFilters({
  searchTerm,
  selectedGender,
  selectedAgeRange,
  onSearchChange,
  onGenderChange,
  onClearFilters,
  totalResults,
}: AdvancedFiltersProps) {
  const hasActiveFilters = searchTerm || selectedGender !== "all" || selectedAgeRange !== "all";

  return (
    <div className="bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Main Filter Section */}
        <div className="space-y-4">
          {/* First Row - Primary Search and Basic Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
            {/* Main Search Input */}
            <div className="relative sm:col-span-2 lg:col-span-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search by name..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10 h-10 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-lg bg-white"
              />
            </div>

            {/* Age Range */}
            <div className="flex items-center gap-2">
              <Input
                placeholder="From"
                className="w-16 sm:w-20 h-10 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-lg bg-white text-center text-sm px-1 sm:px-2"
              />
              <span className="text-slate-500 text-xs sm:text-sm whitespace-nowrap">
                to
              </span>
              <Input
                placeholder="To"
                className="w-16 sm:w-20 h-10 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-lg bg-white text-center text-sm px-1 sm:px-2"
              />
            </div>

            {/* Gender Select */}
            <Select value={selectedGender} onValueChange={onGenderChange}>
              <SelectTrigger className="w-full h-10 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-lg bg-white">
                <SelectValue placeholder="Gender" />
              </SelectTrigger>
              <SelectContent className="rounded-lg border-slate-200">
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Non-binary">Non-binary</SelectItem>
              </SelectContent>
            </Select>

            {/* General Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="General Search"
                className="pl-10 w-full h-10 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-lg bg-white"
              />
            </div>
          </div>

          {/* Second Row - Additional Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
            {/* Additional Filters */}
            <Select>
              <SelectTrigger className="w-full h-10 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-lg bg-white">
                <SelectValue placeholder="Ethnicity" />
              </SelectTrigger>
              <SelectContent className="rounded-lg border-slate-200">
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="branca">White</SelectItem>
                <SelectItem value="negra">Black</SelectItem>
                <SelectItem value="parda">Mixed</SelectItem>
                <SelectItem value="asiatica">Asian</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="w-full h-10 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-lg bg-white">
                <SelectValue placeholder="DRT" />
              </SelectTrigger>
              <SelectContent className="rounded-lg border-slate-200">
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="sim">Yes</SelectItem>
                <SelectItem value="nao">No</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="w-full h-10 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-lg bg-white">
                <SelectValue placeholder="Performance" />
              </SelectTrigger>
              <SelectContent className="rounded-lg border-slate-200">
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="modelo">Model</SelectItem>
                <SelectItem value="ator">Actor</SelectItem>
                <SelectItem value="apresentador">Presenter</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="w-full h-10 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-lg bg-white">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent className="rounded-lg border-slate-200">
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="sp">São Paulo</SelectItem>
                <SelectItem value="rj">Rio de Janeiro</SelectItem>
                <SelectItem value="pr">Paraná</SelectItem>
                <SelectItem value="rs">Rio Grande do Sul</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Action Controls Row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-slate-100">
          {/* Left Side - Action Buttons */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0 border-slate-200 hover:bg-slate-50"
            >
              <Plus className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0 border-slate-200 hover:bg-slate-50"
            >
              <ArrowUpDown className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0 border-slate-200 hover:bg-slate-50"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0 border-slate-200 hover:bg-slate-50"
            >
              <Filter className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0 border-slate-200 hover:bg-slate-50"
            >
              <Settings className="h-4 w-4" />
            </Button>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <Button
                variant="outline"
                size="sm"
                onClick={onClearFilters}
                className="h-8 px-3 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 flex items-center gap-1 whitespace-nowrap ml-2"
              >
                <X className="h-3 w-3" />
                <span className="text-xs">Clear</span>
              </Button>
            )}
          </div>

          {/* Right Side - Results and Premium */}
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-slate-600 whitespace-nowrap">
              {totalResults.toLocaleString()} talents
            </span>

            <Button className="h-8 btn-primary text-white px-4 rounded-lg font-medium flex items-center gap-2 whitespace-nowrap hover-scale">
              <Star className="h-4 w-4" />
              <span className="hidden lg:inline">AZ Talent Premium</span>
              <span className="lg:hidden">Premium</span>
            </Button>
          </div>
        </div>

        {/* Secondary Filter Row (Optional) */}
        <div className="mt-3 pt-3 border-t border-slate-100">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
            <span className="text-sm text-slate-500 whitespace-nowrap">
              Quick filters:
            </span>
            <div className="flex items-center gap-2 flex-wrap">
              <Button
                variant="outline"
                size="sm"
                className="h-7 px-3 text-xs border-gray-200 hover:bg-gray-50 hover-scale transition-professional"
              >
                New
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-7 px-3 text-xs border-gray-200 hover:bg-gray-50 hover-scale transition-professional"
              >
                Premium
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-7 px-3 text-xs border-gray-200 hover:bg-gray-50 hover-scale transition-professional"
              >
                Available
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-7 px-3 text-xs border-gray-200 hover:bg-gray-50 hover-scale transition-professional"
              >
                With DRT
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default AdvancedFilters;
