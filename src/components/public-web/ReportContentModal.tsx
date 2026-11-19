import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CheckCircle2, Flag, X } from "lucide-react";

const REPORT_STORAGE_KEY = "ff_reported_items";

export function getReportedIds(): string[] {
  try {
    return JSON.parse(localStorage.getItem(REPORT_STORAGE_KEY) || "[]") as string[];
  } catch {
    return [];
  }
}

export interface ReportContentModalProps {
  open: boolean;
  targetId: string;
  targetTitle: string;
  onClose: () => void;
  onSubmitted?: (id: string) => void;
}

const REASONS = [
  "Liên kết nguồn gốc bị hỏng hoặc 404",
  "Thông tin giấy phép (MIT / Free) chưa chính xác",
  "Nội dung trùng lặp / AI-Slop kém chất lượng",
  "Nội dung không phù hợp với môi trường học đường",
];

/**
 * Community Moderation Modal so critical public users can report questionable items.
 */
export function ReportContentModal({
  open,
  targetId,
  targetTitle,
  onClose,
  onSubmitted,
}: ReportContentModalProps) {
  const [reason, setReason] = useState(REASONS[0]);
  const [note, setNote] = useState("");
  const [done, setDone] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const prev = getReportedIds();
      if (!prev.includes(targetId)) {
        localStorage.setItem(REPORT_STORAGE_KEY, JSON.stringify([...prev, targetId]));
      }
    } catch {
      // ignore storage errors
    }
    setDone(true);
    onSubmitted?.(targetId);
    window.setTimeout(() => {
      setDone(false);
      setNote("");
      onClose();
    }, 1100);
  };

  return (
    <AnimatePresence>
      {open && (
        <div
          className="fixed inset-0 z-[85] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="ff-report-title"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/45 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            className="relative z-10 w-full max-w-md rounded-3xl border border-border bg-card text-foreground shadow-2xl p-6 space-y-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center">
                  <Flag className="w-4 h-4" />
                </div>
                <div>
                  <h2 id="ff-report-title" className="text-base font-bold">
                    Báo cáo kiểm duyệt
                  </h2>
                  <p className="text-xs text-muted-foreground truncate max-w-[260px]">{targetTitle}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Đóng"
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-muted transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {done ? (
              <div className="py-8 flex flex-col items-center text-center gap-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                <p className="text-sm font-semibold">Đã ghi nhận phản hồi cộng đồng</p>
                <p className="text-xs text-muted-foreground">
                  Mục này đã được đánh dấu chờ kiểm tra xác minh lại.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="space-y-2">
                  {REASONS.map((item) => (
                    <label
                      key={item}
                      className="flex items-center gap-2.5 p-2.5 rounded-xl border border-border hover:bg-muted/60 cursor-pointer text-xs"
                    >
                      <input
                        type="radio"
                        name="report-reason"
                        checked={reason === item}
                        onChange={() => setReason(item)}
                      />
                      <span>{item}</span>
                    </label>
                  ))}
                </div>

                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={2}
                  placeholder="Ghi chú thêm cho đội ngũ kiểm duyệt (tuỳ chọn)..."
                  className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                />

                <div className="flex justify-end gap-2 pt-1">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 rounded-full border border-border text-xs font-medium hover:bg-muted transition"
                  >
                    Huỷ
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-full bg-rose-600 text-white text-xs font-semibold hover:bg-rose-700 transition"
                  >
                    Gửi báo cáo
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default ReportContentModal;
