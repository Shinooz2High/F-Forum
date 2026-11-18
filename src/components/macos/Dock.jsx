import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Compass, 
  Layers, 
  Cpu, 
  FolderKanban, 
  BookMarked, 
  PlusCircle, 
  Settings,
  Sparkles
} from 'lucide-react';

export const Dock = () => {
  const location = useLocation();
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const dockItems = [
    { to: '/home', label: 'Bàn làm việc', icon: Home, color: 'text-blue-400' },
    { to: '/explore', label: 'Khám phá ý tưởng', icon: Compass, color: 'text-emerald-400' },
    { to: '/templates', label: 'Mẫu dự án', icon: Layers, color: 'text-purple-400' },
    { 
      to: '/workspace', 
      label: 'AI Workspace Studio', 
      icon: Cpu, 
      color: 'text-amber-400', 
      special: true 
    },
    { to: '/projects', label: 'Dự án của tôi', icon: FolderKanban, color: 'text-amber-500' },
    { to: '/knowledge', label: 'Thư viện tri thức', icon: BookMarked, color: 'text-cyan-400' },
    { separator: true },
    { to: '/quick-start', label: 'Tạo dự án nhanh (+)', icon: PlusCircle, color: 'text-ff-rose' },
    { to: '/profile', label: 'Cài đặt hệ thống', icon: Settings, color: 'text-neutral-300' },
  ];

  const isActive = (path) => {
    if (!path) return false;
    if (path === '/home' && location.pathname === '/home') return true;
    return location.pathname.startsWith(path);
  };

  return (
    <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-40 max-w-full px-2">
      <div className="glass-dock rounded-2xl px-3 py-2 flex items-end gap-1.5 sm:gap-2 select-none shadow-2xl">
        {dockItems.map((item, index) => {
          if (item.separator) {
            return (
              <div 
                key={`sep-${index}`} 
                className="w-[1px] h-8 bg-white/15 my-auto mx-1" 
              />
            );
          }

          const active = isActive(item.to);
          const isHovered = hoveredIndex === index;
          const isNeighbor = Math.abs((hoveredIndex || -10) - index) === 1;

          // Scale factor calculation for fluid magnification
          let scale = 1;
          if (isHovered) scale = 1.28;
          else if (isNeighbor) scale = 1.12;

          return (
            <div
              key={item.to}
              className="relative flex flex-col items-center group"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Tooltip on hover */}
              <div 
                className={`absolute -top-10 px-2.5 py-1 rounded-lg text-[11px] font-medium bg-neutral-900/90 text-neutral-100 border border-white/10 shadow-lg pointer-events-none transition-all duration-150 whitespace-nowrap z-50 ${
                  isHovered ? 'opacity-100 -translate-y-1' : 'opacity-0 translate-y-1'
                }`}
              >
                {item.label}
              </div>

              {/* Dock Icon Button */}
              <Link
                to={item.to}
                style={{ transform: `scale(${scale}) translateY(${isHovered ? '-6px' : '0px'})` }}
                className={`relative w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center transition-all duration-200 cursor-pointer ${
                  item.special 
                    ? 'bg-gradient-to-br from-amber-500/20 to-ff-gold/30 border border-ff-gold/50 shadow-md shadow-ff-gold/20' 
                    : 'bg-white/5 hover:bg-white/15 border border-white/10'
                }`}
              >
                <item.icon className={`w-5 h-5 ${item.color}`} />
                {item.special && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-ff-gold rounded-full animate-ping opacity-75" />
                )}
              </Link>

              {/* Active Dot Indicator */}
              <div 
                className={`w-1 h-1 rounded-full mt-1 transition-all ${
                  active ? 'bg-ff-gold w-3 shadow-sm shadow-ff-gold' : 'bg-transparent'
                }`} 
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
