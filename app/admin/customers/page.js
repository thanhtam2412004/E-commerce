'use client';
import { useState } from 'react';
import AdminSidebar from '@/components/AdminSidebar';
import AdminTopbar from '@/components/AdminTopbar';
import { mockCustomers } from '@/data/mockData';

export default function AdminCustomersPage() {
  const [customers] = useState(mockCustomers);

  return (
    <div className="admin-app show">
      <AdminSidebar />
      <div className="admin-main">
        <AdminTopbar title="Quản lý Khách hàng" />
        <div className="admin-content">
          <div className="toolbar">
            <div className="search-box">
              <svg fill="none" height="14" stroke="#5b6b57" strokeWidth="2" viewBox="0 0 24 24" width="14">
                <circle cx="11" cy="11" r="7"></circle>
                <line x1="21" x2="16.65" y1="21" y2="16.65"></line>
              </svg>
              Tìm tên / email / sđt...
            </div>
          </div>

          <table className="data-table">
            <thead>
              <tr>
                <th>Khách hàng</th>
                <th>Email</th>
                <th>Số điện thoại</th>
                <th>Số đơn mua</th>
                <th>Ngày tham gia</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c, i) => (
                <tr key={i}>
                  <td><b>{c.name}</b></td>
                  <td>{c.email}</td>
                  <td>{c.phone}</td>
                  <td>{c.orders}</td>
                  <td>{c.joined}</td>
                  <td>
                    <div className="row-actions">
                      <button title="Xem hồ sơ">👁</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
