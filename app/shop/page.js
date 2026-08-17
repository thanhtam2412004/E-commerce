'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';

const TAGS = ['Focus', 'Energy', 'Calm', 'Beauty', 'Immunity'];

const PRICE_RANGES = [
  { label: 'Dưới 350.000₫',        min: 0,      max: 349999 },
  { label: '350.000₫ – 450.000₫',  min: 350000, max: 450000 },
  { label: 'Trên 450.000₫',        min: 450001, max: 0      },
];

const SORT_OPTIONS = [
  { value: 'newest',     label: 'Mới nhất' },
  { value: 'price_asc',  label: 'Giá tăng dần' },
  { value: 'price_desc', label: 'Giá giảm dần' },
  { value: 'featured',   label: 'Nổi bật' },
];

function buildApiUrl({ q, tags, priceRange, sort, page }) {
  const params = new URLSearchParams();
  if (q)              params.set('q', q);
  if (tags.length)    params.set('tag', tags.join(','));
  if (priceRange) {
    if (priceRange.min > 0) params.set('minPrice', priceRange.min);
    if (priceRange.max > 0) params.set('maxPrice', priceRange.max);
  }
  params.set('sort', sort);
  params.set('page', page);
  params.set('limit', '12');
  return `/api/products?${params.toString()}`;
}

