"use client";

import { useState, useEffect, memo } from "react";
import { TalentProfile } from "../types/TalentProfile";
import Image from "next/image";
import {
  X,
  Heart,
  Share2,
  Download,
  Phone,
  Mail,
  Calendar,
  Ruler,
  Star,
  MapPin,
  Globe2,
  Award,
  Briefcase,
  TrendingUp,
  Eye,
} from "lucide-react";

/**
 * Props for the TalentDetailSheet component
 */
interface TalentDetailSheetProps {
  /** Talent profile data to display */
  readonly talent: TalentProfile | null;
  /** Whether the sheet is open */
  readonly isOpen: boolean;
  /** Callback function when sheet is closed */
  readonly onClose: () => void;
}

/**
 * Department colors mapping
 */
const deptColors: Record<string, string> = {
  F: "#5B6BFF",
  E: "#4CAF50",
  O: "#FF9500",
  R: "#FF5722",
};

const deptLabels: Record<string, string> = {
  F: "Fotografia",
  E: "Eventos",
  O: "Digital/Online",
  R: "Rádio & TV",
};

/**
 * Detailed sidebar component for displaying comprehensive talent information
 * Matches the Figma TalentModal design exactly
 */
const TalentDetailSheet = memo(function TalentDetailSheet({
  talent,
  isOpen,
  onClose,
}: TalentDetailSheetProps) {
  const [activeTab, setActiveTab] = useState<
    "summary" | "photos" | "videos" | "skills"
  >("summary");
  const [isAnimating, setIsAnimating] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setIsAnimating(true), 10);
      document.body.style.overflow = "hidden";
    } else {
      setIsAnimating(false);
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(onClose, 300);
  };

  if (!talent || !isOpen) return null;

  const genderLabel =
    talent.gender === "Female"
      ? "Feminino"
      : talent.gender === "Male"
        ? "Masculino"
        : "Não-binário";

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-300"
        style={{ opacity: isAnimating ? 1 : 0 }}
        onClick={handleClose}
      />

      {/* Side Panel */}
      <div
        className="fixed right-0 top-0 h-full w-full max-w-3xl bg-gray-50 shadow-2xl z-50 flex flex-col transition-transform duration-500 ease-out overflow-y-auto"
        style={{
          transform: isAnimating ? "translateX(0)" : "translateX(100%)",
          boxShadow: "-10px 0 40px rgba(0, 0, 0, 0.3)",
          WebkitOverflowScrolling: "touch",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Hero Image - Responsive height */}
        <div className="relative h-auto min-h-[280px] sm:min-h-[288px] overflow-hidden bg-gray-900 flex-shrink-0">
          {/* Hero Background Image */}
          {imageError ? (
            <div className="w-full h-full bg-gradient-to-br from-[#4B1B6F] to-[#7B3FF2] flex items-center justify-center">
              <span className="text-8xl font-bold text-white/20">
                {talent.name.charAt(0)}
              </span>
            </div>
          ) : (
            <Image
              src={talent.mainPhotoUrl}
              alt={talent.name}
              fill
              className="object-cover opacity-60"
              priority
              onError={() => setImageError(true)}
            />
          )}

          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#4B1B6F]/40 via-transparent to-transparent" />

          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-6 right-6 bg-black/40 backdrop-blur-md rounded-full p-3 hover:bg-black/60 transition-all duration-300 text-white z-20 group"
          >
            <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
          </button>

          {/* Profile Content Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-8 z-10">
            <div className="flex items-end gap-4 sm:gap-6 mb-4 sm:mb-6">
              {/* Profile Photo */}
              <div className="relative flex-shrink-0">
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border-4 border-white/20 shadow-2xl backdrop-blur-sm">
                  {imageError ? (
                    <div className="w-full h-full bg-gradient-to-br from-[#4B1B6F] to-[#7B3FF2] flex items-center justify-center">
                      <span className="text-4xl font-bold text-white">
                        {talent.name.charAt(0)}
                      </span>
                    </div>
                  ) : (
                    <Image
                      src={talent.mainPhotoUrl}
                      alt={talent.name}
                      fill
                      className="object-cover"
                      priority
                      onError={() => setImageError(true)}
                    />
                  )}
                </div>
                {/* Status Indicator */}
                <div
                  className={`absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 rounded-full p-1.5 sm:p-2 shadow-xl border-2 sm:border-4 border-black/20 ${
                    talent.status.isAvailable ? "bg-green-500" : "bg-gray-400"
                  }`}
                  style={{
                    boxShadow: talent.status.isAvailable
                      ? "0 0 20px rgba(34, 197, 94, 0.6)"
                      : "none",
                  }}
                >
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full" />
                </div>
              </div>

              {/* Name and Info */}
              <div className="flex-1 text-white pb-1 sm:pb-2">
                <div className="flex items-start justify-between mb-2 sm:mb-3">
                  <div>
                    <h2 className="text-xl sm:text-3xl text-white mb-1 sm:mb-2 drop-shadow-lg font-semibold">
                      {talent.name}
                    </h2>
                    <div className="flex items-center gap-2 sm:gap-3 text-white/90 flex-wrap text-sm sm:text-base">
                      <div className="flex items-center gap-1.5 sm:gap-2 bg-black/30 backdrop-blur-sm px-2 sm:px-3 py-1 sm:py-1.5 rounded-full">
                        <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">{talent.rating}</span>
                      </div>
                      <span className="text-white/60">•</span>
                      <span>{talent.age} anos</span>
                      <span className="text-white/60 hidden sm:inline">•</span>
                      <div className="hidden sm:flex items-center gap-1.5">
                        <MapPin className="w-4 h-4" />
                        {talent.city}, {talent.state}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Badges - Hidden on very small screens */}
                <div className="hidden sm:flex items-center gap-2 flex-wrap">
                  <span className="bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full text-sm border border-white/20">
                    {genderLabel}
                  </span>
                  <span className="bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full text-sm border border-white/20">
                    {talent.details.ethnicity}
                  </span>
                  {talent.status.hasDRT && (
                    <span className="bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full text-sm border border-white/20">
                      DRT Ativo
                    </span>
                  )}
                  {talent.status.isPremium && (
                    <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 px-3 py-1.5 rounded-full text-sm flex items-center gap-1.5 shadow-lg font-medium">
                      <Award className="w-3.5 h-3.5" />
                      Premium
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 sm:gap-3">
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className={`flex-1 backdrop-blur-md py-2.5 sm:py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-1.5 sm:gap-2 font-medium shadow-lg text-sm sm:text-base ${
                  isFavorite
                    ? "bg-red-500 text-white hover:bg-red-600"
                    : "bg-white/20 hover:bg-white/30 text-white border border-white/20"
                }`}
              >
                <Heart
                  className={`w-4 h-4 sm:w-5 sm:h-5 ${isFavorite ? "fill-white" : ""}`}
                />
                <span className="hidden xs:inline">{isFavorite ? "Favoritado" : "Favoritar"}</span>
              </button>
              <button className="flex-1 bg-white text-[#4B1B6F] hover:bg-gray-100 py-2.5 sm:py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-1.5 sm:gap-2 font-medium shadow-lg text-sm sm:text-base">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden xs:inline">Agendar</span>
              </button>
              <button className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-white p-2.5 sm:p-3.5 rounded-xl transition-all duration-300 border border-white/20 shadow-lg">
                <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Tabs Navigation - Sticky on larger screens */}
        <div className="flex border-b border-gray-200 bg-white shadow-sm flex-shrink-0 sticky top-0 z-20">
          {[
            { id: "summary", label: "Perfil", labelFull: "Perfil Completo" },
            { id: "photos", label: "Book", labelFull: "Book Fotográfico", count: talent.photos.length },
            { id: "videos", label: "Vídeos", labelFull: "Showreel", count: talent.videos.length },
            { id: "skills", label: "Skills", labelFull: "Especialidades" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex-1 px-2 sm:px-6 py-3 sm:py-4 relative transition-all duration-300 font-medium text-xs sm:text-base ${
                activeTab === tab.id
                  ? "text-[#4B1B6F] bg-gray-50"
                  : "text-gray-600 hover:text-[#4B1B6F] hover:bg-gray-50/50"
              }`}
            >
              <div className="flex items-center justify-center gap-1 sm:gap-2">
                <span className="sm:hidden">{tab.label}</span>
                <span className="hidden sm:inline">{tab.labelFull}</span>
                {tab.count !== undefined && (
                  <span
                    className={`text-xs px-1.5 sm:px-2 py-0.5 rounded-full ${
                      activeTab === tab.id
                        ? "bg-[#4B1B6F] text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </div>
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 sm:h-1 bg-gradient-to-r from-[#7B3FF2] to-[#4B1B6F] rounded-t-full" />
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="flex-1">
          <div className="p-6 sm:p-8 pb-16">
            {/* Summary Tab */}
            {activeTab === "summary" && (
              <div className="space-y-6 max-w-4xl">
                {/* Professional Measurements Card */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                  <div className="flex items-center gap-2 mb-5">
                    <div className="p-2 bg-[#4B1B6F]/10 rounded-lg">
                      <Ruler className="w-5 h-5 text-[#4B1B6F]" />
                    </div>
                    <h3 className="text-lg text-gray-900 font-semibold">
                      Medidas Profissionais
                    </h3>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 p-4 rounded-xl border border-blue-200/50">
                      <p className="text-xs text-blue-600 mb-1 font-medium">
                        Altura
                      </p>
                      <p className="text-2xl font-semibold text-gray-900">
                        {talent.details.heightCm}
                      </p>
                      <p className="text-xs text-gray-500">cm</p>
                    </div>
                    <div className="bg-gradient-to-br from-green-50 to-green-100/50 p-4 rounded-xl border border-green-200/50">
                      <p className="text-xs text-green-600 mb-1 font-medium">
                        Peso
                      </p>
                      <p className="text-2xl font-semibold text-gray-900">
                        {talent.details.weightKg}
                      </p>
                      <p className="text-xs text-gray-500">kg</p>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 p-4 rounded-xl border border-purple-200/50">
                      <p className="text-xs text-purple-600 mb-1 font-medium">
                        {talent.gender === "Female" ? "Busto" : "Peito"}
                      </p>
                      <p className="text-2xl font-semibold text-gray-900">
                        {talent.details.bust || "-"}
                      </p>
                      <p className="text-xs text-gray-500">cm</p>
                    </div>
                    <div className="bg-gradient-to-br from-pink-50 to-pink-100/50 p-4 rounded-xl border border-pink-200/50">
                      <p className="text-xs text-pink-600 mb-1 font-medium">
                        Cintura
                      </p>
                      <p className="text-2xl font-semibold text-gray-900">
                        {talent.details.waist || "-"}
                      </p>
                      <p className="text-xs text-gray-500">cm</p>
                    </div>
                    <div className="bg-gradient-to-br from-orange-50 to-orange-100/50 p-4 rounded-xl border border-orange-200/50">
                      <p className="text-xs text-orange-600 mb-1 font-medium">
                        Quadril
                      </p>
                      <p className="text-2xl font-semibold text-gray-900">
                        {talent.details.hip || "-"}
                      </p>
                      <p className="text-xs text-gray-500">cm</p>
                    </div>
                    <div className="bg-gradient-to-br from-indigo-50 to-indigo-100/50 p-4 rounded-xl border border-indigo-200/50">
                      <p className="text-xs text-indigo-600 mb-1 font-medium">
                        Calçado
                      </p>
                      <p className="text-2xl font-semibold text-gray-900">
                        {talent.details.shoeSize || "-"}
                      </p>
                      <p className="text-xs text-gray-500">BR</p>
                    </div>
                    <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 p-4 rounded-xl border border-amber-200/50">
                      <p className="text-xs text-amber-600 mb-1 font-medium">
                        Olhos
                      </p>
                      <p className="text-lg font-semibold text-gray-900">
                        {talent.details.eyeColor}
                      </p>
                    </div>
                    <div className="bg-gradient-to-br from-rose-50 to-rose-100/50 p-4 rounded-xl border border-rose-200/50">
                      <p className="text-xs text-rose-600 mb-1 font-medium">
                        Cabelo
                      </p>
                      <p className="text-lg font-semibold text-gray-900">
                        {talent.details.hairColor}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Languages Card */}
                {talent.languages && talent.languages.length > 0 && (
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="p-2 bg-[#4B1B6F]/10 rounded-lg">
                        <Globe2 className="w-5 h-5 text-[#4B1B6F]" />
                      </div>
                      <h3 className="text-lg text-gray-900 font-semibold">
                        Idiomas
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {talent.languages.map((language, idx) => (
                        <div
                          key={idx}
                          className="bg-gradient-to-br from-gray-50 to-gray-100 px-5 py-3 rounded-xl border border-gray-200 flex items-center gap-2"
                        >
                          <Globe2 className="w-4 h-4 text-gray-600" />
                          <span className="text-gray-900 font-medium">
                            {language}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Portfolio Stats */}
                {(talent.stats?.portfolioViews || talent.stats?.bookingRate) && (
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                    <div className="flex items-center gap-2 mb-5">
                      <div className="p-2 bg-[#4B1B6F]/10 rounded-lg">
                        <TrendingUp className="w-5 h-5 text-[#4B1B6F]" />
                      </div>
                      <h3 className="text-lg text-gray-900 font-semibold">
                        Performance
                      </h3>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      {talent.stats?.portfolioViews && (
                        <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 p-5 rounded-xl border border-purple-200/50">
                          <div className="flex items-center gap-2 mb-2">
                            <Eye className="w-4 h-4 text-purple-600" />
                            <p className="text-xs text-purple-600 font-medium">
                              Visualizações
                            </p>
                          </div>
                          <p className="text-2xl font-semibold text-gray-900">
                            {talent.stats.portfolioViews.toLocaleString("pt-BR")}
                          </p>
                        </div>
                      )}
                      {talent.stats?.bookingRate && (
                        <div className="bg-gradient-to-br from-green-50 to-green-100/50 p-5 rounded-xl border border-green-200/50">
                          <div className="flex items-center gap-2 mb-2">
                            <Briefcase className="w-4 h-4 text-green-600" />
                            <p className="text-xs text-green-600 font-medium">
                              Taxa de Conversão
                            </p>
                          </div>
                          <p className="text-2xl font-semibold text-gray-900">
                            {talent.stats.bookingRate}%
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Contact Info Card */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                  <div className="flex items-center gap-2 mb-5">
                    <div className="p-2 bg-[#4B1B6F]/10 rounded-lg">
                      <Phone className="w-5 h-5 text-[#4B1B6F]" />
                    </div>
                    <h3 className="text-lg text-gray-900 font-semibold">
                      Informações de Contato
                    </h3>
                  </div>
                  <div className="space-y-3">
                    <a
                      href={`tel:${talent.contact?.phone || "+55 (11) 99999-9999"}`}
                      className="flex items-center gap-4 p-4 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl hover:from-blue-100 hover:to-blue-200/50 transition-all duration-300 border border-blue-200/50 group"
                    >
                      <div className="p-2 bg-blue-500 rounded-lg group-hover:scale-110 transition-transform duration-300">
                        <Phone className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-xs text-blue-600 font-medium mb-0.5">
                          Telefone
                        </p>
                        <span className="text-gray-900 font-semibold">
                          {talent.contact?.phone || "+55 (11) 99999-9999"}
                        </span>
                      </div>
                    </a>
                    <a
                      href={`mailto:${talent.contact?.email || `${talent.name.toLowerCase().replace(" ", ".")}@email.com`}`}
                      className="flex items-center gap-4 p-4 bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-xl hover:from-purple-100 hover:to-purple-200/50 transition-all duration-300 border border-purple-200/50 group"
                    >
                      <div className="p-2 bg-purple-500 rounded-lg group-hover:scale-110 transition-transform duration-300">
                        <Mail className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-xs text-purple-600 font-medium mb-0.5">
                          E-mail
                        </p>
                        <span className="text-gray-900 font-semibold">
                          {talent.contact?.email ||
                            `${talent.name.toLowerCase().replace(" ", ".")}@email.com`}
                        </span>
                      </div>
                    </a>
                  </div>
                </div>

                {/* Last Update */}
                <div className="text-center py-4">
                  <p className="text-sm text-gray-500">
                    Última atualização:{" "}
                    <span className="font-medium text-gray-700">
                      {talent.lastUpdate || "há 2 dias"}
                    </span>
                  </p>
                </div>
              </div>
            )}

            {/* Photos Tab */}
            {activeTab === "photos" && (
              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl text-gray-900 font-semibold mb-2">
                      Book Fotográfico
                    </h3>
                    <p className="text-gray-600">
                      Portfolio profissional completo
                    </p>
                  </div>
                  <button className="bg-[#4B1B6F] text-white px-5 py-2.5 rounded-xl hover:bg-[#3a1557] transition-all duration-300 flex items-center gap-2 shadow-lg">
                    <Download className="w-4 h-4" />
                    Baixar Book
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-5">
                  {talent.photos.map((photo, idx) => (
                    <div
                      key={idx}
                      className="relative group overflow-hidden rounded-2xl aspect-[3/4] shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer bg-gray-100"
                    >
                      <Image
                        src={photo}
                        alt={`${talent.name} - Foto ${idx + 1}`}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                        <div className="text-white">
                          <p className="font-semibold mb-1">Foto {idx + 1}</p>
                          <p className="text-sm text-white/80">{talent.name}</p>
                        </div>
                      </div>
                      {/* Photo Number Badge */}
                      <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-xs font-medium">
                        {idx + 1} / {talent.photos.length}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Videos Tab */}
            {activeTab === "videos" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl text-gray-900 font-semibold mb-2">
                    Showreel & Vídeos
                  </h3>
                  <p className="text-gray-600">Portfólio em movimento</p>
                </div>
                {talent.videos.length === 0 ? (
                  <div className="bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 aspect-video rounded-2xl flex flex-col items-center justify-center shadow-inner border border-gray-200">
                    <div className="w-20 h-20 bg-[#4B1B6F]/10 rounded-full flex items-center justify-center mb-4">
                      <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[20px] border-l-[#4B1B6F] border-b-[12px] border-b-transparent ml-1" />
                    </div>
                    <p className="text-gray-600 font-medium">
                      Nenhum vídeo disponível
                    </p>
                    <p className="text-sm text-gray-400 mt-1">
                      Em breve novos conteúdos
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 aspect-video rounded-2xl flex flex-col items-center justify-center shadow-inner border border-gray-200 cursor-pointer hover:shadow-md transition-all duration-300">
                      <div className="w-20 h-20 bg-[#4B1B6F]/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                        <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[20px] border-l-[#4B1B6F] border-b-[12px] border-b-transparent ml-1" />
                      </div>
                      <p className="text-gray-600 font-medium">Vídeo Showreel</p>
                      <p className="text-sm text-gray-400 mt-1">
                        Clique para reproduzir
                      </p>
                    </div>

                    {talent.videos.length > 1 && (
                      <div className="grid grid-cols-2 gap-5 mt-6">
                        {talent.videos.slice(1).map((video, idx) => (
                          <div
                            key={idx}
                            className="bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 aspect-video rounded-2xl flex flex-col items-center justify-center shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 cursor-pointer"
                          >
                            <div className="w-16 h-16 bg-[#4B1B6F]/10 rounded-full flex items-center justify-center mb-3">
                              <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[16px] border-l-[#4B1B6F] border-b-[10px] border-b-transparent ml-1" />
                            </div>
                            <p className="text-gray-600 text-sm">
                              {video.title || `Vídeo ${idx + 2}`}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            )}

            {/* Skills Tab */}
            {activeTab === "skills" && (
              <div className="space-y-6">
                {/* Professional Categories */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                  <div className="flex items-center gap-2 mb-5">
                    <div className="p-2 bg-[#4B1B6F]/10 rounded-lg">
                      <Briefcase className="w-5 h-5 text-[#4B1B6F]" />
                    </div>
                    <h3 className="text-lg text-gray-900 font-semibold">
                      Categorias Profissionais
                    </h3>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {talent.skillTags.map((dept) => (
                      <div
                        key={dept}
                        className="px-6 py-5 rounded-xl text-white shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group"
                        style={{
                          backgroundColor: deptColors[dept] || "#666",
                          boxShadow: `0 4px 12px ${deptColors[dept] || "#666"}40`,
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-lg font-bold group-hover:scale-110 transition-transform duration-300">
                            {dept}
                          </div>
                          <span className="font-semibold">
                            {deptLabels[dept] || dept}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Specialties and Skills */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                  <div className="flex items-center gap-2 mb-5">
                    <div className="p-2 bg-[#4B1B6F]/10 rounded-lg">
                      <Award className="w-5 h-5 text-[#4B1B6F]" />
                    </div>
                    <h3 className="text-lg text-gray-900 font-semibold">
                      Especialidades & Habilidades
                    </h3>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {talent.skills.map((specialty, idx) => (
                      <div
                        key={idx}
                        className="bg-gradient-to-r from-[#7B3FF2] to-[#4B1B6F] text-white px-6 py-4 rounded-xl text-center shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105 font-medium"
                      >
                        {specialty}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
});

export default TalentDetailSheet;
