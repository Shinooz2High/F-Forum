/* MIT (c) Rachit Thakur / Shadcn Labs — PinUI Synais Footer (adapted for F-FORUM) */
import { useState, type CSSProperties, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion, MotionConfig, type Variants } from "motion/react";
import "./synais-footer.css";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const WORDMARK = "f-forum.";

const COLUMNS: { title: string; links: { label: string; to: string; external?: boolean }[] }[] = [
  {
    title: "Không Gian Studio",
    links: [
      { label: "Home Studio", to: "/home" },
      { label: "Explore Showcase", to: "/explore" },
      { label: "AI Workspace Arena", to: "/workspace" },
      { label: "Quick Start 6 Bước", to: "/quick-start" },
      { label: "Templates Tuyển Chọn", to: "/templates" },
      { label: "Quản Lý Dự Án", to: "/projects" },
    ],
  },
  {
    title: "Tri Thức & Minh Bạch",
    links: [
      { label: "Source of Knowledge", to: "/knowledge" },
      { label: "8 Nhóm Tài Nguyên", to: "/knowledge" },
      { label: "Dự Án Cộng Đồng", to: "/explore" },
      { label: "Landing Page Gốc", to: "/" },
      { label: "Cài Đặt & Giao Diện", to: "/profile" },
    ],
  },
  {
    title: "Mã Nguồn Mở",
    links: [
      { label: "F-Forum GitHub", to: "https://github.com/Shinooz2High/F-Forum", external: true },
      { label: "SOURCEOFKNOWLEDGFORAI", to: "https://github.com/broamstuck-cybr/SOURCEOFKNOWLEDGFORAI", external: true },
      { label: "Giấy Phép MIT", to: "https://opensource.org/licenses/MIT", external: true },
    ],
  },
  {
    title: "Liên Hệ BQT",
    links: [
      { label: "BroAmStuck@gmail.com", to: "mailto:BroAmStuck@gmail.com", external: true },
      { label: "FPT University · Việt Nam", to: "/home" },
    ],
  },
];

const SOCIALS: { label: string; href: string; path: string }[] = [
  {
    label: "GitHub F-Forum",
    href: "https://github.com/Shinooz2High/F-Forum",
    path: "M12 2C6.48 2 2 6.58 2 12.23c0 4.52 2.87 8.35 6.84 9.7.5.1.68-.22.68-.49 0-.24-.01-.88-.01-1.73-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.9 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.04 1.03-2.76-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05A9.4 9.4 0 0 1 12 6.9c.85 0 1.7.12 2.5.34 1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.64 1.03 2.76 0 3.94-2.34 4.81-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.6.69.49A10.1 10.1 0 0 0 22 12.23C22 6.58 17.52 2 12 2Z",
  },
  {
    label: "SOURCEOFKNOWLEDGFORAI",
    href: "https://github.com/broamstuck-cybr/SOURCEOFKNOWLEDGFORAI",
    path: "M12 2L2 7l10 5 10-5-10-5Zm0 7.65L4.4 6 12 2.35 19.6 6 12 9.65ZM2 17l10 5 10-5-2.1-1.05L12 19.9l-7.9-3.95L2 17Zm0-5 10 5 10-5-2.1-1.05L12 14.9l-7.9-3.95L2 12Z",
  },
];

const fade: Variants = {
  hidden: { opacity: 0, y: 14, filter: "blur(6px)" },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: EASE_OUT, delay },
  }),
};

function Mark() {
  return (
    <svg className="sy__mark" viewBox="0 0 28 28" aria-hidden>
      <rect x="2" y="2" width="24" height="24" rx="6" fill="currentColor" />
      <path d="M9 8h10v3.2h-6.4v2.6h4.8V17h-4.8v4H9V8Z" fill="#0b0b0b" />
      <rect x="16.5" y="18.2" width="3" height="3" rx="0.8" fill="#0b0b0b" />
    </svg>
  );
}

type Status = "idle" | "sending" | "done";

