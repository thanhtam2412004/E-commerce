'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ProductCard({ product }) {
  const router = useRouter();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    e.preventDefault();
    alert(`Đã thêm ${product.name} vào giỏ hàng!`);
  };

  return (
    <div className="prod-card" onClick={() => router.push(`/product/${product.id}`)}>
      <div className="prod-photo" style={{ background: product.grad }}>
        <span className="tag">{product.tag}</span>
        <svg width="60" height="60" viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="20" r="16" stroke="#26402A" strokeWidth="1.3" />
        </svg>
      </div>
      <div className="prod-body">
        <div className="cat-label">{product.cat}</div>
        <h3>{product.name}</h3>
        <p style={{ fontSize: '12.5px', color: '#5b6b57', marginBottom: '10px' }}>{product.desc}</p>
        <div className="prod-foot">
          <span className="price">{product.price}</span>
          <button className="add-btn" onClick={handleAddToCart} aria-label="Thêm vào giỏ hàng">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#26402A" strokeWidth="2.2">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
