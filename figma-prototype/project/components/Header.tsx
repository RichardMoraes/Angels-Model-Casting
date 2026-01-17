import React from 'react';
import { Search, Bell, Settings, User } from 'lucide-react';
import { Badge } from './Badge';

export function Header() {
  return (
    <header className="h-[86px] bg-white/80 backdrop-blur-xl border-b border-gray-200/50 px-8 flex items-center justify-between sticky top-0 z-40 shadow-sm">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 bg-gradient-to-br from-[#4B1B6F] to-[#7B3FF2] rounded-xl flex items-center justify-center text-white shadow-lg">
          V
        </div>
        <div>
          <span className="text-[#4B1B6F] block">Angels Model Casting</span>
          <span className="text-gray-500 text-xs">Management</span>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex items-center gap-8">
        <a href="#" className="text-gray-700 hover:text-[#4B1B6F] transition-colors relative group">
          Talentos
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#4B1B6F] group-hover:w-full transition-all duration-300" />
        </a>
        <a href="#" className="text-gray-700 hover:text-[#4B1B6F] transition-colors relative group">
          Castings
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#4B1B6F] group-hover:w-full transition-all duration-300" />
        </a>
        <a href="#" className="text-gray-700 hover:text-[#4B1B6F] transition-colors relative group">
          Seleções
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#4B1B6F] group-hover:w-full transition-all duration-300" />
        </a>
        <a href="#" className="text-gray-700 hover:text-[#4B1B6F] transition-colors relative group">
          Agendamentos
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#4B1B6F] group-hover:w-full transition-all duration-300" />
        </a>
        <a href="#" className="text-gray-700 hover:text-[#4B1B6F] transition-colors relative group">
          Diretores
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#4B1B6F] group-hover:w-full transition-all duration-300" />
        </a>
      </nav>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Icons */}
        <button className="p-2.5 hover:bg-gray-100 rounded-xl transition-all duration-300" title="Buscar">
          <Search className="w-5 h-5 text-gray-700" />
        </button>
        
        <button className="p-2.5 hover:bg-gray-100 rounded-xl transition-all duration-300 relative" title="Notificações">
          <Bell className="w-5 h-5 text-gray-700" />
          <Badge variant="count" className="absolute -top-1 -right-1">3</Badge>
        </button>

        {/* Profile */}
        <div className="flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-[#4B1B6F]/10 to-[#7B3FF2]/10 rounded-xl hover:from-[#4B1B6F]/20 hover:to-[#7B3FF2]/20 transition-all duration-300 cursor-pointer group">
          <div className="w-9 h-9 bg-gradient-to-br from-[#4B1B6F] to-[#7B3FF2] rounded-full flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform">
            <User className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-[#4B1B6F]">Ricardo</span>
            <span className="text-xs text-gray-500">Diretor de Casting</span>
          </div>
        </div>

        <button className="p-2.5 hover:bg-gray-100 rounded-xl transition-all duration-300" title="Configurações">
          <Settings className="w-5 h-5 text-gray-700" />
        </button>
      </div>
    </header>
  );
}