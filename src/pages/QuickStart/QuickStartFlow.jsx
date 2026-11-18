import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Layers, 
  Users, 
  Palette, 
  FileText,
  ShieldCheck,
  Check
} from 'lucide-react';
import { Window } from '../../components/macos/Window';
import { Button } from '../../components/macos/Button';
import { ProgressBar, Badge } from '../../components/macos/UIElements';

export const QuickStartFlow = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const initialCategory = location.state?.selectedCategory || 'club-website';
  const initialPrompt = location.state?.initialPrompt || '';

  const [step, setStep] = useState(1);
  const totalSteps = 6;

  // Form State
  const [formData, setFormData] = useState({
    projectName: 'F-Code Student Tech Club',
    goal: 'Giới thiệu câu lạc bộ, tuyển quân thành viên K20 và chia sẻ học liệu công nghệ',
    audience: 'Học sinh, sinh viên yêu thích AI, thiết kế và lập trình web',
    sections: ['Trang chủ giới thiệu', 'Đồng hồ đếm ngược tuyển quân', 'Danh sách ban chuyên môn', 'Form đăng ký trực tuyến'],
    visualStyle: 'macOS Liquid Cyber-Academic (Tối sang trọng, viền vàng kim #EAB308)',
    hasBackendForm: 'Có (Tích hợp Google Form / Webhook)',
  });

  const availableSections = [
    'Trang chủ giới thiệu (Hero Section)',
    'Đồng hồ đếm ngược tuyển quân',
    'Danh sách ban chuyên môn & lãnh đạo',
    'Form đăng ký trực tuyến',
    'Thư viện ảnh hoạt động & workshop',
    'Kho đề thi & tài liệu học thuật CBT',
    'Bảng biểu đồ thống kê hội viên',
    'Chân trang liên hệ & mạng xã hội'
  ];

  const toggleSection = (sec) => {
    setFormData(prev => {
      const exists = prev.sections.includes(sec);
      return {
        ...prev,
        sections: exists 
          ? prev.sections.filter(s => s !== sec) 
          : [...prev.sections, sec]
      };
    });
  };

  const handleNext = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleFinish = () => {
    navigate('/workspace', {
      state: {
        templateTitle: formData.projectName,
        initialPrompt: `Tạo website theo Prompt Blueprint:
- Tên dự án: ${formData.projectName}
- Mục tiêu: ${formData.goal}
- Đối tượng: ${formData.audience}
- Các thành phần: ${formData.sections.join(', ')}
- Phong cách: ${formData.visualStyle}
- Tích hợp biểu mẫu: ${formData.hasBackendForm}`
      }
    });
  };

  return (
    <div className="max-w-3xl mx-auto py-4 space-y-6">
      {/* Top Progress Indicator */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
          <span className="flex items-center gap-1.5 text-ff-gold">
            <Sparkles className="w-3.5 h-3.5" />
            Quick Start Blueprint Wizard
          </span>
          <span>Bước {step} / {totalSteps}</span>
        </div>
        <ProgressBar progress={(step / totalSteps) * 100} showPercent={false} />
      </div>

      {/* Main macOS Wizard Window */}
      <Window
        title={`Tạo Dự Án Nhanh — Bước ${step}: ${
          step === 1 ? 'Tên Dự Án' :
          step === 2 ? 'Mục Tiêu Chính' :
          step === 3 ? 'Đối Tượng Người Dùng' :
          step === 4 ? 'Nội Dung & Các Khối' :
          step === 5 ? 'Phong Cách Thị Giác' : 'Xác Nhận Kế Hoạch'
        }`}
        subtitle="Prompt Blueprint Generator"
        className="border-white/15"
      >
        <div className="p-6 sm:p-8 space-y-6">
          {/* STEP 1: PROJECT NAME */}
          {step === 1 && (
            <div className="space-y-4 animate-fadeIn">
              <div className="space-y-1">
                <h3 className="text-xl font-serif font-bold text-neutral-100">
                  Tên dự án của bạn là gì?
                </h3>
                <p className="text-xs text-neutral-400">
                  Đặt tên cho website hoặc ứng dụng web của bạn để AI tổ chức cấu trúc tệp.
                </p>
              </div>

              <input
                type="text"
                value={formData.projectName}
                onChange={e => setFormData({ ...formData, projectName: e.target.value })}
                placeholder="Ví dụ: CLB Sáng Tạo Trẻ FPT..."
                className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-white/10 text-neutral-100 text-sm focus:outline-none focus:border-ff-gold"
              />
            </div>
          )}

          {/* STEP 2: GOAL */}
          {step === 2 && (
            <div className="space-y-4 animate-fadeIn">
              <div className="space-y-1">
                <h3 className="text-xl font-serif font-bold text-neutral-100">
                  Mục đích chính của sản phẩm này là gì?
                </h3>
                <p className="text-xs text-neutral-400">
                  AI sẽ dựa vào mục tiêu để sắp xếp luồng hành vi (CTA) mạnh mẽ nhất.
                </p>
              </div>

              <textarea
                rows={4}
                value={formData.goal}
                onChange={e => setFormData({ ...formData, goal: e.target.value })}
                placeholder="Ví dụ: Giới thiệu CLB và thu hút hơn 100 sinh viên nộp đơn tuyển thành viên..."
                className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-white/10 text-neutral-100 text-sm focus:outline-none focus:border-ff-gold"
              />
            </div>
          )}

          {/* STEP 3: AUDIENCE */}
          {step === 3 && (
            <div className="space-y-4 animate-fadeIn">
              <div className="space-y-1">
                <h3 className="text-xl font-serif font-bold text-neutral-100">
                  Ai là đối tượng người xem hoặc sử dụng chính?
                </h3>
                <p className="text-xs text-neutral-400">
                  Xác định đúng người dùng giúp thiết kế cỡ chữ và giao diện trực quan hơn.
                </p>
              </div>

              <input
                type="text"
                value={formData.audience}
                onChange={e => setFormData({ ...formData, audience: e.target.value })}
                placeholder="Ví dụ: Học sinh THPT và sinh viên năm nhất..."
                className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-white/10 text-neutral-100 text-sm focus:outline-none focus:border-ff-gold"
              />
            </div>
          )}

          {/* STEP 4: SECTIONS */}
          {step === 4 && (
            <div className="space-y-4 animate-fadeIn">
              <div className="space-y-1">
                <h3 className="text-xl font-serif font-bold text-neutral-100">
                  Các trang hoặc khối nội dung cần có?
                </h3>
                <p className="text-xs text-neutral-400">
                  Chọn các khối bạn muốn có trên trang web của mình:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {availableSections.map((sec) => {
                  const selected = formData.sections.includes(sec);
                  return (
                    <button
                      key={sec}
                      type="button"
                      onClick={() => toggleSection(sec)}
                      className={`p-3 rounded-xl border text-left flex items-center justify-between text-xs transition-all cursor-pointer ${
                        selected
                          ? 'bg-ff-gold/15 border-ff-gold text-ff-gold-light font-medium'
                          : 'bg-white/5 border-white/10 text-neutral-300 hover:bg-white/10'
                      }`}
                    >
                      <span>{sec}</span>
                      {selected && <Check className="w-4 h-4 text-ff-gold shrink-0 ml-2" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 5: VISUAL STYLE */}
          {step === 5 && (
            <div className="space-y-4 animate-fadeIn">
              <div className="space-y-1">
                <h3 className="text-xl font-serif font-bold text-neutral-100">
                  Phong cách thẩm mỹ & màu sắc mong muốn?
                </h3>
                <p className="text-xs text-neutral-400">
                  Chọn định hướng hình ảnh phù hợp với thương hiệu của bạn:
                </p>
              </div>

              <div className="space-y-2">
                {[
                  'macOS Liquid Cyber-Academic (Tối sang trọng, viền vàng kim #EAB308)',
                  'Minimalist Apple Clean (Nền sáng, font Inter tinh giản)',
                  'Neon Tech Dark (Đen sâu thẳm, quầng sáng xanh dương và hồng neon)',
                  'Academic Classic (Serif cổ điển, trắng ấm ngọc trai và xanh ngọc)'
                ].map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setFormData({ ...formData, visualStyle: st })}
                    className={`w-full p-3.5 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                      formData.visualStyle === st
                        ? 'bg-ff-gold/15 border-ff-gold text-ff-gold-light font-semibold'
                        : 'bg-white/5 border-white/10 text-neutral-300 hover:bg-white/10'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 6: BLUEPRINT CONFIRMATION */}
          {step === 6 && (
            <div className="space-y-5 animate-fadeIn">
              <div className="p-4 rounded-xl bg-ff-gold/10 border border-ff-gold/30 text-ff-gold-light space-y-1">
                <h4 className="font-serif font-bold text-base flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Bản Tóm Tắt Yêu Cầu (Prompt Blueprint) Đã Sẵn Sàng
                </h4>
                <p className="text-xs text-neutral-300">
                  Hệ thống đã ghép câu trả lời của bạn thành yêu cầu kỹ thuật chuẩn để AI Agent bắt đầu lập trình ngay.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-black/60 border border-white/10 space-y-3 font-mono text-xs text-neutral-300">
                <div>
                  <span className="text-neutral-500">Tên dự án:</span>{' '}
                  <span className="text-ff-gold-light font-bold">{formData.projectName}</span>
                </div>
                <div>
                  <span className="text-neutral-500">Mục tiêu:</span> {formData.goal}
                </div>
                <div>
                  <span className="text-neutral-500">Đối tượng:</span> {formData.audience}
                </div>
                <div>
                  <span className="text-neutral-500">Các khối nội dung:</span>
                  <ul className="list-disc pl-5 mt-1 space-y-0.5 text-neutral-400">
                    {formData.sections.map((s, idx) => <li key={idx}>{s}</li>)}
                  </ul>
                </div>
                <div>
                  <span className="text-neutral-500">Phong cách:</span> {formData.visualStyle}
                </div>
              </div>
            </div>
          )}

          {/* Wizard Action Controls */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              icon={ArrowLeft}
              disabled={step === 1}
              onClick={handleBack}
            >
              Quay lại
            </Button>

            {step < totalSteps ? (
              <Button
                variant="primary"
                size="md"
                iconRight={ArrowRight}
                onClick={handleNext}
              >
                Tiếp tục
              </Button>
            ) : (
              <Button
                variant="primary"
                size="lg"
                iconRight={Sparkles}
                onClick={handleFinish}
              >
                Bắt Đầu Tạo Trong Workspace
              </Button>
            )}
          </div>
        </div>
      </Window>
    </div>
  );
};
