import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Compass, 
  Search, 
  Sparkles, 
  ArrowRight, 
  Globe, 
  Code, 
  Layers, 
  ShieldCheck, 
  SlidersHorizontal,
  Flame
} from 'lucide-react';
import { GlassCard } from '../../components/macos/GlassCard';
import { Button } from '../../components/macos/Button';
import { Badge } from '../../components/macos/UIElements';

export const ExplorePage = () => {
  const [activeCategory, setActiveCategory] = useState('Tất cả');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const categories = ['Tất cả', 'Websites', 'Web Apps', 'Câu Lạc Bộ', 'Học Thuật', 'Thương Mại'];

  const ideas = [
    {
      id: 'idea-1',
      title: 'Cổng Thông Tin Tuyển Quân CLB Sinh Viên',
      category: 'Câu Lạc Bộ',
      difficulty: 'Người mới',
      badge: 'Thịnh hành',
      description: 'Trang landing giới thiệu mục tiêu, các ban chuyên môn, countdown đếm ngược và tích hợp form tuyển thành viên thế hệ mới.',
      estimatedTime: '5 phút AI Build',
      prompt: 'Tạo website tuyển quân cho CLB Sinh Viên với hero countdown và form đăng ký tuyển thành viên'
    },
    {
      id: 'idea-2',
      title: 'Đấu Trường Thi Thử Trắc Nghiệm CBT 1vs1',
      category: 'Học Thuật',
      difficulty: 'Trung bình',
      badge: 'F-Forum CBT',
      description: 'Ứng dụng phòng thi trắc nghiệm học thuật với ngân hàng câu hỏi, đồng hồ bấm giờ chuẩn hóa và xếp hạng kết quả thi.',
      estimatedTime: '8 phút AI Build',
      prompt: 'Tạo ứng dụng thi trắc nghiệm CBT có đồng hồ đếm ngược và chấm điểm tự động'
    },
    {
      id: 'idea-3',
      title: 'Portfolio Kỹ Sư AI & Vibe Coder',
      category: 'Websites',
      difficulty: 'Người mới',
      badge: 'macOS Liquid',
      description: 'Trang cá nhân phong cách Apple với hiệu ứng kính mờ, showcase các dự án AI-built và liên kết mạng xã hội cá nhân.',
      estimatedTime: '4 phút AI Build',
      prompt: 'Tạo portfolio cá nhân phong cách macOS liquid với danh sách dự án và liên hệ'
    },
    {
      id: 'idea-4',
      title: 'Bảng Điều Khiển Quản Lý Quỹ & Sự Kiện CLB',
      category: 'Web Apps',
      difficulty: 'Nâng cao',
      badge: 'Quản trị',
      description: 'Dashboard nội bộ dành cho Ban Chủ Nhiệm CLB để theo dõi tiến độ sự kiện, điểm danh hội viên và thu chi quỹ.',
      estimatedTime: '10 phút AI Build',
      prompt: 'Tạo dashboard quản lý sự kiện và thành viên câu lạc bộ với bảng thống kê và bộ lọc'
    },
    {
      id: 'idea-5',
      title: 'Sổ Lưu Bút Kỷ Yếu & Ký Ức Học Đường',
      category: 'Websites',
      difficulty: 'Người mới',
      badge: 'Kế thừa F-Forum',
      description: 'Không gian lưu giữ hình ảnh, câu chuyện kỷ niệm và lời chúc của các thế hệ học sinh trước ngày tốt nghiệp.',
      estimatedTime: '6 phút AI Build',
      prompt: 'Tạo trang kỷ yếu lưu bút học sinh với thư viện ảnh và tường tin nhắn'
    },
    {
      id: 'idea-6',
      title: 'Machi Mart — Cửa Hàng Trao Đổi Giáo Trình Cũ',
      category: 'Thương Mại',
      difficulty: 'Trung bình',
      badge: 'Thương mại sinh viên',
      description: 'Nền tảng danh mục sách giáo trình, đồng phục và tài liệu học tập cũ để sinh viên khóa trên tặng lại khóa dưới.',
      estimatedTime: '7 phút AI Build',
      prompt: 'Tạo trang danh mục trao đổi sách và tài liệu học tập cho sinh viên với bộ lọc tìm kiếm'
    }
  ];

  const filteredIdeas = ideas.filter(item => {
    const matchCat = activeCategory === 'Tất cả' || item.category === activeCategory;
    const matchQuery = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchQuery;
  });

  const handleBuildIdea = (idea) => {
    navigate('/workspace', { state: { initialPrompt: idea.prompt } });
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-medium">
          <Compass className="w-3.5 h-3.5" />
          <span>Khám Phá Tiềm Năng Kiến Tạo</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-neutral-100">
          Bạn có thể xây dựng những sản phẩm gì?
        </h1>
        <p className="text-sm text-neutral-400">
          Khám phá các ý tưởng sản phẩm thực tế phù hợp với sinh viên, học sinh và các câu lạc bộ học đường.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Categories */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                activeCategory === cat
                  ? 'bg-ff-gold text-black font-semibold shadow-md'
                  : 'glass-panel text-neutral-300 hover:text-white hover:border-white/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Tìm ý tưởng dự án..."
            className="w-full pl-10 pr-4 py-2 rounded-xl glass-panel text-xs text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-ff-gold/50"
          />
        </div>
      </div>

      {/* Ideas Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredIdeas.map((idea) => (
          <GlassCard key={idea.id} className="flex flex-col justify-between p-6 group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge variant={idea.category === 'Học Thuật' ? 'jade' : 'gold'} size="xs">
                  {idea.category}
                </Badge>
                <span className="text-[11px] font-mono text-neutral-400">
                  {idea.estimatedTime}
                </span>
              </div>

              <div>
                <h3 className="font-serif font-bold text-lg text-neutral-100 group-hover:text-ff-gold-light transition-colors">
                  {idea.title}
                </h3>
                <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
                  {idea.description}
                </p>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between">
              <span className="text-[11px] text-neutral-500">Độ khó: {idea.difficulty}</span>
              <Button 
                variant="primary" 
                size="sm" 
                iconRight={ArrowRight}
                onClick={() => handleBuildIdea(idea)}
              >
                Tạo Bằng AI
              </Button>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};
