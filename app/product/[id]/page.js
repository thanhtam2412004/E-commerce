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
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const addItem = useCartStore((s) => s.addItem);

  const { id } = use(params);
  const product = mockProducts.find((p) => p.id === id) || mockProducts[0];
  const relatedProducts = mockProducts.filter((p) => p.id !== product.id).slice(0, 4);
  const selectedVariantName = product.variants?.[selectedVariant];
  const cartProduct = selectedVariantName
    ? { ...product, id: `${product.id}-variant-${selectedVariant}`, name: `${product.name} — ${selectedVariantName}` }
    : product;

  const handleAddToCart = () => {
    addItem(cartProduct, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addItem(cartProduct, qty);
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
                    {product.images?.[selectedImage] ? (
                      <Image
                        src={product.images[selectedImage]}
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
                    {product.images?.length ? (
                      product.images.map((image, index) => (
                        <button
                          key={image}
                          type="button"
                          className={`pd-thumb${selectedImage === index ? ' active' : ''}`}
                          onClick={() => setSelectedImage(index)}
                          aria-label={`Xem ảnh ${index + 1} của ${product.name}`}
                        >
                          <Image src={image} alt="" fill sizes="64px" />
                        </button>
                      ))
                    ) : (
                      <div className="active" style={{ background: product.grad }}></div>
                    )}
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
                    {product.longDesc || `${product.desc} Thu hoạch vụ xuân đầu tiên tại cao nguyên Mộc Châu, xay mịn bằng cối đá thủ công để giữ được sắc xanh ngọc bảo và hàm lượng L-theanine cao nhất.`}
                  </p>

                  {product.variants?.length > 0 && (
                    <div className="pd-block">
                      <h4>Phân loại</h4>
                      <div className="variant-grid">
                        {product.variants.map((variant, index) => (
                          <button
                            key={variant}
                            type="button"
                            className={`variant-option${selectedVariant === index ? ' active' : ''}`}
                            onClick={() => setSelectedVariant(index)}
                            aria-pressed={selectedVariant === index}
                          >
                            {variant}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="pd-block">
                    <h4>Đặc điểm nổi bật</h4>
                    <ul>
                      {(product.features || [
                        '100% Matcha hữu cơ Mộc Châu',
                        'Hàm lượng L-theanine hỗ trợ tập trung 4-6 tiếng',
                        'Không gây ép tim hay bồn chồn',
                        'Bảo quản trong hũ thủy tinh sẫm màu chống tia UV',
                      ]).map((feature) => <li key={feature}>{feature}</li>)}
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
