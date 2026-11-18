import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Search, 
  Bell, 
  Sun, 
  Moon, 
  Menu, 
  X, 
  Sparkles, 
  FolderGit2, 
  LayoutDashboard, 
  Compass, 
  BookOpen, 
  Layers 
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { Avatar } from './UIElements';

export const MenuBar = ({ onOpenSpotlight }) => {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const [currentTime, setCurrentTime] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const navLinks = [
    { to: '/', label: 'Giới thiệu', icon: Sparkles },
    { to: '/home', label: 'Bàn làm việc', icon: LayoutDashboard },
    { to: '/explore', label: 'Khám phá', icon: Compass },
    { to: '/templates', label: 'Mẫu dự án', icon: Layers },
    { to: '/workspace', label: 'AI Workspace', icon: Sparkles, highlight: true },
    { to: '/projects', label: 'Dự án của tôi', icon: FolderGit2 },
    { to: '/knowledge', label: 'Thư viện tri thức', icon: BookOpen },
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 h-10 z-50 glass-panel border-b border-white/10 select-none px-4 flex items-center justify-between text-xs backdrop-blur-xl">
        {/* Left: Brand / Apple-style Logo & Menu */}
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2 group cursor-pointer">
            <div className="w-5 h-5 rounded-full bg-neutral-900 border border-ff-gold flex items-center justify-center shadow-sm shadow-ff-gold/30 group-hover:scale-105 transition-transform">
              <span className="font-serif font-bold text-ff-gold text-xs leading-none">F</span>
            </div>
            <span className="font-serif italic font-bold text-sm tracking-tight text-neutral-100 group-hover:text-ff-gold transition-colors">
              F-Forum
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 ml-2">
            {navLinks.map((link) => {
              const active = isActive(link.to);
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-2.5 py-1 rounded-md transition-all flex items-center gap-1.5 ${
                    active
                      ? 'bg-white/10 text-ff-gold-light font-semibold shadow-xs'
                      : 'text-neutral-300 hover:text-white hover:bg-white/5'
                  } ${link.highlight && !active ? 'text-amber-300/90' : ''}`}
                >
                  <link.icon className="w-3.5 h-3.5 opacity-70" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right: Quick Tools, Spotlight Search, Clock, Avatar */}
        <div className="flex items-center gap-3">
          {/* Spotlight Search trigger */}
          <button
            onClick={onOpenSpotlight}
            className="flex items-center gap-2 px-2.5 py-1 rounded-md bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white border border-white/5 transition-all cursor-pointer group"
            title="Tìm kiếm nhanh (Cmd + K)"
          >
            <Search className="w-3.5 h-3.5 text-neutral-400 group-hover:text-ff-gold transition-colors" />
            <span className="hidden sm:inline text-[11px] text-neutral-400">Tìm kiếm...</span>
            <kbd className="hidden md:inline-block px-1.5 py-0.2 text-[9px] font-mono rounded bg-white/10 text-neutral-400 border border-white/10">
              ⌘K
            </kbd>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-1 rounded-md hover:bg-white/10 text-neutral-300 hover:text-ff-gold transition-colors cursor-pointer"
            title={`Chuyển sang chế độ ${theme === 'dark' ? 'Sáng' : 'Tối'}`}
          >
            {theme === 'dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
          </button>

          {/* Notifications */}
          <button 
            className="relative p-1 rounded-md hover:bg-white/10 text-neutral-300 hover:text-white transition-colors cursor-pointer"
            title="Thông báo"
          >
            <Bell className="w-3.5 h-3.5" />
            <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-ff-gold rounded-full" />
          </button>

          {/* macOS Clock */}
          <div className="hidden sm:block font-mono text-[11px] text-neutral-300 pl-1 border-l border-white/10">
            {currentTime || '12:00'}
          </div>

          {/* Profile link */}
          <Link to="/profile" className="ml-1 flex items-center gap-1.5 hover:opacity-85 transition-opacity">
            <Avatar name="Minh Dang" size="sm" />
          </Link>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1 rounded-md hover:bg-white/10 text-neutral-300"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-10 z-40 lg:hidden bg-ff-deep/95 backdrop-blur-2xl p-6 flex flex-col justify-between animate-fadeIn">
          <div className="space-y-2">
            <p className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider mb-4">
              Điều hướng F-Forum
            </p>
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all ${
                  isActive(link.to)
                    ? 'bg-ff-gold text-black font-semibold'
                    : 'text-neutral-200 hover:bg-white/10'
                }`}
              >
                <link.icon className="w-4 h-4" />
                <span>{link.label}</span>
              </Link>
            ))}
          </div>

          <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs text-neutral-400">
            <span>F-FORUM © 2026</span>
            <button 
              onClick={toggleTheme}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-ff-gold" /> : <Moon className="w-4 h-4" />}
              <span>Chế độ {theme === 'dark' ? 'Sáng' : 'Tối'}</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};
