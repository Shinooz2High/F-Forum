import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Layers, 
  ArrowRight, 
  Check, 
  Eye
} from 'lucide-react';
import { GlassCard } from '../../components/macos/GlassCard';
import { Button } from '../../components/macos/Button';
import { Badge } from '../../components/macos/UIElements';
import { Window } from '../../components/macos/Window';
import { mockTemplates } from '../../data/mockTemplates';

export const TemplatesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [previewTemplate, setPreviewTemplate] = useState(null);
  const navigate = useNavigate();

  const categories = ['Tất cả', 'Websites', 'Web Apps'];

  const filteredTemplates = mockTemplates.filter(t => 
    selectedCategory === 'Tất cả' || t.category === selectedCategory
  );

  const handleUseTemplate = (tpl) => {
    navigate('/workspace', { 
      state: { 
        templateId: tpl.id, 
        templateTitle: tpl.vietnameseTitle,
        initialPrompt: `Tôi muốn khởi tạo dự án dựa trên mẫu "${tpl.vietnameseTitle} (${tpl.title})". Hãy thiết lập cấu trúc mã nguồn ban đầu.`
      } 
    });
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="liquid-glass inline-flex items-center gap-2 px-3 py-1 rounded-full text-muted-foreground text-xs font-medium">
          <Layers className="w-3.5 h-3.5 text-foreground" />
          <span>Kho Mẫu Dự Án Khởi Đầu</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-sans font-medium tracking-[-1.5px] text-foreground">
          Kho <span className="font-serif italic font-normal">Templates</span> tuyển chọn
        </h1>
        <p className="text-sm text-muted-foreground">
          Các mẫu website và ứng dụng đã được cấu trúc sẵn, tối ưu hóa giao diện và kiểm thử an toàn trước khi bàn giao.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-center gap-2">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-foreground text-background font-semibold shadow-sm'
                : 'liquid-glass text-muted-foreground hover:text-foreground'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((tpl) => (
          <GlassCard key={tpl.id} className="p-0 overflow-hidden flex flex-col justify-between group">
            <div className="relative h-48 overflow-hidden bg-black">
              <img 
                src={tpl.previewImage} 
                alt={tpl.vietnameseTitle}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500 opacity-85" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
              <span className="absolute top-3 left-3 text-[10px] px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md text-foreground border border-white/20 font-medium">
                {tpl.badge}
              </span>
              <span className="absolute top-3 right-3 text-[10px] px-2 py-0.5 rounded-md bg-black/75 text-muted-foreground font-mono">
                {tpl.difficulty}
              </span>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <h3 className="font-sans font-semibold text-lg text-foreground">
                  {tpl.vietnameseTitle}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                  {tpl.description}
                </p>
              </div>

              <div className="space-y-1.5 pt-2 border-t border-white/10">
                {tpl.features.slice(0, 3).map((f, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-[11px] text-neutral-300">
                    <Check className="w-3.5 h-3.5 text-ff-jade shrink-0" />
                    <span className="truncate">{f}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex items-center gap-2">
                <Button 
                  variant="secondary" 
                  size="sm" 
                  icon={Eye}
                  onClick={() => setPreviewTemplate(tpl)}
                  className="flex-1"
                >
                  Xem Chi Tiết
                </Button>
                <Button 
                  variant="primary" 
                  size="sm" 
                  iconRight={ArrowRight}
                  onClick={() => handleUseTemplate(tpl)}
                  className="flex-1"
                >
                  Dùng Mẫu
                </Button>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Template Detail Modal */}
      {previewTemplate && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setPreviewTemplate(null)}
        >
          <div 
            className="w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <Window 
              title={previewTemplate.vietnameseTitle} 
              subtitle={previewTemplate.category}
              onClose={() => setPreviewTemplate(null)}
              className="bg-black border-border"
            >
              <div className="p-6 space-y-6">
                <img 
                  src={previewTemplate.previewImage} 
                  alt={previewTemplate.vietnameseTitle}
                  className="w-full h-56 rounded-xl object-cover border border-white/10" 
                />

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-sans font-semibold text-foreground">
                      {previewTemplate.vietnameseTitle}
                    </h2>
                    <span className="text-xs text-muted-foreground font-mono">Đã dùng: {previewTemplate.usesCount} lần</span>
                  </div>
                  <p className="text-sm text-neutral-300 font-sans leading-relaxed">
                    {previewTemplate.description}
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                    Tính Năng Đã Tích Hợp
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {previewTemplate.features.map((f, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-neutral-200 p-2 rounded-lg bg-white/5 border border-white/5">
                        <Check className="w-4 h-4 text-ff-jade shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                    Công Nghệ Sử Dụng
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {previewTemplate.techStack.map(t => (
                      <Badge key={t} variant="gold" size="sm">{t}</Badge>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
                  <Button variant="ghost" size="md" onClick={() => setPreviewTemplate(null)}>
                    Đóng Lại
                  </Button>
                  <Button 
                    variant="primary" 
                    size="md" 
                    iconRight={ArrowRight}
                    onClick={() => handleUseTemplate(previewTemplate)}
                  >
                    Bắt Đầu Với Mẫu Này
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
