'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    router.push('/account');
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
                  <div className="field">
                    <label>Địa chỉ Email</label>
                    <input type="email" required placeholder="bạn@email.com" />
                  </div>
                  <div className="field">
                    <label>Mật khẩu</label>
                    <input type="password" required placeholder="••••••••" />
                  </div>
                  <div className="checkbox-row">
                    <input type="checkbox" id="remember" />
                    <label htmlFor="remember">Ghi nhớ đăng nhập</label>
                  </div>
                  <button type="submit" className="btn btn-primary btn-block">Đăng nhập</button>
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
