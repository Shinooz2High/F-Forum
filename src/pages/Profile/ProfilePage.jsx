import React, { useState } from 'react';
import { 
  User, 
  Settings, 
  Sun, 
  Moon, 
  Award, 
  Check,
  Accessibility,
  ShieldCheck,
  ScrollText,
  WifiOff
} from 'lucide-react';
import { Window } from '../../components/macos/Window';
import { Button } from '../../components/macos/Button';
import { Badge, Avatar } from '../../components/macos/UIElements';
import { useTheme } from '../../context/ThemeContext';
import ThemeSwitch from '../../components/pinui/ThemeSwitch';

export const ProfilePage = () => {
  const {
    theme,
    setTheme,
    reducedMotion,
    toggleReducedMotion,
    simulateOffline,
    setSimulateOffline,
    authUser,
    signOutUser,
  } = useTheme();
  const [profileName, setProfileName] = useState(authUser?.name || 'Đặng Nhật Minh');
  const [bio, setBio] = useState('Sinh viên K20 FPT University · Đam mê Vibe Coding và xây dựng website cho CLB.');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Window title="Maker Profile & Account Preferences" subtitle="Cài đặt hệ thống">
        <div className="p-6 sm:p-8 space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pb-6 border-b border-border">
            <Avatar name={profileName} size="lg" className="w-16 h-16 text-xl shadow-lg" />
            <div className="space-y-1 flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-2xl font-sans font-semibold text-foreground">
                  {profileName}
                </h2>
                <Badge variant="gold" size="xs">Maker K20</Badge>
                {authUser ? (
                  <button
                    type="button"
                    onClick={signOutUser}
                    className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25 font-medium"
                  >
                    Đã đăng nhập ({authUser.provider}) · Đăng xuất
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => window.dispatchEvent(new Event('ff-open-signin'))}
                    className="text-xs px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/25 font-medium hover:bg-blue-500/15 cursor-pointer"
                  >
                    Đăng nhập Halo Sign In
                  </button>
                )}
              </div>
              <p className="text-xs text-muted-foreground font-sans max-w-lg">
                {bio}
              </p>
              <div className="flex items-center gap-4 text-[11px] font-mono text-muted-foreground pt-1">
                <span>Tham gia: 18/11/2026</span>
                <span>·</span>
                <span>Vai trò: Ban Chủ Nhiệm CLB Công Nghệ</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-muted/60 border border-border space-y-1">
              <span className="text-xs text-muted-foreground font-mono">Dự Án Đã Tạo</span>
              <p className="text-2xl font-bold font-mono text-foreground">4</p>
              <span className="text-[10px] text-ff-jade">100% sở hữu mã nguồn</span>
            </div>
            <div className="p-4 rounded-xl bg-muted/60 border border-border space-y-1">
              <span className="text-xs text-muted-foreground font-mono">Tác Vụ AI Đã Chạy</span>
              <p className="text-2xl font-bold font-mono text-foreground">42</p>
              <span className="text-[10px] text-muted-foreground">Không giới hạn khi đăng nhập</span>
            </div>
            <div className="p-4 rounded-xl bg-muted/60 border border-border space-y-1">
              <span className="text-xs text-muted-foreground font-mono">Dung Lượng Sandbox</span>
              <p className="text-2xl font-bold font-mono text-foreground">12.4 MB</p>
              <span className="text-[10px] text-muted-foreground">Đã tối ưu hóa lưu trữ</span>
            </div>
          </div>

          <div className="space-y-4 pt-2">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h3 className="text-lg font-sans font-semibold text-foreground flex items-center gap-2">
                <Settings className="w-4 h-4" />
                <span>Giao Diện &amp; Thẩm Mỹ (Appearance)</span>
              </h3>
              <ThemeSwitch
                theme={theme === 'dark' ? 'dark' : 'light'}
                onThemeChange={(t) => setTheme(t)}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={() => setTheme('light')}
                className={`p-4 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                  theme === 'light'
                    ? 'bg-muted border-blue-500/50 text-foreground font-semibold'
                    : 'bg-card border-border text-muted-foreground hover:bg-muted/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#F4F2EE] border border-zinc-300 flex items-center justify-center text-zinc-900">
                    <Sun className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm text-foreground">Giấy Ấm (Warm Paper Light)</p>
                    <p className="text-[11px] text-muted-foreground font-normal">Nền #F4F2EE chuẩn LucianLabs, chữ sắc nét</p>
                  </div>
                </div>
                {theme === 'light' && <Check className="w-4 h-4 text-blue-600" />}
              </button>

              <button
                onClick={() => setTheme('dark')}
                className={`p-4 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                  theme === 'dark'
                    ? 'bg-muted border-blue-500/50 text-foreground font-semibold'
                    : 'bg-card border-border text-muted-foreground hover:bg-muted/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#0B0C10] border border-zinc-700 flex items-center justify-center text-zinc-100">
                    <Moon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm text-foreground">Than Chì (Graphite Dark)</p>
                    <p className="text-[11px] text-muted-foreground font-normal">Nền #0B0C10 tương phản sâu, kính mờ hiện đại</p>
                  </div>
                </div>
                {theme === 'dark' && <Check className="w-4 h-4 text-blue-400" />}
              </button>
            </div>

            {/* Accessibility, Resilience & Compliance Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={toggleReducedMotion}
                className={`p-3.5 rounded-2xl border text-left flex items-center justify-between transition cursor-pointer ${
                  reducedMotion ? 'bg-blue-500/10 border-blue-500/40' : 'bg-card border-border hover:bg-muted/50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Accessibility className="w-4 h-4 text-blue-500" />
                  <div>
                    <p className="text-xs font-semibold text-foreground">Giảm chuyển động (Reduced Motion)</p>
                    <p className="text-[11px] text-muted-foreground">Tắt animation bay / Canvas 3D</p>
                  </div>
                </div>
                <span className="text-[11px] font-mono font-semibold text-foreground">
                  {reducedMotion ? 'BẬT' : 'TẮT'}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setSimulateOffline(!simulateOffline)}
                className={`p-3.5 rounded-2xl border text-left flex items-center justify-between transition cursor-pointer ${
                  simulateOffline ? 'bg-amber-500/10 border-amber-500/40' : 'bg-card border-border hover:bg-muted/50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <WifiOff className="w-4 h-4 text-amber-500" />
                  <div>
                    <p className="text-xs font-semibold text-foreground">Giả lập Offline Queue (#091)</p>
                    <p className="text-[11px] text-muted-foreground">Thử xếp hàng prompt khi mất mạng</p>
                  </div>
                </div>
                <span className="text-[11px] font-mono font-semibold text-foreground">
                  {simulateOffline ? 'BẬT' : 'TẮT'}
                </span>
              </button>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              <button
                type="button"
                onClick={() => window.dispatchEvent(new Event('ff-open-sources'))}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-border bg-card text-xs font-medium text-foreground hover:bg-muted transition cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                Kiểm tra bảng Nguồn 100%
              </button>
              <button
                type="button"
                onClick={() => window.dispatchEvent(new Event('ff-open-terms'))}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-border bg-card text-xs font-medium text-foreground hover:bg-muted transition cursor-pointer"
              >
                <ScrollText className="w-4 h-4 text-blue-500" />
                Đọc Điều khoản Cộng đồng (#068)
              </button>
            </div>
          </div>

          <div className="space-y-4 pt-2">
            <h3 className="text-lg font-sans font-semibold text-foreground flex items-center gap-2">
              <Award className="w-4 h-4" />
              <span>Huy Hiệu Ghi Nhận (Maker Badges)</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl bg-muted/50 border border-border flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-card border border-border text-foreground flex items-center justify-center font-mono font-bold text-xs">
                  01
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground">Người Tiên Phong F-Forum</p>
                  <p className="text-[10px] text-muted-foreground">Tham gia từ phiên bản 1.0</p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-muted/50 border border-border flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-ff-jade/20 text-ff-jade flex items-center justify-center font-mono font-bold text-xs">
                  02
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground">CLB Builder 2026</p>
                  <p className="text-[10px] text-muted-foreground">Đã xuất bản website CLB</p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-muted/50 border border-border flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-card border border-border text-foreground flex items-center justify-center font-mono font-bold text-xs">
                  03
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground">Kiểm Thử Học Thuật CBT</p>
                  <p className="text-[10px] text-muted-foreground">Đã vượt qua bài thi chuẩn hóa</p>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-4 pt-2">
            <h3 className="text-lg font-sans font-semibold text-foreground flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>Chỉnh Sửa Thông Tin Cá Nhân</span>
            </h3>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-mono text-muted-foreground mb-1">Họ và Tên</label>
                <input
                  type="text"
                  value={profileName}
                  onChange={e => setProfileName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-xs text-foreground focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-muted-foreground mb-1">Mô tả bản thân (Bio)</label>
                <textarea
                  rows={2}
                  value={bio}
                  onChange={e => setBio(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-xs text-foreground focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              {savedSuccess ? (
                <span className="text-xs text-ff-jade flex items-center gap-1">
                  <Check className="w-4 h-4" /> Đã lưu thông tin thành công!
                </span>
              ) : <div />}

              <Button type="submit" variant="primary" size="sm">
                Lưu Thay Đổi
              </Button>
            </div>
          </form>
        </div>
      </Window>
    </div>
  );
};
