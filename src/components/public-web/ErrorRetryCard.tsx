import { useEffect, useState } from "react";
import { AlertTriangle, RefreshCw, Terminal } from "lucide-react";

export interface ErrorRetryCardProps {
  message: string;
  retryAfterSeconds?: number;
  onRetry: () => void;
  onUseSandbox?: () => void;
  onDismiss?: () => void;
}

/**
 * Adapted from SOURCEOFKNOWLEDGFORAI -> lucianlabs #090 Error Retry & Backoff Countdown.
 * Never swallows errors silently and always provides a clear retry + sandbox fallback.
 */
export function ErrorRetryCard({
  message,
  retryAfterSeconds = 5,
  onRetry,
  onUseSandbox,
  onDismiss,
}: ErrorRetryCardProps) {
  const [countdown, setCountdown] = useState(retryAfterSeconds);

  useEffect(() => {
    setCountdown(retryAfterSeconds);
  }, [retryAfterSeconds, message]);

  useEffect(() => {
    if (countdown <= 0) return;
    const timer = window.setInterval(() => {
      setCountdown((c) => Math.max(0, c - 1));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [countdown]);

  return (
    <div
      role="alert"
      className="rounded-2xl border border-rose-500/35 bg-rose-500/10 p-4 text-sm text-foreground space-y-3"
    >
      <div className="flex items-start gap-2.5">
        <AlertTriangle className="w-4 h-4 text-rose-500 mt-0.5 shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-rose-600 dark:text-rose-400">
            Cổng AI Proxy tạm gián đoạn
          </div>
          <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{message}</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-foreground text-background text-xs font-semibold hover:opacity-90 transition"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          {countdown > 0 ? `Thử lại (${countdown}s)` : "Thử lại ngay"}
        </button>

        {onUseSandbox && (
          <button
            type="button"
            onClick={onUseSandbox}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-card text-foreground text-xs font-medium hover:bg-muted transition"
          >
            <Terminal className="w-3.5 h-3.5" />
            Dùng Sandbox nội bộ
          </button>
        )}

        {onDismiss && (
          <button
            type="button"
            onClick={onDismiss}
            className="ml-auto text-xs text-muted-foreground hover:text-foreground underline"
          >
            Đóng
          </button>
        )}
      </div>
    </div>
  );
}

export default ErrorRetryCard;
