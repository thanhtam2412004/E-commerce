'use client';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import BlogCard from '@/components/BlogCard';
import { mockProducts, mockBlogs } from '@/data/mockData';

export default function HomePage() {
  const featuredProducts = mockProducts.slice(0, 4);
  const latestBlogs = mockBlogs.slice(0, 3);

  return (
    <>
      <Header />
      <main>
        <section className="page active">
          {/* HERO */}
          <section className="hero" style={{ padding: '88px 0 90px' }}>
            <div className="wrap" style={{ display: 'grid', gridTemplateColumns: '1.05fr .95fr', gap: '40px', alignItems: 'center' }}>
              <div>
                <div className="eyebrow">Matcha Mộc Châu — Vụ mùa mới</div>
                <h1 style={{ fontSize: 'clamp(40px,5.2vw,64px)', lineHeight: 1.05, margin: '18px 0 22px', color: 'var(--forest)' }}>
                  Where Nature<br />
                  <em style={{ fontStyle: 'italic', color: 'var(--matcha)', fontWeight: 500 }}>Brews</em> Wellness.
                </h1>
                <p style={{ fontSize: '17px', lineHeight: 1.6, color: '#3f4d3d', maxWidth: '460px', marginBottom: '34px' }}>
                  Matcha nguyên chất từ cao nguyên Mộc Châu, tuyển chọn và xay mịn thủ công để giữ trọn hương vị và dưỡng chất.
                </p>
                <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                  <Link href="/shop" className="btn btn-primary">
                    Khám phá cửa hàng
                    <svg fill="none" height="15" stroke="#fff" strokeWidth="2.4" viewBox="0 0 24 24" width="15">
                      <line x1="5" x2="19" y1="12" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </Link>
                  <Link href="/finder" className="btn btn-outline">Tìm Matcha của bạn</Link>
                </div>
              </div>
              <div style={{ height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg height="100%" viewBox="0 0 420 420" width="100%">
                  <circle cx="210" cy="210" fill="none" r="190" stroke="#C7D3B4" strokeDasharray="2 10" strokeWidth="1.4"></circle>
                  <circle cx="210" cy="210" fill="none" r="160" stroke="#6B8E4E" strokeDasharray="1 8" strokeWidth="1.6"></circle>
                  <circle cx="210" cy="210" fill="none" r="130" stroke="#B98B3E" strokeDasharray="3 6" strokeWidth="1.2"></circle>
                  <circle cx="210" cy="210" fill="#26402A" r="98"></circle>
                  <path d="M150 235 Q210 150 270 235" fill="none" opacity=".8" stroke="#8FAE6C" strokeLinecap="round" strokeWidth="3"></path>
                  <path d="M160 250 Q210 185 260 250" fill="none" opacity=".8" stroke="#D9AE6C" strokeLinecap="round" strokeWidth="3"></path>
                  <circle cx="210" cy="210" fill="#F1F3E8" r="6"></circle>
                </svg>
              </div>
            </div>
          </section>

          {/* CATEGORIES STRIP */}
          <div style={{ background: 'var(--forest)' }}>
            <div className="wrap" style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)' }}>
              <Link href="/shop?cat=Focus" style={{ padding: '34px 20px', color: '#fff', borderRight: '1px solid rgba(255,255,255,.1)', display: 'block' }}>
                <div style={{ fontSize: '11px', color: 'var(--sage)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px' }}>Tập trung</div>
                <h3 style={{ color: '#fff', fontWeight: 500 }}>Focus</h3>
              </Link>
              <Link href="/shop?cat=Energy" style={{ padding: '34px 20px', color: '#fff', borderRight: '1px solid rgba(255,255,255,.1)', display: 'block' }}>
                <div style={{ fontSize: '11px', color: 'var(--sage)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px' }}>Năng lượng</div>
                <h3 style={{ color: '#fff', fontWeight: 500 }}>Energy</h3>
              </Link>
              <Link href="/shop?cat=Calm" style={{ padding: '34px 20px', color: '#fff', borderRight: '1px solid rgba(255,255,255,.1)', display: 'block' }}>
                <div style={{ fontSize: '11px', color: 'var(--sage)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px' }}>Thư giãn</div>
                <h3 style={{ color: '#fff', fontWeight: 500 }}>Calm</h3>
              </Link>
              <Link href="/shop?cat=Beauty" style={{ padding: '34px 20px', color: '#fff', borderRight: '1px solid rgba(255,255,255,.1)', display: 'block' }}>
                <div style={{ fontSize: '11px', color: 'var(--sage)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px' }}>Sắc đẹp</div>
                <h3 style={{ color: '#fff', fontWeight: 500 }}>Beauty</h3>
              </Link>
              <Link href="/shop?cat=Immunity" style={{ padding: '34px 20px', color: '#fff', display: 'block' }}>
                <div style={{ fontSize: '11px', color: 'var(--sage)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px' }}>Miễn dịch</div>
                <h3 style={{ color: '#fff', fontWeight: 500 }}>Immunity</h3>
              </Link>
            </div>
          </div>

          {/* FEATURED PRODUCTS */}
          <section className="inner">
            <div className="wrap">
              <div className="page-head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap' }}>
                <div>
                  <div className="eyebrow">Được yêu thích nhất</div>
                  <h1>Sản phẩm nổi bật</h1>
                </div>
                <Link href="/shop" className="btn-ghost">Xem tất cả sản phẩm →</Link>
              </div>
              <div className="prod-grid">
                {featuredProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          </section>

          {/* MATCHA FINDER CTA */}
          <section className="inner" style={{ paddingTop: 0 }}>
            <div className="wrap">
              <div style={{ background: 'var(--forest)', borderRadius: '28px', padding: '56px', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '30px', flexWrap: 'wrap' }}>
                <div style={{ maxWidth: '520px' }}>
                  <div className="eyebrow" style={{ color: 'var(--gold-light)' }}>Bài kiểm tra 1 phút</div>
                  <h2 style={{ color: '#fff', fontSize: 'clamp(24px,3vw,32px)', margin: '10px 0 12px' }}>Chưa biết bắt đầu từ đâu?</h2>
                  <p style={{ color: 'var(--sage)', fontSize: '14.5px' }}>Để Matcha Finder gợi ý sản phẩm phù hợp với mục tiêu của bạn.</p>
                </div>
                <Link href="/finder" className="btn btn-gold">Bắt đầu ngay</Link>
              </div>
            </div>
          </section>

          {/* LATEST BLOG POSTS */}
          <section className="inner" style={{ paddingTop: 0 }}>
            <div className="wrap">
              <div className="page-head">
                <div className="eyebrow">Từ nhật ký Green Atelier</div>
                <h1>Bài viết mới nhất</h1>
              </div>
              <div className="blog-grid">
                {latestBlogs.map((b) => (
                  <BlogCard key={b.id} blog={b} />
                ))}
              </div>
            </div>
          </section>
        </section>
      </main>
      <Footer />
    </>
  );
}
