import React from 'react';

export const Window = ({ 
  title, 
  subtitle,
  children, 
  className = '', 
  headerRight,
  trafficLights = true,
  onClose,
  onMinimize,
  onMaximize,
  variant = 'default' 
}) => {
  return (
    <div className={`rounded-2xl overflow-hidden glass-panel shadow-macos-window transition-all duration-300 ${className}`}>
      {/* macOS Window Title Bar */}
      <div className="h-10 px-4 flex items-center justify-between border-b border-white/5 bg-white/[0.02] select-none backdrop-blur-md">
        {/* Left: Traffic Lights */}
        <div className="flex items-center gap-2 w-20">
          {trafficLights && (
            <>
              <button 
                onClick={onClose}
                aria-label="Close window"
                className="w-3 h-3 rounded-full bg-macos-close hover:brightness-110 active:brightness-90 transition-all flex items-center justify-center group"
              >
                <span className="opacity-0 group-hover:opacity-100 text-[8px] text-black/60 font-bold leading-none">×</span>
              </button>
              <button 
                onClick={onMinimize}
                aria-label="Minimize window"
                className="w-3 h-3 rounded-full bg-macos-minimize hover:brightness-110 active:brightness-90 transition-all flex items-center justify-center group"
              >
                <span className="opacity-0 group-hover:opacity-100 text-[8px] text-black/60 font-bold leading-none">−</span>
              </button>
              <button 
                onClick={onMaximize}
                aria-label="Maximize window"
                className="w-3 h-3 rounded-full bg-macos-maximize hover:brightness-110 active:brightness-90 transition-all flex items-center justify-center group"
              >
                <span className="opacity-0 group-hover:opacity-100 text-[6px] text-black/60 font-bold leading-none">⤢</span>
              </button>
            </>
          )}
        </div>

        {/* Center: Window Title */}
        <div className="flex-1 text-center truncate px-2">
          <span className="text-xs font-medium text-neutral-300 font-sans tracking-wide">
            {title}
          </span>
          {subtitle && (
            <span className="text-[10px] text-neutral-500 ml-2 font-mono">
              ({subtitle})
            </span>
          )}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center justify-end gap-2 min-w-20">
          {headerRight}
        </div>
      </div>

      {/* Window Body */}
      <div className="relative">
        {children}
      </div>
    </div>
  );
};
