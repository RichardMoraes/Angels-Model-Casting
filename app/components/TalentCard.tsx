"use client";

import { useState, memo } from "react";
import { TalentProfile } from "../types/TalentProfile";
import { Card, CardContent } from "../../components/ui/card";
import Image from "next/image";

interface TalentCardProps {
  readonly talent: TalentProfile;
  readonly onClick: (talent: TalentProfile) => void;
}

const TalentCard = memo(function TalentCard({
  talent,
  onClick,
}: TalentCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Fallback para imagem local se a externa falhar
  const imageSrc = imageError 
    ? `/api/placeholder/400/288?text=${encodeURIComponent(talent.name.charAt(0))}`
    : talent.mainPhotoUrl;

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  return (
    <Card
      className="group cursor-pointer hover:shadow-xl transition-all duration-300 overflow-hidden border-0 bg-white/80 backdrop-blur-sm hover:bg-white/90 hover:-translate-y-1 sm:hover:-translate-y-2"
      onClick={() => onClick(talent)}
    >
      <div className="relative w-full h-64 sm:h-72 overflow-hidden">
        {/* Loading placeholder */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200 animate-pulse flex items-center justify-center">
            <div className="w-12 h-12 bg-slate-300 rounded-full animate-pulse"></div>
          </div>
        )}

        <Image
          src={imageSrc}
          alt={`Foto de ${talent.name}`}
          width={400}
          height={288}
          className={`w-full h-full object-cover group-hover:scale-105 transition-all duration-500 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          priority={false}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          onError={handleImageError}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-400 rounded-full border-2 border-white shadow-sm animate-pulse"></div>
        </div>
      </div>
      <CardContent className="p-4 sm:p-6">
        <div className="space-y-2 sm:space-y-3">
          <div className="flex items-start justify-between">
            <h3 className="font-bold text-lg sm:text-xl text-slate-900 group-hover:text-blue-600 transition-colors duration-200 truncate pr-2">
              {talent.name}
            </h3>
            <span className="text-xs sm:text-sm font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded-full shrink-0 group-hover:bg-blue-100 group-hover:text-blue-700 transition-colors duration-200">
              {talent.age} anos
            </span>
          </div>

          <div className="flex items-center text-slate-600">
            <svg
              className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 text-slate-400 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span className="text-xs sm:text-sm font-medium truncate">
              {talent.city}, {talent.state}
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {talent.skills.slice(0, 3).map((skill, index) => (
              <span
                key={skill}
                className="px-2 sm:px-3 py-1 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 text-xs font-medium rounded-full border border-blue-200/50 group-hover:from-blue-100 group-hover:to-purple-100 group-hover:border-blue-300 transition-all duration-200"
                style={{
                  animationDelay: `${index * 50}ms`,
                }}
              >
                {skill}
              </span>
            ))}
            {talent.skills.length > 3 && (
              <span className="px-2 sm:px-3 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-full group-hover:bg-slate-200 transition-colors duration-200">
                +{talent.skills.length - 3}
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

export default TalentCard;
