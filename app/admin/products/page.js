'use client';
import { useState } from 'react';
import AdminSidebar from '@/components/AdminSidebar';
import AdminTopbar from '@/components/AdminTopbar';
import { mockProducts } from '@/data/mockData';

export default function AdminProductsPage() {
  const [products, setProducts] = useState(mockProducts);
  const [showModal, setShowModal] = useState(false);
  const [newProdName, setNewProdName] = useState('');
  const [newProdPrice, setNewProdPrice] = useState('');
  const [newProdTag, setNewProdTag] = useState('Focus');

  const handleDelete = (id) => {
    if (confirm('Bạn có chắc muốn xóa sản phẩm này?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    const newProd = {
      id: String(Date.now()),
      name: newProdName,
      tag: newProdTag,
      cat: 'Ceremonial Grade',
      price: `${Number(newProdPrice).toLocaleString('vi-VN')}₫`,
      desc: 'Sản phẩm mới thêm vào hệ thống.',
      grad: 'linear-gradient(150deg,#DCE6C8,#B9C9A6)'
    };
    setProducts([newProd, ...products]);
    setShowModal(false);
    setNewProdName('');
    setNewProdPrice('');
  };

  return (
    <div className="admin-app show">
      <AdminSidebar />
      <div className="admin-main">
        <AdminTopbar title="Quản lý Sản phẩm" />
        <div className="admin-content">
          <div className="toolbar">
            <div className="search-box">
              <svg fill="none" height="14" stroke="#5b6b57" strokeWidth="2" viewBox="0 0 24 24" width="14">
                <circle cx="11" cy="11" r="7"></circle>
                <line x1="21" x2="16.65" y1="21" y2="16.65"></line>
              </svg>
              Tìm kiếm sản phẩm...
            </div>
            <button className="btn btn-primary btn-sm" onClick={() => setShowModal(true)}>+ Thêm sản phẩm mới</button>
          </div>

          <table className="data-table">
            <thead>
              <tr>
                <th>Ảnh</th>
                <th>Tên sản phẩm</th>
                <th>Công dụng</th>
                <th>Giá bán</th>
                <th>Tồn kho</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id}>
                  <td><div className="table-thumb" style={{ background: p.grad }}></div></td>
                  <td><b>{p.name}</b></td>
                  <td><span className="cat-label">{p.tag}</span></td>
                  <td><b>{p.price}</b></td>
                  <td>45</td>
                  <td><span className="status-pill status-done">Đang bán</span></td>
                  <td>
                    <div className="row-actions">
                      <button title="Chỉnh sửa">✎</button>
                      <button className="del" title="Xóa" onClick={() => handleDelete(p.id)}>🗑</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {showModal && (
            <div className="modal-overlay show">
              <div className="modal-box">
                <div className="modal-head">
                  <h3>Thêm sản phẩm mới</h3>
                  <button onClick={() => setShowModal(false)}>✕</button>
                </div>
                <form onSubmit={handleAddProduct}>
                  <div className="field">
                    <label>Tên sản phẩm</label>
                    <input type="text" required value={newProdName} onChange={(e) => setNewProdName(e.target.value)} placeholder="Matcha Mộc Châu..." />
                  </div>
                  <div className="field">
                    <label>Công dụng (Tag)</label>
                    <select value={newProdTag} onChange={(e) => setNewProdTag(e.target.value)}>
                      <option value="Focus">Focus</option>
                      <option value="Energy">Energy</option>
                      <option value="Calm">Calm</option>
                      <option value="Beauty">Beauty</option>
                      <option value="Immunity">Immunity</option>
                    </select>
                  </div>
                  <div className="field">
                    <label>Giá bán (VNĐ)</label>
                    <input type="number" required value={newProdPrice} onChange={(e) => setNewProdPrice(e.target.value)} placeholder="285000" />
                  </div>
                  <div className="modal-foot">
                    <button type="button" className="btn btn-outline btn-sm" onClick={() => setShowModal(false)}>Hủy</button>
                    <button type="submit" className="btn btn-primary btn-sm">Lưu sản phẩm</button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
