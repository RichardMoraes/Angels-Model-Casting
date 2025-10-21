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

interface FiltersProps {
  readonly searchTerm: string;
  readonly selectedGender: string;
  readonly selectedAgeRange: string;
  readonly onSearchChange: (value: string) => void;
  readonly onGenderChange: (value: string) => void;
  readonly onAgeRangeChange: (value: string) => void;
  readonly onClearFilters: () => void;
}

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
          <h2 className="text-xl font-bold text-slate-900">Filtros</h2>
        </div>
        {hasActiveFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={onClearFilters}
            className="flex items-center gap-2 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all duration-200 animate-in fade-in-0 slide-in-from-right-4"
          >
            <X className="h-4 w-4" />
            Limpar filtros
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
            Buscar por nome
          </label>
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400 transition-colors duration-200 group-focus-within:text-blue-500" />
            <Input
              id="search-input"
              placeholder="Digite o nome do talento..."
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
            Gênero
          </label>
          <Select value={selectedGender} onValueChange={onGenderChange}>
            <SelectTrigger
              id="gender-select"
              className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl bg-white/50 backdrop-blur-sm transition-all duration-200 hover:bg-white/70 focus:bg-white/90"
            >
              <SelectValue placeholder="Todos os gêneros" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-slate-200">
              <SelectItem value="all">Todos os gêneros</SelectItem>
              <SelectItem value="Female">Feminino</SelectItem>
              <SelectItem value="Male">Masculino</SelectItem>
              <SelectItem value="Non-binary">Não-binário</SelectItem>
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
            Faixa Etária
          </label>
          <Select value={selectedAgeRange} onValueChange={onAgeRangeChange}>
            <SelectTrigger
              id="age-select"
              className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl bg-white/50 backdrop-blur-sm transition-all duration-200 hover:bg-white/70 focus:bg-white/90"
            >
              <SelectValue placeholder="Todas as idades" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-slate-200">
              <SelectItem value="all">Todas as idades</SelectItem>
              <SelectItem value="18-25">18-25 anos</SelectItem>
              <SelectItem value="26-35">26-35 anos</SelectItem>
              <SelectItem value="36-45">36-45 anos</SelectItem>
              <SelectItem value="45+">45+ anos</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
});

export default Filters;
