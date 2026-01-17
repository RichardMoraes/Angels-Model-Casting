import React from 'react';
import { Plus, ArrowUpDown, RefreshCw, Filter, Settings, Grid3x3, LayoutGrid } from 'lucide-react';
import { FilterState } from '../types/talent';
import { Button } from './Button';

interface FiltersProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  talentCount: number;
}

export function Filters({ filters, onFilterChange, talentCount }: FiltersProps) {
  const handleInputChange = (field: keyof FilterState, value: string) => {
    onFilterChange({ ...filters, [field]: value });
  };

  const handleQuickFilterToggle = (filterName: keyof FilterState['quickFilters']) => {
    onFilterChange({
      ...filters,
      quickFilters: {
        ...filters.quickFilters,
        [filterName]: !filters.quickFilters[filterName],
      },
    });
  };

  return (
    <div className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 px-8 py-6 space-y-5 sticky top-[86px] z-30 shadow-sm">
      {/* Line 1 - Busca e Filtros Principais */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Buscar por nome..."
            value={filters.searchName}
            onChange={(e) => handleInputChange('searchName', e.target.value)}
            className="w-full px-5 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4B1B6F]/30 focus:border-[#4B1B6F] transition-all duration-300 bg-white/50 pl-5"
          />
        </div>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Idade min"
            value={filters.ageFrom}
            onChange={(e) => handleInputChange('ageFrom', e.target.value)}
            className="w-28 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4B1B6F]/30 focus:border-[#4B1B6F] transition-all duration-300 bg-white/50"
          />
          <input
            type="number"
            placeholder="Idade max"
            value={filters.ageTo}
            onChange={(e) => handleInputChange('ageTo', e.target.value)}
            className="w-28 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4B1B6F]/30 focus:border-[#4B1B6F] transition-all duration-300 bg-white/50"
          />
        </div>
        <select
          value={filters.gender}
          onChange={(e) => handleInputChange('gender', e.target.value)}
          className="px-5 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4B1B6F]/30 focus:border-[#4B1B6F] transition-all duration-300 bg-white/50 cursor-pointer"
        >
          <option value="">Todos os Gêneros</option>
          <option value="F">Feminino</option>
          <option value="M">Masculino</option>
        </select>
        <Button variant="solid" size="md">
          Buscar Talentos
        </Button>
      </div>

      {/* Line 2 - Filtros Avançados */}
      <div className="flex gap-4">
        <select
          value={filters.ethnicity}
          onChange={(e) => handleInputChange('ethnicity', e.target.value)}
          className="flex-1 px-5 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4B1B6F]/30 focus:border-[#4B1B6F] transition-all duration-300 bg-white/50 cursor-pointer"
        >
          <option value="">Todas as Etnias</option>
          <option value="Branca">Branca</option>
          <option value="Negra">Negra</option>
          <option value="Parda">Parda</option>
          <option value="Indígena">Indígena</option>
        </select>
        <select
          value={filters.drt}
          onChange={(e) => handleInputChange('drt', e.target.value)}
          className="flex-1 px-5 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4B1B6F]/30 focus:border-[#4B1B6F] transition-all duration-300 bg-white/50 cursor-pointer"
        >
          <option value="">Status DRT</option>
          <option value="with">Com DRT</option>
          <option value="without">Sem DRT</option>
        </select>
        <select
          value={filters.performance}
          onChange={(e) => handleInputChange('performance', e.target.value)}
          className="flex-1 px-5 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4B1B6F]/30 focus:border-[#4B1B6F] transition-all duration-300 bg-white/50 cursor-pointer"
        >
          <option value="">Tipo de Performance</option>
          <option value="acting">Atuação</option>
          <option value="dance">Dança</option>
          <option value="singing">Canto</option>
        </select>
        <select
          value={filters.location}
          onChange={(e) => handleInputChange('location', e.target.value)}
          className="flex-1 px-5 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4B1B6F]/30 focus:border-[#4B1B6F] transition-all duration-300 bg-white/50 cursor-pointer"
        >
          <option value="">Todas as Localidades</option>
          <option value="SP">São Paulo</option>
          <option value="RJ">Rio de Janeiro</option>
          <option value="MG">Minas Gerais</option>
          <option value="RS">Rio Grande do Sul</option>
        </select>
      </div>

      {/* Line 3 - Actions and Quick Filters */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button 
            className="p-2.5 hover:bg-gray-100 rounded-xl transition-all duration-300"
            title="Adicionar novo talento"
          >
            <Plus className="w-5 h-5 text-gray-700" />
          </button>
          <button 
            className="p-2.5 hover:bg-gray-100 rounded-xl transition-all duration-300"
            title="Ordenar"
          >
            <ArrowUpDown className="w-5 h-5 text-gray-700" />
          </button>
          <button 
            className="p-2.5 hover:bg-gray-100 rounded-xl transition-all duration-300"
            title="Atualizar"
          >
            <RefreshCw className="w-5 h-5 text-gray-700" />
          </button>
          <button 
            className="p-2.5 hover:bg-gray-100 rounded-xl transition-all duration-300"
            title="Filtros avançados"
          >
            <Filter className="w-5 h-5 text-gray-700" />
          </button>
          
          <div className="h-6 w-px bg-gray-300 mx-2" />
          
          <button 
            className="p-2.5 hover:bg-gray-100 rounded-xl transition-all duration-300"
            title="Visualização em grid"
          >
            <LayoutGrid className="w-5 h-5 text-[#4B1B6F]" />
          </button>
          <button 
            className="p-2.5 hover:bg-gray-100 rounded-xl transition-all duration-300"
            title="Visualização compacta"
          >
            <Grid3x3 className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        {/* Quick Filters */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleQuickFilterToggle('new')}
            className={`px-4 py-2 rounded-xl transition-all duration-300 ${
              filters.quickFilters.new
                ? 'bg-gradient-to-r from-[#7B3FF2] to-[#4B1B6F] text-white shadow-md'
                : 'bg-white/70 text-gray-700 hover:bg-white border border-gray-200'
            }`}
          >
            Novos
          </button>
          <button
            onClick={() => handleQuickFilterToggle('premium')}
            className={`px-4 py-2 rounded-xl transition-all duration-300 ${
              filters.quickFilters.premium
                ? 'bg-gradient-to-r from-[#7B3FF2] to-[#4B1B6F] text-white shadow-md'
                : 'bg-white/70 text-gray-700 hover:bg-white border border-gray-200'
            }`}
          >
            Premium
          </button>
          <button
            onClick={() => handleQuickFilterToggle('available')}
            className={`px-4 py-2 rounded-xl transition-all duration-300 ${
              filters.quickFilters.available
                ? 'bg-gradient-to-r from-[#7B3FF2] to-[#4B1B6F] text-white shadow-md'
                : 'bg-white/70 text-gray-700 hover:bg-white border border-gray-200'
            }`}
          >
            Disponíveis
          </button>
          <button
            onClick={() => handleQuickFilterToggle('withDRT')}
            className={`px-4 py-2 rounded-xl transition-all duration-300 ${
              filters.quickFilters.withDRT
                ? 'bg-gradient-to-r from-[#7B3FF2] to-[#4B1B6F] text-white shadow-md'
                : 'bg-white/70 text-gray-700 hover:bg-white border border-gray-200'
            }`}
          >
            Com DRT
          </button>
        </div>

        {/* Display Info */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-white/70 px-4 py-2 rounded-xl border border-gray-200">
            <span className="text-[#4B1B6F]">{talentCount}</span>
            <span className="text-gray-600">talentos</span>
          </div>
          <Button variant="solid" size="sm">
            Exportar Lista
          </Button>
        </div>
      </div>
    </div>
  );
}