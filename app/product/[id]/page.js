'use client';
import { useState, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { mockProducts } from '@/data/mockData';
import useCartStore from '@/store/cartStore';

export default function ProductDetailPage({ params }) {
  const router = useRouter();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  const { id } = use(params);
  const product = mockProducts.find((p) => p.id === id) || mockProducts[0];
  const relatedProducts = mockProducts.filter((p) => p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    addItem(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addItem(product, qty);
    router.push('/cart');
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
                <Link href="/shop">Cửa hàng</Link>
                <span className="sep">/</span>
                <span className="cur">{product.name}</span>
              </div>

              <div className="pd-grid">
                <div>
                  <div className="pd-gallery-main" style={{ background: product.grad }}>
                    {product.images?.[0] ? (
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        priority
                        sizes="(max-width: 980px) 100vw, 50vw"
                        className="pd-product-image"
                      />
                    ) : (
                      <svg width="120" height="120" viewBox="0 0 40 40" fill="none">
                        <circle cx="20" cy="20" r="16" stroke="#26402A" strokeWidth="1.3" />
                      </svg>
                    )}
                  </div>
                  <div className="pd-thumbs">
                    <div className="active pd-thumb" style={{ background: product.grad }}>
                      {product.images?.[0] && (
                        <Image src={product.images[0]} alt="" fill sizes="64px" />
                      )}
                    </div>
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
                  <p className="pd-desc">
                    {product.desc} Thu hoạch vụ xuân đầu tiên tại cao nguyên Mộc Châu, xay mịn bằng cối đá thủ công để giữ được sắc xanh ngọc bảo và hàm lượng L-theanine cao nhất.
                  </p>

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
                    <button
                      className="btn btn-primary"
                      onClick={handleAddToCart}
                      style={added ? { background: 'var(--matcha, #6B8E4E)' } : {}}
                    >
                      {added
                        ? '✓ Đã thêm vào giỏ!'
                        : `Thêm vào giỏ hàng — ${(product.rawPrice * qty).toLocaleString('vi-VN')}₫`}
                    </button>
                  </div>
                  <button
                    className="btn btn-outline btn-block"
                    style={{ marginTop: '10px' }}
                    onClick={handleBuyNow}
                  >
                    Mua ngay →
                  </button>
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
