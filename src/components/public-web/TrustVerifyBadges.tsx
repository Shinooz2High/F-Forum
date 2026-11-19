import { AnimatePresence, motion } from "motion/react";
import { CheckCircle2, ExternalLink, Lock, ShieldCheck, Sparkles, X } from "lucide-react";

export const SOURCE_COVERAGE_MATRIX = [
  { area: "Landing Page (/)", source: "Original F-FORUM Landing Page (cô lập nguyên bản, không pha Studio)", status: "Preserved" },
  { area: "Home Hero Composer + Auto-Fill + Morph", source: "pinui/PromptComposer -> Framer/Motion layoutId", status: "100% Source" },
  { area: "Explore Split Stage + Staggered UI", source: "pinui/LiquidTabs + pinui/Chips + codefronts/index/layouts", status: "100% Source" },
  { area: "Knowledge Reader & Docs", source: "pinui/ReaderCard + lucianlabs #088 Empty State", status: "100% Source" },
  { area: "Projects Drawer & Files", source: "pinui/FileBox + codefronts/cinematic-filmstrip", status: "100% Source" },
  { area: "Workspace Task & Control", source: "pinui/TaskCard + lucianlabs #090 Retry + #091 Offline Queue", status: "100% Source" },
  { area: "Auth & Navigation", source: "pinui/HaloSignIn + pinui/LunaNavbar + pinui/SearchCard", status: "100% Source" },
  { area: "Footer & Legal", source: "pinui/SynaisFooter + lucianlabs #068 Read-To-Agree + ReportModal", status: "100% Source" },
  { area: "3D Spatial Backdrop", source: "threeui/section-agent-ai-network (Desktop budget-capped)", status: "100% Source" },
  { area: "Theme & Color Tokens", source: "lucianlabs/tokens.css + pinui/ThemeSwitch", status: "100% Source" },
];

export interface TrustVerifyBadgesProps {
  onOpenSourcesModal?: () => void;
}

/**
 * Adapted from SOURCEOFKNOWLEDGFORAI -> lucianlabs #243 Trust / Verify Badges.
 */
export function TrustVerifyBadges({ onOpenSourcesModal }: TrustVerifyBadgesProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2.5">
      <button
        type="button"
        onClick={onOpenSourcesModal}
        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 text-xs font-semibold hover:bg-emerald-500/15 transition"
      >
        <ShieldCheck className="w-3.5 h-3.5" />
        100% Nguồn GitHub Tuyển Chọn
      </button>
      <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-border bg-card text-muted-foreground text-xs font-medium">
        <Lock className="w-3.5 h-3.5 text-blue-500" />
        AI Proxy Serverless · Không lộ API Key
      </span>
      <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-border bg-card text-muted-foreground text-xs font-medium">
        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
        Zero AI-Slop · Paper Light & Graphite
      </span>
    </div>
  );
}

export function SourceCoverageModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="ff-source-audit-title"
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
            className="relative z-10 w-full max-w-2xl rounded-3xl border border-border bg-card text-foreground shadow-2xl p-6 space-y-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
                  Kiểm toán Nguồn 100% — SOURCEOFKNOWLEDGFORAI
                </div>
                <h2 id="ff-source-audit-title" className="text-lg font-bold mt-1">
                  Bảng đối chiếu minh bạch từng thành phần UI/UX
                </h2>
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

            <div className="max-h-80 overflow-y-auto rounded-2xl border border-border divide-y divide-border text-xs">
              {SOURCE_COVERAGE_MATRIX.map((row) => (
                <div key={row.area} className="grid grid-cols-1 sm:grid-cols-12 gap-2 px-4 py-2.5 items-center">
                  <div className="sm:col-span-4 font-semibold text-foreground">{row.area}</div>
                  <div className="sm:col-span-6 text-muted-foreground font-mono text-[11px]">{row.source}</div>
                  <div className="sm:col-span-2 sm:text-right">
                    <span className="inline-block px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold">
                      {row.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs text-muted-foreground">
              <a
                href="https://github.com/broamstuck-cybr/SOURCEOFKNOWLEDGFORAI"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                Mở kho SOURCEOFKNOWLEDGFORAI trên GitHub <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-full bg-foreground text-background font-semibold hover:opacity-90 transition"
              >
                Đóng bảng đối chiếu
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default TrustVerifyBadges;
