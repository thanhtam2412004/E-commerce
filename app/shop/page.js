'use client';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { mockProducts } from '@/data/mockData';

export default function ShopPage() {
  return (
    <>
      <Header />
      <main>
        <section className="page active">
          <section className="inner">
            <div className="wrap">
              <div className="breadcrumb">
                <Link href="/">Trang chủ</Link>
                <span className="sep">/</span>
                <span className="cur">Cửa hàng</span>
              </div>
              <div className="page-head">
                <h1>Cửa hàng</h1>
                <p>Toàn bộ dòng sản phẩm matcha Green Atelier, phân theo công dụng.</p>
              </div>

              <div className="shop-layout">
                {/* FILTER SIDEBAR */}
                <aside className="filter-box">
                  <h4>Tìm kiếm</h4>
                  <div className="search-box" style={{ width: '100%', marginBottom: '20px' }}>
                    <svg fill="none" height="14" stroke="#5b6b57" strokeWidth="2" viewBox="0 0 24 24" width="14">
                      <circle cx="11" cy="11" r="7"></circle>
                      <line x1="21" x2="16.65" y1="21" y2="16.65"></line>
                    </svg>
                    Tên sản phẩm...
                  </div>
                  <div className="filter-divider"></div>
                  <h4>Danh mục</h4>
                  <label className="filter-item"><input type="checkbox" defaultChecked /> Focus</label>
                  <label className="filter-item"><input type="checkbox" /> Energy</label>
                  <label className="filter-item"><input type="checkbox" /> Calm</label>
                  <label className="filter-item"><input type="checkbox" /> Beauty</label>
                  <label className="filter-item"><input type="checkbox" /> Immunity</label>
                  <div className="filter-divider"></div>
                  <h4>Khoảng giá</h4>
                  <label className="filter-item"><input type="checkbox" /> Dưới 300.000₫</label>
                  <label className="filter-item"><input type="checkbox" /> 300.000₫ – 400.000₫</label>
                  <label className="filter-item"><input type="checkbox" /> Trên 400.000₫</label>
                </aside>

                {/* PRODUCT LIST */}
                <div>
                  <div className="shop-toolbar">
                    <span className="count">Hiển thị {mockProducts.length} trong 24 sản phẩm</span>
                    <select className="sort-select">
                      <option>Mới nhất</option>
                      <option>Giá tăng dần</option>
                      <option>Giá giảm dần</option>
                    </select>
                  </div>

                  <div className="prod-grid">
                    {mockProducts.map((p) => (
                      <ProductCard key={p.id} product={p} />
                    ))}
                  </div>

                  <div className="pagination">
                    <button className="active">1</button>
                    <button>2</button>
                    <button>3</button>
                    <button>→</button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </section>
      </main>
      <Footer />
    </>
  );
}
