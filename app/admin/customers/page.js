'use client';
import { useState, useEffect, useCallback } from 'react';
import AdminSidebar from '@/components/AdminSidebar';
import AdminTopbar from '@/components/AdminTopbar';

function formatDate(iso) { return iso ? new Date(iso).toLocaleDateString('vi-VN') : ''; }

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [total, setTotal]         = useState(0);
  const [loading, setLoading]     = useState(true);
  const [q, setQ]                 = useState('');
  const [page, setPage]           = useState(1);

  const fetchCustomers = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({ q, page, limit: 20 });
    const res  = await fetch(`/api/admin/customers?${params}`);
    const data = await res.json();
    if (data.success) { setCustomers(data.data); setTotal(data.pagination.total); }
    setLoading(false);
  }, [q, page]);

  useEffect(() => { fetchCustomers(); }, [fetchCustomers]);
  useEffect(() => { const t = setTimeout(() => setPage(1), 400); return () => clearTimeout(t); }, [q]);

  return (
    <div className="admin-app show">
      <AdminSidebar />
      <div className="admin-main">
        <AdminTopbar title={`Quản lý Khách hàng (${total})`} />
        <div className="admin-content">
          <div className="toolbar">
            <input
              type="text" value={q} onChange={(e) => setQ(e.target.value)}
              placeholder="Tên / email / số điện thoại..."
              style={{ padding: '8px 12px', border: '1.5px solid var(--line)', borderRadius: '8px', fontSize: '13.5px', width: '260px' }}
            />
          </div>
          <table className="data-table">
            <thead><tr><th>Khách hàng</th><th>Email</th><th>Số điện thoại</th><th>Đơn hàng</th><th>Ngày tham gia</th></tr></thead>
            <tbody>
              {loading
                ? <tr><td colSpan={5} style={{ textAlign: 'center', padding: '32px', color: '#5b6b57' }}>Đang tải...</td></tr>
                : customers.length === 0
                  ? <tr><td colSpan={5} style={{ textAlign: 'center', padding: '32px', color: '#5b6b57' }}>Không tìm thấy khách hàng.</td></tr>
                  : customers.map((c) => (
                    <tr key={c._id}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--matcha)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '13px', fontWeight: 700, flexShrink: 0 }}>
                            {c.name?.charAt(0)?.toUpperCase()}
                          </div>
                          <b>{c.name}</b>
                        </div>
                      </td>
                      <td style={{ fontSize: '13px' }}>{c.email}</td>
                      <td style={{ fontSize: '13px' }}>{c.phone || '—'}</td>
                      <td><span className="status-pill status-confirmed">{c.orderCount} đơn</span></td>
                      <td style={{ fontSize: '13px' }}>{formatDate(c.createdAt)}</td>
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
    </div>
  );
}
