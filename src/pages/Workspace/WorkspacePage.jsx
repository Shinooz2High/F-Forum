import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { 
  Send, 
  Sparkles, 
  Laptop, 
  Smartphone, 
  Maximize2, 
  Minimize2,
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
  ChevronLeft,
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
  ArrowRight,
  Pin,
  PinOff,
  Plus,
  MessageSquare,
  Search,
  Copy,
  Check,
  X,
  Share2,
  Wand2
} from 'lucide-react';
import { Window } from '../../components/macos/Window';
import { Button } from '../../components/macos/Button';
import { Badge, Tabs, ProgressBar } from '../../components/macos/UIElements';
import { mockChatMessages, mockProgressTasks, mockChecks } from '../../data/mockChat';
import { mockFilesTree, mockFileContents, mockDiffChanges } from '../../data/mockCode';

export const WorkspacePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const passedPrompt = location.state?.initialPrompt || '';
  const passedTemplate = location.state?.templateTitle || '';
  const passedResource = location.state?.resourceContext || null;

  // Active workspace tabs in right panel
  const [activeTab, setActiveTab] = useState('preview'); // 'preview', 'diff', 'checks', 'code', 'progress', 'export'
  const [deviceView, setDeviceView] = useState('desktop'); // 'desktop' | 'mobile'

  // Spatial layout states (Arena 3-column + PiP)
  const [isLeftCollapsed, setIsLeftCollapsed] = useState(false);
  const [isRightCollapsed, setIsRightCollapsed] = useState(false);
  const [isLeftPinned, setIsLeftPinned] = useState(true);
  const [previewMode, setPreviewMode] = useState('docked'); // 'docked' | 'pip' | 'fullscreen'
  const [leftSidebarTab, setLeftSidebarTab] = useState('chats'); // 'chats' | 'files'

  // Mock sessions in left sidebar
  const [sessions, setSessions] = useState([
    {
      id: 'sess-1',
      title: passedTemplate || 'Website CLB Sinh Viên K20',
      active: true,
      lastModified: 'Vừa xong',
      messagesCount: 5,
      framework: 'React + Tailwind',
      status: 'active'
    },
    {
      id: 'sess-2',
      title: 'Đấu Trường Thi Thử CBT 1vs1',
      active: false,
      lastModified: '3 giờ trước',
      messagesCount: 8,
      framework: 'React + Audio API',
      status: 'saved'
    },
    {
      id: 'sess-3',
      title: 'Landing Page FPT Hackathon 2026',
      active: false,
      lastModified: 'Hôm qua',
      messagesCount: 14,
      framework: 'React + Three.js',
      status: 'saved'
    },
    {
      id: 'sess-4',
      title: 'Antigravity Liquid Glass Ruleset',
      active: false,
      lastModified: '3 ngày trước',
      messagesCount: 6,
      framework: 'Ruleset Config',
      status: 'saved'
    }
  ]);

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
          content: `Tôi đã tiếp nhận chỉ dẫn: "${passedPrompt.slice(0, 120)}..."\n\nĐang tự động tích hợp cấu trúc tệp, cập nhật giao diện trong Live Preview và kích hoạt các quy tắc kiểm thử an toàn trong Checks. Bạn có thể bật cửa sổ Live Preview lơ lửng (PiP) để vừa ra lệnh vừa quan sát giao diện thay đổi tức thì!`
        }
      ];
    }
    return mockChatMessages;
  });
  const [inputMessage, setInputMessage] = useState('');
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [attachedResource, setAttachedResource] = useState(passedResource);

  // Code Panel State
  const [selectedFile, setSelectedFile] = useState('HeroSection.jsx');

  // Preview Interactive State
  const [previewCountdown, setPreviewCountdown] = useState(12);
  const [copiedSnippet, setCopiedSnippet] = useState(false);

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
    const query = inputMessage.trim();
    setInputMessage('');
    setIsAiThinking(true);

    setTimeout(() => {
      const aiResponse = {
        id: `msg-${Date.now() + 1}`,
        sender: 'ai',
        timestamp: 'Bây giờ',
        content: `Đã áp dụng thay đổi cho yêu cầu: "${query}"!\n- Cập nhật thành phần \`${selectedFile}\`.\n- Đồng bộ hóa trạng thái Live Preview.\n- Kiểm thử Checks: 5/6 bài kiểm tra đạt chuẩn bảo mật và responsive.`
      };
      setChatList(prev => [...prev, aiResponse]);
      setIsAiThinking(false);
      setPreviewCountdown(prev => (prev > 1 ? prev - 1 : 14));
    }, 1100);
  };

  const handleCreateNewSession = () => {
    const newId = `sess-${Date.now()}`;
    const newSession = {
      id: newId,
      title: `Dự Án Mới #${sessions.length + 1}`,
      active: true,
      lastModified: 'Vừa xong',
      messagesCount: 1,
      framework: 'React + Tailwind',
      status: 'active'
    };
    setSessions(prev => [newSession, ...prev.map(s => ({ ...s, active: false }))]);
    setChatList([
      {
        id: `msg-init-${newId}`,
        sender: 'ai',
        timestamp: 'Bây giờ',
        content: 'Chào mừng bạn đến với phiên làm việc mới! Bạn muốn tạo Landing Page, công cụ thi trắc nghiệm CBT, hay tích hợp một bộ quy tắc Antigravity nào hôm nay?'
      }
    ]);
  };

  const handleSelectSession = (sessionId) => {
    setSessions(prev => prev.map(s => ({ ...s, active: s.id === sessionId })));
  };

  const workspaceTabs = [
    { id: 'preview', label: 'Live Preview', icon: Eye },
    { id: 'diff', label: 'So Sánh Diff', icon: GitCompare, badge: '1 Sửa' },
    { id: 'checks', label: 'Kiểm Tra Checks', icon: ShieldCheck, badge: '5/6' },
    { id: 'code', label: 'Mã Nguồn Code', icon: Code2 },
    { id: 'progress', label: 'Tiến Trình', icon: Clock },
    { id: 'export', label: 'Xuất Bản ZIP', icon: Download },
  ];

  return (
    <div className="h-[calc(100vh-6.5rem)] flex flex-col gap-2 relative overflow-hidden">
      {/* ================= WORKSPACE TOP COMMAND STRIP ================= */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-2 py-1 bg-black/40 backdrop-blur-xl border border-white/5 rounded-2xl">
        {/* Project Branding & Context */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsLeftCollapsed(!isLeftCollapsed)}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-all text-xs flex items-center gap-1.5"
            title={isLeftCollapsed ? 'Mở rộng bảng Lịch sử & Dự án' : 'Thu gọn bảng Lịch sử'}
          >
            {isLeftCollapsed ? <ChevronRight className="w-4 h-4 text-ff-gold" /> : <ChevronLeft className="w-4 h-4" />}
            <span className="hidden md:inline font-mono text-[11px] text-neutral-300">
              {isLeftCollapsed ? 'Mở Thanh Dự Án' : 'Lịch Sử & Tệp'}
            </span>
          </button>

          <div className="h-4 w-px bg-white/10 hidden sm:block" />

          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-ff-gold to-amber-500 text-black font-bold flex items-center justify-center font-serif text-sm shadow-sm">
              F
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif font-bold text-sm sm:text-base text-neutral-100 truncate max-w-[220px] sm:max-w-md">
                  {sessions.find(s => s.active)?.title || 'Website CLB Sinh Viên K20'}
                </h1>
                <Badge variant="gold" size="xs">Arena Studio</Badge>
              </div>
              <p className="text-[10px] font-mono text-neutral-400 flex items-center gap-2">
                <span>Vibe Coding Engine</span>
                <span className="w-1 h-1 rounded-full bg-white/20" />
                <span className="text-ff-jade">● Live Sync</span>
              </p>
            </div>
          </div>
        </div>

        {/* Spatial Quick Controls: PiP Trigger & Right Panel Tabs */}
        <div className="flex items-center gap-2">
          {/* Detachable PiP Quick Toggle */}
          <button
            onClick={() => {
              if (previewMode === 'pip') {
                setPreviewMode('docked');
              } else {
                setPreviewMode('pip');
                if (activeTab === 'preview') setActiveTab('diff');
              }
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer ${
              previewMode === 'pip'
                ? 'bg-gradient-to-r from-ff-gold to-amber-500 text-black font-bold shadow-md shadow-ff-gold/20'
                : 'glass-panel text-neutral-300 hover:text-white hover:border-ff-gold/30'
            }`}
            title="Tách cửa sổ Live Preview lơ lửng trên màn hình (PiP)"
          >
            <Layers className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">
              {previewMode === 'pip' ? 'PiP Đang Bật' : 'Tách Live Preview (PiP)'}
            </span>
          </button>

          {/* Studio Navigation Tabs */}
          <div className="hidden lg:flex items-center gap-1 bg-black/60 p-1 rounded-xl border border-white/10">
            {workspaceTabs.map(tab => {
              const TabIcon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    if (isRightCollapsed) setIsRightCollapsed(false);
                  }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
                    isActive
                      ? 'bg-white/15 text-white font-semibold shadow-xs'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <TabIcon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-ff-gold/20 text-ff-gold font-mono">
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => setIsRightCollapsed(!isRightCollapsed)}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-all text-xs"
            title={isRightCollapsed ? 'Mở rộng bảng Arena' : 'Thu gọn bảng Arena'}
          >
            {isRightCollapsed ? <ChevronLeft className="w-4 h-4 text-ff-gold" /> : <ChevronRight className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* ================= 3-COLUMN SPATIAL ARENA ================= */}
      <div className="flex-1 flex gap-2 min-h-0 relative">
        {/* ================= COLUMN 1: LEFT SIDEBAR (CHATS, SESSIONS, PROJECTS, FILES) ================= */}
        <div 
          className={`transition-all duration-300 ease-in-out flex flex-col min-h-0 ${
            isLeftCollapsed ? 'w-12' : 'w-72 lg:w-80'
          }`}
        >
          {isLeftCollapsed ? (
            /* Collapsed Icon Rail */
            <div className="h-full glass-panel rounded-2xl flex flex-col items-center py-4 gap-4 border-white/10">
              <button 
                onClick={() => setIsLeftCollapsed(false)}
                className="p-2 rounded-xl text-neutral-400 hover:text-ff-gold hover:bg-white/5 transition-colors"
                title="Mở rộng bảng bên trái"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              <div className="w-6 h-px bg-white/10" />
              <button
                onClick={() => { setIsLeftCollapsed(false); setLeftSidebarTab('chats'); }}
                className={`p-2 rounded-xl transition-colors ${leftSidebarTab === 'chats' ? 'bg-ff-gold/20 text-ff-gold' : 'text-neutral-400 hover:text-white'}`}
                title="Lịch sử Chat"
              >
                <MessageSquare className="w-4 h-4" />
              </button>
              <button
                onClick={() => { setIsLeftCollapsed(false); setLeftSidebarTab('files'); }}
                className={`p-2 rounded-xl transition-colors ${leftSidebarTab === 'files' ? 'bg-ff-gold/20 text-ff-gold' : 'text-neutral-400 hover:text-white'}`}
                title="Tệp dự án"
              >
                <Folder className="w-4 h-4" />
              </button>
              <button
                onClick={handleCreateNewSession}
                className="p-2 rounded-xl text-neutral-400 hover:text-ff-gold hover:bg-white/5 mt-auto"
                title="Tạo hội thoại mới"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          ) : (
            /* Full Left Sidebar Panel */
            <Window
              title="Lịch Sử & Dự Án"
              subtitle="Chat, Workspace & Files"
              className="h-full flex flex-col border-white/10 shadow-lg"
              headerRight={
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setIsLeftPinned(!isLeftPinned)}
                    className={`p-1 rounded text-xs transition-colors ${isLeftPinned ? 'text-ff-gold' : 'text-neutral-400 hover:text-white'}`}
                    title={isLeftPinned ? 'Ghim bảng điều khiển' : 'Bỏ ghim'}
                  >
                    {isLeftPinned ? <Pin className="w-3.5 h-3.5 fill-current" /> : <PinOff className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    onClick={() => setIsLeftCollapsed(true)}
                    className="p-1 rounded text-neutral-400 hover:text-white text-xs"
                    title="Thu gọn thành dải icon"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                </div>
              }
            >
              {/* Left Sub-tabs: Chats vs Files */}
              <div className="px-3 pt-2 pb-1 border-b border-white/5 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1 bg-white/5 p-0.5 rounded-lg flex-1">
                  <button
                    onClick={() => setLeftSidebarTab('chats')}
                    className={`flex-1 py-1 rounded-md text-[11px] font-medium flex items-center justify-center gap-1.5 transition-all ${
                      leftSidebarTab === 'chats'
                        ? 'bg-ff-gold text-black font-semibold shadow-xs'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    <MessageSquare className="w-3 h-3" />
                    <span>Lịch Sử ({sessions.length})</span>
                  </button>
                  <button
                    onClick={() => setLeftSidebarTab('files')}
                    className={`flex-1 py-1 rounded-md text-[11px] font-medium flex items-center justify-center gap-1.5 transition-all ${
                      leftSidebarTab === 'files'
                        ? 'bg-ff-gold text-black font-semibold shadow-xs'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    <Folder className="w-3 h-3" />
                    <span>Tệp Dự Án</span>
                  </button>
                </div>

                <button
                  onClick={handleCreateNewSession}
                  className="p-1.5 rounded-lg bg-ff-gold/15 hover:bg-ff-gold/25 text-ff-gold border border-ff-gold/30 transition-all cursor-pointer"
                  title="Tạo phiên hội thoại mới"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Left Content Area */}
              <div className="flex-1 overflow-y-auto p-2 space-y-1.5">
                {leftSidebarTab === 'chats' ? (
                  /* Chat Sessions List */
                  <div className="space-y-1.5">
                    <div className="px-2 py-1 text-[10px] font-mono uppercase tracking-wider text-neutral-500">
                      Các phiên làm việc gần đây
                    </div>
                    {sessions.map(sess => (
                      <button
                        key={sess.id}
                        onClick={() => handleSelectSession(sess.id)}
                        className={`w-full text-left p-2.5 rounded-xl border transition-all cursor-pointer flex flex-col gap-1 ${
                          sess.active
                            ? 'bg-ff-gold/15 border-ff-gold/40 text-neutral-100 shadow-sm'
                            : 'bg-white/[0.02] border-white/5 hover:bg-white/[0.06] text-neutral-300'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-1">
                          <span className="font-serif font-bold text-xs truncate text-neutral-100">
                            {sess.title}
                          </span>
                          {sess.active && (
                            <span className="w-2 h-2 rounded-full bg-ff-gold animate-pulse shrink-0" />
                          )}
                        </div>
                        <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400">
                          <span className="truncate">{sess.framework}</span>
                          <span className="shrink-0">{sess.lastModified}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  /* Files Tree */
                  <div className="p-1 space-y-2 font-mono text-xs">
                    <div className="px-2 py-1 text-[10px] font-mono uppercase tracking-wider text-neutral-500">
                      Cấu trúc mã nguồn
                    </div>
                    <div className="p-2 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                      <div className="flex items-center gap-1.5 text-neutral-200 font-semibold py-1">
                        <Folder className="w-3.5 h-3.5 text-ff-gold" />
                        <span>src/components</span>
                      </div>
                      {['HeroSection.jsx', 'CountdownTimer.jsx', 'DepartmentGrid.jsx', 'Footer.jsx'].map(fn => (
                        <button
                          key={fn}
                          onClick={() => {
                            setSelectedFile(fn);
                            setActiveTab('code');
                            if (isRightCollapsed) setIsRightCollapsed(false);
                          }}
                          className={`w-full flex items-center gap-2 pl-4 py-1.5 rounded-lg text-left transition-colors cursor-pointer text-xs ${
                            selectedFile === fn && activeTab === 'code'
                              ? 'bg-ff-gold/20 text-ff-gold font-bold'
                              : 'text-neutral-400 hover:text-white'
                          }`}
                        >
                          <File className="w-3 h-3 shrink-0" />
                          <span className="truncate">{fn}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Window>
          )}
        </div>

        {/* ================= COLUMN 2: CENTER (AI CHAT & CREATION CONSOLE) ================= */}
        <div className="flex-1 flex flex-col min-h-0">
          <Window
            title="AI Creation Arena · Trò Chuyện & Phối Hợp Mã"
            subtitle="Hỗ trợ Claude Opus / Gemini 2.0 Flash / Antigravity"
            className="h-full flex flex-col border-white/10 shadow-xl"
            headerRight={
              <div className="flex items-center gap-2">
                {attachedResource && (
                  <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] bg-ff-gold/15 text-ff-gold border border-ff-gold/30">
                    <Wand2 className="w-3 h-3" />
                    <span>Đã gắn: {attachedResource.name}</span>
                  </span>
                )}
                <span className="flex items-center gap-1.5 text-[10px] text-ff-jade font-mono">
                  <span className="w-2 h-2 rounded-full bg-ff-jade animate-pulse" />
                  Live Sync
                </span>
              </div>
            }
          >
            {/* Attached Resource Context Banner (if any) */}
            {attachedResource && (
              <div className="px-3 py-2 bg-gradient-to-r from-ff-gold/15 via-black/40 to-transparent border-b border-ff-gold/20 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 truncate">
                  <Wand2 className="w-3.5 h-3.5 text-ff-gold shrink-0" />
                  <span className="text-neutral-200">
                    Ngữ cảnh AI: <strong>{attachedResource.name}</strong> ({attachedResource.category})
                  </span>
                </div>
                <button 
                  onClick={() => setAttachedResource(null)}
                  className="text-neutral-400 hover:text-white p-0.5 rounded text-[11px]"
                  title="Gỡ ngữ cảnh"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Chat Messages Scroll Area */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 min-h-0">
              {chatList.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    msg.sender === 'user' ? 'items-end' : 'items-start'
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-1 px-1">
                    <span className="text-[10px] font-mono text-neutral-400">
                      {msg.sender === 'user' ? 'Bạn' : 'F-Forum AI Architect'}
                    </span>
                    <span className="text-[10px] text-neutral-500">{msg.timestamp}</span>
                  </div>

                  <div
                    className={`max-w-[90%] sm:max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-r from-ff-gold to-amber-500 text-black font-medium shadow-md shadow-ff-gold/15'
                        : 'glass-panel text-neutral-200 border-white/10'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {isAiThinking && (
                <div className="flex items-center gap-2 text-xs text-ff-gold p-2 animate-pulse font-mono">
                  <Sparkles className="w-4 h-4 animate-spin text-ff-gold" />
                  <span>AI đang phân tích ngữ cảnh, điều chỉnh mã nguồn và biên dịch...</span>
                </div>
              )}
            </div>

            {/* Quick Prompt Suggestions Bar */}
            <div className="px-3 py-2 border-t border-white/5 bg-white/[0.01] flex items-center gap-1.5 overflow-x-auto text-[11px] whitespace-nowrap">
              <span className="text-neutral-500 font-mono flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-ff-gold" />
                Gợi ý:
              </span>
              <button
                onClick={() => setInputMessage('Đổi tông màu nút bấm sang vàng kim #EAB308 và thêm hiệu ứng sáng')}
                className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 transition-colors"
              >
                Màu vàng kim #EAB308
              </button>
              <button
                onClick={() => setInputMessage('Thêm form thu thập email đăng ký ứng tuyển')}
                className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 transition-colors"
              >
                Thêm form email
              </button>
              <button
                onClick={() => setInputMessage('Tối ưu hóa hiển thị di động cho thanh đếm ngược')}
                className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 transition-colors"
              >
                Tối ưu mobile
              </button>
              <button
                onClick={() => setInputMessage('Kiểm tra và vá các lỗ hổng bảo mật trong form')}
                className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 transition-colors"
              >
                Bảo mật form
              </button>
            </div>

            {/* Chat Input Bar */}
            <form onSubmit={handleSendMessage} className="p-3 border-t border-white/10 bg-black/60 flex items-center gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={e => setInputMessage(e.target.value)}
                placeholder="Nhập yêu cầu: sửa giao diện, kiểm thử bảo mật, thêm logic..."
                className="flex-1 bg-neutral-900/90 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-ff-gold"
              />
              <Button type="submit" variant="primary" size="sm" icon={Send}>
                Gửi
              </Button>
            </form>
          </Window>
        </div>

        {/* ================= COLUMN 3: RIGHT PANEL (ARENA MULTI-VIEW) ================= */}
        <div 
          className={`transition-all duration-300 ease-in-out flex flex-col min-h-0 ${
            isRightCollapsed ? 'w-12' : 'w-full lg:w-[48%] xl:w-[50%]'
          }`}
        >
          {isRightCollapsed ? (
            /* Collapsed Icon Rail */
            <div className="h-full glass-panel rounded-2xl flex flex-col items-center py-4 gap-4 border-white/10">
              <button 
                onClick={() => setIsRightCollapsed(false)}
                className="p-2 rounded-xl text-neutral-400 hover:text-ff-gold hover:bg-white/5 transition-colors"
                title="Mở rộng bảng Arena"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="w-6 h-px bg-white/10" />
              {workspaceTabs.map(t => {
                const Icon = t.icon;
                return (
                  <button
                    key={t.id}
                    onClick={() => { setIsRightCollapsed(false); setActiveTab(t.id); }}
                    className={`p-2 rounded-xl transition-colors relative ${activeTab === t.id ? 'bg-ff-gold/20 text-ff-gold' : 'text-neutral-400 hover:text-white'}`}
                    title={t.label}
                  >
                    <Icon className="w-4 h-4" />
                    {t.badge && (
                      <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-ff-gold" />
                    )}
                  </button>
                );
              })}
            </div>
          ) : (
            /* Full Right Panel */
            <div className="h-full flex flex-col min-h-0">
              {/* TAB 1: LIVE PREVIEW (DOCKED MODE) */}
              {activeTab === 'preview' && (
                previewMode === 'pip' ? (
                  /* Placeholder when in PiP mode */
                  <Window
                    title="Live Preview · Chế Độ Cửa Sổ Lơ Lửng (PiP)"
                    subtitle="Đang hiển thị ở góc màn hình"
                    className="h-full flex flex-col border-white/10"
                    headerRight={
                      <Button 
                        size="xs" 
                        variant="primary" 
                        icon={Layers}
                        onClick={() => setPreviewMode('docked')}
                      >
                        Gắn Lại Vào Cột (Dock)
                      </Button>
                    }
                  >
                    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4">
                      <div className="w-16 h-16 rounded-3xl bg-ff-gold/15 border border-ff-gold/30 flex items-center justify-center text-ff-gold">
                        <Layers className="w-8 h-8 animate-pulse" />
                      </div>
                      <h3 className="font-serif font-bold text-lg text-neutral-100">
                        Live Preview Đang Chạy Trong Cửa Sổ Nổi (PiP)
                      </h3>
                      <p className="text-xs text-neutral-400 max-w-sm leading-relaxed">
                        Bạn có thể vừa chat ở cột giữa, vừa quan sát giao diện cập nhật thời gian thực ở góc phải màn hình mà không bị che khuất không gian làm việc.
                      </p>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="secondary"
                          onClick={() => setActiveTab('diff')}
                        >
                          Xem So Sánh Mã (Diff)
                        </Button>
                        <Button 
                          size="sm" 
                          variant="secondary"
                          onClick={() => setActiveTab('checks')}
                        >
                          Xem Kiểm Thử (Checks)
                        </Button>
                      </div>
                    </div>
                  </Window>
                ) : (
                  /* Docked Live Preview */
                  <Window
                    title="Live Browser Preview"
                    subtitle="https://f-code-club.preview.f-forum.edu.vn"
                    className="h-full flex flex-col border-white/15 shadow-xl"
                    headerRight={
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => setDeviceView('desktop')}
                          className={`p-1 rounded ${deviceView === 'desktop' ? 'bg-ff-gold text-black font-bold' : 'text-neutral-400 hover:text-white'}`}
                          title="Chế độ Desktop"
                        >
                          <Laptop className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeviceView('mobile')}
                          className={`p-1 rounded ${deviceView === 'mobile' ? 'bg-ff-gold text-black font-bold' : 'text-neutral-400 hover:text-white'}`}
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
                        <button
                          onClick={() => setPreviewMode('pip')}
                          className="p-1 rounded text-ff-gold hover:bg-ff-gold/20"
                          title="Tách cửa sổ nổi (PiP)"
                        >
                          <Layers className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setPreviewMode(previewMode === 'fullscreen' ? 'docked' : 'fullscreen')}
                          className="p-1 rounded text-neutral-400 hover:text-white"
                          title="Toàn màn hình"
                        >
                          <Maximize2 className="w-3.5 h-3.5" />
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
                            : 'w-full max-w-xl'
                        }`}
                      >
                        {/* Live App Mockup */}
                        <div className="rounded-2xl border border-ff-gold/25 bg-neutral-900/90 p-6 space-y-5 text-center relative overflow-hidden shadow-2xl">
                          <div className="absolute top-0 right-0 w-32 h-32 bg-ff-gold/10 rounded-full blur-2xl" />

                          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-ff-gold/10 border border-ff-gold/30 text-ff-gold text-xs font-semibold">
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Tuyển Thành Viên K20</span>
                          </div>

                          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-100">
                            F-Code Technology Club
                          </h2>

                          <p className="text-xs text-neutral-300 max-w-md mx-auto leading-relaxed">
                            Nơi biến ý tưởng phần mềm thành sản phẩm thực tế. Cùng xây dựng các dự án công nghệ cho trường học và cộng đồng sinh viên.
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
                            <button className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/15 text-neutral-200 text-xs font-medium cursor-pointer">
                              Xem Các Ban
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Window>
                )
              )}

              {/* TAB 2: DIFF VIEWER */}
              {activeTab === 'diff' && (
                <Window
                  title="Arena Changes Diff Inspector"
                  subtitle="So sánh thay đổi trước & sau thời gian thực"
                  className="h-full flex flex-col border-white/10 shadow-xl"
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

              {/* TAB 3: CHECKS INSPECTOR */}
              {activeTab === 'checks' && (
                <Window
                  title="Arena Checks & Verification Engine"
                  subtitle="Kiểm thử bảo mật, biên dịch và tính tương thích"
                  className="h-full flex flex-col border-white/10 shadow-xl"
                >
                  <div className="p-4 space-y-3 overflow-y-auto flex-1">
                    <div className="p-3 rounded-xl bg-ff-gold/10 border border-ff-gold/25 flex items-center justify-between text-xs text-ff-gold-light">
                      <span>Tổng hợp kiểm tra: 5 Passed · 1 Cảnh báo · 0 Lỗi nghiêm trọng</span>
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

              {/* TAB 4: CODE EDITOR */}
              {activeTab === 'code' && (
                <Window
                  title={`Source Code Editor — ${selectedFile}`}
                  subtitle="read-only syntax view"
                  className="h-full flex flex-col border-white/10 shadow-xl"
                >
                  <div className="flex-1 grid grid-cols-12 min-h-[380px]">
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
                            <File className="w-3 h-3 shrink-0" />
                            <span className="truncate">{fn}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="col-span-8 p-4 bg-neutral-950 overflow-y-auto font-mono text-xs leading-relaxed text-neutral-200">
                      <pre className="text-neutral-300 whitespace-pre">
                        {mockFileContents[selectedFile] || '// Tệp không có nội dung'}
                      </pre>
                    </div>
                  </div>
                </Window>
              )}

              {/* TAB 5: PROGRESS */}
              {activeTab === 'progress' && (
                <Window
                  title="Arena Real-Time Task Progress"
                  subtitle="Sự kiện thực tế từ AI Execution Sandbox"
                  className="h-full flex flex-col border-white/10 shadow-xl"
                >
                  <div className="p-5 space-y-5 overflow-y-auto flex-1">
                    <ProgressBar progress={85} label="Tiến trình hoàn thiện dự án" />

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
                  className="h-full flex flex-col border-white/10 shadow-xl"
                >
                  <div className="p-6 space-y-6 overflow-y-auto flex-1">
                    <div className="text-center max-w-md mx-auto space-y-2">
                      <Download className="w-10 h-10 text-ff-gold mx-auto" />
                      <h3 className="font-serif font-bold text-xl text-neutral-100">
                        Tải Toàn Bộ Mã Nguồn Dự Án
                      </h3>
                      <p className="text-xs text-neutral-400">
                        Gói ZIP bao gồm đầy đủ mã nguồn React, Tailwind CSS, tệp cấu hình Vite và tài liệu README.md.
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
                        onClick={() => alert('Đang tạo và tải tệp ZIP mã nguồn về máy tính!')}
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
                        Xuất README.md
                      </Button>
                    </div>

                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-[11px] text-neutral-400">
                      <p className="font-semibold text-neutral-300 mb-1">Khởi chạy sau khi giải nén:</p>
                      <code className="block font-mono bg-black/60 p-2 rounded text-amber-300">
                        npm install && npm run dev
                      </code>
                    </div>
                  </div>
                </Window>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ================= FLOATING PIP WINDOW (DETACHABLE VIEW) ================= */}
      {previewMode === 'pip' && (
        <div className="fixed bottom-6 right-6 z-50 w-96 sm:w-[420px] rounded-2xl glass-panel shadow-2xl border border-ff-gold/40 backdrop-blur-2xl overflow-hidden animate-fadeIn flex flex-col">
          {/* PiP Mini Header */}
          <div className="px-3 py-2 bg-neutral-900/95 border-b border-white/10 flex items-center justify-between select-none">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 cursor-pointer" onClick={() => setPreviewMode('docked')} />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 cursor-pointer" onClick={() => setPreviewCountdown(p => p + 1)} />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 cursor-pointer" onClick={() => setPreviewMode('fullscreen')} />
              </div>
              <span className="font-mono text-[11px] text-neutral-300 font-semibold truncate flex items-center gap-1">
                <Layers className="w-3 h-3 text-ff-gold" />
                Live Preview (PiP)
              </span>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setDeviceView(deviceView === 'desktop' ? 'mobile' : 'desktop')}
                className="p-1 text-neutral-400 hover:text-white rounded"
                title="Đổi kích thước"
              >
                {deviceView === 'desktop' ? <Smartphone className="w-3 h-3" /> : <Laptop className="w-3 h-3" />}
              </button>
              <button
                onClick={() => setPreviewMode('docked')}
                className="p-1 text-neutral-400 hover:text-white rounded"
                title="Gắn lại vào cột"
              >
                <Minimize2 className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* PiP Mini Live Content */}
          <div className="p-3 bg-neutral-950/90 max-h-72 overflow-y-auto text-center space-y-3">
            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-ff-gold/10 border border-ff-gold/30 text-ff-gold text-[10px] font-semibold">
              <Sparkles className="w-3 h-3" />
              <span>Tuyển Thành Viên K20</span>
            </div>

            <h4 className="font-serif font-bold text-sm text-neutral-100">
              F-Code Technology Club
            </h4>

            {/* Countdown widget in PiP */}
            <div className="inline-grid grid-cols-4 gap-1.5 bg-black/70 p-2 rounded-xl border border-white/10 font-mono text-center">
              <div>
                <span className="text-base font-bold text-ff-gold">{previewCountdown}</span>
                <span className="block text-[8px] text-neutral-400">NGÀY</span>
              </div>
              <div>
                <span className="text-base font-bold text-ff-gold">08</span>
                <span className="block text-[8px] text-neutral-400">GIỜ</span>
              </div>
              <div>
                <span className="text-base font-bold text-ff-gold">45</span>
                <span className="block text-[8px] text-neutral-400">PHÚT</span>
              </div>
              <div>
                <span className="text-base font-bold text-ff-gold">20</span>
                <span className="block text-[8px] text-neutral-400">GIÂY</span>
              </div>
            </div>

            <div className="pt-1 flex items-center justify-center gap-2">
              <button 
                onClick={() => alert('Đã tương tác với nút trên cửa sổ PiP!')}
                className="px-4 py-1.5 rounded-full bg-ff-gold text-black font-bold text-[11px] shadow hover:bg-amber-400 cursor-pointer"
              >
                Nộp Đơn Ngay
              </button>
              <button 
                onClick={() => setPreviewMode('docked')}
                className="px-3 py-1.5 rounded-full bg-white/10 text-neutral-300 text-[11px] hover:bg-white/15 cursor-pointer"
              >
                Mở Rộng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= FULLSCREEN PREVIEW MODAL ================= */}
      {previewMode === 'fullscreen' && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex flex-col p-4 sm:p-8 animate-fadeIn">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500" />
              <div className="w-3 h-3 rounded-full bg-amber-500" />
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="font-mono text-xs text-neutral-300 ml-2">Fullscreen App Simulation</span>
            </div>
            <button
              onClick={() => setPreviewMode('docked')}
              className="p-1.5 rounded-lg bg-white/10 text-neutral-300 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 flex items-center justify-center p-6 overflow-y-auto">
            <div className="w-full max-w-3xl glass-panel p-8 rounded-3xl border-ff-gold/30 text-center space-y-6">
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-neutral-100">
                F-Code Technology Club · K20 Recruitment
              </h2>
              <p className="text-sm text-neutral-300 max-w-xl mx-auto">
                Mô phỏng toàn màn hình không gian sản phẩm thực tế của dự án.
              </p>
              <Button variant="primary" size="lg" onClick={() => setPreviewMode('docked')}>
                Đóng Toàn Màn Hình
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};