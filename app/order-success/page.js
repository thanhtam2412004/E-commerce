'use client';
import { use } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('order') || '';
  const total       = searchParams.get('total')  || '';

  return (
    <>
      <Header />
      <main>
        <section className="page active">
          <section className="inner">
            <div className="wrap" style={{ maxWidth: '560px', margin: '0 auto', textAlign: 'center', padding: '80px 24px' }}>
              {/* Icon thành công */}
              <div style={{
                width: '80px', height: '80px', borderRadius: '50%',
                background: 'linear-gradient(150deg,#DCE6C8,#8FAE6C)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 24px',
              }}>
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#26402A" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>

              <h1 style={{ fontSize: '28px', marginBottom: '12px' }}>Đặt hàng thành công!</h1>
              <p style={{ color: '#5b6b57', marginBottom: '8px' }}>
                Cảm ơn bạn đã tin tưởng Green Atelier.
              </p>
              {orderNumber && (
                <p style={{ fontWeight: 700, fontSize: '18px', margin: '16px 0 8px', color: 'var(--matcha, #6B8E4E)' }}>
                  Mã đơn hàng: {orderNumber}
                </p>
              )}
              {total && (
                <p style={{ color: '#5b6b57', marginBottom: '24px' }}>
                  Tổng thanh toán: <b>{Number(total).toLocaleString('vi-VN')}₫</b>
                </p>
              )}
              <p style={{ color: '#5b6b57', fontSize: '13.5px', marginBottom: '32px' }}>
                Chúng tôi sẽ liên hệ xác nhận đơn hàng trong vòng 30 phút.
              </p>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link href="/account" className="btn btn-primary">Xem lịch sử đơn hàng</Link>
                <Link href="/shop" className="btn btn-outline">Tiếp tục mua sắm</Link>
              </div>
            </div>
          </section>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div style={{ padding: '80px', textAlign: 'center' }}>Đang tải...</div>}>
      <OrderSuccessContent />
    </Suspense>
  );
}
