import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FolderGit2, 
  Search, 
  Plus, 
  Terminal, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  ArrowRight,
  MoreVertical,
  Trash2,
  Share2
} from 'lucide-react';
import { GlassCard } from '../../components/macos/GlassCard';
import { Button } from '../../components/macos/Button';
import { Badge } from '../../components/macos/UIElements';
import { Window } from '../../components/macos/Window';
import { mockProjects } from '../../data/mockProjects';

export const MyProjectsPage = () => {
  const [activeFilter, setActiveFilter] = useState('Tất cả');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const statusFilters = ['Tất cả', 'Ready to Export', 'Building', 'Needs Review', 'Draft'];

  const filteredProjects = mockProjects.filter((p) => {
    const matchStatus = activeFilter === 'Tất cả' || p.status === activeFilter;
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        p.vietnameseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-xs font-medium mb-2">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Không Gian Dự Án Cá Nhân & CLB</span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-neutral-100">
            Dự án của bạn ({mockProjects.length})
          </h1>
          <p className="text-xs text-neutral-400">
            Quản lý, mở lại phiên làm việc trong AI Workspace hoặc xuất bản mã nguồn dự án.
          </p>
        </div>

        <Link to="/quick-start">
          <Button variant="primary" size="md" icon={Plus}>
            Tạo Dự Án Mới
          </Button>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          {statusFilters.map((st) => (
            <button
              key={st}
              onClick={() => setActiveFilter(st)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                activeFilter === st
                  ? 'bg-ff-gold text-black font-semibold'
                  : 'glass-panel text-neutral-300 hover:text-white'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm theo tên dự án..."
            className="w-full pl-10 pr-4 py-2 rounded-xl glass-panel text-xs text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-ff-gold"
          />
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProjects.map((project) => (
          <GlassCard key={project.id} className="p-6 flex flex-col justify-between space-y-4 group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className={`text-[11px] px-2.5 py-0.5 rounded-full border font-mono ${project.statusColor}`}>
                  ● {project.status}
                </span>
                <span className="text-[11px] text-neutral-500 font-mono">
                  Sửa đổi: {project.lastModified}
                </span>
              </div>

              <div>
                <h3 className="font-serif font-bold text-xl text-neutral-100 group-hover:text-ff-gold-light transition-colors">
                  {project.vietnameseName}
                </h3>
                <p className="text-xs text-neutral-400 mt-1 line-clamp-2 leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Blueprint Summary Box */}
              <div className="p-3 rounded-xl bg-black/40 border border-white/5 text-[11px] space-y-1 font-mono">
                <p className="text-neutral-300">Mục tiêu: {project.blueprint.goal}</p>
                <p className="text-neutral-500">Đối tượng: {project.blueprint.audience}</p>
              </div>
            </div>

            {/* Bottom Meta & Actions */}
            <div className="pt-3 border-t border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3 text-xs text-neutral-400 font-mono">
                <span>{project.filesCount} tệp</span>
                <span>·</span>
                <span className="text-ff-jade">Checks: {project.checksPassed}</span>
              </div>

              <div className="flex items-center gap-2">
                <Button 
                  variant="primary" 
                  size="sm" 
                  icon={Terminal}
                  onClick={() => navigate('/workspace', { state: { initialPrompt: `Tiếp tục chỉnh sửa dự án ${project.vietnameseName}` } })}
                >
                  Mở Workspace
                </Button>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};
