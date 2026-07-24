'use client';
import { useState, useEffect, useCallback } from 'react';
import AdminSidebar from '@/components/AdminSidebar';
import AdminTopbar from '@/components/AdminTopbar';

const TAGS = ['Focus', 'Energy', 'Calm', 'Beauty', 'Immunity'];
const EMPTY_FORM = { name: '', tag: 'Focus', cat: '', desc: '', price: '', stock: '', grad: '', isFeatured: false };

export default function AdminProductsPage() {
  const [products, setProducts]   = useState([]);
  const [total, setTotal]         = useState(0);
  const [loading, setLoading]     = useState(true);
  const [q, setQ]                 = useState('');
  const [page, setPage]           = useState(1);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing]     = useState(null); // product đang edit
  const [form, setForm]           = useState(EMPTY_FORM);
  const [saving, setSaving]       = useState(false);
  const [formErr, setFormErr]     = useState('');

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({ q, page, limit: 20 });
    const res  = await fetch(`/api/admin/products?${params}`);
    const data = await res.json();
    if (data.success) { setProducts(data.data); setTotal(data.pagination.total); }
    setLoading(false);
  }, [q, page]);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  // Debounce search
  useEffect(() => {
    const t = setTimeout(() => setPage(1), 400);
    return () => clearTimeout(t);
  }, [q]);

  const openCreate = () => { setEditing(null); setForm(EMPTY_FORM); setFormErr(''); setShowModal(true); };
  const openEdit   = (p)  => {
    setEditing(p);
    setForm({ name: p.name, tag: p.tag, cat: p.cat, desc: p.desc, price: p.price, stock: p.stock, grad: p.grad, isFeatured: p.isFeatured ?? false });
    setFormErr('');
    setShowModal(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true); setFormErr('');
    const body = { ...form, price: Number(form.price), stock: Number(form.stock) };
    const url    = editing ? `/api/admin/products/${editing._id}` : '/api/admin/products';
    const method = editing ? 'PATCH' : 'POST';
    try {
      const res  = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      const data = await res.json();
      if (!data.success) { setFormErr(data.error); return; }
      setShowModal(false);
      fetchProducts();
    } catch { setFormErr('Lỗi kết nối.'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id, name) => {
    if (!confirm(`Xóa sản phẩm "${name}"?`)) return;
    await fetch(`/api/admin/products/${id}`, { method: 'DELETE' });
    fetchProducts();
  };

  return (
    <div className="admin-app show">
      <AdminSidebar />
      <div className="admin-main">
        <AdminTopbar title={`Quản lý Sản phẩm (${total})`} />
        <div className="admin-content">

          <div className="toolbar">
            <input
              type="text" value={q} onChange={(e) => setQ(e.target.value)}
              placeholder="Tìm tên sản phẩm..."
              style={{ padding: '8px 12px', border: '1.5px solid var(--line)', borderRadius: '8px', fontSize: '13.5px', width: '240px' }}
            />
            <button className="btn btn-primary btn-sm" onClick={openCreate}>+ Thêm sản phẩm</button>
          </div>

          <table className="data-table">
            <thead>
              <tr>
                <th>Ảnh</th><th>Tên sản phẩm</th><th>Tag</th>
                <th>Giá bán</th><th>Tồn kho</th><th>Nổi bật</th><th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={7} style={{ textAlign: 'center', padding: '32px', color: '#5b6b57' }}>Đang tải...</td></tr>
              ) : products.map((p) => (
                <tr key={p._id}>
                  <td><div className="table-thumb" style={{ background: p.grad || '#DCE6C8' }}></div></td>
                  <td><b>{p.name}</b><div style={{ fontSize: '12px', color: '#5b6b57' }}>{p.cat}</div></td>
                  <td><span className="cat-label">{p.tag}</span></td>
                  <td><b>{p.price.toLocaleString('vi-VN')}₫</b></td>
                  <td style={{ color: p.stock < 5 ? '#e74c3c' : undefined }}>{p.stock}</td>
                  <td>{p.isFeatured ? '⭐' : '—'}</td>
                  <td>
                    <div className="row-actions">
                      <button title="Sửa" onClick={() => openEdit(p)}>✎</button>
                      <button className="del" title="Xóa" onClick={() => handleDelete(p._id, p.name)}>🗑</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          {Math.ceil(total / 20) > 1 && (
            <div className="pagination" style={{ marginTop: '16px' }}>
              {Array.from({ length: Math.ceil(total / 20) }, (_, i) => (
                <button key={i} className={page === i + 1 ? 'active' : ''} onClick={() => setPage(i + 1)}>{i + 1}</button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal Create/Edit */}
      {showModal && (
        <div className="modal-overlay show">
          <div className="modal-box">
            <div className="modal-head">
              <h3>{editing ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}</h3>
              <button onClick={() => setShowModal(false)}>✕</button>
            </div>
            <form onSubmit={handleSave}>
              {formErr && <p style={{ color: '#e74c3c', fontSize: '13px', marginBottom: '8px' }}>{formErr}</p>}
              <div className="field">
                <label>Tên sản phẩm *</label>
                <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Matcha Mộc Châu..." />
              </div>
              <div className="field-row">
                <div className="field">
                  <label>Tag *</label>
                  <select value={form.tag} onChange={(e) => setForm({ ...form, tag: e.target.value })}>
                    {TAGS.map((t) => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div className="field">
                  <label>Phân loại</label>
                  <input type="text" value={form.cat} onChange={(e) => setForm({ ...form, cat: e.target.value })} placeholder="Ceremonial Grade" />
                </div>
              </div>
              <div className="field-row">
                <div className="field">
                  <label>Giá bán (₫) *</label>
                  <input type="number" required min="0" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="285000" />
                </div>
                <div className="field">
                  <label>Tồn kho</label>
                  <input type="number" min="0" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} placeholder="50" />
                </div>
              </div>
              <div className="field">
                <label>Mô tả</label>
                <textarea rows="2" value={form.desc} onChange={(e) => setForm({ ...form, desc: e.target.value })} placeholder="Mô tả ngắn..." />
              </div>
              <div className="checkbox-row">
                <input type="checkbox" id="featured" checked={form.isFeatured} onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })} />
                <label htmlFor="featured">Sản phẩm nổi bật</label>
              </div>
              <div className="modal-foot">
                <button type="button" className="btn btn-outline btn-sm" onClick={() => setShowModal(false)}>Hủy</button>
                <button type="submit" className="btn btn-primary btn-sm" disabled={saving}>{saving ? 'Đang lưu...' : 'Lưu'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
