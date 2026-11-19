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
  ShieldCheck, 
  ExternalLink, 
  Check,
  ChevronDown
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
      className={`fixed z-40 transition-all duration-300 flex flex-col bg-card/95 border border-border backdrop-blur-2xl shadow-2xl ${
        isPinned 
          ? 'top-14 bottom-0 right-0 w-[420px] border-l border-white/20' 
          : 'right-3 sm:right-6 bottom-4 top-16 w-[92vw] sm:w-[440px] rounded-2xl border-white/20'
      }`}
    >
      {/* Header Bar: Project Selector, History, Pin & Close */}
      <div className="h-12 px-3.5 border-b border-white/10 bg-white/[0.02] flex items-center justify-between gap-2 select-none">
        <div className="relative min-w-0 flex-1">
          <button
            onClick={() => {
              setShowProjectSelector(!showProjectSelector);
              setShowHistory(false);
            }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-left transition-colors max-w-full cursor-pointer group"
          >
            <FolderGit2 className="w-3.5 h-3.5 text-foreground shrink-0" />
            <div className="min-w-0">
              <p className="text-xs font-semibold text-foreground truncate">
                {currentProject.vietnameseName}
              </p>
            </div>
            <ChevronDown className="w-3 h-3 text-muted-foreground shrink-0 ml-1" />
          </button>

          {showProjectSelector && (
            <div className="absolute left-0 top-10 w-72 rounded-xl bg-black/95 shadow-2xl border border-border p-2 z-50 animate-scaleUp backdrop-blur-xl">
              <div className="px-2 py-1 text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
                Chọn Dự Án Đang Làm Việc
              </div>
              <div className="space-y-1 mt-1 max-h-56 overflow-y-auto">
                {mockProjects.map(p => (
                  <button
                    key={p.id}
                    onClick={() => handleSelectProject(p)}
                    className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs text-left transition-colors cursor-pointer ${
                      p.id === currentProject.id 
                        ? 'bg-white/15 text-foreground font-semibold border border-white/25' 
                        : 'text-neutral-300 hover:bg-white/5'
                    }`}
                  >
                    <div className="min-w-0">
                      <p className="truncate font-medium">{p.vietnameseName}</p>
                      <span className="text-[10px] text-muted-foreground font-mono">{p.type}</span>
                    </div>
                    {p.id === currentProject.id && <Check className="w-3.5 h-3.5 text-foreground" />}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={() => {
              setShowHistory(!showHistory);
              setShowProjectSelector(false);
            }}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              showHistory 
                ? 'bg-foreground text-background font-bold' 
                : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
            }`}
            title="Lịch sử các phiên chat"
          >
            <History className="w-4 h-4" />
          </button>

          <button
            onClick={() => handleNewSession()}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors cursor-pointer"
            title="Đoạn chat mới (+)"
          >
            <Plus className="w-4 h-4" />
          </button>

          <button
            onClick={onTogglePin}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              isPinned 
                ? 'bg-foreground text-background' 
                : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
            }`}
            title={isPinned ? 'Bỏ ghim (chuyển sang dạng cửa sổ)' : 'Ghim cố định vào cạnh phải'}
          >
            {isPinned ? <Pin className="w-4 h-4 fill-current" /> : <PinOff className="w-4 h-4" />}
          </button>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-ff-rose hover:bg-white/5 transition-colors cursor-pointer ml-1"
            title="Đóng thanh chat"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Chat Sessions Drawer */}
      {showHistory && (
        <div className="border-b border-white/10 bg-black/95 p-3 space-y-3 animate-fadeIn">
          <div className="flex items-center justify-between">
            <span className="text-xs font-sans font-semibold text-foreground flex items-center gap-1.5">
              <History className="w-3.5 h-3.5" />
              Lịch Sử Các Phiên Chat ({sessions.length})
            </span>
            <button
              onClick={() => handleNewSession()}
              className="text-[11px] text-foreground hover:underline flex items-center gap-1 font-mono cursor-pointer"
            >
              <Plus className="w-3 h-3" /> Chat Mới
            </button>
          </div>

          <div className="relative">
            <Search className="w-3.5 h-3.5 text-muted-foreground absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchHistoryQuery}
              onChange={e => setSearchHistoryQuery(e.target.value)}
              placeholder="Tìm kiếm phiên chat cũ..."
              className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-card border border-border text-xs text-foreground placeholder-neutral-500 focus:outline-none focus:border-white"
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
                  s.id === currentSessionId ? 'bg-white/15 border border-white/25' : 'hover:bg-white/5'
                }`}
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-foreground truncate">{s.title}</span>
                  <span className="text-[10px] text-muted-foreground font-mono shrink-0 ml-2">{s.timestamp}</span>
                </div>
                <p className="text-[11px] text-muted-foreground truncate mt-0.5">{s.lastMessage}</p>
                <span className="text-[9px] text-neutral-300 font-mono block mt-0.5">Dự án: {s.projectName}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Chat Messages Scroll View */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between text-xs font-mono text-muted-foreground">
          <div className="flex items-center gap-1.5 truncate">
            <span className="w-2 h-2 rounded-full bg-ff-jade" />
            <span className="text-foreground truncate">{currentProject.vietnameseName}</span>
          </div>
          <Link 
            to="/workspace"
            className="text-[11px] text-foreground hover:underline flex items-center gap-1 shrink-0 ml-2"
          >
            Mở Studio Toàn Màn Hình <ExternalLink className="w-3 h-3" />
          </Link>
        </div>

        {currentSession.messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${
              msg.sender === 'user' ? 'items-end' : 'items-start'
            }`}
          >
            <div className="flex items-center gap-1.5 mb-1 px-1">
              <span className="text-[10px] font-mono text-muted-foreground">
                {msg.sender === 'user' ? 'Bạn' : 'F-Forum AI Creation Agent'}
              </span>
              <span className="text-[10px] text-neutral-500 font-mono">{msg.timestamp}</span>
            </div>

            <div
              className={`max-w-[92%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap ${
                msg.sender === 'user'
                  ? 'bg-foreground text-background font-medium shadow-sm'
                  : 'bg-white/[0.04] text-neutral-200 border border-white/10'
              }`}
            >
              {msg.content}

              {msg.artifact && (
                <div className="mt-3 pt-3 border-t border-white/10 space-y-2.5 font-sans">
                  <div className="p-3 rounded-xl bg-black border border-border space-y-2 text-center">
                    <div className="flex items-center justify-between pb-1 border-b border-white/10 text-[10px] font-mono text-muted-foreground">
                      <span className="text-foreground">● Live Web Preview</span>
                      <span className="text-ff-jade">FPS: 60</span>
                    </div>

                    <p className="font-sans font-semibold text-sm text-foreground">
                      {msg.artifact.previewTitle}
                    </p>

                    <div className="inline-block px-3 py-1 rounded-lg bg-white/5 border border-white/10 font-mono text-xs text-foreground">
                      Còn {msg.artifact.countdownDays} Ngày : 08 Giờ : 45 Phút
                    </div>

                    <div className="flex items-center justify-center gap-2 pt-1">
                      <Link to="/workspace">
                        <button className="px-3 py-1 rounded-lg bg-foreground text-background font-semibold text-[11px] hover:opacity-90 cursor-pointer">
                          Tương Tác Trong Workspace
                        </button>
                      </Link>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-black/60 border border-white/10 text-[11px] font-mono space-y-1">
                    <div className="flex items-center justify-between text-neutral-300">
                      <span>Tệp đã sửa:</span>
                      <span className="text-foreground">{msg.artifact.modifiedFile}</span>
                    </div>
                    <div className="text-muted-foreground">
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
          <div className="flex items-center gap-2 text-xs text-foreground p-2">
            <Sparkles className="w-4 h-4 animate-spin" />
            <span>AI đang cập nhật mã nguồn dự án...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Workspace Quick Action Toolbar */}
      <div className="px-3 py-1.5 border-t border-white/10 bg-white/[0.01] flex items-center gap-1.5 overflow-x-auto text-[11px] whitespace-nowrap">
        <button
          onClick={() => setInputMessage('Xem lại toàn bộ kết quả Checks an ninh')}
          className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 cursor-pointer"
        >
          Chạy Checks
        </button>
        <button
          onClick={() => setInputMessage('Tạo bản xem trước Responsive cho điện thoại')}
          className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 cursor-pointer"
        >
          Kiểm tra Mobile
        </button>
        <button
          onClick={() => {
            alert('Đang chuẩn bị gói ZIP mã nguồn dự án!');
          }}
          className="px-2.5 py-1 rounded-lg bg-white/10 text-foreground hover:bg-white/20 font-medium cursor-pointer"
        >
          Tải ZIP
        </button>
      </div>

      {/* Input Box */}
      <form onSubmit={handleSendMessage} className="p-3 border-t border-white/10 bg-black/70 flex items-center gap-2">
        <input
          type="text"
          value={inputMessage}
          onChange={e => setInputMessage(e.target.value)}
          placeholder={`Hỏi AI hoặc chỉnh sửa ${currentProject.vietnameseName}...`}
          className="flex-1 bg-card border border-border rounded-xl px-3.5 py-2.5 text-xs text-foreground placeholder-neutral-500 focus:outline-none focus:border-white"
        />
        <button
          type="submit"
          disabled={!inputMessage.trim()}
          className="p-2.5 rounded-xl bg-foreground text-background font-bold disabled:opacity-40 disabled:pointer-events-none hover:opacity-90 active:scale-95 transition-all cursor-pointer"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </aside>
  );
};
