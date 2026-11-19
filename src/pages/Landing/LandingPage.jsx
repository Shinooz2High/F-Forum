import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  ChevronDown,
  ArrowRight,
  Sparkles,
  Layers,
  Terminal,
  Compass,
  BookOpen,
  LayoutDashboard,
  CheckCircle2,
  GitCompare,
  ShieldCheck,
  Eye,
  Folder,
  File,
  Menu,
  X,
  ExternalLink
} from 'lucide-react';
import { mockTemplates } from '../../data/mockTemplates';

const TESTIMONIAL_TEXT =
  'F-Forum đã thay đổi hoàn toàn cách CLB chúng mình xây dựng sản phẩm web bằng AI. Từ ý tưởng ban đầu đến bản xem trước trực tiếp, kiểm thử an toàn và xuất mã nguồn hoàn chỉnh — tất cả chỉ mất vài phút thay vì hàng tuần!';

function ScrollWord({ word, index, total, progress }) {
  const start = index / total;
  const end = (index + 1) / total;
  const opacity = useTransform(progress, [start, end], [0.2, 1]);
  const color = useTransform(
    progress,
    [start, end],
    ['hsl(0, 0%, 35%)', 'hsl(0, 0%, 100%)']
  );

  return (
    <motion.span
      style={{ opacity, color }}
      className="mr-[0.3em] inline-block font-medium"
    >
      {word}
    </motion.span>
  );
}

