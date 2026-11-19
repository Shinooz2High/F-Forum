import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ArrowRight,
  Compass,
  Laptop,
  Smartphone,
  Sparkles,
  Swords,
  Terminal,
  Zap,
} from 'lucide-react';

/**
 * Isolated Authentic Original F-FORUM Landing Page (/)
 * Preserves the exact Oriental Cyber-Academic aesthetic from f-forum.vercel.app:
 * #07090E night canvas, #EAB308 / #F59E0B Imperial Gold, #F43F5E Arena Rose,
 * #10B981 Jade Lotus, Cormorant Garamond editorial typography, floating Koi,
 * lotus, rotating astrolabe, and interactive Phone/MacBook preview switcher.
 * Completely isolated from the new Tactile Light Studio (/home, /explore, /workspace).
 */
export const LandingPage = () => {
  const navigate = useNavigate();
  const [device, setDevice] = useState('laptop');

  return (
    <div
      data-landing-legacy="true"
      className="relative min-h-screen w-full overflow-x-clip select-none"
      style={{
        backgroundColor: '#07090E',
        color: '#F8FAFC',
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Subtle Oriental Cyber-Academic Grid + Ambient Gold/Jade Aura */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage:
            'radial-gradient(circle at 18% 15%, rgba(234, 179, 8, 0.11), transparent 42%), radial-gradient(circle at 82% 75%, rgba(16, 185, 129, 0.09), transparent 45%), linear-gradient(to right, rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.025) 1px, transparent 1px)',
          backgroundSize: '100% 100%, 100% 100%, 48px 48px, 48px 48px',
        }}
      />

      {/* Ambient Floating Decorative SVGs (Astrolabe, Koi, Lotus, Gold Particles) */}
      <motion.svg
        aria-hidden="true"
        className="pointer-events-none fixed right-6 top-28 w-44 h-44 md:w-64 md:h-64 opacity-25 z-0"
        viewBox="0 0 200 200"
        animate={{ rotate: 360 }}
        transition={{ duration: 48, repeat: Infinity, ease: 'linear' }}
      >
        <circle cx="100" cy="100" r="88" stroke="#EAB308" strokeWidth="0.9" strokeDasharray="4 6" fill="none" />
        <circle cx="100" cy="100" r="66" stroke="#F59E0B" strokeWidth="0.7" fill="none" />
        <circle cx="100" cy="100" r="42" stroke="#10B981" strokeWidth="0.7" strokeDasharray="2 4" fill="none" />
        <path d="M100 12 L100 188 M12 100 L188 100" stroke="#EAB308" strokeOpacity="0.4" strokeWidth="0.6" />
        <circle cx="100" cy="34" r="3.5" fill="#EAB308" />
        <circle cx="166" cy="100" r="3" fill="#F43F5E" />
      </motion.svg>

      {/* Stylized White-Gold Koi Silhouette on right */}
      <motion.svg
        aria-hidden="true"
        className="pointer-events-none fixed right-8 bottom-28 w-36 h-36 md:w-52 md:h-52 opacity-20 z-0"
        viewBox="0 0 180 180"
        animate={{ y: [0, -14, 0], rotate: [-2, 3, -2] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      >
        <path
          d="M45 125 C65 75, 110 42, 138 35 C128 58, 120 82, 95 106 C115 104, 132 112, 142 126 C118 122, 96 124, 72 142 C58 138, 50 132, 45 125 Z"
          fill="url(#koiGrad)"
        />
        <defs>
          <linearGradient id="koiGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FEF08A" />
            <stop offset="65%" stopColor="#EAB308" />
            <stop offset="100%" stopColor="#FFFFFF" />
          </linearGradient>
        </defs>
      </motion.svg>

      {/* Stylized Floating Lotus Bottom-Left */}
      <motion.svg
        aria-hidden="true"
        className="pointer-events-none fixed left-6 bottom-12 w-36 h-36 opacity-25 z-0"
        viewBox="0 0 140 140"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <path d="M70 25 C84 52, 88 78, 70 100 C52 78, 56 52, 70 25 Z" fill="#10B981" fillOpacity="0.45" stroke="#34D399" strokeWidth="1" />
        <path d="M40 48 C62 60, 72 80, 70 100 C46 92, 34 74, 40 48 Z" fill="#EAB308" fillOpacity="0.28" stroke="#FBBF24" strokeWidth="0.9" />
        <path d="M100 48 C78 60, 68 80, 70 100 C94 92, 106 74, 100 48 Z" fill="#EAB308" fillOpacity="0.28" stroke="#FBBF24" strokeWidth="0.9" />
      </motion.svg>

      {/* Minimal Legacy Topbar */}
      <header className="relative z-20 mx-auto max-w-6xl px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm"
            style={{
              background: 'linear-gradient(135deg, #F59E0B, #B45309)',
              color: '#07090E',
              boxShadow: '0 0 20px rgba(245, 158, 11, 0.4)',
            }}
          >
            F
          </div>
          <div>
            <div className="font-bold tracking-wider text-sm text-amber-300">F-FORUM</div>
            <div className="text-[10px] tracking-[0.2em] uppercase text-slate-400">
              Oriental Cyber-Academic
            </div>
          </div>
        </div>

        <nav className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => navigate('/explore')}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-medium border border-white/15 bg-white/5 text-slate-200 hover:bg-white/10 transition"
          >
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            Explore Studio
          </button>
          <button
            type="button"
            onClick={() => navigate('/home')}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition"
            style={{
              background: 'linear-gradient(135deg, #F59E0B 0%, #EAB308 100%)',
              color: '#07090E',
              boxShadow: '0 6px 24px rgba(245, 158, 11, 0.3)',
            }}
          >
            Vào Studio Mới
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </nav>
      </header>

      {/* Hero Manifesto Section */}
      <main className="relative z-20 mx-auto max-w-5xl px-6 pt-8 pb-20 text-center">
        {/* Authentic CBT & 1vs1 Pills */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="flex flex-wrap items-center justify-center gap-2.5 mb-7"
        >
          <span
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide"
            style={{
              background: 'linear-gradient(135deg, rgba(245,158,11,0.2), rgba(234,179,8,0.08))',
              border: '1px solid rgba(245, 158, 11, 0.45)',
              color: '#FCD34D',
            }}
          >
            <Zap className="w-3.5 h-3.5" /> HỆ THỐNG THI CBT &amp; VIBE CODING
          </span>
          <span
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide"
            style={{
              background: 'linear-gradient(135deg, rgba(244,63,94,0.2), rgba(244,63,94,0.08))',
              border: '1px solid rgba(244, 63, 94, 0.45)',
              color: '#FDA4AF',
            }}
          >
            <Swords className="w-3.5 h-3.5" /> 1VS1 ARENA · PHẢN BIỆN CAO
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="text-4xl sm:text-6xl md:text-[68px] font-semibold leading-[1.08] tracking-tight"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          Khơi Nguồn <span className="italic text-amber-400">Tri Thức Số</span>
          <br />
          Từ Ý Tưởng Đến Dự Án Thực
        </motion.h1>

        {/* Dark Rounded Glass Manifesto Box (matching original screenshot) */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.16 }}
          className="mx-auto mt-7 max-w-2xl rounded-2xl border border-amber-500/25 bg-[#0D111A]/85 backdrop-blur-xl px-6 py-5 text-sm sm:text-base text-slate-300 leading-relaxed shadow-2xl"
        >
          <p>
            Không gian rèn luyện học thuật, thi đấu đấu trường 1vs1 và kiến tạo website thật dành cho
            học sinh, CLB và lập trình viên trẻ. Tách biệt rạch ròi với khu{' '}
            <strong className="text-amber-300 font-semibold">F-FORUM Studio Mới</strong> để giữ trọn bản sắc khởi nguyên.
          </p>
        </motion.div>

        {/* Primary Action CTAs routing cleanly into the New App (/home, /workspace) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.24 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3.5"
        >
          <button
            type="button"
            onClick={() => navigate('/home')}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold transition hover:scale-[1.03] active:scale-[0.98]"
            style={{
              background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
              color: '#07090E',
              boxShadow: '0 10px 30px rgba(245, 158, 11, 0.35)',
            }}
          >
            <Sparkles className="w-4 h-4" />
            Khám phá F-FORUM Studio (/home)
          </button>

          <button
            type="button"
            onClick={() => navigate('/workspace')}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold border border-white/20 bg-white/5 text-white hover:bg-white/10 transition"
          >
            <Terminal className="w-4 h-4 text-emerald-400" />
            Mở AI Workspace
          </button>
        </motion.div>

        {/* Interactive Phone / Laptop Preview Switcher from original f-forum.vercel.app */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.32 }}
          className="mt-14"
        >
          <div className="inline-flex items-center gap-1 p-1 rounded-full border border-white/15 bg-white/5 mb-6">
            <button
              type="button"
              onClick={() => setDevice('phone')}
              className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium transition ${
                device === 'phone' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-300 hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" /> Điện thoại
            </button>
            <button
              type="button"
              onClick={() => setDevice('laptop')}
              className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium transition ${
                device === 'laptop' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-300 hover:text-white'
              }`}
            >
              <Laptop className="w-3.5 h-3.5" /> MacBook Studio
            </button>
          </div>

          <div className="flex justify-center">
            <div
              className={`transition-all duration-500 rounded-3xl border border-amber-500/30 bg-[#0B0F18] p-4 shadow-2xl ${
                device === 'phone' ? 'w-full max-w-[340px]' : 'w-full max-w-4xl'
              }`}
            >
              {/* Mock Browser / Phone Top Chrome */}
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
                </div>
                <span className="text-[11px] font-mono text-slate-400">
                  f-forum.studio/{device === 'phone' ? 'mobile' : 'workspace'}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold">
                  Live
                </span>
              </div>

              {/* Inner Showcase Content */}
              <div className={`grid gap-4 text-left ${device === 'phone' ? 'grid-cols-1' : 'grid-cols-3'}`}>
                <div className="rounded-2xl border border-amber-500/20 bg-white/[0.03] p-4 space-y-2">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-amber-400">
                    Đấu trường CBT &amp; 1vs1
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Phòng thi trực tuyến chuẩn thời gian thực, hỗ trợ chấm điểm tức thì và bảng xếp hạng phản biện.
                  </p>
                </div>

                <div className="rounded-2xl border border-rose-500/20 bg-white/[0.03] p-4 space-y-2">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-rose-400">
                    Thư viện Tri Thức 8 Nhóm
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Truy vết 100% mã nguồn GitHub từ PinUI, ThreeUI, MotionSites, LucianLabs và CodeFronts.
                  </p>
                </div>

                <div className="rounded-2xl border border-emerald-500/20 bg-white/[0.03] p-4 space-y-2">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-emerald-400">
                    Bàn làm việc AI Proxy
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Tự điền prompt theo tác vụ, hiệu ứng Morph sang Workspace và tự động sinh code chuẩn mực.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      </main>
    </div>
  );
};

export default LandingPage;
