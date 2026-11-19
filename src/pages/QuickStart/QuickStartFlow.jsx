import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  Check
} from 'lucide-react';
import { Window } from '../../components/macos/Window';
import { Button } from '../../components/macos/Button';
import { ProgressBar } from '../../components/macos/UIElements';

export const QuickStartFlow = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const initialPrompt = location.state?.initialPrompt || '';

  const [step, setStep] = useState(1);
  const totalSteps = 6;

  const [formData, setFormData] = useState({
    projectName: initialPrompt ? `Dự án: ${initialPrompt.slice(0, 32)}` : 'F-Code Student Tech Club',
    goal: initialPrompt || 'Giới thiệu câu lạc bộ, tuyển quân thành viên K20 và chia sẻ học liệu công nghệ',
    audience: 'Học sinh, sinh viên yêu thích AI, thiết kế và lập trình web',
    sections: ['Trang chủ giới thiệu (Hero Section)', 'Đồng hồ đếm ngược tuyển quân', 'Danh sách ban chuyên môn & lãnh đạo', 'Form đăng ký trực tuyến'],
    visualStyle: 'F-Forum Pure Black Liquid Glass (Đen thuần khiết, chữ trắng tinh giản)',
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
        autoSubmit: true,
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
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
          <span className="flex items-center gap-1.5 text-foreground">
            <Sparkles className="w-3.5 h-3.5" />
            Quick Start Blueprint Wizard
          </span>
          <span>Bước {step} / {totalSteps}</span>
        </div>
        <ProgressBar progress={(step / totalSteps) * 100} showPercent={false} />
      </div>

      <Window
        title={`Tạo Dự Án Nhanh — Bước ${step}: ${
          step === 1 ? 'Tên Dự Án' :
          step === 2 ? 'Mục Tiêu Chính' :
          step === 3 ? 'Đối Tượng Người Dùng' :
          step === 4 ? 'Nội Dung & Các Khối' :
          step === 5 ? 'Phong Cách Thị Giác' : 'Xác Nhận Kế Hoạch'
        }`}
        subtitle="Prompt Blueprint Generator"
      >
        <div className="p-6 sm:p-8 space-y-6">
          {step === 1 && (
            <div className="space-y-4 animate-fadeIn">
              <div className="space-y-1">
                <h3 className="text-xl font-sans font-semibold text-foreground">
                  Tên dự án của bạn là gì?
                </h3>
                <p className="text-xs text-muted-foreground">
                  Đặt tên cho website hoặc ứng dụng web của bạn để AI tổ chức cấu trúc tệp.
                </p>
              </div>

              <input
                type="text"
                value={formData.projectName}
                onChange={e => setFormData({ ...formData, projectName: e.target.value })}
                placeholder="Ví dụ: CLB Sáng Tạo Trẻ FPT..."
                className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground text-sm focus:outline-none focus:border-blue-500"
              />
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 animate-fadeIn">
              <div className="space-y-1">
                <h3 className="text-xl font-sans font-semibold text-foreground">
                  Mục đích chính của sản phẩm này là gì?
                </h3>
                <p className="text-xs text-muted-foreground">
                  AI sẽ dựa vào mục tiêu để sắp xếp luồng hành vi (CTA) mạnh mẽ nhất.
                </p>
              </div>

              <textarea
                rows={4}
                value={formData.goal}
                onChange={e => setFormData({ ...formData, goal: e.target.value })}
                placeholder="Ví dụ: Giới thiệu CLB và thu hút hơn 100 sinh viên nộp đơn tuyển thành viên..."
                className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground text-sm focus:outline-none focus:border-blue-500"
              />
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4 animate-fadeIn">
              <div className="space-y-1">
                <h3 className="text-xl font-sans font-semibold text-foreground">
                  Ai là đối tượng người xem hoặc sử dụng chính?
                </h3>
                <p className="text-xs text-muted-foreground">
                  Xác định đúng người dùng giúp thiết kế cỡ chữ và giao diện trực quan hơn.
                </p>
              </div>

              <input
                type="text"
                value={formData.audience}
                onChange={e => setFormData({ ...formData, audience: e.target.value })}
                placeholder="Ví dụ: Học sinh THPT và sinh viên năm nhất..."
                className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground text-sm focus:outline-none focus:border-blue-500"
              />
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4 animate-fadeIn">
              <div className="space-y-1">
                <h3 className="text-xl font-sans font-semibold text-foreground">
                  Các trang hoặc khối nội dung cần có?
                </h3>
                <p className="text-xs text-muted-foreground">
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
                          ? 'bg-foreground text-background border-foreground font-semibold'
                          : 'bg-white/5 border-white/10 text-neutral-300 hover:bg-white/10'
                      }`}
                    >
                      <span>{sec}</span>
                      {selected && <Check className="w-4 h-4 shrink-0 ml-2" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-4 animate-fadeIn">
              <div className="space-y-1">
                <h3 className="text-xl font-sans font-semibold text-foreground">
                  Phong cách thẩm mỹ & màu sắc mong muốn?
                </h3>
                <p className="text-xs text-muted-foreground">
                  Chọn định hướng hình ảnh phù hợp với thương hiệu của bạn:
                </p>
              </div>

              <div className="space-y-2">
                {[
                  'F-Forum Pure Black Liquid Glass (Đen thuần khiết, chữ trắng tinh giản)',
                  'Minimalist Clean Light (Nền sáng, font Inter tinh giản)',
                  'Obsidian Serif Editorial (Inter kết hợp điểm nhấn Instrument Serif)',
                  'High-Contrast Studio Dark (Bảng điều khiển chuyên sâu, viền kính mảnh)'
                ].map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setFormData({ ...formData, visualStyle: st })}
                    className={`w-full p-3.5 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                      formData.visualStyle === st
                        ? 'bg-foreground text-background border-foreground font-semibold'
                        : 'bg-white/5 border-white/10 text-neutral-300 hover:bg-white/10'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 6 && (
            <div className="space-y-5 animate-fadeIn">
              <div className="p-4 rounded-xl liquid-glass text-foreground space-y-1">
                <h4 className="font-sans font-semibold text-base flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Bản Tóm Tắt Yêu Cầu (Prompt Blueprint) Đã Sẵn Sàng
                </h4>
                <p className="text-xs text-muted-foreground">
                  Hệ thống đã ghép câu trả lời của bạn thành yêu cầu kỹ thuật chuẩn để AI Agent bắt đầu lập trình ngay.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-muted/60 border border-border space-y-3 font-mono text-xs text-foreground">
                <div>
                  <span className="text-muted-foreground">Tên dự án:</span>{' '}
                  <span className="text-foreground font-bold">{formData.projectName}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Mục tiêu:</span> {formData.goal}
                </div>
                <div>
                  <span className="text-muted-foreground">Đối tượng:</span> {formData.audience}
                </div>
                <div>
                  <span className="text-muted-foreground">Các khối nội dung:</span>
                  <ul className="list-disc pl-5 mt-1 space-y-0.5 text-muted-foreground">
                    {formData.sections.map((s, idx) => <li key={idx}>{s}</li>)}
                  </ul>
                </div>
                <div>
                  <span className="text-muted-foreground">Phong cách:</span> {formData.visualStyle}
                </div>
              </div>
            </div>
          )}

          <div className="pt-4 border-t border-border flex items-center justify-between">
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
