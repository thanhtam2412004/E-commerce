'use client';
import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function CartPage() {
  const [items, setItems] = useState([
    { id: '1', name: 'Matcha Mộc Châu Cổ Điển', cat: 'Ceremonial Grade', price: 285000, qty: 1, grad: 'linear-gradient(150deg,#DCE6C8,#B9C9A6)' },
    { id: '2', name: 'Matcha Genki Boost', cat: 'Đặc tuyển', price: 320000, qty: 2, grad: 'linear-gradient(150deg,#F3E3C2,#D9AE6C)' },
  ]);

  const updateQty = (id, delta) => {
    setItems(items.map(item => item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item));
  };

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shipping = subtotal > 0 ? 30000 : 0;
  const total = subtotal + shipping;

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
                <h1>Giỏ hàng của bạn ({items.length})</h1>
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
                          <span style={{ fontSize: '13.5px', color: 'var(--matcha)', fontWeight: 700 }}>{item.price.toLocaleString('vi-VN')}₫</span>
                        </div>
                        <div className="qty-selector">
                          <button onClick={() => updateQty(item.id, -1)}>-</button>
                          <input type="text" value={item.qty} readOnly />
                          <button onClick={() => updateQty(item.id, 1)}>+</button>
                        </div>
                        <div style={{ fontFamily: 'Fraunces, serif', fontWeight: 600, fontSize: '16px' }}>
                          {(item.price * item.qty).toLocaleString('vi-VN')}₫
                        </div>
                        <button className="remove-x" onClick={() => removeItem(item.id)}>✕</button>
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
                  <Link href="/checkout" className="btn btn-primary btn-block" style={{ marginTop: '20px' }}>
                    Tiến hành thanh toán →
                  </Link>
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
