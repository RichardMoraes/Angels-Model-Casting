"use client";

import { useState, memo } from "react";
import { TalentProfile } from "../types/TalentProfile";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "../../components/ui/sheet";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import Image from "next/image";
import { 
  MapPin, 
  Ruler, 
  Weight, 
  Eye, 
  User, 
  Phone, 
  Mail, 
  Star,
  Download,
  Share2,
  Heart,
  MessageCircle
} from "lucide-react";

interface TalentDetailSheetProps {
  readonly talent: TalentProfile | null;
  readonly isOpen: boolean;
  readonly onClose: () => void;
}

const TalentDetailSheet = memo(function TalentDetailSheet({
  talent,
  isOpen,
  onClose,
}: TalentDetailSheetProps) {
  const [imageLoadedStates, setImageLoadedStates] = useState<
    Record<string, boolean>
  >({});

  if (!talent) return null;

  const handleImageLoad = (imageKey: string) => {
    setImageLoadedStates((prev) => ({ ...prev, [imageKey]: true }));
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-3xl overflow-y-auto bg-slate-50">
        {/* Header Section */}
        <SheetHeader className="bg-gradient-to-r from-slate-900 to-slate-700 text-white p-6 -m-6 mb-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <SheetTitle className="text-3xl font-bold mb-2">
                {talent.name}
              </SheetTitle>
              <SheetDescription className="text-slate-200 text-lg">
                {talent.age} anos • {talent.city}, {talent.state}
              </SheetDescription>
              <div className="flex items-center gap-4 mt-3">
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  {(() => {
                    switch (talent.gender) {
                      case "Female": return "Feminino";
                      case "Male": return "Masculino";
                      default: return "Não-binário";
                    }
                  })()}
                </Badge>
                <Badge variant="secondary" className="bg-emerald-500/20 text-emerald-200 border-emerald-400/30">
                  Disponível
                </Badge>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
                <Heart className="w-4 h-4 mr-2" />
                Favoritar
              </Button>
              <Button variant="outline" size="sm" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
                <Share2 className="w-4 h-4 mr-2" />
                Compartilhar
              </Button>
            </div>
          </div>
        </SheetHeader>

        <Tabs defaultValue="summary" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white shadow-sm">
            <TabsTrigger value="summary" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              Resumo
            </TabsTrigger>
            <TabsTrigger value="photos" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              Fotos ({talent.photos.length})
            </TabsTrigger>
            <TabsTrigger value="videos" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              Vídeos ({talent.videos.length})
            </TabsTrigger>
            <TabsTrigger value="skills" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              Habilidades ({talent.skills.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="summary" className="space-y-6">
            {/* Contact Information */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
                <MessageCircle className="w-5 h-5 mr-2 text-blue-500" />
                Informações de Contato
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                  <Phone className="w-4 h-4 text-slate-500" />
                  <span className="text-sm text-slate-600">+55 (11) 99999-9999</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                  <Mail className="w-4 h-4 text-slate-500" />
                  <span className="text-sm text-slate-600">{talent.name.toLowerCase().replace(' ', '.')}@email.com</span>
                </div>
              </div>
            </div>

            {/* Physical Details */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
                <User className="w-5 h-5 mr-2 text-blue-500" />
                Características Físicas
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                  <Ruler className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                  <div className="text-lg font-bold text-slate-900">{talent.details.heightCm}cm</div>
                  <div className="text-xs text-slate-600">Altura</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                  <Weight className="w-6 h-6 text-green-500 mx-auto mb-2" />
                  <div className="text-lg font-bold text-slate-900">{talent.details.weightKg}kg</div>
                  <div className="text-xs text-slate-600">Peso</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
                  <Eye className="w-6 h-6 text-purple-500 mx-auto mb-2" />
                  <div className="text-lg font-bold text-slate-900">{talent.details.eyeColor}</div>
                  <div className="text-xs text-slate-600">Olhos</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg">
                  <User className="w-6 h-6 text-orange-500 mx-auto mb-2" />
                  <div className="text-lg font-bold text-slate-900">{talent.details.hairColor}</div>
                  <div className="text-xs text-slate-600">Cabelo</div>
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
                <Star className="w-5 h-5 mr-2 text-blue-500" />
                Biografia
              </h3>
              <p className="text-slate-700 leading-relaxed">
                {talent.details.bio}
              </p>
            </div>

            {/* Location */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-blue-500" />
                Localização
              </h3>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-slate-500" />
                <span className="text-slate-700">{talent.city}, {talent.state}</span>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="photos" className="space-y-4">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-900">Galeria de Fotos</h3>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Baixar Todas
                </Button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {talent.photos.map((photo, index) => (
                  <div
                    key={`${talent.id}-photo-${index}`}
                    className="relative aspect-square group cursor-pointer"
                  >
                    {!imageLoadedStates[`photo-${index}`] && (
                      <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200 animate-pulse rounded-lg flex items-center justify-center">
                        <div className="w-8 h-8 bg-slate-300 rounded-full animate-pulse"></div>
                      </div>
                    )}
                    <Image
                      src={photo}
                      alt={`${talent.name} - Foto ${index + 1}`}
                      fill
                      className={`object-cover rounded-lg transition-all duration-500 group-hover:scale-105 ${
                        imageLoadedStates[`photo-${index}`]
                          ? "opacity-100"
                          : "opacity-0"
                      }`}
                      sizes="(max-width: 768px) 50vw, 33vw"
                      loading="lazy"
                      onLoad={() => handleImageLoad(`photo-${index}`)}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <Button variant="secondary" size="sm" className="bg-white/90 text-slate-900">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="videos" className="space-y-4">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Vídeos de Demonstração</h3>
              <div className="space-y-6">
                {talent.videos.map((video, index) => (
                  <div
                    key={`${talent.id}-video-${index}`}
                    className="space-y-3 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100"
                  >
                    <h4 className="font-semibold text-slate-900 flex items-center">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                      {video.title}
                    </h4>
                    <div className="aspect-video w-full rounded-lg overflow-hidden">
                      <iframe
                        src={video.url}
                        title={video.title}
                        className="w-full h-full transition-all duration-300 hover:scale-105"
                        allowFullScreen
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="skills" className="space-y-4">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Especialidades e Habilidades</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {talent.skills.map((skill, index) => (
                  <div
                    key={`${talent.id}-skill-${index}`}
                    className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg text-center transition-all duration-200 hover:scale-105 hover:shadow-lg"
                    style={{
                      animationDelay: `${index * 50}ms`,
                    }}
                  >
                    <div className="text-sm font-semibold">{skill}</div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
});

export default TalentDetailSheet;
