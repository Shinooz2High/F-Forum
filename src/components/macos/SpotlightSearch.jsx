import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Sparkles, 
  Layers, 
  BookOpen, 
  FolderGit2, 
  ArrowRight, 
  X,
  FileCode2
} from 'lucide-react';
import { mockTemplates } from '../../data/mockTemplates';
import { mockResources } from '../../data/mockResources';
import { mockProjects } from '../../data/mockProjects';

export const SpotlightSearch = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Combine searchable items
  const pages = [
    { title: 'Bàn làm việc (Home)', path: '/home', type: 'Trang hệ thống', icon: Sparkles },
    { title: 'Khám phá ý tưởng (Explore)', path: '/explore', type: 'Trang hệ thống', icon: Sparkles },
    { title: 'Thư viện mẫu (Templates)', path: '/templates', type: 'Trang hệ thống', icon: Layers },
    { title: 'AI Workspace Studio', path: '/workspace', type: 'Trang hệ thống', icon: FileCode2 },
    { title: 'Dự án của tôi (My Projects)', path: '/projects', type: 'Trang hệ thống', icon: FolderGit2 },
    { title: 'Thư viện tri thức (Source of Knowledge)', path: '/knowledge', type: 'Trang hệ thống', icon: BookOpen },
    { title: 'Tạo dự án nhanh (Quick Start Wizard)', path: '/quick-start', type: 'Công cụ', icon: Sparkles },
  ];

  const searchResults = [
    ...pages.map(p => ({ ...p, category: 'Điều hướng' })),
    ...mockTemplates.map(t => ({ 
      title: `${t.vietnameseTitle} (${t.title})`, 
      path: '/templates', 
      type: 'Template', 
      icon: Layers, 
      category: 'Mẫu dự án',
      subtitle: t.description 
    })),
    ...mockResources.map(r => ({ 
      title: r.name, 
      path: '/knowledge', 
      type: r.category, 
      icon: BookOpen, 
      category: 'Tài nguyên',
      subtitle: r.description 
    })),
    ...mockProjects.map(pr => ({ 
      title: pr.vietnameseName, 
      path: '/projects', 
      type: pr.status, 
      icon: FolderGit2, 
      category: 'Dự án của bạn',
      subtitle: pr.description 
    })),
  ].filter(item => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      item.title.toLowerCase().includes(q) ||
      (item.subtitle && item.subtitle.toLowerCase().includes(q)) ||
      (item.category && item.category.toLowerCase().includes(q))
    );
  }).slice(0, 8);

  const handleSelect = (item) => {
    onClose();
    navigate(item.path);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev < searchResults.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : searchResults.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (searchResults[selectedIndex]) {
        handleSelect(searchResults[selectedIndex]);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-start justify-center pt-24 px-4 select-none animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-2xl rounded-2xl glass-panel shadow-2xl border border-white/15 overflow-hidden animate-scaleUp"
        onClick={e => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search Input Bar */}
        <div className="relative flex items-center px-4 py-3.5 border-b border-white/10 bg-white/[0.02]">
          <Search className="w-5 h-5 text-ff-gold mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Tìm kiếm trang, mẫu website, tài nguyên, dự án..."
            className="w-full bg-transparent text-base text-neutral-100 placeholder-neutral-500 focus:outline-none"
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="text-neutral-400 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2 divide-y divide-white/5">
          {searchResults.length === 0 ? (
            <div className="py-12 text-center text-neutral-400 text-sm">
              Không tìm thấy kết quả nào cho "{query}"
            </div>
          ) : (
            searchResults.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              const Icon = item.icon;
              return (
                <div
                  key={`${item.title}-${idx}`}
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${
                    isSelected ? 'bg-ff-gold/15 border border-ff-gold/30' : 'hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                      isSelected ? 'bg-ff-gold text-black' : 'bg-white/5 text-neutral-300'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <p className={`text-sm font-medium truncate ${isSelected ? 'text-ff-gold-light' : 'text-neutral-200'}`}>
                        {item.title}
                      </p>
                      {item.subtitle && (
                        <p className="text-xs text-neutral-400 truncate max-w-md">
                          {item.subtitle}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 ml-4">
                    <span className="text-[11px] px-2 py-0.5 rounded-md bg-white/5 text-neutral-400 border border-white/5">
                      {item.category}
                    </span>
                    {isSelected && <ArrowRight className="w-3.5 h-3.5 text-ff-gold" />}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2 bg-black/40 border-t border-white/5 flex items-center justify-between text-[11px] text-neutral-400">
          <div className="flex items-center gap-4">
            <span>Dùng <kbd className="px-1 rounded bg-white/10 text-neutral-300">↑</kbd> <kbd className="px-1 rounded bg-white/10 text-neutral-300">↓</kbd> để di chuyển</span>
            <span><kbd className="px-1 rounded bg-white/10 text-neutral-300">Enter</kbd> để chọn</span>
            <span><kbd className="px-1 rounded bg-white/10 text-neutral-300">Esc</kbd> để đóng</span>
          </div>
          <span className="text-ff-gold font-serif italic">F-Forum Spotlight</span>
        </div>
      </div>
    </div>
  );
};
