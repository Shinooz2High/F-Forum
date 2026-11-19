export const mockTemplates = [
  {
    id: 'club-website',
    title: 'Student Club Website',
    vietnameseTitle: 'Website Câu Lạc Bộ Sinh Viên',
    category: 'Websites',
    cardFormat: 'large', // Thẻ lớn (Full Landing Page)
    designStyle: 'Cyber-Academic',
    difficulty: 'Người mới (Beginner)',
    badge: 'Phổ biến nhất',
    description: 'Trang web giới thiệu CLB hiện đại với phần tuyển thành viên, ban chủ nhiệm, dự án nổi bật, sự kiện và form đăng ký trực tuyến.',
    features: [
      'Hero section nổi bật với countdown tuyển quân',
      'Giới thiệu sứ mệnh & các ban chuyên môn',
      'Thư viện ảnh hoạt động & dự án thành viên',
      'Form đăng ký tích hợp Google Forms / webhook',
      'Tương thích mượt mà điện thoại & máy tính'
    ],
    techStack: ['React', 'Tailwind CSS', 'Lucide Icons'],
    previewImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
    demoUrl: 'https://f-code-club.preview.f-forum.edu.vn',
    rating: 4.9,
    usesCount: 1420,
    fps: 60,
    bundleSize: '1.4 MB',
    responsiveScore: '100% Mobile & Desktop'
  },
  {
    id: 'navbar-hero-strip',
    title: 'Dynamic Navbar & Glass Hero Strip',
    vietnameseTitle: 'Khối Hero Banner & Menu Kính Mờ',
    category: 'UI Components',
    cardFormat: 'wide', // Thẻ ngang (Navbar/Hero)
    designStyle: 'macOS Sonoma',
    difficulty: 'Người mới (Beginner)',
    badge: 'Module Nổi Bật',
    description: 'Khối Header và Hero Section phong cách macOS Sonoma với hiệu ứng kính mờ sâu, đồng hồ hệ thống và thanh tìm kiếm tích hợp sẵn.',
    features: [
      'MenuBar kính mờ h-10 chuẩn Apple',
      'Tích hợp Spotlight Search modal',
      'CTA nút kép gradient ánh kim hoàng gia'
    ],
    techStack: ['React', 'Glassmorphism', 'Tailwind'],
    previewImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    demoUrl: 'https://hero-strip.preview.f-forum.edu.vn',
    rating: 4.9,
    usesCount: 880,
    fps: 60,
    bundleSize: '0.4 MB',
    responsiveScore: 'Fluid Clamp Typography'
  },
  {
    id: 'mobile-quiz-card',
    title: 'Mobile CBT Flashcard & Quiz UI',
    vietnameseTitle: 'Giao Diện Ôn Thi Di Động CBT',
    category: 'Web Apps',
    cardFormat: 'vertical', // Thẻ dọc (Mobile UI)
    designStyle: 'Minimalist Bento',
    difficulty: 'Trung bình (Intermediate)',
    badge: 'Mobile Optimized',
    description: 'Mẫu giao diện phòng thi tối ưu dọc cho màn hình cảm ứng di động iPhone/Android với bộ đếm giờ, thẻ bài lật và thống kê điểm số.',
    features: [
      'Giao diện thẻ bài trượt swipe mượt mà',
      'Bộ đếm giờ 90 phút chuẩn CBT',
      'Tự động lưu tiến độ làm bài thi'
    ],
    techStack: ['React', 'Local Database', 'Audio'],
    previewImage: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80',
    demoUrl: 'https://mobile-cbt.preview.f-forum.edu.vn',
    rating: 5.0,
    usesCount: 2150,
    fps: 60,
    bundleSize: '0.8 MB',
    responsiveScore: '99% Touch-first'
  },
  {
    id: 'maker-portfolio',
    title: 'Maker & Developer Portfolio',
    vietnameseTitle: 'Portfolio Cá Nhân Sang Trọng',
    category: 'Websites',
    cardFormat: 'large', // Thẻ lớn
    designStyle: 'Dark Elegance',
    difficulty: 'Người mới (Beginner)',
    badge: 'Khuyên dùng',
    description: 'Hồ sơ năng lực cá nhân phong cách macOS liquid với showcase sản phẩm tương tác, blog ghi chép và thông tin liên hệ.',
    features: [
      'Giao diện dark mode sang trọng viền vàng kim',
      'Showcase dự án dạng grid với live demo links',
      'Timeline kinh nghiệm & hoạt động CLB',
      'Hỗ trợ tích hợp GitHub stats tự động',
      'Nút tải CV PDF trực tiếp'
    ],
    techStack: ['React', 'Framer-like CSS', 'Tailwind'],
    previewImage: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
    demoUrl: 'https://portfolio.preview.f-forum.edu.vn',
    rating: 4.8,
    usesCount: 980,
    fps: 60,
    bundleSize: '1.1 MB',
    responsiveScore: '100% Fluid'
  },
  {
    id: 'club-dashboard',
    title: 'Club Operations Dashboard',
    vietnameseTitle: 'Bảng Điều Khiển Hoạt Động CLB',
    category: 'Web Apps',
    cardFormat: 'wide', // Thẻ ngang
    designStyle: 'Minimalist Bento',
    difficulty: 'Nâng cao (Advanced)',
    badge: 'Đầy đủ tính năng',
    description: 'Hệ thống quản lý nội bộ dành cho ban điều hành CLB: điểm danh thành viên, lịch sự kiện, quản lý quỹ và phân công nhiệm vụ.',
    features: [
      'Biểu đồ thống kê hoạt động trực quan',
      'Bảng phân công nhiệm vụ kéo thả Kanban',
      'Quản lý danh sách hội viên & phân quyền',
      'Xuất báo cáo định dạng Excel / CSV'
    ],
    techStack: ['React', 'Chart UI', 'Tailwind CSS'],
    previewImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    demoUrl: 'https://dashboard.preview.f-forum.edu.vn',
    rating: 4.9,
    usesCount: 670,
    fps: 60,
    bundleSize: '1.9 MB',
    responsiveScore: 'Dashboard Grid'
  }
];
