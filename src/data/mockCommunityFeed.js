export const mockProjectShowcases = [
  {
    id: 'sc-1',
    title: 'Cổng Thông Tin CLB F-Code K20 (Next-Gen Portal)',
    author: {
      name: 'Nguyễn Hoàng Long',
      role: 'Chủ nhiệm CLB F-Code',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
    },
    publishedAt: '2 giờ trước',
    summary: 'Dự án website chính thức của CLB F-Code cho đợt tuyển quân 2026. Tích hợp đồng hồ đếm ngược tuyển thành viên, phân ban chuyên môn và hệ thống lưu hồ sơ ứng tuyển tự động.',
    previewImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
    tags: ['React', 'Tailwind', 'CLB Sinh Viên', 'Kính Mờ'],
    metrics: { forks: 142, stars: 320, views: '2.4k' },
    takeaways: [
      'Tối ưu hóa thời gian tải trang dưới 0.6s bằng cách lười tải hình ảnh các ban',
      'Định tuyến SPA mượt mà không bao giờ gặp lỗi 404 trên Vercel',
      'Cấu trúc form đăng ký modular dễ dàng chuyển giao cho các thế hệ khóa sau'
    ],
    demoUrl: '#',
    promptForFork: 'Fork và khởi tạo dự án dựa trên Cổng Thông Tin CLB F-Code K20 với đầy đủ Hero countdown và các ban chuyên môn.'
  },
  {
    id: 'sc-2',
    title: 'Đấu Trường Thi Thử CBT 1vs1 Toán Học & Khoa Học',
    author: {
      name: 'Trần Minh Đức',
      role: 'Maker K20 · FPT University',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
    },
    publishedAt: 'Hôm qua',
    summary: 'Hệ thống mô phỏng kỳ thi trắc nghiệm trên máy tính (CBT) với 50 câu hỏi bấm giờ chuẩn hóa, chống gian lận tab và phân tích biểu đồ điểm số thời gian thực.',
    previewImage: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80',
    tags: ['Thi CBT', 'Local State', 'Audio Effects', 'Học Thuật'],
    metrics: { forks: 98, stars: 275, views: '1.8k' },
    takeaways: [
      'Giải thuật bấm giờ chính xác tới mili-giây không phụ thuộc vào chu kỳ render React',
      'Tích hợp ngân hàng 300 câu hỏi đề thi THPT Quốc Gia có giải thích từng bước',
      'Lưu vết trạng thái thi vào LocalStorage giúp bảo toàn bài thi khi mất kết nối mạng'
    ],
    demoUrl: '#',
    promptForFork: 'Fork và tạo ứng dụng phòng thi thử trắc nghiệm CBT 1vs1 có đồng hồ đếm ngược và phân tích kết quả.'
  }
];

export const mockCommunityDrops = [
  {
    id: 'drop-1',
    type: 'Rules & Agent Skills',
    title: 'Antigravity Liquid Glass Ruleset v2.4',
    author: 'BQT F-Forum AI',
    date: '18/11/2026',
    badge: 'Đã Kiểm Thử',
    description: 'Quy tắc chuẩn mực cho AI Coding: cấm sinh mã cứng API keys, bắt buộc sử dụng CSS variables cho bảng màu vàng kim #EAB308 và bảo đảm tính co giãn liquid.',
    codeSnippet: `// .agent/rules/liquid-theme.rule
export const LIQUID_RULES = {
  theme: "Academic macOS Dark (#07090E)",
  accentGold: "#EAB308",
  glassStyle: "backdrop-blur-2xl border-white/10",
  trafficLights: true,
  preventSecretsInBuild: true,
};`,
    downloads: 890,
    tags: ['Antigravity', 'Rules', 'macOS']
  },
  {
    id: 'drop-2',
    type: 'UI Component Drop',
    title: 'Detachable PiP Window for React 18',
    author: 'Lê Bảo Anh (F-Code)',
    date: '17/11/2026',
    badge: 'Đã Kiểm Tra Thông Tin',
    description: 'Component cửa sổ macOS lơ lửng hỗ trợ kéo thả tự do, phóng to toàn màn hình và thu nhỏ vào góc màn hình khi đang code.',
    codeSnippet: `// FloatingPiPWindow.jsx
export const FloatingPiPWindow = ({ isOpen, onClose, children }) => {
  return (
    <div className="fixed bottom-4 right-4 z-50 w-96 rounded-2xl glass-panel shadow-2xl border border-ff-gold/30">
      <TitleBar trafficLights onClose={onClose} />
      <div className="p-3">{children}</div>
    </div>
  );
};`,
    downloads: 1240,
    tags: ['React', 'Component', 'PiP']
  }
];

