import React, { useState } from 'react';
import { MapPin, Star, ChevronLeft, ChevronRight, Heart, Briefcase, Eye, TrendingUp, Award, Globe2 } from 'lucide-react';
import { Talent } from '../types/talent';
import { Badge } from './Badge';

interface TalentCardProps {
  talent: Talent;
  onClick: () => void;
}

export function TalentCard({ talent, onClick }: TalentCardProps) {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const handlePrevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentPhotoIndex((prev) => (prev === 0 ? talent.photos.length - 1 : prev - 1));
  };

  const handleNextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentPhotoIndex((prev) => (prev === talent.photos.length - 1 ? 0 : prev + 1));
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const deptColors: Record<string, string> = {
    F: '#5B6BFF',
    E: '#4CAF50',
    O: '#FF9500',
    R: '#FF5722',
  };

  const deptNames: Record<string, string> = {
    F: 'Fotografia',
    E: 'Eventos',
    O: 'Online',
    R: 'Rádio/TV',
  };

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="bg-white rounded-2xl overflow-hidden cursor-pointer group relative"
      style={{
        transform: isHovered ? 'translateY(-12px)' : 'translateY(0)',
        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        boxShadow: isHovered
          ? '0 25px 50px -12px rgba(75, 27, 111, 0.25), 0 0 0 1px rgba(75, 27, 111, 0.1)'
          : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      }}
    >
      {/* Photo Carousel */}
      <div className="relative h-[360px] overflow-hidden bg-gray-900">
        {/* Multi-layer gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10 opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#4B1B6F]/20 via-transparent to-transparent z-10" />
        
        <img
          src={talent.photos[currentPhotoIndex]}
          alt={talent.name}
          className="w-full h-full object-cover"
          style={{
            transform: isHovered ? 'scale(1.08)' : 'scale(1)',
            transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        />
        
        {/* Navigation Buttons */}
        {talent.photos.length > 1 && (
          <>
            <button
              onClick={handlePrevPhoto}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-md text-gray-800 p-2.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110 shadow-xl z-20"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNextPhoto}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-md text-gray-800 p-2.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110 shadow-xl z-20"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}

        {/* Photo Indicator Dots */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {talent.photos.map((_, idx) => (
            <div
              key={idx}
              className={`h-1.5 rounded-full transition-all duration-300 shadow-lg ${
                idx === currentPhotoIndex 
                  ? 'w-10 bg-white' 
                  : 'w-1.5 bg-white/60 hover:bg-white/80'
              }`}
            />
          ))}
        </div>

        {/* Top Status Badges Row */}
        <div className="absolute top-4 left-4 right-4 flex items-start justify-between z-20">
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 flex-wrap">
              {talent.isPremium && (
                <div className="bg-gradient-to-r from-[#7B3FF2] to-[#4B1B6F] text-white px-3.5 py-1.5 rounded-full backdrop-blur-md text-xs shadow-lg flex items-center gap-1.5">
                  <Award className="w-3 h-3" />
                  Premium
                </div>
              )}
              {talent.isNew && (
                <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-3.5 py-1.5 rounded-full backdrop-blur-md text-xs shadow-lg">
                  Novo Talento
                </div>
              )}
            </div>
            
            {/* Performance Badge - Só aparece no hover */}
            {talent.bookingRate && talent.bookingRate >= 80 && (
              <div 
                className="bg-amber-500/95 text-white px-3 py-1.5 rounded-full backdrop-blur-md text-xs shadow-lg flex items-center gap-1.5 transition-all duration-300"
                style={{
                  opacity: isHovered ? 1 : 0,
                  transform: isHovered ? 'translateX(0)' : 'translateX(-10px)',
                }}
              >
                <TrendingUp className="w-3 h-3" />
                Alta Demanda
              </div>
            )}
          </div>
          
          {/* Favorite Button */}
          <button
            onClick={handleFavorite}
            className={`p-2.5 rounded-full backdrop-blur-md transition-all duration-300 shadow-lg ${
              isFavorite 
                ? 'bg-red-500 text-white scale-110' 
                : 'bg-white/30 text-white hover:bg-white/40 hover:scale-110'
            }`}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-white' : ''}`} />
          </button>
        </div>

        {/* Stats Bar - Aparece no hover */}
        <div 
          className="absolute top-20 right-4 flex flex-col gap-2 transition-all duration-300 z-20"
          style={{
            opacity: isHovered ? 1 : 0,
            transform: isHovered ? 'translateX(0)' : 'translateX(10px)',
          }}
        >
          {talent.portfolioViews && (
            <div className="bg-black/60 backdrop-blur-md px-3 py-2 rounded-lg shadow-xl">
              <div className="flex items-center gap-2 text-white">
                <Eye className="w-3.5 h-3.5" />
                <span className="text-xs">{talent.portfolioViews.toLocaleString('pt-BR')}</span>
              </div>
            </div>
          )}
        </div>

        {/* Name and Core Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-5 z-20">
          <div className="space-y-3">
            {/* Name and Rating */}
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-white text-xl mb-1.5 drop-shadow-2xl">{talent.name}</h3>
                <div className="flex items-center gap-3 text-white/95 flex-wrap text-sm">
                  <div className="flex items-center gap-1.5 bg-black/30 backdrop-blur-sm px-2.5 py-1 rounded-full">
                    <Star className="w-3.5 h-3.5 fill-[#FFB700] text-[#FFB700]" />
                    <span className="font-medium">{talent.rating}</span>
                  </div>
                  <span className="text-white/60">•</span>
                  <span>{talent.age} anos</span>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="flex items-center gap-2 flex-wrap">
              <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full text-white text-xs">
                <MapPin className="w-3 h-3" />
                {talent.city}
              </div>
              {talent.languages && talent.languages.length > 0 && (
                <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full text-white text-xs">
                  <Globe2 className="w-3 h-3" />
                  {talent.languages.length} idioma{talent.languages.length > 1 ? 's' : ''}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Content Section */}
      <div className="p-5 space-y-4">
        {/* Professional Measurements - Compact */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <div>
              <span className="text-xs text-gray-500">Altura</span>
              <p className="text-sm font-semibold text-gray-900">{talent.height}cm</p>
            </div>
            <div className="h-8 w-px bg-gray-200" />
            <div>
              <span className="text-xs text-gray-500">{talent.gender === 'F' ? 'Busto' : 'Peito'}</span>
              <p className="text-sm font-semibold text-gray-900">{talent.bust}cm</p>
            </div>
            <div className="h-8 w-px bg-gray-200" />
            <div>
              <span className="text-xs text-gray-500">Cintura</span>
              <p className="text-sm font-semibold text-gray-900">{talent.waist}cm</p>
            </div>
            <div className="h-8 w-px bg-gray-200" />
            <div>
              <span className="text-xs text-gray-500">Quadril</span>
              <p className="text-sm font-semibold text-gray-900">{talent.hip}cm</p>
            </div>
          </div>
        </div>

        {/* Departments */}
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-500">Categorias:</span>
          <div className="flex items-center gap-2">
            {talent.departments.map((dept) => (
              <div
                key={dept}
                className="group/dept relative"
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-medium shadow-md transition-all duration-300 hover:scale-110 hover:shadow-lg cursor-help"
                  style={{ 
                    backgroundColor: deptColors[dept],
                    boxShadow: `0 4px 12px ${deptColors[dept]}40`,
                  }}
                >
                  {dept}
                </div>
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1.5 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover/dept:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none shadow-xl z-30">
                  {deptNames[dept]}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Specialties */}
        <div className="flex flex-wrap gap-2">
          {talent.specialties.slice(0, 3).map((specialty, idx) => (
            <span
              key={idx}
              className="bg-gradient-to-r from-[#7B3FF2] to-[#4B1B6F] text-white px-4 py-1.5 rounded-full text-xs font-medium shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105"
            >
              {specialty}
            </span>
          ))}
          {talent.specialties.length > 3 && (
            <span className="bg-gray-100 text-gray-700 px-4 py-1.5 rounded-full text-xs font-medium border border-gray-200 hover:bg-gray-200 transition-all duration-300">
              +{talent.specialties.length - 3}
            </span>
          )}
        </div>

        {/* Bottom Status Bar */}
        <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div 
              className={`w-2 h-2 rounded-full ${talent.isAvailable ? 'bg-green-500' : 'bg-gray-400'}`}
              style={{
                boxShadow: talent.isAvailable ? '0 0 8px rgba(34, 197, 94, 0.5)' : 'none',
              }}
            />
            <span className={`text-xs font-medium ${talent.isAvailable ? 'text-green-600' : 'text-gray-500'}`}>
              {talent.isAvailable ? 'Disponível' : 'Indisponível'}
            </span>
          </div>
          
          {talent.hasDRT && (
            <span className="text-xs bg-gradient-to-r from-[#4B1B6F]/10 to-[#7B3FF2]/10 text-[#4B1B6F] px-3 py-1 rounded-full font-medium border border-[#4B1B6F]/20">
              DRT
            </span>
          )}
        </div>
      </div>

      {/* Hover Overlay Effect */}
      <div 
        className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: 'linear-gradient(135deg, rgba(123, 63, 242, 0.03) 0%, rgba(75, 27, 111, 0.03) 100%)',
        }}
      />
    </div>
  );
}