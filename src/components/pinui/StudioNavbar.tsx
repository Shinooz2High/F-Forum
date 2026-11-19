/* Adapted from SOURCEOFKNOWLEDGFORAI -> pinui/LunaNavbar (MIT)
 * Uses lucide-react + React Router + FForumLogo so zero unbundled dependencies remain.
 */

import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import {
  Accessibility,
  ArrowRight,
  BookOpen,
  ChevronDown,
  Compass,
  FolderKanban,
  Home,
  Layers,
  Menu,
  Moon,
  Search,
  ShieldCheck,
  Sparkles,
  Sun,
  Terminal,
  UserCheck,
  X,
} from "lucide-react";
import FForumLogo from "../brand/FForumLogo";
import "./studio-navbar.css";

export interface StudioNavbarProps {
  theme: "light" | "dark";
  onToggleTheme: () => void;
  reducedMotion: boolean;
  onToggleReducedMotion: () => void;
  userLabel?: string | null;
  onOpenSearch: () => void;
  onOpenSignIn: () => void;
  onSignOut?: () => void;
  onOpenSources: () => void;
}

const EXPLORE_CATEGORIES = [
  {
    to: "/explore?tab=resources",
    label: "Thư viện 8 nhóm Tài nguyên",
    desc: "AI Tools, Prompts, GitHub Repos, Skills/Rules & Dev Tools.",
    icon: Layers,
  },
  {
    to: "/explore?tab=templates",
    label: "Kho Template PinUI / Motion",
    desc: "Sân khấu Split 60/40 xem trước live và đẩy sang Workspace.",
    icon: Sparkles,
  },
  {
    to: "/knowledge",
    label: "Tri Thức & Dự án Mẫu",
    desc: "Đọc hồ sơ dự án Liquid Glass ReaderCard & fork nhanh.",
    icon: BookOpen,
  },
  {
    to: "/quick-start",
    label: "Khởi Tạo Nhanh (Quick Start)",
    desc: "4 bước từ chọn mục đích, phong cách đến AI Workspace.",
    icon: Compass,
  },
];

const PRIMARY_LINKS = [
  { to: "/home", label: "Home", icon: Home },
  { to: "/explore", label: "Explore", icon: Compass },
  { to: "/workspace", label: "Workspace", icon: Terminal },
  { to: "/knowledge", label: "Tri thức", icon: BookOpen },
  { to: "/projects", label: "Dự án", icon: FolderKanban },
];

