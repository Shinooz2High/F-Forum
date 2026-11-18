import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { MenuBar } from '../components/macos/MenuBar';
import { Dock } from '../components/macos/Dock';
import { SpotlightSearch } from '../components/macos/SpotlightSearch';
import { PinnedChatUI } from '../components/macos/PinnedChatUI';

export const AppLayout = () => {
  const [spotlightOpen, setSpotlightOpen] = useState(false);
  const [pinnedChatOpen, setPinnedChatOpen] = useState(false);
  const [isPinned, setIsPinned] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Cmd + K or Ctrl + K for Spotlight
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSpotlightOpen(prev => !prev);
      }
      // Cmd + J or Ctrl + J for Pinned Chat
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'j') {
        e.preventDefault();
        setPinnedChatOpen(prev => !prev);
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
      <MenuBar 
        onOpenSpotlight={() => setSpotlightOpen(true)}
        onTogglePinnedChat={() => setPinnedChatOpen(prev => !prev)}
        isChatActive={pinnedChatOpen}
      />

      {/* Main Viewport Area (Adjusts with Pinned Chat margin if pinned on large screens) */}
      <main 
        className={`flex-1 pt-14 pb-24 px-4 sm:px-6 max-w-7xl w-full mx-auto relative z-10 transition-all duration-300 ${
          pinnedChatOpen && isPinned ? 'lg:mr-[430px]' : ''
        }`}
      >
        <Outlet />
      </main>

      {/* macOS Bottom Dock */}
      <Dock onOpenChat={() => setPinnedChatOpen(true)} />

      {/* Pinned & Integrated Chat UI (Chat + Project + Workspace + History) */}
      <PinnedChatUI 
        isOpen={pinnedChatOpen}
        onClose={() => setPinnedChatOpen(false)}
        isPinned={isPinned}
        onTogglePin={() => setIsPinned(prev => !prev)}
      />

      {/* Spotlight Search Modal */}
      <SpotlightSearch 
        isOpen={spotlightOpen} 
        onClose={() => setSpotlightOpen(false)} 
      />
    </div>
  );
};
