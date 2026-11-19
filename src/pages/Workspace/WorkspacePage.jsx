import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
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
  FileText, 
  Folder, 
  File, 
  ChevronRight, 
  ChevronLeft,
  CheckCircle2, 
  AlertTriangle, 
  Eye, 
  Layers, 
  Pin, 
  PinOff, 
  Plus, 
  MessageSquare, 
  X, 
  Wand2
} from 'lucide-react';
import { Window } from '../../components/macos/Window';
import { Button } from '../../components/macos/Button';
import { Badge, ProgressBar } from '../../components/macos/UIElements';
import { mockChatMessages, mockProgressTasks, mockChecks } from '../../data/mockChat';
import { mockFileContents, mockDiffChanges } from '../../data/mockCode';
import { useTheme } from '../../context/ThemeContext';
import FForumLogo from '../../components/brand/FForumLogo';
import TaskCard from '../../components/pinui/TaskCard';
import ErrorRetryCard from '../../components/public-web/ErrorRetryCard';
import { enqueueOfflinePrompt } from '../../components/public-web/OfflineQueueBanner';
import { getGuestQuotaRemaining, sendAiChat } from '../../services/aiClient';

export const WorkspacePage = () => {
  const location = useLocation();
  const { theme, authUser, simulateOffline } = useTheme();
  const passedPrompt = location.state?.initialPrompt || '';
  const passedTemplate = location.state?.templateTitle || '';
  const passedResource = location.state?.resourceContext || null;
  const passedAutoSubmit = Boolean(location.state?.autoSubmit);
  const passedAction = location.state?.action || null;
  const passedModel = location.state?.model || 'F-Forum Architect';

  const [activeTab, setActiveTab] = useState('preview');
  const [deviceView, setDeviceView] = useState('desktop');

  const [isLeftCollapsed, setIsLeftCollapsed] = useState(false);
  const [isRightCollapsed, setIsRightCollapsed] = useState(false);
  const [isLeftPinned, setIsLeftPinned] = useState(true);
  const [previewMode, setPreviewMode] = useState('docked');
  const [leftSidebarTab, setLeftSidebarTab] = useState('chats');

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
      framework: 'React + Framer Motion',
      status: 'saved'
    },
    {
      id: 'sess-4',
      title: 'F-Forum Liquid Glass Ruleset',
      active: false,
      lastModified: '3 ngày trước',
      messagesCount: 6,
      framework: 'Ruleset Config',
      status: 'saved'
    }
  ]);

  const [chatList, setChatList] = useState(() => {
    if (passedPrompt && !passedAutoSubmit) {
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
          content: `Tôi đã tiếp nhận chỉ dẫn: "${passedPrompt.slice(0, 120)}..."\n\nĐang tích hợp cấu trúc tệp, đồng bộ Live Preview và kiểm thử Checks. Bạn có thể bật PiP hoặc gửi thêm lệnh bên dưới.`
        }
      ];
    }
    return mockChatMessages;
  });
  const [inputMessage, setInputMessage] = useState('');
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [attachedResource, setAttachedResource] = useState(passedResource);
  const [selectedFile, setSelectedFile] = useState('HeroSection.jsx');
  const [previewCountdown, setPreviewCountdown] = useState(12);
  const [guestQuota, setGuestQuota] = useState(() => getGuestQuotaRemaining());
  const [simulateError502, setSimulateError502] = useState(false);
  const [apiError, setApiError] = useState(null);
  const autoSubmittedRef = useRef(false);

  const runAiTurn = async (promptText, options = {}) => {
    const query = promptText.trim();
    if (!query) return;

    setApiError(null);
    const userMsg = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      timestamp: 'Bây giờ',
      content: query
    };

    const nextHistory = [...chatList, userMsg];
    setChatList(nextHistory);

    if (simulateOffline || (typeof navigator !== 'undefined' && !navigator.onLine)) {
      enqueueOfflinePrompt(query);
      setChatList(prev => [
        ...prev,
        {
          id: `msg-${Date.now() + 1}`,
          sender: 'ai',
          timestamp: 'Hàng đợi Offline',
          content: 'Thiết bị đang ngoại tuyến (LucianLabs #091) — prompt của bạn đã được xếp hàng đợi cục bộ và sẽ tự đồng bộ khi có kết nối mạng.'
        }
      ]);
      return;
    }

    setIsAiThinking(true);
    const payloadMessages = nextHistory.map(m => ({
      role: m.sender === 'user' ? 'user' : 'assistant',
      content: m.content
    }));

    const result = await sendAiChat({
      messages: payloadMessages,
      action: options.action ?? passedAction,
      model: options.model ?? passedModel,
      isAuthenticated: !!authUser,
      simulateError: options.forceLiveFallback ? false : simulateError502,
    });

    setIsAiThinking(false);
    setGuestQuota(result.quotaRemaining);

    if (!result.ok) {
      setApiError({
        message: result.error || 'Không thể kết nối AI Gateway.',
        retryAfter: result.retryAfter || 5,
        quotaExceeded: Boolean(result.quotaExceeded),
        failedText: query,
      });
      return;
    }

    const aiResponse = {
      id: `msg-${Date.now() + 1}`,
      sender: 'ai',
      timestamp: result.mode === 'live' ? 'Live AI' : 'Sandbox',
      content: result.notice ? `${result.reply}\n\n(${result.notice})` : result.reply,
    };
    setChatList(prev => [...prev, aiResponse]);
    setPreviewCountdown(prev => (prev > 1 ? prev - 1 : 14));
  };

  useEffect(() => {
    if (passedAutoSubmit && passedPrompt && !autoSubmittedRef.current) {
      autoSubmittedRef.current = true;
      runAiTurn(passedPrompt, { action: passedAction, model: passedModel });
    }
  }, [passedAutoSubmit, passedPrompt]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || isAiThinking) return;
    const query = inputMessage.trim();
    setInputMessage('');
    runAiTurn(query);
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
        content: 'Chào mừng bạn đến với phiên làm việc mới! Bạn muốn tạo Landing Page, công cụ thi trắc nghiệm CBT, hay tích hợp một bộ quy tắc F-Forum nào hôm nay?'
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
    <div className="h-[calc(100vh-8rem)] flex flex-col gap-2.5 relative overflow-hidden">
      {/* ================= WORKSPACE TOP COMMAND STRIP ================= */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-3 py-1.5 liquid-glass bg-card/85 rounded-2xl">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsLeftCollapsed(!isLeftCollapsed)}
            className="p-1.5 rounded-lg bg-muted/70 hover:bg-muted text-muted-foreground hover:text-foreground transition-all text-xs flex items-center gap-1.5 cursor-pointer"
            title={isLeftCollapsed ? 'Mở rộng bảng Lịch sử & Dự án' : 'Thu gọn bảng Lịch sử'}
          >
            {isLeftCollapsed ? <ChevronRight className="w-4 h-4 text-foreground" /> : <ChevronLeft className="w-4 h-4" />}
            <span className="hidden md:inline font-mono text-[11px] text-foreground">
              {isLeftCollapsed ? 'Mở Thanh Dự Án' : 'Lịch Sử & Tệp'}
            </span>
          </button>

          <div className="h-4 w-px bg-border hidden sm:block" />

          <div className="flex items-center gap-2.5">
            <FForumLogo size={26} />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-sans font-semibold text-sm sm:text-base text-foreground truncate max-w-[200px] sm:max-w-md">
                  {sessions.find(s => s.active)?.title || 'Website CLB Sinh Viên K20'}
                </h1>
                <Badge variant="gold" size="xs">Arena Studio</Badge>
              </div>
              <p className="text-[10px] font-mono text-muted-foreground flex items-center gap-2">
                <span>Vibe Coding Engine</span>
                <span className="w-1 h-1 rounded-full bg-border" />
                <span className="text-ff-jade">● Live Sync</span>
              </p>
            </div>
          </div>
        </div>

        {/* Spatial Controls: Guest Quota, Simulate Error 502, PiP & Right Panel Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {authUser ? (
            <span className="hidden xl:inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25 text-[11px] font-medium">
              Không giới hạn · {authUser.name}
            </span>
          ) : (
            <button
              type="button"
              onClick={() => window.dispatchEvent(new Event('ff-open-signin'))}
              className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/30 text-[11px] font-medium hover:bg-amber-500/15 cursor-pointer"
              title="Đăng nhập Halo Sign In để mở khoá không giới hạn"
            >
              Khách: còn {guestQuota}/5 lượt
            </button>
          )}

          <button
            type="button"
            onClick={() => setSimulateError502(prev => !prev)}
            className={`px-2.5 py-1 rounded-full text-[11px] font-mono border transition cursor-pointer ${
              simulateError502
                ? 'bg-rose-500/15 border-rose-500/40 text-rose-600 dark:text-rose-300 font-semibold'
                : 'bg-card border-border text-muted-foreground hover:text-foreground'
            }`}
            title="Kiểm thử cơ chế ErrorRetryCard (lucianlabs #090)"
          >
            {simulateError502 ? 'Đang giả lập 502' : 'Test Lỗi 502'}
          </button>

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
                ? 'bg-foreground text-background font-bold shadow-sm'
                : 'liquid-glass text-foreground hover:opacity-85'
            }`}
            title="Tách cửa sổ Live Preview lơ lửng trên màn hình (PiP)"
          >
            <Layers className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">
              {previewMode === 'pip' ? 'PiP Đang Bật' : 'Tách Live Preview (PiP)'}
            </span>
          </button>

          <div className="hidden lg:flex items-center gap-1 bg-muted p-1 rounded-xl border border-border">
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
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                    isActive
                      ? 'bg-foreground text-background font-semibold shadow-xs'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <TabIcon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-mono ${
                      isActive ? 'bg-background/20 text-background' : 'bg-card text-foreground border border-border'
                    }`}>
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => setIsRightCollapsed(!isRightCollapsed)}
            className="p-1.5 rounded-lg bg-muted/70 hover:bg-muted text-muted-foreground hover:text-foreground transition-all text-xs cursor-pointer"
            title={isRightCollapsed ? 'Mở rộng bảng Arena' : 'Thu gọn bảng Arena'}
          >
            {isRightCollapsed ? <ChevronLeft className="w-4 h-4 text-foreground" /> : <ChevronRight className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* ================= 3-COLUMN SPATIAL ARENA ================= */}
      <div className="flex-1 flex gap-2.5 min-h-0 relative">
        {/* COLUMN 1: LEFT SIDEBAR */}
        <div 
          className={`transition-all duration-300 ease-in-out flex flex-col min-h-0 ${
            isLeftCollapsed ? 'w-12' : 'w-72 lg:w-80'
          }`}
        >
          {isLeftCollapsed ? (
            <div className="h-full bg-card border border-border rounded-2xl flex flex-col items-center py-4 gap-4">
              <button 
                onClick={() => setIsLeftCollapsed(false)}
                className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors cursor-pointer"
                title="Mở rộng bảng bên trái"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              <div className="w-6 h-px bg-white/10" />
              <button
                onClick={() => { setIsLeftCollapsed(false); setLeftSidebarTab('chats'); }}
                className={`p-2 rounded-xl transition-colors cursor-pointer ${leftSidebarTab === 'chats' ? 'bg-foreground text-background' : 'text-muted-foreground hover:text-foreground'}`}
                title="Lịch sử Chat"
              >
                <MessageSquare className="w-4 h-4" />
              </button>
              <button
                onClick={() => { setIsLeftCollapsed(false); setLeftSidebarTab('files'); }}
                className={`p-2 rounded-xl transition-colors cursor-pointer ${leftSidebarTab === 'files' ? 'bg-foreground text-background' : 'text-muted-foreground hover:text-foreground'}`}
                title="Tệp dự án"
              >
                <Folder className="w-4 h-4" />
              </button>
              <button
                onClick={handleCreateNewSession}
                className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-white/5 mt-auto cursor-pointer"
                title="Tạo hội thoại mới"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <Window
              title="Lịch Sử & Dự Án"
              subtitle="Chat, Workspace & Files"
              className="h-full flex flex-col shadow-lg"
              headerRight={
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setIsLeftPinned(!isLeftPinned)}
                    className={`p-1 rounded text-xs transition-colors cursor-pointer ${isLeftPinned ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                    title={isLeftPinned ? 'Ghim bảng điều khiển' : 'Bỏ ghim'}
                  >
                    {isLeftPinned ? <Pin className="w-3.5 h-3.5 fill-current" /> : <PinOff className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    onClick={() => setIsLeftCollapsed(true)}
                    className="p-1 rounded text-muted-foreground hover:text-foreground text-xs cursor-pointer"
                    title="Thu gọn thành dải icon"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                </div>
              }
            >
              <div className="px-3 pt-2 pb-1.5 border-b border-border flex items-center justify-between gap-2">
                <div className="flex items-center gap-1 bg-muted p-0.5 rounded-lg border border-border flex-1">
                  <button
                    onClick={() => setLeftSidebarTab('chats')}
                    className={`flex-1 py-1 rounded-md text-[11px] font-medium flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      leftSidebarTab === 'chats'
                        ? 'bg-foreground text-background font-semibold shadow-xs'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <MessageSquare className="w-3 h-3" />
                    <span>Lịch Sử ({sessions.length})</span>
                  </button>
                  <button
                    onClick={() => setLeftSidebarTab('files')}
                    className={`flex-1 py-1 rounded-md text-[11px] font-medium flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      leftSidebarTab === 'files'
                        ? 'bg-foreground text-background font-semibold shadow-xs'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Folder className="w-3 h-3" />
                    <span>Tệp Dự Án</span>
                  </button>
                </div>

                <button
                  onClick={handleCreateNewSession}
                  className="p-1.5 rounded-lg bg-foreground text-background hover:opacity-90 transition-all cursor-pointer"
                  title="Tạo phiên hội thoại mới"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-2 space-y-1.5">
                {leftSidebarTab === 'chats' ? (
                  <div className="space-y-1.5">
                    <div className="px-2 py-1 text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                      Các phiên làm việc gần đây
                    </div>
                    {sessions.map(sess => (
                      <button
                        key={sess.id}
                        onClick={() => handleSelectSession(sess.id)}
                        className={`w-full text-left p-2.5 rounded-xl border transition-all cursor-pointer flex flex-col gap-1 ${
                          sess.active
                            ? 'bg-muted border-blue-500/40 text-foreground shadow-sm'
                            : 'bg-background/70 border-border hover:bg-muted/60 text-foreground'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-1">
                          <span className="font-sans font-semibold text-xs truncate text-foreground">
                            {sess.title}
                          </span>
                          {sess.active && (
                            <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                          )}
                        </div>
                        <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground">
                          <span className="truncate">{sess.framework}</span>
                          <span className="shrink-0">{sess.lastModified}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="p-1 space-y-2 font-mono text-xs">
                    <div className="px-2 py-1 text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                      Cấu trúc mã nguồn
                    </div>
                    <div className="p-2 rounded-xl bg-muted/60 border border-border space-y-1">
                      <div className="flex items-center gap-1.5 text-foreground font-semibold py-1">
                        <Folder className="w-3.5 h-3.5" />
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
                              ? 'bg-foreground text-background font-bold'
                              : 'text-muted-foreground hover:text-foreground'
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

        {/* COLUMN 2: CENTER (AI CHAT CONSOLE) */}
        <div className="flex-1 flex flex-col min-h-0">
          <Window
            title="AI Creation Arena · Trò Chuyện & Phối Hợp Mã"
            subtitle="F-Forum Architect Engine"
            className="h-full flex flex-col shadow-xl"
            headerRight={
              <div className="flex items-center gap-2">
                {attachedResource && (
                  <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] bg-white/10 text-foreground border border-white/20">
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
            {attachedResource && (
              <div className="px-3 py-2 bg-muted/60 border-b border-border flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 truncate">
                  <Wand2 className="w-3.5 h-3.5 text-foreground shrink-0" />
                  <span className="text-foreground">
                    Ngữ cảnh AI: <strong>{attachedResource.name}</strong> ({attachedResource.category})
                  </span>
                </div>
                <button 
                  onClick={() => setAttachedResource(null)}
                  className="text-muted-foreground hover:text-foreground p-0.5 rounded text-[11px] cursor-pointer"
                  title="Gỡ ngữ cảnh"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            <div className="flex-1 p-4 overflow-y-auto space-y-4 min-h-0">
              {chatList.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    msg.sender === 'user' ? 'items-end' : 'items-start'
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-1 px-1">
                    <span className="text-[10px] font-mono text-muted-foreground">
                      {msg.sender === 'user' ? 'Bạn' : 'F-Forum AI Architect'}
                    </span>
                    <span className="text-[10px] text-muted-foreground">{msg.timestamp}</span>
                  </div>

                  <div
                    className={`max-w-[90%] sm:max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap ${
                      msg.sender === 'user'
                        ? 'bg-foreground text-background font-medium shadow-sm'
                        : 'bg-muted/70 text-foreground border border-border'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {apiError && (
                <div className="space-y-2">
                  <ErrorRetryCard
                    message={apiError.message}
                    retryAfterSeconds={apiError.retryAfter}
                    onRetry={() => {
                      const text = apiError.failedText || inputMessage || 'Tiếp tục hoàn thiện dự án';
                      runAiTurn(text);
                    }}
                    onUseSandbox={() => {
                      setSimulateError502(false);
                      const text = apiError.failedText || 'Chạy chế độ Sandbox';
                      runAiTurn(text, { forceLiveFallback: true });
                    }}
                    onDismiss={() => setApiError(null)}
                  />
                  {apiError.quotaExceeded && (
                    <button
                      type="button"
                      onClick={() => window.dispatchEvent(new Event('ff-open-signin'))}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-foreground text-background text-xs font-semibold hover:opacity-90"
                    >
                      Mở Halo Sign In (Không giới hạn)
                    </button>
                  )}
                </div>
              )}

              {isAiThinking && (
                <div className="flex items-center gap-2 text-xs text-foreground p-2 animate-pulse font-mono">
                  <Sparkles className="w-4 h-4 animate-spin" />
                  <span>AI đang phân tích ngữ cảnh, điều chỉnh mã nguồn và biên dịch...</span>
                </div>
              )}
            </div>

            <div className="px-3 py-2 border-t border-border bg-muted/30 flex items-center gap-1.5 overflow-x-auto text-[11px] whitespace-nowrap">
              <span className="text-muted-foreground font-mono flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-foreground" />
                Gợi ý:
              </span>
              <button
                onClick={() => setInputMessage('Nâng cấp độ tương phản và thêm hiệu ứng kính mờ Liquid Glass')}
                className="px-2.5 py-1 rounded-lg bg-card hover:bg-muted text-foreground border border-border transition-colors cursor-pointer"
              >
                Kính mờ Liquid Glass
              </button>
              <button
                onClick={() => setInputMessage('Thêm form thu thập email đăng ký ứng tuyển')}
                className="px-2.5 py-1 rounded-lg bg-card hover:bg-muted text-foreground border border-border transition-colors cursor-pointer"
              >
                Thêm form email
              </button>
              <button
                onClick={() => setInputMessage('Tối ưu hóa hiển thị di động cho thanh đếm ngược')}
                className="px-2.5 py-1 rounded-lg bg-card hover:bg-muted text-foreground border border-border transition-colors cursor-pointer"
              >
                Tối ưu mobile
              </button>
              <button
                onClick={() => setInputMessage('Kiểm tra và vá các lỗ hổng bảo mật trong form')}
                className="px-2.5 py-1 rounded-lg bg-card hover:bg-muted text-foreground border border-border transition-colors cursor-pointer"
              >
                Bảo mật form
              </button>
            </div>

            <motion.form
              layoutId="ff-composer-morph"
              onSubmit={handleSendMessage}
              className="p-3 border-t border-border bg-card flex items-center gap-2"
            >
              <input
                type="text"
                value={inputMessage}
                onChange={e => setInputMessage(e.target.value)}
                placeholder="Nhập yêu cầu: sửa giao diện, kiểm thử bảo mật, thêm logic..."
                className="flex-1 bg-background border border-border rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-blue-500"
              />
              <Button type="submit" variant="primary" size="sm" icon={Send} loading={isAiThinking}>
                Gửi
              </Button>
            </motion.form>
          </Window>
        </div>

        {/* COLUMN 3: RIGHT PANEL (ARENA MULTI-VIEW) */}
        <div 
          className={`transition-all duration-300 ease-in-out flex flex-col min-h-0 ${
            isRightCollapsed ? 'w-12' : 'w-full lg:w-[48%] xl:w-[50%]'
          }`}
        >
          {isRightCollapsed ? (
            <div className="h-full bg-card border border-border rounded-2xl flex flex-col items-center py-4 gap-4">
              <button 
                onClick={() => setIsRightCollapsed(false)}
                className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors cursor-pointer"
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
                    className={`p-2 rounded-xl transition-colors relative cursor-pointer ${activeTab === t.id ? 'bg-foreground text-background' : 'text-muted-foreground hover:text-foreground'}`}
                    title={t.label}
                  >
                    <Icon className="w-4 h-4" />
                    {t.badge && (
                      <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-foreground border border-black" />
                    )}
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="h-full flex flex-col min-h-0">
              {activeTab === 'preview' && (
                previewMode === 'pip' ? (
                  <Window
                    title="Live Preview · Chế Độ Cửa Sổ Lơ Lửng (PiP)"
                    subtitle="Đang hiển thị ở góc màn hình"
                    className="h-full flex flex-col"
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
                      <div className="w-16 h-16 rounded-3xl liquid-glass flex items-center justify-center text-foreground">
                        <Layers className="w-8 h-8 animate-pulse" />
                      </div>
                      <h3 className="font-sans font-semibold text-lg text-foreground">
                        Live Preview Đang Chạy Trong Cửa Sổ Nổi (PiP)
                      </h3>
                      <p className="text-xs text-muted-foreground max-w-sm leading-relaxed">
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
                  <Window
                    title="Live Browser Preview"
                    subtitle="https://f-code-club.preview.f-forum.edu.vn"
                    className="h-full flex flex-col shadow-xl"
                    headerRight={
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => setDeviceView('desktop')}
                          className={`p-1 rounded cursor-pointer ${deviceView === 'desktop' ? 'bg-foreground text-background font-bold' : 'text-muted-foreground hover:text-foreground'}`}
                          title="Chế độ Desktop"
                        >
                          <Laptop className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeviceView('mobile')}
                          className={`p-1 rounded cursor-pointer ${deviceView === 'mobile' ? 'bg-foreground text-background font-bold' : 'text-muted-foreground hover:text-foreground'}`}
                          title="Chế độ Mobile"
                        >
                          <Smartphone className="w-3.5 h-3.5" />
                        </button>
                        <button 
                          onClick={() => setPreviewCountdown(prev => prev + 1)}
                          className="p-1 rounded text-muted-foreground hover:text-foreground cursor-pointer"
                          title="Làm mới"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setPreviewMode('pip')}
                          className="p-1 rounded text-foreground hover:bg-white/10 cursor-pointer"
                          title="Tách cửa sổ nổi (PiP)"
                        >
                          <Layers className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setPreviewMode(previewMode === 'fullscreen' ? 'docked' : 'fullscreen')}
                          className="p-1 rounded text-muted-foreground hover:text-foreground cursor-pointer"
                          title="Toàn màn hình"
                        >
                          <Maximize2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    }
                  >
                    <div className="px-4 py-2 border-b border-border bg-muted/50 flex items-center gap-2 text-xs font-mono text-muted-foreground">
                      <span className="w-2 h-2 rounded-full bg-ff-jade" />
                      <span className="truncate flex-1">http://localhost:5173/preview</span>
                      <span className="text-[10px] text-foreground">HTTPS SECURE</span>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 bg-muted/40 flex items-center justify-center min-h-[380px]">
                      <div 
                        className={`transition-all duration-300 ${
                          deviceView === 'mobile' 
                            ? 'w-[320px] rounded-3xl border-4 border-border p-4 shadow-2xl bg-card' 
                            : 'w-full max-w-xl'
                        }`}
                      >
                        <div className="rounded-2xl border border-border bg-card p-6 space-y-5 text-center relative overflow-hidden shadow-xl">
                          <div className="liquid-glass inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-foreground text-xs font-medium">
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Tuyển Thành Viên K20</span>
                          </div>

                          <h2 className="text-2xl sm:text-3xl font-sans font-semibold tracking-tight text-foreground">
                            F-Code Technology Club
                          </h2>

                          <p className="text-xs text-muted-foreground max-w-md mx-auto leading-relaxed">
                            Nơi biến ý tưởng phần mềm thành sản phẩm thực tế. Cùng xây dựng các dự án công nghệ cho trường học và cộng đồng sinh viên.
                          </p>

                          <div className="py-2">
                            <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2">
                              Thời gian còn lại để nộp hồ sơ
                            </p>
                            <div className="inline-grid grid-cols-4 gap-2 bg-muted p-2.5 rounded-xl border border-border font-mono">
                              <div>
                                <span className="text-xl font-bold text-foreground">{previewCountdown}</span>
                                <span className="block text-[9px] text-muted-foreground">NGÀY</span>
                              </div>
                              <div>
                                <span className="text-xl font-bold text-foreground">08</span>
                                <span className="block text-[9px] text-muted-foreground">GIỜ</span>
                              </div>
                              <div>
                                <span className="text-xl font-bold text-foreground">45</span>
                                <span className="block text-[9px] text-muted-foreground">PHÚT</span>
                              </div>
                              <div>
                                <span className="text-xl font-bold text-foreground">20</span>
                                <span className="block text-[9px] text-muted-foreground">GIÂY</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                            <button 
                              onClick={() => alert('Đã mở form đăng ký thành viên!')}
                              className="px-6 py-2.5 rounded-full bg-foreground text-background font-semibold text-xs shadow-sm hover:opacity-90 cursor-pointer"
                            >
                              Nộp Đơn Ứng Tuyển Ngay
                            </button>
                            <button className="px-5 py-2.5 rounded-full liquid-glass text-foreground text-xs font-medium cursor-pointer">
                              Xem Các Ban
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Window>
                )
              )}

              {activeTab === 'diff' && (
                <Window
                  title="Arena Changes Diff Inspector"
                  subtitle="So sánh thay đổi trước & sau thời gian thực"
                  className="h-full flex flex-col shadow-xl"
                >
                  <div className="p-4 space-y-4 overflow-y-auto flex-1">
                    {mockDiffChanges.map((df, idx) => (
                      <div key={idx} className="space-y-2">
                        <div className="flex items-center justify-between p-2.5 rounded-lg bg-muted/60 border border-border">
                          <div className="flex items-center gap-2 font-mono text-xs">
                            <span className="w-2 h-2 rounded-full bg-foreground" />
                            <span className="text-foreground font-bold">{df.fileName}</span>
                            <span className="text-ff-jade text-[11px]">+{df.addedLines}</span>
                            <span className="text-ff-rose text-[11px]">-{df.removedLines}</span>
                          </div>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-card border border-border text-foreground font-mono">
                            {df.status}
                          </span>
                        </div>

                        <p className="text-xs text-muted-foreground italic px-1">
                          Tóm tắt thay đổi từ AI: {df.summary}
                        </p>

                        <div className="p-3 rounded-xl bg-zinc-950 font-mono text-[11px] leading-relaxed border border-border overflow-x-auto">
                          <pre className="text-zinc-200">
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

              {activeTab === 'checks' && (
                <Window
                  title="Arena Checks & Verification Engine"
                  subtitle="Kiểm thử bảo mật, biên dịch và tính tương thích"
                  className="h-full flex flex-col shadow-xl"
                >
                  <div className="p-4 space-y-3 overflow-y-auto flex-1">
                    <div className="p-3 rounded-xl bg-muted/60 border border-border flex items-center justify-between text-xs text-foreground">
                      <span>Tổng hợp kiểm tra: 5 Passed · 1 Cảnh báo · 0 Lỗi nghiêm trọng</span>
                      <Badge variant="jade" size="xs">An Toàn Xuất Bản</Badge>
                    </div>

                    <div className="divide-y divide-border space-y-2">
                      {mockChecks.map((chk) => (
                        <div key={chk.id} className="pt-2 flex items-start gap-3">
                          {chk.status === 'passed' && <CheckCircle2 className="w-4 h-4 text-ff-jade shrink-0 mt-0.5" />}
                          {chk.status === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />}
                          {chk.status === 'untested' && <div className="w-4 h-4 rounded-full border border-muted-foreground shrink-0 mt-0.5" />}

                          <div className="space-y-0.5 flex-1">
                            <div className="flex items-center justify-between">
                              <p className="font-medium text-xs text-foreground">{chk.name}</p>
                              <span className={`text-[10px] font-mono uppercase ${
                                chk.status === 'passed' ? 'text-ff-jade' : chk.status === 'warning' ? 'text-amber-600 dark:text-amber-400' : 'text-muted-foreground'
                              }`}>
                                {chk.status}
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground leading-relaxed">{chk.message}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Window>
              )}

              {activeTab === 'code' && (
                <Window
                  title={`Source Code Editor — ${selectedFile}`}
                  subtitle="read-only syntax view"
                  className="h-full flex flex-col shadow-xl"
                >
                  <div className="flex-1 grid grid-cols-12 min-h-[380px]">
                    <div className="col-span-4 border-r border-border bg-muted/50 p-3 space-y-1 font-mono text-xs overflow-y-auto">
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-2">Cấu Trúc Tệp</p>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-foreground font-semibold py-1">
                          <Folder className="w-3.5 h-3.5" />
                          <span>src / components</span>
                        </div>
                        {['HeroSection.jsx', 'CountdownTimer.jsx'].map(fn => (
                          <button
                            key={fn}
                            onClick={() => setSelectedFile(fn)}
                            className={`w-full flex items-center gap-2 pl-4 py-1.5 rounded-md text-left transition-colors cursor-pointer ${
                              selectedFile === fn ? 'bg-foreground text-background font-bold' : 'text-muted-foreground hover:text-foreground'
                            }`}
                          >
                            <File className="w-3 h-3 shrink-0" />
                            <span className="truncate">{fn}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="col-span-8 p-4 bg-zinc-950 overflow-y-auto font-mono text-xs leading-relaxed text-zinc-100">
                      <pre className="text-zinc-200 whitespace-pre">
                        {mockFileContents[selectedFile] || '// Tệp không có nội dung'}
                      </pre>
                    </div>
                  </div>
                </Window>
              )}

              {activeTab === 'progress' && (
                <Window
                  title="Arena Real-Time Task Progress"
                  subtitle="Sự kiện thực tế từ AI Execution Sandbox + PinUI TaskCard"
                  className="h-full flex flex-col shadow-xl"
                >
                  <div className="p-5 space-y-5 overflow-y-auto flex-1">
                    <div className="flex justify-center">
                      <TaskCard
                        theme={theme === 'dark' ? 'dark' : 'light'}
                        title="Tiến độ Workspace"
                      />
                    </div>

                    <ProgressBar progress={85} label="Tiến trình hoàn thiện dự án" />

                    <div className="space-y-4 relative pl-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-border">
                      {mockProgressTasks.map((t) => (
                        <div key={t.id} className="relative flex items-center justify-between">
                          <div className={`absolute -left-6 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                            t.status === 'completed' 
                              ? 'bg-ff-jade text-white' 
                              : t.status === 'running' 
                              ? 'bg-foreground text-background animate-pulse' 
                              : 'bg-muted text-muted-foreground'
                          }`}>
                            {t.status === 'completed' ? '✓' : t.id}
                          </div>

                          <div className="space-y-0.5">
                            <p className="text-xs font-medium text-foreground">
                              {t.title}
                            </p>
                            <span className="text-[10px] text-muted-foreground font-mono">Thời điểm: {t.time}</span>
                          </div>

                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono uppercase ${
                            t.status === 'completed' ? 'bg-ff-jade/10 text-ff-jade' : 'bg-muted text-foreground'
                          }`}>
                            {t.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Window>
              )}

              {activeTab === 'export' && (
                <Window
                  title="Export & Ownership Center"
                  subtitle="Làm chủ sản phẩm — Không khóa nền tảng"
                  className="h-full flex flex-col shadow-xl"
                >
                  <div className="p-6 space-y-6 overflow-y-auto flex-1">
                    <div className="text-center max-w-md mx-auto space-y-2">
                      <Download className="w-10 h-10 text-foreground mx-auto" />
                      <h3 className="font-sans font-semibold text-xl text-foreground">
                        Tải Toàn Bộ Mã Nguồn Dự Án
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        Gói ZIP bao gồm đầy đủ mã nguồn React, Tailwind CSS, tệp cấu hình Vite và tài liệu README.md.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-muted/60 border border-border space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Tên gói nén:</span>
                        <span className="font-mono text-foreground">f-code-student-portal-v1.zip</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Dung lượng ước tính:</span>
                        <span className="font-mono text-foreground">1.8 MB (đã lọc node_modules)</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">An toàn:</span>
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

                    <div className="p-3 rounded-xl bg-muted/40 border border-border text-[11px] text-muted-foreground">
                      <p className="font-semibold text-foreground mb-1">Khởi chạy sau khi giải nén:</p>
                      <code className="block font-mono bg-zinc-950 p-2 rounded text-zinc-100 border border-border">
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
        <div className="fixed bottom-6 right-6 z-50 w-96 sm:w-[420px] rounded-2xl bg-card/95 shadow-2xl border border-border backdrop-blur-2xl overflow-hidden animate-fadeIn flex flex-col">
          <div className="px-3 py-2 bg-muted/70 border-b border-border flex items-center justify-between select-none">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-macos-close cursor-pointer" onClick={() => setPreviewMode('docked')} />
                <span className="w-2.5 h-2.5 rounded-full bg-macos-minimize cursor-pointer" onClick={() => setPreviewCountdown(p => p + 1)} />
                <span className="w-2.5 h-2.5 rounded-full bg-macos-maximize cursor-pointer" onClick={() => setPreviewMode('fullscreen')} />
              </div>
              <span className="font-mono text-[11px] text-foreground font-semibold truncate flex items-center gap-1">
                <Layers className="w-3 h-3" />
                Live Preview (PiP)
              </span>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setDeviceView(deviceView === 'desktop' ? 'mobile' : 'desktop')}
                className="p-1 text-muted-foreground hover:text-foreground rounded cursor-pointer"
                title="Đổi kích thước"
              >
                {deviceView === 'desktop' ? <Smartphone className="w-3 h-3" /> : <Laptop className="w-3 h-3" />}
              </button>
              <button
                onClick={() => setPreviewMode('docked')}
                className="p-1 text-muted-foreground hover:text-foreground rounded cursor-pointer"
                title="Gắn lại vào cột"
              >
                <Minimize2 className="w-3 h-3" />
              </button>
            </div>
          </div>

          <div className="p-4 bg-background max-h-72 overflow-y-auto text-center space-y-3">
            <div className="liquid-glass inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-foreground text-[10px] font-semibold">
              <Sparkles className="w-3 h-3" />
              <span>Tuyển Thành Viên K20</span>
            </div>

            <h4 className="font-sans font-semibold text-sm text-foreground">
              F-Code Technology Club
            </h4>

            <div className="inline-grid grid-cols-4 gap-1.5 bg-card p-2 rounded-xl border border-border font-mono text-center">
              <div>
                <span className="text-base font-bold text-foreground">{previewCountdown}</span>
                <span className="block text-[8px] text-muted-foreground">NGÀY</span>
              </div>
              <div>
                <span className="text-base font-bold text-foreground">08</span>
                <span className="block text-[8px] text-muted-foreground">GIỜ</span>
              </div>
              <div>
                <span className="text-base font-bold text-foreground">45</span>
                <span className="block text-[8px] text-muted-foreground">PHÚT</span>
              </div>
              <div>
                <span className="text-base font-bold text-foreground">20</span>
                <span className="block text-[8px] text-muted-foreground">GIÂY</span>
              </div>
            </div>

            <div className="pt-1 flex items-center justify-center gap-2">
              <button 
                onClick={() => alert('Đã tương tác với nút trên cửa sổ PiP!')}
                className="px-4 py-1.5 rounded-full bg-foreground text-background font-semibold text-[11px] shadow hover:opacity-90 cursor-pointer"
              >
                Nộp Đơn Ngay
              </button>
              <button 
                onClick={() => setPreviewMode('docked')}
                className="px-3 py-1.5 rounded-full bg-muted text-foreground text-[11px] hover:opacity-80 cursor-pointer"
              >
                Mở Rộng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= FULLSCREEN PREVIEW MODAL ================= */}
      {previewMode === 'fullscreen' && (
        <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-xl flex flex-col p-4 sm:p-8 animate-fadeIn">
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-macos-close" />
              <div className="w-3 h-3 rounded-full bg-macos-minimize" />
              <div className="w-3 h-3 rounded-full bg-macos-maximize" />
              <span className="font-mono text-xs text-muted-foreground ml-2">Fullscreen App Simulation</span>
            </div>
            <button
              onClick={() => setPreviewMode('docked')}
              className="p-1.5 rounded-lg bg-muted text-muted-foreground hover:text-foreground cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 flex items-center justify-center p-6 overflow-y-auto">
            <div className="w-full max-w-3xl bg-card border border-border p-8 rounded-3xl text-center space-y-6">
              <h2 className="text-3xl sm:text-4xl font-sans font-semibold text-foreground">
                F-Code Technology Club · K20 Recruitment
              </h2>
              <p className="text-sm text-muted-foreground max-w-xl mx-auto">
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
