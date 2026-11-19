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

export const Dock = ({ onOpenChat }) => {
  const location = useLocation();
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const dockItems = [
    { to: '/home', label: 'Bàn làm việc', icon: Home },
    { to: '/explore', label: 'Khám phá ý tưởng', icon: Compass },
    { to: '/templates', label: 'Mẫu dự án', icon: Layers },
    { 
      to: '/workspace', 
      label: 'AI Workspace Studio', 
      icon: Cpu, 
      special: true 
    },
    { to: '/projects', label: 'Dự án của tôi', icon: FolderKanban },
    { to: '/knowledge', label: 'Thư viện tri thức', icon: BookMarked },
    { separator: true },
    { 
      action: onOpenChat, 
      label: 'Ghim Chat UI & Dự Án (⌘J)', 
      icon: Sparkles, 
      isAction: true 
    },
    { to: '/quick-start', label: 'Tạo dự án nhanh (+)', icon: PlusCircle },
    { to: '/profile', label: 'Cài đặt hệ thống', icon: Settings },
  ];

  const isActive = (path) => {
    if (!path) return false;
    if (path === '/home' && location.pathname === '/home') return true;
    return location.pathname.startsWith(path);
  };

  return (
    <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-40 max-w-full px-2">
      <div className="liquid-glass bg-black/80 rounded-2xl px-3 py-2 flex items-end gap-1.5 sm:gap-2 select-none shadow-dock">
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
          const isNeighbor = Math.abs((hoveredIndex ?? -10) - index) === 1;

          let scale = 1;
          if (isHovered) scale = 1.24;
          else if (isNeighbor) scale = 1.1;

          const content = (
            <div
              className={`relative w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center transition-all duration-200 cursor-pointer border ${
                active
                  ? 'bg-foreground text-background border-foreground shadow-sm'
                  : item.special || item.isAction
                  ? 'bg-white/10 hover:bg-white/20 text-foreground border-white/25'
                  : 'bg-white/[0.04] hover:bg-white/15 text-neutral-300 group-hover:text-white border-white/10'
              }`}
            >
              <item.icon className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
          );

          return (
            <div
              key={item.label}
              className="relative flex flex-col items-center group"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Tooltip on hover */}
              <div 
                className={`absolute -top-10 px-2.5 py-1 rounded-lg text-[11px] font-medium bg-black/95 text-foreground border border-border shadow-lg pointer-events-none transition-all duration-150 whitespace-nowrap z-50 ${
                  isHovered ? 'opacity-100 -translate-y-1' : 'opacity-0 translate-y-1'
                }`}
              >
                {item.label}
              </div>

              {/* Dock Icon Link or Action Button */}
              {item.isAction ? (
                <button
                  type="button"
                  onClick={item.action}
                  style={{ transform: `scale(${scale}) translateY(${isHovered ? '-6px' : '0px'})` }}
                  className="outline-none"
                >
                  {content}
                </button>
              ) : (
                <Link
                  to={item.to}
                  style={{ transform: `scale(${scale}) translateY(${isHovered ? '-6px' : '0px'})` }}
                >
                  {content}
                </Link>
              )}

              {/* Monochrome Active Dot Indicator */}
              <div 
                className={`h-1 rounded-full mt-1 transition-all ${
                  active ? 'bg-foreground w-3' : 'bg-transparent w-1'
                }`} 
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
