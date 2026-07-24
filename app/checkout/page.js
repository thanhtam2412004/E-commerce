'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import useCartStore from '@/store/cartStore';

const SHIPPING_FEE = 30000;

export default function CheckoutPage() {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart);
  const [payMethod, setPayMethod] = useState('cod');

  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const shipping = subtotal > 0 ? SHIPPING_FEE : 0;
  const total = subtotal + shipping;

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    // P3-5 sẽ gọi /api/orders/create thật — tạm thời clear cart và redirect
    clearCart();
    router.push('/account');
  };

  if (items.length === 0) {
    return (
      <>
        <Header />
        <main>
          <section className="page active">
            <section className="inner">
              <div className="wrap" style={{ textAlign: 'center', padding: '60px 0' }}>
                <p style={{ marginBottom: '20px', color: '#5b6b57' }}>Giỏ hàng trống, không thể thanh toán.</p>
                <Link href="/shop" className="btn btn-primary">Khám phá sản phẩm</Link>
              </div>
            </section>
          </section>
        </main>
        <Footer />
      </>
    );
  }

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
                <Link href="/cart">Giỏ hàng</Link>
                <span className="sep">/</span>
                <span className="cur">Thanh toán</span>
              </div>

              <div className="steps-row">
                <div className="step-chip done"><b>✓</b> Giỏ hàng</div>
                <div className="step-chip done"><b>2</b> Thông tin giao hàng</div>
                <div className="step-chip"><b>3</b> Hoàn tất</div>
              </div>

              <form onSubmit={handleSubmitOrder} className="checkout-layout">
                <div>
                  <h3 style={{ fontSize: '20px', marginBottom: '20px' }}>Thông tin người nhận</h3>
                  <div className="field">
                    <label>Họ và tên *</label>
                    <input type="text" required placeholder="Nguyễn Văn A" />
                  </div>
                  <div className="field-row">
                    <div className="field">
                      <label>Số điện thoại *</label>
                      <input type="tel" required placeholder="0901 234 567" />
                    </div>
                    <div className="field">
                      <label>Email *</label>
                      <input type="email" required placeholder="bạn@email.com" />
                    </div>
                  </div>
                  <div className="field">
                    <label>Địa chỉ nhận hàng *</label>
                    <input type="text" required placeholder="Số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành phố" />
                  </div>
                  <div className="field">
                    <label>Ghi chú đơn hàng (không bắt buộc)</label>
                    <textarea rows="3" placeholder="Ghi chú về thời gian giao hàng hoặc chỉ dẫn địa điểm..."></textarea>
                  </div>

                  <h3 style={{ fontSize: '20px', margin: '30px 0 16px' }}>Phương thức thanh toán</h3>

                  <div className={`pay-option ${payMethod === 'cod' ? 'active' : ''}`} onClick={() => setPayMethod('cod')}>
                    <input type="radio" name="pay" readOnly checked={payMethod === 'cod'} />
                    <div>
                      <h5>Thanh toán khi nhận hàng (COD)</h5>
                      <p>Thanh toán bằng tiền mặt trực tiếp cho shipper khi nhận được hàng.</p>
                    </div>
                  </div>

                  <div className={`pay-option ${payMethod === 'bank' ? 'active' : ''}`} onClick={() => setPayMethod('bank')}>
                    <input type="radio" name="pay" readOnly checked={payMethod === 'bank'} />
                    <div>
                      <h5>Chuyển khoản Ngân hàng (QR Code)</h5>
                      <p>Chuyển khoản qua VietQR tự động xác nhận đơn hàng trong 1 phút.</p>
                    </div>
                  </div>
                </div>

                <div className="summary-card">
                  <h3 style={{ fontSize: '18px', marginBottom: '16px' }}>Đơn hàng của bạn</h3>
                  {items.map((item) => (
                    <div key={item.id} className="mini-item">
                      <span>{item.name} x {item.qty}</span>
                      <b>{(item.price * item.qty).toLocaleString('vi-VN')}₫</b>
                    </div>
                  ))}
                  <div className="filter-divider"></div>
                  <div className="summary-row">
                    <span>Tạm tính</span>
                    <span>{subtotal.toLocaleString('vi-VN')}₫</span>
                  </div>
                  <div className="summary-row">
                    <span>Phí vận chuyển</span>
                    <span>{shipping.toLocaleString('vi-VN')}₫</span>
                  </div>
                  <div className="summary-row total">
                    <span>Tổng cộng</span>
                    <span>{total.toLocaleString('vi-VN')}₫</span>
                  </div>
                  <button type="submit" className="btn btn-primary btn-block" style={{ marginTop: '20px' }}>
                    Xác nhận đặt hàng →
                  </button>
                </div>
              </form>
            </div>
          </section>
        </section>
      </main>
      <Footer />
    </>
  );
}