export default function StudioNavbar({
  theme,
  onToggleTheme,
  reducedMotion,
  onToggleReducedMotion,
  userLabel,
  onOpenSearch,
  onOpenSignIn,
  onSignOut,
  onOpenSources,
}: StudioNavbarProps) {
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const megaRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setMegaOpen(false);
    setMobileOpen(false);
  }, [location.pathname, location.search]);

  useEffect(() => {
    if (!megaOpen) return;
    const onDown = (e: PointerEvent) => {
      if (!megaRef.current?.contains(e.target as Node)) setMegaOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMegaOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [megaOpen]);

  return (
    <header className="sn-header">
      <div className="sn-navbar">
        {/* Left: Kinetic Monogram Brand + Switch back to Legacy Landing */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <NavLink to="/home" className="sn-brand sn-glass" aria-label="F-FORUM Studio Home">
            <FForumLogo size={26} accentColor={theme === "dark" ? "#60A5FA" : "#2563EB"} />
            <span>F-FORUM</span>
            <span className="sn-brand-sub">STUDIO</span>
          </NavLink>
          <NavLink
            to="/"
            className="sn-nav-link sn-glass"
            style={{ fontSize: 12, padding: "6px 12px" }}
            title="Quay về Landing Page nguyên bản F-FORUM"
          >
            Giới thiệu gốc
          </NavLink>
        </div>

        {/* Center: Floating Liquid-Glass Nav Pill + Mega Menu */}
        <nav className="sn-desktop-nav sn-glass" aria-label="Điều hướng chính">
          <div ref={megaRef} className="sn-mega-wrap">
            <button
              type="button"
              className="sn-nav-link"
              aria-expanded={megaOpen}
              aria-haspopup="true"
              data-active={megaOpen}
              onClick={() => setMegaOpen((v) => !v)}
            >
              <span>Hệ sinh thái</span>
              <ChevronDown
                size={14}
                style={{
                  transform: megaOpen ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.2s ease",
                }}
              />
            </button>

            <AnimatePresence>
              {megaOpen && (
                <motion.div
                  className="sn-mega"
                  initial={{ opacity: 0, y: -6, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -4, scale: 0.98 }}
                  transition={{ duration: 0.16 }}
                >
                  <div className="sn-mega-links">
                    <p className="sn-menu-label">Khám phá SOURCEOFKNOWLEDGE</p>
                    <div className="sn-category-grid">
                      {EXPLORE_CATEGORIES.map((cat) => {
                        const Icon = cat.icon;
                        return (
                          <button
                            key={cat.to}
                            type="button"
                            className="sn-category-link"
                            style={{ textAlign: "left", background: "transparent", border: 0, cursor: "pointer" }}
                            onClick={() => {
                              setMegaOpen(false);
                              navigate(cat.to);
                            }}
                          >
                            <Icon size={17} style={{ marginTop: 2, flexShrink: 0, color: "#3B82F6" }} />
                            <span>
                              <strong>{cat.label}</strong>
                              <span>{cat.desc}</span>
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="sn-featured">
                    <div className="sn-featured-art">
                      <FForumLogo size={44} accentColor="#2563EB" />
                      <span style={{ fontSize: 11, fontWeight: 600, color: "hsl(var(--muted-foreground))" }}>
                        PinUI · ThreeUI · LucianLabs · MotionSites
                      </span>
                    </div>
                    <strong style={{ fontSize: 13 }}>Kiến trúc Không Gian Tương Tác</strong>
                    <span style={{ fontSize: 12, color: "hsl(var(--muted-foreground))", lineHeight: 1.45 }}>
                      100% component tuyển chọn từ GitHub chính chủ, không AI-slop.
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setMegaOpen(false);
                        onOpenSources();
                      }}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                        marginTop: 4,
                        border: 0,
                        background: "transparent",
                        color: "#2563EB",
                        fontSize: 12,
                        fontWeight: 600,
                        cursor: "pointer",
                        padding: 0,
                      }}
                    >
                      Kiểm tra bảng nguồn 100% <ArrowRight size={13} />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {PRIMARY_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className="sn-nav-link"
              data-active={location.pathname === link.to}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Right: Actions — Provenance Badge, ⌘K Search, Accessibility, Theme, SignIn */}
        <div className="sn-nav-actions">
          <button
            type="button"
            className="sn-badge-source"
            onClick={onOpenSources}
            title="Xem bảng đối chiếu 100% nguồn GitHub"
          >
            <ShieldCheck size={14} />
            <span>Nguồn 100%</span>
          </button>

          <button
            type="button"
            className="sn-search-trigger sn-glass"
            onClick={onOpenSearch}
            aria-label="Tìm kiếm nhanh"
            aria-keyshortcuts="Meta+K Control+K"
          >
            <Search size={15} />
            <span>Tìm nhanh</span>
            <kbd>⌘K</kbd>
          </button>

          <button
            type="button"
            className="sn-icon-button sn-glass"
            onClick={onToggleReducedMotion}
            aria-pressed={reducedMotion}
            title={reducedMotion ? "Đang bật Giảm chuyển động (A11y)" : "Bật Giảm chuyển động (Reduced Motion)"}
            style={reducedMotion ? { borderColor: "#2563EB", color: "#2563EB" } : undefined}
          >
            <Accessibility size={16} />
          </button>

          <button
            type="button"
            className="sn-icon-button sn-glass"
            onClick={onToggleTheme}
            aria-label="Đổi giao diện Sáng / Tối"
            title={theme === "dark" ? "Chuyển sang Giấy Ấm (Light)" : "Chuyển sang Than Chì (Dark)"}
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          {userLabel ? (
            <button
              type="button"
              className="sn-pill-btn sn-glass"
              onClick={onSignOut}
              title="Nhấn để đăng xuất"
            >
              <UserCheck size={14} style={{ color: "#10B981" }} />
              <span>{userLabel}</span>
            </button>
          ) : (
            <button type="button" className="sn-primary-btn" onClick={onOpenSignIn}>
              Đăng nhập
            </button>
          )}

          <button
            type="button"
            className="sn-icon-button sn-glass sn-menu-trigger"
            aria-label="Mở menu"
            onClick={() => setMobileOpen(true)}
          >
            <Menu size={18} />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="sn-mobile-drawer-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              className="sn-mobile-drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 360, damping: 34 }}
              aria-label="Menu di động"
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <FForumLogo size={24} accentColor="#2563EB" />
                  <strong>F-FORUM Studio</strong>
                </div>
                <button
                  type="button"
                  className="sn-icon-button sn-glass"
                  aria-label="Đóng menu"
                  onClick={() => setMobileOpen(false)}
                >
                  <X size={18} />
                </button>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 6, flex: 1 }}>
                <p className="sn-menu-label" style={{ marginBottom: 4 }}>Không gian</p>
                {PRIMARY_LINKS.map((link) => {
                  const Icon = link.icon;
                  return (
                    <NavLink
                      key={link.to}
                      to={link.to}
                      className="sn-nav-link"
                      data-active={location.pathname === link.to}
                      style={{ justifyContent: "flex-start", padding: "11px 14px", fontSize: 15 }}
                    >
                      <Icon size={17} />
                      <span>{link.label}</span>
                    </NavLink>
                  );
                })}
                <NavLink
                  to="/"
                  className="sn-nav-link"
                  style={{ justifyContent: "flex-start", padding: "11px 14px", fontSize: 14, marginTop: 8 }}
                >
                  Landing Page gốc (f-forum)
                </NavLink>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 8, paddingTop: 16, borderTop: "1px solid hsl(var(--border))" }}>
                <button type="button" className="sn-pill-btn" onClick={() => { setMobileOpen(false); onOpenSources(); }}>
                  <ShieldCheck size={15} /> Nguồn 100% GitHub
                </button>
                {!userLabel && (
                  <button type="button" className="sn-primary-btn" onClick={() => { setMobileOpen(false); onOpenSignIn(); }}>
                    Đăng nhập Studio
                  </button>
                )}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
