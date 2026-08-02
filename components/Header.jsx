'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import useCartStore from '@/store/cartStore';

export default function Header() {
  const pathname = usePathname();
  const isActive = (path) => (pathname === path ? 'active' : '');

  // Tránh hydration mismatch: chỉ render badge sau khi mount client
  const [mounted, setMounted] = useState(false);
  const items = useCartStore((s) => s.items);
  const totalQty = items.reduce((sum, i) => sum + i.qty, 0);

  useEffect(() => setMounted(true), []);

  return (
    <header>
      <div className="wrap nav-row">
        <Link href="/" className="logo">
          <Image
            src="/logo.png"
            alt="Green Atelier"
            width={90}
            height={60}
            className="logo-img"
            priority
          />
          Green Atelier
        </Link>
        <nav className="nav-links">
          <Link href="/" className={isActive('/')}>Trang chủ</Link>
          <Link href="/shop" className={isActive('/shop')}>Cửa hàng</Link>
          <Link href="/finder" className={isActive('/finder')}>Matcha Finder</Link>
          <Link href="/blog" className={isActive('/blog')}>Blog</Link>
          <Link href="/about" className={isActive('/about')}>Giới thiệu</Link>
          <Link href="/contact" className={isActive('/contact')}>Liên hệ</Link>
        </nav>
        <div className="nav-actions">
          <div className="search-box">
            <svg fill="none" height="15" stroke="#5b6b57" strokeWidth="2" viewBox="0 0 24 24" width="15">
              <circle cx="11" cy="11" r="7"></circle>
              <line x1="21" x2="16.65" y1="21" y2="16.65"></line>
            </svg>
            Tìm sản phẩm...
          </div>
          <Link href="/login" aria-label="Tài khoản" className="icon-btn">
            <svg fill="none" height="19" stroke="#26402A" strokeWidth="1.8" viewBox="0 0 24 24" width="19">
              <circle cx="12" cy="8" r="4"></circle>
              <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8"></path>
            </svg>
          </Link>
          <Link href="/cart" aria-label="Giỏ hàng" className="icon-btn">
            <svg fill="none" height="19" stroke="#26402A" strokeWidth="1.8" viewBox="0 0 24 24" width="19">
              <path d="M3 3h2l2.6 13.4a2 2 0 0 0 2 1.6h8.8a2 2 0 0 0 2-1.6L22 6H6"></path>
              <circle cx="9" cy="21" r="1.4"></circle>
              <circle cx="18" cy="21" r="1.4"></circle>
            </svg>
            {mounted && totalQty > 0 && (
              <span className="badge">{totalQty > 99 ? '99+' : totalQty}</span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}


