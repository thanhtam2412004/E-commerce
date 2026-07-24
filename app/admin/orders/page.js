'use client';
import { useState } from 'react';
import AdminSidebar from '@/components/AdminSidebar';
import AdminTopbar from '@/components/AdminTopbar';
import { mockOrders } from '@/data/mockData';

export default function AdminOrdersPage() {
  const [orders] = useState(mockOrders);

  return (
    <div className="admin-app show">
      <AdminSidebar />
      <div className="admin-main">
        <AdminTopbar title="Quản lý Đơn hàng" />
        <div className="admin-content">
          <div className="toolbar">
            <div className="search-box">
              <svg fill="none" height="14" stroke="#5b6b57" strokeWidth="2" viewBox="0 0 24 24" width="14">
                <circle cx="11" cy="11" r="7"></circle>
                <line x1="21" x2="16.65" y1="21" y2="16.65"></line>
              </svg>
              Mã đơn / Tên khách hàng...
            </div>
          </div>

          <table className="data-table">
            <thead>
              <tr>
                <th>Mã đơn</th>
                <th>Khách hàng</th>
                <th>Ngày đặt</th>
                <th>Tổng tiền</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id}>
                  <td><b>{o.id}</b></td>
                  <td>{o.customer}</td>
                  <td>{o.date}</td>
                  <td><b>{o.total}</b></td>
                  <td><span className={`status-pill ${o.statusClass}`}>{o.status}</span></td>
                  <td><button className="btn-ghost" style={{ fontSize: '12.5px' }}>Xem chi tiết</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
