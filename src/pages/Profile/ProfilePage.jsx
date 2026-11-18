import React, { useState } from 'react';
import { 
  User, 
  Settings, 
  Sun, 
  Moon, 
  ShieldCheck, 
  Database, 
  Download, 
  Sparkles, 
  Award, 
  Check, 
  ExternalLink 
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
      {/* Profile Header Card */}
      <Window title="Maker Profile & Account Preferences" subtitle="Cài đặt hệ thống" className="border-white/15">
        <div className="p-6 sm:p-8 space-y-8">
          {/* User Info Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pb-6 border-b border-white/10">
            <Avatar name={profileName} size="lg" className="w-16 h-16 text-xl shadow-lg ring-4 ring-ff-gold/30" />
            <div className="space-y-1 flex-1">
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-serif font-bold text-neutral-100">
                  {profileName}
                </h2>
                <Badge variant="gold" size="xs">Maker K20</Badge>
              </div>
              <p className="text-xs text-neutral-400 font-sans max-w-lg">
                {bio}
              </p>
              <div className="flex items-center gap-4 text-[11px] font-mono text-neutral-500 pt-1">
                <span>Tham gia: 18/11/2026</span>
                <span>·</span>
                <span>Vai trò: Ban Chủ Nhiệm CLB Công Nghệ</span>
              </div>
            </div>
          </div>

          {/* Usage Metrics Statistics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl glass-panel border-white/10 space-y-1">
              <span className="text-xs text-neutral-400 font-mono">Dự Án Đã Tạo</span>
              <p className="text-2xl font-bold font-mono text-ff-gold">4</p>
              <span className="text-[10px] text-ff-jade">100% sở hữu mã nguồn</span>
            </div>
            <div className="p-4 rounded-xl glass-panel border-white/10 space-y-1">
              <span className="text-xs text-neutral-400 font-mono">Tác Vụ AI Đã Chạy</span>
              <p className="text-2xl font-bold font-mono text-cyan-400">42</p>
              <span className="text-[10px] text-neutral-400">Không giới hạn MVP</span>
            </div>
            <div className="p-4 rounded-xl glass-panel border-white/10 space-y-1">
              <span className="text-xs text-neutral-400 font-mono">Dung Lượng Sandbox</span>
              <p className="text-2xl font-bold font-mono text-purple-400">12.4 MB</p>
              <span className="text-[10px] text-neutral-400">Đã tối ưu hóa lưu trữ</span>
            </div>
          </div>

          {/* Settings Section: Theme & Preferences */}
          <div className="space-y-4 pt-2">
            <h3 className="text-lg font-serif font-bold text-neutral-100 flex items-center gap-2">
              <Settings className="w-4 h-4 text-ff-gold" />
              <span>Giao Diện & Thẩm Mỹ (macOS Appearance)</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={() => setTheme('dark')}
                className={`p-4 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                  theme === 'dark'
                    ? 'bg-ff-gold/15 border-ff-gold text-ff-gold-light font-bold'
                    : 'glass-panel text-neutral-300 hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-neutral-900 border border-white/10 flex items-center justify-center text-ff-gold">
                    <Moon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm">Chế Độ Tối (Academic Dark)</p>
                    <p className="text-[11px] text-neutral-400 font-normal">Nền đen xanh huyền bí, viền vàng kim #EAB308</p>
                  </div>
                </div>
                {theme === 'dark' && <Check className="w-4 h-4 text-ff-gold" />}
              </button>

              <button
                onClick={() => setTheme('light')}
                className={`p-4 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                  theme === 'light'
                    ? 'bg-ff-gold/15 border-ff-gold text-ff-gold-light font-bold'
                    : 'glass-panel text-neutral-300 hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white border border-neutral-300 flex items-center justify-center text-amber-600">
                    <Sun className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm">Chế Độ Sáng (macOS Sonoma Light)</p>
                    <p className="text-[11px] text-neutral-400 font-normal">Nền xám ấm, mặt kính mờ sạch sẽ</p>
                  </div>
                </div>
                {theme === 'light' && <Check className="w-4 h-4 text-ff-gold" />}
              </button>
            </div>
          </div>

          {/* Maker Recognition Badges (Kế thừa từ F-Forum cũ) */}
          <div className="space-y-4 pt-2">
            <h3 className="text-lg font-serif font-bold text-neutral-100 flex items-center gap-2">
              <Award className="w-4 h-4 text-ff-gold" />
              <span>Huy Hiệu Ghi Nhận (Maker Badges)</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-ff-gold/20 text-ff-gold flex items-center justify-center font-bold text-xs">
                  🏆
                </div>
                <div>
                  <p className="text-xs font-bold text-neutral-100">Người Tiên Phong F-Forum</p>
                  <p className="text-[10px] text-neutral-400">Tham gia từ phiên bản 1.0</p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-ff-jade/20 text-ff-jade flex items-center justify-center font-bold text-xs">
                  ⚡
                </div>
                <div>
                  <p className="text-xs font-bold text-neutral-100">CLB Builder 2026</p>
                  <p className="text-[10px] text-neutral-400">Đã xuất bản website CLB</p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-xs">
                  🎓
                </div>
                <div>
                  <p className="text-xs font-bold text-neutral-100">Kiểm Thử Học Thuật CBT</p>
                  <p className="text-[10px] text-neutral-400">Đã vượt qua bài thi chuẩn hóa</p>
                </div>
              </div>
            </div>
          </div>

          {/* Edit Profile Form */}
          <form onSubmit={handleSaveProfile} className="space-y-4 pt-2">
            <h3 className="text-lg font-serif font-bold text-neutral-100 flex items-center gap-2">
              <User className="w-4 h-4 text-ff-gold" />
              <span>Chỉnh Sửa Thông Tin Cá Nhân</span>
            </h3>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-mono text-neutral-400 mb-1">Họ và Tên</label>
                <input
                  type="text"
                  value={profileName}
                  onChange={e => setProfileName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-xs text-neutral-100 focus:outline-none focus:border-ff-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-400 mb-1">Mô tả bản thân (Bio)</label>
                <textarea
                  rows={2}
                  value={bio}
                  onChange={e => setBio(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-xs text-neutral-100 focus:outline-none focus:border-ff-gold"
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
