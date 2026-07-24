'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
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

      // Redirect theo role
      if (data.user.role === 'admin') {
        router.push('/admin/dashboard');
      } else {
        router.push('/account');
      }
      router.refresh();
    } catch {
      setError('Có lỗi xảy ra, vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main>
        <section className="page active">
          <div className="auth-shell">
            <div className="auth-form-side">
              <div className="auth-form-box">
                <h1>Chào mừng trở lại</h1>
                <p className="sub">Đăng nhập để theo dõi đơn hàng và ưu đãi dành riêng cho bạn.</p>
                <form onSubmit={handleLogin}>
                  {error && (
                    <div className="form-error" role="alert" style={{ color: 'var(--red, #c0392b)', marginBottom: '12px', fontSize: '13.5px' }}>
                      {error}
                    </div>
                  )}
                  <div className="field">
                    <label htmlFor="email">Địa chỉ Email</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="bạn@email.com"
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
                    {loading ? 'Đang đăng nhập…' : 'Đăng nhập'}
                  </button>
                  <p className="form-foot">
                    Chưa có tài khoản? <Link href="/register">Đăng ký ngay</Link>
                  </p>
                </form>
              </div>
            </div>
            <div className="auth-art-side">
              <div className="txt">
                <svg fill="none" height="60" viewBox="0 0 40 40" width="60" style={{ margin: '0 auto' }}>
                  <circle cx="20" cy="20" r="18" stroke="#8FAE6C" strokeWidth="2"></circle>
                  <circle cx="20" cy="20" r="11" stroke="#D9AE6C" strokeWidth="2"></circle>
                  <circle cx="20" cy="20" fill="#fff" r="4"></circle>
                </svg>
                <h2>Green Atelier</h2>
                <p>Nơi giao thoa giữa thiên nhiên nguyên bản và phong cách sống hiện đại.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
