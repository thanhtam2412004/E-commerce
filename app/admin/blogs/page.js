'use client';
import { useState, useEffect, useCallback } from 'react';
import AdminSidebar from '@/components/AdminSidebar';
import AdminTopbar from '@/components/AdminTopbar';

const EMPTY_FORM = { title: '', desc: '', content: '', grad: '', status: 'draft' };

export default function AdminBlogsPage() {
  const [blogs, setBlogs]         = useState([]);
  const [total, setTotal]         = useState(0);
  const [loading, setLoading]     = useState(true);
  const [q, setQ]                 = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [page, setPage]           = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing]     = useState(null);
  const [form, setForm]           = useState(EMPTY_FORM);
  const [saving, setSaving]       = useState(false);
  const [formErr, setFormErr]     = useState('');

  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({ q, page, limit: 20 });
    if (filterStatus) params.set('status', filterStatus);
    const res  = await fetch(`/api/admin/blogs?${params}`);
    const data = await res.json();
    if (data.success) { setBlogs(data.data); setTotal(data.pagination.total); }
    setLoading(false);
  }, [q, filterStatus, page]);

  useEffect(() => { fetchBlogs(); }, [fetchBlogs]);
  useEffect(() => { const t = setTimeout(() => setPage(1), 400); return () => clearTimeout(t); }, [q, filterStatus]);

  const openCreate = () => { setEditing(null); setForm(EMPTY_FORM); setFormErr(''); setShowModal(true); };
  const openEdit   = (b)  => {
    setEditing(b);
    setForm({ title: b.title, desc: b.desc, content: b.content, grad: b.grad, status: b.status });
    setFormErr(''); setShowModal(true);
  };

  const handleSave = async (e) => {
    e.preventDefault(); setSaving(true); setFormErr('');
    const url    = editing ? `/api/admin/blogs/${editing._id}` : '/api/admin/blogs';
    const method = editing ? 'PATCH' : 'POST';
    try {
      const res  = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      const data = await res.json();
      if (!data.success) { setFormErr(data.error); return; }
      setShowModal(false); fetchBlogs();
    } catch { setFormErr('Lỗi kết nối.'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id, title) => {
    if (!confirm(`Xóa bài viết "${title}"?`)) return;
    await fetch(`/api/admin/blogs/${id}`, { method: 'DELETE' });
    fetchBlogs();
  };

  const toggleStatus = async (b) => {
    const newStatus = b.status === 'published' ? 'draft' : 'published';
    await fetch(`/api/admin/blogs/${b._id}`, {
      method: 'PATCH', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    });
    fetchBlogs();
  };

  return (
    <div className="admin-app show">
      <AdminSidebar />
      <div className="admin-main">
        <AdminTopbar title={`Quản lý Blog (${total})`} />
        <div className="admin-content">

          <div className="toolbar">
            <input
              type="text" value={q} onChange={(e) => setQ(e.target.value)}
              placeholder="Tìm tiêu đề..."
              style={{ padding: '8px 12px', border: '1.5px solid var(--line)', borderRadius: '8px', fontSize: '13.5px', width: '220px' }}
            />
            <select
              value={filterStatus} onChange={(e) => { setFilterStatus(e.target.value); setPage(1); }}
              style={{ padding: '8px 12px', border: '1.5px solid var(--line)', borderRadius: '8px', fontSize: '13.5px' }}
            >
              <option value="">Tất cả</option>
              <option value="published">Đã đăng</option>
              <option value="draft">Nháp</option>
            </select>
            <button className="btn btn-primary btn-sm" onClick={openCreate}>+ Viết bài mới</button>
          </div>

          <table className="data-table">
            <thead><tr><th>Ảnh bìa</th><th>Tiêu đề</th><th>Ngày đăng</th><th>Trạng thái</th><th>Hành động</th></tr></thead>
            <tbody>
              {loading
                ? <tr><td colSpan={5} style={{ textAlign: 'center', padding: '32px', color: '#5b6b57' }}>Đang tải...</td></tr>
                : blogs.map((b) => (
                  <tr key={b._id}>
                    <td><div className="table-thumb" style={{ background: b.grad || '#DCE6C8' }}></div></td>
                    <td>
                      <b style={{ fontSize: '13.5px' }}>{b.title}</b>
                      <div style={{ fontSize: '12px', color: '#5b6b57', marginTop: '2px' }}>{b.desc}</div>
                    </td>
                    <td style={{ fontSize: '13px' }}>{b.date}</td>
                    <td>
                      <span className={`status-pill ${b.status === 'published' ? 'status-done' : 'status-pending'}`}>
                        {b.status === 'published' ? 'Đã đăng' : 'Nháp'}
                      </span>
                    </td>
                    <td>
                      <div className="row-actions">
                        <button title="Sửa" onClick={() => openEdit(b)}>✎</button>
                        <button
                          title={b.status === 'published' ? 'Chuyển về Nháp' : 'Đăng bài'}
                          onClick={() => toggleStatus(b)}
                          style={{ fontSize: '14px' }}
                        >{b.status === 'published' ? '⬇' : '📢'}</button>
                        <button className="del" title="Xóa" onClick={() => handleDelete(b._id, b.title)}>🗑</button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

          {Math.ceil(total / 20) > 1 && (
            <div className="pagination" style={{ marginTop: '16px' }}>
              {Array.from({ length: Math.ceil(total / 20) }, (_, i) => (
                <button key={i} className={page === i + 1 ? 'active' : ''} onClick={() => setPage(i + 1)}>{i + 1}</button>
              ))}
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay show">
          <div className="modal-box" style={{ maxWidth: '600px' }}>
            <div className="modal-head">
              <h3>{editing ? 'Sửa bài viết' : 'Viết bài mới'}</h3>
              <button onClick={() => setShowModal(false)}>✕</button>
            </div>
            <form onSubmit={handleSave}>
              {formErr && <p style={{ color: '#e74c3c', fontSize: '13px', marginBottom: '8px' }}>{formErr}</p>}
              <div className="field">
                <label>Tiêu đề *</label>
                <input type="text" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Tiêu đề bài viết..." />
              </div>
              <div className="field">
                <label>Mô tả ngắn</label>
                <input type="text" value={form.desc} onChange={(e) => setForm({ ...form, desc: e.target.value })} placeholder="Tóm tắt bài viết..." />
              </div>
              <div className="field">
                <label>Nội dung</label>
                <textarea rows="5" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} placeholder="Nội dung bài viết..." />
              </div>
              <div className="field">
                <label>Trạng thái</label>
                <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                  <option value="draft">Nháp</option>
                  <option value="published">Đăng ngay</option>
                </select>
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
