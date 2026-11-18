export const mockChatSessions = [
  {
    id: 'session-1',
    projectId: 'proj-1',
    projectName: 'F-Code Student Tech Club',
    title: 'Tạo Hero Section & Đồng Hồ Đếm Ngược',
    lastMessage: 'Đã cập nhật countdown và chuyển nút bấm sang vàng kim #EAB308.',
    timestamp: '15 phút trước',
    status: 'Ready to Export',
    messages: [
      {
        id: 'm1-1',
        sender: 'ai',
        timestamp: '14:20',
        content: 'Chào bạn! Tôi đã nạp **Prompt Blueprint: Website CLB Sinh Viên**. Dự án đã sẵn sàng với 5 trang: Trang chủ, Tuyển quân, Thành viên, Hoạt động và Liên hệ.',
      },
      {
        id: 'm1-2',
        sender: 'user',
        timestamp: '14:22',
        content: 'Thêm một countdown đếm ngược đến hạn nộp đơn tuyển quân ở Hero section và đổi tông màu nút bấm sang vàng kim #EAB308 nhé.',
      },
      {
        id: 'm1-3',
        sender: 'ai',
        timestamp: '14:23',
        content: 'Đã hoàn tất chỉnh sửa! Tôi đã cập nhật `HeroSection.jsx` và tích hợp `CountdownTimer.jsx`. Bạn có thể tương tác trực tiếp với bản xem trước bên dưới:',
        artifact: {
          type: 'preview_and_diff',
          previewTitle: 'F-Code Club · Tuyển Quân K20',
          countdownDays: 12,
          modifiedFile: 'src/components/HeroSection.jsx',
          diffSummary: '+12 dòng, -4 dòng (CountdownTimer tích hợp)',
          checks: '5/6 Passed (Build OK, Preview OK, Secret Scan OK)',
        }
      }
    ]
  },
  {
    id: 'session-2',
    projectId: 'proj-2',
    projectName: 'Math CBT Practice Arena',
    title: 'Cấu Hình Phòng Thi CBT 50 Câu Bấm Giờ',
    lastMessage: 'Đã cấu hình bộ đếm giờ 90 phút và cơ chế tự động nộp bài.',
    timestamp: '2 giờ trước',
    status: 'Building',
    messages: [
      {
        id: 'm2-1',
        sender: 'user',
        timestamp: '12:05',
        content: 'Thiết lập phòng thi trắc nghiệm Toán chuẩn CBT FPT 2027 với 50 câu hỏi bấm giờ 90 phút.',
      },
      {
        id: 'm2-2',
        sender: 'ai',
        timestamp: '12:07',
        content: 'Đã nạp template **CBT Exam Engine Logic**! Phòng thi hiện đã có: đồng hồ đếm ngược, lưu tạm câu trả lời vào LocalStorage và bảng tổng kết điểm số kèm lời giải chi tiết.',
        artifact: {
          type: 'checks_summary',
          checks: '4/6 Passed (Đang kết nối ngân hàng câu hỏi)',
          action: 'Mở phòng thi thử'
        }
      }
    ]
  },
  {
    id: 'session-3',
    projectId: 'proj-3',
    projectName: 'Personal Vibe Coding Portfolio',
    title: 'Tối Ưu Hiển Thị Di Động Cho Portfolio',
    lastMessage: 'Đã sửa lỗi tràn viền kính mờ trên màn hình 375px.',
    timestamp: 'Hôm qua',
    status: 'Needs Review',
    messages: [
      {
        id: 'm3-1',
        sender: 'user',
        timestamp: '16:40',
        content: 'Kiểm tra lại xem giao diện portfolio có bị lỗi vỡ layout trên iPhone 16 Pro không?',
      },
      {
        id: 'm3-2',
        sender: 'ai',
        timestamp: '16:42',
        content: 'Tôi đã chạy kiểm thử Responsive trong tab Checks: Đã thay thế `w-full max-w-5xl` và padding co giãn cho mobile. Bố cục hiện hiển thị hoàn hảo ở kích thước 375px.',
      }
    ]
  }
];
