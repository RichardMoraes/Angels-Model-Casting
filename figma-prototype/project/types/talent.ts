export interface Talent {
  id: number;
  name: string;
  age: number;
  ethnicity: 'Branca' | 'Parda' | 'Negra' | 'Indígena';
  gender: 'F' | 'M';
  genderLabel: 'Feminino' | 'Masculino';
  state: string;
  city: string;
  rating: number;
  photoCount: number;
  photos: string[];
  height: number;
  weight: number;
  eyeColor: string;
  hairColor: string;
  specialties: string[];
  departments: ('F' | 'E' | 'O' | 'R')[];
  phone: string;
  email: string;
  isPremium?: boolean;
  isNew?: boolean;
  isAvailable?: boolean;
  hasDRT?: boolean;
  videoCount?: number;
  // Novas informações profissionais da indústria de moda
  bust?: number; // Busto (feminino) ou Peito (masculino) em cm
  waist?: number; // Cintura em cm
  hip?: number; // Quadril em cm
  shoeSize?: number; // Tamanho do sapato
  yearsExperience?: number; // Anos de experiência
  languages?: string[]; // Idiomas
  lastUpdate?: string; // Última atualização do perfil
  portfolioViews?: number; // Visualizações do portfólio
  bookingRate?: number; // Taxa de conversão de bookings (0-100)
}

export interface FilterState {
  searchName: string;
  ageFrom: string;
  ageTo: string;
  gender: string;
  ethnicity: string;
  drt: string;
  performance: string;
  location: string;
  quickFilters: {
    new: boolean;
    premium: boolean;
    available: boolean;
    withDRT: boolean;
  };
}