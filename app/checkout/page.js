'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import useCartStore from '@/store/cartStore';

const SHIPPING_FEE = 30000;

export default function CheckoutPage() {
  const router   = useRouter();
  const items    = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart);

  const [form, setForm] = useState({
    name: '', email: '', phone: '', address: '', note: '',
  });
  const [payMethod, setPayMethod] = useState('cod');
  const [loading, setLoading]    = useState(false);
  const [error, setError]        = useState('');

  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const shipping = subtotal > 0 ? SHIPPING_FEE : 0;
  const total    = subtotal + shipping;

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/orders/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerInfo: {
            name:    form.name,
            email:   form.email,
            phone:   form.phone,
            address: form.address,
            note:    form.note,
          },
          items: items.map((i) => ({
            id:   i.id,
            name: i.name,
            price: i.price,
            qty:  i.qty,
            grad: i.grad,
          })),
          paymentMethod: payMethod,
        }),
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.error || 'Đặt hàng thất bại, vui lòng thử lại.');
        return;
      }

      // Xóa giỏ hàng rồi chuyển trang thành công
      clearCart();
      router.push(
        `/order-success?order=${encodeURIComponent(data.order.orderNumber)}&total=${data.order.total}`
      );
    } catch {
      setError('Có lỗi xảy ra, vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  // Giỏ trống
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

                  {error && (
                    <div role="alert" style={{
                      padding: '12px 16px', borderRadius: '10px', marginBottom: '16px',
                      background: '#fef2f2', border: '1px solid #fecaca',
                      color: '#c0392b', fontSize: '13.5px',
                    }}>
                      {error}
                    </div>
                  )}

                  <div className="field">
                    <label htmlFor="co-name">Họ và tên *</label>
                    <input
                      id="co-name" name="name" type="text" required
                      placeholder="Nguyễn Văn A"
                      value={form.name} onChange={handleChange}
                      autoComplete="name"
                    />
                  </div>
                  <div className="field-row">
                    <div className="field">
                      <label htmlFor="co-phone">Số điện thoại *</label>
                      <input
                        id="co-phone" name="phone" type="tel" required
                        placeholder="0901 234 567"
                        value={form.phone} onChange={handleChange}
                        autoComplete="tel"
                      />
                    </div>
                    <div className="field">
                      <label htmlFor="co-email">Email *</label>
                      <input
                        id="co-email" name="email" type="email" required
                        placeholder="bạn@email.com"
                        value={form.email} onChange={handleChange}
                        autoComplete="email"
                      />
                    </div>
                  </div>
                  <div className="field">
                    <label htmlFor="co-address">Địa chỉ nhận hàng *</label>
                    <input
                      id="co-address" name="address" type="text" required
                      placeholder="Số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành"
                      value={form.address} onChange={handleChange}
                      autoComplete="street-address"
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="co-note">Ghi chú (không bắt buộc)</label>
                    <textarea
                      id="co-note" name="note" rows="3"
                      placeholder="Ghi chú về thời gian giao hàng hoặc chỉ dẫn địa điểm..."
                      value={form.note} onChange={handleChange}
                    />
                  </div>

                  <h3 style={{ fontSize: '20px', margin: '30px 0 16px' }}>Phương thức thanh toán</h3>

                  <div
                    className={`pay-option ${payMethod === 'cod' ? 'active' : ''}`}
                    onClick={() => setPayMethod('cod')}
                  >
                    <input type="radio" name="pay" readOnly checked={payMethod === 'cod'} />
                    <div>
                      <h5>Thanh toán khi nhận hàng (COD)</h5>
                      <p>Thanh toán bằng tiền mặt trực tiếp cho shipper khi nhận được hàng.</p>
                    </div>
                  </div>

                  <div
                    className={`pay-option ${payMethod === 'bank' ? 'active' : ''}`}
                    onClick={() => setPayMethod('bank')}
                  >
                    <input type="radio" name="pay" readOnly checked={payMethod === 'bank'} />
                    <div>
                      <h5>Chuyển khoản Ngân hàng (QR Code)</h5>
                      <p>Chuyển khoản qua VietQR tự động xác nhận đơn hàng trong 1 phút.</p>
                    </div>
                  </div>
                </div>

                {/* Order summary */}
                <div className="summary-card">
                  <h3 style={{ fontSize: '18px', marginBottom: '16px' }}>Đơn hàng của bạn</h3>
                  {items.map((item) => (
                    <div key={item.id} className="mini-item">
                      <span>{item.name} × {item.qty}</span>
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
                  <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    style={{ marginTop: '20px' }}
                    disabled={loading}
                  >
                    {loading ? 'Đang xử lý...' : 'Xác nhận đặt hàng →'}
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
