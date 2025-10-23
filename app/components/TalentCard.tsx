"use client";

import { useState, memo } from "react";
import { TalentProfile } from "../types/TalentProfile";
import { Card, CardContent } from "../../components/ui/card";
import Image from "next/image";
import { MapPin, Calendar, Ruler, Weight, Eye, User, ChevronLeft, ChevronRight } from "lucide-react";
import StarRating from "./StarRating";
import SkillTag from "./SkillTag";
import StatusIndicator from "./StatusIndicator";

/**
 * Props for the TalentCard component
 */
interface TalentCardProps {
  /** Talent profile data */
  readonly talent: TalentProfile;
  /** Callback function when card is clicked */
  readonly onClick: (talent: TalentProfile) => void;
  /** Whether this card should be prioritized for loading */
  readonly isPriority?: boolean;
}

/**
 * Individual talent card component displaying talent information
 * Features hover effects, image fallbacks, and responsive design
 */
const TalentCard = memo(function TalentCard({
  talent,
  onClick,
  isPriority = false,
}: TalentCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  // Get current photo URL
  const currentPhotoUrl = talent.photos[currentPhotoIndex] || talent.mainPhotoUrl;
  
  // Fallback to placeholder image if external image fails
  const imageSrc = imageError 
    ? `/api/placeholder/400/288?text=${encodeURIComponent(talent.name.charAt(0))}`
    : currentPhotoUrl;

  /**
   * Handles image loading errors by switching to placeholder
   */
  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  /**
   * Navigate to previous photo
   */
  const handlePreviousPhoto = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    setCurrentPhotoIndex((prev) => 
      prev === 0 ? talent.photos.length - 1 : prev - 1
    );
    setImageLoaded(false);
    setImageError(false);
  };

  /**
   * Navigate to next photo
   */
  const handleNextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    setCurrentPhotoIndex((prev) => 
      prev === talent.photos.length - 1 ? 0 : prev + 1
    );
    setImageLoaded(false);
    setImageError(false);
  };

  return (
            <Card
              className="group cursor-pointer card-interactive overflow-hidden border border-gray-200/50 bg-white hover:border-primary/30 shadow-professional relative z-10 h-full flex flex-col"
              onClick={() => onClick(talent)}
            >
      {/* Image Section */}
      <div className="relative w-full h-72 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Loading placeholder */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 loading-skeleton rounded-none flex items-center justify-center">
            <div className="w-16 h-16 bg-white/20 rounded-full animate-pulse"></div>
          </div>
        )}

        <Image
          src={imageSrc}
          alt={`Foto de ${talent.name}`}
          width={400}
          height={288}
          className={`w-full h-full object-cover group-hover:scale-110 transition-all duration-700 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          priority={isPriority}
          loading={isPriority ? "eager" : "lazy"}
          onLoad={() => setImageLoaded(true)}
          onError={handleImageError}
        />
        
        {/* Photo Navigation Arrows */}
        {talent.photos.length > 1 && (
          <>
            {/* Previous Photo Button */}
            <button
              onClick={handlePreviousPhoto}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 z-20"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Next Photo Button */}
            <button
              onClick={handleNextPhoto}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 z-20"
              aria-label="Next photo"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}

        {/* Photo Counter */}
        {talent.photos.length > 1 && (
          <div className="absolute top-3 right-3 bg-black/50 text-white px-2 py-1 rounded-full text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
            {currentPhotoIndex + 1}/{talent.photos.length}
          </div>
        )}
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Quick info overlay - Shows unique information on hover */}
        <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
          <div className="bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-professional">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>{talent.age} years</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{talent.city}</span>
              </div>
            </div>
            <div className="mt-2 text-center">
              <span className="text-xs font-semibold text-gray-700 bg-gray-100 px-2 py-1 rounded-full">
                {talent.skills.length} specialties
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <CardContent className="p-6 bg-white flex-1 flex flex-col">
        <div className="space-y-6 flex-1 flex flex-col justify-between">
          {/* Header */}
          <div className="space-y-3">
            {/* Name and Status */}
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <h3 className="text-xl font-semibold text-slate-900 group-hover:text-purple-600 transition-colors duration-300 truncate">
                  {talent.name}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span className="text-sm font-medium text-slate-600">
                    {talent.age} anos
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="text-sm font-medium text-slate-600 capitalize">
                    {talent.details.ethnicity}
                  </span>
                </div>
              </div>
              
              {/* Status Indicators */}
              <div className="ml-4 flex flex-col items-end gap-2">
                <StatusIndicator
                  isOnline={talent.status.isOnline}
                  isPremium={talent.status.isPremium}
                  isAvailable={talent.status.isAvailable}
                  size="sm"
                />
                {/* Gender badge */}
                <div className="px-3 py-1.5 bg-purple-50 text-purple-700 text-xs font-semibold rounded-full border border-purple-200/50 group-hover:bg-purple-100 transition-colors duration-300">
                  {(() => {
                    switch (talent.gender) {
                      case "Female": return "Fem";
                      case "Male": return "Masc";
                      default: return "NB";
                    }
                  })()}
                </div>
              </div>
            </div>

            {/* Star Rating */}
            <div className="flex items-center justify-between">
              <StarRating rating={talent.rating} size="sm" />
              <div className="text-xs text-gray-500">
                {talent.photos.length} photos
              </div>
            </div>

            {/* Skill Tags */}
            <div className="flex items-center gap-2 flex-wrap">
              {talent.skillTags.map((tag) => (
                <SkillTag key={`${talent.id}-${tag}`} type={tag} size="sm" />
              ))}
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center text-slate-600">
            <MapPin className="w-4 h-4 mr-2 text-slate-400" />
            <span className="text-sm font-medium">
              {talent.city}, {talent.state}
            </span>
          </div>

          {/* Physical details */}
          <div className="grid grid-cols-2 gap-4 py-4 px-4 bg-slate-50 rounded-lg">
            <div className="flex items-center gap-3 text-sm">
              <Ruler className="w-4 h-4 text-slate-500" />
              <span className="text-slate-700 font-medium">{talent.details.heightCm}cm</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Weight className="w-4 h-4 text-slate-500" />
              <span className="text-slate-700 font-medium">{talent.details.weightKg}kg</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Eye className="w-4 h-4 text-slate-500" />
              <span className="text-slate-700 font-medium">{talent.details.eyeColor}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <User className="w-4 h-4 text-slate-500" />
              <span className="text-slate-700 font-medium">{talent.details.hairColor}</span>
            </div>
          </div>

          {/* Skills - Consistent layout */}
          <div className="space-y-3 mt-auto">
            <h4 className="text-sm font-semibold text-slate-700">Specialties</h4>
            <div className="grid grid-cols-2 gap-2">
                      {talent.skills.slice(0, 3).map((skill, index) => (
                        <span
                          key={skill}
                          className="px-3 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white text-xs font-semibold rounded-full shadow-md group-hover:shadow-lg hover-scale transition-all duration-300 text-center truncate"
                          style={{
                            animationDelay: `${index * 100}ms`,
                          }}
                        >
                          {skill}
                        </span>
                      ))}
              {talent.skills.length > 3 && (
                <span className="px-3 py-2 bg-slate-200 text-slate-600 text-xs font-semibold rounded-full group-hover:bg-slate-300 transition-colors duration-300 text-center">
                  +{talent.skills.length - 3}
                </span>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

export default TalentCard;
