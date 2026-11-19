import { useEffect, useState } from "react";
import { RefreshCw, WifiOff } from "lucide-react";

const QUEUE_STORAGE_KEY = "ff_offline_queue";

export interface OfflineQueuedPrompt {
  id: string;
  text: string;
  createdAt: string;
}

export function enqueueOfflinePrompt(text: string): OfflineQueuedPrompt[] {
  try {
    const existing = JSON.parse(localStorage.getItem(QUEUE_STORAGE_KEY) || "[]") as OfflineQueuedPrompt[];
    const next = [
      ...existing,
      { id: `q-${Date.now()}`, text, createdAt: new Date().toLocaleTimeString("vi-VN") },
    ];
    localStorage.setItem(QUEUE_STORAGE_KEY, JSON.stringify(next));
    window.dispatchEvent(new Event("ff-offline-queue-updated"));
    return next;
  } catch {
    return [];
  }
}

export function getOfflineQueue(): OfflineQueuedPrompt[] {
  try {
    return JSON.parse(localStorage.getItem(QUEUE_STORAGE_KEY) || "[]") as OfflineQueuedPrompt[];
  } catch {
    return [];
  }
}

export function clearOfflineQueue() {
  try {
    localStorage.removeItem(QUEUE_STORAGE_KEY);
    window.dispatchEvent(new Event("ff-offline-queue-updated"));
  } catch {
    // ignore storage errors
  }
}

export interface OfflineQueueBannerProps {
  simulateOffline?: boolean;
  onExitSimulateOffline?: () => void;
  onFlushQueue?: (items: OfflineQueuedPrompt[]) => void;
}

/**
 * Adapted from SOURCEOFKNOWLEDGFORAI -> lucianlabs #091 Offline Queue.
 * Keeps pending user work visible when connection drops or offline simulation is active.
 */
export function OfflineQueueBanner({
  simulateOffline = false,
  onExitSimulateOffline,
  onFlushQueue,
}: OfflineQueueBannerProps) {
  const [browserOffline, setBrowserOffline] = useState(
    typeof navigator !== "undefined" ? !navigator.onLine : false,
  );
  const [queue, setQueue] = useState<OfflineQueuedPrompt[]>(() => getOfflineQueue());

  useEffect(() => {
    const syncOnline = () => setBrowserOffline(!navigator.onLine);
    const syncQueue = () => setQueue(getOfflineQueue());
    window.addEventListener("online", syncOnline);
    window.addEventListener("offline", syncOnline);
    window.addEventListener("ff-offline-queue-updated", syncQueue);
    return () => {
      window.removeEventListener("online", syncOnline);
      window.removeEventListener("offline", syncOnline);
      window.removeEventListener("ff-offline-queue-updated", syncQueue);
    };
  }, []);

  const isOffline = browserOffline || simulateOffline;
  if (!isOffline && queue.length === 0) return null;

  const handleSync = () => {
    if (simulateOffline && onExitSimulateOffline) {
      onExitSimulateOffline();
    }
    const pending = getOfflineQueue();
    if (pending.length > 0 && onFlushQueue) {
      onFlushQueue(pending);
      clearOfflineQueue();
      setQueue([]);
    }
  };

  return (
    <div
      role="status"
      aria-live="polite"
      className="mx-auto max-w-5xl px-4 mt-2"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 rounded-2xl border border-amber-500/35 bg-amber-500/10 text-sm text-foreground">
        <div className="flex items-center gap-2.5">
          <WifiOff className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
          <span>
            {isOffline
              ? "Đang ở chế độ Ngoại tuyến — các prompt gửi mới sẽ tự động xếp hàng đợi cục bộ."
              : `Đã khôi phục kết nối. Còn ${queue.length} tác vụ trong hàng đợi đồng bộ.`}
            {queue.length > 0 && isOffline ? ` (${queue.length} mục đang chờ)` : ""}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {simulateOffline && onExitSimulateOffline && (
            <button
              type="button"
              onClick={handleSync}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-foreground text-background text-xs font-semibold hover:opacity-90 transition"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Kết nối lại & đồng bộ
            </button>
          )}
          {!isOffline && queue.length > 0 && (
            <button
              type="button"
              onClick={handleSync}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-foreground text-background text-xs font-semibold hover:opacity-90 transition"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Đồng bộ ngay
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default OfflineQueueBanner;
