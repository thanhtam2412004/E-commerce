'use client';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import useCartStore from '@/store/cartStore';

const SHIPPING_FEE = 30000;

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const updateQty = useCartStore((s) => s.updateQty);
  const removeItem = useCartStore((s) => s.removeItem);

  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const shipping = subtotal > 0 ? SHIPPING_FEE : 0;
  const total = subtotal + shipping;
  const totalQty = items.reduce((sum, i) => sum + i.qty, 0);

  return (
    <>
      <Header />
      <main>
        <section className="page active">
          <section className="inner">
            <div className="wrap">
              <div className="breadcrumb">
                <Link href="/">Trang chủ</Link>
                <span className="sep">/</span>
                <span className="cur">Giỏ hàng</span>
              </div>
              <div className="page-head">
                <h1>Giỏ hàng của bạn ({totalQty})</h1>
              </div>

              <div className="cart-layout">
                <div>
                  {items.length === 0 ? (
                    <div style={{ background: '#fff', padding: '40px', borderRadius: '18px', textAlign: 'center', border: '1px solid var(--line)' }}>
                      <p style={{ marginBottom: '16px', color: '#5b6b57' }}>Giỏ hàng của bạn đang trống.</p>
                      <Link href="/shop" className="btn btn-primary">Khám phá sản phẩm</Link>
                    </div>
                  ) : (
                    items.map((item) => (
                      <div key={item.id} className="cart-item">
                        <div className="thumb" style={{ background: item.grad }}></div>
                        <div>
                          <span className="cat-label">{item.cat}</span>
                          <h4>{item.name}</h4>
                          <span style={{ fontSize: '13.5px', color: 'var(--matcha)', fontWeight: 700 }}>
                            {item.price.toLocaleString('vi-VN')}₫
                          </span>
                        </div>
                        <div className="qty-selector">
                          <button onClick={() => updateQty(item.id, -1)}>-</button>
                          <input type="text" value={item.qty} readOnly />
                          <button onClick={() => updateQty(item.id, 1)}>+</button>
                        </div>
                        <div style={{ fontFamily: 'var(--font-serif)', fontWeight: 600, fontSize: '16px' }}>
                          {(item.price * item.qty).toLocaleString('vi-VN')}₫
                        </div>
                        <button className="remove-x" onClick={() => removeItem(item.id)} aria-label="Xóa sản phẩm">
                          ✕
                        </button>
                      </div>
                    ))
                  )}
                </div>

                <div className="summary-card">
                  <h3 style={{ fontSize: '18px', marginBottom: '16px' }}>Tóm tắt đơn hàng</h3>
                  <div className="summary-row">
                    <span>Tạm tính</span>
                    <span>{subtotal.toLocaleString('vi-VN')}₫</span>
                  </div>
                  <div className="summary-row">
                    <span>Phí vận chuyển</span>
                    <span>{shipping === 0 ? 'Miễn phí' : `${shipping.toLocaleString('vi-VN')}₫`}</span>
                  </div>
                  <div className="promo-row">
                    <input type="text" placeholder="Mã giảm giá" />
                    <button className="btn btn-outline btn-sm">Áp dụng</button>
                  </div>
                  <div className="summary-row total">
                    <span>Tổng cộng</span>
                    <span>{total.toLocaleString('vi-VN')}₫</span>
                  </div>
                  {items.length > 0 ? (
                    <Link href="/checkout" className="btn btn-primary btn-block" style={{ marginTop: '20px' }}>
                      Tiến hành thanh toán →
                    </Link>
                  ) : (
                    <button className="btn btn-primary btn-block" disabled style={{ marginTop: '20px', opacity: 0.5 }}>
                      Tiến hành thanh toán →
                    </button>
                  )}
                </div>
              </div>
            </div>
          </section>
        </section>
      </main>
      <Footer />
    </>
  );
}
