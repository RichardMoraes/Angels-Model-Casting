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

  // Calculate items per page based on screen size
  useEffect(() => {
    const updateItemsPerPage = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setItemsPerPage(8);
      } else if (width < 1024) {
        setItemsPerPage(12);
      } else {
        setItemsPerPage(20);
      }
    };

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  // Reset to page 1 when itemsPerPage changes
  useEffect(() => {
    setCurrentPage(1);
  }, [itemsPerPage]);

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

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8F7FA] via-white to-[#F3F1F8]">
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
        onClearFilters={handleClearFilters}
        totalResults={filteredTalents.length}
      />

      {/* Main Content - com padding-top para não ficar atrás do header/filters em mobile */}
      <main className="container mx-auto px-8 py-10">
        {/* Talent Grid */}
        {currentTalents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {currentTalents.map((talent) => (
              <TalentCard
                key={talent.id}
                talent={talent}
                onClick={handleTalentClick}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-12 max-w-md mx-auto border border-gray-200">
              <p className="text-gray-500 mb-2">Nenhum talento encontrado</p>
              <p className="text-gray-400 mb-6">Tente ajustar os filtros</p>
              <button
                onClick={handleClearFilters}
                className="px-6 py-2.5 bg-gradient-to-r from-figma-light to-figma-primary text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 font-medium"
              >
                Limpar filtros
              </button>
            </div>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center pt-10">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </main>

      {/* Detail Sheet */}
      <Suspense
        fallback={
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <div className="w-10 h-10 border-4 border-figma-primary/30 border-t-figma-primary rounded-full mx-auto mb-4 animate-spin"></div>
              <div className="text-gray-600">Carregando detalhes...</div>
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
  );
}
