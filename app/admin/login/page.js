'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const router = useRouter();

  const handleAdminLogin = (e) => {
    e.preventDefault();
    router.push('/admin/dashboard');
  };

  return (
    <section className="admin-page active" style={{ minHeight: '100vh', background: 'var(--forest-2)' }}>
      <div className="admin-auth-shell">
        <svg className="admin-deco" height="420" style={{ top: '-100px', left: '-100px' }} viewBox="0 0 420 420" width="420">
          <circle cx="210" cy="210" r="190" stroke="#8FAE6C" strokeWidth="1.2"></circle>
          <circle cx="210" cy="210" r="150" stroke="#D9AE6C" strokeDasharray="2 10" strokeWidth="1.2"></circle>
        </svg>

        <div className="admin-auth-card">
          <div className="amark">
            <svg fill="none" height="24" viewBox="0 0 40 40" width="24">
              <circle cx="20" cy="20" r="18" stroke="#6B8E4E" strokeWidth="2"></circle>
              <circle cx="20" cy="20" r="11" stroke="#B98B3E" strokeWidth="2"></circle>
              <circle cx="20" cy="20" fill="#26402A" r="4"></circle>
            </svg>
            Green Atelier Admin
          </div>
          <h1>Đăng nhập quản trị</h1>
          <p className="sub">Dành riêng cho quản trị viên hệ thống.</p>

          <form onSubmit={handleAdminLogin}>
            <div className="field">
              <label>Email quản trị</label>
              <input type="email" required defaultValue="admin@greenatelier.vn" />
            </div>
            <div className="field">
              <label>Mật khẩu</label>
              <input type="password" required defaultValue="admin123" />
            </div>
            <button type="submit" className="btn btn-primary btn-block">Đăng nhập Dashboard</button>
            <p className="form-foot">
              <Link href="/">← Về trang cửa hàng</Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
