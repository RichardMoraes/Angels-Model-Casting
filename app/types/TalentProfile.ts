/**
 * Core talent profile interface
 * Used throughout the application for talent data
 */
export interface TalentProfile {
  id: string;
  name: string;
  age: number;
  gender: "Female" | "Male" | "Non-binary";
  city: string;
  state: string;
  mainPhotoUrl: string;
  details: TalentDetails;
  skills: string[];
  photos: string[];
  videos: TalentVideo[];
  
  // Phase 6 - Visual Refinements
  rating: number; // 1-5 star rating
  skillTags: DepartmentCode[]; // F=Fotografia, E=Eventos, O=Online, R=Rádio/TV
  status: TalentStatus;
  
  // Phase 7 - Figma Integration (Extended fields)
  contact?: TalentContact;
  languages?: string[];
  stats?: TalentStats;
  lastUpdate?: string;
}

/**
 * Department code type
 */
export type DepartmentCode = "F" | "E" | "O" | "R";

/**
 * Physical and biographical details
 */
export interface TalentDetails {
  ethnicity: string;
  heightCm: number;
  weightKg: number;
  hairType: string;
  hairColor: string;
  eyeColor: string;
  bio: string;
  
  // Extended measurements (optional - from Figma)
  bust?: number;
  waist?: number;
  hip?: number;
  shoeSize?: number;
}

/**
 * Video content
 */
export interface TalentVideo {
  title: string;
  url: string;
  thumbnailUrl?: string;
  duration?: number;
}

/**
 * Talent status flags
 */
export interface TalentStatus {
  isOnline: boolean;
  isPremium: boolean;
  isAvailable: boolean;
  isNew?: boolean;
  hasDRT?: boolean;
}

/**
 * Contact information
 */
export interface TalentContact {
  phone?: string;
  email?: string;
  whatsapp?: string;
  instagram?: string;
}

/**
 * Portfolio and performance statistics
 */
export interface TalentStats {
  portfolioViews?: number;
  bookingRate?: number;
  yearsExperience?: number;
  completedJobs?: number;
}
