import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  Users, 
  Briefcase, 
  GraduationCap, 
  Layout, 
  BarChart3, 
  CheckSquare, 
  Palette,
  Clock,
  ShieldCheck,
  ChevronRight,
  Zap
} from 'lucide-react';
import { Button } from '../../components/macos/Button';
import { quickStartOptions } from '../../data/quickStartOptions';
import { mockProjects } from '../../data/mockProjects';

export const HomePage = () => {
  const [prompt, setPrompt] = useState('');
  const navigate = useNavigate();

  const iconMap = {
    Sparkles,
    Users,
    Briefcase,
    GraduationCap,
    Layout,
    BarChart3,
    CheckSquare,
    Palette
  };

  const handlePromptSubmit = (e) => {
    e.preventDefault();
    if (prompt.trim()) {
      navigate('/quick-start', { state: { initialPrompt: prompt } });
    }
  };

  const handleQuickStartClick = (opt) => {
    navigate('/quick-start', { 
      state: { selectedCategory: opt.id, initialPrompt: opt.defaultPrompt } 
    });
  };

  const handleOpenProjectInWorkspace = (project) => {
    navigate('/workspace', {
      state: {
        templateTitle: project.vietnameseName,
        initialPrompt: `Tiếp tục phiên làm việc trên dự án "${project.vietnameseName}". Kiểm tra mã nguồn và cập nhật các tính năng tiếp theo.`
      }
    });
  };

  return (
    <div className="min-h-[calc(100vh-10rem)] flex flex-col justify-between py-6 space-y-12">
      {/* ================= SPATIAL LAUNCHPAD ================= */}
      <section className="relative flex-1 flex flex-col items-center justify-center text-center max-w-4xl mx-auto px-4 my-auto">
        <div className="relative z-10 space-y-6 w-full">
          {/* Status Pill */}
          <div className="liquid-glass inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono text-muted-foreground">
            <span className="w-2 h-2 rounded-full bg-foreground animate-pulse" />
            <span>Spatial Launchpad · Trạm Phóng Ý Tưởng AI</span>
          </div>

          {/* Central Headline (Inter + Instrument Serif italic accent on ASCII word) */}
          <h1 className="text-4xl sm:text-6xl font-sans font-medium text-foreground tracking-[-1.5px] leading-[1.15]">
            Khởi tạo sản phẩm từ{' '}
            <span className="font-serif italic font-normal">Launchpad</span>.
          </h1>

          <p className="text-sm sm:text-base text-muted-foreground font-sans max-w-lg mx-auto">
            Không cần viết prompt dài dòng. Nhập mong muốn của bạn hoặc chọn một tác vụ vệ tinh bên dưới để AI tự động xây dựng.
          </p>

          {/* Giant Central Glass Prompt Launcher */}
          <form onSubmit={handlePromptSubmit} className="relative max-w-2xl mx-auto pt-2">
            <div className="liquid-glass p-2.5 rounded-2xl flex flex-col sm:flex-row gap-2 transition-all focus-within:ring-1 focus-within:ring-white/30">
              <div className="relative flex-1 flex items-center">
                <Sparkles className="w-5 h-5 text-foreground ml-3 absolute pointer-events-none" />
                <input
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Bạn muốn tạo gì? (vd: Trang web CLB Sinh Viên có countdown tuyển quân...)"
                  className="w-full bg-transparent pl-11 pr-4 py-3 text-sm text-foreground placeholder-neutral-500 focus:outline-none"
                />
              </div>
              <Button
                type="submit"
                variant="primary"
                size="md"
                iconRight={ArrowRight}
                className="whitespace-nowrap px-6 font-semibold text-sm rounded-xl"
              >
                Phóng Dự Án
              </Button>
            </div>
          </form>

          {/* Quick Suggestion Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground font-mono pt-1">
            <span className="text-neutral-500">Gợi ý nhanh:</span>
            {[
              'Website CLB Tuyển Quân',
              'Portfolio Cá Nhân Kính Mờ',
              'Phòng Thi CBT Trắc Nghiệm',
              'Dashboard Quản Lý Quỹ'
            ].map(tag => (
              <button
                key={tag}
                type="button"
                onClick={() => setPrompt(tag)}
                className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 hover:text-foreground text-neutral-300 border border-white/10 transition-colors cursor-pointer"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SATELLITE ORBIT RIBBON ================= */}
      <section className="space-y-3 max-w-7xl mx-auto w-full px-2">
        <div className="flex items-center justify-between text-xs font-mono text-muted-foreground px-2">
          <span className="flex items-center gap-1.5 text-foreground">
            <Zap className="w-3.5 h-3.5" />
            Vệ Tinh Tác Vụ Quick Start (8 Lối Tắt)
          </span>
          <span className="text-neutral-500">Cuộn ngang để khám phá tất cả</span>
        </div>

        <div className="flex items-center gap-3.5 overflow-x-auto pb-3 pt-1 px-2 no-scrollbar scroll-smooth">
          {quickStartOptions.map((opt) => {
            const Icon = iconMap[opt.icon] || Sparkles;
            return (
              <div
                key={opt.id}
                onClick={() => handleQuickStartClick(opt)}
                className="min-w-[240px] sm:min-w-[270px] rounded-2xl bg-card border border-border hover:border-white/35 p-4 transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col justify-between group shrink-0"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-xl bg-white/5 group-hover:bg-foreground group-hover:text-background text-foreground border border-white/10 flex items-center justify-center transition-all duration-200">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-muted-foreground font-mono border border-white/10 group-hover:text-foreground">
                      {opt.tag}
                    </span>
                  </div>

                  <h3 className="font-sans font-semibold text-sm text-foreground truncate">
                    {opt.vietnameseTitle}
                  </h3>

                  <p className="text-[11px] text-muted-foreground line-clamp-2 leading-relaxed">
                    {opt.description}
                  </p>
                </div>

                <div className="pt-2.5 mt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-neutral-500 group-hover:text-neutral-300">
                  <span className="font-mono">1-Click Launch</span>
                  <ArrowRight className="w-3.5 h-3.5 text-foreground transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= HORIZONTAL TIMELINE RAIL ================= */}
      <section className="space-y-3 max-w-7xl mx-auto w-full px-2 pt-4">
        <div className="flex items-center justify-between text-xs font-mono text-muted-foreground px-2">
          <span className="flex items-center gap-1.5 text-foreground">
            <Clock className="w-3.5 h-3.5" />
            Dòng Thời Gian Dự Án Gần Đây (Timeline Rail)
          </span>
          <Link to="/projects" className="text-foreground hover:underline flex items-center gap-1">
            Tất cả dự án ({mockProjects.length}) <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="relative rounded-2xl bg-card/80 backdrop-blur-xl p-4 border border-border overflow-hidden">
          <div className="absolute top-1/2 left-6 right-6 h-[1px] bg-gradient-to-r from-white/5 via-white/30 to-white/5 -translate-y-1/2 pointer-events-none hidden md:block" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative z-10">
            {mockProjects.slice(0, 4).map((proj, idx) => (
              <div
                key={proj.id}
                onClick={() => handleOpenProjectInWorkspace(proj)}
                className="p-3.5 rounded-xl bg-black/80 border border-border hover:border-white/40 transition-all duration-200 cursor-pointer group space-y-2 hover:-translate-y-1 shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-foreground ring-4 ring-white/10 group-hover:scale-125 transition-transform" />
                    <span className="text-[10px] font-mono text-muted-foreground">
                      Checkpoint #{idx + 1}
                    </span>
                  </div>
                  <span className={`text-[9px] px-2 py-0.5 rounded-full border font-mono ${proj.statusColor}`}>
                    {proj.status}
                  </span>
                </div>

                <div>
                  <h4 className="font-sans font-semibold text-sm text-foreground truncate">
                    {proj.vietnameseName}
                  </h4>
                  <p className="text-[11px] text-muted-foreground truncate mt-0.5">
                    {proj.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-neutral-500 font-mono">
                  <span>Sửa: {proj.lastModified}</span>
                  <span className="text-ff-jade flex items-center gap-0.5">
                    <ShieldCheck className="w-3 h-3" /> {proj.checksPassed}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
