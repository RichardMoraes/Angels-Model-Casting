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

interface AdvancedFiltersProps {
  readonly searchTerm: string;
  readonly selectedGender: string;
  readonly selectedAgeRange: string;
  readonly onSearchChange: (value: string) => void;
  readonly onGenderChange: (value: string) => void;
  readonly onAgeRangeChange: (value: string) => void;
  readonly onClearFilters: () => void;
  readonly totalResults: number;
}

const AdvancedFilters = memo(function AdvancedFilters({
  searchTerm,
  selectedGender,
  selectedAgeRange,
  onSearchChange,
  onGenderChange,
  onAgeRangeChange,
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
                placeholder="Buscar por nome..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10 h-10 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-lg bg-white"
              />
            </div>

            {/* Age Range */}
            <div className="flex items-center gap-2">
              <Input
                placeholder="De"
                className="w-16 sm:w-20 h-10 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-lg bg-white text-center text-sm px-1 sm:px-2"
              />
              <span className="text-slate-500 text-xs sm:text-sm whitespace-nowrap">até</span>
              <Input
                placeholder="Até"
                className="w-16 sm:w-20 h-10 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-lg bg-white text-center text-sm px-1 sm:px-2"
              />
            </div>

            {/* Gender Select */}
            <Select value={selectedGender} onValueChange={onGenderChange}>
              <SelectTrigger className="w-full h-10 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-lg bg-white">
                <SelectValue placeholder="Gênero" />
              </SelectTrigger>
              <SelectContent className="rounded-lg border-slate-200">
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="Female">Feminino</SelectItem>
                <SelectItem value="Male">Masculino</SelectItem>
                <SelectItem value="Non-binary">Não-binário</SelectItem>
              </SelectContent>
            </Select>

            {/* General Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Busca Geral"
                className="pl-10 w-full h-10 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-lg bg-white"
              />
            </div>
          </div>

          {/* Second Row - Additional Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
            
            {/* Additional Filters */}
            <Select>
              <SelectTrigger className="w-full h-10 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-lg bg-white">
                <SelectValue placeholder="Etnia" />
              </SelectTrigger>
              <SelectContent className="rounded-lg border-slate-200">
                <SelectItem value="all">Todas</SelectItem>
                <SelectItem value="branca">Branca</SelectItem>
                <SelectItem value="negra">Negra</SelectItem>
                <SelectItem value="parda">Parda</SelectItem>
                <SelectItem value="asiatica">Asiática</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="w-full h-10 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-lg bg-white">
                <SelectValue placeholder="DRT" />
              </SelectTrigger>
              <SelectContent className="rounded-lg border-slate-200">
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="sim">Sim</SelectItem>
                <SelectItem value="nao">Não</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="w-full h-10 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-lg bg-white">
                <SelectValue placeholder="Atuação" />
              </SelectTrigger>
              <SelectContent className="rounded-lg border-slate-200">
                <SelectItem value="all">Todas</SelectItem>
                <SelectItem value="modelo">Modelo</SelectItem>
                <SelectItem value="ator">Ator</SelectItem>
                <SelectItem value="apresentador">Apresentador</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="w-full h-10 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-lg bg-white">
                <SelectValue placeholder="Onde Mora" />
              </SelectTrigger>
              <SelectContent className="rounded-lg border-slate-200">
                <SelectItem value="all">Todos</SelectItem>
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
            <Button variant="outline" size="sm" className="h-8 w-8 p-0 border-slate-200 hover:bg-slate-50">
              <Plus className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0 border-slate-200 hover:bg-slate-50">
              <ArrowUpDown className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0 border-slate-200 hover:bg-slate-50">
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0 border-slate-200 hover:bg-slate-50">
              <Filter className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0 border-slate-200 hover:bg-slate-50">
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
                <span className="text-xs">Limpar</span>
              </Button>
            )}
          </div>

          {/* Right Side - Results and Premium */}
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-slate-600 whitespace-nowrap">
              {totalResults.toLocaleString()} elencos
            </span>
            
                    <Button className="h-8 bg-gradient-to-r from-purple-500 to-purple-600 hover:shadow-lg text-white px-4 rounded-lg font-medium flex items-center gap-2 whitespace-nowrap hover-scale transition-all duration-300">
                      <Star className="h-4 w-4" />
                      <span className="hidden lg:inline">AZ Elenco Premium</span>
                      <span className="lg:hidden">Premium</span>
                    </Button>
          </div>
        </div>

        {/* Secondary Filter Row (Optional) */}
        <div className="mt-3 pt-3 border-t border-slate-100">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
            <span className="text-sm text-slate-500 whitespace-nowrap">Filtros rápidos:</span>
                    <div className="flex items-center gap-2 flex-wrap">
                      <Button variant="outline" size="sm" className="h-7 px-3 text-xs border-slate-200 hover:bg-slate-50 hover-scale transition-all duration-200">
                        Novos
                      </Button>
                      <Button variant="outline" size="sm" className="h-7 px-3 text-xs border-slate-200 hover:bg-slate-50 hover-scale transition-all duration-200">
                        Premium
                      </Button>
                      <Button variant="outline" size="sm" className="h-7 px-3 text-xs border-slate-200 hover:bg-slate-50 hover-scale transition-all duration-200">
                        Disponíveis
                      </Button>
                      <Button variant="outline" size="sm" className="h-7 px-3 text-xs border-slate-200 hover:bg-slate-50 hover-scale transition-all duration-200">
                        Com DRT
                      </Button>
                    </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default AdvancedFilters;
