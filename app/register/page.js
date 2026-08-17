'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!data.success) {
        setError(data.error || 'Đăng ký thất bại.');
        return;
      }

      // Đăng ký xong → tự động login luôn
      const loginRes = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email, password: form.password }),
      });
      const loginData = await loginRes.json();

      if (loginData.success) {
        router.push('/account');
        router.refresh();
      } else {
        router.push('/login');
      }
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
                <h1>Tạo tài khoản mới</h1>
                <p className="sub">Trở thành hội viên Green Atelier để nhận ưu đãi đặc quyền.</p>
                <form onSubmit={handleRegister}>
                  {error && (
                    <div className="form-error" role="alert" style={{ color: 'var(--red, #c0392b)', marginBottom: '12px', fontSize: '13.5px' }}>
                      {error}
                    </div>
                  )}
                  <div className="field">
                    <label htmlFor="name">Họ và tên</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="Nguyễn Văn A"
                      value={form.name}
                      onChange={handleChange}
                      autoComplete="name"
                    />
                  </div>
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
                    <label htmlFor="phone">Số điện thoại</label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="0901 234 567"
                      value={form.phone}
                      onChange={handleChange}
                      autoComplete="tel"
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="password">Mật khẩu</label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      required
                      placeholder="Ít nhất 6 ký tự"
                      value={form.password}
                      onChange={handleChange}
                      autoComplete="new-password"
                    />
                  </div>
                  <div className="checkbox-row">
                    <input type="checkbox" id="terms" required />
                    <label htmlFor="terms">Tôi đồng ý với điều khoản sử dụng</label>
                  </div>
                  <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                    {loading ? 'Đang tạo tài khoản…' : 'Tạo tài khoản'}
                  </button>
                  <p className="form-foot">
                    Đã có tài khoản? <Link href="/login">Đăng nhập</Link>
                  </p>
                </form>
              </div>
            </div>
            <div className="auth-art-side">
              <Image
                src="/logo.png"
                alt="Green Atelier"
                width={560}
                height={373}
                className="auth-brand-logo"
                priority
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
