import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { LayoutGroup, MotionConfig, AnimatePresence, motion } from "motion/react";
import { MessageSquare, X } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import StudioNavbar from "../components/pinui/StudioNavbar";
import SynaisFooter from "../components/pinui/SynaisFooter";
import SearchCard from "../components/pinui/SearchCard";
import HaloSignIn from "../components/pinui/HaloSignIn";
import OfflineQueueBanner, { getOfflineQueue } from "../components/public-web/OfflineQueueBanner";
import ReadToAgreeModal from "../components/public-web/ReadToAgreeModal";
import { SourceCoverageModal } from "../components/public-web/TrustVerifyBadges";
import { PinnedChatUI } from "../components/macos/PinnedChatUI";

export const AppLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    theme,
    toggleTheme,
    reducedMotion,
    toggleReducedMotion,
    authUser,
    signInUser,
    signOutUser,
    simulateOffline,
    setSimulateOffline,
    acceptedTerms,
    acceptTerms,
  } = useTheme();

  const [searchOpen, setSearchOpen] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);
  const [sourcesOpen, setSourcesOpen] = useState(false);
  const [pinnedChatOpen, setPinnedChatOpen] = useState(false);
  const [isPinned, setIsPinned] = useState(false);

  const isWorkspace = location.pathname.startsWith("/workspace");

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "j") {
        e.preventDefault();
        setPinnedChatOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setSearchOpen(false);
        setSignInOpen(false);
      }
    };

    const openSignIn = () => setSignInOpen(true);
    const openSources = () => setSourcesOpen(true);
    const openTerms = () => setTermsOpen(true);
    const toggleChat = () => setPinnedChatOpen((prev) => !prev);

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("ff-open-signin", openSignIn);
    window.addEventListener("ff-open-sources", openSources);
    window.addEventListener("ff-open-terms", openTerms);
    window.addEventListener("ff-toggle-chat", toggleChat);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("ff-open-signin", openSignIn);
      window.removeEventListener("ff-open-sources", openSources);
      window.removeEventListener("ff-open-terms", openTerms);
      window.removeEventListener("ff-toggle-chat", toggleChat);
    };
  }, []);

  return (
    <MotionConfig reducedMotion={reducedMotion ? "always" : "user"}>
      <LayoutGroup>
        <div className="min-h-screen bg-background text-foreground flex flex-col relative overflow-x-clip">
          {/* Atmospheric Ambient Bloom calibrated for Warm Paper Light & Graphite Dark */}
          <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
            <div
              className="absolute inset-x-0 top-0 h-[460px]"
              style={{
                background:
                  theme === "dark"
                    ? "radial-gradient(ellipse 75% 42% at 50% 0%, rgba(96, 165, 250, 0.08), transparent 72%)"
                    : "radial-gradient(ellipse 75% 42% at 50% 0%, rgba(37, 99, 235, 0.06), transparent 72%)",
              }}
            />
          </div>

          <StudioNavbar
            theme={theme === "dark" ? "dark" : "light"}
            onToggleTheme={toggleTheme}
            reducedMotion={reducedMotion}
            onToggleReducedMotion={toggleReducedMotion}
            userLabel={authUser?.name || null}
            onOpenSearch={() => setSearchOpen(true)}
            onOpenSignIn={() => setSignInOpen(true)}
            onSignOut={signOutUser}
            onOpenSources={() => setSourcesOpen(true)}
          />

          <div className="relative z-20">
            <OfflineQueueBanner
              simulateOffline={simulateOffline}
              onExitSimulateOffline={() => setSimulateOffline(false)}
              onFlushQueue={(items) => {
                if (items.length > 0) {
                  navigate("/workspace", {
                    state: {
                      initialPrompt: items.map((i) => i.text).join("\n"),
                      autoSubmit: true,
                    },
                  });
                }
              }}
            />
          </div>

          <main
            className={`flex-1 w-full relative z-10 transition-all duration-300 ${
              isWorkspace ? "px-3 sm:px-6 py-4 max-w-[1440px] mx-auto" : "px-4 sm:px-6 py-6 max-w-7xl mx-auto"
            } ${pinnedChatOpen && isPinned ? "lg:mr-[430px]" : ""}`}
          >
            <Outlet />
          </main>

          {!isWorkspace && (
            <div className="relative z-10 mt-12">
              <SynaisFooter
                onOpenSources={() => setSourcesOpen(true)}
                onOpenTerms={() => setTermsOpen(true)}
                onToggleSimulateOffline={() => {
                  const next = !simulateOffline;
                  setSimulateOffline(next);
                  if (next && getOfflineQueue().length === 0) {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }}
              />
            </div>
          )}

          {/* Compact floating AI Co-Pilot launcher when PinnedChatUI is closed */}
          {!pinnedChatOpen && (
            <button
              type="button"
              onClick={() => setPinnedChatOpen(true)}
              aria-label="Mở Trợ lý AI Ghim (Ctrl+J)"
              className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-foreground text-background shadow-xl text-xs font-semibold hover:scale-[1.03] active:scale-[0.98] transition"
            >
              <MessageSquare className="w-4 h-4" />
              <span className="hidden sm:inline">AI Co-Pilot</span>
              <kbd className="hidden md:inline px-1.5 py-0.5 rounded bg-background/15 text-[10px] font-mono">
                ⌘J
              </kbd>
            </button>
          )}

          <PinnedChatUI
            isOpen={pinnedChatOpen}
            onClose={() => setPinnedChatOpen(false)}
            isPinned={isPinned}
            onTogglePin={() => setIsPinned((prev) => !prev)}
          />

          {/* Quick Command Search Modal (PinUI SearchCard) */}
          <AnimatePresence>
            {searchOpen && (
              <div
                className="fixed inset-0 z-[75] flex items-start justify-center pt-16 sm:pt-24 px-4"
                role="dialog"
                aria-modal="true"
                aria-label="Tìm kiếm nhanh Studio"
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setSearchOpen(false)}
                  className="fixed inset-0 bg-black/40 backdrop-blur-sm"
                />
                <motion.div
                  initial={{ opacity: 0, y: -12, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.98 }}
                  className="relative z-10 w-full max-w-lg rounded-3xl bg-card border border-border p-4 shadow-2xl"
                >
                  <div className="flex items-center justify-between px-2 pb-2 text-xs text-muted-foreground">
                    <span>Điều hướng nhanh F-FORUM</span>
                    <button
                      type="button"
                      onClick={() => setSearchOpen(false)}
                      className="p-1 rounded-full hover:bg-muted transition"
                      aria-label="Đóng tìm kiếm"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <SearchCard
                    theme={theme === "dark" ? "dark" : "light"}
                    shortcut={false}
                    rows={4}
                    onNavigate={(path) => {
                      setSearchOpen(false);
                      navigate(path);
                    }}
                  />
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          {/* Halo Sign In Modal (PinUI HaloSignIn) */}
          <AnimatePresence>
            {signInOpen && (
              <div
                className="fixed inset-0 z-[78] flex items-center justify-center p-4"
                role="dialog"
                aria-modal="true"
                aria-label="Đăng nhập F-FORUM Studio"
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setSignInOpen(false)}
                  className="fixed inset-0 bg-black/45 backdrop-blur-sm"
                />
                <motion.div
                  initial={{ opacity: 0, y: 14, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.97 }}
                  className="relative z-10 w-full max-w-[440px] max-h-[92dvh] overflow-y-auto rounded-3xl"
                >
                  <button
                    type="button"
                    onClick={() => setSignInOpen(false)}
                    aria-label="Đóng đăng nhập"
                    className="absolute right-4 top-4 z-20 w-8 h-8 rounded-full bg-white/90 text-zinc-800 shadow flex items-center justify-center hover:bg-white transition"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <HaloSignIn
                    onSubmit={async ({ email }) => {
                      signInUser({ email, provider: "email" });
                      window.setTimeout(() => setSignInOpen(false), 700);
                    }}
                    onProvider={(provider) => {
                      signInUser({
                        name: `${provider.toUpperCase()} Creator`,
                        email: `${provider}@f-forum.studio`,
                        provider,
                      });
                      setSignInOpen(false);
                    }}
                    onGuestContinue={() => setSignInOpen(false)}
                  />
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          {/* Public Terms Charter (LucianLabs #068 Read-To-Agree) */}
          <ReadToAgreeModal
            open={termsOpen}
            onClose={() => setTermsOpen(false)}
            alreadyAccepted={acceptedTerms}
            onAccept={acceptTerms}
          />

          {/* 100% Source Traceability Matrix (LucianLabs #243) */}
          <SourceCoverageModal open={sourcesOpen} onClose={() => setSourcesOpen(false)} />
        </div>
      </LayoutGroup>
    </MotionConfig>
  );
};

export default AppLayout;
