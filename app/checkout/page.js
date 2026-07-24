'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function CheckoutPage() {
  const router = useRouter();
  const [payMethod, setPayMethod] = useState('cod');

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    alert('Đặt hàng thành công! Đơn hàng của bạn đã được ghi nhận.');
    router.push('/account');
  };

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
                    <input type="text" required defaultValue="Nguyễn Văn A" />
                  </div>
                  <div className="field-row">
                    <div className="field">
                      <label>Số điện thoại *</label>
                      <input type="tel" required defaultValue="0901 234 567" />
                    </div>
                    <div className="field">
                      <label>Email *</label>
                      <input type="email" required defaultValue="nguyenvana@email.com" />
                    </div>
                  </div>
                  <div className="field">
                    <label>Địa chỉ nhận hàng *</label>
                    <input type="text" required defaultValue="123 Đường Lê Lợi, Phường Bến Thành, Quận 1, TP.HCM" />
                  </div>
                  <div className="field">
                    <label>Ghi chú đơn hàng (không bắt buộc)</label>
                    <textarea rows="3" placeholder="Ghi chú về thời gian giao hàng hoặc chỉ dẫn địa điểm..."></textarea>
                  </div>

                  <h3 style={{ fontSize: '20px', margin: '30px 0 16px' }}>Phương thức thanh toán</h3>

                  <div className={`pay-option ${payMethod === 'cod' ? 'active' : ''}`} onClick={() => setPayMethod('cod')}>
                    <input type="radio" name="pay" checked={payMethod === 'cod'} onChange={() => setPayMethod('cod')} />
                    <div>
                      <h5>Thanh toán khi nhận hàng (COD)</h5>
                      <p>Thanh toán bằng tiền mặt trực tiếp cho shipper khi nhận được hàng.</p>
                    </div>
                  </div>

                  <div className={`pay-option ${payMethod === 'bank' ? 'active' : ''}`} onClick={() => setPayMethod('bank')}>
                    <input type="radio" name="pay" checked={payMethod === 'bank'} onChange={() => setPayMethod('bank')} />
                    <div>
                      <h5>Chuyển khoản Ngân hàng (QR Code)</h5>
                      <p>Chuyển khoản qua VietQR tự động xác nhận đơn hàng trong 1 phút.</p>
                    </div>
                  </div>
                </div>

                <div className="summary-card">
                  <h3 style={{ fontSize: '18px', marginBottom: '16px' }}>Đơn hàng của bạn</h3>
                  <div className="mini-item">
                    <span>Matcha Mộc Châu Cổ Điển x 1</span>
                    <b>285.000₫</b>
                  </div>
                  <div className="mini-item">
                    <span>Matcha Genki Boost x 2</span>
                    <b>640.000₫</b>
                  </div>
                  <div className="filter-divider"></div>
                  <div className="summary-row">
                    <span>Tạm tính</span>
                    <span>925.000₫</span>
                  </div>
                  <div className="summary-row">
                    <span>Phí vận chuyển</span>
                    <span>30.000₫</span>
                  </div>
                  <div className="summary-row total">
                    <span>Tổng cộng</span>
                    <span>955.000₫</span>
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
