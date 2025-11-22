"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

interface CustomSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

/**
 * Custom sidebar component with smooth animations
 * Not based on Dialog to avoid DOM removal issues
 */
export const CustomSidebar = ({
  isOpen,
  onClose,
  children,
}: CustomSidebarProps) => {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      document.body.style.overflow = "hidden";
    } else {
      const timeoutId = setTimeout(() => {
        setShouldRender(false);
        document.body.style.overflow = "unset";
      }, 300);
      return () => clearTimeout(timeoutId);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!shouldRender) {
    return null;
  }

  // Determine animation class based on isOpen
  const animationClass = isOpen ? "animate-in" : "animate-out";

  return (
    <>
      {/* Overlay */}
      <button
        className={`overlay fixed inset-0 bg-gradient-to-r from-black/30 via-black/20 to-transparent backdrop-blur-sm z-40 ${
          animationClass === "animate-in"
            ? "overlay-animate-in"
            : "overlay-animate-out"
        }`}
        onClick={onClose}
        aria-label="Close sidebar"
        type="button"
      />

      {/* Sidebar */}
      <div
        className={`custom-sidebar fixed right-0 top-0 h-screen w-full sm:w-[70vw] md:w-[65vw] lg:w-[60vw] xl:w-[55vw] 2xl:w-[50vw] bg-gray-50 z-50 overflow-y-auto ${
          animationClass === "animate-in"
            ? "sidebar-animate-in"
            : "sidebar-animate-out"
        }`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all duration-200 hover:scale-110"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Content */}
        <div className="p-0">{children}</div>
      </div>
    </>
  );
};
