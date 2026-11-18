export const mockFilesTree = [
  {
    name: 'src',
    type: 'folder',
    children: [
      {
        name: 'components',
        type: 'folder',
        children: [
          { name: 'HeroSection.jsx', type: 'file', active: true },
          { name: 'CountdownTimer.jsx', type: 'file' },
          { name: 'DepartmentGrid.jsx', type: 'file' },
          { name: 'ApplicationModal.jsx', type: 'file' },
          { name: 'Footer.jsx', type: 'file' }
        ]
      },
      { name: 'App.jsx', type: 'file' },
      { name: 'main.jsx', type: 'file' },
      { name: 'index.css', type: 'file' }
    ]
  },
  { name: 'package.json', type: 'file' },
  { name: 'README.md', type: 'file' }
];

export const mockFileContents = {
  'HeroSection.jsx': `import React from 'react';
import { CountdownTimer } from './CountdownTimer';
import { Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

export const HeroSection = ({ onApplyClick }) => {
  return (
    <section className="relative overflow-hidden pt-20 pb-16 px-6 text-center">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-ff-gold/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-ff-gold/30 bg-ff-gold/5 text-ff-gold-light text-xs font-medium mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>F-Code Technology Club · Tuyển quân K20</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-serif font-bold text-neutral-100 tracking-tight leading-tight mb-6">
          Khai phóng tiềm năng, cùng kiến tạo <span className="text-transparent bg-clip-text bg-gradient-to-r from-ff-gold via-amber-300 to-yellow-500">tương lai công nghệ</span>.
        </h1>

        <p className="text-lg text-neutral-300 max-w-2xl mx-auto mb-8 font-sans">
          Môi trường kết nối các bạn trẻ đam mê AI, Vibe Coding, Thiết kế và Lập trình phần mềm. Không yêu cầu kinh nghiệm ban đầu.
        </p>

        {/* Dynamic Countdown */}
        <div className="mb-10">
          <p className="text-xs text-neutral-400 uppercase tracking-widest mb-3 font-mono">Thời gian còn lại để nộp đơn tuyển thành viên</p>
          <CountdownTimer targetDate="2026-12-01T23:59:59" />
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button 
            onClick={onApplyClick}
            className="px-7 py-3.5 rounded-full bg-gradient-to-r from-ff-gold to-amber-500 text-black font-semibold shadow-lg hover:shadow-ff-gold/30 hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-2 cursor-pointer"
          >
            <span>Nộp Đơn Ứng Tuyển</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          
          <a 
            href="#departments" 
            className="px-7 py-3.5 rounded-full glass-panel hover:bg-neutral-800/60 text-neutral-200 font-medium transition-all"
          >
            Tìm hiểu các ban
          </a>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 flex items-center justify-center gap-6 text-xs text-neutral-400">
          <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-ff-jade" /> Miễn phí tham gia</span>
          <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-ff-jade" /> Có người hướng dẫn 1-on-1</span>
        </div>
      </div>
    </section>
  );
};`,
  'CountdownTimer.jsx': `import React, { useState, useEffect } from 'react';

export const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 12, hours: 8, minutes: 45, seconds: 20 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        return { ...prev, seconds: 59, minutes: prev.minutes - 1 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="inline-grid grid-cols-4 gap-3 bg-neutral-900/80 p-3 rounded-2xl border border-ff-gold/20 backdrop-blur-md">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div key={unit} className="flex flex-col items-center px-3 py-1">
          <span className="text-2xl font-mono font-bold text-ff-gold-light">{String(value).padStart(2, '0')}</span>
          <span className="text-[10px] text-neutral-400 uppercase tracking-wider">{unit}</span>
        </div>
      ))}
    </div>
  );
};`
};

export const mockDiffChanges = [
  {
    fileName: 'src/components/HeroSection.jsx',
    status: 'modified',
    summary: 'Tích hợp component CountdownTimer và cập nhật gradient nút bấm sang màu vàng kim #EAB308.',
    addedLines: 12,
    removedLines: 4,
    diffText: `@@ -15,4 +15,12 @@
- <div className="mb-6 text-neutral-400">Hạn nộp đơn: 01/12/2026</div>
+ {/* Dynamic Countdown */}
+ <div className="mb-10">
+   <p className="text-xs text-neutral-400 uppercase tracking-widest mb-3 font-mono">Thời gian còn lại để nộp đơn tuyển thành viên</p>
+   <CountdownTimer targetDate="2026-12-01T23:59:59" />
+ </div>
- <button className="bg-blue-600 text-white">Nộp đơn</button>
+ <button className="bg-gradient-to-r from-ff-gold to-amber-500 text-black font-semibold shadow-lg hover:shadow-ff-gold/30">Nộp Đơn Ứng Tuyển</button>`
  }
];
