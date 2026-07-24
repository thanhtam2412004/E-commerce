import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * Cart item shape:
 * {
 *   id: string,         // product _id từ MongoDB (hoặc mockData id)
 *   name: string,
 *   cat: string,
 *   price: number,      // rawPrice (số nguyên, VND)
 *   grad: string,
 *   qty: number,
 *   stock: number,      // tồn kho tại thời điểm thêm vào
 * }
 */

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],

      // ── Thêm sản phẩm vào giỏ ────────────────────────────────────────────
      addItem: (product, qty = 1) => {
        const { items } = get();
        const existing = items.find((i) => i.id === product.id);

        if (existing) {
          // Tăng số lượng, không vượt quá tồn kho
          const newQty = Math.min(existing.qty + qty, product.stock ?? 99);
          set({
            items: items.map((i) =>
              i.id === product.id ? { ...i, qty: newQty } : i
            ),
          });
        } else {
          set({
            items: [
              ...items,
              {
                id: product.id,
                name: product.name,
                cat: product.cat,
                price: product.rawPrice ?? product.price,
                grad: product.grad,
                qty: Math.min(qty, product.stock ?? 99),
                stock: product.stock ?? 99,
              },
            ],
          });
        }
      },

      // ── Cập nhật số lượng (delta: +1 | -1) ───────────────────────────────
      updateQty: (id, delta) => {
        const { items } = get();
        set({
          items: items.map((i) => {
            if (i.id !== id) return i;
            const newQty = Math.max(1, Math.min(i.qty + delta, i.stock ?? 99));
            return { ...i, qty: newQty };
          }),
        });
      },

      // ── Xóa 1 sản phẩm ───────────────────────────────────────────────────
      removeItem: (id) => {
        set({ items: get().items.filter((i) => i.id !== id) });
      },

      // ── Xóa toàn bộ giỏ (sau khi đặt hàng) ──────────────────────────────
      clearCart: () => set({ items: [] }),

      // ── Computed helpers ──────────────────────────────────────────────────
      get totalQty() {
        return get().items.reduce((sum, i) => sum + i.qty, 0);
      },
      get subtotal() {
        return get().items.reduce((sum, i) => sum + i.price * i.qty, 0);
      },
    }),
    {
      name: 'ga_cart',          // key trong localStorage
      skipHydration: false,
    }
  )
);

export default useCartStore;
