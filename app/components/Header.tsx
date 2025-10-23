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
    <header className="bg-gradient-to-r from-purple-900 via-purple-800 to-purple-900 shadow-xl border-b border-white/20 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30 shadow-md">
                <span className="text-white font-bold text-lg">V</span>
              </div>
              <h1 className="text-2xl font-bold text-white tracking-tight">
                Talent Showcase
              </h1>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <div className="relative">
              <button
                onClick={() => setIsStatsMenuOpen(!isStatsMenuOpen)}
                className="flex items-center space-x-1 text-white hover:text-blue-300 transition-colors duration-200"
              >
                <span>Statistics</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              {isStatsMenuOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 py-2 z-50">
                  <button className="block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">
                    Overview
                  </button>
                  <button className="block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">
                    Active Talents
                  </button>
                  <button className="block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">
                    Reports
                  </button>
                </div>
              )}
            </div>

            <button className="text-white hover:text-blue-300 transition-colors duration-200">
              Jobs
            </button>
            <button className="text-white hover:text-blue-300 transition-colors duration-200">
              Selections
            </button>
            <button className="text-white hover:text-blue-300 transition-colors duration-200">
              Registration
            </button>
            <button className="text-white hover:text-blue-300 transition-colors duration-200">
              Directors
            </button>
          </nav>

          {/* Right Side Controls */}
          <div className="flex items-center space-x-4">
            {/* Search Icon */}
            <button className="p-2 text-white hover:text-blue-300 transition-colors duration-200">
              <Search className="w-5 h-5" />
            </button>

            {/* Notifications */}
            <button className="relative p-2 text-white hover:text-blue-300 hover-scale transition-all duration-200">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs flex items-center justify-center text-white pulse-glow">
                3
              </span>
            </button>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-2 text-white hover:text-blue-300 hover-scale transition-all duration-200"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center hover-glow">
                  <User className="w-4 h-4 text-white" />
                </div>
                <span className="hidden sm:block font-medium">RICH</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {isUserMenuOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 py-2 z-50">
                  <button className="block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">
                    My Profile
                  </button>
                  <button className="block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">
                    Settings
                  </button>
                  <button className="block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">
                    Product...
                  </button>
                  <hr className="my-2" />
                  <button className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                    Sign Out
                  </button>
                </div>
              )}
            </div>

            {/* Settings */}
            <button className="p-2 text-white hover:text-blue-300 transition-colors duration-200">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Status Bar */}
        <div className="flex items-center justify-between py-2 border-t border-purple-800/30">
          <div className="flex items-center space-x-4 text-sm text-purple-200">
            <span className="font-medium">
              {filteredTalents.toLocaleString()} talents found
            </span>
            <span className="text-purple-300">
              of {totalTalents.toLocaleString()} total
            </span>
          </div>

          <div className="flex items-center space-x-2 text-sm text-purple-200">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span>System Online</span>
          </div>
        </div>
      </div>
    </header>
  );
}
