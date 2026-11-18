import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { 
  Send, 
  Sparkles, 
  Laptop, 
  Smartphone, 
  Maximize2, 
  RotateCcw, 
  Code2, 
  GitCompare, 
  ShieldCheck, 
  Clock, 
  Download, 
  History, 
  FileText, 
  Folder, 
  File, 
  ChevronRight, 
  ChevronDown, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Play, 
  Paperclip,
  Eye,
  ExternalLink,
  Terminal,
  Layers,
  ArrowRight
} from 'lucide-react';
import { Window } from '../../components/macos/Window';
import { Button } from '../../components/macos/Button';
import { Badge, Tabs, ProgressBar } from '../../components/macos/UIElements';
import { mockChatMessages, mockProgressTasks, mockChecks } from '../../data/mockChat';
import { mockFilesTree, mockFileContents, mockDiffChanges } from '../../data/mockCode';

export const WorkspacePage = () => {
  const location = useLocation();
  const passedPrompt = location.state?.initialPrompt || '';
  const passedTemplate = location.state?.templateTitle || '';

  // Workspace active tab
  const [activeTab, setActiveTab] = useState('preview'); // 'preview', 'code', 'diff', 'checks', 'progress', 'history', 'export'
  const [deviceView, setDeviceView] = useState('desktop'); // 'desktop' | 'mobile'

  // Chat state
  const [chatList, setChatList] = useState(() => {
    if (passedPrompt) {
      return [
        ...mockChatMessages,
        {
          id: `msg-${Date.now()}`,
          sender: 'user',
          timestamp: 'Bây giờ',
          content: passedPrompt
        },
        {
          id: `msg-${Date.now() + 1}`,
          sender: 'ai',
          timestamp: 'Bây giờ',
          content: `Tôi đã nhận yêu cầu tạo: "${passedPrompt}". Đang khởi tạo các thành phần giao diện và kiểm thử an toàn... Bạn có thể xem bản xem trước trực tiếp bên cạnh!`
        }
      ];
    }
    return mockChatMessages;
  });
  const [inputMessage, setInputMessage] = useState('');
  const [isAiThinking, setIsAiThinking] = useState(false);

  // Code Panel State
  const [selectedFile, setSelectedFile] = useState('HeroSection.jsx');

  // Preview Interactive State
  const [previewCountdown, setPreviewCountdown] = useState(12);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMsg = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      timestamp: 'Bây giờ',
      content: inputMessage.trim()
    };
    setChatList(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsAiThinking(true);

    setTimeout(() => {
      const aiResponse = {
        id: `msg-${Date.now() + 1}`,
        sender: 'ai',
        timestamp: 'Bây giờ',
        content: `Đã áp dụng thay đổi theo yêu cầu! Tôi đã cập nhật mã nguồn và chạy lại các bài kiểm tra Checks. Bạn hãy kiểm tra trong Live Preview nhé.`
      };
      setChatList(prev => [...prev, aiResponse]);
      setIsAiThinking(false);
    }, 1200);
  };

  const workspaceTabs = [
    { id: 'preview', label: 'Xem Ứng Dụng (Preview)', icon: Eye },
    { id: 'code', label: 'Mã Nguồn (Code)', icon: Code2 },
    { id: 'diff', label: 'So Sánh (Diff)', icon: GitCompare, badge: '1 Sửa' },
    { id: 'checks', label: 'Kiểm Tra (Checks)', icon: ShieldCheck, badge: '5/6 Đạt' },
    { id: 'progress', label: 'Tiến Trình (Progress)', icon: Clock },
    { id: 'export', label: 'Xuất Bản (Export)', icon: Download },
  ];

  return (
    <div className="h-[calc(100vh-6.5rem)] flex flex-col gap-3">
      {/* Workspace Sub-Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-2">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-ff-gold to-amber-500 text-black font-bold flex items-center justify-center font-serif text-base shadow-sm">
            F
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif font-bold text-lg text-neutral-100">
                {passedTemplate || 'Website CLB Sinh Viên K20'}
              </h1>
              <Badge variant="gold" size="xs">Workspace Studio</Badge>
            </div>
            <p className="text-[11px] font-mono text-neutral-400">
              ID: proj-fcode-2026 · Khung làm việc: React + Tailwind CSS
            </p>
          </div>
        </div>

        {/* Studio Navigation Tabs */}
        <Tabs 
          tabs={workspaceTabs} 
          activeTab={activeTab} 
          onChange={setActiveTab} 
          className="hidden sm:inline-flex"
        />
      </div>

      {/* Main Studio Grid: 2 Columns */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 min-h-0">
        {/* ================= LEFT COLUMN: AI CHAT (4.5 cols) ================= */}
        <div className="lg:col-span-5 flex flex-col min-h-0">
          <Window 
            title="AI Creation Agent · Trò Chuyện & Chỉ Dẫn" 
            subtitle="Claude Opus / Gemini Flash"
            className="h-full flex flex-col border-white/10"
            headerRight={
              <span className="flex items-center gap-1.5 text-[10px] text-ff-jade font-mono">
                <span className="w-2 h-2 rounded-full bg-ff-jade animate-pulse" />
                Sẵn sàng
              </span>
            }
          >
            {/* Chat Messages Scroll Area */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 max-h-[calc(100vh-17rem)]">
              {chatList.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    msg.sender === 'user' ? 'items-end' : 'items-start'
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-1 px-1">
                    <span className="text-[10px] font-mono text-neutral-400">
                      {msg.sender === 'user' ? 'Bạn' : 'F-Forum AI'}
                    </span>
                    <span className="text-[10px] text-neutral-500">{msg.timestamp}</span>
                  </div>

                  <div
                    className={`max-w-[88%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap ${
                      msg.sender === 'user'
                        ? 'bg-ff-gold text-black font-medium shadow-md shadow-ff-gold/15'
                        : 'glass-panel text-neutral-200 border-white/10'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {isAiThinking && (
                <div className="flex items-center gap-2 text-xs text-ff-gold p-2">
                  <Sparkles className="w-4 h-4 animate-spin" />
                  <span>AI đang phân tích yêu cầu và chỉnh sửa mã nguồn...</span>
                </div>
              )}
            </div>

            {/* Quick Prompt Suggestions */}
            <div className="px-3 py-2 border-t border-white/5 bg-white/[0.01] flex items-center gap-1.5 overflow-x-auto text-[11px] whitespace-nowrap">
              <span className="text-neutral-500 font-mono">Gợi ý:</span>
              <button
                onClick={() => setInputMessage('Đổi tiêu đề hero section sang nổi bật hơn')}
                className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300"
              >
                Đổi tiêu đề
              </button>
              <button
                onClick={() => setInputMessage('Thêm form thu thập email đăng ký')}
                className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300"
              >
                Thêm form email
              </button>
              <button
                onClick={() => setInputMessage('Tối ưu hiển thị cho điện thoại')}
                className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300"
              >
                Tối ưu mobile
              </button>
            </div>

            {/* Chat Input Bar */}
            <form onSubmit={handleSendMessage} className="p-3 border-t border-white/10 bg-black/40 flex items-center gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={e => setInputMessage(e.target.value)}
                placeholder="Yêu cầu AI sửa giao diện, thêm tính năng..."
                className="flex-1 bg-neutral-900/80 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-ff-gold"
              />
              <Button type="submit" variant="primary" size="sm" icon={Send}>
                Gửi
              </Button>
            </form>
          </Window>
        </div>

        {/* ================= RIGHT COLUMN: INTERACTIVE PANELS (7.5 cols) ================= */}
        <div className="lg:col-span-7 flex flex-col min-h-0">
          {/* TAB 1: LIVE PREVIEW */}
          {activeTab === 'preview' && (
            <Window
              title="Browser Preview"
              subtitle="https://f-code-club.preview.f-forum.edu.vn"
              className="h-full flex flex-col border-white/15"
              headerRight={
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setDeviceView('desktop')}
                    className={`p-1 rounded ${deviceView === 'desktop' ? 'bg-ff-gold text-black' : 'text-neutral-400 hover:text-white'}`}
                    title="Chế độ Desktop"
                  >
                    <Laptop className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setDeviceView('mobile')}
                    className={`p-1 rounded ${deviceView === 'mobile' ? 'bg-ff-gold text-black' : 'text-neutral-400 hover:text-white'}`}
                    title="Chế độ Mobile"
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                  </button>
                  <button 
                    onClick={() => setPreviewCountdown(prev => prev + 1)}
                    className="p-1 rounded text-neutral-400 hover:text-white"
                    title="Làm mới"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>
              }
            >
              {/* Address Bar */}
              <div className="px-4 py-2 border-b border-white/5 bg-neutral-900/50 flex items-center gap-2 text-xs font-mono text-neutral-400">
                <span className="w-2 h-2 rounded-full bg-ff-jade" />
                <span className="truncate flex-1">http://localhost:5173/preview</span>
                <span className="text-[10px] text-ff-gold">HTTPS SECURE</span>
              </div>

              {/* Viewport content */}
              <div className="flex-1 overflow-y-auto p-4 bg-neutral-950/80 flex items-center justify-center min-h-[380px]">
                <div 
                  className={`transition-all duration-300 ${
                    deviceView === 'mobile' 
                      ? 'w-[320px] rounded-3xl border-4 border-neutral-700 p-4 shadow-2xl bg-neutral-900' 
                      : 'w-full max-w-2xl'
                  }`}
                >
                  {/* Mock live app */}
                  <div className="rounded-2xl border border-ff-gold/25 bg-neutral-900/90 p-6 space-y-5 text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-ff-gold/10 rounded-full blur-2xl" />

                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-ff-gold/10 border border-ff-gold/30 text-ff-gold text-xs font-semibold">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Tuyển Thành Viên K20</span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-100">
                      F-Code Technology Club
                    </h2>

                    <p className="text-xs text-neutral-300 max-w-md mx-auto leading-relaxed">
                      Nơi biến ý tưởng phần mềm thành sản phẩm thực tế. Cùng xây dựng các dự án công nghệ cho trường học và cộng đồng.
                    </p>

                    {/* Interactive Countdown */}
                    <div className="py-2">
                      <p className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-2">
                        Thời gian còn lại để nộp hồ sơ
                      </p>
                      <div className="inline-grid grid-cols-4 gap-2 bg-black/60 p-2.5 rounded-xl border border-white/10 font-mono">
                        <div>
                          <span className="text-xl font-bold text-ff-gold">{previewCountdown}</span>
                          <span className="block text-[9px] text-neutral-400">NGÀY</span>
                        </div>
                        <div>
                          <span className="text-xl font-bold text-ff-gold">08</span>
                          <span className="block text-[9px] text-neutral-400">GIỜ</span>
                        </div>
                        <div>
                          <span className="text-xl font-bold text-ff-gold">45</span>
                          <span className="block text-[9px] text-neutral-400">PHÚT</span>
                        </div>
                        <div>
                          <span className="text-xl font-bold text-ff-gold">20</span>
                          <span className="block text-[9px] text-neutral-400">GIÂY</span>
                        </div>
                      </div>
                    </div>

                    {/* Call to action */}
                    <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                      <button 
                        onClick={() => alert('Đã mở form đăng ký thành viên!')}
                        className="px-6 py-2.5 rounded-full bg-gradient-to-r from-ff-gold to-amber-500 text-black font-bold text-xs shadow-lg hover:shadow-ff-gold/30 cursor-pointer"
                      >
                        Nộp Đơn Ứng Tuyển Ngay
                      </button>
                      <button className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/15 text-neutral-200 text-xs font-medium">
                        Xem Các Ban
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Window>
          )}

          {/* TAB 2: CODE & FILES */}
          {activeTab === 'code' && (
            <Window
              title={`Source Code Editor — ${selectedFile}`}
              subtitle="read-only view"
              className="h-full flex flex-col border-white/10"
            >
              <div className="flex-1 grid grid-cols-12 min-h-[380px]">
                {/* File tree sidebar (3 cols) */}
                <div className="col-span-4 border-r border-white/10 bg-neutral-950/70 p-3 space-y-1 font-mono text-xs overflow-y-auto">
                  <p className="text-[10px] text-neutral-500 uppercase tracking-wider mb-2">Cấu Trúc Tệp</p>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-neutral-300 font-semibold py-1">
                      <Folder className="w-3.5 h-3.5 text-ff-gold" />
                      <span>src / components</span>
                    </div>
                    {['HeroSection.jsx', 'CountdownTimer.jsx'].map(fn => (
                      <button
                        key={fn}
                        onClick={() => setSelectedFile(fn)}
                        className={`w-full flex items-center gap-2 pl-4 py-1.5 rounded-md text-left transition-colors cursor-pointer ${
                          selectedFile === fn ? 'bg-ff-gold/20 text-ff-gold font-bold' : 'text-neutral-400 hover:text-white'
                        }`}
                      >
                        <File className="w-3 h-3" />
                        <span className="truncate">{fn}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Code syntax viewer (8 cols) */}
                <div className="col-span-8 p-4 bg-neutral-950 overflow-y-auto font-mono text-xs leading-relaxed text-neutral-200">
                  <pre className="text-neutral-300 whitespace-pre">
                    {mockFileContents[selectedFile] || '// Tệp không có nội dung'}
                  </pre>
                </div>
              </div>
            </Window>
          )}

          {/* TAB 3: DIFF VIEWER */}
          {activeTab === 'diff' && (
            <Window
              title="Arena Changes Diff Inspector"
              subtitle="So sánh thay đổi trước & sau"
              className="h-full flex flex-col border-white/10"
            >
              <div className="p-4 space-y-4 overflow-y-auto flex-1">
                {mockDiffChanges.map((df, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-white/5 border border-white/10">
                      <div className="flex items-center gap-2 font-mono text-xs">
                        <span className="w-2 h-2 rounded-full bg-ff-gold" />
                        <span className="text-neutral-100 font-bold">{df.fileName}</span>
                        <span className="text-ff-jade text-[11px]">+{df.addedLines}</span>
                        <span className="text-ff-rose text-[11px]">-{df.removedLines}</span>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 font-mono">
                        {df.status}
                      </span>
                    </div>

                    <p className="text-xs text-neutral-300 italic px-1">
                      Tóm tắt thay đổi từ AI: {df.summary}
                    </p>

                    <div className="p-3 rounded-xl bg-black/80 font-mono text-[11px] leading-relaxed border border-white/5 overflow-x-auto">
                      <pre className="text-neutral-300">
                        {df.diffText.split('\n').map((line, lIdx) => {
                          const isAdd = line.startsWith('+');
                          const isRem = line.startsWith('-');
                          return (
                            <div 
                              key={lIdx}
                              className={isAdd ? 'bg-ff-jade/15 text-emerald-300 px-1' : isRem ? 'bg-ff-rose/15 text-rose-300 px-1' : 'text-neutral-400'}
                            >
                              {line}
                            </div>
                          );
                        })}
                      </pre>
                    </div>
                  </div>
                ))}
              </div>
            </Window>
          )}

          {/* TAB 4: CHECKS INSPECTOR */}
          {activeTab === 'checks' && (
            <Window
              title="Arena Checks & Verification Engine"
              subtitle="Trạng thái kiểm thử sản phẩm"
              className="h-full flex flex-col border-white/10"
            >
              <div className="p-4 space-y-3 overflow-y-auto flex-1">
                <div className="p-3 rounded-xl bg-ff-gold/10 border border-ff-gold/25 flex items-center justify-between text-xs text-ff-gold-light">
                  <span>Tổng hợp kết quả kiểm tra: 5 Passed · 1 Cảnh báo · 0 Lỗi nghiêm trọng</span>
                  <Badge variant="jade" size="xs">An Toàn Xuất Bản</Badge>
                </div>

                <div className="divide-y divide-white/5 space-y-2">
                  {mockChecks.map((chk) => (
                    <div key={chk.id} className="pt-2 flex items-start gap-3">
                      {chk.status === 'passed' && <CheckCircle2 className="w-4 h-4 text-ff-jade shrink-0 mt-0.5" />}
                      {chk.status === 'warning' && <AlertTriangle className="w-4 h-4 text-ff-gold shrink-0 mt-0.5" />}
                      {chk.status === 'untested' && <div className="w-4 h-4 rounded-full border border-neutral-500 shrink-0 mt-0.5" />}

                      <div className="space-y-0.5 flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-xs text-neutral-100">{chk.name}</p>
                          <span className={`text-[10px] font-mono uppercase ${
                            chk.status === 'passed' ? 'text-ff-jade' : chk.status === 'warning' ? 'text-ff-gold' : 'text-neutral-500'
                          }`}>
                            {chk.status}
                          </span>
                        </div>
                        <p className="text-xs text-neutral-400 leading-relaxed">{chk.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Window>
          )}

          {/* TAB 5: PROGRESS TIMELINE */}
          {activeTab === 'progress' && (
            <Window
              title="Arena Real-Time Task Progress"
              subtitle="Sự kiện thực tế từ AI Execution Sandbox"
              className="h-full flex flex-col border-white/10"
            >
              <div className="p-5 space-y-5 overflow-y-auto flex-1">
                <ProgressBar progress={80} label="Tiến trình hoàn thiện dự án" />

                <div className="space-y-4 relative pl-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-white/10">
                  {mockProgressTasks.map((t) => (
                    <div key={t.id} className="relative flex items-center justify-between">
                      <div className={`absolute -left-6 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        t.status === 'completed' 
                          ? 'bg-ff-jade text-black' 
                          : t.status === 'running' 
                          ? 'bg-ff-gold text-black animate-pulse' 
                          : 'bg-neutral-800 text-neutral-400'
                      }`}>
                        {t.status === 'completed' ? '✓' : t.id}
                      </div>

                      <div className="space-y-0.5">
                        <p className={`text-xs font-medium ${t.status === 'completed' ? 'text-neutral-200' : 'text-ff-gold'}`}>
                          {t.title}
                        </p>
                        <span className="text-[10px] text-neutral-500 font-mono">Thời điểm: {t.time}</span>
                      </div>

                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono uppercase ${
                        t.status === 'completed' ? 'bg-ff-jade/10 text-ff-jade' : 'bg-ff-gold/10 text-ff-gold'
                      }`}>
                        {t.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Window>
          )}

          {/* TAB 6: EXPORT */}
          {activeTab === 'export' && (
            <Window
              title="Export & Ownership Center"
              subtitle="Làm chủ sản phẩm — Không khóa nền tảng"
              className="h-full flex flex-col border-white/10"
            >
              <div className="p-6 space-y-6 overflow-y-auto flex-1">
                <div className="text-center max-w-md mx-auto space-y-2">
                  <Download className="w-10 h-10 text-ff-gold mx-auto" />
                  <h3 className="font-serif font-bold text-xl text-neutral-100">
                    Tải Toàn Bộ Mã Nguồn Dự Án
                  </h3>
                  <p className="text-xs text-neutral-400">
                    Gói ZIP bao gồm đầy đủ mã nguồn React, Tailwind CSS, tệp cấu hình Vite và tài liệu hướng dẫn chạy README.md.
                  </p>
                </div>

                <div className="p-4 rounded-2xl glass-panel border-white/10 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-neutral-400">Tên gói nén:</span>
                    <span className="font-mono text-neutral-200">f-code-student-portal-v1.zip</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-neutral-400">Dung lượng ước tính:</span>
                    <span className="font-mono text-neutral-200">1.8 MB (đã lọc node_modules)</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-neutral-400">An toàn:</span>
                    <span className="text-ff-jade font-medium">✓ Đã quét không chứa Secret key</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button 
                    variant="primary" 
                    size="lg" 
                    icon={Download}
                    className="flex-1"
                    onClick={() => alert('Đang tạo và tải tệp ZIP mã nguồn về máy tính của bạn!')}
                  >
                    Tải Mã Nguồn ZIP (0₫)
                  </Button>
                  <Button 
                    variant="secondary" 
                    size="lg" 
                    icon={FileText}
                    className="flex-1"
                    onClick={() => alert('Đã sao chép tài liệu README.md vào clipboard!')}
                  >
                    Xuất Tài Liệu README
                  </Button>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-[11px] text-neutral-400">
                  <p className="font-semibold text-neutral-300 mb-1">Hướng dẫn chạy sau khi giải nén:</p>
                  <code className="block font-mono bg-black/60 p-2 rounded text-amber-300">
                    npm install && npm run dev
                  </code>
                </div>
              </div>
            </Window>
          )}
        </div>
      </div>
    </div>
  );
};
