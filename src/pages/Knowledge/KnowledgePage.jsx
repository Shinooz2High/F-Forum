import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BookOpen, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  ExternalLink, 
  Plus, 
  Tag as TagIcon,
  Filter,
  ShieldCheck,
  Bookmark,
  Share2,
  X
} from 'lucide-react';
import { GlassCard } from '../../components/macos/GlassCard';
import { Button } from '../../components/macos/Button';
import { Badge, Tag } from '../../components/macos/UIElements';
import { Window } from '../../components/macos/Window';
import { mockResources, resourceCategories } from '../../data/mockResources';

export const KnowledgePage = () => {
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [searchQuery, setSearchQuery] = useState('');
  const [savedResources, setSavedResources] = useState({});
  const [detailModal, setDetailModal] = useState(null);
  const navigate = useNavigate();

  const filteredResources = mockResources.filter((r) => {
    const matchCat = selectedCategory === 'Tất cả' || r.category === selectedCategory;
    const matchQuery = r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       r.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       r.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCat && matchQuery;
  });

  const toggleSave = (id) => {
    setSavedResources(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleUseInProject = (resource) => {
    navigate('/workspace', {
      state: {
        initialPrompt: `Tôi muốn tích hợp tài nguyên "${resource.name}" (${resource.category}) vào dự án hiện tại. Hãy hướng dẫn cách áp dụng.`
      }
    });
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-medium">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Thư Viện Tài Nguyên Tuyển Chọn Có Tags</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-neutral-100">
          Source of Knowledge
        </h1>
        <p className="text-sm text-neutral-400">
          Nơi cung cấp các công cụ AI, kho GitHub mẫu, bộ Skills/Rules chuẩn và thư viện UI/UX đã qua rà soát an toàn.
        </p>
      </div>

      {/* Search and Category Filter Bar */}
      <div className="space-y-4">
        {/* Search Input */}
        <div className="relative max-w-xl mx-auto">
          <Search className="w-4 h-4 text-ff-gold absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm theo tên tài nguyên, công nghệ (React, Tailwind, Rules)..."
            className="w-full pl-11 pr-4 py-3 rounded-2xl glass-panel text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-ff-gold shadow-md"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          {resourceCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-ff-gold text-black font-semibold shadow-md'
                  : 'glass-panel text-neutral-300 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((res) => {
          const isSaved = !!savedResources[res.id];
          return (
            <GlassCard key={res.id} className="p-6 flex flex-col justify-between space-y-4 group">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant="gold" size="xs">
                    {res.category}
                  </Badge>
                  {res.verified && (
                    <span className="flex items-center gap-1 text-[11px] text-ff-jade font-medium">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Đã Kiểm Thử
                    </span>
                  )}
                </div>

                <div>
                  <h3 
                    onClick={() => setDetailModal(res)}
                    className="font-serif font-bold text-lg text-neutral-100 group-hover:text-ff-gold-light transition-colors cursor-pointer"
                  >
                    {res.name}
                  </h3>
                  <p className="text-xs text-neutral-400 mt-2 line-clamp-3 leading-relaxed">
                    {res.description}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {res.tags.map((t) => (
                    <span key={t} className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-neutral-300">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Meta & Actions */}
              <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                <div className="font-mono text-[11px] text-neutral-500">
                  <span>{res.pricing}</span> · <span>{res.license}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleSave(res.id)}
                    className={`p-1.5 rounded-lg border transition-colors ${
                      isSaved 
                        ? 'bg-ff-gold/20 border-ff-gold text-ff-gold' 
                        : 'bg-white/5 border-white/10 text-neutral-400 hover:text-white'
                    }`}
                    title={isSaved ? 'Đã lưu' : 'Lưu tài nguyên'}
                  >
                    <Bookmark className="w-3.5 h-3.5" fill={isSaved ? 'currentColor' : 'none'} />
                  </button>

                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleUseInProject(res)}
                  >
                    Dùng Trong Dự Án
                  </Button>
                </div>
              </div>
            </GlassCard>
          );
        })}
      </div>

      {/* Resource Detail Modal */}
      {detailModal && (
        <div 
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setDetailModal(null)}
        >
          <div 
            className="w-full max-w-xl max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <Window 
              title={detailModal.name} 
              subtitle={detailModal.category}
              onClose={() => setDetailModal(null)}
              className="bg-neutral-950 border-white/20"
            >
              <div className="p-6 space-y-5">
                <div className="flex items-center justify-between">
                  <Badge variant="gold" size="sm">{detailModal.category}</Badge>
                  <span className="text-xs text-ff-jade flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4" /> Đã kiểm thử an toàn
                  </span>
                </div>

                <p className="text-sm text-neutral-200 font-sans leading-relaxed">
                  {detailModal.description}
                </p>

                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 space-y-2 text-xs font-mono">
                  <p className="text-neutral-300">Chi tiết kỹ thuật:</p>
                  <p className="text-neutral-400">{detailModal.details}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                  <div>
                    <span className="text-neutral-500 block">Giấy phép:</span>
                    <span className="text-neutral-200">{detailModal.license}</span>
                  </div>
                  <div>
                    <span className="text-neutral-500 block">Chi phí:</span>
                    <span className="text-neutral-200">{detailModal.pricing}</span>
                  </div>
                  <div>
                    <span className="text-neutral-500 block">Lần kiểm tra gần nhất:</span>
                    <span className="text-neutral-200">{detailModal.lastChecked}</span>
                  </div>
                  <div>
                    <span className="text-neutral-500 block">Số lượt áp dụng:</span>
                    <span className="text-neutral-200">{detailModal.useInProjectCount} dự án</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
                  <Button variant="ghost" size="md" onClick={() => setDetailModal(null)}>
                    Đóng
                  </Button>
                  <Button 
                    variant="primary" 
                    size="md" 
                    onClick={() => {
                      setDetailModal(null);
                      handleUseInProject(detailModal);
                    }}
                  >
                    Áp Dụng Vào Workspace
                  </Button>
                </div>
              </div>
            </Window>
          </div>
        </div>
      )}
    </div>
  );
};
