'use client';
import Link from 'next/link';
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
        <svg fill="none" height="22" viewBox="0 0 40 40" width="22">
          <circle cx="20" cy="20" r="18" stroke="#8FAE6C" strokeWidth="2"></circle>
          <circle cx="20" cy="20" r="11" stroke="#D9AE6C" strokeWidth="2"></circle>
          <circle cx="20" cy="20" fill="#fff" r="4"></circle>
        </svg>
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
