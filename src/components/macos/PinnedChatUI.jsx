import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Pin, 
  PinOff, 
  X, 
  Sparkles, 
  Send, 
  History, 
  FolderGit2, 
  Plus, 
  Search, 
  Maximize2, 
  Minimize2, 
  Layers, 
  ShieldCheck, 
  Download, 
  Code2, 
  ExternalLink, 
  Laptop, 
  Smartphone, 
  RotateCcw,
  Check,
  ChevronDown,
  Paperclip,
  Terminal,
  Play
} from 'lucide-react';
import { mockChatSessions } from '../../data/mockChatSessions';
import { mockProjects } from '../../data/mockProjects';

export const PinnedChatUI = ({ isOpen, onClose, isPinned, onTogglePin }) => {
  const navigate = useNavigate();
  const [sessions, setSessions] = useState(mockChatSessions);
  const [currentSessionId, setCurrentSessionId] = useState('session-1');
  const [showHistory, setShowHistory] = useState(false);
  const [showProjectSelector, setShowProjectSelector] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [searchHistoryQuery, setSearchHistoryQuery] = useState('');
  const messagesEndRef = useRef(null);

  const currentSession = sessions.find(s => s.id === currentSessionId) || sessions[0];
  const currentProject = mockProjects.find(p => p.id === currentSession.projectId) || mockProjects[0];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentSession?.messages, isAiTyping]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMsg = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      timestamp: 'Vừa xong',
      content: inputMessage.trim()
    };

    const updatedSessions = sessions.map(s => {
      if (s.id === currentSessionId) {
        return {
          ...s,
          lastMessage: newMsg.content,
          messages: [...s.messages, newMsg]
        };
      }
      return s;
    });

    setSessions(updatedSessions);
    setInputMessage('');
    setIsAiTyping(true);

    setTimeout(() => {
      const aiReply = {
        id: `msg-${Date.now() + 1}`,
        sender: 'ai',
        timestamp: 'Vừa xong',
        content: `Tôi đã cập nhật dự án **${currentProject.vietnameseName}** theo yêu cầu của bạn! Mã nguồn đã được đồng bộ vào Workspace và kiểm thử tự động.`,
        artifact: {
          type: 'preview_and_diff',
          previewTitle: currentProject.vietnameseName,
          countdownDays: 11,
          modifiedFile: 'src/components/UpdatedComponent.jsx',
          diffSummary: '+8 dòng, -2 dòng (Đã tối ưu hóa giao diện)',
          checks: '6/6 Passed (Build OK, Preview OK, Responsive OK)'
        }
      };

      setSessions(prev => prev.map(s => {
        if (s.id === currentSessionId) {
          return {
            ...s,
            lastMessage: aiReply.content,
            messages: [...s.messages, aiReply]
          };
        }
        return s;
      }));
      setIsAiTyping(false);
    }, 1200);
  };

  const handleNewSession = (proj = currentProject) => {
    const newSession = {
      id: `session-${Date.now()}`,
      projectId: proj.id,
      projectName: proj.vietnameseName,
      title: `Phiên làm việc mới (${new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })})`,
      lastMessage: 'Khởi tạo phiên làm việc mới cho dự án.',
      timestamp: 'Bây giờ',
      status: proj.status,
      messages: [
        {
          id: `m-init-${Date.now()}`,
          sender: 'ai',
          timestamp: 'Bây giờ',
          content: `Chào bạn! Đang mở phiên làm việc mới cho dự án **${proj.vietnameseName}**.\nNgữ cảnh dự án:\n- Mục tiêu: ${proj.blueprint.goal}\n- Phong cách: ${proj.blueprint.style}\nBạn muốn tôi hỗ trợ viết code, chỉnh sửa giao diện hay kiểm tra tính năng nào?`
        }
      ]
    };
    setSessions([newSession, ...sessions]);
    setCurrentSessionId(newSession.id);
    setShowHistory(false);
    setShowProjectSelector(false);
  };

  const handleSelectProject = (proj) => {
    setShowProjectSelector(false);
    // Find an existing session for this project or create one
    const existing = sessions.find(s => s.projectId === proj.id);
    if (existing) {
      setCurrentSessionId(existing.id);
    } else {
      handleNewSession(proj);
    }
  };

  const filteredHistory = sessions.filter(s => 
    s.title.toLowerCase().includes(searchHistoryQuery.toLowerCase()) ||
    s.projectName.toLowerCase().includes(searchHistoryQuery.toLowerCase()) ||
    s.lastMessage.toLowerCase().includes(searchHistoryQuery.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <aside 
      className={`fixed top-10 bottom-0 z-40 transition-all duration-300 flex flex-col glass-panel border-l border-white/15 bg-ff-deep/95 backdrop-blur-2xl shadow-2xl ${
        isPinned 
          ? 'right-0 w-[420px] border-ff-gold/30' 
          : 'right-3 sm:right-6 bottom-4 top-14 w-[92vw] sm:w-[440px] rounded-2xl border-white/20'
      }`}
    >
      {/* ================= HEADER BAR: PROJECT, PIN & CONTROLS ================= */}
      <div className="h-12 px-3.5 border-b border-white/10 bg-white/[0.02] flex items-center justify-between gap-2 select-none">
        {/* Left: Project Selector Dropdown */}
        <div className="relative min-w-0 flex-1">
          <button
            onClick={() => {
              setShowProjectSelector(!showProjectSelector);
              setShowHistory(false);
            }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-left transition-colors max-w-full cursor-pointer group"
          >
            <FolderGit2 className="w-3.5 h-3.5 text-ff-gold shrink-0" />
            <div className="min-w-0">
              <p className="text-xs font-semibold text-neutral-100 truncate group-hover:text-ff-gold-light">
                {currentProject.vietnameseName}
              </p>
            </div>
            <ChevronDown className="w-3 h-3 text-neutral-400 shrink-0 ml-1" />
          </button>

          {/* Project Switcher Menu */}
          {showProjectSelector && (
            <div className="absolute left-0 top-10 w-72 rounded-xl glass-panel shadow-2xl border border-white/15 bg-neutral-950 p-2 z-50 animate-scaleUp">
              <div className="px-2 py-1 text-[10px] font-mono text-neutral-400 uppercase tracking-wider">
                Chọn Dự Án Đang Làm Việc
              </div>
              <div className="space-y-1 mt-1 max-h-56 overflow-y-auto">
                {mockProjects.map(p => (
                  <button
                    key={p.id}
                    onClick={() => handleSelectProject(p)}
                    className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs text-left transition-colors cursor-pointer ${
                      p.id === currentProject.id 
                        ? 'bg-ff-gold/15 text-ff-gold font-bold border border-ff-gold/30' 
                        : 'text-neutral-300 hover:bg-white/5'
                    }`}
                  >
                    <div className="min-w-0">
                      <p className="truncate font-medium">{p.vietnameseName}</p>
                      <span className="text-[10px] text-neutral-500 font-mono">{p.type}</span>
                    </div>
                    {p.id === currentProject.id && <Check className="w-3.5 h-3.5 text-ff-gold" />}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Tools: History, New Chat, Pin & Close */}
        <div className="flex items-center gap-1 shrink-0">
          {/* History Toggle Button */}
          <button
            onClick={() => {
              setShowHistory(!showHistory);
              setShowProjectSelector(false);
            }}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              showHistory 
                ? 'bg-ff-gold text-black font-bold' 
                : 'text-neutral-400 hover:text-white hover:bg-white/5'
            }`}
            title="Lịch sử các phiên chat"
          >
            <History className="w-4 h-4" />
          </button>

          {/* New Chat Button */}
          <button
            onClick={() => handleNewSession()}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
            title="Đoạn chat mới (+)"
          >
            <Plus className="w-4 h-4" />
          </button>

          {/* Pin / Unpin Button */}
          <button
            onClick={onTogglePin}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              isPinned 
                ? 'bg-ff-gold/20 text-ff-gold border border-ff-gold/40' 
                : 'text-neutral-400 hover:text-white hover:bg-white/5'
            }`}
            title={isPinned ? 'Bỏ ghim (chuyển sang dạng cửa sổ)' : 'Ghim cố định vào cạnh phải'}
          >
            {isPinned ? <Pin className="w-4 h-4 fill-current" /> : <PinOff className="w-4 h-4" />}
          </button>

          {/* Close button */}
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-ff-rose hover:bg-white/5 transition-colors cursor-pointer ml-1"
            title="Đóng thanh chat"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ================= CHAT SESSIONS / HISTORY SLIDE-OVER DRAWER ================= */}
      {showHistory && (
        <div className="border-b border-white/10 bg-neutral-950/95 p-3 space-y-3 animate-fadeIn">
          <div className="flex items-center justify-between">
            <span className="text-xs font-serif font-bold text-neutral-100 flex items-center gap-1.5">
              <History className="w-3.5 h-3.5 text-ff-gold" />
              Lịch Sử Các Phiên Chat ({sessions.length})
            </span>
            <button
              onClick={() => handleNewSession()}
              className="text-[11px] text-ff-gold hover:underline flex items-center gap-1 font-mono"
            >
              <Plus className="w-3 h-3" /> Chat Mới
            </button>
          </div>

          <div className="relative">
            <Search className="w-3.5 h-3.5 text-neutral-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchHistoryQuery}
              onChange={e => setSearchHistoryQuery(e.target.value)}
              placeholder="Tìm kiếm phiên chat cũ..."
              className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-neutral-900 border border-white/10 text-xs text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-ff-gold"
            />
          </div>

          <div className="space-y-1.5 max-h-48 overflow-y-auto divide-y divide-white/5">
            {filteredHistory.map(s => (
              <div
                key={s.id}
                onClick={() => {
                  setCurrentSessionId(s.id);
                  setShowHistory(false);
                }}
                className={`pt-1.5 pb-1 px-2 rounded-lg cursor-pointer transition-colors ${
                  s.id === currentSessionId ? 'bg-ff-gold/15 border border-ff-gold/30' : 'hover:bg-white/5'
                }`}
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-neutral-200 truncate">{s.title}</span>
                  <span className="text-[10px] text-neutral-500 font-mono shrink-0 ml-2">{s.timestamp}</span>
                </div>
                <p className="text-[11px] text-neutral-400 truncate mt-0.5">{s.lastMessage}</p>
                <span className="text-[9px] text-ff-gold-light font-mono block mt-0.5">Dự án: {s.projectName}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= CHAT MESSAGES SCROLL VIEW ================= */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Project Context Badge Header */}
        <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-between text-xs font-mono text-neutral-400">
          <div className="flex items-center gap-1.5 truncate">
            <span className="w-2 h-2 rounded-full bg-ff-jade" />
            <span className="text-neutral-300 truncate">{currentProject.vietnameseName}</span>
          </div>
          <Link 
            to="/workspace"
            className="text-[11px] text-ff-gold hover:underline flex items-center gap-1 shrink-0 ml-2"
          >
            Mở Studio Toàn Màn Hình <ExternalLink className="w-3 h-3" />
          </Link>
        </div>

        {/* Message Feed */}
        {currentSession.messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${
              msg.sender === 'user' ? 'items-end' : 'items-start'
            }`}
          >
            <div className="flex items-center gap-1.5 mb-1 px-1">
              <span className="text-[10px] font-mono text-neutral-400">
                {msg.sender === 'user' ? 'Bạn' : 'F-Forum AI Creation Agent'}
              </span>
              <span className="text-[10px] text-neutral-500 font-mono">{msg.timestamp}</span>
            </div>

            <div
              className={`max-w-[92%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap ${
                msg.sender === 'user'
                  ? 'bg-ff-gold text-black font-medium shadow-md shadow-ff-gold/15'
                  : 'glass-panel text-neutral-200 border-white/10'
              }`}
            >
              {msg.content}

              {/* ================= INLINE WORKSPACE ARTIFACTS ================= */}
              {msg.artifact && (
                <div className="mt-3 pt-3 border-t border-white/10 space-y-2.5 font-sans">
                  {/* Mini Preview Box */}
                  <div className="p-3 rounded-xl bg-neutral-950/90 border border-ff-gold/30 space-y-2 text-center">
                    <div className="flex items-center justify-between pb-1 border-b border-white/5 text-[10px] font-mono text-neutral-400">
                      <span className="text-ff-gold-light">● Live Web Preview</span>
                      <span className="text-ff-jade">FPS: 60</span>
                    </div>

                    <p className="font-serif font-bold text-sm text-neutral-100">
                      {msg.artifact.previewTitle}
                    </p>

                    <div className="inline-block px-3 py-1 rounded-lg bg-black/60 border border-white/10 font-mono text-xs text-ff-gold">
                      Còn {msg.artifact.countdownDays} Ngày : 08 Giờ : 45 Phút
                    </div>

                    <div className="flex items-center justify-center gap-2 pt-1">
                      <Link to="/workspace">
                        <button className="px-3 py-1 rounded-lg bg-ff-gold text-black font-semibold text-[11px] hover:brightness-105 cursor-pointer">
                          Tương Tác Trong Workspace
                        </button>
                      </Link>
                    </div>
                  </div>

                  {/* Inline Diff & Checks Info */}
                  <div className="p-2.5 rounded-lg bg-black/50 border border-white/5 text-[11px] font-mono space-y-1">
                    <div className="flex items-center justify-between text-neutral-300">
                      <span>Tệp đã sửa:</span>
                      <span className="text-ff-gold-light">{msg.artifact.modifiedFile}</span>
                    </div>
                    <div className="text-neutral-400">
                      {msg.artifact.diffSummary}
                    </div>
                    <div className="pt-1 text-ff-jade flex items-center gap-1 font-semibold">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      {msg.artifact.checks}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        {isAiTyping && (
          <div className="flex items-center gap-2 text-xs text-ff-gold p-2">
            <Sparkles className="w-4 h-4 animate-spin" />
            <span>AI đang cập nhật mã nguồn dự án...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* ================= WORKSPACE QUICK ACTION TOOLBAR ================= */}
      <div className="px-3 py-1.5 border-t border-white/5 bg-white/[0.01] flex items-center gap-1.5 overflow-x-auto text-[11px] whitespace-nowrap">
        <button
          onClick={() => setInputMessage('Xem lại toàn bộ kết quả Checks an ninh')}
          className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300"
        >
          🔍 Chạy Checks
        </button>
        <button
          onClick={() => setInputMessage('Tạo bản xem trước Responsive cho điện thoại')}
          className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300"
        >
          📱 Kiểm tra Mobile
        </button>
        <button
          onClick={() => {
            alert('Đang chuẩn bị gói ZIP mã nguồn dự án!');
          }}
          className="px-2.5 py-1 rounded-lg bg-ff-gold/15 text-ff-gold hover:bg-ff-gold/25 font-medium"
        >
          📦 Tải ZIP
        </button>
      </div>

      {/* ================= INPUT BOX ================= */}
      <form onSubmit={handleSendMessage} className="p-3 border-t border-white/10 bg-black/50 flex items-center gap-2">
        <input
          type="text"
          value={inputMessage}
          onChange={e => setInputMessage(e.target.value)}
          placeholder={`Hỏi AI hoặc yêu cầu chỉnh sửa ${currentProject.vietnameseName}...`}
          className="flex-1 bg-neutral-900/90 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-ff-gold"
        />
        <button
          type="submit"
          disabled={!inputMessage.trim()}
          className="p-2.5 rounded-xl bg-ff-gold text-black font-bold disabled:opacity-40 disabled:pointer-events-none hover:brightness-105 active:scale-95 transition-all cursor-pointer"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </aside>
  );
};
