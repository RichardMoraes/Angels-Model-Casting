"use client";

import { memo, useState, useEffect, useCallback } from "react";
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
  RefreshCw,
  Filter,
  Plus,
  LayoutGrid,
  Grid3X3,
  ChevronDown,
  ChevronUp,
  ChevronsDown,
} from "lucide-react";
import { cn } from "../../lib/utils";

interface QuickFilters {
  new: boolean;
  premium: boolean;
  available: boolean;
  withDRT: boolean;
}

interface AdvancedFiltersProps {
  readonly searchTerm: string;
  readonly selectedGender: string;
  readonly selectedAgeRange: string;
  readonly onSearchChange: (value: string) => void;
  readonly onGenderChange: (value: string) => void;
  readonly onClearFilters: () => void;
  readonly totalResults: number;
}

const AdvancedFilters = memo(function AdvancedFilters({
  searchTerm,
  selectedGender,
  onSearchChange,
  onGenderChange,
  onClearFilters,
  totalResults,
}: AdvancedFiltersProps) {
  const [quickFilters, setQuickFilters] = useState<QuickFilters>({
    new: false,
    premium: false,
    available: false,
    withDRT: false,
  });

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [forceExpanded, setForceExpanded] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  // Detect small screen height on mount and resize
  useEffect(() => {
    const checkScreenSize = () => {
      const isSmall = window.innerHeight < 700;
      setIsSmallScreen(isSmall);
      
      // Auto-collapse on small screens
      if (isSmall && window.scrollY === 0 && !forceExpanded) {
        setIsCollapsed(true);
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, [forceExpanded]);

  useEffect(() => {
    // Skip scroll handling on small screens
    if (isSmallScreen) return;

    let ticking = false;
    
    // Hysteresis thresholds to prevent flickering
    // When filter height changes, scroll position can shift
    // Using different thresholds for collapse/expand prevents loop
    const COLLAPSE_THRESHOLD = 180; // Collapse when scrolled past this
    const EXPAND_THRESHOLD = 30;    // Expand only when very close to top

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          
          if (!forceExpanded) {
            // Only collapse if we're past the collapse threshold
            if (scrollY > COLLAPSE_THRESHOLD && !isCollapsed) {
              setIsCollapsed(true);
            }
            // Only expand if we're very close to the top
            else if (scrollY < EXPAND_THRESHOLD && isCollapsed) {
              setIsCollapsed(false);
            }
          }
          
          // Reset forceExpanded when at the very top
          if (scrollY < EXPAND_THRESHOLD) {
            setForceExpanded(false);
          }
          
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [forceExpanded, isSmallScreen, isCollapsed]);

  const hasActiveFilters =
    searchTerm ||
    selectedGender !== "all" ||
    Object.values(quickFilters).some(Boolean);

  const toggleQuickFilter = useCallback((filter: keyof QuickFilters) => {
    setQuickFilters((prev) => ({ ...prev, [filter]: !prev[filter] }));
  }, []);

  const clearAllFilters = useCallback(() => {
    onClearFilters();
    setQuickFilters({ new: false, premium: false, available: false, withDRT: false });
  }, [onClearFilters]);

  const showCollapsed = isCollapsed && !forceExpanded;

  // Collapsed View Component
  const CollapsedView = () => (
    <div className="px-4 lg:px-8 py-3">
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex-1 min-w-[150px] max-w-sm relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9 h-9 text-sm border-gray-200 rounded-lg bg-white/50"
          />
        </div>

        <div className="hidden sm:flex items-center gap-1.5 flex-wrap">
          {(["new", "premium", "available", "withDRT"] as const).map((key) => (
            <button
              key={key}
              onClick={() => toggleQuickFilter(key)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
                quickFilters[key]
                  ? "bg-figma-primary text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              )}
            >
              {key === "new" ? "Novos" : key === "premium" ? "Premium" : key === "available" ? "Disponíveis" : "Com DRT"}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1.5 text-sm bg-white/70 px-3 py-1.5 rounded-lg border border-gray-200">
          <span className="text-figma-primary font-semibold">{totalResults}</span>
          <span className="text-gray-600">talentos</span>
        </div>

        <button
          onClick={() => setForceExpanded(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-figma-primary hover:bg-figma-primary/10 rounded-lg transition-colors"
        >
          <Filter className="w-4 h-4" />
          <span className="hidden sm:inline">Mais Filtros</span>
          <ChevronDown className="w-4 h-4" />
        </button>

        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );

  // Expanded View Component
  const ExpandedView = () => (
    <div className="px-4 lg:px-8 py-4 lg:py-6 space-y-4">
      {forceExpanded && (
        <div className="flex justify-end -mb-2">
          <button
            onClick={() => {
              setForceExpanded(false);
              setIsCollapsed(true);
            }}
            className="flex items-center gap-1 px-3 py-1 text-xs font-medium text-gray-500 hover:text-figma-primary hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronUp className="w-3.5 h-3.5" />
            Recolher
          </button>
        </div>
      )}

      {/* Line 1 - Search + Age + Gender + Button */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto_auto_auto] gap-3 items-center">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por nome..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full h-12 px-4 pl-11 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-figma-primary/30 focus:border-figma-primary bg-white/50"
          />
        </div>
        
        <input
          type="number"
          placeholder="Min"
          className="w-full md:w-20 h-12 px-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-figma-primary/30 focus:border-figma-primary bg-white/50 text-sm"
        />
        
        <input
          type="number"
          placeholder="Max"
          className="w-full md:w-20 h-12 px-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-figma-primary/30 focus:border-figma-primary bg-white/50 text-sm"
        />
        
        <Select value={selectedGender} onValueChange={onGenderChange}>
          <SelectTrigger className="w-full md:w-40 h-12 px-4 border border-gray-200 rounded-xl bg-white/50">
            <SelectValue placeholder="Gênero" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="all">Todos os Gêneros</SelectItem>
            <SelectItem value="Female">Feminino</SelectItem>
            <SelectItem value="Male">Masculino</SelectItem>
            <SelectItem value="Non-binary">Não-binário</SelectItem>
          </SelectContent>
        </Select>
        
        <Button className="w-full md:w-auto h-12 px-6 bg-gradient-to-r from-figma-light to-figma-primary text-white rounded-xl font-medium hover:shadow-lg whitespace-nowrap">
          Buscar Talentos
        </Button>
      </div>

      {/* Line 2 - 4 Selects */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Select>
          <SelectTrigger className="w-full h-12 px-4 border border-gray-200 rounded-xl bg-white/50">
            <SelectValue placeholder="Todas as Etnias" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="all">Todas as Etnias</SelectItem>
            <SelectItem value="Branca">Branca</SelectItem>
            <SelectItem value="Negra">Negra</SelectItem>
            <SelectItem value="Parda">Parda</SelectItem>
            <SelectItem value="Indígena">Indígena</SelectItem>
            <SelectItem value="Asiática">Asiática</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="w-full h-12 px-4 border border-gray-200 rounded-xl bg-white/50">
            <SelectValue placeholder="Status DRT" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="all">Status DRT</SelectItem>
            <SelectItem value="with">Com DRT</SelectItem>
            <SelectItem value="without">Sem DRT</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="w-full h-12 px-4 border border-gray-200 rounded-xl bg-white/50">
            <SelectValue placeholder="Performance" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="all">Tipo de Performance</SelectItem>
            <SelectItem value="acting">Atuação</SelectItem>
            <SelectItem value="dance">Dança</SelectItem>
            <SelectItem value="singing">Canto</SelectItem>
            <SelectItem value="modeling">Modelagem</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="w-full h-12 px-4 border border-gray-200 rounded-xl bg-white/50">
            <SelectValue placeholder="Localidade" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="all">Todas as Localidades</SelectItem>
            <SelectItem value="SP">São Paulo</SelectItem>
            <SelectItem value="RJ">Rio de Janeiro</SelectItem>
            <SelectItem value="MG">Minas Gerais</SelectItem>
            <SelectItem value="RS">Rio Grande do Sul</SelectItem>
            <SelectItem value="PR">Paraná</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Line 3 - Actions | Quick Filters | Counter + Export */}
      <div className="grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-4 items-center">
        <div className="flex items-center gap-2 flex-wrap">
          <button className="p-2.5 hover:bg-gray-100 rounded-xl transition-colors" title="Adicionar">
            <Plus className="w-5 h-5 text-gray-700" />
          </button>
          <button className="p-2.5 hover:bg-gray-100 rounded-xl transition-colors" title="Ordenar">
            <ArrowUpDown className="w-5 h-5 text-gray-700" />
          </button>
          <button className="p-2.5 hover:bg-gray-100 rounded-xl transition-colors" title="Atualizar">
            <RefreshCw className="w-5 h-5 text-gray-700" />
          </button>
          <button className="p-2.5 hover:bg-gray-100 rounded-xl transition-colors" title="Filtros">
            <Filter className="w-5 h-5 text-gray-700" />
          </button>
          
          <div className="h-6 w-px bg-gray-300 mx-1" />
          
          <button className="p-2.5 hover:bg-gray-100 rounded-xl transition-colors" title="Grid">
            <LayoutGrid className="w-5 h-5 text-figma-primary" />
          </button>
          <button className="p-2.5 hover:bg-gray-100 rounded-xl transition-colors" title="Lista">
            <Grid3X3 className="w-5 h-5 text-gray-700" />
          </button>

          {hasActiveFilters && (
            <>
              <div className="h-6 w-px bg-gray-300 mx-1" />
              <button
                onClick={clearAllFilters}
                className="flex items-center gap-1 px-3 py-1.5 text-red-600 hover:bg-red-50 rounded-xl text-sm font-medium"
              >
                <X className="w-4 h-4" />
                Limpar
              </button>
            </>
          )}
        </div>

        <div className="flex items-center justify-center gap-2 flex-wrap">
          {(["new", "premium", "available", "withDRT"] as const).map((key) => (
            <button
              key={key}
              onClick={() => toggleQuickFilter(key)}
              className={cn(
                "px-4 py-2 rounded-xl text-sm font-medium transition-all",
                quickFilters[key]
                  ? "bg-gradient-to-r from-figma-light to-figma-primary text-white shadow-md"
                  : "bg-white/70 text-gray-700 hover:bg-white border border-gray-200"
              )}
            >
              {key === "new" ? "Novos" : key === "premium" ? "Premium" : key === "available" ? "Disponíveis" : "Com DRT"}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-end gap-3 flex-wrap">
          <div className="flex items-center gap-2 bg-white/70 px-4 py-2 rounded-xl border border-gray-200">
            <span className="text-figma-primary font-semibold">{totalResults}</span>
            <span className="text-gray-600 text-sm">talentos</span>
          </div>
          <Button className="h-10 px-5 bg-gradient-to-r from-figma-light to-figma-primary text-white rounded-xl font-medium text-sm whitespace-nowrap">
            Exportar Lista
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 sticky top-[56px] sm:top-[72px] lg:top-[86px] z-30 shadow-sm overflow-hidden">
      
      {/* Simple conditional rendering for all screen sizes */}
      {/* No opacity transitions to avoid flickering */}
      {showCollapsed ? <CollapsedView /> : <ExpandedView />}

      {/* Mobile Scroll Hint - Only on tall screens when filters are expanded */}
      {!isCollapsed && !isSmallScreen && (
        <div className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
          <button
            onClick={() => {
              const mainContent = document.querySelector('main');
              if (mainContent) {
                mainContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }}
            className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-figma-light to-figma-primary text-white rounded-full shadow-xl hover:shadow-2xl transition-all"
          >
            <span className="text-sm font-medium">
              Ver {totalResults} talentos
            </span>
            <ChevronsDown className="w-5 h-5 animate-bounce" />
          </button>
        </div>
      )}
    </div>
  );
});

export default AdvancedFilters;
