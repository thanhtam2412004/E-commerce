'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: 'admin@greenatelier.vn', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!data.success) {
        setError(data.error || 'Đăng nhập thất bại.');
        return;
      }

      if (data.user.role !== 'admin') {
        setError('Tài khoản này không có quyền truy cập admin.');
        // Logout ngay
        await fetch('/api/auth/logout', { method: 'POST' });
        return;
      }

      router.push('/admin/dashboard');
      router.refresh();
    } catch {
      setError('Có lỗi xảy ra, vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
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
            {error && (
              <div className="form-error" role="alert" style={{ color: '#e74c3c', marginBottom: '12px', fontSize: '13.5px' }}>
                {error}
              </div>
            )}
            <div className="field">
              <label htmlFor="email">Email quản trị</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                autoComplete="email"
              />
            </div>
            <div className="field">
              <label htmlFor="password">Mật khẩu</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                autoComplete="current-password"
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
              {loading ? 'Đang đăng nhập…' : 'Đăng nhập Dashboard'}
            </button>
            <p className="form-foot">
              <Link href="/">← Về trang cửa hàng</Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