export const mockDevQnA = [
  {
    id: 'qna-1',
    question: 'Làm sao để cấu hình React Router trên Vercel không bị 404 khi tải lại trang?',
    author: 'Đỗ Hải Đăng',
    repliesCount: 4,
    status: 'Đã giải quyết',
    acceptedAnswer: 'Tạo tệp vercel.json ở thư mục gốc với cấu hình rewrites: [{ "source": "/(.*)", "destination": "/" }]. Vercel sẽ tự động điều hướng tất cả URL về index.html.',
    tags: ['Vercel', 'React Router', 'SPA']
  },
  {
    id: 'qna-2',
    question: 'Nên chia cấu trúc thư mục component cho dự án CLB sinh viên như thế nào để dễ bàn giao?',
    author: 'Vũ Thảo Vy',
    repliesCount: 7,
    status: 'Đã giải quyết',
    acceptedAnswer: 'Chia theo modules: src/components/layout (MenuBar, Footer), src/components/departments (ban chuyên môn), src/components/events (sự kiện) kèm file README giải thích nhiệm vụ từng thư mục.',
    tags: ['Kiến Trúc', 'CLB', 'Handover']
  },
  {
    id: 'qna-3',
    question: 'Cách tối ưu hiệu năng kính mờ backdrop-filter trên các máy tính cấu hình yếu?',
    author: 'Lâm Gia Huy',
    repliesCount: 3,
    status: 'Đang thảo luận',
    acceptedAnswer: 'Giảm blur từ 40px xuống 16-20px và thêm -webkit-backdrop-filter, tránh lồng ghép nhiều thẻ glass card đè lên nhau trong cùng một viewport.',
    tags: ['CSS', 'Glassmorphism', 'Hiệu Năng']
  }
];

export const mockCommunityPulse = {
  trendingTopics: [
    { tag: '#Antigravity', count: 420 },
    { tag: '#VibeCoding', count: 310 },
    { tag: '#CBT-Exam-2027', count: 285 },
    { tag: '#Tailwind-macOS', count: 194 },
    { tag: '#Club-Handover', count: 160 }
  ],
  topMakers: [
    { name: 'Nguyễn Hoàng Long', role: 'F-Code Tech Lead', projects: 12, score: '4.9★' },
    { name: 'Trần Minh Đức', role: 'Maker K20', projects: 8, score: '5.0★' },
    { name: 'Phạm Thu Trang', role: 'Chủ nhiệm CLB Nghệ Thuật', projects: 6, score: '4.8★' }
  ],
  clubBulletins: [
    {
      club: 'CLB F-Code K20',
      type: 'Tuyển Quân',
      headline: 'Mở đơn tuyển thành viên đợt 1 các ban Kỹ thuật Web, Thiết kế UI & AI Agent',
      deadline: 'Hạn chót: 01/12/2026',
      badge: 'Đang Mở'
    },
    {
      club: 'Ban Học Thuật CNTT',
      type: 'Bàn Giao Dự Án',
      headline: 'Cần tìm nhóm sinh viên K21 tiếp quản dự án Ngân hàng đề thi trắc nghiệm CBT',
      deadline: 'Bàn giao: Tuần 4 tháng 12',
      badge: 'Cần Tiếp Quản'
    }
  ]
};
