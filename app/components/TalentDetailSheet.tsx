"use client";

import { useState, memo } from "react";
import { TalentProfile } from "../types/TalentProfile";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from "../../components/ui/sheet";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
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
  MessageCircle,
  X,
} from "lucide-react";
import SkillTag from "./SkillTag";

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
 * Detailed sidebar component for displaying comprehensive talent information
 * Features tabs for different content sections, image galleries, and contact info
 */
const TalentDetailSheet = memo(function TalentDetailSheet({
  talent,
  isOpen,
  onClose,
}: TalentDetailSheetProps) {
  const [imageLoadedStates, setImageLoadedStates] = useState<
    Record<string, boolean>
  >({});
  const [imageErrorStates, setImageErrorStates] = useState<
    Record<string, boolean>
  >({});
  const [isClosing, setIsClosing] = useState(false);

  /**
   * Handles successful image loading
   */
  const handleImageLoad = (imageKey: string) => {
    setImageLoadedStates((prev) => ({ ...prev, [imageKey]: true }));
  };

  /**
   * Handles image loading errors by switching to placeholder
   */
  const handleImageError = (imageKey: string) => {
    setImageErrorStates((prev) => ({ ...prev, [imageKey]: true }));
    setImageLoadedStates((prev) => ({ ...prev, [imageKey]: true }));
  };

  /**
   * Handles sheet close with animation
   */
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 400); // Match animation duration
  };

  // Always render the Sheet, but control visibility with isOpen prop
  return (
    <Sheet open={isOpen} onOpenChange={handleClose}>
      <SheetContent
        side="right"
        className={`w-full sm:w-[70vw] md:w-[65vw] lg:w-[60vw] xl:w-[55vw] 2xl:w-[50vw] overflow-y-auto bg-gray-50 p-0 sidebar-content ${isClosing ? 'closing' : ''}`}
      >
        {talent && (
          <>
            {/* Custom Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-50 p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all duration-200 hover:scale-110 btn-interactive"
            >
              <X className="w-4 h-4 text-slate-700" />
            </button>

            {/* Header Section with Photo */}
            <div className="relative bg-corporate-gradient text-white pt-12 pb-6 px-4 lg:pt-20 lg:pb-8 lg:px-10 animate-fade-in-scale">
              {/* Background Photo */}
              <div className="absolute inset-0 overflow-hidden">
                {imageErrorStates["background"] ? (
                  <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-600 flex items-center justify-center">
                    <div className="text-6xl font-bold text-white/30">
                      {talent.name.charAt(0)}
                    </div>
                  </div>
                ) : (
                  <Image
                    src={talent.mainPhotoUrl}
                    alt={`Photo of ${talent.name}`}
                    fill
                    className="object-cover opacity-20"
                    priority
                    onLoad={() => handleImageLoad("background")}
                    onError={() => handleImageError("background")}
                  />
                )}
                <div className="absolute inset-0 bg-corporate-gradient-overlay"></div>
              </div>

              {/* Content */}
              <div className="relative z-10">
                <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4 lg:gap-6">
                  {/* Profile Photo */}
                  <div className="shrink-0">
                    <div className="relative w-20 h-20 lg:w-32 lg:h-32 rounded-full overflow-hidden border-4 border-white/30 shadow-xl">
                      {imageErrorStates["profile"] ? (
                        <div className="w-full h-full bg-gradient-to-br from-slate-700 to-slate-600 flex items-center justify-center">
                          <div className="text-2xl lg:text-5xl font-bold text-white">
                            {talent.name.charAt(0)}
                          </div>
                        </div>
                      ) : (
                        <Image
                          src={talent.mainPhotoUrl}
                          alt={`Photo of ${talent.name}`}
                          fill
                          className="object-cover"
                          priority
                          onLoad={() => handleImageLoad("profile")}
                          onError={() => handleImageError("profile")}
                        />
                      )}
                    </div>
                  </div>

                  {/* Profile Info */}
                  <div className="flex-1 min-w-0 text-center lg:text-left w-full lg:w-auto">
                    <SheetTitle className="text-2xl lg:text-4xl font-bold mb-2 text-white drop-shadow-2xl shadow-black/50">
                      {talent.name}
                    </SheetTitle>
                    <SheetDescription className="text-slate-200 text-base lg:text-xl mb-4">
                      {talent.age} years • {talent.city}, {talent.state}
                    </SheetDescription>
                    <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 lg:gap-4 mb-4">
                      <span className="px-3 py-1.5 bg-white/20 text-white text-xs lg:text-sm font-medium rounded-full border border-white/30">
                        {(() => {
                          switch (talent.gender) {
                            case "Female":
                              return "Female";
                            case "Male":
                              return "Male";
                            default:
                              return "Non-binary";
                          }
                        })()}
                      </span>
                      <span className="px-3 py-1.5 bg-emerald-500/20 text-emerald-200 text-xs md:text-sm font-medium rounded-full border border-emerald-400/30">
                        Available
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2 lg:gap-4 w-full lg:w-auto justify-center lg:justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-white/10 border-white/30 text-white hover:bg-white/20 px-3 lg:px-6 py-2 text-xs lg:text-sm"
                    >
                      <Heart className="w-3 h-3 lg:w-5 lg:h-5 mr-1 lg:mr-2" />
                      <span className="hidden lg:inline">Favorite</span>
                      <span className="lg:hidden">♥</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-white/10 border-white/30 text-white hover:bg-white/20 px-3 lg:px-6 py-2 text-xs lg:text-sm"
                    >
                      <Share2 className="w-3 h-3 lg:w-5 lg:h-5 mr-1 lg:mr-2" />
                      <span className="hidden lg:inline">Share</span>
                      <span className="lg:hidden">↗</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="px-4 lg:px-10 py-6 lg:py-8 animate-slide-in-left">
              <Tabs defaultValue="summary" className="space-y-6 lg:space-y-8">
                <TabsList className="flex w-full bg-white shadow-professional-sm p-3 rounded-xl gap-1 mx-0">
                  <TabsTrigger
                    value="summary"
                    className="data-[state=active]:bg-primary data-[state=active]:text-white px-2 py-3 text-xs md:text-sm transition-professional hover-scale flex-1 text-center"
                  >
                    <span className="hidden lg:inline">Summary</span>
                    <span className="lg:hidden">Summary</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="photos"
                    className="data-[state=active]:bg-primary data-[state=active]:text-white px-2 py-3 text-xs md:text-sm transition-professional hover-scale flex-1 text-center"
                  >
                    <span className="hidden lg:inline">
                      Photos ({talent.photos.length})
                    </span>
                    <span className="lg:hidden">Photos</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="videos"
                    className="data-[state=active]:bg-primary data-[state=active]:text-white px-2 py-3 text-xs md:text-sm transition-professional hover-scale flex-1 text-center"
                  >
                    <span className="hidden lg:inline">
                      Videos ({talent.videos.length})
                    </span>
                    <span className="lg:hidden">Videos</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="skills"
                    className="data-[state=active]:bg-primary data-[state=active]:text-white px-2 py-3 text-xs md:text-sm transition-professional hover-scale flex-1 text-center"
                  >
                    <span className="hidden lg:inline">
                      Skills ({talent.skills.length})
                    </span>
                    <span className="lg:hidden">Skills</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="summary" className="space-y-6 lg:space-y-8">
                  {/* Contact Information */}
                  <div className="bg-white rounded-xl p-3 lg:p-8 shadow-sm border border-slate-200">
                    <h3 className="text-base lg:text-xl font-semibold text-slate-900 mb-2 lg:mb-4 flex items-center">
                      <MessageCircle className="w-4 h-4 lg:w-6 lg:h-6 mr-2 lg:mr-3 text-blue-500" />
                      Contact Information
                    </h3>
                    <div className="grid grid-cols-1 gap-3 sm:gap-4">
                      <div className="flex items-center gap-3 p-2 lg:p-4 bg-slate-50 rounded-lg border border-slate-200">
                        <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600" />
                        <span className="text-xs sm:text-sm font-medium text-slate-800">
                          +55 (11) 99999-9999
                        </span>
                      </div>
                      <div className="flex items-center gap-3 p-2 lg:p-4 bg-slate-50 rounded-lg border border-slate-200">
                        <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600" />
                        <span className="text-xs sm:text-sm font-medium text-slate-800">
                          {talent.name.toLowerCase().replace(" ", ".")}
                          @email.com
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Physical Details */}
                  <div className="bg-white rounded-xl p-3 lg:p-8 shadow-sm border border-slate-200">
                    <h3 className="text-base lg:text-xl font-semibold text-slate-900 mb-2 lg:mb-4 flex items-center">
                      <User className="w-4 h-4 lg:w-6 lg:h-6 mr-2 lg:mr-3 text-blue-500" />
                      Physical Characteristics
                    </h3>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-4">
                      <div className="text-center p-2 lg:p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                        <Ruler className="w-4 h-4 lg:w-6 lg:h-6 text-blue-600 mx-auto mb-1 lg:mb-2" />
                        <div className="text-sm lg:text-xl font-bold text-slate-900">
                          {talent.details.heightCm}cm
                        </div>
                        <div className="text-xs lg:text-sm font-medium text-slate-700 mt-1">
                          Height
                        </div>
                      </div>
                      <div className="text-center p-2 lg:p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200">
                        <Weight className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 mx-auto mb-1 sm:mb-2" />
                        <div className="text-sm lg:text-xl font-bold text-slate-900">
                          {talent.details.weightKg}kg
                        </div>
                        <div className="text-xs lg:text-sm font-medium text-slate-700 mt-1">
                          Weight
                        </div>
                      </div>
                      <div className="text-center p-2 lg:p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border border-purple-200">
                        <Eye className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 mx-auto mb-1 sm:mb-2" />
                        <div className="text-sm lg:text-xl font-bold text-slate-900">
                          {talent.details.eyeColor}
                        </div>
                        <div className="text-xs lg:text-sm font-medium text-slate-700 mt-1">
                          Eyes
                        </div>
                      </div>
                      <div className="text-center p-2 lg:p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg border border-orange-200">
                        <User className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600 mx-auto mb-1 sm:mb-2" />
                        <div className="text-sm lg:text-xl font-bold text-slate-900">
                          {talent.details.hairColor}
                        </div>
                        <div className="text-xs lg:text-sm font-medium text-slate-700 mt-1">
                          Hair
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bio */}
                  <div className="bg-white rounded-xl p-3 lg:p-8 shadow-sm border border-slate-200">
                    <h3 className="text-base lg:text-xl font-semibold text-slate-900 mb-2 lg:mb-4 flex items-center">
                      <Star className="w-4 h-4 lg:w-6 lg:h-6 mr-2 lg:mr-3 text-blue-500" />
                      Biography
                    </h3>
                    <p className="text-slate-800 leading-relaxed text-sm sm:text-base">
                      {talent.details.bio}
                    </p>
                  </div>

                  {/* Location */}
                  <div className="bg-white rounded-xl p-3 lg:p-8 shadow-sm border border-slate-200">
                    <h3 className="text-base lg:text-xl font-semibold text-slate-900 mb-2 lg:mb-4 flex items-center">
                      <MapPin className="w-4 h-4 lg:w-6 lg:h-6 mr-2 lg:mr-3 text-blue-500" />
                      Location
                    </h3>
                    <div className="flex items-center gap-3 p-2 lg:p-4 bg-slate-50 rounded-lg border border-slate-200">
                      <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600" />
                      <span className="text-slate-800 font-medium text-sm sm:text-base">
                        {talent.city}, {talent.state}
                      </span>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="photos" className="space-y-6 lg:space-y-8">
                  <div className="bg-white rounded-xl p-3 lg:p-8 shadow-sm border border-slate-200">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 gap-2 sm:gap-0">
                      <h3 className="text-base sm:text-lg font-semibold text-slate-900">
                        Photo Gallery
                      </h3>
                      <Button
                        variant="outline"
                        size="sm"
                        className="px-3 sm:px-4 py-2 text-xs sm:text-sm"
                      >
                        <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                        <span className="hidden lg:inline">Download All</span>
                        <span className="lg:hidden">Download</span>
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-4">
                      {talent.photos.map((photo, index) => (
                        <div
                          key={`${talent.id}-photo-${index}`}
                          className="relative aspect-square group cursor-pointer"
                        >
                          {!imageLoadedStates[`photo-${index}`] &&
                            !imageErrorStates[`photo-${index}`] && (
                              <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200 animate-pulse rounded-lg flex items-center justify-center">
                                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-slate-300 rounded-full animate-pulse"></div>
                              </div>
                            )}
                          {imageErrorStates[`photo-${index}`] ? (
                            <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center rounded-lg">
                              <div className="text-lg sm:text-2xl font-bold text-slate-500">
                                {talent.name.charAt(0)}
                              </div>
                            </div>
                          ) : (
                            <Image
                              src={photo}
                              alt={`${talent.name} - Photo ${index + 1}`}
                              fill
                              className={`object-cover rounded-lg transition-all duration-500 group-hover:scale-105 ${
                                imageLoadedStates[`photo-${index}`]
                                  ? "opacity-100"
                                  : "opacity-0"
                              }`}
                              sizes="(max-width: 768px) 50vw, 33vw"
                              loading="lazy"
                              onLoad={() => handleImageLoad(`photo-${index}`)}
                              onError={() => handleImageError(`photo-${index}`)}
                            />
                          )}
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100">
                            <Button
                              variant="secondary"
                              size="sm"
                              className="bg-white/90 text-slate-900"
                            >
                              <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="videos" className="space-y-6 lg:space-y-8">
                  <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
                    <h3 className="text-lg font-semibold text-slate-900 mb-3">
                      Demonstration Videos
                    </h3>
                    <div className="space-y-6">
                      {talent.videos.map((video, index) => (
                        <div
                          key={`${talent.id}-video-${index}`}
                          className="space-y-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200"
                        >
                          <h4 className="font-semibold text-slate-900 flex items-center">
                            <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
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

                <TabsContent value="skills" className="space-y-6 lg:space-y-8">
                  {/* Professional Categories */}
                  <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
                    <h3 className="text-lg font-semibold text-slate-900 mb-3">
                      Professional Categories
                    </h3>
                    <div className="flex items-center gap-3 flex-wrap">
                      {talent.skillTags.map((tag) => (
                        <SkillTag key={`${talent.id}-tag-${tag}`} type={tag} size="md" showDescription={true} />
                      ))}
                    </div>
                    <div className="mt-3 text-sm text-gray-600">
                      <p><strong>F</strong> = Fotografia • <strong>E</strong> = Eventos • <strong>O</strong> = Online • <strong>R</strong> = Rádio/TV</p>
                    </div>
                  </div>

                  {/* Specialties and Skills */}
                  <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
                    <h3 className="text-lg font-semibold text-slate-900 mb-3">
                      Specialties and Skills
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {talent.skills.map((skill, index) => (
                        <div
                          key={`${talent.id}-skill-${index}`}
                          className="p-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg text-center transition-all duration-200 hover:scale-105 hover:shadow-lg"
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
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
});

export default TalentDetailSheet;
