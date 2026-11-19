const GUEST_QUOTA_KEY = 'ff_guest_quota';
const MAX_GUEST_TURNS = 5;

export interface ChatMessagePayload {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface SendAiChatParams {
  messages: ChatMessagePayload[];
  action?: string | null;
  model?: string;
  isAuthenticated?: boolean;
  simulateError?: boolean;
}

export interface SendAiChatResult {
  ok: boolean;
  reply?: string;
  mode?: 'live' | 'sandbox-fallback';
  model?: string;
  notice?: string;
  error?: string;
  retryAfter?: number;
  quotaRemaining: number;
  offline?: boolean;
  quotaExceeded?: boolean;
}

export function getGuestQuotaRemaining(): number {
  try {
    const raw = localStorage.getItem(GUEST_QUOTA_KEY);
    if (raw === null) return MAX_GUEST_TURNS;
    const parsed = Number(raw);
    return Number.isFinite(parsed) ? Math.max(0, parsed) : MAX_GUEST_TURNS;
  } catch {
    return MAX_GUEST_TURNS;
  }
}

export function decrementGuestQuota(): number {
  const next = Math.max(0, getGuestQuotaRemaining() - 1);
  try {
    localStorage.setItem(GUEST_QUOTA_KEY, String(next));
  } catch {
    // ignore storage errors
  }
  return next;
}

export function resetGuestQuota(): number {
  try {
    localStorage.setItem(GUEST_QUOTA_KEY, String(MAX_GUEST_TURNS));
  } catch {
    // ignore
  }
  return MAX_GUEST_TURNS;
}

export async function sendAiChat({
  messages,
  action = null,
  model = 'F-Forum Architect',
  isAuthenticated = false,
  simulateError = false,
}: SendAiChatParams): Promise<SendAiChatResult> {
  if (typeof navigator !== 'undefined' && !navigator.onLine) {
    return {
      ok: false,
      offline: true,
      error: 'Thiết bị đang ngoại tuyến. Tin nhắn đã được đưa vào hàng đợi và sẽ tự gửi khi có mạng.',
      quotaRemaining: isAuthenticated ? 999 : getGuestQuotaRemaining(),
    };
  }

  if (!isAuthenticated) {
    const remaining = getGuestQuotaRemaining();
    if (remaining <= 0) {
      return {
        ok: false,
        quotaExceeded: true,
        error: 'Bạn đã hết 5 lượt dùng thử miễn phí cho khách. Đăng nhập qua Halo Sign In để mở khóa phiên làm việc không giới hạn.',
        quotaRemaining: 0,
      };
    }
  }

  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages, action, model, simulateError }),
    });

    const contentType = res.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      const nextQuota = isAuthenticated ? 999 : decrementGuestQuota();
      const lastUser = [...messages].reverse().find((m) => m.role === 'user')?.content || '';
      return {
        ok: true,
        mode: 'sandbox-fallback',
        model: 'f-forum-local-preview',
        notice: 'Đang chạy trên Vite local dev — `/api/chat` hoạt động đầy đủ khi triển khai trên Vercel.',
        reply: `Đã nhận chỉ dẫn [${action || model}]: "${lastUser.slice(0, 120)}".\n\nĐã cập nhật xem trước trong Workspace Studio và kiểm tra Checks (5/6 Đạt).`,
        quotaRemaining: nextQuota,
      };
    }

    const data = await res.json();
    if (!res.ok) {
      return {
        ok: false,
        error: data?.error || `Lỗi máy chủ (${res.status})`,
        retryAfter: data?.retryAfter || 5,
        quotaRemaining: isAuthenticated ? 999 : getGuestQuotaRemaining(),
      };
    }

    const nextQuota = isAuthenticated ? 999 : decrementGuestQuota();
    return {
      ok: true,
      reply: data.reply,
      mode: data.mode,
      model: data.model,
      notice: data.notice,
      quotaRemaining: nextQuota,
    };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : 'Lỗi kết nối tới /api/chat',
      retryAfter: 4,
      quotaRemaining: isAuthenticated ? 999 : getGuestQuotaRemaining(),
    };
  }
}
