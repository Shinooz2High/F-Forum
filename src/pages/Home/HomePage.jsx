import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  Layers, 
  Users, 
  Briefcase, 
  GraduationCap, 
  Layout, 
  BarChart3, 
  CheckSquare, 
  Palette,
  Clock,
  FolderGit2,
  Play,
  Terminal,
  ShieldCheck,
  ChevronRight,
  ChevronLeft,
  Zap,
  Globe
} from 'lucide-react';
import { Button } from '../../components/macos/Button';
import { Badge } from '../../components/macos/UIElements';
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
      {/* ================= SPATIAL LAUNCHPAD (TÂM ĐIỂM KHÔNG GIAN MỞ) ================= */}
      <section className="relative flex-1 flex flex-col items-center justify-center text-center max-w-4xl mx-auto px-4 my-auto">
        {/* Ambient Cosmic Aura */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] bg-gradient-to-tr from-ff-gold/15 via-amber-500/5 to-transparent rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 space-y-6 w-full">
          {/* Subtle status chip */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-ff-gold/30 bg-ff-gold/10 text-ff-gold-light text-xs font-mono shadow-sm">
            <span className="w-2 h-2 rounded-full bg-ff-gold animate-ping" />
            <span>Spatial Launchpad · Trạm Phóng Ý Tưởng AI</span>
          </div>

          {/* Central Bold Headline */}
          <h1 className="text-4xl sm:text-6xl font-serif font-bold text-neutral-100 tracking-tight leading-[1.15]">
            Khởi tạo bất kỳ sản phẩm web nào.
          </h1>

          <p className="text-sm sm:text-base text-neutral-300 font-sans max-w-lg mx-auto">
            Không cần viết prompt dài dòng. Nhập mong muốn của bạn hoặc bấm một tác vụ vệ tinh bên dưới để AI tự động xây dựng.
          </p>

          {/* Giant Central Glass Prompt Launcher */}
          <form onSubmit={handlePromptSubmit} className="relative max-w-2xl mx-auto pt-2">
            <div className="glass-panel p-2.5 rounded-2xl border-ff-gold/40 shadow-gold-glow/20 flex flex-col sm:flex-row gap-2 transition-all focus-within:border-ff-gold focus-within:ring-2 focus-within:ring-ff-gold/20">
              <div className="relative flex-1 flex items-center">
                <Sparkles className="w-5 h-5 text-ff-gold ml-3 absolute pointer-events-none" />
                <input
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Bạn muốn tạo gì? (vd: Trang web CLB Sinh Viên có countdown tuyển quân...)"
                  className="w-full bg-transparent pl-11 pr-4 py-3 text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none"
                />
              </div>
              <Button
                type="submit"
                variant="primary"
                size="md"
                iconRight={ArrowRight}
                className="whitespace-nowrap px-6 font-serif font-semibold text-sm"
              >
                Phóng Dự Án
              </Button>
            </div>
          </form>

          {/* Quick Suggestion Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-neutral-400 font-mono pt-1">
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
                className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 hover:text-ff-gold text-neutral-300 transition-colors cursor-pointer"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SATELLITE ORBIT RIBBON (DẢI RUY-BĂNG CUỘN NGANG) ================= */}
      <section className="space-y-3 max-w-7xl mx-auto w-full px-2">
        <div className="flex items-center justify-between text-xs font-mono text-neutral-400 px-2">
          <span className="flex items-center gap-1.5 text-ff-gold">
            <Zap className="w-3.5 h-3.5" />
            Vệ Tinh Tác Vụ Quick Start (8 Lối Tắt)
          </span>
          <span className="text-neutral-500">Cuộn ngang để khám phá tất cả</span>
        </div>

        {/* Horizontal Smooth Scroll Ribbon */}
        <div className="flex items-center gap-3.5 overflow-x-auto pb-3 pt-1 px-2 no-scrollbar scroll-smooth">
          {quickStartOptions.map((opt) => {
            const Icon = iconMap[opt.icon] || Sparkles;
            return (
              <div
                key={opt.id}
                onClick={() => handleQuickStartClick(opt)}
                className="min-w-[240px] sm:min-w-[270px] rounded-2xl glass-panel p-4 border border-white/10 hover:border-ff-gold/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-gold-glow/20 cursor-pointer flex flex-col justify-between group shrink-0"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-xl bg-white/5 group-hover:bg-ff-gold group-hover:text-black text-ff-gold flex items-center justify-center transition-all duration-200">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-neutral-400 font-mono group-hover:text-ff-gold">
                      {opt.tag}
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-sm text-neutral-100 group-hover:text-ff-gold-light transition-colors truncate">
                    {opt.vietnameseTitle}
                  </h3>

                  <p className="text-[11px] text-neutral-400 line-clamp-2 leading-relaxed">
                    {opt.description}
                  </p>
                </div>

                <div className="pt-2.5 mt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-neutral-500 group-hover:text-neutral-300">
                  <span className="font-mono">1-Click Launch</span>
                  <ArrowRight className="w-3.5 h-3.5 text-ff-gold transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= HORIZONTAL TIMELINE RAIL (TRỤC DỰ ÁN GẦN ĐÂY) ================= */}
      <section className="space-y-3 max-w-7xl mx-auto w-full px-2 pt-4">
        <div className="flex items-center justify-between text-xs font-mono text-neutral-400 px-2">
          <span className="flex items-center gap-1.5 text-neutral-200">
            <Clock className="w-3.5 h-3.5 text-ff-gold" />
            Dòng Thời Gian Dự Án Gần Đây (Timeline Rail)
          </span>
          <Link to="/projects" className="text-ff-gold hover:underline flex items-center gap-1">
            Tất cả dự án ({mockProjects.length}) <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Timeline Rail Container */}
        <div className="relative rounded-2xl glass-panel p-4 border border-white/10 bg-neutral-950/70 overflow-hidden">
          {/* Golden Horizontal Connecting Line */}
          <div className="absolute top-1/2 left-6 right-6 h-[2px] bg-gradient-to-r from-ff-gold/20 via-ff-gold/50 to-ff-gold/20 -translate-y-1/2 pointer-events-none hidden md:block" />

          {/* Project Checkpoint Nodes */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative z-10">
            {mockProjects.slice(0, 4).map((proj, idx) => (
              <div
                key={proj.id}
                onClick={() => handleOpenProjectInWorkspace(proj)}
                className="p-3.5 rounded-xl bg-neutral-900/90 border border-white/10 hover:border-ff-gold transition-all duration-200 cursor-pointer group space-y-2 hover:-translate-y-1 hover:shadow-lg"
              >
                {/* Node Status Indicator */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-ff-gold ring-4 ring-ff-gold/20 group-hover:scale-125 transition-transform" />
                    <span className="text-[10px] font-mono text-neutral-400">
                      Checkpoint #{idx + 1}
                    </span>
                  </div>
                  <span className={`text-[9px] px-2 py-0.5 rounded-full border font-mono ${proj.statusColor}`}>
                    {proj.status}
                  </span>
                </div>

                <div>
                  <h4 className="font-serif font-bold text-sm text-neutral-100 group-hover:text-ff-gold-light truncate">
                    {proj.vietnameseName}
                  </h4>
                  <p className="text-[11px] text-neutral-400 truncate mt-0.5">
                    {proj.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-neutral-500 font-mono">
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
