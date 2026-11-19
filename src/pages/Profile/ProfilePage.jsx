import React, { useState } from 'react';
import { 
  User, 
  Settings, 
  Sun, 
  Moon, 
  Award, 
  Check
} from 'lucide-react';
import { Window } from '../../components/macos/Window';
import { Button } from '../../components/macos/Button';
import { Badge, Avatar } from '../../components/macos/UIElements';
import { useTheme } from '../../context/ThemeContext';

export const ProfilePage = () => {
  const { theme, setTheme } = useTheme();
  const [profileName, setProfileName] = useState('Đặng Nhật Minh');
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
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pb-6 border-b border-white/10">
            <Avatar name={profileName} size="lg" className="w-16 h-16 text-xl shadow-lg ring-2 ring-white/40" />
            <div className="space-y-1 flex-1">
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-sans font-semibold text-foreground">
                  {profileName}
                </h2>
                <Badge variant="gold" size="xs">Maker K20</Badge>
              </div>
              <p className="text-xs text-muted-foreground font-sans max-w-lg">
                {bio}
              </p>
              <div className="flex items-center gap-4 text-[11px] font-mono text-neutral-500 pt-1">
                <span>Tham gia: 18/11/2026</span>
                <span>·</span>
                <span>Vai trò: Ban Chủ Nhiệm CLB Công Nghệ</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-black/60 border border-border space-y-1">
              <span className="text-xs text-muted-foreground font-mono">Dự Án Đã Tạo</span>
              <p className="text-2xl font-bold font-mono text-foreground">4</p>
              <span className="text-[10px] text-ff-jade">100% sở hữu mã nguồn</span>
            </div>
            <div className="p-4 rounded-xl bg-black/60 border border-border space-y-1">
              <span className="text-xs text-muted-foreground font-mono">Tác Vụ AI Đã Chạy</span>
              <p className="text-2xl font-bold font-mono text-foreground">42</p>
              <span className="text-[10px] text-muted-foreground">Không giới hạn MVP</span>
            </div>
            <div className="p-4 rounded-xl bg-black/60 border border-border space-y-1">
              <span className="text-xs text-muted-foreground font-mono">Dung Lượng Sandbox</span>
              <p className="text-2xl font-bold font-mono text-foreground">12.4 MB</p>
              <span className="text-[10px] text-muted-foreground">Đã tối ưu hóa lưu trữ</span>
            </div>
          </div>

          <div className="space-y-4 pt-2">
            <h3 className="text-lg font-sans font-semibold text-foreground flex items-center gap-2">
              <Settings className="w-4 h-4" />
              <span>Giao Diện & Thẩm Mỹ (Appearance)</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={() => setTheme('dark')}
                className={`p-4 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                  theme === 'dark'
                    ? 'bg-white/10 border-white text-foreground font-semibold'
                    : 'bg-black/50 border-border text-neutral-300 hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-black border border-white/20 flex items-center justify-center text-foreground">
                    <Moon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm">Chế Độ Tối (Pure Black Liquid)</p>
                    <p className="text-[11px] text-muted-foreground font-normal">Nền đen thuần khiết #000000, viền kính sáng mịn</p>
                  </div>
                </div>
                {theme === 'dark' && <Check className="w-4 h-4 text-foreground" />}
              </button>

              <button
                onClick={() => setTheme('light')}
                className={`p-4 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                  theme === 'light'
                    ? 'bg-white/10 border-white text-foreground font-semibold'
                    : 'bg-black/50 border-border text-neutral-300 hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white border border-neutral-300 flex items-center justify-center text-black">
                    <Sun className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm">Chế Độ Sáng (Minimal Light)</p>
                    <p className="text-[11px] text-muted-foreground font-normal">Nền sáng sạch sẽ, tương phản cao</p>
                  </div>
                </div>
                {theme === 'light' && <Check className="w-4 h-4 text-foreground" />}
              </button>
            </div>
          </div>

          <div className="space-y-4 pt-2">
            <h3 className="text-lg font-sans font-semibold text-foreground flex items-center gap-2">
              <Award className="w-4 h-4" />
              <span>Huy Hiệu Ghi Nhận (Maker Badges)</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/15 text-foreground flex items-center justify-center font-mono font-bold text-xs">
                  01
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground">Người Tiên Phong F-Forum</p>
                  <p className="text-[10px] text-muted-foreground">Tham gia từ phiên bản 1.0</p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-ff-jade/20 text-ff-jade flex items-center justify-center font-mono font-bold text-xs">
                  02
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground">CLB Builder 2026</p>
                  <p className="text-[10px] text-muted-foreground">Đã xuất bản website CLB</p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/15 text-foreground flex items-center justify-center font-mono font-bold text-xs">
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
                  className="w-full px-4 py-2.5 rounded-xl bg-black border border-border text-xs text-foreground focus:outline-none focus:border-white"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-muted-foreground mb-1">Mô tả bản thân (Bio)</label>
                <textarea
                  rows={2}
                  value={bio}
                  onChange={e => setBio(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-black border border-border text-xs text-foreground focus:outline-none focus:border-white"
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
