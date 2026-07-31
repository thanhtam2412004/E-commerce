'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import useCartStore from '@/store/cartStore';

export default function ProductCard({ product }) {
  const router = useRouter();
  const addItem = useCartStore((s) => s.addItem);
  const [added, setAdded] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(0);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const variantName = product.variants?.[selectedVariant];
    const cartProduct = variantName
      ? {
          ...product,
          id: `${product.id}-variant-${selectedVariant}`,
          name: `${product.name} — ${variantName}`,
        }
      : product;
    addItem(cartProduct, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="prod-card" onClick={() => router.push(`/product/${product.id}`)}>
      <div className="prod-photo" style={{ background: product.grad }}>
        <span className="tag">{product.tag}</span>
        {product.images?.[0] ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 980px) 50vw, 25vw"
            className="prod-image"
          />
        ) : (
          <svg width="60" height="60" viewBox="0 0 40 40" fill="none">
            <circle cx="20" cy="20" r="16" stroke="#26402A" strokeWidth="1.3" />
          </svg>
        )}
      </div>
      <div className="prod-body">
        <div className="cat-label">{product.cat}</div>
        <h3>{product.name}</h3>
        <p style={{ fontSize: '12.5px', color: '#5b6b57', marginBottom: '10px' }}>{product.desc}</p>
        {product.variants?.length > 0 && (
          <select
            className="card-variant-select"
            value={selectedVariant}
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => {
              e.stopPropagation();
              setSelectedVariant(Number(e.target.value));
            }}
            aria-label={`Chọn phân loại ${product.name}`}
          >
            {product.variants.map((variant, index) => (
              <option key={variant} value={index}>{variant}</option>
            ))}
          </select>
        )}
        <div className="prod-foot">
          <span className="price">{product.price}</span>
          <button
            className="add-btn"
            onClick={handleAddToCart}
            aria-label="Thêm vào giỏ hàng"
            title={added ? 'Đã thêm!' : 'Thêm vào giỏ hàng'}
            style={added ? { background: 'var(--matcha, #6B8E4E)', color: '#fff' } : {}}
          >
            {added ? (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            ) : (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#26402A" strokeWidth="2.2">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
