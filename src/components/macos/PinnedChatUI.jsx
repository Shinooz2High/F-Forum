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
import { useTheme } from '../../context/ThemeContext';
import { sendAiChat } from '../../services/aiClient';
import { enqueueOfflinePrompt } from '../public-web/OfflineQueueBanner';

export const PinnedChatUI = ({ isOpen, onClose, isPinned, onTogglePin }) => {
  const navigate = useNavigate();
  const { authUser, simulateOffline } = useTheme();
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

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || isAiTyping) return;

    const query = inputMessage.trim();
    const newMsg = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      timestamp: 'Vừa xong',
      content: query
    };

    const updatedSessions = sessions.map(s => {
      if (s.id === currentSessionId) {
        return {
          ...s,
          lastMessage: query,
          messages: [...s.messages, newMsg]
        };
      }
      return s;
    });

    setSessions(updatedSessions);
    setInputMessage('');

    if (simulateOffline || (typeof navigator !== 'undefined' && !navigator.onLine)) {
      enqueueOfflinePrompt(query);
      const offlineMsg = {
        id: `msg-${Date.now() + 1}`,
        sender: 'ai',
        timestamp: 'Offline Queue',
        content: 'Thiết bị đang ngoại tuyến — yêu cầu đã được lưu vào hàng đợi cục bộ và sẽ tự đồng bộ khi có mạng.'
      };
      setSessions(prev => prev.map(s => (s.id === currentSessionId ? { ...s, messages: [...s.messages, offlineMsg] } : s)));
      return;
    }

    setIsAiTyping(true);
    const activeHistory = (updatedSessions.find(s => s.id === currentSessionId)?.messages || []).map(m => ({
      role: m.sender === 'user' ? 'user' : 'assistant',
      content: m.content
    }));

    const result = await sendAiChat({
      messages: activeHistory,
      action: 'pinned-copilot',
      model: 'F-Forum Co-Pilot',
      isAuthenticated: !!authUser,
    });

    setIsAiTyping(false);

    if (!result.ok) {
      if (result.quotaExceeded) {
        window.dispatchEvent(new Event('ff-open-signin'));
      }
      const errReply = {
        id: `msg-${Date.now() + 1}`,
        sender: 'ai',
        timestamp: 'Cảnh báo',
        content: result.error || 'Tạm thời không kết nối được AI Proxy.'
      };
      setSessions(prev => prev.map(s => (s.id === currentSessionId ? { ...s, messages: [...s.messages, errReply] } : s)));
      return;
    }

    const aiReply = {
      id: `msg-${Date.now() + 1}`,
      sender: 'ai',
      timestamp: 'Vừa xong',
      content: result.reply || `Đã cập nhật dự án **${currentProject.vietnameseName}** theo yêu cầu của bạn.`,
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
          ? 'top-16 bottom-0 right-0 w-[420px] border-l border-border' 
          : 'right-3 sm:right-6 bottom-4 top-20 w-[92vw] sm:w-[440px] rounded-2xl border-border'
      }`}
    >
      {/* Header Bar: Project Selector, History, Pin & Close */}
      <div className="h-12 px-3.5 border-b border-border bg-muted/40 flex items-center justify-between gap-2 select-none">
        <div className="relative min-w-0 flex-1">
          <button
            onClick={() => {
              setShowProjectSelector(!showProjectSelector);
              setShowHistory(false);
            }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-muted/70 hover:bg-muted text-left transition-colors max-w-full cursor-pointer group"
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
            <div className="absolute left-0 top-10 w-72 rounded-xl bg-card shadow-2xl border border-border p-2 z-50 animate-scaleUp backdrop-blur-xl">
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
                        ? 'bg-muted text-foreground font-semibold border border-border' 
                        : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground'
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
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
            title="Lịch sử các phiên chat"
          >
            <History className="w-4 h-4" />
          </button>

          <button
            onClick={() => handleNewSession()}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
            title="Đoạn chat mới (+)"
          >
            <Plus className="w-4 h-4" />
          </button>

          <button
            onClick={onTogglePin}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              isPinned 
                ? 'bg-foreground text-background' 
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
            title={isPinned ? 'Bỏ ghim (chuyển sang dạng cửa sổ)' : 'Ghim cố định vào cạnh phải'}
          >
            {isPinned ? <Pin className="w-4 h-4 fill-current" /> : <PinOff className="w-4 h-4" />}
          </button>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-ff-rose hover:bg-muted transition-colors cursor-pointer ml-1"
            title="Đóng thanh chat"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Chat Sessions Drawer */}
      {showHistory && (
        <div className="border-b border-border bg-background/95 p-3 space-y-3 animate-fadeIn">
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
              className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-card border border-border text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="space-y-1.5 max-h-48 overflow-y-auto divide-y divide-border">
            {filteredHistory.map(s => (
              <div
                key={s.id}
                onClick={() => {
                  setCurrentSessionId(s.id);
                  setShowHistory(false);
                }}
                className={`pt-1.5 pb-1 px-2 rounded-lg cursor-pointer transition-colors ${
                  s.id === currentSessionId ? 'bg-muted border border-border font-medium' : 'hover:bg-muted/60'
                }`}
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-foreground truncate">{s.title}</span>
                  <span className="text-[10px] text-muted-foreground font-mono shrink-0 ml-2">{s.timestamp}</span>
                </div>
                <p className="text-[11px] text-muted-foreground truncate mt-0.5">{s.lastMessage}</p>
                <span className="text-[9px] text-muted-foreground font-mono block mt-0.5">Dự án: {s.projectName}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Chat Messages Scroll View */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="p-2.5 rounded-xl bg-muted/50 border border-border flex items-center justify-between text-xs font-mono text-muted-foreground">
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
              <span className="text-[10px] text-muted-foreground font-mono">{msg.timestamp}</span>
            </div>

            <div
              className={`max-w-[92%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap ${
                msg.sender === 'user'
                  ? 'bg-foreground text-background font-medium shadow-sm'
                  : 'bg-muted/60 text-foreground border border-border'
              }`}
            >
              {msg.content}

              {msg.artifact && (
                <div className="mt-3 pt-3 border-t border-border space-y-2.5 font-sans">
                  <div className="p-3 rounded-xl bg-background border border-border space-y-2 text-center">
                    <div className="flex items-center justify-between pb-1 border-b border-border text-[10px] font-mono text-muted-foreground">
                      <span className="text-foreground">● Live Web Preview</span>
                      <span className="text-ff-jade">FPS: 60</span>
                    </div>

                    <p className="font-sans font-semibold text-sm text-foreground">
                      {msg.artifact.previewTitle}
                    </p>

                    <div className="inline-block px-3 py-1 rounded-lg bg-muted border border-border font-mono text-xs text-foreground">
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

                  <div className="p-2.5 rounded-lg bg-background border border-border text-[11px] font-mono space-y-1">
                    <div className="flex items-center justify-between text-muted-foreground">
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
      <div className="px-3 py-1.5 border-t border-border bg-muted/30 flex items-center gap-1.5 overflow-x-auto text-[11px] whitespace-nowrap">
        <button
          onClick={() => setInputMessage('Xem lại toàn bộ kết quả Checks an ninh')}
          className="px-2.5 py-1 rounded-lg bg-card border border-border hover:bg-muted text-foreground cursor-pointer"
        >
          Chạy Checks
        </button>
        <button
          onClick={() => setInputMessage('Tạo bản xem trước Responsive cho điện thoại')}
          className="px-2.5 py-1 rounded-lg bg-card border border-border hover:bg-muted text-foreground cursor-pointer"
        >
          Kiểm tra Mobile
        </button>
        <button
          onClick={() => {
            alert('Đang chuẩn bị gói ZIP mã nguồn dự án!');
          }}
          className="px-2.5 py-1 rounded-lg bg-foreground text-background font-medium cursor-pointer"
        >
          Tải ZIP
        </button>
      </div>

      {/* Input Box */}
      <form onSubmit={handleSendMessage} className="p-3 border-t border-border bg-card flex items-center gap-2">
        <input
          type="text"
          value={inputMessage}
          onChange={e => setInputMessage(e.target.value)}
          placeholder={`Hỏi AI hoặc chỉnh sửa ${currentProject.vietnameseName}...`}
          className="flex-1 bg-background border border-border rounded-xl px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-blue-500"
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
