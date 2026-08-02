import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <div className="foot-logo">
              <Image
                src="/logo.png"
                alt="Green Atelier"
                width={96}
                height={64}
                style={{ objectFit: 'contain' }}
              />
              Green Atelier
            </div>
            <p className="about-txt">Matcha nguyên chất từ Mộc Châu, chế tác thủ công cho từng khoảnh khắc chăm sóc bản thân.</p>
            <div className="social-row">
              <a href="#">f</a>
              <a href="#">◎</a>
              <a href="#">♪</a>
            </div>
          </div>
          <div className="foot-col">
            <h4>Mua sắm</h4>
            <ul>
              <li><Link href="/shop">Tất cả sản phẩm</Link></li>
              <li><Link href="/shop?cat=Focus">Focus</Link></li>
              <li><Link href="/shop?cat=Energy">Energy</Link></li>
              <li><Link href="/shop?cat=Beauty">Beauty</Link></li>
            </ul>
          </div>
          <div className="foot-col">
            <h4>Hỗ trợ</h4>
            <ul>
              <li><Link href="/contact">Liên hệ</Link></li>
              <li><Link href="/account">Theo dõi đơn hàng</Link></li>
              <li><Link href="/login">Đăng nhập</Link></li>
              <li><Link href="/register">Đăng ký</Link></li>
            </ul>
          </div>
          <div className="foot-col">
            <h4>Green Atelier</h4>
            <ul>
              <li><Link href="/about">Câu chuyện thương hiệu</Link></li>
              <li><Link href="/blog">Blog</Link></li>
              <li><Link href="/finder">Matcha Finder</Link></li>
            </ul>
          </div>
        </div>
        <div className="wrap bottom-bar">
          <span>© 2026 Green Atelier. All rights reserved.</span>
          <Link href="/admin/login">Quản trị viên →</Link>
        </div>
      </div>
    </footer>
  );
}
