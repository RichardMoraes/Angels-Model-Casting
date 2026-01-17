"use client";

import { memo, useState, useEffect, useCallback, useRef } from "react";
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
} from "lucide-react";
import { cn } from "../../lib/utils";

// ============================================================================
// 🎬 FRAMER MOTION - Biblioteca padrão para animações no projeto
// ============================================================================
// 
// Use framer-motion para TODAS as animações do projeto:
// - Transições de entrada/saída de componentes (AnimatePresence)
// - Animações de layout (layout prop)
// - Micro-interações (whileHover, whileTap)
// - Animações baseadas em scroll (useScroll, useTransform)
//
// Documentação: https://www.framer.com/motion/
// ============================================================================
import { motion, AnimatePresence } from "framer-motion";

// Variantes de animação - clique (rápida, opacity sutil)
const clickAnimationVariants = {
  initial: { opacity: 0.7, y: -3 },
  animate: { 
    opacity: 1, y: 0,
    transition: { duration: 0.12, ease: [0.4, 0, 0.2, 1] as const }
  },
  exit: { 
    opacity: 0.7, y: 3,
    transition: { duration: 0.1, ease: [0.4, 0, 1, 1] as const }
  }
};

// Variantes de animação - scroll (opacity mais sutil)
const scrollAnimationVariants = {
  initial: { opacity: 0.5, y: -4 },
  animate: { 
    opacity: 1, y: 0,
    transition: { duration: 0.28, ease: [0.4, 0, 0.2, 1] as const }
  },
  exit: { 
    opacity: 0.5, y: 3,
    transition: { duration: 0.2, ease: [0.4, 0, 1, 1] as const }
  }
};

// ============================================================================
// FILTER STATE MACHINE (com debounce de transição)
// ============================================================================
// 
// Usa scroll position com um "lock" temporário após transições para evitar
// loops causados pela mudança de altura dos filtros.
//
// Funcionamento:
// - Scroll < 50px → Sempre EXPANDED, reseta preferência do usuário
// - Scroll > 250px → COLLAPSED por padrão, respeita preferência do usuário
// - Após uma transição, ignora mudanças de scroll por 300ms
//
// ============================================================================

type FilterDisplayMode = 'expanded' | 'collapsed';
type UserPreference = FilterDisplayMode | null;

/**
 * Contexto de exibição dos filtros expandidos.
 * Segue Interface Segregation Principle (ISP) - interface mínima e específica.
 * 
 * - 'default': Filtros expandidos automaticamente (scroll no topo)
 *   → Exibe apenas campos de filtro essenciais
 *   → Sem controles de recolhimento (já que é o estado natural)
 * 
 * - 'manual': Filtros expandidos por ação do usuário (clique em "Mais Filtros")
 *   → Exibe controles adicionais (botão recolher, etc.)
 *   → Permite ao usuário recolher os filtros novamente
 */
type ExpandedViewMode = 'default' | 'manual';

// Breakpoints - usar LARGURA para mobile (padrão da indústria)
const MOBILE_BREAKPOINT = 768; // md breakpoint do Tailwind
const EXPAND_THRESHOLD = 50;   // Expande quando scroll < 50px
const COLLAPSE_THRESHOLD = 250; // Colapsa quando scroll > 250px
const TRANSITION_LOCK_MS = 300; // Ignora scroll por 300ms após transição

// Header heights por breakpoint (deve corresponder ao Header.tsx)
const HEADER_HEIGHT = {
  mobile: 72,  // h-[72px]
  desktop: 86, // lg:h-[86px]
};