export default function SynaisFooter({
  onSubscribe,
  onOpenTerms,
  onOpenSources,
  onToggleSimulateOffline,
}: {
  onSubscribe?: (email: string) => Promise<void> | void;
  onOpenTerms?: () => void;
  onOpenSources?: () => void;
  onToggleSimulateOffline?: () => void;
}) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function subscribe(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    if (!EMAIL.test(email.trim())) {
      setError("Vui lòng nhập đúng định dạng email");
      return;
    }
    setError("");
    setStatus("sending");
    try {
      await (onSubscribe ? onSubscribe(email.trim()) : new Promise((r) => setTimeout(r, 700)));
      setStatus("done");
      setEmail("");
      setTimeout(() => setStatus("idle"), 3200);
    } catch {
      setStatus("idle");
      setError("Có lỗi xảy ra, vui lòng thử lại");
    }
  }

  return (
    <MotionConfig reducedMotion="user">
      <div className="sy-page" style={{ "--sy-font": "'Inter', sans-serif" } as CSSProperties}>
        <footer className="sy" aria-label="F-Forum Footer">
          <div className="sy__top">
            <motion.div className="sy__brand" variants={fade} initial="hidden" animate="show" custom={0.1}>
              <a
                href="/home"
                className="sy__logo"
                aria-label="F-Forum Studio"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/home");
                }}
              >
                <Mark />
                <span>f-forum.</span>
              </a>
              <p className="sy__about">
                Nền tảng kiến tạo web công chúng dành cho học sinh, CLB và chuyên gia phản biện — minh bạch mã nguồn MIT, không AI slop.
              </p>
              <ul className="sy__socials">
                {SOCIALS.map((s) => (
                  <li key={s.label}>
                    <a href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}>
                      <svg viewBox="0 0 24 24" aria-hidden>
                        <path d={s.path} fill="currentColor" />
                      </svg>
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div className="sy__news" variants={fade} initial="hidden" animate="show" custom={0.2}>
              <h2 className="sy__heading" id="sy-news">
                Cập Nhật Tài Nguyên Mới
              </h2>
              <form className={`sy__field${error ? " is-invalid" : ""}`} onSubmit={subscribe} noValidate aria-labelledby="sy-news">
                <input
                  type="email"
                  name="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="Nhập email để nhận thông báo"
                  aria-label="Email"
                  aria-invalid={Boolean(error)}
                  aria-describedby="sy-news-note"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError("");
                  }}
                />
                <button type="submit" aria-label="Đăng ký" disabled={status === "sending"} aria-busy={status === "sending"}>
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.svg
                      key={status}
                      viewBox="0 0 24 24"
                      aria-hidden
                      initial={{ opacity: 0, scale: 0.6 }}
                      animate={{ opacity: 1, scale: 1, rotate: status === "sending" ? 360 : 0 }}
                      exit={{ opacity: 0, scale: 0.6 }}
                      transition={
                        status === "sending"
                          ? { rotate: { duration: 0.9, repeat: Infinity, ease: "linear" }, default: { duration: 0.2 } }
                          : { duration: 0.25 }
                      }
                    >
                      {status === "done" ? (
                        <path d="m5 12.5 4.5 4.5L19 7.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      ) : status === "sending" ? (
                        <path d="M12 4a8 8 0 1 0 8 8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      ) : (
                        <path d="M5 12h13m-5-5 5 5-5 5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      )}
                    </motion.svg>
                  </AnimatePresence>
                </button>
              </form>
              <p id="sy-news-note" className={`sy__note${error ? " is-error" : ""}`} role="status" aria-live="polite">
                {error ||
                  (status === "done"
                    ? "Đã ghi nhận! Chúng tôi sẽ thông báo khi có Drops & Skills mới."
                    : "Nhận bản tin cập nhật Template, Rules và công cụ học thuật từ Source of Knowledge.")}
              </p>
            </motion.div>
          </div>

          <nav className="sy__cols" aria-label="Footer">
            {COLUMNS.map((col, ci) => (
              <div key={col.title} className="sy__col">
                <motion.h2 className="sy__heading" variants={fade} initial="hidden" animate="show" custom={0.3 + ci * 0.07}>
                  {col.title}
                </motion.h2>
                <ul className="sy__list">
                  {col.links.map((l, li) => (
                    <motion.li
                      key={l.label}
                      variants={fade}
                      initial="hidden"
                      animate="show"
                      custom={0.36 + ci * 0.07 + li * 0.035}
                    >
                      {l.external ? (
                        <a className="sy__link" href={l.to} target={l.to.startsWith("mailto:") ? undefined : "_blank"} rel="noreferrer">
                          {l.label}
                        </a>
                      ) : (
                        <a
                          className="sy__link"
                          href={l.to}
                          onClick={(e) => {
                            e.preventDefault();
                            navigate(l.to);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                        >
                          {l.label}
                        </a>
                      )}
                    </motion.li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          <motion.div className="sy__fine" variants={fade} initial="hidden" animate="show" custom={0.65}>
            <p>© 2026 F-FORUM · Minh bạch mã nguồn MIT &amp; Kiểm thử công cộng.</p>
            <ul>
              <li>
                <button
                  type="button"
                  onClick={onOpenSources}
                  style={{ background: "none", border: 0, color: "inherit", cursor: "pointer", padding: 0 }}
                >
                  Nguồn 100% (SOURCEOFKNOWLEDGFORAI)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenTerms}
                  style={{ background: "none", border: 0, color: "inherit", cursor: "pointer", padding: 0 }}
                >
                  Điều khoản &amp; Đọc-để-đồng-ý
                </button>
              </li>
              {onToggleSimulateOffline && (
                <li>
                  <button
                    type="button"
                    onClick={onToggleSimulateOffline}
                    style={{ background: "none", border: 0, color: "inherit", cursor: "pointer", padding: 0 }}
                  >
                    Thử chế độ Offline Queue
                  </button>
                </li>
              )}
            </ul>
          </motion.div>

          {/* Giant animated wordmark rising one letter at a time */}
          <p className="sy__word" aria-hidden>
            {Array.from(WORDMARK).map((ch, i) => (
              <motion.span
                key={i}
                initial={{ y: "40%", opacity: 0, filter: "blur(10px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 1.1, ease: EASE_OUT, delay: 0.4 + i * 0.06 }}
              >
                {ch}
              </motion.span>
            ))}
          </p>
        </footer>
      </div>
    </MotionConfig>
  );
}
