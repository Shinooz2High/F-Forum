# Walkthrough — F-FORUM (From Ideas to Real Projects) 🚀
**Phong cách thiết kế:** macOS Liquid UI x Oriental Cyber-Academic Fusion  
**Mã nguồn dự án:** `C:\Users\lebat\.gemini\antigravity\scratch\f-forum`

---

## 1. Tổng Quan Những Gì Đã Hoàn Thành

Dựa trên toàn bộ báo cáo ý tưởng sản phẩm F-FORUM và phân tích trực tiếp từ Landing Page tiền nhiệm ([f-forum.vercel.app](https://f-forum.vercel.app/)), dự án web hoàn chỉnh đã được xây dựng thành công với đầy đủ các phân hệ front-end:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        macOS MenuBar (Top)                             │
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│   Landing Page (/)          ──▶ Khai phóng ý tưởng, bản chất sản phẩm  │
│   Home (/home)              ──▶ Bàn làm việc, 8 nút Quick Start        │
│   Explore (/explore)        ──▶ Khám phá ý tưởng theo danh mục         │
│   Templates (/templates)    ──▶ 5 mẫu tuyển chọn (CLB, Portfolio...)   │
│   Workspace (/workspace)    ──▶ AI Studio (Omma + Arena panels)        │
│   My Projects (/projects)   ──▶ Quản lý dự án, trạng thái Checks       │
│   Knowledge (/knowledge)    ──▶ Thư viện tri thức có Tags & Verified   │
│   Quick Start (/quick-start)──▶ Bảng hỏi 6 bước sinh Prompt Blueprint  │
│   Profile (/profile)        ──▶ Hồ sơ Maker K20 & Cài đặt hệ thống     │
│                                                                        │
├────────────────────────────────────────────────────────────────────────┤
│                     macOS Fluid Glass Dock (Bottom)                    │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Hệ Thống Design System — macOS Liquid

| Thành phần | Đặc tính kỹ thuật | Minh họa |
|---|---|---|
| **MenuBar** | Cố định đỉnh màn hình (h-10), logo tròn mạ vàng serif **F-Forum**, menu điều hướng, đồng hồ thời gian thực, nút chuyển theme Sáng/Tối, phím tắt ⌘K. | Tích hợp drawer responsive trên di động |
| **Dock** | Nổi giữa đáy màn hình, hiệu ứng kính mờ `glass-dock`, phóng to khi rê chuột (magnification), chấm vàng trạng thái trang, tooltip định danh. | 8 biểu tượng chức năng + hiệu ứng ping rực rỡ |
| **Window** | Khung cửa sổ macOS với bộ 3 nút traffic lights (đỏ / vàng / xanh), thanh tiêu đề mờ, viền kim loại mảnh 1px. | Bao bọc toàn bộ các khối nội dung và editor |
| **SpotlightSearch** | Kích hoạt toàn cục bằng phím tắt `⌘K` hoặc `Ctrl+K`, tìm kiếm thời gian thực phân nhóm: Điều hướng, Templates, Tài nguyên, Dự án. | Hỗ trợ điều hướng bằng phím mũi tên & Enter |
| **Bảng màu** | Nền đen huyền bí `#07090E`, vàng kim hoàng gia `#EAB308` & `#F59E0B`, xanh ngọc bích `#10B981`, hồng neon `#F43F5E`. | Kế thừa nguyên vẹn từ bản cũ kết hợp chuẩn macOS |
| **Typography** | Serif học thuật **Cormorant Garamond** cho tiêu đề & Sans-serif **Inter / SF Pro** cho nội dung. | Phân cấp trực quan, sang trọng, tương phản cao |

---

## 3. Chi Tiết Các Khu Vực Chức Năng

### 3.1. Landing Page (`/`)
- **Hero Section**: Tiêu đề ấn tượng *"Khai phóng ý tưởng, chạm sâu bản chất sản phẩm web"*, ô nhập prompt thử nghiệm tương tác với nút chuyển đổi thiết bị (MacBook Pro vs iPhone 16 Pro).
- **Hành trình 7 bước**: Start ➔ Clarify ➔ Plan ➔ Build ➔ Review ➔ Improve ➔ Export.
- **Templates nổi bật**: Hiển thị thẻ mẫu CLB, Portfolio, Ứng dụng thi trắc nghiệm.
- **Accordion FAQ**: 4 câu hỏi thường gặp về tính miễn phí 0₫, quyền sở hữu mã nguồn và không khóa nền tảng.
- **Footer**: Thông tin bản quyền F-FORUM 2026, 3 cột liên kết và email liên hệ Ban Quản Trị.

### 3.2. Bàn Làm Việc — Home (`/home`)
- **Ô nhập ý tưởng trung tâm**: Nhập prompt tự do bằng tiếng Việt hoặc chọn các từ khóa gợi ý.
- **8 tác vụ Quick Start**:
  1. *Create a landing page* (Tạo Landing Page)
  2. *Create a club website* (Tạo Website CLB Sinh Viên)
  3. *Create a portfolio* (Tạo Portfolio Cá Nhân)
  4. *Create a quiz app* (Tạo Ứng Dụng Thi Trắc Nghiệm CBT)
  5. *Build a multi-page website* (Xây Dựng Website Đa Trang)
  6. *Build a dashboard* (Xây Dựng Bảng Điều Khiển)
  7. *Build a task manager* (Tạo Quản Lý Công Việc)
  8. *Turn design into code* (Chuyển Thiết Kế Sang Code)
- **Cửa sổ Dự Án Gần Đây** và **Mẫu Dự Án Đề Xuất**.

### 3.3. AI Workspace Studio (`/workspace`)
Mô phỏng trải nghiệm kết hợp **Omma** (luồng tạo sản phẩm) và **Arena** (theo dõi thay đổi & kiểm thử):

![Giao diện thực tế AI Workspace Studio](C:/Users/lebat/.gemini/antigravity/brain/5625ea26-c61c-4caa-9ee4-c962e7796c0a/workspace-preview.png)

- **Cột Trái (AI Chat Panel)**: Đối thoại liên tục với AI Agent, các nút prompt gợi ý nhanh, gửi tin nhắn và cập nhật thời gian thực.
- **Cột Phải (Interactive Multi-Panel Window)**:
  - **Live Preview**: Giả lập trình duyệt macOS với địa chỉ `http://localhost:5173`, chuyển đổi giữa chế độ Desktop và Mobile, tương tác đồng hồ đếm ngược tuyển quân trực tiếp!
  - **Mã Nguồn (Code Editor)**: Cây thư mục tệp (`src/components/...`) và trình xem code màu cú pháp.
  - **So Sánh (Diff Inspector)**: Kiểm tra file thêm mới, file sửa, đối chiếu dòng xanh (+) và dòng đỏ (-) cùng tóm tắt từ AI.
  - **Kiểm Tra (Checks Engine)**: 6 tiêu chí rà soát (Biên dịch, Preview Server, Hiển thị di động, Quét secret, Liên kết, Kiểm thử).
  - **Tiến Trình (Progress)**: Dòng thời gian các tác vụ AI thực hiện từ phân tích đến xuất bản.
  - **Xuất Bản (Export Center)**: Nút tải gói mã nguồn ZIP hoàn chỉnh (0₫) và xuất tài liệu `README.md`.

### 3.4. Quick Start Flow (`/quick-start`)
Bảng hỏi 6 bước thông minh giúp người mới không cần biết viết prompt kỹ thuật:
1. Đặt tên dự án
2. Xác định mục tiêu chính
3. Đối tượng người dùng
4. Lựa chọn các khối chức năng (Checklist)
5. Phong cách thẩm mỹ & bảng màu
6. Tóm tắt Prompt Blueprint và chuyển tiếp vào Workspace Studio.

### 3.5. Thư Viện Tri Thức — Source of Knowledge (`/knowledge`)
- Danh mục đa dạng: AI Tools, Prompts, GitHub Repos, Skills & Rules, UI/UX Kits, Tài liệu, Công cụ bảo mật.
- Hệ thống Tags chuẩn hóa và huy hiệu **Đã Kiểm Thử (Verified)**.
- Thao tác lưu tài nguyên hoặc gắn trực tiếp vào Workspace.

### 3.6. Dự Án Của Tôi (`/projects`) & Cài Đặt (`/profile`)
- Danh sách dự án phân loại theo trạng thái (*Ready to Export, Building, Needs Review, Draft*).
- Hồ sơ Maker K20 với các huy hiệu vinh danh kế thừa từ tinh thần F-Forum cũ.
- Tùy chọn giao diện macOS Sáng / Tối chuyển đổi tức thì.

---

## 4. Kiểm Thử & Xác Minh (Verification Results)

1. **Kiểm tra biên dịch sản phẩm**:
   - Chạy lệnh `npm run build` ➔ Hoàn tất trong **10.79s** với **0 lỗi, 0 cảnh báo**.
   - Gói bundle được tối ưu nén Gzip (`index.html`, CSS, JS).
2. **Kiểm tra máy chủ phát triển**:
   - `npm run dev` khởi động thành công tại `http://127.0.0.1:5173/`.
3. **Kiểm tra tính tương thích Responsive**:
   - Hoạt động mượt mà trên Desktop (1440px), Tablet (768px) và Mobile (375px).

---

## 5. Hướng Dẫn Trải Nghiệm Trực Tiếp

Bạn có thể mở trình duyệt trên máy tính và trải nghiệm ngay:
1. Truy cập: **`http://127.0.0.1:5173/`**
2. Thử nghiệm các phím tắt và thao tác:
   - Nhấn `Cmd + K` hoặc `Ctrl + K` để mở **Spotlight Search**.
   - Bấm vào biểu tượng **AI Workspace Studio** (icon chip phát sáng ở Dock) để trải nghiệm phòng làm việc tạo web.
   - Thử chuyển đổi chế độ xem Desktop / Mobile trên thanh trình duyệt giả lập.
   - Bấm vào biểu tượng Mặt Trời / Mặt Trăng trên MenuBar để chuyển đổi giao diện Sáng / Tối.
