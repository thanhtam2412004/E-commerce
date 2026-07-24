'use client';
import { useState } from 'react';
import AdminSidebar from '@/components/AdminSidebar';
import AdminTopbar from '@/components/AdminTopbar';
import { mockCategories } from '@/data/mockData';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState(mockCategories);

  return (
    <div className="admin-app show">
      <AdminSidebar />
      <div className="admin-main">
        <AdminTopbar title="Quản lý Danh mục" />
        <div className="admin-content">
          <div className="toolbar">
            <div className="search-box">
              <svg fill="none" height="14" stroke="#5b6b57" strokeWidth="2" viewBox="0 0 24 24" width="14">
                <circle cx="11" cy="11" r="7"></circle>
                <line x1="21" x2="16.65" y1="21" y2="16.65"></line>
              </svg>
              Tìm danh mục...
            </div>
            <button className="btn btn-primary btn-sm">+ Thêm danh mục</button>
          </div>

          <table className="data-table">
            <thead>
              <tr>
                <th>Tên danh mục</th>
                <th>Mô tả</th>
                <th>Số sản phẩm</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((c, i) => (
                <tr key={i}>
                  <td><b>{c.name}</b></td>
                  <td>{c.desc}</td>
                  <td>{c.count}</td>
                  <td>
                    <div className="row-actions">
                      <button title="Sửa">✎</button>
                      <button className="del" title="Xóa">🗑</button>
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
