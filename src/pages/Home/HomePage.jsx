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
  ChevronRight
} from 'lucide-react';
import { Window } from '../../components/macos/Window';
import { GlassCard } from '../../components/macos/GlassCard';
import { Button } from '../../components/macos/Button';
import { Badge } from '../../components/macos/UIElements';
import { quickStartOptions } from '../../data/quickStartOptions';
import { mockTemplates } from '../../data/mockTemplates';
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
    navigate('/quick-start', { state: { selectedCategory: opt.id, initialPrompt: opt.defaultPrompt } });
  };

  return (
    <div className="space-y-12">
      {/* ================= HERO PROMPT BOX ================= */}
      <section className="text-center max-w-3xl mx-auto space-y-6 pt-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-ff-gold/30 bg-ff-gold/10 text-ff-gold-light text-xs font-medium">
          <Sparkles className="w-3.5 h-3.5" />
          <span>F-Forum macOS Studio · Khởi Tạo Dự Án Mới</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-neutral-100 tracking-tight leading-tight">
          Bạn muốn tạo sản phẩm gì hôm nay?
        </h1>

        <p className="text-sm text-neutral-400 font-sans max-w-xl mx-auto">
          Mô tả ý tưởng của bạn bằng ngôn ngữ tự nhiên hoặc chọn một tác vụ Quick Start bên dưới để bắt đầu ngay lập tức.
        </p>

        {/* Central Search / Prompt Box */}
        <form onSubmit={handlePromptSubmit} className="relative max-w-2xl mx-auto">
          <div className="glass-panel p-2 rounded-2xl border-ff-gold/30 shadow-gold-glow/20 flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1 flex items-center">
              <Sparkles className="w-4 h-4 text-ff-gold ml-3 absolute pointer-events-none" />
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Ví dụ: Tạo website giới thiệu CLB AI & Vibe Coding cho sinh viên..."
                className="w-full bg-transparent pl-10 pr-4 py-3 text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none"
              />
            </div>
            <Button
              type="submit"
              variant="primary"
              size="md"
              iconRight={ArrowRight}
              className="whitespace-nowrap"
            >
              Tiến Hành
            </Button>
          </div>
        </form>

        <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-neutral-400">
          <span className="font-mono text-neutral-500">Gợi ý:</span>
          <button 
            onClick={() => setPrompt('Website CLB Tin Học tuyển thành viên')} 
            className="hover:text-ff-gold underline decoration-dotted"
          >
            Website CLB Tuyển Quân
          </button>
          <span>·</span>
          <button 
            onClick={() => setPrompt('Portfolio cá nhân lập trình viên')} 
            className="hover:text-ff-gold underline decoration-dotted"
          >
            Portfolio Cá Nhân
          </button>
          <span>·</span>
          <button 
            onClick={() => setPrompt('Ứng dụng trắc nghiệm luyện thi CBT')} 
            className="hover:text-ff-gold underline decoration-dotted"
          >
            Ứng Dụng Thi CBT
          </button>
        </div>
      </section>

      {/* ================= 8 QUICK START BUTTONS ================= */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-serif font-bold text-neutral-100">
              Tác Vụ Bắt Đầu Nhanh (Quick Start)
            </h2>
            <Badge variant="gold" size="xs">8 Tác Vụ</Badge>
          </div>
          <Link to="/quick-start" className="text-xs text-ff-gold hover:underline flex items-center gap-1">
            Mở bảng hỏi Quick Start <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickStartOptions.map((opt) => {
            const IconComponent = iconMap[opt.icon] || Sparkles;
            return (
              <GlassCard
                key={opt.id}
                onClick={() => handleQuickStartClick(opt)}
                className="flex flex-col justify-between p-5 group hover:border-ff-gold/50"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-white/5 group-hover:bg-ff-gold group-hover:text-black text-ff-gold flex items-center justify-center transition-all duration-300">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-neutral-400 group-hover:text-ff-gold transition-colors">
                      {opt.tag}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-serif font-bold text-base text-neutral-100 group-hover:text-ff-gold-light transition-colors">
                      {opt.vietnameseTitle}
                    </h3>
                    <p className="text-xs text-neutral-400 mt-1 line-clamp-2">
                      {opt.description}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs text-neutral-500 group-hover:text-neutral-300 mt-3">
                  <span>Khởi tạo tự động</span>
                  <ArrowRight className="w-3.5 h-3.5 text-ff-gold transform group-hover:translate-x-1 transition-transform" />
                </div>
              </GlassCard>
            );
          })}
        </div>
      </section>

      {/* ================= RECENT PROJECTS & FEATURED TEMPLATES ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Projects Window (Left 7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-serif font-bold text-neutral-100 flex items-center gap-2">
              <FolderGit2 className="w-4 h-4 text-ff-gold" />
              <span>Dự Án Gần Đây</span>
            </h2>
            <Link to="/projects" className="text-xs text-neutral-400 hover:text-white">
              Xem tất cả ({mockProjects.length})
            </Link>
          </div>

          <Window title="My Projects Workspace" subtitle="C:\F-Forum\Projects" className="border-white/10">
            <div className="divide-y divide-white/5">
              {mockProjects.slice(0, 3).map((project) => (
                <div 
                  key={project.id}
                  className="p-4 hover:bg-white/[0.03] transition-colors flex items-center justify-between gap-4"
                >
                  <div className="min-w-0 space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium text-sm text-neutral-100 truncate">
                        {project.vietnameseName}
                      </h4>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full border ${project.statusColor}`}>
                        {project.status}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-400 truncate max-w-md">
                      {project.description}
                    </p>
                    <div className="flex items-center gap-4 text-[11px] text-neutral-500 font-mono">
                      <span>Cập nhật: {project.lastModified}</span>
                      <span>·</span>
                      <span>Kiểm tra: {project.checksPassed}</span>
                    </div>
                  </div>

                  <Link to="/workspace">
                    <Button variant="secondary" size="sm" icon={Terminal}>
                      Mở Studio
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </Window>
        </div>

        {/* Featured Templates (Right 5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-serif font-bold text-neutral-100 flex items-center gap-2">
              <Layers className="w-4 h-4 text-purple-400" />
              <span>Mẫu Dự Án Nổi Bật</span>
            </h2>
            <Link to="/templates" className="text-xs text-neutral-400 hover:text-white">
              Kho mẫu →
            </Link>
          </div>

          <div className="space-y-4">
            {mockTemplates.slice(0, 2).map((tpl) => (
              <GlassCard key={tpl.id} className="p-4 flex gap-4 items-center group">
                <img 
                  src={tpl.previewImage} 
                  alt={tpl.vietnameseTitle} 
                  className="w-20 h-20 rounded-xl object-cover shrink-0" 
                />
                <div className="min-w-0 flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-ff-gold font-mono">{tpl.category}</span>
                    <span className="text-[10px] text-neutral-400">★ {tpl.rating}</span>
                  </div>
                  <h4 className="font-serif font-bold text-sm text-neutral-100 group-hover:text-ff-gold-light transition-colors truncate">
                    {tpl.vietnameseTitle}
                  </h4>
                  <p className="text-xs text-neutral-400 line-clamp-1">
                    {tpl.description}
                  </p>
                  <Link to="/workspace" className="inline-block pt-1">
                    <span className="text-xs font-semibold text-ff-gold hover:underline flex items-center gap-1">
                      Sử dụng mẫu này <ArrowRight className="w-3 h-3" />
                    </span>
                  </Link>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