export const LandingPage = () => {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const testimonialRef = useRef(null);

  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [promptInput, setPromptInput] = useState('');
  const [openFaq, setOpenFaq] = useState(null);

  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroTextY = useTransform(heroScroll, [0, 1], [0, -200]);
  const heroTextOpacity = useTransform(heroScroll, [0, 0.5], [1, 0]);
  const dashboardY = useTransform(heroScroll, [0, 1], [0, -250]);

  const { scrollYProgress: testimonialScroll } = useScroll({
    target: testimonialRef,
    offset: ['start end', 'end center'],
  });

  const words = TESTIMONIAL_TEXT.split(' ');

  const handleStartBuilding = (e) => {
    e.preventDefault();
    if (promptInput.trim()) {
      navigate('/quick-start', { state: { initialPrompt: promptInput.trim() } });
    } else {
      navigate('/quick-start');
    }
  };

  const spatialSpaces = [
    {
      num: '01',
      title: 'Trạm Phóng Launchpad',
      tag: '/home',
      desc: 'Tâm điểm không gian mở với thanh khởi tạo ý tưởng tức thì, dải vệ tinh 8 Quick Start và trục thời gian dự án.',
      icon: LayoutDashboard,
      to: '/home',
    },
    {
      num: '02',
      title: 'Sân Khấu Showcase',
      tag: '/explore',
      desc: 'Bố cục tách đôi 60/40 xem trước tương tác thực tế kèm dòng chảy Bento bất đối xứng cho 8 nhóm tài nguyên.',
      icon: Compass,
      to: '/explore',
    },
    {
      num: '03',
      title: 'Bàn Làm Việc Arena',
      tag: '/workspace',
      desc: 'Khung 3 cột đa lớp: Lịch sử Chat & Tệp, Hội thoại AI và Diff/Checks cùng cửa sổ Live Preview nổi PiP.',
      icon: Terminal,
      to: '/workspace',
    },
    {
      num: '04',
      title: 'Tạp Chí Source of Knowledge',
      tag: '/knowledge',
      desc: 'Dòng chảy tạp chí cộng đồng: Project Showcase, Community Drops, Dev Q&A và 8 kho tài nguyên chuẩn hóa.',
      icon: BookOpen,
      to: '/knowledge',
    },
  ];

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
      a: 'Hoàn toàn 0₫. Các tính năng tạo website cơ bản, xem trước trực tiếp, kiểm thử và tải mã nguồn ZIP được cung cấp miễn phí cho mục đích học tập và hoạt động CLB.',
    },
    {
      q: 'Tôi không biết lập trình thì có thể tạo website được không?',
      a: 'Chính xác! F-FORUM được thiết kế đặc thù cho người mới: hệ thống tự động chuẩn bị ngữ cảnh và Prompt Blueprint. Bạn chỉ cần mô tả mong muốn bằng tiếng Việt thông thường.',
    },
    {
      q: 'Mã nguồn sau khi tạo có thuộc quyền sở hữu của tôi không?',
      a: 'Bạn sở hữu 100% mã nguồn. F-FORUM không khóa người dùng (no vendor lock-in). Bạn có thể tải file ZIP về máy, mở trong VS Code hoặc đẩy lên GitHub bất kỳ lúc nào.',
    },
    {
      q: 'Điểm khác biệt của F-FORUM so với các công cụ tạo web khác?',
      a: 'F-FORUM kết hợp không gian sáng tạo trực quan với hệ thống theo dõi thay đổi (Diff), tiến trình (Progress), kiểm tra bảo mật (Checks) và Thư viện tri thức cộng đồng.',
    },
  ];

  return (
    <div className="bg-background text-foreground min-h-screen font-sans selection:bg-white/20 selection:text-white overflow-x-clip">
      {/* ================= SECTION 1: HERO ================= */}
      <section
        ref={heroRef}
        className="relative min-h-screen overflow-hidden flex flex-col justify-between"
      >
        {/* Horizontal Navbar (px-8 md:px-28 py-4) */}
        <header className="relative z-40 w-full px-8 md:px-28 py-4 flex items-center justify-between">
          {/* Left: Logo + Brand Text + Nav Links */}
          <div className="flex items-center gap-12 md:gap-20">
            <Link to="/" className="flex items-center gap-2.5 group">
              <img
                src="/assets/ff-logo.svg"
                alt="F-Forum Logo"
                className="w-7 h-7 object-contain group-hover:opacity-80 transition-opacity"
              />
              <span className="text-xl font-bold tracking-tight text-foreground">
                F-Forum
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-muted-foreground">
              <Link
                to="/home"
                className="px-3 py-1.5 rounded-md hover:text-foreground transition-colors"
              >
                Home
              </Link>

              <div
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <button
                  type="button"
                  onClick={() => setServicesOpen(prev => !prev)}
                  className="px-3 py-1.5 rounded-md hover:text-foreground transition-colors inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>Sản phẩm</span>
                  <ChevronDown className={`w-4 h-4 opacity-70 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
                </button>

                {servicesOpen && (
                  <div className="absolute left-0 top-full pt-2 w-60 z-50">
                    <div className="rounded-xl bg-card/95 backdrop-blur-2xl border border-border shadow-macos-window p-1.5 space-y-0.5 text-xs">
                      <Link
                        to="/explore"
                        className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-neutral-300 hover:text-foreground hover:bg-white/10 transition-colors"
                      >
                        <Compass className="w-3.5 h-3.5" />
                        <span>Explore Showcase Studio</span>
                      </Link>
                      <Link
                        to="/templates"
                        className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-neutral-300 hover:text-foreground hover:bg-white/10 transition-colors"
                      >
                        <Layers className="w-3.5 h-3.5" />
                        <span>Kho Templates Tuyển Chọn</span>
                      </Link>
                      <Link
                        to="/knowledge"
                        className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-neutral-300 hover:text-foreground hover:bg-white/10 transition-colors"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Source of Knowledge</span>
                      </Link>
                      <Link
                        to="/quick-start"
                        className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-neutral-300 hover:text-foreground hover:bg-white/10 transition-colors"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Quick Start 6 Bước</span>
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <Link
                to="/workspace"
                className="px-3 py-1.5 rounded-md hover:text-foreground transition-colors"
              >
                Workspace
              </Link>
              <a
                href="#reviews"
                className="px-3 py-1.5 rounded-md hover:text-foreground transition-colors"
              >
                Đánh giá
              </a>
              <a
                href="#faq"
                className="px-3 py-1.5 rounded-md hover:text-foreground transition-colors"
              >
                FAQ
              </a>
            </nav>
          </div>

          {/* Right: Solid White CTA Button & Mobile Menu Toggle */}
          <div className="flex items-center gap-3">
            <Link
              to="/workspace"
              className="bg-foreground text-background rounded-lg text-sm font-semibold px-4 py-2 hover:opacity-90 transition-opacity"
            >
              Vào Workspace
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(prev => !prev)}
              className="md:hidden p-2 rounded-lg bg-white/5 border border-border text-foreground"
              aria-label="Mở menu điều hướng"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </header>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-x-0 top-16 z-40 mx-4 p-4 rounded-2xl bg-card/95 backdrop-blur-2xl border border-border shadow-2xl space-y-1.5 text-sm">
            {[
              { to: '/home', label: 'Bàn làm việc (Home)' },
              { to: '/explore', label: 'Khám phá (Explore Studio)' },
              { to: '/templates', label: 'Kho Templates' },
              { to: '/workspace', label: 'AI Workspace Studio' },
              { to: '/knowledge', label: 'Thư viện Tri thức' },
              { to: '/quick-start', label: 'Quick Start 6 bước' },
            ].map(item => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-neutral-200 hover:bg-white/10"
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}

        {/* Centered Hero Content Group (Parallax Scroll y: [0,-200], opacity: [1,0]) */}
        <motion.div
          style={{ y: heroTextY, opacity: heroTextOpacity }}
          className="relative z-20 flex flex-col items-center text-center mt-12 md:mt-16 px-4 max-w-4xl mx-auto"
        >
          {/* Liquid Glass Tag Pill */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0 }}
          >
            <Link
              to="/explore"
              className="liquid-glass px-3 py-2 rounded-lg mb-6 inline-flex items-center hover:bg-white/[0.04] transition-colors"
            >
              <span className="bg-foreground text-background rounded-md text-sm font-medium px-2 py-0.5 mr-2.5">
                Mới
              </span>
              <span className="text-sm font-medium text-muted-foreground">
                Chào đón F-Forum v3.2 · Spatial Arena
              </span>
            </Link>
          </motion.div>

          {/* Headline: Instrument Serif italic exclusively on pure ASCII accent word */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl tracking-[-2px] font-medium leading-tight md:leading-[1.15] mb-3 text-foreground"
          >
            Từ Ý Tưởng.
            <br />
            Một Không Gian <span className="font-serif italic font-normal">Workspace</span>.
          </motion.h1>

          {/* Subtitle using CSS variable --hero-subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ color: 'var(--hero-subtitle)' }}
            className="text-lg font-normal leading-6 opacity-90 mb-8 max-w-2xl mx-auto"
          >
            F-Forum giúp sinh viên, CLB và người mới Vibe Coding biến ý tưởng,
            <br className="hidden sm:inline" /> thành sản phẩm web thực tế — kiểm thử và làm chủ mã nguồn.
          </motion.p>

          {/* Primary + Liquid Glass Secondary CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            <motion.button
              type="button"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/quick-start')}
              className="bg-foreground text-background rounded-full px-8 py-3.5 text-base font-medium cursor-pointer shadow-xl hover:opacity-95 transition-opacity"
            >
              Bắt Đầu Miễn Phí
            </motion.button>

            <motion.button
              type="button"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/home')}
              className="liquid-glass rounded-full px-7 py-3.5 text-base font-medium text-foreground cursor-pointer hover:bg-white/[0.06] transition-colors inline-flex items-center gap-2"
            >
              <span>Khám Phá Bàn Làm Việc</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Full-Width Dashboard + Video Area */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative w-screen aspect-video max-h-[640px] mt-8 flex items-center justify-center overflow-hidden"
          style={{ marginLeft: 'calc(-50vw + 50%)' }}
        >
          {/* Ambient Background Video */}
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-85"
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4"
          />

          {/* Centered Parallax F-Forum Arena Studio Dashboard Mockup */}
          <motion.div
            style={{ y: dashboardY, mixBlendMode: 'luminosity' }}
            onClick={() => navigate('/workspace')}
            className="absolute z-10 max-w-5xl w-[90%] rounded-2xl overflow-hidden border border-white/20 bg-black/85 backdrop-blur-2xl shadow-2xl cursor-pointer group"
          >
            {/* Window Top Bar */}
            <div className="h-10 px-4 border-b border-white/10 bg-white/[0.03] flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-white/30" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                <span className="ml-2 text-neutral-300 font-sans font-medium">
                  F-Forum Studio · Website CLB F-Code K20
                </span>
              </div>
              <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                <span className="hidden sm:inline-flex items-center gap-1 text-ff-jade">
                  <CheckCircle2 className="w-3 h-3" /> 5/6 Checks Passed
                </span>
                <span className="px-2 py-0.5 rounded bg-white/10 text-foreground">
                  Arena PiP
                </span>
              </div>
            </div>

            {/* 3-Column Studio Body Preview */}
            <div className="grid grid-cols-12 min-h-[260px] sm:min-h-[340px] text-left">
              {/* Left Column: Sessions & Files */}
              <div className="hidden md:flex col-span-3 border-r border-white/10 p-3 flex-col justify-between bg-white/[0.01]">
                <div className="space-y-3">
                  <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                    Lịch sử & Tệp
                  </p>
                  <div className="p-2 rounded-lg bg-white/10 border border-white/20 text-xs font-medium text-foreground truncate">
                    Website CLB F-Code K20
                  </div>
                  <div className="p-2 rounded-lg bg-white/[0.03] border border-white/5 text-xs text-muted-foreground truncate">
                    Đấu Trường Thi CBT
                  </div>
                  <div className="pt-2 space-y-1 font-mono text-[11px] text-muted-foreground">
                    <div className="flex items-center gap-1.5 text-neutral-300">
                      <Folder className="w-3 h-3" />
                      <span>src/components</span>
                    </div>
                    <div className="flex items-center gap-1.5 pl-4 text-foreground">
                      <File className="w-3 h-3" />
                      <span>HeroSection.jsx</span>
                    </div>
                    <div className="flex items-center gap-1.5 pl-4">
                      <File className="w-3 h-3" />
                      <span>Countdown.jsx</span>
                    </div>
                  </div>
                </div>
                <div className="text-[10px] font-mono text-muted-foreground">
                  GitHub Sync: Ready
                </div>
              </div>

              {/* Middle Column: AI Chat Stream */}
              <div className="col-span-12 sm:col-span-6 md:col-span-5 border-r border-white/10 p-4 flex flex-col justify-between space-y-3">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground">
                    <span>AI Creation Agent</span>
                    <span className="text-ff-jade">● Live Sync</span>
                  </div>
                  <div className="ml-auto max-w-[85%] rounded-2xl px-3.5 py-2.5 bg-foreground text-background text-xs font-medium">
                    Thêm đồng hồ đếm ngược tuyển quân K20 và chuyển sang giao diện kính mờ tối giản.
                  </div>
                  <div className="max-w-[90%] rounded-2xl p-3 bg-white/[0.04] border border-white/10 text-xs text-neutral-300 space-y-1.5">
                    <p>Đã cập nhật <code className="text-foreground">HeroSection.jsx</code> và đồng bộ Live Preview.</p>
                    <div className="flex items-center gap-3 text-[10px] font-mono text-muted-foreground pt-1 border-t border-white/5">
                      <span className="inline-flex items-center gap-1 text-ff-jade">
                        <GitCompare className="w-3 h-3" /> +14 -2
                      </span>
                      <span className="inline-flex items-center gap-1 text-foreground">
                        <ShieldCheck className="w-3 h-3" /> Build OK
                      </span>
                    </div>
                  </div>
                </div>

                <div className="px-3 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-[11px] text-muted-foreground flex items-center justify-between">
                  <span>Nhập yêu cầu chỉnh sửa tiếp theo...</span>
                  <span className="px-2 py-0.5 rounded bg-foreground text-background font-semibold text-[10px]">
                    Gửi
                  </span>
                </div>
              </div>

              {/* Right Column: Live Preview & Diff Strip */}
              <div className="hidden sm:flex col-span-6 md:col-span-4 p-4 flex-col justify-between bg-black/60">
                <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground">
                  <span className="inline-flex items-center gap-1 text-foreground">
                    <Eye className="w-3 h-3" /> Live Preview
                  </span>
                  <span>localhost:5173</span>
                </div>

                <div className="rounded-xl border border-white/15 bg-card p-4 text-center space-y-3 my-auto">
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-white/10 text-foreground text-[10px] font-mono">
                    Tuyển Thành Viên K20
                  </span>
                  <h3 className="font-sans font-semibold text-base text-foreground">
                    F-Code Technology Club
                  </h3>
                  <div className="inline-grid grid-cols-3 gap-2 px-3 py-2 rounded-lg bg-black border border-white/10 font-mono text-xs">
                    <div>
                      <span className="font-bold text-foreground">12</span>
                      <span className="block text-[8px] text-muted-foreground">NGÀY</span>
                    </div>
                    <div>
                      <span className="font-bold text-foreground">08</span>
                      <span className="block text-[8px] text-muted-foreground">GIỜ</span>
                    </div>
                    <div>
                      <span className="font-bold text-foreground">45</span>
                      <span className="block text-[8px] text-muted-foreground">PHÚT</span>
                    </div>
                  </div>
                  <div>
                    <span className="inline-block px-4 py-1.5 rounded-full bg-foreground text-background text-[11px] font-semibold">
                      Nộp Đơn Ngay
                    </span>
                  </div>
                </div>

                <div className="text-[10px] font-mono text-muted-foreground flex items-center justify-between pt-2 border-t border-white/10">
                  <span>Nhấp để mở Workspace Studio</span>
                  <ArrowRight className="w-3 h-3 text-foreground group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bottom Gradient Fade (h-40, from background to transparent, z-30) */}
          <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-background via-background/70 to-transparent z-30 pointer-events-none" />
        </motion.div>
      </section>

      {/* ================= SECTION 2: TESTIMONIAL (SCROLL-DRIVEN WORD REVEAL) ================= */}
      <section
        id="reviews"
        ref={testimonialRef}
        className="relative min-h-screen flex flex-col justify-center items-center py-24 md:py-32 px-8 md:px-28 bg-background"
      >
        <div className="max-w-3xl mx-auto flex flex-col items-start gap-10">
          <img
            src="/assets/quote-symbol.svg"
            alt="Quote Symbol"
            className="w-14 h-10 object-contain"
          />

          <div className="text-4xl md:text-5xl font-medium leading-[1.2] flex flex-wrap">
            {words.map((word, idx) => (
              <ScrollWord
                key={idx}
                word={word}
                index={idx}
                total={words.length}
                progress={testimonialScroll}
              />
            ))}
            <span className="text-muted-foreground ml-2">"</span>
          </div>

          <div className="flex items-center gap-4">
            <img
              src="/assets/testimonial-avatar.png"
              alt="Nguyễn Hoàng Long"
              className="w-14 h-14 rounded-full border-[3px] border-foreground object-cover shadow-lg"
            />
            <div>
              <p className="text-base font-semibold leading-7 text-foreground">
                Nguyễn Hoàng Long
              </p>
              <p className="text-sm font-normal leading-5 text-muted-foreground">
                Chủ nhiệm CLB Công nghệ F-Code · K20
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION 3: 4 SPACES & 7-STEP WORKFLOW ================= */}
      <section className="py-24 px-8 md:px-28 border-t border-white/10 space-y-20 max-w-7xl mx-auto">
        {/* 4 Core Spatial Workspaces */}
        <div className="space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-3">
              <div className="liquid-glass inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs text-muted-foreground">
                <span>Kiến trúc không gian F-Forum</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-medium tracking-[-1.5px] text-foreground">
                Bốn phân khu <span className="font-serif italic font-normal">Studio</span> thống nhất
              </h2>
            </div>
            <Link
              to="/home"
              className="text-sm font-medium text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 transition-colors"
            >
              <span>Mở Bàn Làm Việc</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {spatialSpaces.map((sp) => {
              const Icon = sp.icon;
              return (
                <Link
                  key={sp.tag}
                  to={sp.to}
                  className="p-6 rounded-2xl bg-card border border-border hover:border-white/35 transition-all duration-300 flex flex-col justify-between space-y-6 group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs text-muted-foreground">{sp.num}</span>
                      <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-foreground group-hover:bg-foreground group-hover:text-background transition-colors">
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-sans font-semibold text-lg text-foreground">
                        {sp.title}
                      </h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {sp.desc}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs font-mono text-muted-foreground pt-3 border-t border-white/5">
                    <span>{sp.tag}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-foreground group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* 7-Step Creation Journey */}
        <div className="space-y-10">
          <div className="max-w-2xl space-y-3">
            <h2 className="text-3xl sm:text-4xl font-medium tracking-[-1px] text-foreground">
              Quy trình 7 bước kiến tạo <span className="font-serif italic font-normal">Workspace</span>
            </h2>
            <p className="text-sm text-muted-foreground">
              Mạch lạc từ ý tưởng sơ khai đến khi kiểm thử an toàn và tải về trọn vẹn mã nguồn.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {steps.map((st) => (
              <div
                key={st.num}
                className="p-6 rounded-2xl bg-card border border-border hover:border-white/30 transition-all space-y-3"
              >
                <span className="font-mono text-2xl font-bold text-white/35 block">
                  {st.num}
                </span>
                <h3 className="font-sans font-semibold text-base text-foreground">
                  {st.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {st.desc}
                </p>
              </div>
            ))}
            <div className="p-6 rounded-2xl liquid-glass flex flex-col justify-center items-start space-y-4">
              <Sparkles className="w-6 h-6 text-foreground" />
              <div className="space-y-1">
                <p className="font-sans font-semibold text-base text-foreground">
                  Sẵn sàng khởi tạo?
                </p>
                <p className="text-xs text-muted-foreground">
                  Khởi động dự án đầu tiên trong 2 phút.
                </p>
              </div>
              <button
                type="button"
                onClick={() => navigate('/quick-start')}
                className="bg-foreground text-background rounded-full px-5 py-2 text-xs font-semibold hover:opacity-90 transition-opacity cursor-pointer"
              >
                Bắt Đầu Ngay
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION 4: FEATURED TEMPLATES, PROMPT LAUNCHER & FAQ ================= */}
      <section className="py-24 px-8 md:px-28 border-t border-white/10 space-y-24 max-w-7xl mx-auto">
        {/* Featured 3 Templates */}
        <div className="space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <h2 className="text-3xl sm:text-4xl font-medium tracking-[-1px] text-foreground">
                Khởi đầu với <span className="font-serif italic font-normal">Templates</span> tuyển chọn
              </h2>
              <p className="text-sm text-muted-foreground">
                Cấu trúc sẵn cho CLB sinh viên, hồ sơ năng lực và ứng dụng học tập.
              </p>
            </div>
            <Link
              to="/templates"
              className="text-sm font-medium text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5"
            >
              <span>Xem tất cả mẫu</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mockTemplates.slice(0, 3).map((tpl) => (
              <div
                key={tpl.id}
                className="rounded-2xl bg-card border border-border hover:border-white/30 overflow-hidden flex flex-col justify-between transition-all group"
              >
                <div className="h-44 overflow-hidden relative bg-black">
                  <img
                    src={tpl.previewImage}
                    alt={tpl.vietnameseTitle}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500 opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
                  <span className="absolute top-3 right-3 text-[11px] px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md text-foreground border border-white/20 font-medium">
                    {tpl.badge}
                  </span>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                  <div>
                    <h3 className="font-sans font-semibold text-lg text-foreground">
                      {tpl.vietnameseTitle}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-2 mt-2 leading-relaxed">
                      {tpl.description}
                    </p>
                  </div>

                  <div className="space-y-4 pt-3 border-t border-white/10">
                    <div className="flex flex-wrap gap-1.5">
                      {tpl.techStack.map((ts) => (
                        <span
                          key={ts}
                          className="text-[10px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-muted-foreground font-mono"
                        >
                          {ts}
                        </span>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        navigate('/workspace', {
                          state: {
                            templateId: tpl.id,
                            templateTitle: tpl.vietnameseTitle,
                            initialPrompt: `Khởi tạo dự án dựa trên mẫu "${tpl.vietnameseTitle}" trong Workspace Studio.`,
                          },
                        })
                      }
                      className="w-full py-2.5 rounded-full bg-foreground text-background text-xs font-semibold hover:opacity-90 transition-opacity cursor-pointer"
                    >
                      Mở Trong Workspace
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Quick Prompt Launcher */}
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-medium tracking-[-1px] text-foreground">
            Nhập ý tưởng trực tiếp vào <span className="font-serif italic font-normal">Launchpad</span>
          </h2>
          <form onSubmit={handleStartBuilding} className="liquid-glass rounded-2xl p-2 flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={promptInput}
              onChange={(e) => setPromptInput(e.target.value)}
              placeholder="Bạn muốn tạo gì? (vd: Website CLB Công nghệ sinh viên K20...)"
              className="flex-1 bg-transparent px-4 py-3 text-sm text-foreground placeholder-neutral-500 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-foreground text-background rounded-xl px-6 py-3 text-sm font-semibold hover:opacity-90 transition-opacity inline-flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
            >
              <span>Bắt Đầu Tạo</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* FAQ Accordion */}
        <div id="faq" className="max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl sm:text-4xl font-medium tracking-[-1px] text-foreground">
              Câu hỏi thường gặp <span className="font-serif italic font-normal">FAQ</span>
            </h2>
            <p className="text-sm text-muted-foreground">
              Mọi thông tin bạn cần trước khi bắt đầu xây dựng dự án với F-FORUM.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-card border border-border rounded-2xl overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left font-sans font-semibold text-sm sm:text-base text-foreground hover:bg-white/[0.02] transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-muted-foreground shrink-0 ml-4 transition-transform duration-200 ${
                      openFaq === idx ? 'rotate-180 text-foreground' : ''
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-6 pb-5 pt-3 border-t border-white/10 text-sm text-muted-foreground leading-relaxed animate-fadeIn">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= MINIMAL FOOTER ================= */}
      <footer className="border-t border-border py-12 px-8 md:px-28 text-xs text-muted-foreground">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <img
                src="/assets/ff-logo.svg"
                alt="F-Forum Logo"
                className="w-5 h-5 object-contain"
              />
              <span className="font-sans font-bold text-sm text-foreground">
                F-FORUM
              </span>
            </div>
            <p className="max-w-sm leading-relaxed">
              From Ideas to Real Projects · Nền tảng hỗ trợ học sinh, CLB và người mới Vibe Coding làm chủ sản phẩm web.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <Link to="/home" className="hover:text-foreground transition-colors">
              Bàn làm việc
            </Link>
            <Link to="/explore" className="hover:text-foreground transition-colors">
              Explore
            </Link>
            <Link to="/templates" className="hover:text-foreground transition-colors">
              Templates
            </Link>
            <Link to="/workspace" className="hover:text-foreground transition-colors">
              Workspace
            </Link>
            <Link to="/knowledge" className="hover:text-foreground transition-colors">
              Source of Knowledge
            </Link>
            <a
              href="mailto:BroAmStuck@gmail.com"
              className="text-foreground hover:underline inline-flex items-center gap-1 font-mono"
            >
              <span>BroAmStuck@gmail.com</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span>© 2026 F-FORUM · Học thuật · Sáng tạo · Làm chủ mã nguồn</span>
          <span>Pure Black Liquid Glass System</span>
        </div>
      </footer>
    </div>
  );
};
