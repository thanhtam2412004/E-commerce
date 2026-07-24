'use client';
import { useState, useEffect } from 'react';
import AdminSidebar from '@/components/AdminSidebar';
import AdminTopbar from '@/components/AdminTopbar';

const EMPTY_FORM = { name: '', desc: '' };

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading]       = useState(true);
  const [showModal, setShowModal]   = useState(false);
  const [editing, setEditing]       = useState(null);
  const [form, setForm]             = useState(EMPTY_FORM);
  const [saving, setSaving]         = useState(false);
  const [formErr, setFormErr]       = useState('');

  const fetchCategories = async () => {
    setLoading(true);
    const res  = await fetch('/api/admin/categories');
    const data = await res.json();
    if (data.success) setCategories(data.data);
    setLoading(false);
  };

  useEffect(() => { fetchCategories(); }, []);

  const openCreate = () => { setEditing(null); setForm(EMPTY_FORM); setFormErr(''); setShowModal(true); };
  const openEdit   = (c)  => { setEditing(c); setForm({ name: c.name, desc: c.desc }); setFormErr(''); setShowModal(true); };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true); setFormErr('');
    const url    = editing ? `/api/admin/categories/${editing._id}` : '/api/admin/categories';
    const method = editing ? 'PATCH' : 'POST';
    try {
      const res  = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      const data = await res.json();
      if (!data.success) { setFormErr(data.error); return; }
      setShowModal(false);
      fetchCategories();
    } catch { setFormErr('Lỗi kết nối.'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id, name) => {
    if (!confirm(`Xóa danh mục "${name}"?`)) return;
    await fetch(`/api/admin/categories/${id}`, { method: 'DELETE' });
    fetchCategories();
  };

  return (
    <div className="admin-app show">
      <AdminSidebar />
      <div className="admin-main">
        <AdminTopbar title={`Quản lý Danh mục (${categories.length})`} />
        <div className="admin-content">
          <div className="toolbar">
            <span style={{ color: '#5b6b57', fontSize: '13.5px' }}>{categories.length} danh mục</span>
            <button className="btn btn-primary btn-sm" onClick={openCreate}>+ Thêm danh mục</button>
          </div>
          <table className="data-table">
            <thead><tr><th>Tên danh mục</th><th>Slug</th><th>Mô tả</th><th>Hành động</th></tr></thead>
            <tbody>
              {loading
                ? <tr><td colSpan={4} style={{ textAlign: 'center', padding: '32px', color: '#5b6b57' }}>Đang tải...</td></tr>
                : categories.map((c) => (
                  <tr key={c._id}>
                    <td><b>{c.name}</b></td>
                    <td><code style={{ fontSize: '12px', color: '#5b6b57' }}>{c.slug}</code></td>
                    <td style={{ fontSize: '13px', color: '#5b6b57' }}>{c.desc || '—'}</td>
                    <td>
                      <div className="row-actions">
                        <button title="Sửa" onClick={() => openEdit(c)}>✎</button>
                        <button className="del" title="Xóa" onClick={() => handleDelete(c._id, c.name)}>🗑</button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay show">
          <div className="modal-box">
            <div className="modal-head">
              <h3>{editing ? 'Sửa danh mục' : 'Thêm danh mục mới'}</h3>
              <button onClick={() => setShowModal(false)}>✕</button>
            </div>
            <form onSubmit={handleSave}>
              {formErr && <p style={{ color: '#e74c3c', fontSize: '13px', marginBottom: '8px' }}>{formErr}</p>}
              <div className="field">
                <label>Tên danh mục *</label>
                <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Focus" />
              </div>
              <div className="field">
                <label>Mô tả</label>
                <textarea rows="2" value={form.desc} onChange={(e) => setForm({ ...form, desc: e.target.value })} placeholder="Sản phẩm hỗ trợ tập trung..." />
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
