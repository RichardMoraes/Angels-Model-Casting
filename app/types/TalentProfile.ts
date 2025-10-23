export interface TalentProfile {
  id: string;
  name: string;
  age: number;
  gender: "Female" | "Male" | "Non-binary";
  city: string;
  state: string;
  mainPhotoUrl: string;
  details: {
    ethnicity: string;
    heightCm: number;
    weightKg: number;
    hairType: string;
    hairColor: string;
    eyeColor: string;
    bio: string;
  };
  skills: string[];
  photos: string[];
  videos: {
    title: string;
    url: string;
  }[];
  // Phase 6 - Visual Refinements
  rating: number; // 1-5 star rating
  skillTags: ("F" | "E" | "O" | "R")[]; // F=Fotografia, E=Eventos, O=Online, R=Rádio/TV
  status: {
    isOnline: boolean;
    isPremium: boolean;
    isAvailable: boolean;
  };
}
