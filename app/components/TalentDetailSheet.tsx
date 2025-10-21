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
import Image from "next/image";

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
      <SheetContent className="w-full sm:max-w-2xl overflow-y-auto animate-in slide-in-from-right-full duration-300">
        <SheetHeader className="animate-in fade-in-0 slide-in-from-top-4 duration-500">
          <SheetTitle className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
            {talent.name}
          </SheetTitle>
          <SheetDescription className="text-slate-600">
            {talent.age} anos • {talent.city}, {talent.state}
          </SheetDescription>
        </SheetHeader>

        <Tabs defaultValue="summary" className="mt-6">
          <TabsList
            className="grid w-full grid-cols-4 animate-in fade-in-0 slide-in-from-bottom-4 duration-500"
            style={{ animationDelay: "100ms" }}
          >
            <TabsTrigger
              value="summary"
              className="transition-all duration-200 hover:bg-blue-50"
            >
              Resumo
            </TabsTrigger>
            <TabsTrigger
              value="photos"
              className="transition-all duration-200 hover:bg-blue-50"
            >
              Fotos
            </TabsTrigger>
            <TabsTrigger
              value="videos"
              className="transition-all duration-200 hover:bg-blue-50"
            >
              Vídeos
            </TabsTrigger>
            <TabsTrigger
              value="skills"
              className="transition-all duration-200 hover:bg-blue-50"
            >
              Habilidades
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value="summary"
            className="mt-6 space-y-4 animate-in fade-in-0 slide-in-from-bottom-4 duration-500"
            style={{ animationDelay: "200ms" }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-100">
                <h4 className="font-semibold mb-3 text-slate-900 flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                  Informações Físicas
                </h4>
                <div className="space-y-2 text-sm">
                  <p className="flex justify-between">
                    <span className="font-medium text-slate-600">Altura:</span>
                    <span className="text-slate-900">
                      {talent.details.heightCm}cm
                    </span>
                  </p>
                  <p className="flex justify-between">
                    <span className="font-medium text-slate-600">Peso:</span>
                    <span className="text-slate-900">
                      {talent.details.weightKg}kg
                    </span>
                  </p>
                  <p className="flex justify-between">
                    <span className="font-medium text-slate-600">Etnia:</span>
                    <span className="text-slate-900">
                      {talent.details.ethnicity}
                    </span>
                  </p>
                  <p className="flex justify-between">
                    <span className="font-medium text-slate-600">Cabelo:</span>
                    <span className="text-slate-900">
                      {talent.details.hairType}, {talent.details.hairColor}
                    </span>
                  </p>
                  <p className="flex justify-between">
                    <span className="font-medium text-slate-600">Olhos:</span>
                    <span className="text-slate-900">
                      {talent.details.eyeColor}
                    </span>
                  </p>
                </div>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
                <h4 className="font-semibold mb-3 text-slate-900 flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Bio
                </h4>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {talent.details.bio}
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent
            value="photos"
            className="mt-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-500"
            style={{ animationDelay: "200ms" }}
          >
            <div className="grid grid-cols-2 gap-4">
              {talent.photos.map((photo, index) => (
                <div
                  key={`${talent.id}-photo-${index}`}
                  className="relative aspect-square group"
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
                    sizes="(max-width: 768px) 50vw, 25vw"
                    loading="lazy"
                    onLoad={() => handleImageLoad(`photo-${index}`)}
                  />
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent
            value="videos"
            className="mt-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-500"
            style={{ animationDelay: "200ms" }}
          >
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
          </TabsContent>

          <TabsContent
            value="skills"
            className="mt-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-500"
            style={{ animationDelay: "200ms" }}
          >
            <div className="flex flex-wrap gap-3">
              {talent.skills.map((skill, index) => (
                <span
                  key={`${talent.id}-skill-${index}`}
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full text-sm font-medium transition-all duration-200 hover:from-blue-600 hover:to-purple-700 hover:scale-105 shadow-sm"
                  style={{
                    animationDelay: `${index * 50}ms`,
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
});

export default TalentDetailSheet;
