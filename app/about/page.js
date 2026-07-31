'use client';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <section className="page active">
          <section className="inner">
            <div className="wrap">
              <div className="breadcrumb" style={{ justifyContent: 'center' }}>
                <Link href="/">Trang chủ</Link>
                <span className="sep">/</span>
                <span className="cur">Giới thiệu</span>
              </div>

              <div className="about-hero">
                <div className="eyebrow" style={{ justifyContent: 'center' }}>Câu chuyện thương hiệu</div>
                <h1 style={{ fontSize: 'clamp(32px,4.5vw,52px)', margin: '14px 0 18px' }}>Chế tác bình yên từ cao nguyên Mộc Châu.</h1>
                <p style={{ color: '#5b6b57', fontSize: '16px', lineHeight: 1.6 }}>
                  Green Atelier khởi đầu từ tình yêu với những đồi trà mờ sương và mong muốn mang hương vị matcha thuần khiết nhất đến mọi ngôi nhà Việt.
                </p>
              </div>

              <div className="story-block">
                <div className="story-photo"></div>
                <div>
                  <div className="eyebrow">Nguồn gốc nguyên bản</div>
                  <h2>Thổ nhưỡng & Độ cao lý tưởng</h2>
                  <p>Trồng tại vùng cao nguyên Mộc Châu ở độ cao trên 1.050m, nơi có khí hậu ôn đới mát mẻ quanh năm và chênh lệch nhiệt độ ngày đêm lớn. Những búp trà xuân được nuôi dưỡng bởi nguồn nước suối tự nhiên và sương sớm ngậm dưỡng chất.</p>
                </div>
              </div>

              <div className="story-block" style={{ gridTemplateColumns: '1fr 1fr' }}>
                <div>
                  <div className="eyebrow">Nghệ thuật chế tác</div>
                  <h2>Xay mịn thủ công bằng cối đá</h2>
                  <p>Mỗi giờ nghiền cối đá granit truyền thống chỉ tạo ra đúng 30g bột matcha siêu mịn. Tốc độ chậm giúp giữ nhiệt độ không vượt quá 40°C, giữ trọn hàm lượng L-theanine và sắc xanh ngọc bảo quý giá.</p>
                </div>
                <Image
                  src="/images/hand-stone-ground-matcha.png"
                  alt="Nghệ nhân xay matcha thủ công bằng cối đá granit"
                  width={1400}
                  height={1090}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '20px',
                    display: 'block',
                  }}
                />
              </div>

              <div className="page-head" style={{ textAlign: 'center', marginTop: '60px' }}>
                <div className="eyebrow" style={{ justifyContent: 'center' }}>Giá trị cốt lõi</div>
                <h2>Cam kết của Green Atelier</h2>
              </div>

              <div className="value-grid">
                <div className="value-card">
                  <h4>🍃 100% Hữu cơ</h4>
                  <p>Không phân bón hóa học hay chất bảo quản nhân tạo.</p>
                </div>
                <div className="value-card">
                  <h4>🪨 Xay đá thủ công</h4>
                  <p>Giữ nguyên dưỡng chất và cấu trúc bột siêu mịn.</p>
                </div>
                <div className="value-card">
                  <h4>☀️ Che nắng 21 ngày</h4>
                  <p>Tăng cường diệp tính và hương vị umami đậm đà.</p>
                </div>
                <div className="value-card">
                  <h4>♻️ Bao bì bền vững</h4>
                  <p>Sử dụng hũ thủy tinh sẫm màu tái chế chống tia UV.</p>
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
