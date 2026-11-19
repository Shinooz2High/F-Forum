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

export const MenuBar = ({ onOpenSpotlight, onTogglePinnedChat, isChatActive }) => {
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
    { to: '/templates', label: 'Templates', icon: Layers },
    { to: '/workspace', label: 'Workspace', icon: Sparkles },
    { to: '/projects', label: 'Dự án', icon: FolderGit2 },
    { to: '/knowledge', label: 'Tri thức', icon: BookOpen },
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 h-14 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10 select-none px-6 lg:px-10 flex items-center justify-between text-xs">
        {/* Left: Brand Logo & Minimal Nav */}
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2.5 group cursor-pointer">
            <img
              src="/assets/ff-logo.svg"
              alt="F-Forum Logo"
              className="w-6 h-6 object-contain group-hover:opacity-80 transition-opacity"
            />
            <span className="font-sans font-bold text-base tracking-tight text-foreground">
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
                  className={`px-2.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                    active
                      ? 'bg-white/10 text-foreground font-semibold'
                      : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                  }`}
                >
                  <link.icon className="w-3.5 h-3.5 opacity-75" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right: Quick Tools, Spotlight Search, Chat Studio Toggle, Clock, Avatar */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Spotlight Search trigger */}
          <button
            onClick={onOpenSpotlight}
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-foreground border border-white/10 transition-all cursor-pointer group"
            title="Tìm kiếm nhanh (Cmd + K)"
          >
            <Search className="w-3.5 h-3.5 text-muted-foreground group-hover:text-foreground transition-colors" />
            <span className="hidden sm:inline text-[11px]">Tìm kiếm...</span>
            <kbd className="hidden md:inline-block px-1.5 py-0.2 text-[9px] font-mono rounded bg-white/10 text-muted-foreground border border-white/10">
              ⌘K
            </kbd>
          </button>

          {/* Pinned Chat Studio Toggle */}
          <button
            onClick={onTogglePinnedChat}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              isChatActive
                ? 'bg-foreground text-background font-semibold shadow-sm'
                : 'liquid-glass text-foreground hover:bg-white/[0.06]'
            }`}
            title="Mở hoặc ghim cửa sổ Chat AI & Workspace (Cmd + J)"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="font-medium text-[11px]">Chat Studio</span>
            <kbd className={`hidden md:inline-block px-1 text-[9px] font-mono rounded border ${
              isChatActive ? 'bg-black/15 text-black border-black/20' : 'bg-white/10 text-muted-foreground border-white/10'
            }`}>
              ⌘J
            </kbd>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-lg hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            title={`Chuyển sang chế độ ${theme === 'dark' ? 'Sáng' : 'Tối'}`}
          >
            {theme === 'dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
          </button>

          {/* Notifications */}
          <button 
            className="relative p-1.5 rounded-lg hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            title="Thông báo"
          >
            <Bell className="w-3.5 h-3.5" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-foreground rounded-full" />
          </button>

          {/* Clock */}
          <div className="hidden sm:block font-mono text-[11px] text-muted-foreground pl-2 border-l border-white/10">
            {currentTime || '12:00'}
          </div>

          {/* Profile link */}
          <Link to="/profile" className="ml-1 flex items-center gap-1.5 hover:opacity-85 transition-opacity">
            <Avatar name="Minh Dang" size="sm" />
          </Link>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 rounded-lg hover:bg-white/10 text-muted-foreground hover:text-foreground"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-14 z-40 lg:hidden bg-black/95 backdrop-blur-2xl p-6 flex flex-col justify-between animate-fadeIn">
          <div className="space-y-2">
            <p className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider mb-4">
              Điều hướng F-Forum
            </p>
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all ${
                  isActive(link.to)
                    ? 'bg-foreground text-background font-semibold'
                    : 'text-neutral-200 hover:bg-white/10'
                }`}
              >
                <link.icon className="w-4 h-4" />
                <span>{link.label}</span>
              </Link>
            ))}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onTogglePinnedChat();
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm liquid-glass text-foreground font-semibold mt-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Mở AI Chat Studio (Gộp Workspace)</span>
            </button>
          </div>

          <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs text-muted-foreground">
            <span>F-FORUM © 2026</span>
            <button 
              onClick={toggleTheme}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 text-foreground"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              <span>Chế độ {theme === 'dark' ? 'Sáng' : 'Tối'}</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};
