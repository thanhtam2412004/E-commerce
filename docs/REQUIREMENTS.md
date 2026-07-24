# 📝 REQUIREMENTS.md — Yêu Cầu Nghiệp Vụ & Acceptance Criteria (Sprint 2)

Tài liệu này được biên soạn bởi **Agent BA (`/ba-agent`)** dựa trên kế hoạch từ `docs/SPRINT_PLAN.md`.

---

## 📌 User Stories & Acceptance Criteria (P2-1 đến P2-7)

### 🔹 Task P2-1: Helper Kết Nối MongoDB Caching (`lib/mongodb.js`)
* **User Story**: As a Developer, I want a reusable MongoDB client connection helper, so that serverless API calls do not open duplicate connections or leak pool limits.
* **Acceptance Criteria (AC)**:
  - [ ] AC2.1.1: Trả về một Mongoose Promise connection duy nhất (Singleton pattern).
  - [ ] AC2.1.2: Sử dụng biến môi trường `MONGODB_URI` từ `.env.local` hoặc fallback string kết nối MongoDB local.
  - [ ] AC2.1.3: Cache connection promise trong `global.mongoose` ở chế độ Development.

---

### 🔹 Task P2-2: Mongoose Schema `User`
* **User Story**: As an Admin/Customer, I want a User model storing credentials and roles, so that authentication and authorization can be enforced.
* **Acceptance Criteria (AC)**:
  - [ ] AC2.2.1: Các trường bắt buộc: `name` (String), `email` (String, Unique, Lowercase), `password` (String, Hashed), `role` (Enum: `'customer'`, `'admin'`, mặc định `'customer'`), `phone` (String), `avatar` (String).
  - [ ] AC2.2.2: Tự động gắn mốc thời gian `createdAt` và `updatedAt` (Timestamps).

---

### 🔹 Task P2-3: Mongoose Schema `Product`
* **User Story**: As a Customer, I want products to be structured with prices, tags, categories, and inventory stock, so that I can filter, view, and purchase them.
* **Acceptance Criteria (AC)**:
  - [ ] AC2.3.1: Các trường bắt buộc: `name` (String), `slug` (String, Unique), `tag` (Enum: `'Focus'`, `'Energy'`, `'Calm'`, `'Beauty'`, `'Immunity'`), `category` (ObjectId ref `Category` hoặc String), `desc` (String), `price` (Number), `rawPrice` (Number), `stock` (Number, Min 0), `grad` (String CSS gradient), `images` ([String]), `isFeatured` (Boolean).
  - [ ] AC2.3.2: Tạo Index trên trường `slug` và `tag` để truy vấn nhanh.

---

### 🔹 Task P2-4: Mongoose Schema `Category`
* **User Story**: As a Store Manager, I want categories to organize products by wellness goals, so that customers can navigate easily.
* **Acceptance Criteria (AC)**:
  - [ ] AC2.4.1: Các trường: `name` (String, Unique), `slug` (String, Unique), `desc` (String), `count` (Number, Mặc định 0).

---

### 🔹 Task P2-5: Mongoose Schema `Order`
* **User Story**: As a Customer and Admin, I want orders to capture items, total amount, shipping info, and payment/delivery status, so that orders can be fulfilled reliably.
* **Acceptance Criteria (AC)**:
  - [ ] AC2.5.1: Các trường: `orderNumber` (String, Unique, format `#GA-xxxx`), `customer` (ObjectId ref `User` hoặc String), `customerInfo` (Object: name, phone, email, address, note), `items` (Array objects: productId, name, price, qty, grad), `subtotal` (Number), `shipping` (Number), `total` (Number), `paymentMethod` (Enum: `'cod'`, `'bank'`), `status` (Enum: `'pending'`, `'confirmed'`, `'shipping'`, `'done'`, `'cancelled'`).

---

### 🔹 Task P2-6: Mongoose Schema `Blog`
* **User Story**: As a Marketing Editor, I want a Blog model to publish tea stories and wellness tips, so that customers stay engaged.
* **Acceptance Criteria (AC)**:
  - [ ] AC2.6.1: Các trường: `title` (String), `slug` (String, Unique), `desc` (String), `content` (String), `date` (String), `grad` (String), `author` (String, Mặc định `'Green Atelier Editorial'`), `status` (Enum: `'published'`, `'draft'`).

---

### 🔹 Task P2-7: Script Seeding Dữ Liệu Mẫu (`lib/seedData.js` / Route `/api/seed`)
* **User Story**: As a Developer/Tester, I want an automated seeding script to populate initial mock data into MongoDB, so that the store is immediately functional.
* **Acceptance Criteria (AC)**:
  - [ ] AC2.7.1: Xóa sạch hoặc kiểm tra trùng lặp trước khi chèn dữ liệu mẫu.
  - [ ] AC2.7.2: Chèn thành công 8 sản phẩm mẫu, 5 danh mục, 6 bài viết blog và 1 tài khoản Admin mặc định (`admin@greenatelier.vn`).
  - [ ] AC2.7.3: Trả về phản hồi JSON báo cáo số bản ghi đã chèn.
