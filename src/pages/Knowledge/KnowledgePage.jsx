import React, { useState, useMemo, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  BookOpen, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  ExternalLink, 
  Filter,
  Flag,
  ShieldCheck, 
  AlertCircle,
  Bookmark,
  X,
  Cpu,
  BarChart2,
  Calendar,
  RotateCcw,
  Check,
  CheckCircle,
  GitFork,
  MessageSquare,
  Award,
  Radio,
  Copy,
  CheckCheck,
  Newspaper,
  Code2,
  Flame,
  HelpCircle,
  ChevronRight,
  ChevronDown,
  Eye
} from 'lucide-react';
import { GlassCard } from '../../components/macos/GlassCard';
import { Button } from '../../components/macos/Button';
import { Badge } from '../../components/macos/UIElements';
import { Window } from '../../components/macos/Window';
import { useTheme } from '../../context/ThemeContext';
import ReaderCard from '../../components/pinui/ReaderCard';
import Chips from '../../components/pinui/Chips';
import ReportContentModal, { getReportedIds } from '../../components/public-web/ReportContentModal';
import { 
  mockResources, 
  resourceCategories, 
  STANDARDIZED_CATEGORIES,
  VERIFICATION_STATUSES 
} from '../../data/mockResources';
import {
  mockProjectShowcases,
  mockCommunityDrops,
  mockDevQnA,
  mockCommunityPulse
} from '../../data/mockCommunityFeed';

