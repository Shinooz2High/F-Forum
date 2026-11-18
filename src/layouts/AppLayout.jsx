import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { MenuBar } from '../components/macos/MenuBar';
import { Dock } from '../components/macos/Dock';
import { SpotlightSearch } from '../components/macos/SpotlightSearch';

export const AppLayout = () => {
  const [spotlightOpen, setSpotlightOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSpotlightOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-ff-deep text-neutral-100 flex flex-col relative overflow-x-hidden">
      {/* Ambient background decoration */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-ff-gold/5 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[120px]" />
        <div className="absolute inset-0 grid-matrix opacity-40" />
      </div>

      {/* macOS Top Menu Bar */}
      <MenuBar onOpenSpotlight={() => setSpotlightOpen(true)} />

      {/* Main Viewport Area (Offset for MenuBar and Dock) */}
      <main className="flex-1 pt-14 pb-24 px-4 sm:px-6 max-w-7xl w-full mx-auto relative z-10">
        <Outlet />
      </main>

      {/* macOS Bottom Dock */}
      <Dock />

      {/* Spotlight Search Modal */}
      <SpotlightSearch 
        isOpen={spotlightOpen} 
        onClose={() => setSpotlightOpen(false)} 
      />
    </div>
  );
};
