import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BookOpen, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  ExternalLink, 
  Tag as TagIcon,
  Filter,
  ShieldCheck,
  AlertCircle,
  Bookmark,
  X,
  Cpu,
  BarChart2,
  Calendar,
  RotateCcw,
  Check,
  CheckCircle
} from 'lucide-react';
import { GlassCard } from '../../components/macos/GlassCard';
import { Button } from '../../components/macos/Button';
import { Badge } from '../../components/macos/UIElements';
import { Window } from '../../components/macos/Window';
import { 
  mockResources, 
  resourceCategories, 
  STANDARDIZED_CATEGORIES,
  VERIFICATION_STATUSES 
} from '../../data/mockResources';

export const KnowledgePage = () => {
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('Tất cả');
  const [showSavedOnly, setShowSavedOnly] = useState(false);
  const [detailModal, setDetailModal] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const navigate = useNavigate();

  // Local storage persisted saved resources
  const [savedResources, setSavedResources] = useState(() => {
    try {
      const saved = localStorage.getItem('ff_saved_resources');
      return saved ? JSON.parse(saved) : { 'res-1': true, 'res-2': true };
    } catch {
      return { 'res-1': true, 'res-2': true };
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('ff_saved_resources', JSON.stringify(savedResources));
    } catch (e) {
      console.warn('Failed to persist saved resources:', e);
    }
  }, [savedResources]);

  // Extract all unique tags
  const allUniqueTags = useMemo(() => {
    const set = new Set();
    mockResources.forEach(res => {
      res.tags?.forEach(t => set.add(t));
    });
    return Array.from(set).sort();
  }, []);

  // Filter resources
  const filteredResources = useMemo(() => {
    return mockResources.filter((r) => {
      // 1. Category filter
      const matchCategory = selectedCategory === 'Tất cả' || r.category === selectedCategory;

      // 2. Saved only filter
      const matchSaved = !showSavedOnly || !!savedResources[r.id];

      // 3. Verification status filter
      const matchStatus = selectedStatus === 'Tất cả' || r.verificationStatus === selectedStatus;

      // 4. Search query
      const query = searchQuery.trim().toLowerCase();
      const matchQuery = !query || 
        r.name.toLowerCase().includes(query) ||
        r.description.toLowerCase().includes(query) ||
        (r.compatibility && r.compatibility.toLowerCase().includes(query)) ||
        (r.license && r.license.toLowerCase().includes(query)) ||
        (r.tags && r.tags.some(t => t.toLowerCase().includes(query)));

      // 5. Multi-tag filter: resource must contain all selected tags
      const matchTags = selectedTags.length === 0 || 
        selectedTags.every(st => r.tags?.some(t => t.toLowerCase() === st.toLowerCase()));

      return matchCategory && matchSaved && matchStatus && matchQuery && matchTags;
    });
  }, [selectedCategory, showSavedOnly, selectedStatus, searchQuery, selectedTags, savedResources]);

  // Toggle Save to collection
  const toggleSave = (id, resourceName = '') => {
    setSavedResources(prev => {
      const nextState = { ...prev, [id]: !prev[id] };
      const isNowSaved = nextState[id];
      showToast(isNowSaved ? `Đã lưu "${resourceName || id}" vào bộ sưu tập cá nhân` : `Đã bỏ lưu khỏi bộ sưu tập`);
      return nextState;
    });
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Toggle Tag in multi-tag selection
  const toggleTag = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag) 
        : [...prev, tag]
    );
  };

  const clearAllFilters = () => {
    setSelectedCategory('Tất cả');
    setSearchQuery('');
    setSelectedTags([]);
    setSelectedStatus('Tất cả');
    setShowSavedOnly(false);
  };

  // Handle 'Use in Project'
  const handleUseInProject = (resource) => {
    navigate('/workspace', {
      state: {
        initialPrompt: `Tôi muốn tích hợp tài nguyên "${resource.name}" [Danh mục: ${resource.category} | Nguồn: ${resource.sourceUrl}] vào dự án F-Forum hiện tại.
Thông số kỹ thuật:
- Tương thích công nghệ: ${resource.compatibility}
- Trạng thái xác minh: ${resource.verificationStatus}
- Giấy phép & Chi phí: ${resource.license} (${resource.pricing})
- Độ khó: ${resource.difficulty}
- Mô tả: ${resource.description}
${resource.details ? `- Chi tiết kỹ thuật: ${resource.details}` : ''}
Hãy phân tích và viết mã nguồn mẫu để áp dụng trực tiếp tài nguyên này vào dự án.`,
        attachedResource: resource,
        resourceContext: {
          id: resource.id,
          name: resource.name,
          category: resource.category,
          sourceUrl: resource.sourceUrl,
          compatibility: resource.compatibility,
          verificationStatus: resource.verificationStatus,
          license: resource.license,
          pricing: resource.pricing,
          difficulty: resource.difficulty
        }
      }
    });
  };

  // Render Verification Status Badge
  const renderVerificationBadge = (status) => {
    switch (status) {
      case 'Đã kiểm thử':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Đã kiểm thử</span>
          </span>
        );
      case 'Đã kiểm tra thông tin':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 shadow-xs">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Đã kiểm tra thông tin</span>
          </span>
        );
      case 'Chưa xác minh':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-amber-500/10 text-amber-400 border border-amber-500/30 shadow-xs">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>Chưa xác minh</span>
          </span>
        );
    }
  };

  const savedCount = Object.values(savedResources).filter(Boolean).length;

  return (
    <div className="space-y-8 pb-12">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-fadeIn flex items-center gap-2 px-4 py-3 rounded-xl bg-neutral-900 border border-ff-gold/40 text-neutral-100 shadow-xl text-xs font-medium">
          <CheckCircle className="w-4 h-4 text-ff-gold flex-shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-medium">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Thư Viện Tri Thức & Tài Nguyên Chuẩn F-Forum</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-neutral-100">
          Source of Knowledge
        </h1>
        <p className="text-sm text-neutral-400 max-w-2xl mx-auto leading-relaxed">
          Khám phá 8 danh mục tài nguyên chuẩn hóa: AI Tools, Prompts, GitHub Repos, Skills & Rules, UI/UX, Docs, Learning và Dev Tools kèm kiểm định bảo mật.
        </p>

        {/* Quick Header Stats */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-1 text-xs">
          <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-neutral-300">
            Tổng cộng: <strong className="text-ff-gold">{mockResources.length}</strong> tài nguyên
          </span>
          <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-neutral-300">
            Chuẩn hóa: <strong className="text-ff-jade">8</strong> danh mục
          </span>
          <button
            onClick={() => setShowSavedOnly(!showSavedOnly)}
            className={`px-3 py-1 rounded-lg border transition-all flex items-center gap-1.5 cursor-pointer ${
              showSavedOnly 
                ? 'bg-ff-gold/20 border-ff-gold text-ff-gold font-semibold shadow-sm' 
                : 'bg-white/5 border-white/10 text-neutral-300 hover:text-white'
            }`}
          >
            <Bookmark className="w-3 h-3" fill={showSavedOnly ? 'currentColor' : 'none'} />
            <span>Đã lưu cá nhân ({savedCount})</span>
          </button>
        </div>
      </div>

      {/* Search Bar & Primary Filters */}
      <div className="space-y-4 max-w-4xl mx-auto">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-ff-gold absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm theo tên tài nguyên, mô tả, thẻ, công nghệ tương thích (React, Tailwind, Rules, AI)..."
            className="w-full pl-11 pr-10 py-3 rounded-2xl glass-panel text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-ff-gold shadow-md transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white p-1 rounded-md"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* 8 Standardized Categories Filter Pills */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-neutral-400 px-1">
            <span className="font-medium text-neutral-300">Danh mục tài nguyên ({STANDARDIZED_CATEGORIES.length}):</span>
            {(selectedCategory !== 'Tất cả' || selectedStatus !== 'Tất cả' || selectedTags.length > 0 || showSavedOnly) && (
              <button
                onClick={clearAllFilters}
                className="text-ff-gold hover:underline flex items-center gap-1 text-[11px]"
              >
                <RotateCcw className="w-3 h-3" />
                Đặt lại tất cả bộ lọc
              </button>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {resourceCategories.map((cat) => {
              const isSelected = selectedCategory === cat;
              const count = cat === 'Tất cả' 
                ? mockResources.length 
                : mockResources.filter(r => r.category === cat).length;

              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-ff-gold text-black font-semibold shadow-md ring-1 ring-ff-gold'
                      : 'glass-panel text-neutral-300 hover:text-white hover:border-ff-gold/30'
                  }`}
                >
                  <span>{cat}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    isSelected ? 'bg-black/20 text-black' : 'bg-white/10 text-neutral-400'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Verification Status Filter Bar */}
        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
          <span className="text-neutral-400 font-medium mr-1">Xác minh:</span>
          {['Tất cả', ...VERIFICATION_STATUSES].map((status) => {
            const isSelected = selectedStatus === status;
            return (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`px-2.5 py-1 rounded-lg text-xs transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-white/20 text-white font-medium border border-white/30 shadow-xs'
                    : 'bg-white/5 text-neutral-400 hover:text-neutral-200 border border-transparent'
                }`}
              >
                {status}
              </button>
            );
          })}
        </div>

        {/* Multi-tag Filters Bar */}
        <div className="p-3.5 rounded-2xl glass-panel border border-white/10 space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-medium text-neutral-300">
              <Filter className="w-3.5 h-3.5 text-ff-gold" />
              <span>Lọc theo nhiều thẻ (Multi-tag Filters):</span>
              {selectedTags.length > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-ff-gold/20 text-ff-gold text-[10px] font-bold">
                  {selectedTags.length} đang chọn
                </span>
              )}
            </div>
            {selectedTags.length > 0 && (
              <button
                onClick={() => setSelectedTags([])}
                className="text-[11px] text-neutral-400 hover:text-ff-rose transition-colors flex items-center gap-1 cursor-pointer"
              >
                <X className="w-3 h-3" />
                Xóa lọc thẻ
              </button>
            )}
          </div>

          {/* Tags list */}
          <div className="flex flex-wrap gap-1.5 max-h-28 overflow-y-auto pr-1">
            {allUniqueTags.map((tag) => {
              const isSelected = selectedTags.includes(tag);
              return (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`text-xs px-2.5 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
                    isSelected
                      ? 'bg-ff-gold text-black font-semibold shadow-sm'
                      : 'bg-white/5 text-neutral-300 hover:bg-white/10 hover:text-white border border-white/5'
                  }`}
                >
                  <span>#{tag}</span>
                  {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Result Count and Active Filters Summary */}
      <div className="flex flex-wrap items-center justify-between text-xs text-neutral-400 px-1 border-b border-white/5 pb-3">
        <div>
          Hiển thị <strong className="text-white">{filteredResources.length}</strong> / {mockResources.length} tài nguyên
          {selectedCategory !== 'Tất cả' && <span className="ml-1 text-ff-gold">trong "{selectedCategory}"</span>}
          {selectedTags.length > 0 && <span className="ml-1 text-cyan-400">với {selectedTags.length} thẻ</span>}
          {showSavedOnly && <span className="ml-1 text-amber-300">(Chỉ mục đã lưu)</span>}
        </div>
      </div>

      {/* Resources Grid */}
      {filteredResources.length === 0 ? (
        <div className="text-center py-16 p-8 rounded-2xl glass-panel border border-white/10 space-y-3 max-w-lg mx-auto">
          <BookOpen className="w-10 h-10 text-neutral-500 mx-auto" />
          <h3 className="text-lg font-serif font-bold text-neutral-200">Không tìm thấy tài nguyên phù hợp</h3>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Thử thay đổi từ khóa tìm kiếm, bỏ bớt các bộ lọc thẻ hoặc chuyển về danh mục "Tất cả".
          </p>
          <Button variant="secondary" size="sm" onClick={clearAllFilters} className="mt-2">
            Đặt lại bộ lọc
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((res) => {
            const isSaved = !!savedResources[res.id];

            return (
              <GlassCard 
                key={res.id} 
                className="p-5 flex flex-col justify-between space-y-4 group hover:border-ff-gold/30 transition-all duration-200"
              >
                <div className="space-y-3">
                  {/* Top Row: Category & Verification Status */}
                  <div className="flex items-center justify-between gap-2">
                    <Badge variant="gold" size="xs">
                      {res.category}
                    </Badge>
                    {renderVerificationBadge(res.verificationStatus)}
                  </div>

                  {/* Resource Name & Official Source Link */}
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h3 
                        onClick={() => setDetailModal(res)}
                        className="font-serif font-bold text-base text-neutral-100 group-hover:text-ff-gold-light transition-colors cursor-pointer leading-snug line-clamp-1"
                        title={res.name}
                      >
                        {res.name}
                      </h3>
                      {res.sourceUrl && (
                        <a
                          href={res.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-neutral-400 hover:text-ff-gold transition-colors p-1 rounded hover:bg-white/5 flex-shrink-0"
                          title="Mở nguồn chính thức (Official Source Link)"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                    <p className="text-xs text-neutral-400 mt-2 line-clamp-2 leading-relaxed">
                      {res.description}
                    </p>
                  </div>

                  {/* Tags (Clickable to toggle filter) */}
                  <div className="flex flex-wrap gap-1.5 pt-0.5">
                    {res.tags?.map((t) => {
                      const isTagActive = selectedTags.includes(t);
                      return (
                        <button 
                          key={t}
                          onClick={() => toggleTag(t)}
                          className={`text-[10px] px-2 py-0.5 rounded transition-all cursor-pointer ${
                            isTagActive 
                              ? 'bg-ff-gold text-black font-semibold' 
                              : 'bg-white/5 text-neutral-300 hover:bg-white/10 hover:text-white'
                          }`}
                          title={`Nhấp để lọc theo #${t}`}
                        >
                          #{t}
                        </button>
                      );
                    })}
                  </div>

                  {/* Detailed Specifications: Compatibility, Difficulty, Pricing, License, Last Checked */}
                  <div className="pt-2 border-t border-white/5 space-y-1.5 text-[11px]">
                    {/* Technology Compatibility */}
                    <div className="flex items-center gap-1.5 text-neutral-300">
                      <Cpu className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                      <span className="text-neutral-500">Tương thích:</span>
                      <span className="font-mono text-neutral-200 truncate" title={res.compatibility}>
                        {res.compatibility}
                      </span>
                    </div>

                    {/* Difficulty & Last Checked Date */}
                    <div className="flex items-center justify-between text-neutral-400">
                      <div className="flex items-center gap-1">
                        <BarChart2 className="w-3.5 h-3.5 text-ff-gold flex-shrink-0" />
                        <span>{res.difficulty}</span>
                      </div>
                      <div className="flex items-center gap-1 font-mono text-[10px] text-neutral-500">
                        <Calendar className="w-3 h-3 flex-shrink-0" />
                        <span>Cập nhật: {res.lastChecked}</span>
                      </div>
                    </div>

                    {/* Pricing & License */}
                    <div className="flex items-center justify-between font-mono text-[10px] text-neutral-400 pt-0.5">
                      <span className="text-amber-300/90 truncate max-w-[140px]">{res.pricing}</span>
                      <span className="text-neutral-500 truncate max-w-[120px]">{res.license}</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Actions: Save to Collection & Use In Project */}
                <div className="pt-3 border-t border-white/5 flex items-center justify-between gap-2">
                  <button
                    onClick={() => toggleSave(res.id, res.name)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all cursor-pointer ${
                      isSaved 
                        ? 'bg-ff-gold/20 border-ff-gold text-ff-gold font-semibold shadow-sm' 
                        : 'bg-white/5 border-white/10 text-neutral-400 hover:text-white hover:bg-white/10'
                    }`}
                    title={isSaved ? 'Đã lưu trong bộ sưu tập' : 'Lưu vào bộ sưu tập'}
                  >
                    <Bookmark className="w-3.5 h-3.5" fill={isSaved ? 'currentColor' : 'none'} />
                    <span>{isSaved ? 'Đã lưu' : 'Lưu'}</span>
                  </button>

                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleUseInProject(res)}
                    className="flex items-center gap-1.5 shadow-sm"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Dùng Trong Dự Án</span>
                  </Button>
                </div>
              </GlassCard>
            );
          })}
        </div>
      )}

      {/* Resource Detail Modal */}
      {detailModal && (
        <div 
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
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
              className="bg-neutral-950 border-white/20 shadow-2xl"
            >
              <div className="p-6 space-y-5">
                {/* Header row with Category, Verification Status and Official Link */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="gold" size="sm">{detailModal.category}</Badge>
                    {renderVerificationBadge(detailModal.verificationStatus)}
                  </div>
                  {detailModal.sourceUrl && (
                    <a
                      href={detailModal.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-ff-gold hover:underline font-mono"
                    >
                      <span>Nguồn chính thức</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>

                {/* Description */}
                <p className="text-sm text-neutral-200 font-sans leading-relaxed">
                  {detailModal.description}
                </p>

                {/* Technical Details */}
                {detailModal.details && (
                  <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 space-y-1.5 text-xs">
                    <div className="text-ff-gold font-medium">Chi tiết kỹ thuật & triển khai:</div>
                    <p className="text-neutral-300 font-mono leading-relaxed">{detailModal.details}</p>
                  </div>
                )}

                {/* Tags */}
                <div className="space-y-1.5">
                  <span className="text-xs text-neutral-400 block font-medium">Thẻ từ khóa:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {detailModal.tags?.map(t => (
                      <span key={t} className="text-[11px] px-2.5 py-0.5 rounded-lg bg-white/5 text-neutral-300 border border-white/5">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Key Spec Grid */}
                <div className="grid grid-cols-2 gap-4 text-xs font-mono p-4 rounded-xl bg-neutral-900/60 border border-white/5">
                  <div>
                    <span className="text-neutral-500 block mb-0.5">Tương thích công nghệ:</span>
                    <span className="text-neutral-200 font-medium">{detailModal.compatibility}</span>
                  </div>
                  <div>
                    <span className="text-neutral-500 block mb-0.5">Độ khó:</span>
                    <span className="text-neutral-200 font-medium">{detailModal.difficulty}</span>
                  </div>
                  <div>
                    <span className="text-neutral-500 block mb-0.5">Giấy phép & Chi phí:</span>
                    <span className="text-neutral-200 font-medium">{detailModal.pricing} · {detailModal.license}</span>
                  </div>
                  <div>
                    <span className="text-neutral-500 block mb-0.5">Kiểm tra gần nhất:</span>
                    <span className="text-neutral-200 font-medium">{detailModal.lastChecked}</span>
                  </div>
                  <div className="col-span-2 pt-2 border-t border-white/5 flex items-center justify-between text-neutral-400">
                    <span>Số dự án F-Forum đã tích hợp:</span>
                    <span className="text-ff-gold font-bold">{detailModal.useInProjectCount} dự án</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                  <button
                    onClick={() => toggleSave(detailModal.id, detailModal.name)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-medium transition-all ${
                      savedResources[detailModal.id]
                        ? 'bg-ff-gold/20 border-ff-gold text-ff-gold'
                        : 'bg-white/5 border-white/10 text-neutral-300 hover:text-white'
                    }`}
                  >
                    <Bookmark className="w-4 h-4" fill={savedResources[detailModal.id] ? 'currentColor' : 'none'} />
                    <span>{savedResources[detailModal.id] ? 'Đã lưu trong bộ sưu tập' : 'Lưu tài nguyên'}</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="md" onClick={() => setDetailModal(null)}>
                      Đóng
                    </Button>
                    <Button 
                      variant="primary" 
                      size="md" 
                      onClick={() => {
                        const res = detailModal;
                        setDetailModal(null);
                        handleUseInProject(res);
                      }}
                      className="flex items-center gap-1.5"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Áp Dụng Vào Workspace</span>
                    </Button>
                  </div>
                </div>
              </div>
            </Window>
          </div>
        </div>
      )}
    </div>
  );
};
