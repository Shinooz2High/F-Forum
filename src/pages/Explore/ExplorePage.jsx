import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Compass, 
  Search, 
  Sparkles, 
  ArrowRight, 
  Code2, 
  Layers, 
  Laptop,
  Smartphone,
  ExternalLink,
  RotateCcw,
  BookOpen,
  FolderGit2,
  Cpu,
  Check,
  Copy,
  Flag
} from 'lucide-react';
import { Button } from '../../components/macos/Button';
import { Badge } from '../../components/macos/UIElements';
import { Window } from '../../components/macos/Window';
import { mockTemplates } from '../../data/mockTemplates';
import { mockResources } from '../../data/mockResources';
import { useTheme } from '../../context/ThemeContext';
import Chips from '../../components/pinui/Chips';
import ReportContentModal from '../../components/public-web/ReportContentModal';

export const ExplorePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useTheme();

  const [viewMode, setViewMode] = useState(() => {
    const params = new URLSearchParams(location.search);
    return params.get('tab') === 'resources' ? 'resources' : 'templates';
  });
  const [selectedStyle, setSelectedStyle] = useState('Tất cả');
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [searchQuery, setSearchQuery] = useState(() => location.state?.highlightQuery || '');
  const [reportTarget, setReportTarget] = useState(null);

  const [activeTemplate, setActiveTemplate] = useState(mockTemplates[0]);
  const [liveStageDevice, setLiveStageDevice] = useState('desktop');
  const [liveCountdown, setLiveCountdown] = useState(12);
  const [copiedCodeId, setCopiedCodeId] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 120);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const designStyles = ['Tất cả', 'Cyber-Academic', 'macOS Sonoma', 'Minimalist Bento', 'Dark Elegance'];

  const filteredTemplates = mockTemplates.filter(t => {
    const matchStyle = selectedStyle === 'Tất cả' || t.designStyle === selectedStyle;
    const matchQuery = !searchQuery.trim() || 
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.vietnameseTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchStyle && matchQuery;
  });

  const filteredResources = mockResources.filter(r => {
    const matchCat = selectedCategory === 'Tất cả' || r.category === selectedCategory;
    const matchQuery = !searchQuery.trim() || 
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.tags?.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCat && matchQuery;
  });

  const handleLaunchToWorkspace = (template) => {
    navigate('/workspace', {
      state: {
        templateId: template.id,
        templateTitle: template.vietnameseTitle,
        initialPrompt: `Khởi tạo dự án từ mẫu "${template.vietnameseTitle} (${template.title})" với phong cách ${template.designStyle}.`
      }
    });
  };

  const handleUseResourceInProject = (resource) => {
    navigate('/workspace', {
      state: {
        initialPrompt: `Tích hợp tài nguyên "${resource.name}" (${resource.category}) vào dự án Workspace. Yêu cầu: ${resource.description}`
      }
    });
  };

  const handleCopyCode = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  return (
    <div className="space-y-8 pb-20">
      {/* Top Header */}
      <div className="text-center max-w-3xl mx-auto space-y-2.5 pt-2">
        <div className="liquid-glass inline-flex items-center gap-2 px-3 py-1 rounded-full text-muted-foreground text-xs font-medium">
          <Compass className="w-3.5 h-3.5 text-foreground" />
          <span>Interactive Showcase Studio · Sân Khấu Khám Phá</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-sans font-medium tracking-[-1.5px] text-foreground">
          Xưởng trưng bày <span className="font-serif italic font-normal">Showcase</span> & Bento
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Chuyển đổi giữa Kho Template UI/UX bất đối xứng và Dòng chảy Bento 8 nhóm tài nguyên chuẩn hóa.
        </p>
      </div>

      {/* ================= FLOATING COMMAND DOCK ================= */}
      <div 
        className={`sticky top-20 z-30 transition-all duration-300 max-w-5xl mx-auto px-2 ${
          isScrolled ? 'py-1' : 'py-2'
        }`}
      >
        <div className="liquid-glass bg-card/90 border border-border rounded-2xl p-2 sm:p-2.5 flex flex-wrap items-center justify-between gap-3 shadow-lg">
          {/* View Mode Switcher */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-black border border-border text-xs">
            <button
              onClick={() => setViewMode('templates')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                viewMode === 'templates'
                  ? 'bg-foreground text-background shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Kho Template UI/UX</span>
            </button>
            <button
              onClick={() => setViewMode('resources')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                viewMode === 'resources'
                  ? 'bg-foreground text-background shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Bento Tài Nguyên ({mockResources.length})</span>
            </button>
          </div>

          {/* Search Input */}
          <div className="relative flex-1 min-w-[200px] max-w-xs">
            <Search className="w-3.5 h-3.5 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder={viewMode === 'templates' ? 'Tìm mẫu theo tên, phong cách...' : 'Tìm tài nguyên, tech, tag...'}
              className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-background border border-border text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Quick Filters Pill Strip */}
          <div className="hidden md:flex items-center gap-1.5 overflow-x-auto text-xs">
            {viewMode === 'templates' ? (
              designStyles.map(st => (
                <button
                  key={st}
                  onClick={() => setSelectedStyle(st)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] transition-all cursor-pointer ${
                    selectedStyle === st 
                      ? 'bg-foreground text-background font-semibold' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {st}
                </button>
              ))
            ) : (
              ['Tất cả', 'AI Tools', 'Prompts', 'GitHub Repositories', 'UI/UX'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] transition-all cursor-pointer ${
                    selectedCategory === cat 
                      ? 'bg-foreground text-background font-semibold' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {cat}
                </button>
              ))
            )}
          </div>
        </div>
      </div>

      {/* ================= VIEW MODE 1: SPLIT STAGE 60/40 FOR TEMPLATES ================= */}
      {viewMode === 'templates' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT 60%: Staggered Cascade Waterfall List */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between text-xs font-mono text-muted-foreground px-1">
              <span>Danh sách mẫu xếp so le ({filteredTemplates.length})</span>
              <span>Di chuột hoặc click để xem trước trực tiếp</span>
            </div>

            <div className="space-y-4">
              {filteredTemplates.map((template) => {
                const isSelected = activeTemplate.id === template.id;
                const isWide = template.cardFormat === 'wide';
                const isVertical = template.cardFormat === 'vertical';

                return (
                  <div
                    key={template.id}
                    onMouseEnter={() => setActiveTemplate(template)}
                    onClick={() => setActiveTemplate(template)}
                    className={`rounded-2xl transition-all duration-300 border cursor-pointer overflow-hidden p-4 group bg-card ${
                      isSelected 
                        ? 'border-blue-500/60 shadow-md ring-1 ring-blue-500/20' 
                        : 'border-border hover:border-blue-500/35'
                    }`}
                  >
                    {isWide ? (
                      <div className="flex flex-col sm:flex-row gap-4 items-center">
                        <div className="w-full sm:w-44 h-24 rounded-xl overflow-hidden relative shrink-0 bg-muted">
                          <img 
                            src={template.previewImage} 
                            alt={template.title}
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300" 
                          />
                          <span className="absolute top-1.5 left-1.5 text-[9px] px-2 py-0.5 rounded-full bg-card/90 backdrop-blur text-foreground font-mono border border-border">
                            Banner Ngang
                          </span>
                        </div>
                        <div className="flex-1 space-y-1.5 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] text-muted-foreground font-mono uppercase">{template.designStyle}</span>
                            <span className="text-[10px] text-foreground font-mono">★ {template.rating}</span>
                          </div>
                          <h3 className="font-sans font-semibold text-base text-foreground truncate">
                            {template.vietnameseTitle}
                          </h3>
                          <p className="text-xs text-muted-foreground line-clamp-1">
                            {template.description}
                          </p>
                          <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-mono pt-1">
                            <span>FPS: {template.fps}</span> · <span>Dung lượng: {template.bundleSize}</span>
                          </div>
                        </div>
                      </div>
                    ) : isVertical ? (
                      <div className="flex gap-4 items-center">
                        <div className="w-20 h-28 rounded-xl overflow-hidden border border-border relative shrink-0 bg-muted">
                          <img 
                            src={template.previewImage} 
                            alt={template.title}
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300" 
                          />
                          <span className="absolute top-1 left-1 text-[8px] px-1 rounded bg-card/90 text-foreground font-mono border border-border">
                            Mobile
                          </span>
                        </div>
                        <div className="flex-1 space-y-1.5 min-w-0">
                          <div className="flex items-center gap-2">
                            <Badge variant="gold" size="xs">Mobile Touch</Badge>
                            <span className="text-[10px] text-muted-foreground font-mono">{template.designStyle}</span>
                          </div>
                          <h3 className="font-sans font-semibold text-base text-foreground">
                            {template.vietnameseTitle}
                          </h3>
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {template.description}
                          </p>
                          <div className="flex items-center gap-2 pt-1">
                            {template.techStack.map(ts => (
                              <span key={ts} className="text-[9px] px-1.5 py-0.5 rounded bg-muted border border-border text-muted-foreground font-mono">
                                {ts}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="h-36 sm:h-44 rounded-xl overflow-hidden relative bg-muted">
                          <img 
                            src={template.previewImage} 
                            alt={template.title}
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500" 
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />
                          <div className="absolute top-2 left-2 flex items-center gap-2">
                            <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-card/90 backdrop-blur text-foreground font-mono border border-border">
                              Full Landing Page
                            </span>
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-card/85 backdrop-blur text-muted-foreground font-mono border border-border">
                              {template.designStyle}
                            </span>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <h3 className="font-sans font-semibold text-lg text-foreground">
                              {template.vietnameseTitle}
                            </h3>
                            <span className="text-xs text-foreground font-mono">★ {template.rating}</span>
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                            {template.description}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT 40%: Sticky Live Stage */}
          <div className="lg:col-span-5 sticky top-32 space-y-4">
            <Window 
              title={`Live Stage — ${activeTemplate.vietnameseTitle}`}
              subtitle={activeTemplate.demoUrl}
              className="border-border shadow-2xl bg-card"
              headerRight={
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setLiveStageDevice('desktop')}
                    className={`p-1 rounded cursor-pointer ${liveStageDevice === 'desktop' ? 'bg-foreground text-background' : 'text-muted-foreground hover:text-foreground'}`}
                    title="Xem trên Desktop"
                  >
                    <Laptop className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setLiveStageDevice('mobile')}
                    className={`p-1 rounded cursor-pointer ${liveStageDevice === 'mobile' ? 'bg-foreground text-background' : 'text-muted-foreground hover:text-foreground'}`}
                    title="Xem trên Mobile"
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setLiveCountdown(prev => prev + 1)}
                    className="p-1 rounded text-muted-foreground hover:text-foreground cursor-pointer"
                    title="Làm mới demo"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>
              }
            >
              <div className="p-4 bg-muted/40 space-y-4">
                <div className={`mx-auto transition-all duration-300 ${
                  liveStageDevice === 'mobile' 
                    ? 'w-64 rounded-2xl p-3 border-2 border-border bg-card shadow-xl' 
                    : 'w-full rounded-xl p-4 border border-border bg-card'
                }`}>
                  <div className="space-y-3 text-center">
                    <div className="liquid-glass inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-foreground text-[10px] font-mono">
                      <Sparkles className="w-3 h-3" />
                      <span>{activeTemplate.badge}</span>
                    </div>

                    <h4 className="font-sans font-semibold text-lg text-foreground">
                      {activeTemplate.vietnameseTitle}
                    </h4>

                    <p className="text-[11px] text-muted-foreground line-clamp-2">
                      {activeTemplate.description}
                    </p>

                    <div className="p-2 rounded-lg bg-muted border border-border font-mono text-[10px] text-foreground">
                      Countdown: {liveCountdown} Ngày · 08 Giờ · 45 Phút
                    </div>

                    <div className="flex justify-center gap-2 pt-1">
                      <button 
                        onClick={() => alert(`Đã kích hoạt thử nghiệm tương tác của mẫu: ${activeTemplate.vietnameseTitle}`)}
                        className="px-4 py-1.5 rounded-full bg-foreground text-background font-semibold text-xs shadow-sm hover:opacity-90 active:scale-95 cursor-pointer"
                      >
                        Tương Tác Thử Nghiệm
                      </button>
                    </div>
                  </div>
                </div>

                {/* Spec Bar */}
                <div className="p-3 rounded-xl bg-muted/60 border border-border space-y-2 text-xs font-mono">
                  <div className="flex items-center justify-between text-foreground">
                    <span className="text-muted-foreground">Độ phân giải:</span>
                    <span className="text-ff-jade">{activeTemplate.responsiveScore}</span>
                  </div>
                  <div className="flex items-center justify-between text-foreground">
                    <span className="text-muted-foreground">Bundle size:</span>
                    <span>{activeTemplate.bundleSize} (Vite build)</span>
                  </div>
                  <div className="flex items-center justify-between text-foreground">
                    <span className="text-muted-foreground">Hiệu năng mượt mà:</span>
                    <span className="text-foreground">{activeTemplate.fps} FPS Canvas</span>
                  </div>
                  <div className="flex items-center justify-between text-foreground">
                    <span className="text-muted-foreground">Phong cách:</span>
                    <span>{activeTemplate.designStyle}</span>
                  </div>
                </div>

                <Button
                  variant="primary"
                  size="lg"
                  iconRight={ArrowRight}
                  className="w-full font-semibold tracking-wide"
                  onClick={() => handleLaunchToWorkspace(activeTemplate)}
                >
                  Đẩy Thẳng Vào Workspace
                </Button>
              </div>
            </Window>
          </div>
        </div>
      )}

      {/* ================= VIEW MODE 2: BENTO FLOW FOR 8 RESOURCE CATEGORIES ================= */}
      {viewMode === 'resources' && (
        <div className="space-y-6">
          <div className="p-4 rounded-3xl border border-border bg-card space-y-3 overflow-x-auto">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="font-semibold text-foreground">
                Bộ lọc 8 nhóm tài nguyên (PinUI Extruded 3D Chips)
              </span>
              {selectedCategory !== 'Tất cả' && (
                <button
                  type="button"
                  onClick={() => setSelectedCategory('Tất cả')}
                  className="text-xs text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                >
                  Hiển thị tất cả ({mockResources.length})
                </button>
              )}
            </div>
            <Chips
              theme={theme === 'dark' ? 'dark' : 'light'}
              rows={2}
              defaultValue={selectedCategory === 'Tất cả' ? null : selectedCategory}
              onChange={(val) => setSelectedCategory(val || 'Tất cả')}
            />
          </div>

          <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
            <span>Dòng chảy Bento 8 nhóm tài nguyên ({filteredResources.length} mục)</span>
            <span>Phân hóa theo công năng: Wide Strip, Snippet &amp; Visual</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredResources.map((resource) => {
              const isWideStrip = resource.category === 'GitHub Repositories' || resource.category === 'Development Tools' || resource.category === 'Dev Tools';
              const isCodeSnippet = resource.category === 'Prompts' || resource.category === 'Skills & Rules';

              if (isWideStrip) {
                return (
                  <div 
                    key={resource.id} 
                    className="md:col-span-2 lg:col-span-3 rounded-2xl bg-card p-5 border border-border hover:border-blue-500/40 transition-all space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-muted border border-border text-foreground flex items-center justify-center">
                          <FolderGit2 className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-sans font-semibold text-base text-foreground">
                              {resource.name}
                            </h3>
                            <Badge variant="jade" size="xs">
                              {resource.verificationStatus || 'Đã Xác Minh'}
                            </Badge>
                          </div>
                          <span className="text-[11px] text-muted-foreground font-mono">{resource.category}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <a 
                          href={resource.sourceUrl} 
                          target="_blank" 
                          rel="noreferrer"
                          className="p-1.5 rounded-lg bg-muted/60 hover:bg-muted text-foreground border border-border text-xs flex items-center gap-1"
                        >
                          <ExternalLink className="w-3.5 h-3.5" /> Nguồn
                        </a>
                        <button
                          type="button"
                          onClick={() => setReportTarget({ id: resource.id, title: resource.name })}
                          className="p-1.5 rounded-lg bg-card hover:bg-muted text-muted-foreground hover:text-rose-500 border border-border text-xs cursor-pointer"
                          title="Báo cáo nội dung"
                        >
                          <Flag className="w-3.5 h-3.5" />
                        </button>
                        <Button 
                          variant="primary" 
                          size="sm" 
                          iconRight={ArrowRight}
                          onClick={() => handleUseResourceInProject(resource)}
                        >
                          Use in Project
                        </Button>
                      </div>
                    </div>

                    <p className="text-xs text-muted-foreground leading-relaxed font-sans">
                      {resource.description}
                    </p>

                    <div className="p-3 rounded-xl bg-muted/50 border border-border flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-muted-foreground">
                      <div>
                        <span>Tương thích:</span> <span className="text-foreground">{resource.compatibility}</span>
                      </div>
                      <div>
                        <span>Giấy phép:</span> <span className="text-foreground">{resource.license}</span>
                      </div>
                      <div>
                        <span>Chi phí:</span> <span className="text-foreground">{resource.pricing}</span>
                      </div>
                      <div>
                        <span>Kiểm tra:</span> <span className="text-foreground">{resource.lastChecked}</span>
                      </div>
                    </div>
                  </div>
                );
              }

              if (isCodeSnippet) {
                const sampleSnippet = resource.category === 'Prompts' 
                  ? `PROMPT_BLUEPRINT = {\n  goal: "${resource.name}",\n  audience: "Students & Clubs",\n  format: "Liquid Glass React",\n  output: "Export ZIP"\n};`
                  : `// .agent/rules/skill.json\n{\n  "name": "${resource.name}",\n  "verified": true,\n  "engine": "F-Forum AI"\n}`;

                return (
                  <div 
                    key={resource.id} 
                    className="rounded-2xl bg-card p-5 border border-border hover:border-blue-500/40 transition-all flex flex-col justify-between space-y-3"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Badge variant="gold" size="xs">{resource.category}</Badge>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setReportTarget({ id: resource.id, title: resource.name })}
                            className="text-muted-foreground hover:text-rose-500 cursor-pointer"
                            title="Báo cáo nội dung"
                          >
                            <Flag className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleCopyCode(resource.id, sampleSnippet)}
                            className="text-[11px] text-muted-foreground hover:text-foreground flex items-center gap-1 cursor-pointer"
                          >
                            {copiedCodeId === resource.id ? <Check className="w-3.5 h-3.5 text-ff-jade" /> : <Copy className="w-3.5 h-3.5" />}
                            <span>{copiedCodeId === resource.id ? 'Đã Chép' : 'Sao Chép'}</span>
                          </button>
                        </div>
                      </div>

                      <h3 className="font-sans font-semibold text-base text-foreground">
                        {resource.name}
                      </h3>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {resource.description}
                      </p>

                      <div className="p-3 rounded-xl bg-zinc-950 font-mono text-[11px] text-zinc-200 border border-border overflow-x-auto leading-relaxed">
                        <pre>{sampleSnippet}</pre>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-border flex items-center justify-between">
                      <span className="text-[10px] text-muted-foreground font-mono">{resource.difficulty}</span>
                      <Button 
                        variant="primary" 
                        size="sm"
                        onClick={() => handleUseResourceInProject(resource)}
                      >
                        Gắn Vào Dự Án
                      </Button>
                    </div>
                  </div>
                );
              }

              return (
                <div 
                  key={resource.id} 
                  className="rounded-2xl bg-card p-5 border border-border hover:border-blue-500/40 transition-all flex flex-col justify-between space-y-3 group"
                >
                  <div className="space-y-3">
                    <div className="h-28 rounded-xl bg-muted/60 border border-border relative overflow-hidden flex items-center justify-center">
                      <Cpu className="w-10 h-10 text-foreground/80 group-hover:scale-110 transition-transform duration-300" />
                      <span className="absolute top-2 right-2 text-[10px] px-2 py-0.5 rounded-full bg-card border border-border text-foreground font-mono">
                        {resource.pricing}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] text-muted-foreground font-mono uppercase">{resource.category}</span>
                      <h3 className="font-sans font-semibold text-base text-foreground mt-0.5">
                        {resource.name}
                      </h3>
                      <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                        {resource.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {resource.tags?.slice(0, 3).map(t => (
                        <span key={t} className="text-[9px] px-2 py-0.5 rounded bg-muted border border-border text-muted-foreground font-mono">
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-border flex items-center justify-between gap-2">
                    <span className="text-[10px] text-ff-jade font-mono truncate">● {resource.verificationStatus}</span>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => setReportTarget({ id: resource.id, title: resource.name })}
                        className="p-1.5 rounded-lg border border-border bg-background text-muted-foreground hover:text-rose-500 cursor-pointer"
                        title="Báo cáo nội dung"
                      >
                        <Flag className="w-3.5 h-3.5" />
                      </button>
                      <Button 
                        variant="primary" 
                        size="sm"
                        onClick={() => handleUseResourceInProject(resource)}
                      >
                        Dùng Trong Dự Án
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <ReportContentModal
        open={Boolean(reportTarget)}
        targetId={reportTarget?.id || ''}
        targetTitle={reportTarget?.title || ''}
        onClose={() => setReportTarget(null)}
      />
    </div>
  );
};
