'use client';
import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { mockProducts } from '@/data/mockData';

export default function ProductDetailPage({ params }) {
  const [qty, setQty] = useState(1);
  const product = mockProducts.find((p) => p.id === params?.id) || mockProducts[0];
  const relatedProducts = mockProducts.slice(4, 8);

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
                <Link href="/shop">Cửa hàng</Link>
                <span className="sep">/</span>
                <span className="cur">{product.name}</span>
              </div>

              <div className="pd-grid">
                <div>
                  <div className="pd-gallery-main" style={{ background: product.grad }}>
                    <svg width="120" height="120" viewBox="0 0 40 40" fill="none">
                      <circle cx="20" cy="20" r="16" stroke="#26402A" strokeWidth="1.3" />
                    </svg>
                  </div>
                  <div className="pd-thumbs">
                    <div className="active" style={{ background: product.grad }}></div>
                    <div style={{ background: 'linear-gradient(150deg,#F3E3C2,#D9AE6C)' }}></div>
                    <div style={{ background: 'linear-gradient(150deg,#E4D9E8,#C9B8D6)' }}></div>
                  </div>
                </div>

                <div>
                  <div className="cat-label">{product.cat}</div>
                  <h1 style={{ fontSize: '32px', margin: '8px 0' }}>{product.name}</h1>
                  <div className="rating">
                    ★★★★★ <span>(48 đánh giá)</span>
                  </div>
                  <div className="pd-price">{product.price}</div>
                  <p className="pd-desc">{product.desc} Thu hoạch vụ xuân đầu tiên tại cao nguyên Mộc Châu, xay mịn bằng cối đá thủ công để giữ được sắc xanh ngọc bảo và hàm lượng L-theanine cao nhất.</p>

                  <div className="pd-block">
                    <h4>Đặc điểm nổi bật</h4>
                    <ul>
                      <li>100% Matcha hữu cơ Mộc Châu</li>
                      <li>Hàm lượng L-theanine hỗ trợ tập trung 4-6 tiếng</li>
                      <li>Không gây ép tim hay bồn chồn</li>
                      <li>Bảo quản trong hũ thủy tinh sẫm màu chống tia UV</li>
                    </ul>
                  </div>

                  <div className="qty-row">
                    <div className="qty-selector">
                      <button onClick={() => setQty(Math.max(1, qty - 1))}>-</button>
                      <input type="text" value={qty} readOnly />
                      <button onClick={() => setQty(qty + 1)}>+</button>
                    </div>
                    <button className="btn btn-primary" onClick={() => alert(`Đã thêm ${qty} x ${product.name} vào giỏ hàng!`)}>
                      Thêm vào giỏ hàng — {(product.rawPrice * qty).toLocaleString('vi-VN')}₫
                    </button>
                  </div>
                </div>
              </div>

              <h2 className="related-title">Sản phẩm liên quan</h2>
              <div className="prod-grid">
                {relatedProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
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
