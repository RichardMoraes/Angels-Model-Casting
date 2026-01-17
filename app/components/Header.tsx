"use client";

import { useState, useEffect } from "react";
import { Bell, Settings, User, Search, ChevronUp, Menu } from "lucide-react";

/**
 * Navigation item configuration for CMS integration
 */
interface NavItem {
  id: string;
  label: string;
  href: string;
}

/**
 * Props for the Header component
 */
interface HeaderProps {
  /** Total number of talents in the system */
  readonly totalTalents: number;
  /** Number of talents matching current filters */
  readonly filteredTalents: number;
}

/**
 * Default navigation items - can be replaced with CMS data
 */
const defaultNavItems: NavItem[] = [
  { id: "talentos", label: "Talentos", href: "#" },
  { id: "castings", label: "Castings", href: "#" },
  { id: "selecoes", label: "Seleções", href: "#" },
  { id: "agendamentos", label: "Agendamentos", href: "#" },
  { id: "diretores", label: "Diretores", href: "#" },
];

/**
 * Default user data - can be replaced with CMS/Auth data
 */
const defaultUser = {
  name: "Ricardo",
  role: "Diretor de Casting",
};

/**
 * Default brand data - can be replaced with CMS data
 */
const defaultBrand = {
  title: "Angels Model Casting",
  subtitle: "Management",
};

/**
 * Main application header component
 * Features navigation, user menu, notifications
 */
export default function Header({ totalTalents, filteredTalents }: HeaderProps) {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [notificationCount] = useState(3);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <header className="h-[72px] lg:h-[86px] bg-white/95 backdrop-blur-xl border-b border-gray-200/50 px-4 lg:px-8 flex items-center justify-between sticky top-0 z-40 shadow-sm">
        {/* Left Section: Logo & Talent Count */}
        <div className="flex items-center gap-3 lg:gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2 lg:gap-3">
            <div className="w-9 h-9 lg:w-11 lg:h-11 bg-gradient-to-br from-figma-primary to-figma-light rounded-xl flex items-center justify-center text-white shadow-lg font-bold">
              V
            </div>
            <div className="min-w-0">
              <span className="text-figma-primary font-semibold block text-sm lg:text-base whitespace-nowrap">
                {defaultBrand.title}
              </span>
              <span className="text-gray-500 text-xs hidden lg:block whitespace-nowrap">
                {defaultBrand.subtitle}
              </span>
            </div>
          </div>

          {/* Talent Counter */}
          <div className="flex items-center gap-1 lg:gap-2 px-2 lg:px-3 py-1 lg:py-1.5 bg-figma-primary/5 rounded-lg border border-figma-primary/10">
            <span className="text-figma-primary font-semibold text-xs lg:text-sm">
              {filteredTalents.toLocaleString()}
            </span>
            <span className="text-gray-500 text-xs hidden md:inline">
              / {totalTalents.toLocaleString()} talentos
            </span>
          </div>
        </div>

        {/* Center: Navigation - Desktop */}
        <nav className="hidden lg:flex items-center gap-4 xl:gap-6">
          {defaultNavItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className="text-gray-700 hover:text-figma-primary transition-colors duration-200 relative group whitespace-nowrap"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-figma-primary group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-2 lg:gap-3">
          {/* Search - Desktop only */}
          <button
            className="hidden lg:flex p-2.5 hover:bg-gray-100 rounded-xl transition-all duration-300"
            title="Buscar"
          >
            <Search className="w-5 h-5 text-gray-700" />
          </button>

          {/* Notifications */}
          <button
            className="p-2 hover:bg-gray-100 rounded-xl transition-all duration-300 relative"
            title="Notificações"
          >
            <Bell className="w-5 h-5 text-gray-700" />
            {notificationCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {notificationCount}
              </span>
            )}
          </button>

          {/* User Profile */}
          <button
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className="flex items-center gap-2 lg:gap-3 px-2 lg:px-3 py-1.5 lg:py-2 hover:bg-gray-100 rounded-xl transition-all duration-300 relative"
          >
            <div className="w-8 h-8 lg:w-9 lg:h-9 rounded-full bg-gradient-to-br from-figma-primary to-figma-light flex items-center justify-center text-white">
              <User className="w-4 h-4" />
            </div>
            <div className="hidden xl:flex flex-col text-left min-w-0">
              <span className="text-figma-primary font-medium text-sm whitespace-nowrap">
                {defaultUser.name}
              </span>
              <span className="text-xs text-gray-500 whitespace-nowrap">
                {defaultUser.role}
              </span>
            </div>
          </button>

          {/* User Dropdown Menu */}
          {isUserMenuOpen && (
            <div className="absolute top-full right-4 lg:right-8 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50 animate-fade-in">
              <button className="block w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                Meu Perfil
              </button>
              <button className="block w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                Configurações
              </button>
              <hr className="my-2 border-gray-200" />
              <button className="block w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200">
                Sair
              </button>
            </div>
          )}

          {/* Settings - Desktop only */}
          <button
            className="hidden lg:flex p-2.5 hover:bg-gray-100 rounded-xl transition-all duration-300"
            title="Configurações"
          >
            <Settings className="w-5 h-5 text-gray-700" />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 hover:bg-gray-100 rounded-xl transition-all duration-300"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            title="Menu"
          >
            <Menu className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </header>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-gray-200 shadow-lg z-30">
          <nav className="px-4 py-3 space-y-1">
            {defaultNavItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className="block px-4 py-3 text-gray-700 hover:bg-figma-primary/5 hover:text-figma-primary rounded-xl transition-colors duration-200"
              >
                {item.label}
              </a>
            ))}
            <hr className="my-2 border-gray-200" />
            <button className="flex items-center gap-3 w-full px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-xl transition-colors duration-200">
              <Search className="w-5 h-5" />
              Buscar
            </button>
            <button className="flex items-center gap-3 w-full px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-xl transition-colors duration-200">
              <Settings className="w-5 h-5" />
              Configurações
            </button>
          </nav>
        </div>
      )}

      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <button
          type="button"
          className="lg:hidden fixed inset-0 bg-black/20 z-20 cursor-default"
          onClick={() => setIsMobileMenuOpen(false)}
          onKeyDown={(e) => e.key === "Escape" && setIsMobileMenuOpen(false)}
          style={{ top: "72px" }}
          aria-label="Fechar menu"
        />
      )}

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 w-12 h-12 bg-gradient-to-br from-figma-primary to-figma-light text-white rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 flex items-center justify-center z-50"
          title="Voltar ao topo"
        >
          <ChevronUp className="w-6 h-6" />
        </button>
      )}
    </>
  );
}
