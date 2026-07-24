# 📊 BACKLOG_TRACKING.md — Bảng Theo Dõi Tiến Độ Master Backlog

File này được quản lý bởi **Agent PM (`/pm-agent`)** để truy vết tiến độ hoàn thành của tất cả 24 Backlog Items trong 4 Phase của dự án **Green Atelier**.

---

## 📌 Bảng Tổng Quan Tiến Độ (Master Tracking Matrix)

| Mã Task | Tên Hạng Mục Công Việc | Phase | Độ Ưu Tiên | Agent Phụ Trách | Trạng Thái | DoD Checklist |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **P1-1** | Khởi tạo Next.js App Router, CSS Tokens, Fonts | Phase 1 | P0 - Critical | Dev, Designer | `[x]` DONE | Pass Build & Design system |
| **P1-2** | Xây dựng 13 trang Storefront UI | Phase 1 | P0 - Critical | Dev, Designer | `[x]` DONE | Pass Build 13 pages |
| **P1-3** | Xây dựng 7 trang Admin Portal UI | Phase 1 | P0 - Critical | Dev, Designer | `[x]` DONE | Pass Build 7 admin pages |
| **P1-4** | Kiểm thử Build Next.js Static & Dynamic | Phase 1 | P0 - Critical | Test | `[x]` DONE | `npm run build` 0 Errors |
| **P2-1** | Helper kết nối MongoDB (`lib/mongodb.js`) | Phase 2 | P0 - Critical | SA, Dev | `[x]` DONE ✅ | Caching Singleton connection |
| **P2-2** | Mongoose Schema `User` (Bcrypt, Role) | Phase 2 | P0 - Critical | SA, Dev | `[x]` DONE ✅ | Validated Schema & Hashing |
| **P2-3** | Mongoose Schema `Product` | Phase 2 | P0 - Critical | SA, Dev | `[x]` DONE ✅ | Validated Schema & Indexes |
| **P2-4** | Mongoose Schema `Category` | Phase 2 | P1 - High | SA, Dev | `[x]` DONE ✅ | Validated Schema & Slugs |
| **P2-5** | Mongoose Schema `Order` | Phase 2 | P0 - Critical | SA, Dev | `[x]` DONE ✅ | Validated Schema & Statuses |
| **P2-6** | Mongoose Schema `Blog` | Phase 2 | P2 - Medium | SA, Dev | `[x]` DONE ✅ | Validated Schema |
| **P2-7** | Script Seeding dữ liệu mẫu vào MongoDB | Phase 2 | P1 - High | Dev, Test | `[x]` DONE ✅ | Seeded 8 products & blogs |
| **P3-1** | Authentication API (`/api/auth/*`) | Phase 3 | P0 - Critical | BA, SA, Dev, Test | `[ ]` TODO | Auth pass & Cookie set |
| **P3-2** | Store Giỏ hàng Zustand & LocalStorage | Phase 3 | P0 - Critical | Designer, Dev | `[ ]` TODO | State sync & Cart persistent |
| **P3-3** | API Filter/Search/Sort Sản phẩm real-time | Phase 3 | P1 - High | SA, Dev, Test | `[ ]` TODO | Dynamic DB Query |
| **P3-4** | Matcha Finder Quiz gợi ý sản phẩm | Phase 3 | P2 - Medium | BA, Dev | `[ ]` TODO | Quiz recommendation logic |
| **P3-5** | API Đặt hàng (`/api/orders/create`) & Trừ kho | Phase 3 | P0 - Critical | BA, SA, Dev, Test | `[ ]` TODO | Atomic decrement & Stock check |
| **P3-6** | Account Portal & Lịch sử Đơn hàng | Phase 3 | P1 - High | BA, Dev, Test | `[ ]` TODO | Customer Order history API |
| **P4-1** | Middleware bảo mật Route `/admin/*` | Phase 4 | P0 - Critical | SA, Dev, Test | `[ ]` TODO | Unauthenticated redirect |
| **P4-2** | Admin Dashboard Analytics APIs | Phase 4 | P1 - High | SA, Dev | `[ ]` TODO | Revenue & Orders summary |
| **P4-3** | Admin Product CRUD APIs | Phase 4 | P0 - Critical | SA, Dev, Test | `[ ]` TODO | Full Create/Edit/Delete API |
| **P4-4** | Admin Category CRUD APIs | Phase 4 | P1 - High | SA, Dev | `[ ]` TODO | Full Category CRUD API |
| **P4-5** | Admin Order Management APIs | Phase 4 | P0 - Critical | SA, Dev, Test | `[ ]` TODO | Order status transition API |
| **P4-6** | Admin Customer List API | Phase 4 | P2 - Medium | SA, Dev | `[ ]` TODO | Customer list & stats API |
| **P4-7** | Admin Blog CRUD APIs | Phase 4 | P2 - Medium | SA, Dev | `[ ]` TODO | Full Blog CRUD API |

---

## 📈 Tóm Tắt Trạng Thái Tiến Độ
- **Tổng số Task**: 24 Task
- **Đã hoàn thành (DONE)**: 11/24 (45.8%) — Phase 1 ✅ + Phase 2 ✅ complete.
- **Đang thực hiện (IN PROGRESS)**: 0/24.
- **Chưa thực hiện (TODO)**: 13/24 (Phase 3 & Phase 4).
