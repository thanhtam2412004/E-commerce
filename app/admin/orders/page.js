'use client';
import { useState, useEffect, useCallback } from 'react';
import AdminSidebar from '@/components/AdminSidebar';
import AdminTopbar from '@/components/AdminTopbar';

const STATUS_MAP = {
  pending:   { label: 'Chờ xác nhận', cls: 'status-pending',   next: ['confirmed', 'cancelled'] },
  confirmed: { label: 'Đã xác nhận',  cls: 'status-confirmed', next: ['shipping',  'cancelled'] },
  shipping:  { label: 'Đang giao',    cls: 'status-shipping',  next: ['done',      'cancelled'] },
  done:      { label: 'Đã giao',      cls: 'status-done',      next: [] },
  cancelled: { label: 'Đã huỷ',       cls: 'status-cancelled', next: [] },
};
const STATUS_LABELS = { confirmed: 'Xác nhận', shipping: 'Giao hàng', done: 'Hoàn thành', cancelled: 'Huỷ đơn' };
const ALL_STATUSES  = ['', 'pending', 'confirmed', 'shipping', 'done', 'cancelled'];

function formatDate(iso) { return iso ? new Date(iso).toLocaleDateString('vi-VN') : ''; }

export default function AdminOrdersPage() {
  const [orders, setOrders]     = useState([]);
  const [total, setTotal]       = useState(0);
  const [loading, setLoading]   = useState(true);
  const [q, setQ]               = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [page, setPage]         = useState(1);
  const [expanded, setExpanded] = useState(null);
  const [updating, setUpdating] = useState(null);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({ q, page, limit: 20 });
    if (filterStatus) params.set('status', filterStatus);
    const res  = await fetch(`/api/admin/orders?${params}`);
    const data = await res.json();
    if (data.success) { setOrders(data.data); setTotal(data.pagination.total); }
    setLoading(false);
  }, [q, filterStatus, page]);

  useEffect(() => { fetchOrders(); }, [fetchOrders]);

  useEffect(() => {
    const t = setTimeout(() => setPage(1), 400);
    return () => clearTimeout(t);
  }, [q, filterStatus]);

  const handleStatusChange = async (orderId, newStatus) => {
    setUpdating(orderId);
    const res  = await fetch(`/api/admin/orders/${orderId}`, {
      method: 'PATCH', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    });
    const data = await res.json();
    if (data.success) {
      setOrders((prev) => prev.map((o) => o._id === orderId ? { ...o, status: newStatus } : o));
    } else {
      alert(data.error);
    }
    setUpdating(null);
  };

  return (
    <div className="admin-app show">
      <AdminSidebar />
      <div className="admin-main">
        <AdminTopbar title={`Quản lý Đơn hàng (${total})`} />
        <div className="admin-content">

          <div className="toolbar" style={{ flexWrap: 'wrap', gap: '8px' }}>
            <input
              type="text" value={q} onChange={(e) => setQ(e.target.value)}
              placeholder="Mã đơn / tên / email..."
              style={{ padding: '8px 12px', border: '1.5px solid var(--line)', borderRadius: '8px', fontSize: '13.5px', width: '220px' }}
            />
            <select
              value={filterStatus} onChange={(e) => { setFilterStatus(e.target.value); setPage(1); }}
              style={{ padding: '8px 12px', border: '1.5px solid var(--line)', borderRadius: '8px', fontSize: '13.5px' }}
            >
              {ALL_STATUSES.map((s) => (
                <option key={s} value={s}>{s ? STATUS_MAP[s].label : 'Tất cả trạng thái'}</option>
              ))}
            </select>
          </div>

          <table className="data-table">
            <thead>
              <tr><th>Mã đơn</th><th>Khách hàng</th><th>Ngày đặt</th><th>Tổng tiền</th><th>Trạng thái</th><th>Hành động</th></tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6} style={{ textAlign: 'center', padding: '32px', color: '#5b6b57' }}>Đang tải...</td></tr>
              ) : orders.map((o) => {
                const st = STATUS_MAP[o.status] ?? { label: o.status, cls: '', next: [] };
                const isExpanded = expanded === o._id;
                return (
                  <>
                    <tr key={o._id}>
                      <td><b>{o.orderNumber}</b></td>
                      <td>
                        <div>{o.customerInfo?.name}</div>
                        <div style={{ fontSize: '12px', color: '#5b6b57' }}>{o.customerInfo?.phone}</div>
                      </td>
                      <td style={{ fontSize: '13px' }}>{formatDate(o.createdAt)}</td>
                      <td><b>{o.total.toLocaleString('vi-VN')}₫</b></td>
                      <td><span className={`status-pill ${st.cls}`}>{st.label}</span></td>
                      <td>
                        <div className="row-actions" style={{ flexWrap: 'wrap', gap: '4px' }}>
                          <button className="btn-ghost" style={{ fontSize: '12px' }}
                            onClick={() => setExpanded(isExpanded ? null : o._id)}>
                            {isExpanded ? 'Ẩn' : 'Chi tiết'}
                          </button>
                          {st.next.map((ns) => (
                            <button key={ns}
                              className="btn btn-primary btn-sm"
                              style={{ fontSize: '11px', padding: '4px 8px' }}
                              disabled={updating === o._id}
                              onClick={() => handleStatusChange(o._id, ns)}>
                              {STATUS_LABELS[ns] ?? ns}
                            </button>
                          ))}
                        </div>
                      </td>
                    </tr>
                    {isExpanded && (
                      <tr key={`${o._id}-detail`}>
                        <td colSpan={6} style={{ background: 'var(--cream-1)', padding: '12px 16px' }}>
                          <div style={{ fontSize: '13px' }}>
                            <b>Địa chỉ:</b> {o.customerInfo?.address}<br />
                            {o.customerInfo?.note && <><b>Ghi chú:</b> {o.customerInfo.note}<br /></>}
                            <b>Thanh toán:</b> {o.paymentMethod === 'cod' ? 'COD' : 'Chuyển khoản'}<br />
                            <div style={{ marginTop: '8px' }}>
                              {o.items.map((item, i) => (
                                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '3px 0' }}>
                                  <span>{item.name} × {item.qty}</span>
                                  <b>{(item.price * item.qty).toLocaleString('vi-VN')}₫</b>
                                </div>
                              ))}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                );
              })}
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
