import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CheckCircle2, ScrollText, Shield, X } from "lucide-react";

export interface ReadToAgreeModalProps {
  open: boolean;
  onClose: () => void;
  onAccept: () => void;
  alreadyAccepted?: boolean;
}

/**
 * Adapted from SOURCEOFKNOWLEDGFORAI -> lucianlabs #068 Read-To-Agree Consent.
 * Unlocks approval button once the public user scrolls through the charter.
 */
export function ReadToAgreeModal({
  open,
  onClose,
  onAccept,
  alreadyAccepted = false,
}: ReadToAgreeModalProps) {
  const [reachedBottom, setReachedBottom] = useState(alreadyAccepted);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 24) {
      setReachedBottom(true);
    }
  };

  const scrollToEnd = () => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
    setReachedBottom(true);
  };

  return (
    <AnimatePresence>
      {open && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="ff-terms-title"
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
            className="relative z-10 w-full max-w-lg rounded-3xl border border-border bg-card text-foreground shadow-2xl p-6 space-y-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                  <ScrollText className="w-5 h-5" />
                </div>
                <div>
                  <h2 id="ff-terms-title" className="text-base font-bold">
                    Điều khoản Cộng đồng & Minh bạch Nguồn
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    Hiến chương sử dụng F-FORUM cho công chúng (lucianlabs #068)
                  </p>
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

            <div
              ref={scrollRef}
              onScroll={handleScroll}
              tabIndex={0}
              className="h-56 overflow-y-auto rounded-2xl border border-border bg-background p-4 text-xs text-muted-foreground space-y-3 leading-relaxed"
            >
              <p className="text-foreground font-semibold">1. Cam kết Chống AI-Slop & Quyền sở hữu mã nguồn</p>
              <p>
                Mọi thành phần giao diện trong F-FORUM Studio đều bắt nguồn từ kho tài nguyên
                SOURCEOFKNOWLEDGFORAI (PinUI, ThreeUI, MotionSites, LucianLabs, CodeFronts) theo giấy phép MIT / mở,
                cho phép học sinh, CLB và đội ngũ kỹ thuật kiểm tra từng file nguồn trước khi đưa vào dự án thực tế.
              </p>

              <p className="text-foreground font-semibold">2. Bảo mật khoá API & Giới hạn phiên khách</p>
              <p>
                Hệ thống không bao giờ nhúng khoá AI API ở trình duyệt. Mọi yêu cầu AI đi qua Serverless Proxy có giới hạn
                tần suất (rate limit) bảo vệ người dùng chung. Người dùng khách có 5 lượt AI miễn phí trước khi đăng nhập.
              </p>

              <p className="text-foreground font-semibold">3. Kiểm duyệt Nội dung & Báo cáo Vi phạm</p>
              <p>
                Cộng đồng có quyền bấm "Báo cáo" đối với bất kỳ mẫu template, tài liệu hay đường dẫn GitHub nào có dấu hiệu
                lỗi thời, sai giấy phép hoặc chứa nội dung gây hại để đội ngũ rà soát xử lý.
              </p>

              <p className="text-foreground font-semibold">4. Dữ liệu cục bộ & Hỗ trợ ngoại tuyến</p>
              <p>
                Nhật ký dự án, phiên bản Workspace và hàng đợi Offline được lưu ngay trên trình duyệt của bạn nhằm bảo đảm
                không mất ý tưởng ngay cả khi mạng trường học hoặc wifi bị gián đoạn.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
              {!reachedBottom ? (
                <button
                  type="button"
                  onClick={scrollToEnd}
                  className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Cuộn xuống cuối điều khoản ↓
                </button>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                  <CheckCircle2 className="w-4 h-4" /> Đã đọc toàn bộ điều khoản
                </span>
              )}

              <button
                type="button"
                disabled={!reachedBottom}
                onClick={() => {
                  onAccept();
                  onClose();
                }}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-foreground text-background text-xs font-semibold disabled:opacity-35 disabled:cursor-not-allowed hover:opacity-90 transition"
              >
                <Shield className="w-3.5 h-3.5" />
                Tôi đồng ý & Tiếp tục
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default ReadToAgreeModal;
