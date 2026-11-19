import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import {
  ArrowRight,
  BookOpen,
  Compass,
  FolderGit2,
  Layers,
  Sparkles,
  Terminal,
  Wand2,
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import PromptComposer, { type ActionId, type PromptComposerPreset } from "../../components/pinui/PromptComposer";
import FileBox from "../../components/pinui/FileBox";
import TaskCard from "../../components/pinui/TaskCard";
import LiquidTabs from "../../components/pinui/LiquidTabs";
import Chips from "../../components/pinui/Chips";
import ThemeSwitch from "../../components/pinui/ThemeSwitch";
import SpatialNetworkCanvas from "../../components/public-web/SpatialNetworkCanvas";
import TrustVerifyBadges from "../../components/public-web/TrustVerifyBadges";

const QUICK_EDIT_PRESETS: {
  id: string;
  label: string;
  tag: string;
  action: ActionId;
  text: string;
}[] = [
  {
    id: "clb",
    label: "Landing CLB K20",
    tag: "Template Hero",
    action: "image",
    text: "Thiết kế Landing Page tuyển quân CLB Công nghệ K20 với đồng hồ đếm ngược, giới thiệu ban chuyên môn và form đăng ký trực tuyến.",
  },
  {
    id: "ui-fix",
    label: "Tinh chỉnh Navbar & Glass",
    tag: "Edit nhanh UI",
    action: "note",
    text: "Tinh chỉnh lại thanh điều hướng nổi, tăng độ tương phản Warm Paper / Graphite và đồng bộ kính mờ Liquid Glass cho toàn dự án.",
  },
  {
    id: "cbt",
    label: "App thi CBT 1vs1",
    tag: "Đấu trường",
    action: "event",
    text: "Xây dựng phòng thi trắc nghiệm CBT thời gian thực có đồng hồ đếm ngược, ma trận câu hỏi và chấm điểm tức thì.",
  },
  {
    id: "spatial",
    label: "Portfolio 3D Spatial",
    tag: "ThreeUI + Motion",
    action: "voice",
    text: "Tạo trang hồ sơ cá nhân kết hợp không gian Spatial Network mượt cho desktop và tự động tối giản nhẹ trên điện thoại.",
  },
  {
    id: "knowledge",
    label: "Gắn Tri Thức 8 Nhóm",
    tag: "Source 100%",
    action: "docs",
    text: "Gắn bộ tài nguyên chuẩn từ SOURCEOFKNOWLEDGE gồm PinUI Chips, ReaderCard và kiểm chứng nguồn 100% vào Workspace.",
  },
];

const FILMSTRIP_PROJECTS = [
  {
    id: "film-1",
    badge: "ThreeUI + PinUI",
    title: "Cổng Tuyển Quân CLB Robotics",
    desc: "Landing page tương tác có bộ đếm ngược, thẻ thành viên và trang đăng ký nhóm dự án.",
    prompt: "Xây dựng cổng tuyển quân CLB Robotics gồm section giới thiệu ban kỹ thuật, timeline sự kiện và form đăng ký trực tuyến.",
    accent: "from-blue-500/15 to-cyan-500/5 border-blue-500/25",
  },
  {
    id: "film-2",
    badge: "CBT Arena",
    title: "Hệ Thống Đấu Trường Thi Thử 1vs1",
    desc: "Quản lý câu hỏi trắc nghiệm, bộ đếm mili-giây không lag và biểu đồ phân tích câu sai.",
    prompt: "Thiết kế giao diện thi đấu CBT 1vs1 thời gian thực với thanh tiến độ kép và bảng phân tích đáp án chi tiết.",
    accent: "from-amber-500/15 to-orange-500/5 border-amber-500/25",
  },
  {
    id: "film-3",
    badge: "ReaderCard + LucianLabs",
    title: "Hồ Sơ Nghiên Cứu Khoa Học Học Sinh",
    desc: "Trình đọc bài nghiên cứu Liquid Glass, hỗ trợ trích dẫn tài liệu và báo cáo phản biện.",
    prompt: "Tạo trang trình bày đề tài KHKT cho học sinh THPT sử dụng bố cục tạp chí dễ đọc và phần trích dẫn nguồn rõ ràng.",
    accent: "from-emerald-500/15 to-teal-500/5 border-emerald-500/25",
  },
  {
    id: "film-4",
    badge: "MotionSites Editorial",
    title: "Tạp Chí Ý Tưởng Chống AI-Slop",
    desc: "Trưng bày hệ thống typography rõ nhịp, loại bỏ thẻ rập khuôn và card thừa thãi.",
    prompt: "Thiết kế trang tạp chí công nghệ biên tập theo phong cách Thụy Sĩ với lưới bất đối xứng và độ tương phản cao.",
    accent: "from-violet-500/15 to-purple-500/5 border-violet-500/25",
  },
];

export const HomePage = () => {
  const navigate = useNavigate();
  const { theme, setTheme, reducedMotion } = useTheme();
  const uiTheme = theme === "dark" ? "dark" : "light";

  const [presetSignal, setPresetSignal] = useState<PromptComposerPreset | null>(null);
  const [pulledFolderNote, setPulledFolderNote] = useState<string>(
    "Chạm hoặc kéo bất kỳ tập hồ sơ nào trong hộp PinUI FileBox để mở nhanh ngữ cảnh dự án."
  );
  const [selectedChipCategory, setSelectedChipCategory] = useState<string>("AI Tools");

  const handlePromptSend = ({
    text,
    action,
    model,
  }: {
    text: string;
    action: ActionId | null;
    model: string;
  }) => {
    navigate("/workspace", {
      state: {
        initialPrompt: text,
        action,
        model,
        autoSubmit: true,
        fromMorph: true,
        templateTitle: action ? `Studio · ${action}` : "Phiên sáng tạo mới",
      },
    });
  };

  const handleSelectQuickBox = (preset: (typeof QUICK_EDIT_PRESETS)[number]) => {
    setPresetSignal({
      text: preset.text,
      action: preset.action,
      nonce: Date.now(),
    });
    const composerEl = document.getElementById("ff-hero-composer");
    composerEl?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "center" });
  };

  return (
    <div className="space-y-24 pb-12">
      {/* =================================================================== */}
      {/* HERO: MotionSites Editorial Flow + ThreeUI Backdrop + PromptComposer */}
      {/* =================================================================== */}
      <section className="relative pt-6 sm:pt-10 pb-8 rounded-[32px] overflow-hidden">
        <div className="absolute inset-0 -z-0 opacity-85">
          <SpatialNetworkCanvas theme={uiTheme} reducedMotion={reducedMotion} className="w-full h-full" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6 px-2">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-border bg-card/85 backdrop-blur-md text-xs font-medium text-muted-foreground shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Tuyển chọn 100% từ SOURCEOFKNOWLEDGFORAI · Không AI-Slop</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.06 }}
            className="text-4xl sm:text-6xl font-semibold tracking-[-0.03em] leading-[1.08] text-foreground"
          >
            Biến ý tưởng thành{" "}
            <span className="font-serif italic font-normal text-blue-600 dark:text-blue-400 px-1">
              Workspace
            </span>{" "}
            thực chiến.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.12 }}
            className="max-w-2xl mx-auto text-sm sm:text-base text-muted-foreground leading-relaxed"
          >
            Chọn một hộp tác vụ nhanh bên dưới để AI tự điền prompt chuẩn mực, hoặc nhập trực tiếp yêu cầu
            của bạn vào khung PinUI để chuyển cảnh mượt mà sang bàn làm việc AI.
          </motion.p>

          {/* Centerpiece PinUI Prompt Composer with Shared-Element Morph */}
          <div id="ff-hero-composer" className="pt-2 flex justify-center">
            <PromptComposer
              theme={uiTheme}
              morphLayoutId="ff-composer-morph"
              presetSignal={presetSignal}
              onSend={handlePromptSend}
            />
          </div>

          {/* Interactive Auto-Fill Edit / Prompt Boxes */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.22 }}
            className="pt-2"
          >
            <div className="text-[11px] uppercase tracking-widest text-muted-foreground font-semibold mb-3 flex items-center justify-center gap-1.5">
              <Wand2 className="w-3.5 h-3.5 text-blue-500" />
              Hộp tự điền Prompt &amp; Chỉnh sửa nhanh (Nhấn để nạp vào khung trên)
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {QUICK_EDIT_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => handleSelectQuickBox(preset)}
                  className="group inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl border border-border bg-card/90 hover:border-blue-500/45 hover:bg-card text-left shadow-sm transition-all hover:-translate-y-0.5"
                >
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-muted text-muted-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    {preset.tag}
                  </span>
                  <span className="text-xs font-semibold text-foreground">{preset.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* CHAPTER 1: PinUI FileBox + PinUI TaskCard Asymmetric Studio Pair    */}
      {/* =================================================================== */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-5 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-card text-xs font-semibold text-muted-foreground">
            <FolderGit2 className="w-3.5 h-3.5 text-amber-500" />
            Chương 01 · Không gian Lưu trữ &amp; Tiến độ
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground leading-tight">
            Cấu trúc tệp rõ ràng,{" "}
            <span className="font-serif italic font-normal text-blue-600 dark:text-blue-400">
              Audit
            </span>{" "}
            từng bước thực thi.
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Không còn cảnh code AI sinh ra hỗn loạn không kiểm soát. Mỗi dự án đi kèm hộp lưu trữ vật lý
            PinUI <code className="text-xs px-1.5 py-0.5 rounded bg-muted">FileBox</code> và cây nhiệm vụ{" "}
            <code className="text-xs px-1.5 py-0.5 rounded bg-muted">TaskCard</code> kiểm tra từng milestone.
          </p>
          <div className="p-3.5 rounded-2xl border border-border bg-card text-xs text-muted-foreground">
            <strong className="text-foreground block mb-1">Trạng thái tương tác:</strong>
            {pulledFolderNote}
          </div>
          <div className="flex flex-wrap gap-2.5 pt-1">
            <button
              type="button"
              onClick={() => navigate("/projects")}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-foreground text-background text-xs font-semibold hover:opacity-90 transition"
            >
              Mở Kho Dự Án <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => navigate("/workspace")}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-border bg-card text-foreground text-xs font-semibold hover:bg-muted transition"
            >
              Thử trong Workspace
            </button>
          </div>
        </div>

        <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
          <div className="rounded-3xl border border-border bg-card p-4 shadow-sm overflow-hidden flex items-center justify-center min-h-[340px]">
            <FileBox
              theme={uiTheme}
              onPull={({ color, position }) => {
                const map: Record<string, string> = {
                  green: "Đã kéo ngăn Xanh Lá (#" + position + "): Bộ UI Showcase sẵn sàng mở ở Workspace.",
                  beige: "Đã kéo ngăn Giấy Be (#" + position + "): Tài liệu SOURCEOFKNOWLEDGE chuẩn MIT.",
                  pink: "Đã kéo ngăn Hồng (#" + position + "): Gói hiệu ứng MotionSites Editorial.",
                  orange: "Đã kéo ngăn Cam (#" + position + "): Hệ thống thi CBT & kiểm thử tự động.",
                };
                setPulledFolderNote(map[color] || `Đã mở ngăn tài liệu #${position}`);
              }}
            />
          </div>

          <div className="rounded-3xl border border-border bg-card p-3 shadow-sm flex items-center justify-center">
            <TaskCard theme={uiTheme} title="Kiểm thử F-FORUM" />
          </div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* CHAPTER 2: PinUI LiquidTabs + Tactile Chips + ThemeSwitch            */}
      {/* =================================================================== */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 order-2 lg:order-1 grid grid-cols-1 gap-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch">
            <div className="rounded-3xl border border-border bg-card p-4 shadow-sm flex items-center justify-center overflow-hidden">
              <LiquidTabs
                theme={uiTheme}
                rows={4}
                onSelect={(item) => {
                  navigate("/explore", { state: { highlightQuery: item.title } });
                }}
              />
            </div>

            <div className="rounded-3xl border border-border bg-card p-5 shadow-sm flex flex-col justify-between gap-5">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                  PinUI Theme Switch &amp; Hiệu ứng Mưa / Giọt
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                  Chuyển đổi trực tiếp giữa Warm Paper Light và Graphite Dark trên toàn Studio:
                </p>
                <div className="flex justify-center py-2">
                  <ThemeSwitch
                    theme={uiTheme}
                    onThemeChange={(nextTheme) => setTheme(nextTheme)}
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-border flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Nhóm tài nguyên đang chọn:</span>
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  {selectedChipCategory}
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-card p-5 shadow-sm overflow-x-auto">
            <div className="text-xs font-semibold text-muted-foreground mb-3">
              8 Nhóm Tài Nguyên Vật Lý (PinUI Extruded 3D Chips — Nhấn để lọc ngay)
            </div>
            <Chips
              theme={uiTheme}
              rows={2}
              defaultValue={selectedChipCategory}
              onChange={(val) => {
                if (val) setSelectedChipCategory(val);
              }}
            />
          </div>
        </div>

        <div className="lg:col-span-5 order-1 lg:order-2 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-card text-xs font-semibold text-muted-foreground">
            <Layers className="w-3.5 h-3.5 text-blue-500" />
            Chương 02 · Tương tác Vật Lý PinUI
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground leading-tight">
            Mỗi cú chạm đều có{" "}
            <span className="font-serif italic font-normal text-blue-600 dark:text-blue-400">
              Studio
            </span>{" "}
            phản hồi tức thì.
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Kế thừa trực tiếp từ PinUI: tab chất lỏng <code className="text-xs px-1.5 py-0.5 rounded bg-muted">LiquidTabs</code>,
            phím nổi 3D <code className="text-xs px-1.5 py-0.5 rounded bg-muted">Chips</code> cho 8 nhóm tri thức và công tắc chủ đề xúc giác.
            Khi cuộn hoặc nhấn, mọi chuyển động tuân thủ chuẩn <code className="text-xs px-1.5 py-0.5 rounded bg-muted">prefers-reduced-motion</code>.
          </p>
          <div className="flex flex-wrap gap-2.5 pt-1">
            <button
              type="button"
              onClick={() => navigate("/knowledge", { state: { category: selectedChipCategory } })}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-foreground text-background text-xs font-semibold hover:opacity-90 transition"
            >
              <BookOpen className="w-3.5 h-3.5" />
              Xem {selectedChipCategory} trong Tri Thức
            </button>
            <button
              type="button"
              onClick={() => navigate("/explore")}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-border bg-card text-foreground text-xs font-semibold hover:bg-muted transition"
            >
              <Compass className="w-3.5 h-3.5" /> Sân khấu Explore 60/40
            </button>
          </div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* CHAPTER 3: CodeFronts Cinematic Filmstrip Scroll-Snap               */}
      {/* =================================================================== */}
      <section className="space-y-5">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="space-y-1.5">
            <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Chương 03 · Dải Phim Dự Án (CodeFronts Scroll-Snap Filmstrip)
            </div>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
              Nhấn để Fork mẫu hoàn chỉnh vào{" "}
              <span className="font-serif italic font-normal text-blue-600 dark:text-blue-400">
                Showcase
              </span>
            </h2>
          </div>
          <button
            type="button"
            onClick={() => navigate("/templates")}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
          >
            Xem toàn bộ kho Templates <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory no-scrollbar">
          {FILMSTRIP_PROJECTS.map((item) => (
            <div
              key={item.id}
              className={`snap-start shrink-0 w-[300px] sm:w-[340px] rounded-3xl border bg-gradient-to-br ${item.accent} bg-card p-6 flex flex-col justify-between gap-5 shadow-sm hover:-translate-y-1 transition-transform`}
            >
              <div className="space-y-3">
                <span className="inline-block text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full bg-card/85 border border-border text-foreground">
                  {item.badge}
                </span>
                <h3 className="text-lg font-bold text-foreground leading-snug">{item.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>

              <button
                type="button"
                onClick={() =>
                  navigate("/workspace", {
                    state: {
                      templateTitle: item.title,
                      initialPrompt: item.prompt,
                      autoSubmit: true,
                    },
                  })
                }
                className="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-2xl bg-card border border-border text-xs font-semibold text-foreground hover:bg-foreground hover:text-background transition"
              >
                <span>Fork sang Workspace</span>
                <Terminal className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* =================================================================== */}
      {/* CHAPTER 4: LucianLabs #243 Public Readiness & Transparency Strip    */}
      {/* =================================================================== */}
      <section className="rounded-3xl border border-border bg-card p-6 sm:p-10 text-center space-y-5 shadow-sm">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400">
          <Sparkles className="w-4 h-4" /> Chuẩn Website Công Cộng Phản Biện Cao
        </div>
        <h2 className="text-2xl sm:text-3xl font-semibold text-foreground">
          Minh bạch 100% mã nguồn &amp; bảo vệ người dùng công cộng
        </h2>
        <p className="max-w-2xl mx-auto text-xs sm:text-sm text-muted-foreground leading-relaxed">
          Không rò rỉ khoá API ở client, hỗ trợ xếp hàng ngoại tuyến khi rớt mạng, có nút báo cáo kiểm
          duyệt và bảng đối chiếu trực tiếp tới kho GitHub chính chủ.
        </p>

        <TrustVerifyBadges
          onOpenSourcesModal={() => window.dispatchEvent(new Event("ff-open-sources"))}
        />

        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => navigate("/quick-start")}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-foreground text-background text-xs font-semibold hover:opacity-90 transition"
          >
            Chạy Quick Start 4 bước <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border bg-background text-foreground text-xs font-medium hover:bg-muted transition"
          >
            Xem Landing Page Gốc (/)
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
