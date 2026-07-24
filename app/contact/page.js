'use client';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ContactPage() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Cảm ơn bạn đã liên hệ! Green Atelier sẽ phản hồi trong vòng 24h.');
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
                <span className="cur">Liên hệ</span>
              </div>
              <div className="page-head">
                <h1>Kết nối với Green Atelier</h1>
                <p>Chúng tôi luôn sẵn sàng lắng nghe mọi thắc mắc và góp ý từ bạn.</p>
              </div>

              <div className="contact-layout">
                <div>
                  <div className="contact-info-card">
                    <h3>Atelier Showroom & Tea House</h3>
                    <div className="info-row">📍 88 Đường Thịnh Minh, Thị trấn Mộc Châu, Sơn La</div>
                    <div className="info-row">📞 Hotline: 0988 123 456</div>
                    <div className="info-row">✉ Email: hello@greenatelier.vn</div>
                    <div className="info-row">⏰ Giờ mở cửa: 08:00 – 21:00 (Tất cả các ngày)</div>
                  </div>
                  <div className="map-box">
                    🗺 Bản đồ Google Maps Showroom Mộc Châu
                  </div>
                </div>

                <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: '20px', padding: '32px' }}>
                  <h3 style={{ fontSize: '20px', marginBottom: '20px' }}>Gửi lời nhắn</h3>
                  <form onSubmit={handleSubmit}>
                    <div className="field">
                      <label>Họ và tên *</label>
                      <input type="text" required placeholder="Nguyễn Văn A" />
                    </div>
                    <div className="field">
                      <label>Địa chỉ Email *</label>
                      <input type="email" required placeholder="bạn@email.com" />
                    </div>
                    <div className="field">
                      <label>Số điện thoại</label>
                      <input type="tel" placeholder="0901 234 567" />
                    </div>
                    <div className="field">
                      <label>Nội dung lời nhắn *</label>
                      <textarea rows="4" required placeholder="Hãy cho chúng tôi biết thắc mắc hoặc yêu cầu của bạn..."></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">Gửi tin nhắn →</button>
                  </form>
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
