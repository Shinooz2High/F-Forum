export const mockChatMessages = [
  {
    id: 'msg-1',
    sender: 'ai',
    timestamp: '14:20',
    content: 'Chào bạn! Tôi đã nạp **Prompt Blueprint: Website CLB Sinh Viên**. Hiện tại khung dự án đã sẵn sàng với 5 trang: Trang chủ, Tuyển quân, Thành viên, Hoạt động và Liên hệ. Bạn muốn điều chỉnh phần nào trước?'
  },
  {
    id: 'msg-2',
    sender: 'user',
    timestamp: '14:22',
    content: 'Thêm một countdown đếm ngược đến hạn nộp đơn tuyển quân ở Hero section và đổi tông màu nút bấm sang vàng kim #EAB308 nhé.'
  },
  {
    id: 'msg-3',
    sender: 'ai',
    timestamp: '14:23',
    content: 'Đã hoàn tất! Tôi vừa cập nhật component `HeroSection.jsx`:\n- Thêm đồng hồ đếm ngược động (Days : Hours : Minutes : Seconds).\n- Chuyển màu nút "Nộp Đơn Ngay" sang tông vàng kim hoàng gia `#EAB308` với hiệu ứng ánh kim khi di chuột.\n- Cập nhật bản xem trước thời gian thực (Live Preview).'
  },
  {
    id: 'msg-4',
    sender: 'user',
    timestamp: '14:25',
    content: 'Xem thử trên màn hình điện thoại trông như thế nào?'
  },
  {
    id: 'msg-5',
    sender: 'ai',
    timestamp: '14:26',
    content: 'Tôi đã kiểm tra kiểm thử Responsive trong tab **Checks**: Bố cục trên iPhone / Android hiển thị sắc nét, các thẻ đếm ngược tự động co giãn 2x2 mà không bị tràn màn hình. Bạn có thể nhấn nút "Chế độ Điện Thoại" trên thanh Preview để tương tác trực tiếp!'
  }
];

export const mockProgressTasks = [
  { id: 1, title: 'Phân tích yêu cầu & tạo Project Brief', status: 'completed', time: '14:18' },
  { id: 2, title: 'Khởi tạo cấu trúc thư mục React & Tailwind', status: 'completed', time: '14:19' },
  { id: 3, title: 'Tạo Hero Section với đồng hồ đếm ngược tuyển quân', status: 'completed', time: '14:23' },
  { id: 4, title: 'Chạy kiểm tra Build & Type Check', status: 'completed', time: '14:24' },
  { id: 5, title: 'Đang chuẩn bị gói xuất bản ZIP & tài liệu README.md', status: 'running', time: '14:27' }
];

export const mockChecks = [
  {
    id: 'chk-build',
    name: 'Biên dịch (Build Project)',
    status: 'passed',
    message: 'Dự án đã biên dịch thành công không có lỗi cú pháp (0 errors, 0 warnings).'
  },
  {
    id: 'chk-preview',
    name: 'Máy chủ xem trước (Preview Server)',
    status: 'passed',
    message: 'Localhost server đang chạy ổn định tại cổng 5173 với hot-reload.'
  },
  {
    id: 'chk-responsive',
    name: 'Kiểm thử hiển thị di động (Responsive Layout)',
    status: 'passed',
    message: 'Đã kiểm tra ở các kích thước 375px (iPhone), 768px (iPad) và 1440px (MacBook).'
  },
  {
    id: 'chk-secrets',
    name: 'Quét an ninh mã nguồn (Secret Scanner)',
    status: 'passed',
    message: 'Không phát hiện API key, token bí mật hay mật khẩu bị hardcode trong tệp.'
  },
  {
    id: 'chk-links',
    name: 'Liên kết nội bộ (Links & Navigation)',
    status: 'warning',
    message: '1 liên kết tới Google Forms tuyển quân đang ở dạng placeholder (#form).'
  },
  {
    id: 'chk-tests',
    name: 'Bài kiểm tra đơn vị (Unit Tests)',
    status: 'untested',
    message: 'Chưa cấu hình kiểm thử đơn vị tự động cho phiên bản này.'
  }
];