export const KnowledgePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useTheme();

  const [activeMode, setActiveMode] = useState(() => (location.state?.category ? 'catalog' : 'magazine'));
  const [selectedCategory, setSelectedCategory] = useState(() => location.state?.category || 'Tất cả');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('Tất cả');
  const [showSavedOnly, setShowSavedOnly] = useState(false);
  const [detailModal, setDetailModal] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [copiedSnippetId, setCopiedSnippetId] = useState(null);
  const [expandedQnaId, setExpandedQnaId] = useState('qna-1');
  const [reportTarget, setReportTarget] = useState(null);
  const [reportedIds, setReportedIds] = useState(() => getReportedIds());

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

  const allUniqueTags = useMemo(() => {
    const set = new Set();
    mockResources.forEach(res => {
      res.tags?.forEach(t => set.add(t));
    });
    return Array.from(set).sort();
  }, []);

  const filteredResources = useMemo(() => {
    return mockResources.filter((r) => {
      const matchCategory = selectedCategory === 'Tất cả' || r.category === selectedCategory;
      const matchSaved = !showSavedOnly || !!savedResources[r.id];
      const matchStatus = selectedStatus === 'Tất cả' || r.verificationStatus === selectedStatus;

      const query = searchQuery.trim().toLowerCase();
      const matchQuery = !query || 
        r.name.toLowerCase().includes(query) ||
        r.description.toLowerCase().includes(query) ||
        (r.compatibility && r.compatibility.toLowerCase().includes(query)) ||
        (r.license && r.license.toLowerCase().includes(query)) ||
        (r.tags && r.tags.some(t => t.toLowerCase().includes(query)));

      const matchTags = selectedTags.length === 0 || 
        selectedTags.every(st => r.tags?.some(t => t.toLowerCase() === st.toLowerCase()));

      return matchCategory && matchSaved && matchStatus && matchQuery && matchTags;
    });
  }, [selectedCategory, showSavedOnly, selectedStatus, searchQuery, selectedTags, savedResources]);

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

  const handleForkProject = (project) => {
    navigate('/workspace', {
      state: {
        templateTitle: project.title,
        initialPrompt: project.promptForFork,
        attachedProject: project
      }
    });
  };

  const handleCopyCode = (id, code) => {
    navigator.clipboard.writeText(code);
    setCopiedSnippetId(id);
    showToast('Đã sao chép mã nguồn vào bộ nhớ tạm!');
    setTimeout(() => {
      setCopiedSnippetId(null);
    }, 2200);
  };

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
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-white/10 text-neutral-200 border border-white/25 shadow-xs">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Đã kiểm tra</span>
          </span>
        );
      case 'Chưa xác minh':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-white/5 text-muted-foreground border border-white/15 shadow-xs">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>Chưa xác minh</span>
          </span>
        );
    }
  };

  const savedCount = Object.values(savedResources).filter(Boolean).length;

  return (
    <div className="space-y-8 pb-16">
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-fadeIn flex items-center gap-2 px-4 py-3 rounded-xl bg-black border border-white/30 text-foreground shadow-xl text-xs font-medium">
          <CheckCircle className="w-4 h-4 text-ff-jade flex-shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="liquid-glass inline-flex items-center gap-2 px-3 py-1 rounded-full text-muted-foreground text-xs font-medium">
          <Newspaper className="w-3.5 h-3.5 text-foreground" />
          <span>Source of Knowledge · Academic Dev Magazine</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-sans font-medium text-foreground tracking-[-1.5px]">
          Tạp chí tri thức <span className="font-serif italic font-normal">Knowledge</span>
        </h1>
        <p className="text-sm text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Nơi hội tụ các bài Project Showcase, Community Drops (Skills & Rules), Dev Q&A thực chiến cùng kho 8 nhóm tài nguyên chuẩn hóa.
        </p>

        {/* View Switcher */}
        <div className="flex items-center justify-center pt-2">
          <div className="inline-flex items-center gap-1.5 p-1 rounded-2xl bg-black border border-border backdrop-blur-xl">
            <button
              onClick={() => setActiveMode('magazine')}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all flex items-center gap-2 cursor-pointer ${
                activeMode === 'magazine'
                  ? 'bg-foreground text-background font-bold shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Newspaper className="w-3.5 h-3.5" />
              <span>Dòng Chảy Tạp Chí (Editorial Stream)</span>
            </button>
            <button
              onClick={() => setActiveMode('catalog')}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all flex items-center gap-2 cursor-pointer ${
                activeMode === 'catalog'
                  ? 'bg-foreground text-background font-bold shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Kho 8 Nhóm Tài Nguyên ({mockResources.length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* ================= MODE 1: EDITORIAL STREAM ================= */}
      {activeMode === 'magazine' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* MAIN COLUMN */}
          <div className="lg:col-span-8 space-y-10">
            {/* 1. PROJECT SHOWCASE SECTION */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-foreground" />
                  <h2 className="font-sans font-semibold text-xl text-foreground">
                    Project Showcases · Khoe Sản Phẩm & Triển Khai Thực Tế
                  </h2>
                </div>
                <span className="text-xs font-mono text-muted-foreground">Khổ rộng Tạp chí</span>
              </div>

              <div className="space-y-6">
                {mockProjectShowcases[0] && (
                  <div className="rounded-3xl border border-border bg-card p-4 shadow-sm overflow-hidden flex flex-col items-center">
                    <ReaderCard
                      theme={theme === 'dark' ? 'dark' : 'light'}
                      title={mockProjectShowcases[0].title}
                      cardTitleLines={['Hồ Sơ Nổi Bật', 'Liquid Reader']}
                      subtitle={`${mockProjectShowcases[0].author.name} · ${mockProjectShowcases[0].author.role}`}
                      chapterLabel="Project Showcase · PinUI ReaderCard"
                      openLabel="Mở Đọc Chi Tiết"
                      leadParagraph={mockProjectShowcases[0].summary}
                      resumeHighlight={mockProjectShowcases[0].takeaways?.[0] || 'Cấu trúc mã nguồn sạch chuẩn mực từ SOURCEOFKNOWLEDGE.'}
                      bodyParagraphs={mockProjectShowcases[0].takeaways || []}
                      forkLabel="Fork Dự Án Vào Workspace"
                      onFork={() => handleForkProject(mockProjectShowcases[0])}
                    />
                  </div>
                )}

                {mockProjectShowcases.map((project) => (
                  <GlassCard 
                    key={project.id}
                    className="p-6 rounded-3xl overflow-hidden hover:border-white/35 transition-all space-y-5"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <img 
                          src={project.author.avatar} 
                          alt={project.author.name}
                          className="w-10 h-10 rounded-full object-cover ring-2 ring-white/30" 
                        />
                        <div>
                          <h4 className="font-medium text-xs sm:text-sm text-foreground">
                            {project.author.name}
                          </h4>
                          <p className="text-[11px] text-muted-foreground font-mono">
                            {project.author.role} · {project.publishedAt}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 text-xs font-mono text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Eye className="w-3.5 h-3.5 text-neutral-500" />
                          {project.metrics.views}
                        </span>
                        <span className="flex items-center gap-1 text-foreground">
                          <GitFork className="w-3.5 h-3.5" />
                          {project.metrics.forks} forks
                        </span>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl sm:text-2xl font-sans font-semibold text-foreground mb-2 leading-snug">
                        {project.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                        {project.summary}
                      </p>
                    </div>

                    <div className="relative rounded-2xl overflow-hidden border border-white/10 group aspect-video sm:aspect-[21/9] bg-black">
                      <img 
                        src={project.previewImage} 
                        alt={project.title}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500 opacity-85" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent flex items-end p-4">
                        <div className="flex flex-wrap gap-1.5">
                          {project.tags.map(t => (
                            <span key={t} className="px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-[10px] text-foreground font-mono border border-white/20">
                              #{t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-muted/60 border border-border space-y-2">
                      <p className="text-[11px] font-mono uppercase tracking-wider text-foreground font-semibold flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-ff-jade" />
                        Điểm Sáng Kỹ Thuật (Key Takeaways):
                      </p>
                      <ul className="space-y-1.5 text-xs text-muted-foreground">
                        {project.takeaways.map((point, pIdx) => (
                          <li key={pIdx} className="flex items-start gap-2">
                            <span className="text-foreground mt-0.5">•</span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-border">
                      <span className="text-[11px] font-mono text-muted-foreground">
                        Sẵn sàng thử nghiệm trong Arena Studio
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setReportTarget({ id: project.id, title: project.title })}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border bg-card text-xs text-muted-foreground hover:text-rose-500 transition cursor-pointer"
                        >
                          <Flag className="w-3.5 h-3.5" /> Báo cáo
                        </button>
                        <Button 
                          variant="primary" 
                          size="md" 
                          icon={GitFork}
                          onClick={() => handleForkProject(project)}
                        >
                          Fork Vào Workspace
                        </Button>
                      </div>
                    </div>
                  </GlassCard>
                ))}
              </div>
            </div>

            {/* 2. COMMUNITY DROPS */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <div className="flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-foreground" />
                  <h2 className="font-sans font-semibold text-xl text-foreground">
                    Community Drops · Bộ Rules, Skills & Component Tái Sử Dụng
                  </h2>
                </div>
                <span className="text-xs font-mono text-muted-foreground">Code Snippets Trực Tiếp</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockCommunityDrops.map((drop) => (
                  <GlassCard 
                    key={drop.id}
                    className="p-5 rounded-2xl flex flex-col justify-between space-y-4 hover:border-white/35 transition-all"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Badge variant="gold" size="xs">{drop.type}</Badge>
                        <span className="text-[10px] text-ff-jade font-mono bg-ff-jade/10 border border-ff-jade/20 px-2 py-0.5 rounded-full">
                          {drop.badge}
                        </span>
                      </div>

                      <h3 className="font-sans font-semibold text-base text-foreground">
                        {drop.title}
                      </h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {drop.description}
                      </p>

                      <div className="relative rounded-xl bg-black border border-white/10 p-3 font-mono text-[11px] text-neutral-300 overflow-x-auto">
                        <button
                          onClick={() => handleCopyCode(drop.id, drop.codeSnippet)}
                          className="absolute top-2 right-2 p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-neutral-300 hover:text-foreground transition-colors cursor-pointer"
                          title="Sao chép mã"
                        >
                          {copiedSnippetId === drop.id ? (
                            <CheckCheck className="w-3.5 h-3.5 text-ff-jade" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                        <pre className="pr-8 leading-relaxed whitespace-pre">
                          {drop.codeSnippet}
                        </pre>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] pt-2 border-t border-white/10">
                      <span className="text-muted-foreground font-mono">
                        Tác giả: {drop.author}
                      </span>
                      <button
                        onClick={() => {
                          navigate('/workspace', {
                            state: {
                              initialPrompt: `Tích hợp bộ quy tắc/component "${drop.title}" vào dự án:\n\`\`\`\n${drop.codeSnippet}\n\`\`\``
                            }
                          });
                        }}
                        className="text-foreground hover:underline flex items-center gap-1 font-semibold cursor-pointer"
                      >
                        <span>Dùng Trong Dự Án</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </GlassCard>
                ))}
              </div>
            </div>

            {/* 3. DEV Q&A STREAM */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <div className="flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-foreground" />
                  <h2 className="font-sans font-semibold text-xl text-foreground">
                    Dev Q&A · Giải Đáp Thực Chiến Nhanh Gọn
                  </h2>
                </div>
                <span className="text-xs font-mono text-muted-foreground">Danh sách nối tiếp</span>
              </div>

              <div className="divide-y divide-white/10 rounded-2xl bg-card border border-border overflow-hidden">
                {mockDevQnA.map((qna) => {
                  const isExpanded = expandedQnaId === qna.id;
                  return (
                    <div key={qna.id} className="p-4 transition-colors hover:bg-white/[0.02]">
                      <div 
                        onClick={() => setExpandedQnaId(isExpanded ? null : qna.id)}
                        className="flex items-start justify-between gap-3 cursor-pointer"
                      >
                        <div className="flex items-start gap-2.5">
                          <MessageSquare className="w-4 h-4 text-foreground mt-0.5 shrink-0" />
                          <div>
                            <h4 className="font-sans font-semibold text-sm text-foreground">
                              {qna.question}
                            </h4>
                            <div className="flex items-center gap-2 mt-1 text-[11px] font-mono text-muted-foreground">
                              <span>Hỏi bởi: {qna.author}</span>
                              <span>•</span>
                              <span>{qna.repliesCount} câu trả lời</span>
                              <span>•</span>
                              <span className="text-ff-jade">{qna.status}</span>
                            </div>
                          </div>
                        </div>

                        <button className="text-muted-foreground hover:text-foreground p-1 cursor-pointer">
                          {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                        </button>
                      </div>

                      {isExpanded && (
                        <div className="mt-3 pl-7 pr-2 pt-2 border-t border-white/10 space-y-2 animate-fadeIn text-xs">
                          <div className="p-3 rounded-xl bg-ff-jade/10 border border-ff-jade/20 text-neutral-200 leading-relaxed">
                            <span className="font-bold text-ff-jade block mb-1 font-mono">
                              ✓ Câu trả lời được chấp nhận (Accepted Solution):
                            </span>
                            {qna.acceptedAnswer}
                          </div>
                          <div className="flex flex-wrap gap-1 pt-1">
                            {qna.tags.map(t => (
                              <span key={t} className="text-[10px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-muted-foreground font-mono">
                                #{t}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* STICKY COLUMN: COMMUNITY PULSE */}
          <div className="lg:col-span-4 sticky top-20 space-y-6">
            {/* 1. TRENDING TOPICS */}
            <div className="bg-card p-5 rounded-3xl border border-border space-y-4">
              <div className="flex items-center gap-2 text-foreground font-sans font-semibold text-base border-b border-white/10 pb-2">
                <Flame className="w-4 h-4 text-foreground" />
                <span>Trending Topics · Đang Nóng</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {mockCommunityPulse.trendingTopics.map((topic) => (
                  <button
                    key={topic.tag}
                    onClick={() => {
                      setActiveMode('catalog');
                      setSearchQuery(topic.tag.replace('#', ''));
                    }}
                    className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-xs text-foreground transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <span className="font-mono font-semibold">{topic.tag}</span>
                    <span className="text-[10px] text-muted-foreground font-mono">({topic.count})</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. TOP MAKERS */}
            <div className="bg-card p-5 rounded-3xl border border-border space-y-4">
              <div className="flex items-center gap-2 text-foreground font-sans font-semibold text-base border-b border-white/10 pb-2">
                <Award className="w-4 h-4 text-foreground" />
                <span>Top Makers · Cống Hiến Tích Cực</span>
              </div>
              <div className="space-y-3">
                {mockCommunityPulse.topMakers.map((maker, mIdx) => (
                  <div key={mIdx} className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-black/60 border border-white/10">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-foreground text-background font-bold flex items-center justify-center text-xs font-sans">
                        {maker.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-xs font-medium text-foreground">{maker.name}</p>
                        <p className="text-[10px] text-muted-foreground font-mono">{maker.role}</p>
                      </div>
                    </div>
                    <div className="text-right font-mono text-[11px]">
                      <span className="text-foreground font-bold block">{maker.score}</span>
                      <span className="text-muted-foreground text-[10px]">{maker.projects} dự án</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. CLUB BULLETINS */}
            <div className="bg-card p-5 rounded-3xl border border-border space-y-4">
              <div className="flex items-center gap-2 text-foreground font-sans font-semibold text-base border-b border-white/10 pb-2">
                <Radio className="w-4 h-4 text-ff-jade animate-pulse" />
                <span>Bảng Tin Tuyển Quân & Bàn Giao CLB</span>
              </div>
              <div className="space-y-3">
                {mockCommunityPulse.clubBulletins.map((bulletin, bIdx) => (
                  <div key={bIdx} className="p-3.5 rounded-2xl bg-black/70 border border-white/10 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-sans font-semibold text-xs text-foreground">
                        {bulletin.club}
                      </span>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                        bulletin.badge === 'Đang Mở' 
                          ? 'bg-ff-jade/15 text-ff-jade border border-ff-jade/30' 
                          : 'bg-white/10 text-foreground border border-white/25'
                      }`}>
                        {bulletin.badge}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                      {bulletin.headline}
                    </p>
                    <div className="flex items-center justify-between pt-1 text-[10px] font-mono text-muted-foreground">
                      <span>{bulletin.deadline}</span>
                      <span className="text-foreground hover:underline cursor-pointer">Chi tiết →</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODE 2: STANDARDIZED 8 CATEGORIES RESOURCE CATALOG ================= */}
      {activeMode === 'catalog' && (
        <div className="space-y-6">
          <div className="space-y-4 max-w-4xl mx-auto">
            <div className="relative">
              <Search className="w-4 h-4 text-muted-foreground absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm tài nguyên theo tên, mô tả, thẻ, công nghệ tương thích (React, Tailwind, Rules, AI)..."
                className="w-full pl-11 pr-10 py-3 rounded-2xl bg-card border border-border text-sm text-foreground placeholder-neutral-500 focus:outline-none focus:border-white shadow-md transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1 rounded-md cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-muted-foreground px-1">
                <span className="font-medium text-foreground">Danh mục tài nguyên ({STANDARDIZED_CATEGORIES.length}) · PinUI 3D Chips:</span>
                {(selectedCategory !== 'Tất cả' || selectedStatus !== 'Tất cả' || selectedTags.length > 0 || showSavedOnly) && (
                  <button
                    onClick={clearAllFilters}
                    className="text-foreground hover:underline flex items-center gap-1 text-[11px] cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    Đặt lại tất cả bộ lọc
                  </button>
                )}
              </div>

              <div className="p-4 rounded-2xl border border-border bg-card overflow-x-auto">
                <Chips
                  theme={theme === 'dark' ? 'dark' : 'light'}
                  rows={2}
                  defaultValue={selectedCategory === 'Tất cả' ? null : selectedCategory}
                  onChange={(val) => setSelectedCategory(val || 'Tất cả')}
                />
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
                          ? 'bg-foreground text-background font-semibold shadow-sm'
                          : 'liquid-glass text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <span>{cat}</span>
                      <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                        isSelected ? 'bg-background/20 text-background' : 'bg-muted text-muted-foreground'
                      }`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
              <span className="text-muted-foreground font-medium mr-1">Xác minh:</span>
              {['Tất cả', ...VERIFICATION_STATUSES].map((status) => {
                const isSelected = selectedStatus === status;
                return (
                  <button
                    key={status}
                    onClick={() => setSelectedStatus(status)}
                    className={`px-2.5 py-1 rounded-lg text-xs transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-foreground text-background font-semibold'
                        : 'bg-card text-muted-foreground hover:text-foreground border border-border'
                    }`}
                  >
                    {status}
                  </button>
                );
              })}

              <button
                onClick={() => setShowSavedOnly(!showSavedOnly)}
                className={`ml-auto px-3 py-1 rounded-lg border transition-all flex items-center gap-1.5 cursor-pointer ${
                  showSavedOnly 
                    ? 'bg-foreground border-foreground text-background font-semibold' 
                    : 'bg-card border-border text-muted-foreground hover:text-foreground'
                }`}
              >
                <Bookmark className="w-3 h-3" fill={showSavedOnly ? 'currentColor' : 'none'} />
                <span>Đã lưu cá nhân ({savedCount})</span>
              </button>
            </div>

            <div className="p-3.5 rounded-2xl bg-card border border-border space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-medium text-neutral-300">
                  <Filter className="w-3.5 h-3.5 text-foreground" />
                  <span>Lọc theo nhiều thẻ (Multi-tag Filters):</span>
                  {selectedTags.length > 0 && (
                    <span className="px-2 py-0.5 rounded-full bg-white/15 text-foreground text-[10px] font-bold">
                      {selectedTags.length} đang chọn
                    </span>
                  )}
                </div>
                {selectedTags.length > 0 && (
                  <button
                    onClick={() => setSelectedTags([])}
                    className="text-[11px] text-muted-foreground hover:text-ff-rose transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                    Xóa lọc thẻ
                  </button>
                )}
              </div>

              <div className="flex flex-wrap gap-1.5 max-h-28 overflow-y-auto pr-1">
                {allUniqueTags.map((tag) => {
                  const isSelected = selectedTags.includes(tag);
                  return (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={`text-xs px-2.5 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
                        isSelected
                          ? 'bg-foreground text-background font-semibold shadow-sm'
                          : 'bg-white/5 text-neutral-300 hover:bg-white/10 hover:text-foreground border border-white/10'
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

          <div className="flex flex-wrap items-center justify-between text-xs text-muted-foreground px-1 border-b border-white/10 pb-3">
            <div>
              Hiển thị <strong className="text-foreground">{filteredResources.length}</strong> / {mockResources.length} tài nguyên
              {selectedCategory !== 'Tất cả' && <span className="ml-1 text-foreground">trong "{selectedCategory}"</span>}
              {selectedTags.length > 0 && <span className="ml-1 text-neutral-300">với {selectedTags.length} thẻ</span>}
              {showSavedOnly && <span className="ml-1 text-neutral-200">(Chỉ mục đã lưu)</span>}
            </div>
          </div>

          {filteredResources.length === 0 ? (
            <div className="text-center py-14 p-8 rounded-3xl bg-card border border-border space-y-4 max-w-xl mx-auto">
              <BookOpen className="w-10 h-10 text-muted-foreground mx-auto" />
              <h3 className="text-lg font-sans font-semibold text-foreground">Không tìm thấy tài nguyên phù hợp</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Gợi ý nới lỏng bộ lọc nhanh (LucianLabs #092) để khôi phục kết quả ngay lập tức:
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="px-3 py-1.5 rounded-full border border-border bg-background text-xs font-medium text-foreground hover:bg-muted cursor-pointer"
                  >
                    Xoá từ khoá "{searchQuery}"
                  </button>
                )}
                {selectedTags.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setSelectedTags([])}
                    className="px-3 py-1.5 rounded-full border border-border bg-background text-xs font-medium text-foreground hover:bg-muted cursor-pointer"
                  >
                    Bỏ {selectedTags.length} thẻ đang chọn
                  </button>
                )}
                {selectedCategory !== 'Tất cả' && (
                  <button
                    type="button"
                    onClick={() => setSelectedCategory('Tất cả')}
                    className="px-3 py-1.5 rounded-full border border-border bg-background text-xs font-medium text-foreground hover:bg-muted cursor-pointer"
                  >
                    Mở lại cả 8 danh mục
                  </button>
                )}
                <Button variant="primary" size="sm" onClick={clearAllFilters}>
                  Đặt lại tất cả
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map((res) => {
                const isSaved = !!savedResources[res.id];

                return (
                  <GlassCard 
                    key={res.id} 
                    className="p-5 flex flex-col justify-between space-y-4 group transition-all duration-200"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <Badge variant="gold" size="xs">
                          {res.category}
                        </Badge>
                        <div className="flex items-center gap-1.5">
                          {reportedIds.includes(res.id) && (
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-500 border border-rose-500/30 font-semibold">
                              Đang rà soát
                            </span>
                          )}
                          {renderVerificationBadge(res.verificationStatus)}
                        </div>
                      </div>

                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h3 
                            onClick={() => setDetailModal(res)}
                            className="font-sans font-semibold text-base text-foreground group-hover:underline transition-colors cursor-pointer leading-snug line-clamp-1"
                            title={res.name}
                          >
                            {res.name}
                          </h3>
                          {res.sourceUrl && (
                            <a
                              href={res.sourceUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded hover:bg-white/5 flex-shrink-0"
                              title="Mở nguồn chính thức"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mt-2 line-clamp-2 leading-relaxed">
                          {res.description}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-1.5 pt-0.5">
                        {res.tags?.map((t) => {
                          const isTagActive = selectedTags.includes(t);
                          return (
                            <button 
                              key={t}
                              onClick={() => toggleTag(t)}
                              className={`text-[10px] px-2 py-0.5 rounded transition-all cursor-pointer ${
                                isTagActive 
                                  ? 'bg-foreground text-background font-semibold' 
                                  : 'bg-white/5 text-neutral-300 hover:bg-white/10 hover:text-foreground'
                              }`}
                            >
                              #{t}
                            </button>
                          );
                        })}
                      </div>

                      <div className="pt-2 border-t border-white/10 space-y-1.5 text-[11px]">
                        <div className="flex items-center gap-1.5 text-neutral-300">
                          <Cpu className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                          <span className="text-muted-foreground">Tương thích:</span>
                          <span className="font-mono text-foreground truncate" title={res.compatibility}>
                            {res.compatibility}
                          </span>
                        </div>

                        <div className="flex items-center justify-between text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <BarChart2 className="w-3.5 h-3.5 text-foreground flex-shrink-0" />
                            <span>{res.difficulty}</span>
                          </div>
                          <div className="flex items-center gap-1 font-mono text-[10px] text-neutral-500">
                            <Calendar className="w-3 h-3 flex-shrink-0" />
                            <span>Cập nhật: {res.lastChecked}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between font-mono text-[10px] text-muted-foreground pt-0.5">
                          <span className="text-neutral-200 truncate max-w-[140px]">{res.pricing}</span>
                          <span className="text-neutral-500 truncate max-w-[120px]">{res.license}</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-border flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => toggleSave(res.id, res.name)}
                          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-medium transition-all cursor-pointer ${
                            isSaved 
                              ? 'bg-muted border-foreground/30 text-foreground font-semibold' 
                              : 'bg-card border-border text-muted-foreground hover:text-foreground hover:bg-muted'
                          }`}
                          title={isSaved ? 'Đã lưu trong bộ sưu tập' : 'Lưu vào bộ sưu tập'}
                        >
                          <Bookmark className="w-3.5 h-3.5" fill={isSaved ? 'currentColor' : 'none'} />
                          <span>{isSaved ? 'Đã lưu' : 'Lưu'}</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setReportTarget({ id: res.id, title: res.name })}
                          className="p-1.5 rounded-lg border border-border bg-card text-muted-foreground hover:text-rose-500 transition cursor-pointer"
                          title="Báo cáo nội dung / liên kết hỏng"
                          aria-label={`Báo cáo ${res.name}`}
                        >
                          <Flag className="w-3.5 h-3.5" />
                        </button>
                      </div>

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
        </div>
      )}

      {/* Resource Detail Modal */}
      {detailModal && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
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
              className="bg-black border-border shadow-2xl"
            >
              <div className="p-6 space-y-5">
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
                      className="inline-flex items-center gap-1.5 text-xs text-foreground hover:underline font-mono"
                    >
                      <span>Nguồn chính thức</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>

                <p className="text-sm text-neutral-200 font-sans leading-relaxed">
                  {detailModal.description}
                </p>

                {detailModal.details && (
                  <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-1.5 text-xs">
                    <div className="text-foreground font-medium">Chi tiết kỹ thuật & triển khai:</div>
                    <p className="text-neutral-300 font-mono leading-relaxed">{detailModal.details}</p>
                  </div>
                )}

                <div className="space-y-1.5">
                  <span className="text-xs text-muted-foreground block font-medium">Thẻ từ khóa:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {detailModal.tags?.map(t => (
                      <span key={t} className="text-[11px] px-2.5 py-0.5 rounded-lg bg-white/5 text-neutral-300 border border-white/10">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs font-mono p-4 rounded-xl bg-card border border-border">
                  <div>
                    <span className="text-muted-foreground block mb-0.5">Tương thích công nghệ:</span>
                    <span className="text-foreground font-medium">{detailModal.compatibility}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block mb-0.5">Độ khó:</span>
                    <span className="text-foreground font-medium">{detailModal.difficulty}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block mb-0.5">Giấy phép & Chi phí:</span>
                    <span className="text-foreground font-medium">{detailModal.pricing} · {detailModal.license}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block mb-0.5">Kiểm tra gần nhất:</span>
                    <span className="text-foreground font-medium">{detailModal.lastChecked}</span>
                  </div>
                  <div className="col-span-2 pt-2 border-t border-white/10 flex items-center justify-between text-muted-foreground">
                    <span>Số dự án F-Forum đã tích hợp:</span>
                    <span className="text-foreground font-bold">{detailModal.useInProjectCount} dự án</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                  <button
                    onClick={() => toggleSave(detailModal.id, detailModal.name)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                      savedResources[detailModal.id]
                        ? 'bg-white/15 border-white/35 text-foreground'
                        : 'bg-white/5 border-white/10 text-neutral-300 hover:text-foreground'
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

      <ReportContentModal
        open={Boolean(reportTarget)}
        targetId={reportTarget?.id || ''}
        targetTitle={reportTarget?.title || ''}
        onClose={() => setReportTarget(null)}
        onSubmitted={(id) => {
          setReportedIds(prev => (prev.includes(id) ? prev : [...prev, id]));
          showToast('Đã gửi báo cáo kiểm duyệt cho mục đã chọn.');
        }}
      />
    </div>
  );
};
