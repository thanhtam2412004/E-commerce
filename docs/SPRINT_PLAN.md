# 🚀 SPRINT_PLAN.md — Kế Hoạch Sprint 2 (Phase 2: Database & Schemas)

File này được phát hành bởi **Agent PM (`/pm-agent`)** để lập phạm vi công việc cho Sprint 2.

---

## 🎯 1. Mục Tiêu Sprint 2 (Sprint Goal)
Thiết lập cơ sở dữ liệu MongoDB Atlas, xây dựng toàn bộ Mongoose Schemas (`User`, `Product`, `Category`, `Order`, `Blog`), cấu hình helper Singleton Connection và khởi tạo dữ liệu mẫu (Seed Data) chuẩn bị cho việc viết API ở Phase 3.

---

## 📌 2. Danh Sách Task Thuộc Sprint 2

| Task ID | Tên Hạng Mục | Ưu Tiên | Phân Công Agent | Sản Phẩm Kỳ Vọng (Deliverable) |
| :--- | :--- | :--- | :--- | :--- |
| **P2-1** | Cấu hình helper connection `lib/mongodb.js` | P0 - Critical | SA, Dev | File `lib/mongodb.js` caching connection |
| **P2-2** | Mongoose Schema `User` | P0 - Critical | BA, SA, Dev | Model `models/User.js` (bcrypt, roles) |
| **P2-3** | Mongoose Schema `Product` | P0 - Critical | BA, SA, Dev | Model `models/Product.js` (slug, price, stock) |
| **P2-4** | Mongoose Schema `Category` | P1 - High | BA, SA, Dev | Model `models/Category.js` |
| **P2-5** | Mongoose Schema `Order` | P0 - Critical | BA, SA, Dev | Model `models/Order.js` (order items, status) |
| **P2-6** | Mongoose Schema `Blog` | P2 - Medium | BA, SA, Dev | Model `models/Blog.js` |
| **P2-7** | Script Seed Data vào MongoDB | P1 - High | Dev, Test | Script `scripts/seed.js` hoặc API `/api/seed` |

---

## 📋 3. Tiêu Chí Hoàn Thành Sprint (Sprint Definition of Done)
1. Tất cả 5 Mongoose Models (`User`, `Product`, `Category`, `Order`, `Blog`) được tạo và validate thành công.
2. Helper `lib/mongodb.js` hoạt động tốt không gây rò rỉ connection trong môi trường Serverless.
3. Chạy lệnh seed data nạp thành công ít nhất 8 sản phẩm, 5 danh mục, 6 bài viết blog vào cơ sở dữ liệu.
4. Chạy `npm run build` không phát sinh lỗi compile.

---

## 🔄 4. Chỉ Đạo Bàn Giao Cho Agent Tiếp Theo (Handover to BA Agent)
- **Agent tiếp nhận**: `ba-agent` (`.kiro/agents/ba-agent.md`)
- **Yêu cầu công việc**: Đọc `docs/SPRINT_PLAN.md` này và viết tài liệu `docs/REQUIREMENTS.md` quy định User Story và Acceptance Criteria chi tiết cho từng Task từ P2-1 đến P2-7.
