/**
 * CMS Integration Types for Strapi
 * These interfaces define the data structures expected from the CMS API
 */

// ============================================
// Header CMS Types
// ============================================

/**
 * Logo configuration from CMS
 */
export interface CMSLogo {
  imageUrl: string;
  altText: string;
}

/**
 * Brand information from CMS
 */
export interface CMSBrand {
  title: string;
  subtitle: string;
}

/**
 * Navigation item from CMS
 */
export interface CMSNavItem {
  id: string;
  label: string;
  href: string;
  isActive?: boolean;
  order?: number;
}

/**
 * User profile data from CMS/Auth
 */
export interface CMSUserProfile {
  id: string;
  name: string;
  role: string;
  avatarUrl?: string;
}

/**
 * Complete Header configuration from CMS
 */
export interface CMSHeaderProps {
  logo: CMSLogo;
  brand: CMSBrand;
  navigation: CMSNavItem[];
  user?: CMSUserProfile;
}

// ============================================
// Talent/Model CMS Types
// ============================================

/**
 * Professional measurements from CMS
 */
export interface CMSTalentMeasurements {
  heightCm: number;
  weightKg: number;
  bust?: number;
  waist?: number;
  hip?: number;
  shoeSize?: number;
}

/**
 * Physical characteristics from CMS
 */
export interface CMSTalentPhysicalDetails {
  eyeColor: string;
  hairColor: string;
  ethnicity: string;
  skinTone?: string;
}

/**
 * Talent status flags from CMS
 */
export interface CMSTalentStatus {
  isOnline: boolean;
  isPremium: boolean;
  isAvailable: boolean;
  isNew?: boolean;
  hasDRT?: boolean;
}

/**
 * Media content from CMS
 */
export interface CMSTalentMedia {
  photos: string[];
  mainPhotoUrl: string;
  videos: Array<{
    id: string;
    title: string;
    url: string;
    thumbnailUrl?: string;
    duration?: number;
  }>;
}

/**
 * Contact information from CMS
 */
export interface CMSTalentContact {
  phone?: string;
  email?: string;
  whatsapp?: string;
  instagram?: string;
}

/**
 * Location information from CMS
 */
export interface CMSTalentLocation {
  city: string;
  state: string;
  country?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

/**
 * Portfolio statistics from CMS
 */
export interface CMSTalentStats {
  portfolioViews?: number;
  bookingRate?: number;
  yearsExperience?: number;
  completedJobs?: number;
}

/**
 * Complete Talent Card props from CMS
 */
export interface CMSTalentCardProps {
  id: string;
  name: string;
  age: number;
  gender: "Female" | "Male" | "Non-binary";
  rating: number;
  location: CMSTalentLocation;
  measurements: CMSTalentMeasurements;
  physicalDetails: CMSTalentPhysicalDetails;
  status: CMSTalentStatus;
  media: CMSTalentMedia;
  departments: Array<"F" | "E" | "O" | "R">;
  skills: string[];
  contact?: CMSTalentContact;
  bio?: string;
  languages?: string[];
  stats?: CMSTalentStats;
  lastUpdate?: string;
}

// ============================================
// Filter Options CMS Types
// ============================================

/**
 * Generic filter option from CMS
 */
export interface CMSFilterOption {
  value: string;
  label: string;
  count?: number;
}

/**
 * Department filter option with color from CMS
 */
export interface CMSDepartmentOption extends CMSFilterOption {
  color: string;
  icon?: string;
}

/**
 * Quick filter configuration from CMS
 */
export interface CMSQuickFilter {
  id: string;
  label: string;
  filterKey: string;
  filterValue: string | boolean;
  defaultActive?: boolean;
  order?: number;
}

/**
 * Complete filter configuration from CMS
 */
export interface CMSFilterOptionsProps {
  genders: CMSFilterOption[];
  ethnicities: CMSFilterOption[];
  locations: CMSFilterOption[];
  departments: CMSDepartmentOption[];
  performanceTypes: CMSFilterOption[];
  drtOptions: CMSFilterOption[];
  quickFilters: CMSQuickFilter[];
  ageRange: {
    min: number;
    max: number;
  };
}

// ============================================
// Page/Section CMS Types
// ============================================

/**
 * Hero section content from CMS
 */
export interface CMSHeroSection {
  title: string;
  subtitle: string;
  backgroundImageUrl?: string;
  ctaButton?: {
    label: string;
    href: string;
    variant?: "primary" | "secondary" | "outline";
  };
}

/**
 * SEO metadata from CMS
 */
export interface CMSSeoMetadata {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  canonicalUrl?: string;
}

/**
 * Footer content from CMS
 */
export interface CMSFooterProps {
  companyName: string;
  copyrightYear: number;
  socialLinks: Array<{
    platform: string;
    url: string;
    icon?: string;
  }>;
  legalLinks: Array<{
    label: string;
    href: string;
  }>;
}

// ============================================
// API Response Types
// ============================================

/**
 * Strapi single item response wrapper
 */
export interface StrapiSingleResponse<T> {
  data: {
    id: number;
    attributes: T;
  };
  meta: Record<string, unknown>;
}

/**
 * Strapi collection response wrapper
 */
export interface StrapiCollectionResponse<T> {
  data: Array<{
    id: number;
    attributes: T;
  }>;
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

/**
 * Generic API error response
 */
export interface CMSApiError {
  status: number;
  name: string;
  message: string;
  details?: Record<string, unknown>;
}

// ============================================
// Utility Types
// ============================================

/**
 * Default content fallback - use when CMS data is unavailable
 */
export type WithFallback<T> = T & {
  _isFallback?: boolean;
};

/**
 * Partial CMS content - for incremental loading
 */
export type PartialCMSContent<T> = Partial<T> & {
  id: string;
  _isLoading?: boolean;
};
