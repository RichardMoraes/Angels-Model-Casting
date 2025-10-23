"use client";

import { useState } from "react";
import { Bell, Settings, User, ChevronDown, Search } from "lucide-react";

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
 * Main application header component
 * Features navigation, user menu, notifications, and system status
 */
export default function Header({ totalTalents, filteredTalents }: HeaderProps) {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isStatsMenuOpen, setIsStatsMenuOpen] = useState(false);

  return (
    <header className="bg-corporate-gradient shadow-xl border-b border-white/20 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30 shadow-professional-sm hover-scale transition-professional">
                <span className="text-white font-bold text-lg">V</span>
              </div>
              <h1 className="text-h3 font-bold text-white tracking-tight">
                Talent Showcase
              </h1>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <div className="relative">
              <button
                onClick={() => setIsStatsMenuOpen(!isStatsMenuOpen)}
                className="flex items-center space-x-1 text-white hover:text-primary-200 transition-professional hover-scale"
              >
                <span>Statistics</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              {isStatsMenuOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-professional border border-gray-200 py-2 z-50 animate-fade-in">
                  <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-professional">
                    Overview
                  </button>
                  <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-professional">
                    Active Talents
                  </button>
                  <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-professional">
                    Reports
                  </button>
                </div>
              )}
            </div>

            <button className="text-white hover:text-primary-200 transition-professional hover-scale">
              Jobs
            </button>
            <button className="text-white hover:text-primary-200 transition-professional hover-scale">
              Selections
            </button>
            <button className="text-white hover:text-primary-200 transition-professional hover-scale">
              Registration
            </button>
            <button className="text-white hover:text-primary-200 transition-professional hover-scale">
              Directors
            </button>
          </nav>

          {/* Right Side Controls */}
          <div className="flex items-center space-x-4">
            {/* Search Icon */}
            <button className="p-2 text-white hover:text-primary-200 transition-professional hover-scale">
              <Search className="w-5 h-5" />
            </button>

            {/* Notifications */}
            <button className="relative p-2 text-white hover:text-primary-200 hover-scale transition-professional">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full text-xs flex items-center justify-center text-white animate-pulse-glow">
                3
              </span>
            </button>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-2 text-white hover:text-primary-200 hover-scale transition-professional"
              >
                <div className="w-8 h-8 bg-corporate-gradient-secondary rounded-full flex items-center justify-center hover-glow transition-professional">
                  <User className="w-4 h-4 text-white" />
                </div>
                <span className="hidden sm:block font-medium">RICH</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {isUserMenuOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-professional border border-gray-200 py-2 z-50 animate-fade-in">
                  <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-professional">
                    My Profile
                  </button>
                  <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-professional">
                    Settings
                  </button>
                  <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-professional">
                    Product...
                  </button>
                  <hr className="my-2" />
                  <button className="block w-full text-left px-4 py-2 text-sm text-destructive hover:bg-red-50 transition-professional">
                    Sign Out
                  </button>
                </div>
              )}
            </div>

            {/* Settings */}
            <button className="p-2 text-white hover:text-primary-200 transition-professional hover-scale">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Status Bar */}
        <div className="flex items-center justify-between py-2 border-t border-white/20">
          <div className="flex items-center space-x-4 text-sm text-white/80">
            <span className="font-medium">
              {filteredTalents.toLocaleString()} talents found
            </span>
            <span className="text-white/60">
              of {totalTalents.toLocaleString()} total
            </span>
          </div>

          <div className="flex items-center space-x-2 text-sm text-white/80">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span>System Online</span>
          </div>
        </div>
      </div>
    </header>
  );
}
