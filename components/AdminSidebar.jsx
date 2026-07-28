'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

export default function AdminSidebar() {
  const pathname = usePathname();
  const router   = useRouter();
  const isActive = (path) => pathname === path ? 'active' : '';

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  };

  return (
    <aside className="admin-sidebar">
      <div className="admin-logo">
        <Image
          src="/logo.jpeg"
          alt="Green Atelier"
          width={28}
          height={28}
          style={{ objectFit: 'contain', mixBlendMode: 'multiply', background: '#fff', borderRadius: '4px', padding: '2px' }}
        />
        Green Atelier
      </div>
      <nav className="admin-nav">
        <Link href="/admin/dashboard" className={isActive('/admin/dashboard')}>📊 Dashboard</Link>
        <Link href="/admin/products"  className={isActive('/admin/products')}>🍵 Sản phẩm</Link>
        <Link href="/admin/categories" className={isActive('/admin/categories')}>🏷 Danh mục</Link>
        <Link href="/admin/orders"    className={isActive('/admin/orders')}>📦 Đơn hàng</Link>
        <Link href="/admin/customers" className={isActive('/admin/customers')}>👥 Khách hàng</Link>
        <Link href="/admin/blogs"     className={isActive('/admin/blogs')}>📝 Blog</Link>
        <div className="divider"></div>
        <Link href="/">🏠 Xem cửa hàng</Link>
        <button
          onClick={handleLogout}
          style={{ background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', padding: 0, font: 'inherit', color: 'inherit', width: '100%' }}
        >
          ↩ Đăng xuất
        </button>
      </nav>
    </aside>
  );
}
