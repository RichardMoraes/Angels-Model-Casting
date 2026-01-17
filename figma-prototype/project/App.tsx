import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { Filters } from './components/Filters';
import { TalentCard } from './components/TalentCard';
import { TalentModal } from './components/TalentModal';
import { talentsData } from './data/talents';
import { Talent, FilterState } from './types/talent';

export default function App() {
  const [selectedTalent, setSelectedTalent] = useState<Talent | null>(null);
  const [filters, setFilters] = useState<FilterState>({
    searchName: '',
    ageFrom: '',
    ageTo: '',
    gender: '',
    ethnicity: '',
    drt: '',
    performance: '',
    location: '',
    quickFilters: {
      new: false,
      premium: false,
      available: false,
      withDRT: false,
    },
  });

  const filteredTalents = useMemo(() => {
    return talentsData.filter((talent) => {
      // Search by name
      if (filters.searchName && !talent.name.toLowerCase().includes(filters.searchName.toLowerCase())) {
        return false;
      }

      // Age range
      if (filters.ageFrom && talent.age < parseInt(filters.ageFrom)) {
        return false;
      }
      if (filters.ageTo && talent.age > parseInt(filters.ageTo)) {
        return false;
      }

      // Gender
      if (filters.gender && talent.gender !== filters.gender) {
        return false;
      }

      // Ethnicity
      if (filters.ethnicity && talent.ethnicity !== filters.ethnicity) {
        return false;
      }

      // DRT
      if (filters.drt === 'with' && !talent.hasDRT) {
        return false;
      }
      if (filters.drt === 'without' && talent.hasDRT) {
        return false;
      }

      // Location
      if (filters.location && talent.state !== filters.location) {
        return false;
      }

      // Quick filters
      if (filters.quickFilters.new && !talent.isNew) {
        return false;
      }
      if (filters.quickFilters.premium && !talent.isPremium) {
        return false;
      }
      if (filters.quickFilters.available && !talent.isAvailable) {
        return false;
      }
      if (filters.quickFilters.withDRT && !talent.hasDRT) {
        return false;
      }

      return true;
    });
  }, [filters]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8F7FA] via-white to-[#F3F1F8]">
      <Header />
      <Filters 
        filters={filters} 
        onFilterChange={setFilters}
        talentCount={filteredTalents.length}
      />
      
      <main className="container mx-auto px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredTalents.map((talent) => (
            <TalentCard
              key={talent.id}
              talent={talent}
              onClick={() => setSelectedTalent(talent)}
            />
          ))}
        </div>

        {filteredTalents.length === 0 && (
          <div className="text-center py-20">
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-12 max-w-md mx-auto border border-gray-200">
              <p className="text-gray-500 mb-2">Nenhum talento encontrado</p>
              <p className="text-gray-400">Tente ajustar os filtros</p>
            </div>
          </div>
        )}
      </main>

      {selectedTalent && (
        <TalentModal
          talent={selectedTalent}
          onClose={() => setSelectedTalent(null)}
        />
      )}
    </div>
  );
}