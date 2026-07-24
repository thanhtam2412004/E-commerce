# 🏗 ARCHITECTURE.md — Kiến Trúc Hệ Thống & Specifications (Sprint 2)

Tài liệu này được soạn thảo bởi **Agent SA (`/sa-agent`)** chuyển giao từ `docs/REQUIREMENTS.md`.

---

## 📐 1. Diagram Kiến Trúc Cơ Sở Dữ Liệu (Mongoose ERD)

```mermaid
erDiagram
    USER ||--o{ ORDER : "places"
    CATEGORY ||--o{ PRODUCT : "belongs to"
    PRODUCT ||--o{ ORDER_ITEM : "contains"
    ORDER ||--|{ ORDER_ITEM : "includes"
    
    USER {
        ObjectId _id PK
        string name
        string email UK
        string password
        string role "customer | admin"
        string phone
        string avatar
        date createdAt
    }

    PRODUCT {
        ObjectId _id PK
        string name
        string slug UK
        string tag "Focus | Energy | Calm | Beauty | Immunity"
        string cat
        string desc
        number price
        number rawPrice
        number stock
        string grad
        boolean isFeatured
    }

    CATEGORY {
        ObjectId _id PK
        string name UK
        string slug UK
        string desc
        number count
    }

    ORDER {
        ObjectId _id PK
        string orderNumber UK
        string customerName
        string customerEmail
        string customerPhone
        string shippingAddress
        number total
        string paymentMethod "cod | bank"
        string status "pending | confirmed | shipping | done | cancelled"
        date createdAt
    }

    BLOG {
        ObjectId _id PK
        string title
        string slug UK
        string desc
        string content
        string date
        string grad
        string status "published | draft"
    }
```

---

## 🛠 2. Chi Tiết File Structure & Model Specs

### 🔹 Helper Connection: `lib/mongodb.js`
- **Cấu trúc**: Singleton promise caching kết nối `mongoose.connect()`.
- **URI**: `process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/green_atelier"`.

### 🔹 Models (`/models/`):
1. `models/User.js`: Schema với `mongoose.models.User || mongoose.model('User', UserSchema)`.
2. `models/Product.js`: Schema `ProductSchema` kèm index `{ slug: 1 }` và `{ tag: 1 }`.
3. `models/Category.js`: Schema `CategorySchema`.
4. `models/Order.js`: Schema `OrderSchema`.
5. `models/Blog.js`: Schema `BlogSchema`.

---

## ⚡ 3. API Route Specifications (`/api/seed`)

* **Endpoint**: `POST /api/seed` hoặc `GET /api/seed`
* **Mục đích**: Seed dữ liệu mẫu vào MongoDB.
* **Response Payload**:
```json
{
  "success": true,
  "message": "Seeded database successfully!",
  "counts": {
    "users": 1,
    "categories": 5,
    "products": 8,
    "blogs": 6
  }
}
```
