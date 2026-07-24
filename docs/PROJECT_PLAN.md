# 📋 PROJECT_PLAN.md — Kế Hoạch Dự Án & Quyết Định Kỹ Thuật

Trang web thương mại điện tử **Green Atelier** (Matcha Mộc Châu Chế Tác Thủ Công) được xây dựng với mục tiêu mang lại trải nghiệm mua sắm đẳng cấp, tốc độ truy cập nhanh và hệ thống quản trị hiệu quả.

---

## 🛠 1. Tech Stack Quản Lý Dự Án

* **Frontend Framework**: Next.js 16 (App Router, JavaScript ES6+ / JSX).
* **Styling**: Vanilla CSS Variables, Google Fonts (`Fraunces` & `Manrope`), Responsive Layout (Flexbox & Grid).
* **Database & ODM**: MongoDB Atlas + Mongoose 8.
* **Authentication**: JWT Cookie / Auth.js (NextAuth) với phân quyền Role (`customer` & `admin`).
* **State Management**: Zustand (Giỏ hàng tự động lưu `localStorage`).
* **DevOps & Hosting**: Vercel Serverless Functions + MongoDB Atlas Cloud.

---

## 🚀 2. Backlog 4 Giai Đoạn (4-Phase Backlog)

### 📌 Phase 1: Hoàn thiện Giao diện & Chuyển đổi Next.js App Router (✅ Complete)
- **P1-1**: Khởi tạo Next.js App Router, nhúng CSS Tokens & Google Fonts.
- **P1-2**: Xây dựng 13 trang Storefront Khách hàng (`/`, `/shop`, `/product/[id]`, `/cart`, `/checkout`, `/login`, `/register`, `/account`, `/blog`, `/blog/[id]`, `/about`, `/contact`, `/finder`).
- **P1-3**: Xây dựng 7 trang Admin Portal (`/admin/login`, `/admin/dashboard`, `/admin/products`, `/admin/categories`, `/admin/orders`, `/admin/customers`, `/admin/blogs`).
- **P1-4**: Kiểm thử compilation 0 lỗi với `npm run build`.

### 📌 Phase 2: Kết nối Database MongoDB & Mongoose Schemas (In Progress)
- **P2-1**: Cấu hình helper kết nối MongoDB `lib/mongodb.js` (Caching Connection).
- **P2-2**: Xây dựng Mongoose Schema `User` (Hashed password với bcrypt, role).
- **P2-3**: Xây dựng Mongoose Schema `Product` (Slug, tag, price, stock, category).
- **P2-4**: Xây dựng Mongoose Schema `Category` (Name, slug, count).
- **P2-5**: Xây dựng Mongoose Schema `Order` (OrderNumber, items, customerInfo, shippingAddress, status).
- **P2-6**: Xây dựng Mongoose Schema `Blog` (Title, slug, content, author, status).
- **P2-7**: Viết Seed Data Script khởi tạo dữ liệu mẫu ban đầu vào MongoDB.

### 📌 Phase 3: Phát triển Chức năng Khách Hàng (Customer Features)
- **P3-1**: Authentication API (`/api/auth/register`, `/api/auth/login`, `/api/auth/me`).
- **P3-2**: Store Giỏ hàng Zustand (Add to cart, Update qty, Remove item, Sync LocalStorage).
- **P3-3**: API Filter/Search/Sort Sản phẩm real-time từ Database.
- **P3-4**: Trò chơi Matcha Finder Quiz gợi ý sản phẩm động theo mục tiêu sức khỏe.
- **P3-5**: API Đặt hàng (`/api/orders/create`), tự động trừ tồn kho (Stock decrement) & gửi thông báo thành công.
- **P3-6**: Trang quản lý tài khoản & Lịch sử đơn hàng cá nhân.

### 📌 Phase 4: Phát triển Trang Quản Trị Admin Portal (Admin CRUD)
- **P4-1**: Middleware bảo mật route `/admin/*` (Strict Admin Role Check).
- **P4-2**: Admin Dashboard APIs thống kê Tổng doanh thu, Đơn hàng, Khách hàng & Sản phẩm.
- **P4-3**: Admin Product CRUD APIs (Thêm mới, sửa giá/tồn kho, chuyển trạng thái, xóa).
- **P4-4**: Admin Category CRUD APIs.
- **P4-5**: Admin Order Management APIs (Cập nhật trạng thái Chờ xác nhận ➔ Đã giao / Đã hủy).
- **P4-6**: Admin Customer List API.
- **P4-7**: Admin Blog CRUD APIs.

---

## ⚠️ 3. Rủi Ro Kỹ Thuật (Technical Risks) & Biện Pháp Giảm Thường

| STT | Rủi ro kỹ thuật | Mức độ | Biện pháp khắc phục (Mitigation) |
| :--- | :--- | :--- | :--- |
| **1** | Over-selling (Bán quá số lượng tồn kho khi nhiều người cùng đặt hàng) | **Cao** | Sử dụng Mongoose Atomic Operations (`$inc: { stock: -qty }`) kèm kiểm tra ràng buộc `stock >= qty`. |
| **2** | Rò rỉ thông tin hoặc truy cập trái phép trang Admin | **Rất Cao** | Áp dụng Next.js Middleware xác thực JWT token và phân quyền Role `admin` trước khi render route `/admin/*`. |
| **3** | Mất kết nối MongoDB Connection Leak trong Serverless | **Trung bình** | Sử dụng cơ chế Singleton Mongoose Client Connection Caching trong `lib/mongodb.js`. |
| **4** | Tải ảnh sản phẩm chậm trên Mobile | **Thấp** | Tối ưu hóa bằng Next.js `<Image>` component với hỗ trợ WebP/AVIF tự động. |

---

## ✅ 4. Định Nghĩa Hoàn Thành (Definition of Done - DoD)

Một công việc/Backlog Item được coi là **DONE** khi đáp ứng đủ các tiêu chí:
1. **Requirements (BA)**: Đáp ứng đầy đủ các Acceptance Criteria (AC) trong tài liệu `docs/REQUIREMENTS.md`.
2. **Architecture (SA)**: Đúng cấu trúc RESTful API Spec & DB Schema trong `docs/ARCHITECTURE.md`.
3. **UI/UX (Designer)**: Chuẩn mực màu sắc, typography và responsive không bể layout.
4. **Code Quality (Dev)**: Mã nguồn Next.js sạch, không sử dụng `any`, chạy `npm run build` thành công với 0 lỗi.
5. **Testing (Tester)**: Pass 100% Test cases trong `docs/TEST_PLAN.md` và có xác nhận Sign-off.
