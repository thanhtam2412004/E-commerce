# 🎨 DESIGN_SYSTEM.md — Chuẩn Mực Thiết Kế UI/UX (Sprint 2)

Tài liệu này được biên soạn bởi **Agent Designer (`/designer-agent`)**.

---

## 🎨 1. Palette Màu Sắc & Tokens (Design Tokens)

```css
:root {
  --forest: #26402A;      /* Màu xanh đậm rừng núi - Thương hiệu chính */
  --forest-2: #1e3321;    /* Background Admin */
  --matcha: #6B8E4E;      /* Màu xanh matcha tươi */
  --sage: #A8B896;        /* Màu xám lá xô thơm */
  --gold: #B98B3E;        /* Màu vàng kim thủ công */
  --gold-light: #D9AE6C;  /* Màu vàng nhạt viền bọt trà */
  --cream: #F7F6F0;       /* Màu nền giấy tráng kem */
  --white: #FFFFFF;
  --line: #E2E6D8;        /* Viền kẻ mảnh */
}
```

---

## 🔤 2. Typography & Hierarchy
- **Header / Titles**: `Fraunces`, Georgia, serif (Thơ mộng, sang trọng).
- **Body / Controls**: `Manrope`, system-ui, sans-serif (Hiện đại, dễ đọc).

---

## 📱 3. Quy Định UI States Cho Database & Form Validation
1. **Loading Skeletons**: Sử dụng hiệu ứng shimmer nhẹ (`background: linear-gradient(...)`) khi fetching dữ liệu sản phẩm/bài viết từ MongoDB.
2. **Error Toast Notifications**:
   - Viền đỏ nhẹ `#E0AEB6`, background `#FDF4F5`, chữ `#8B263E`.
   - Hiển thị khi kết nối DB lỗi hoặc sai tài khoản/mật khẩu.
3. **Empty States**:
   - Icon nét mảnh 40px kèm thông điệp thân thiện: *"Chưa có dữ liệu sản phẩm trong cơ sở dữ liệu"*.

---

## ♿ 4. Accessibility (a11y)
- Tất cả các thẻ `<input>`, `<select>` phải có `<label>` hoặc `aria-label` tương ứng.
- Tỷ lệ tương phản chữ (Color contrast ratio) đạt chuẩn WCAG AA (>= 4.5:1).