export default function ShopPage() {
  // ── Filter state ──────────────────────────────────────────────────────────
  const [q, setQ]                   = useState('');
  const [inputQ, setInputQ]         = useState('');   // controlled input (debounce)
  const [tags, setTags]             = useState([]);
  const [priceRange, setPriceRange] = useState(null); // index vào PRICE_RANGES
  const [sort, setSort]             = useState('newest');
  const [page, setPage]             = useState(1);

  // ── Data state ────────────────────────────────────────────────────────────
  const [products, setProducts]     = useState([]);
  const [pagination, setPagination] = useState({ total: 0, totalPages: 1 });
  const [loading, setLoading]       = useState(true);
  const [loadError, setLoadError]   = useState('');
  const latestRequest               = useRef(0);

  // Nhận từ khóa từ ô tìm kiếm trên header: /shop?q=matcha
  useEffect(() => {
    const initialQuery = new URLSearchParams(window.location.search).get('q')?.trim() || '';
    if (!initialQuery) return;
    const timer = setTimeout(() => setInputQ(initialQuery), 0);
    return () => clearTimeout(timer);
  }, []);

  // ── Debounce search ───────────────────────────────────────────────────────
  useEffect(() => {
    const t = setTimeout(() => {
      setQ(inputQ);
      setPage(1);
    }, 400);
    return () => clearTimeout(t);
  }, [inputQ]);

  // ── Fetch products từ API ─────────────────────────────────────────────────
  const fetchProducts = useCallback(async () => {
    const requestId = ++latestRequest.current;
    setLoading(true);
    setLoadError('');
    try {
      const url = buildApiUrl({
        q,
        tags,
        priceRange: priceRange !== null ? PRICE_RANGES[priceRange] : null,
        sort,
        page,
      });
      const res  = await fetch(url, { cache: 'no-store' });
      const data = await res.json();
      if (requestId !== latestRequest.current) return;
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Không thể lọc sản phẩm.');
      }
      // Normalize _id → id cho ProductCard
      setProducts(data.data.map((p) => ({ ...p, id: p._id })));
      setPagination(data.pagination);
    } catch (err) {
      if (requestId !== latestRequest.current) return;
      console.error('Fetch products error:', err);
      setProducts([]);
      setPagination({ total: 0, totalPages: 1 });
      setLoadError(err.message || 'Không thể lọc sản phẩm.');
    } finally {
      if (requestId === latestRequest.current) setLoading(false);
    }
  }, [q, tags, priceRange, sort, page]);

  useEffect(() => {
    const timer = setTimeout(fetchProducts, 0);
    return () => clearTimeout(timer);
  }, [fetchProducts]);

  // ── Handlers ──────────────────────────────────────────────────────────────
  const toggleTag = (tag) => {
    setTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
    setPage(1);
  };

  const selectPriceRange = (idx) => {
    setPriceRange((prev) => (prev === idx ? null : idx));
    setPage(1);
  };

  const resetFilters = () => {
    setInputQ('');
    setQ('');
    setTags([]);
    setPriceRange(null);
    setSort('newest');
    setPage(1);
  };

  const hasActiveFilter = q || tags.length > 0 || priceRange !== null;

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
                  <h4>TÌM KIẾM</h4>
                  <div style={{ position: 'relative', marginBottom: '20px' }}>
                    <input
                      type="text"
                      value={inputQ}
                      onChange={(e) => setInputQ(e.target.value)}
                      placeholder="Tên sản phẩm..."
                      style={{
                        width: '100%',
                        padding: '9px 12px 9px 36px',
                        border: '1.5px solid var(--line)',
                        borderRadius: '10px',
                        fontSize: '13.5px',
                        background: '#fff',
                        boxSizing: 'border-box',
                      }}
                      aria-label="Tìm kiếm sản phẩm"
                    />
                    <svg
                      style={{ position: 'absolute', left: '11px', top: '50%', transform: 'translateY(-50%)' }}
                      fill="none" height="14" stroke="#5b6b57" strokeWidth="2" viewBox="0 0 24 24" width="14"
                    >
                      <circle cx="11" cy="11" r="7"></circle>
                      <line x1="21" x2="16.65" y1="21" y2="16.65"></line>
                    </svg>
                  </div>

                  <div className="filter-divider"></div>
                  <h4>DANH MỤC</h4>
                  {TAGS.map((tag) => (
                    <label key={tag} className="filter-item">
                      <input
                        type="checkbox"
                        checked={tags.includes(tag)}
                        onChange={() => toggleTag(tag)}
                      />
                      {tag}
                    </label>
                  ))}

                  <div className="filter-divider"></div>
                  <h4>KHOẢNG GIÁ</h4>
                  {PRICE_RANGES.map((range, idx) => (
                    <label key={idx} className="filter-item">
                      <input
                        type="checkbox"
                        checked={priceRange === idx}
                        onChange={() => selectPriceRange(idx)}
                      />
                      {range.label}
                    </label>
                  ))}

                  {hasActiveFilter && (
                    <>
                      <div className="filter-divider"></div>
                      <button
                        onClick={resetFilters}
                        style={{
                          width: '100%',
                          padding: '8px',
                          border: '1.5px solid var(--line)',
                          borderRadius: '8px',
                          background: 'transparent',
                          fontSize: '13px',
                          color: '#5b6b57',
                          cursor: 'pointer',
                        }}
                      >
                        ✕ Xóa bộ lọc
                      </button>
                    </>
                  )}
                </aside>

                {/* PRODUCT LIST */}
                <div>
                  <div className="shop-toolbar">
                    <span className="count">
                      {loading
                        ? 'Đang tải...'
                        : `Hiển thị ${products.length} / ${pagination.total} sản phẩm`}
                    </span>
                    <select
                      className="sort-select"
                      value={sort}
                      onChange={(e) => { setSort(e.target.value); setPage(1); }}
                      aria-label="Sắp xếp sản phẩm"
                    >
                      {SORT_OPTIONS.map((o) => (
                        <option key={o.value} value={o.value}>{o.label}</option>
                      ))}
                    </select>
                  </div>

                  {loading ? (
                    <div style={{ padding: '60px', textAlign: 'center', color: '#5b6b57' }}>
                      Đang tải sản phẩm...
                    </div>
                  ) : loadError ? (
                    <div style={{ padding: '60px', textAlign: 'center', color: 'var(--red)' }}>
                      <p style={{ marginBottom: '16px' }}>{loadError}</p>
                      <button className="btn btn-outline" onClick={fetchProducts}>Thử lại</button>
                    </div>
                  ) : products.length === 0 ? (
                    <div style={{ padding: '60px', textAlign: 'center', color: '#5b6b57' }}>
                      <p style={{ marginBottom: '16px' }}>Không tìm thấy sản phẩm phù hợp.</p>
                      <button className="btn btn-outline" onClick={resetFilters}>Xóa bộ lọc</button>
                    </div>
                  ) : (
                    <div className="prod-grid">
                      {products.map((p) => (
                        <ProductCard key={p.id} product={p} />
                      ))}
                    </div>
                  )}

                  {/* Pagination */}
                  {pagination.totalPages > 1 && (
                    <div className="pagination">
                      {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((p) => (
                        <button
                          key={p}
                          className={page === p ? 'active' : ''}
                          onClick={() => setPage(p)}
                        >
                          {p}
                        </button>
                      ))}
                      {page < pagination.totalPages && (
                        <button onClick={() => setPage((prev) => prev + 1)}>→</button>
                      )}
                    </div>
                  )}
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
