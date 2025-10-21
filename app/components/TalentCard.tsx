"use client";

import { useState, memo } from "react";
import { TalentProfile } from "../types/TalentProfile";
import { Card, CardContent } from "../../components/ui/card";
import Image from "next/image";
import { MapPin, Calendar, Ruler, Weight, Eye, User } from "lucide-react";

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
      className="group cursor-pointer hover:shadow-2xl transition-all duration-500 overflow-hidden border border-slate-200/50 bg-white hover:border-slate-300 hover:-translate-y-1 hover:scale-[1.01] shadow-lg hover:shadow-slate-300/50 relative z-10 h-full flex flex-col"
      onClick={() => onClick(talent)}
    >
      {/* Image Section */}
      <div className="relative w-full h-72 overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100">
        {/* Loading placeholder */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200 animate-pulse flex items-center justify-center">
            <div className="w-16 h-16 bg-slate-300 rounded-full animate-pulse"></div>
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
          priority={false}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          onError={handleImageError}
        />
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Quick info overlay - Mostra informações únicas no hover */}
        <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
          <div className="bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-slate-600">
                <Calendar className="w-4 h-4" />
                <span>{talent.age} anos</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <MapPin className="w-4 h-4" />
                <span>{talent.city}</span>
              </div>
            </div>
            <div className="mt-2 text-center">
              <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2 py-1 rounded-full">
                {talent.skills.length} especialidades
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <CardContent className="p-6 bg-white flex-1 flex flex-col">
        <div className="space-y-6 flex-1 flex flex-col justify-between">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-xl text-slate-900 group-hover:text-blue-600 transition-colors duration-300 truncate">
                {talent.name}
              </h3>
              <div className="flex items-center gap-2 mt-2">
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
            
            {/* Gender badge */}
            <div className="ml-4 px-3 py-1.5 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 text-xs font-semibold rounded-full border border-blue-200/50 group-hover:from-blue-100 group-hover:to-purple-100 transition-all duration-300">
              {(() => {
                switch (talent.gender) {
                  case "Female": return "Fem";
                  case "Male": return "Masc";
                  default: return "NB";
                }
              })()}
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

          {/* Skills - Sempre no final */}
          <div className="space-y-3 mt-auto">
            <h4 className="text-sm font-semibold text-slate-700">Especialidades</h4>
            <div className="flex flex-wrap gap-2.5">
              {talent.skills.slice(0, 3).map((skill, index) => (
                <span
                  key={skill}
                  className="px-3 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-semibold rounded-full shadow-sm group-hover:shadow-md transition-all duration-300 hover:scale-105"
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  {skill}
                </span>
              ))}
              {talent.skills.length > 3 && (
                <span className="px-3 py-2 bg-slate-200 text-slate-600 text-xs font-semibold rounded-full group-hover:bg-slate-300 transition-colors duration-300">
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
