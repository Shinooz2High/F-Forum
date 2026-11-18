import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Layers, 
  Cpu, 
  Laptop, 
  Smartphone, 
  CheckCircle2, 
  Code2, 
  Download, 
  Play, 
  BookOpen, 
  ChevronDown,
  Terminal,
  HelpCircle,
  ExternalLink
} from 'lucide-react';
import { Window } from '../../components/macos/Window';
import { Button } from '../../components/macos/Button';
import { GlassCard } from '../../components/macos/GlassCard';
import { mockTemplates } from '../../data/mockTemplates';

export const LandingPage = () => {
  const [deviceMode, setDeviceMode] = useState('macbook'); // 'macbook' | 'iphone'
  const [promptInput, setPromptInput] = useState('');
  const [openFaq, setOpenFaq] = useState(null);
  const navigate = useNavigate();

  const handleStartBuilding = (e) => {
    e.preventDefault();
    if (promptInput.trim()) {
      navigate('/quick-start', { state: { initialPrompt: promptInput } });
    } else {
      navigate('/quick-start');
    }
  };

  const steps = [
    { num: '01', title: 'Bắt Đầu (Start)', desc: 'Nhập ý tưởng tự nhiên hoặc chọn một tác vụ Quick Start có sẵn.' },
    { num: '02', title: 'Làm Rõ (Clarify)', desc: 'Trả lời nhanh 4 câu hỏi định hướng mục tiêu, đối tượng và nội dung.' },
    { num: '03', title: 'Kế Hoạch (Plan)', desc: 'Duyệt danh sách nhiệm vụ và Prompt Blueprint có cấu trúc chuẩn.' },
    { num: '04', title: 'Kiến Tạo (Build)', desc: 'AI tạo mã nguồn trong môi trường sandbox biệt lập, an toàn.' },
    { num: '05', title: 'Đánh Giá (Review)', desc: 'Xem Live Preview tương tác, theo dõi Diff thay đổi và trạng thái Checks.' },
    { num: '06', title: 'Hoàn Thiện (Improve)', desc: 'Tiếp tục tinh chỉnh qua đối thoại AI giữ nguyên ngữ cảnh dự án.' },
    { num: '07', title: 'Xuất Bản (Export)', desc: 'Tải mã nguồn ZIP hoàn chỉnh kèm README.md để tự do phát triển.' },
  ];

  const faqs = [
    {
      q: 'F-FORUM có miễn phí cho học sinh, sinh viên không?',
      a: 'Hoàn toàn 0₫. Các tính năng tạo website cơ bản, xem trước trực tiếp, kiểm thử và tải mã nguồn ZIP được cung cấp miễn phí cho mục đích học tập và hoạt động CLB.'
    },
    {
      q: 'Tôi không biết lập trình thì có thể tạo website được không?',
      a: 'Chính xác! F-FORUM được thiết kế đặc thù cho người mới: hệ thống tự động chuẩn bị ngữ cảnh và Prompt Blueprint. Bạn chỉ cần mô tả mong muốn bằng tiếng Việt thông thường.'
    },
    {
      q: 'Mã nguồn sau khi tạo có thuộc quyền sở hữu của tôi không?',
      a: 'Bạn sở hữu 100% mã nguồn. F-FORUM không khóa người dùng (no vendor lock-in). Bạn có thể tải file ZIP về máy, mở trong VS Code, Antigravity hoặc đẩy lên GitHub bất kỳ lúc nào.'
    },
    {
      q: 'Điểm khác biệt của F-FORUM so với các công cụ tạo web khác?',
      a: 'F-FORUM kết hợp trải nghiệm tạo sản phẩm trực quan kiểu Omma với hệ thống theo dõi thay đổi (Diff), tiến trình (Progress) và kiểm tra lỗi (Checks) kiểu Arena, cùng Thư viện tri thức chuẩn mực.'
    }
  ];

  return (
    <div className="space-y-24 pb-16">
      {/* ================= SECTION 1: HERO ================= */}
      <section className="relative pt-8 sm:pt-14 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headline & Action */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-ff-gold/30 bg-ff-gold/10 text-ff-gold-light text-xs font-medium">
              <Sparkles className="w-3.5 h-3.5 text-ff-gold" />
              <span>AI Creation Platform · Biến Ý Tưởng Thành Sản Phẩm Thật</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-serif font-bold text-neutral-100 tracking-tight leading-[1.15]">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-ff-gold via-amber-300 to-yellow-500">
                Khai phóng ý tưởng,
              </span>{' '}
              chạm sâu bản chất sản phẩm web.
            </h1>

            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed font-sans max-w-xl">
              F-FORUM giúp học sinh, CLB và người mới Vibe Coding biến ý tưởng thành website và ứng dụng web có thể xem thử, kiểm tra và làm chủ hoàn toàn mã nguồn — không cần biết viết prompt chuyên sâu.
            </p>

            {/* Interactive Prompt Input Box */}
            <form onSubmit={handleStartBuilding} className="relative max-w-xl">
              <div className="glass-panel p-2 rounded-2xl border-ff-gold/30 shadow-gold-glow/15 flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={promptInput}
                  onChange={(e) => setPromptInput(e.target.value)}
                  placeholder="Bạn muốn tạo gì? (vd: Website CLB Công nghệ sinh viên...)"
                  className="flex-1 bg-transparent px-4 py-3 text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none"
                />
                <Button 
                  type="submit" 
                  variant="primary" 
                  size="md" 
                  iconRight={ArrowRight}
                  className="whitespace-nowrap"
                >
                  Bắt Đầu Tạo
                </Button>
              </div>
            </form>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link to="/quick-start">
                <Button variant="primary" size="md" icon={Play}>
                  Quick Start (Tác Vụ Nhanh)
                </Button>
              </Link>
              <Link to="/templates">
                <Button variant="secondary" size="md" icon={Layers}>
                  Khám Phá Templates
                </Button>
              </Link>
              <Link to="/workspace">
                <Button variant="outline" size="md" icon={Terminal}>
                  Vào AI Workspace
                </Button>
              </Link>
            </div>

            {/* 3 Core Commitments */}
            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-neutral-400 border-t border-white/5">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-ff-jade" />
                Dễ dàng, không đòi hỏi code
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-ff-jade" />
                Tải ZIP mã nguồn tự do
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-ff-jade" />
                Miễn phí cho học tập
              </span>
            </div>
          </div>

          {/* Right Column: Interactive macOS Device Showcase */}
          <div className="lg:col-span-5">
            <div className="relative">
              {/* Device Selector Controls */}
              <div className="flex justify-end gap-2 mb-3">
                <button
                  onClick={() => setDeviceMode('macbook')}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                    deviceMode === 'macbook'
                      ? 'bg-ff-gold text-black font-semibold'
                      : 'bg-white/5 text-neutral-400 hover:text-white'
                  }`}
                >
                  <Laptop className="w-3.5 h-3.5" />
                  <span>MacBook Pro</span>
                </button>
                <button
                  onClick={() => setDeviceMode('iphone')}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                    deviceMode === 'iphone'
                      ? 'bg-ff-gold text-black font-semibold'
                      : 'bg-white/5 text-neutral-400 hover:text-white'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>iPhone 16 Pro</span>
                </button>
              </div>

              {/* Showcase Container */}
              {deviceMode === 'macbook' ? (
                <Window 
                  title="F-Forum AI Creation Studio — Preview" 
                  subtitle="localhost:5173"
                  className="w-full shadow-2xl border-white/15"
                >
                  <div className="p-4 bg-neutral-950/90 font-mono text-xs text-neutral-300 space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-white/10 text-neutral-400 text-[11px]">
                      <span className="text-ff-gold-light">● Live Web Preview (F-Code Portal)</span>
                      <span>FPS: 60 | Latency: 12ms</span>
                    </div>

                    <div className="p-4 rounded-xl bg-neutral-900/90 border border-ff-gold/20 space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="font-serif italic font-bold text-amber-400 text-sm">F-Code Tech Club</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-ff-jade/20 text-ff-jade">Đang Tuyển Quân</span>
                      </div>
                      <p className="font-sans text-xs text-neutral-200">
                        Chào đón thế hệ K20 tham gia cộng đồng AI & Công nghệ!
                      </p>
                      <div className="flex gap-2">
                        <span className="px-3 py-1 rounded bg-ff-gold text-black font-semibold text-[11px]">Đăng Ký</span>
                        <span className="px-3 py-1 rounded bg-white/10 text-neutral-300 text-[11px]">Xem Ban Chuyên Môn</span>
                      </div>
                    </div>

                    {/* Terminal Execution snippet */}
                    <div className="p-2.5 rounded-lg bg-black/60 border border-white/5 font-mono text-[10px] text-neutral-400 space-y-1">
                      <p className="text-emerald-400">✓ AI Agent generated 14 files in 2.4s</p>
                      <p className="text-neutral-300">✓ Checks: Build (Passed) · Links (Passed)</p>
                      <p className="text-ff-gold">Ready to export ZIP or edit with AI</p>
                    </div>
                  </div>
                </Window>
              ) : (
                <div className="w-64 mx-auto rounded-[36px] p-3 bg-neutral-900 border-4 border-neutral-700 shadow-2xl relative">
                  {/* Dynamic Island */}
                  <div className="w-20 h-4 bg-black rounded-full mx-auto mb-3" />
                  <div className="rounded-[24px] overflow-hidden bg-neutral-950 p-4 space-y-3 text-center border border-white/10">
                    <div className="w-10 h-10 rounded-full bg-ff-gold/20 text-ff-gold flex items-center justify-center mx-auto">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <p className="font-serif font-bold text-sm text-neutral-100">F-Code Club Mobile</p>
                    <p className="text-[11px] text-neutral-400">Tối ưu hoàn hảo cho màn hình cảm ứng di động.</p>
                    <button className="w-full py-2 rounded-xl bg-ff-gold text-black font-semibold text-xs">
                      Xem Trên Mobile
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION 2: 7-STEP CREATION FLOW ================= */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-ff-gold/30 bg-ff-gold/10 text-ff-gold text-xs font-medium">
            <span>Hành Trình Tinh Gọn</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-neutral-100">
            Từ ý tưởng sơ khai đến sản phẩm thực tế
          </h2>
          <p className="text-neutral-400 text-sm">
            Quy trình 7 bước mạch lạc giúp bạn nắm quyền làm chủ dự án ở từng khâu phát triển.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((st, i) => (
            <GlassCard key={st.num} className="relative group">
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-2xl font-bold text-ff-gold/40 group-hover:text-ff-gold transition-colors">
                  {st.num}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-neutral-400">
                  Bước {i + 1}
                </span>
              </div>
              <h3 className="font-serif font-bold text-lg text-neutral-100 mb-2">
                {st.title}
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                {st.desc}
              </p>
            </GlassCard>
          ))}
          <GlassCard className="flex flex-col justify-center items-center text-center p-6 border-dashed border-ff-gold/40 bg-ff-gold/5">
            <Sparkles className="w-8 h-8 text-ff-gold mb-3 animate-bounce" />
            <p className="font-serif font-bold text-lg text-neutral-100 mb-1">Bạn Đã Sẵn Sàng?</p>
            <p className="text-xs text-neutral-400 mb-4">Khởi động dự án đầu tiên của bạn chỉ trong 2 phút.</p>
            <Link to="/quick-start">
              <Button variant="primary" size="sm">Bắt Đầu Ngay</Button>
            </Link>
          </GlassCard>
        </div>
      </section>

      {/* ================= SECTION 3: FEATURED TEMPLATES ================= */}
      <section className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-ff-gold/30 bg-ff-gold/10 text-ff-gold text-xs font-medium mb-3">
              <span>Mẫu Khởi Đầu Tuyển Chọn</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-neutral-100">
              Bắt đầu nhanh với mẫu đã thử nghiệm
            </h2>
            <p className="text-neutral-400 text-sm max-w-xl">
              Được thiết kế chuyên biệt cho nhu cầu CLB, hồ sơ năng lực và học tập của sinh viên.
            </p>
          </div>
          <Link to="/templates">
            <Button variant="secondary" size="sm" iconRight={ArrowRight}>
              Xem tất cả 5+ mẫu
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockTemplates.slice(0, 3).map((tpl) => (
            <GlassCard key={tpl.id} className="flex flex-col overflow-hidden p-0 group">
              <div className="h-44 overflow-hidden relative">
                <img 
                  src={tpl.previewImage} 
                  alt={tpl.vietnameseTitle} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
                <span className="absolute top-3 right-3 text-[11px] px-2.5 py-1 rounded-full bg-neutral-900/80 backdrop-blur-md text-ff-gold-light border border-ff-gold/30 font-medium">
                  {tpl.badge}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-serif font-bold text-xl text-neutral-100 group-hover:text-ff-gold-light transition-colors">
                    {tpl.vietnameseTitle}
                  </h3>
                  <p className="text-xs text-neutral-400 line-clamp-2 mt-2">
                    {tpl.description}
                  </p>
                </div>

                <div className="space-y-3 pt-2 border-t border-white/5">
                  <div className="flex flex-wrap gap-1.5">
                    {tpl.techStack.map(ts => (
                      <span key={ts} className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-neutral-300">
                        {ts}
                      </span>
                    ))}
                  </div>

                  <Link to="/workspace" className="block w-full">
                    <Button variant="primary" size="sm" className="w-full">
                      Dùng Mẫu Này Trong Workspace
                    </Button>
                  </Link>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* ================= SECTION 4: FREQUENTLY ASKED QUESTIONS ================= */}
      <section className="space-y-8 max-w-4xl mx-auto">
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-serif font-bold text-neutral-100">
            Câu hỏi thường gặp
          </h2>
          <p className="text-neutral-400 text-sm">
            Tất cả những gì bạn cần biết trước khi bắt đầu tạo sản phẩm với F-FORUM.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div 
              key={idx}
              className="glass-panel rounded-2xl overflow-hidden border-white/10 transition-colors"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full px-6 py-4 flex items-center justify-between text-left font-serif font-bold text-base text-neutral-100 hover:text-ff-gold transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-ff-gold transition-transform duration-200 ${
                  openFaq === idx ? 'rotate-180' : ''
                }`} />
              </button>
              {openFaq === idx && (
                <div className="px-6 pb-5 text-sm text-neutral-300 font-sans border-t border-white/5 pt-3 leading-relaxed animate-fadeIn">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ================= SECTION 5: FOOTER ================= */}
      <footer className="pt-16 border-t border-white/10 text-neutral-400 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-neutral-900 border border-ff-gold flex items-center justify-center">
                <span className="font-serif font-bold text-ff-gold text-xs">F</span>
              </div>
              <span className="font-serif italic font-bold text-lg text-neutral-100">F-Forum</span>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed font-sans">
              Nền tảng hỗ trợ sinh viên và người mới tạo website, web app bằng AI theo phong cách macOS Liquid.
            </p>
            <p className="text-[11px] text-ff-gold">Học thuật · Sáng tạo · Làm chủ mã nguồn</p>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-200 mb-3">Sản Phẩm</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/home" className="hover:text-ff-gold">Bàn làm việc</Link></li>
              <li><Link to="/quick-start" className="hover:text-ff-gold">Tác vụ nhanh Quick Start</Link></li>
              <li><Link to="/templates" className="hover:text-ff-gold">Kho mẫu Website CLB</Link></li>
              <li><Link to="/workspace" className="hover:text-ff-gold">AI Creation Studio</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-200 mb-3">Tài Nguyên</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/knowledge" className="hover:text-ff-gold">Thư viện Source of Knowledge</Link></li>
              <li><Link to="/projects" className="hover:text-ff-gold">Dự án của tôi</Link></li>
              <li><a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-ff-gold flex items-center gap-1">Mã nguồn mở <ExternalLink className="w-3 h-3" /></a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-200 mb-3">Hỗ Trợ</h4>
            <p className="text-xs leading-relaxed mb-3">
              Mọi thắc mắc và đóng góp xin gửi về Ban Quản Trị F-Forum:
            </p>
            <a href="mailto:BroAmStuck@gmail.com" className="text-xs text-ff-gold font-mono hover:underline">
              BroAmStuck@gmail.com
            </a>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-4">
          <p>© 2026 F-FORUM · From Ideas to Real Projects. Tất cả quyền được bảo lưu.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-neutral-300 cursor-pointer">Điều khoản dịch vụ</span>
            <span className="hover:text-neutral-300 cursor-pointer">Chính sách dữ liệu</span>
            <span className="hover:text-neutral-300 cursor-pointer">Bảo mật</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