// Hook customizado que encapsula toda a lógica de estado dos filtros
function useFilterState() {
  const [displayMode, setDisplayMode] = useState<FilterDisplayMode>('collapsed'); // Mobile-first: começa colapsado
  const [userPreference, setUserPreference] = useState<UserPreference>(null);
  const [isAtTop, setIsAtTop] = useState(true);
  const [isMobile, setIsMobile] = useState(true); // Assume mobile por padrão (mobile-first)
  const [isMounted, setIsMounted] = useState(false); // Flag para evitar problemas de hydration
  const [triggeredByClick, setTriggeredByClick] = useState(false);
  const transitionLockRef = useRef(false);
  const lastDisplayModeRef = useRef<FilterDisplayMode>('collapsed');
  
  // Detecta se é mobile (largura < 768px) - Roda apenas no cliente
  useEffect(() => {
    setIsMounted(true);
    
    const checkScreenSize = () => {
      const mobile = window.innerWidth < MOBILE_BREAKPOINT;
      setIsMobile(mobile);
      
      // Em mobile, sempre começa colapsado
      // Em desktop, se está no topo, expande
      if (mobile) {
        if (userPreference === null) {
          setDisplayMode('collapsed');
          lastDisplayModeRef.current = 'collapsed';
        }
      } else {
        // Desktop: se no topo e sem preferência, expande
        if (userPreference === null && window.scrollY < EXPAND_THRESHOLD) {
          setDisplayMode('expanded');
          lastDisplayModeRef.current = 'expanded';
        }
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, [userPreference]);

  // Bloqueia scroll do body quando filtros expandidos no mobile
  useEffect(() => {
    if (isMobile && displayMode === 'expanded') {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobile, displayMode]);

  // Gerencia scroll com debounce de transição (apenas desktop)
  useEffect(() => {
    // Em mobile, não gerencia scroll para expandir/colapsar automaticamente
    if (isMobile) return;
    
    let ticking = false;

    const handleScroll = () => {
      if (ticking || transitionLockRef.current) return;
      
      ticking = true;
      window.requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        
        // Determina se está no topo
        const nowAtTop = scrollY < EXPAND_THRESHOLD;
        const nowScrolled = scrollY > COLLAPSE_THRESHOLD;
        
        // Se está no topo
        if (nowAtTop && !isAtTop) {
          setIsAtTop(true);
        }
        // Se está scrollado além do threshold
        else if (nowScrolled && isAtTop) {
          setIsAtTop(false);
        }
        
        ticking = false;
      });
    };

    // Verifica estado inicial
    const initialAtTop = window.scrollY < EXPAND_THRESHOLD;
    setIsAtTop(initialAtTop);

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile, isAtTop]);

  // Recomputa displayMode quando isAtTop ou userPreference mudam
  useEffect(() => {
    // Em mobile, só muda se o usuário interagir (clique em "Mais Filtros" ou "Recolher")
    if (isMobile) {
      if (userPreference !== null) {
        setDisplayMode(userPreference);
        lastDisplayModeRef.current = userPreference;
      }
      return;
    }

    // Desktop: comportamento baseado em scroll
    let newMode: FilterDisplayMode;
    
    // No topo = filtros expandidos, reseta preferência
    if (isAtTop) {
      setUserPreference(null);
      newMode = 'expanded';
    } else {
      // Scrollou para baixo = usa preferência ou colapsa
      newMode = userPreference ?? 'collapsed';
    }
    
    // Se o modo mudou, ativa o lock temporário
    if (newMode !== lastDisplayModeRef.current) {
      transitionLockRef.current = true;
      setTriggeredByClick(false); // Transição por scroll
      setDisplayMode(newMode);
      lastDisplayModeRef.current = newMode;
      
      // Remove o lock após o tempo de transição
      setTimeout(() => {
        transitionLockRef.current = false;
      }, TRANSITION_LOCK_MS);
    }
  }, [isAtTop, userPreference, isMobile]);

  // Ações do usuário
  const expand = useCallback(() => {
    transitionLockRef.current = true;
    setTriggeredByClick(true); // Transição por clique
    setUserPreference('expanded');
    setDisplayMode('expanded');
    lastDisplayModeRef.current = 'expanded';
    
    setTimeout(() => {
      transitionLockRef.current = false;
    }, TRANSITION_LOCK_MS);
  }, []);

  const collapse = useCallback(() => {
    transitionLockRef.current = true;
    setTriggeredByClick(true); // Transição por clique
    setUserPreference('collapsed');
    setDisplayMode('collapsed');
    lastDisplayModeRef.current = 'collapsed';
    
    setTimeout(() => {
      transitionLockRef.current = false;
    }, TRANSITION_LOCK_MS);
  }, []);

  /**
   * Determina o modo de exibição da view expandida.
   * Segue Single Responsibility Principle (SRP) - lógica centralizada aqui.
   * 
   * - 'manual': usuário expandiu clicando em "Mais Filtros"
   * - 'default': expandido automaticamente por scroll (estado natural no topo)
   */
  const expandedViewMode: ExpandedViewMode = userPreference === 'expanded' ? 'manual' : 'default';

  return {
    displayMode,
    isMobile,
    isMounted,
    isAtTop,
    isExpanded: displayMode === 'expanded',
    isCollapsed: displayMode === 'collapsed',
    expandedViewMode, // Contexto para ExpandedView decidir o que mostrar
    triggeredByClick, // Para escolher variantes de animação
    expand,
    collapse,
  };
}

// ============================================================================
// COMPONENT
// ============================================================================

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

  // Usa o hook de estado dos filtros
  const filterState = useFilterState();

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
          onClick={filterState.expand}
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

  /**
   * ExpandedView Component
   * 
   * Segue Open/Closed Principle (OCP):
   * - Comportamento varia através de `expandedViewMode` e `isMobile` sem modificar estrutura
   * - Novos modos podem ser adicionados sem alterar lógica existente
   * 
   * Mobile:
   * - Renderiza como overlay fixo abaixo do header
   * - Scroll interno para conteúdo que não cabe
   * - Botão de fechar sempre visível
   * 
   * Desktop:
   * - Renderiza inline no fluxo do documento
   * - 'default': Estado natural (scroll no topo)
   * - 'manual': Usuário expandiu - mostra controles adicionais
   */
  const isManualMode = filterState.expandedViewMode === 'manual';
  
  // Conteúdo dos filtros - compartilhado entre mobile e desktop
  const FilterContent = () => (
    <div className="space-y-4">
      {/* Line 1 - Search + Age + Gender + Button */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto_auto_auto] gap-3 items-center">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Buscar por nome..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full h-11 md:h-12 px-4 pl-11 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-figma-primary/30 focus:border-figma-primary bg-white/50 text-sm md:text-base"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-2 md:contents">
          <input
            type="number"
            placeholder="Min"
            className="w-full md:w-20 lg:w-24 h-11 md:h-12 px-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-figma-primary/30 focus:border-figma-primary bg-white/50 text-sm text-center"
          />
          
          <input
            type="number"
            placeholder="Max"
            className="w-full md:w-20 lg:w-24 h-11 md:h-12 px-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-figma-primary/30 focus:border-figma-primary bg-white/50 text-sm text-center"
          />
        </div>
        
        <Select value={selectedGender} onValueChange={onGenderChange}>
          <SelectTrigger className="w-full md:w-auto md:min-w-[140px] lg:min-w-[160px] h-11 md:h-12 px-3 border border-gray-200 rounded-xl bg-white/50 text-sm [&>span]:truncate [&>span]:max-w-[calc(100%-24px)]">
            <SelectValue placeholder="Gênero" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="Female">Feminino</SelectItem>
            <SelectItem value="Male">Masculino</SelectItem>
            <SelectItem value="Non-binary">Não-binário</SelectItem>
          </SelectContent>
        </Select>
        
        <Button className="w-full md:w-auto h-11 md:h-12 px-6 bg-gradient-to-r from-figma-light to-figma-primary text-white rounded-xl font-medium hover:shadow-lg whitespace-nowrap text-sm md:text-base">
          Buscar Talentos
        </Button>
      </div>

      {/* Line 2 - 4 Selects - Grid responsivo com largura mínima */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
        <Select>
          <SelectTrigger className="w-full h-11 md:h-12 px-3 border border-gray-200 rounded-xl bg-white/50 text-sm [&>span]:truncate [&>span]:max-w-[calc(100%-24px)]">
            <SelectValue placeholder="Etnia" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="all">Todas</SelectItem>
            <SelectItem value="Branca">Branca</SelectItem>
            <SelectItem value="Negra">Negra</SelectItem>
            <SelectItem value="Parda">Parda</SelectItem>
            <SelectItem value="Indígena">Indígena</SelectItem>
            <SelectItem value="Asiática">Asiática</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="w-full h-11 md:h-12 px-3 border border-gray-200 rounded-xl bg-white/50 text-sm [&>span]:truncate [&>span]:max-w-[calc(100%-24px)]">
            <SelectValue placeholder="DRT" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="with">Com DRT</SelectItem>
            <SelectItem value="without">Sem DRT</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="w-full h-11 md:h-12 px-3 border border-gray-200 rounded-xl bg-white/50 text-sm [&>span]:truncate [&>span]:max-w-[calc(100%-24px)]">
            <SelectValue placeholder="Tipo" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="acting">Atuação</SelectItem>
            <SelectItem value="dance">Dança</SelectItem>
            <SelectItem value="singing">Canto</SelectItem>
            <SelectItem value="modeling">Modelagem</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="w-full h-11 md:h-12 px-3 border border-gray-200 rounded-xl bg-white/50 text-sm [&>span]:truncate [&>span]:max-w-[calc(100%-24px)]">
            <SelectValue placeholder="Local" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="SP">São Paulo</SelectItem>
            <SelectItem value="RJ">Rio de Janeiro</SelectItem>
            <SelectItem value="MG">Minas Gerais</SelectItem>
            <SelectItem value="RS">Rio G. do Sul</SelectItem>
            <SelectItem value="PR">Paraná</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Line 3 - Quick Filters */}
      <div className="flex items-center justify-center gap-2 flex-wrap">
        {(["new", "premium", "available", "withDRT"] as const).map((key) => (
          <button
            key={key}
            onClick={() => toggleQuickFilter(key)}
            className={cn(
              "px-3 md:px-4 py-2 rounded-xl text-xs md:text-sm font-medium transition-all",
              quickFilters[key]
                ? "bg-gradient-to-r from-figma-light to-figma-primary text-white shadow-md"
                : "bg-white/70 text-gray-700 hover:bg-white border border-gray-200"
            )}
          >
            {key === "new" ? "Novos" : key === "premium" ? "Premium" : key === "available" ? "Disponíveis" : "Com DRT"}
          </button>
        ))}
      </div>

      {/* Line 4 - Actions + Counter (hidden on mobile - shown in footer) */}
      <div className="hidden md:grid md:grid-cols-[auto_1fr_auto] gap-4 items-center">
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

        <div /> {/* Spacer */}

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

  // Desktop: Inline com scroll do documento
  const DesktopExpandedView = () => (
    <div className="px-4 lg:px-8 py-4 lg:py-6">
      {/* Botão Recolher - apenas no modo manual (usuário expandiu) */}
      {isManualMode && (
        <div className="flex justify-end mb-2">
          <button
            onClick={filterState.collapse}
            className="flex items-center gap-1 px-3 py-1 text-xs font-medium text-gray-500 hover:text-figma-primary hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronUp className="w-3.5 h-3.5" />
            Recolher
          </button>
        </div>
      )}
      <FilterContent />
    </div>
  );
  
  // Escolhe variantes baseado no tipo de trigger (clique = rápido, scroll = suave)
  const animationVariants = filterState.triggeredByClick 
    ? clickAnimationVariants 
    : scrollAnimationVariants;

  // Se não montou ainda, renderiza apenas a view colapsada (mobile-first)
  // Isso evita flash de conteúdo errado durante a hidratação
  if (!filterState.isMounted) {
    return (
      <div className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 sticky top-[72px] lg:top-[86px] z-30 shadow-sm">
        <CollapsedView />
      </div>
    );
  }

  return (
    <>
      {/* Container sticky para CollapsedView e DesktopExpandedView */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 sticky top-[72px] lg:top-[86px] z-30 shadow-sm">
        
        {/* 🎬 AnimatePresence para transições suaves entre estados */}
        <AnimatePresence mode="wait" initial={false}>
          {filterState.isCollapsed ? (
            <motion.div
              key="collapsed"
              variants={animationVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <CollapsedView />
            </motion.div>
          ) : !filterState.isMobile ? (
            // Desktop: renderiza inline
            <motion.div
              key="expanded-desktop"
              variants={animationVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <DesktopExpandedView />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      {/* Mobile Expanded: Overlay fixo - sempre montado para evitar delay de renderização */}
      {filterState.isMobile && (
        <div
          className={`
            fixed inset-x-0 bg-white backdrop-blur-xl z-[100] flex flex-col shadow-2xl
            transition-all duration-150 ease-out
            ${filterState.isExpanded 
              ? 'opacity-100 translate-y-0 pointer-events-auto' 
              : 'opacity-0 -translate-y-2 pointer-events-none'}
          `}
          style={{ 
            top: `${HEADER_HEIGHT.mobile}px`, 
            height: `calc(100vh - ${HEADER_HEIGHT.mobile}px)`,
            maxHeight: `calc(100dvh - ${HEADER_HEIGHT.mobile}px)`
          }}
          aria-hidden={!filterState.isExpanded}
        >
          {/* Header do painel */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 flex-shrink-0">
            <h2 className="text-base font-semibold text-gray-900">Filtros Avançados</h2>
            <button
              onClick={filterState.collapse}
              className="p-2 -mr-2 hover:bg-gray-100 rounded-xl transition-colors"
              aria-label="Fechar filtros"
              tabIndex={filterState.isExpanded ? 0 : -1}
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          
          {/* Conteúdo com scroll */}
          <div className="flex-1 overflow-y-auto px-4 py-4 overscroll-contain">
            <FilterContent />
          </div>
          
          {/* Footer fixo com ações */}
          <div className="flex-shrink-0 px-4 py-3 border-t border-gray-200 bg-white">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-figma-primary font-semibold">{totalResults}</span>
                <span className="text-gray-600">talentos</span>
              </div>
              <div className="flex gap-2">
                {hasActiveFilters && (
                  <button
                    onClick={clearAllFilters}
                    className="px-4 py-2.5 text-red-600 hover:bg-red-50 rounded-xl text-sm font-medium border border-red-200"
                    tabIndex={filterState.isExpanded ? 0 : -1}
                  >
                    Limpar
                  </button>
                )}
                <Button 
                  onClick={filterState.collapse}
                  className="px-6 py-2.5 bg-gradient-to-r from-figma-light to-figma-primary text-white rounded-xl font-medium text-sm"
                  tabIndex={filterState.isExpanded ? 0 : -1}
                >
                  Ver Resultados
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
});

export default AdvancedFilters;
