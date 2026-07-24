'use client';
import { useState } from 'react';
import AdminSidebar from '@/components/AdminSidebar';
import AdminTopbar from '@/components/AdminTopbar';
import { mockBlogs } from '@/data/mockData';

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState(mockBlogs);

  const handleDelete = (id) => {
    if (confirm('Bạn có chắc muốn xóa bài viết này?')) {
      setBlogs(blogs.filter(b => b.id !== id));
    }
  };

  return (
    <div className="admin-app show">
      <AdminSidebar />
      <div className="admin-main">
        <AdminTopbar title="Quản lý Bài viết Blog" />
        <div className="admin-content">
          <div className="toolbar">
            <div className="search-box">
              <svg fill="none" height="14" stroke="#5b6b57" strokeWidth="2" viewBox="0 0 24 24" width="14">
                <circle cx="11" cy="11" r="7"></circle>
                <line x1="21" x2="16.65" y1="21" y2="16.65"></line>
              </svg>
              Tìm tiêu đề bài viết...
            </div>
            <button className="btn btn-primary btn-sm">+ Viết bài mới</button>
          </div>

          <table className="data-table">
            <thead>
              <tr>
                <th>Ảnh bìa</th>
                <th>Tiêu đề bài viết</th>
                <th>Ngày đăng</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((b, i) => (
                <tr key={b.id}>
                  <td><div className="table-thumb" style={{ background: b.grad }}></div></td>
                  <td><b>{b.title}</b></td>
                  <td>{b.date}</td>
                  <td>
                    <span className={`status-pill ${i < 4 ? 'status-done' : 'status-pending'}`}>
                      {i < 4 ? 'Đã đăng' : 'Nháp'}
                    </span>
                  </td>
                  <td>
                    <div className="row-actions">
                      <button title="Sửa">✎</button>
                      <button className="del" title="Xóa" onClick={() => handleDelete(b.id)}>🗑</button>
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
