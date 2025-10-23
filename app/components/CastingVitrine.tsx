"use client";

import {
  useState,
  useMemo,
  useEffect,
  useCallback,
  lazy,
  Suspense,
} from "react";
import { TalentProfile } from "../types/TalentProfile";
import { talentos } from "../data/talentos";
import Header from "./Header";
import TalentCard from "./TalentCard";
import AdvancedFilters from "./AdvancedFilters";
import Pagination from "./Pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { LayoutGrid } from "lucide-react";

// Lazy load TalentDetailSheet for better performance
const TalentDetailSheet = lazy(() => import("./TalentDetailSheet"));

/**
 * Main casting showcase component
 * Features talent filtering, pagination, responsive grid layout, and detailed talent views
 */
export default function CastingVitrine() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGender, setSelectedGender] = useState("all");
  const [selectedAgeRange, setSelectedAgeRange] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTalent, setSelectedTalent] = useState<TalentProfile | null>(
    null
  );
  const [isDetailSheetOpen, setIsDetailSheetOpen] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [selectedColumns, setSelectedColumns] = useState<number | null>(null);

  // Calculate items per page based on screen size and selected columns
  useEffect(() => {
    const updateItemsPerPage = () => {
      const width = window.innerWidth;
      const columns = selectedColumns || getDefaultColumns(width);

      if (width < 640) {
        setItemsPerPage(columns * 8); // 8 rows for mobile
      } else if (width < 1024) {
        setItemsPerPage(columns * 6); // 6 rows for tablet
      } else {
        setItemsPerPage(columns * 5); // 5 rows for desktop
      }
    };

    const getDefaultColumns = (width: number) => {
      if (width < 640) return 1;
      if (width < 1024) return 2;
      if (width < 1280) return 3;
      return 4;
    };

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, [selectedColumns]);

  // Reset to page 1 when itemsPerPage changes
  useEffect(() => {
    setCurrentPage(1);
  }, [itemsPerPage]);

  // Get grid classes based on selected columns
  const getGridClasses = () => {
    if (selectedColumns === null) {
      return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
    }

    switch (selectedColumns) {
      case 1:
        return "grid-cols-1";
      case 2:
        return "grid-cols-1 sm:grid-cols-2";
      case 3:
        return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
      case 4:
        return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
      default:
        return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
    }
  };

  // Filter talents based on search criteria
  const filteredTalents = useMemo(() => {
    return talentos.filter((talent) => {
      const matchesSearch = talent.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesGender =
        !selectedGender ||
        selectedGender === "all" ||
        talent.gender === selectedGender;

      const matchesAgeRange =
        !selectedAgeRange ||
        selectedAgeRange === "all" ||
        (() => {
          const [min, max] = selectedAgeRange.split("-").map(Number);
          if (selectedAgeRange === "45+") {
            return talent.age >= 45;
          }
          return talent.age >= min && talent.age <= max;
        })();

      return matchesSearch && matchesGender && matchesAgeRange;
    });
  }, [searchTerm, selectedGender, selectedAgeRange]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredTalents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTalents = filteredTalents.slice(startIndex, endIndex);

  // Reset to page 1 when itemsPerPage changes
  useEffect(() => {
    setCurrentPage(1);
  }, [itemsPerPage]);

  // Event handlers with useCallback for performance
  const handleTalentClick = useCallback((talent: TalentProfile) => {
    setSelectedTalent(talent);
    setIsDetailSheetOpen(true);
  }, []);

  const handleDetailSheetClose = useCallback(() => {
    setIsDetailSheetOpen(false);
    setSelectedTalent(null);
  }, []);

  const handleClearFilters = useCallback(() => {
    setSearchTerm("");
    setSelectedGender("all");
    setSelectedAgeRange("all");
    setCurrentPage(1);
  }, []);

  const handleSearchChange = useCallback((value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  }, []);

  const handleGenderChange = useCallback((value: string) => {
    setSelectedGender(value);
    setCurrentPage(1);
  }, []);

  const handleAgeRangeChange = useCallback((value: string) => {
    setSelectedAgeRange(value);
    setCurrentPage(1);
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Professional Header */}
      <Header
        totalTalents={talentos.length}
        filteredTalents={filteredTalents.length}
      />

      {/* Advanced Filters */}
      <AdvancedFilters
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        selectedGender={selectedGender}
        onGenderChange={handleGenderChange}
        selectedAgeRange={selectedAgeRange}
        onAgeRangeChange={handleAgeRangeChange}
        onClearFilters={handleClearFilters}
        totalResults={filteredTalents.length}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="space-y-6 sm:space-y-8">

          {/* Results Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="h-7 w-7 sm:h-8 sm:w-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-semibold text-xs sm:text-sm">
                  {filteredTalents.length}
                </span>
              </div>
              <div>
                <p className="text-base sm:text-lg font-semibold text-slate-900">
                  {filteredTalents.length} talents found
                </p>
                {totalPages > 1 && (
                  <p className="text-xs sm:text-sm text-slate-500">
                    Page {currentPage} of {totalPages}
                  </p>
                )}
              </div>
            </div>

            {/* Column Selector */}
            <div className="flex items-center space-x-2">
              <LayoutGrid className="h-4 w-4 text-slate-500" />
              <Select
                value={selectedColumns?.toString() || "auto"}
                onValueChange={(value) => {
                  if (value === "auto") {
                    setSelectedColumns(null);
                  } else {
                    setSelectedColumns(Number.parseInt(value));
                  }
                }}
              >
                <SelectTrigger className="w-20 h-8 text-xs border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-lg bg-white/50 backdrop-blur-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-lg border-slate-200">
                  <SelectItem value="auto">Auto</SelectItem>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="4">4</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

                  {/* Talent Grid */}
                  {currentTalents.length > 0 ? (
                    <div 
                      className={`grid ${getGridClasses()} gap-4 sm:gap-6 stagger-animation`}
                      style={{
                        gridTemplateRows: 'repeat(auto-fit, minmax(500px, 1fr))'
                      }}
                    >
                      {currentTalents.map((talent, index) => (
                        <div
                          key={talent.id}
                          className="h-full fade-in-up"
                          style={{
                            animationDelay: `${index * 100}ms`,
                            animationFillMode: "both",
                          }}
                        >
                          <TalentCard 
                            talent={talent} 
                            onClick={handleTalentClick} 
                            isPriority={index === 0}
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 sm:py-16 fade-in-up">
                      <div className="mx-auto w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-r from-slate-100 to-slate-200 rounded-full flex items-center justify-center mb-4 sm:mb-6 pulse-glow">
                        <svg
                          className="w-10 h-10 sm:w-12 sm:h-12 text-slate-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                          />
                        </svg>
                      </div>
                      <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-2">
                        No talents found
                      </h3>
                      <p className="text-sm sm:text-base text-slate-500 mb-4 sm:mb-6 px-4">
                        Try adjusting the filters to find more talents.
                      </p>
                      <button
                        onClick={handleClearFilters}
                        className="px-4 sm:px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 hover-scale transition-all duration-200 font-medium text-sm sm:text-base"
                      >
                        Clear filters
                      </button>
                    </div>
                  )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center pt-6 sm:pt-8">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}

          {/* Detail Sheet */}
          <Suspense
            fallback={
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 animate-pulse">
                  <div className="w-8 h-8 bg-slate-200 rounded-full mx-auto mb-4"></div>
                  <div className="text-slate-600">Loading details...</div>
                </div>
              </div>
            }
          >
            <TalentDetailSheet
              talent={selectedTalent}
              isOpen={isDetailSheetOpen}
              onClose={handleDetailSheetClose}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
