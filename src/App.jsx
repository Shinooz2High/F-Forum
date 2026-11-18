import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { AppLayout } from './layouts/AppLayout';
import { LandingPage } from './pages/Landing/LandingPage';
import { HomePage } from './pages/Home/HomePage';
import { ExplorePage } from './pages/Explore/ExplorePage';
import { TemplatesPage } from './pages/Templates/TemplatesPage';
import { WorkspacePage } from './pages/Workspace/WorkspacePage';
import { MyProjectsPage } from './pages/MyProjects/MyProjectsPage';
import { KnowledgePage } from './pages/Knowledge/KnowledgePage';
import { QuickStartFlow } from './pages/QuickStart/QuickStartFlow';
import { ProfilePage } from './pages/Profile/ProfilePage';
import { Window } from './components/macos/Window';
import { Button } from './components/macos/Button';

function NotFoundPage() {
  return (
    <div className="max-w-lg mx-auto py-20 text-center">
      <Window title="404 — Không Tìm Thấy Trang" subtitle="System Error" className="border-white/10">
        <div className="p-8 space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-ff-rose/10 text-ff-rose flex items-center justify-center mx-auto text-2xl font-mono font-bold">
            404
          </div>
          <h2 className="text-xl font-serif font-bold text-neutral-100">
            Đường dẫn không tồn tại
          </h2>
          <p className="text-xs text-neutral-400">
            Trang bạn đang tìm kiếm có thể đã được di chuyển hoặc xóa khỏi hệ thống F-Forum.
          </p>
          <div className="pt-2">
            <Link to="/home">
              <Button variant="primary" size="md">
                Quay Về Bàn Làm Việc
              </Button>
            </Link>
          </div>
        </div>
      </Window>
    </div>
  );
}

export function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<LandingPage />} />
        <Route path="home" element={<HomePage />} />
        <Route path="explore" element={<ExplorePage />} />
        <Route path="templates" element={<TemplatesPage />} />
        <Route path="workspace" element={<WorkspacePage />} />
        <Route path="projects" element={<MyProjectsPage />} />
        <Route path="knowledge" element={<KnowledgePage />} />
        <Route path="quick-start" element={<QuickStartFlow />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
