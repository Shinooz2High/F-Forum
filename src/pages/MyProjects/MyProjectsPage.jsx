import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FolderGit2, 
  Search, 
  Plus, 
  Terminal
} from 'lucide-react';
import { GlassCard } from '../../components/macos/GlassCard';
import { Button } from '../../components/macos/Button';
import { mockProjects } from '../../data/mockProjects';
import { useTheme } from '../../context/ThemeContext';
import FileBox from '../../components/pinui/FileBox';

export const MyProjectsPage = () => {
  const { theme } = useTheme();
  const [activeFilter, setActiveFilter] = useState('Tất cả');
  const [searchQuery, setSearchQuery] = useState('');
  const [vaultHint, setVaultHint] = useState('Nhấn vào bất kỳ ngăn hồ sơ PinUI FileBox để lọc nhanh dự án.');
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
          <div className="liquid-glass inline-flex items-center gap-2 px-3 py-1 rounded-full text-muted-foreground text-xs font-medium mb-2">
            <FolderGit2 className="w-3.5 h-3.5 text-foreground" />
            <span>Không Gian Dự Án Cá Nhân & CLB</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-sans font-medium tracking-[-1.5px] text-foreground">
            Quản lý <span className="font-serif italic font-normal">Projects</span> ({mockProjects.length})
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Quản lý, mở lại phiên làm việc trong AI Workspace hoặc xuất bản mã nguồn dự án.
          </p>
        </div>

        <Link to="/quick-start">
          <Button variant="primary" size="md" icon={Plus}>
            Tạo Dự Án Mới
          </Button>
        </Link>
      </div>

      {/* PinUI FileBox Interactive Project Vault */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center rounded-3xl border border-border bg-card p-6 shadow-sm">
        <div className="lg:col-span-5 flex items-center justify-center overflow-hidden rounded-2xl bg-background/60 border border-border p-3 min-h-[280px]">
          <FileBox
            theme={theme === 'dark' ? 'dark' : 'light'}
            onPull={({ color }) => {
              const statusMap = {
                green: 'Ready to Export',
                beige: 'Draft',
                pink: 'Needs Review',
                orange: 'Building',
              };
              const picked = statusMap[color] || 'Tất cả';
              setActiveFilter(picked);
              setVaultHint(`Đã lọc nhanh nhóm dự án "${picked}" từ ngăn hồ sơ màu ${color}.`);
            }}
          />
        </div>
        <div className="lg:col-span-7 space-y-3">
          <span className="text-[11px] font-mono uppercase tracking-wider text-blue-600 dark:text-blue-400 font-semibold">
            PinUI Physical FileBox Vault
          </span>
          <h2 className="text-xl sm:text-2xl font-semibold text-foreground">
            Kho Hồ Sơ Dự Án Chống Thất Lạc
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            {vaultHint}
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            {statusFilters.map((st) => (
              <button
                key={`vault-${st}`}
                type="button"
                onClick={() => setActiveFilter(st)}
                className={`px-3 py-1 rounded-full text-xs border transition cursor-pointer ${
                  activeFilter === st
                    ? 'bg-foreground text-background border-foreground font-semibold'
                    : 'bg-background border-border text-muted-foreground hover:text-foreground'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          {statusFilters.map((st) => (
            <button
              key={st}
              onClick={() => setActiveFilter(st)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                activeFilter === st
                  ? 'bg-foreground text-background font-semibold'
                  : 'liquid-glass text-muted-foreground hover:text-foreground'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm theo tên dự án..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-card border border-border text-xs text-foreground placeholder-neutral-500 focus:outline-none focus:border-white"
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
                <span className="text-[11px] text-muted-foreground font-mono">
                  Sửa đổi: {project.lastModified}
                </span>
              </div>

              <div>
                <h3 className="font-sans font-semibold text-xl text-foreground">
                  {project.vietnameseName}
                </h3>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2 leading-relaxed">
                  {project.description}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-muted/60 border border-border text-[11px] space-y-1 font-mono">
                <p className="text-foreground">Mục tiêu: {project.blueprint.goal}</p>
                <p className="text-muted-foreground">Đối tượng: {project.blueprint.audience}</p>
              </div>
            </div>

            <div className="pt-3 border-t border-border flex items-center justify-between">
              <div className="flex items-center gap-3 text-xs text-muted-foreground font-mono">
                <span>{project.filesCount} tệp</span>
                <span>·</span>
                <span className="text-ff-jade">Checks: {project.checksPassed}</span>
              </div>

              <div className="flex items-center gap-2">
                <Button 
                  variant="primary" 
                  size="sm" 
                  icon={Terminal}
                  onClick={() => navigate('/workspace', { state: { templateTitle: project.vietnameseName, initialPrompt: `Tiếp tục chỉnh sửa dự án ${project.vietnameseName}` } })}
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
