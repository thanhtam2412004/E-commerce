'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;

    fetch('/api/auth/me', { cache: 'no-store' })
      .then((res) => res.ok ? res.json() : null)
      .then((data) => {
        if (!active || !data?.user) return;
        router.replace(data.user.role === 'admin' ? '/admin/dashboard' : '/account');
      })
      .catch(() => {});

    return () => { active = false; };
  }, [router]);

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
          <div className="auth-shell auth-shell-single">
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
                      minLength={6}
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
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
