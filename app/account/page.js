'use client';
import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState('orders');

  return (
    <>
      <Header />
      <main>
        <section className="page active">
          <section className="inner">
            <div className="wrap">
              <div className="breadcrumb">
                <Link href="/">Trang chủ</Link>
                <span className="sep">/</span>
                <span className="cur">Tài khoản của tôi</span>
              </div>

              <div className="account-layout">
                <aside className="account-side">
                  <div className="acct-user">
                    <div className="avatar">A</div>
                    <div>
                      <h4>Anh Vũ</h4>
                      <span>anh.vu@email.com</span>
                    </div>
                  </div>
                  <div className={`acct-tab ${activeTab === 'orders' ? 'active' : ''}`} onClick={() => setActiveTab('orders')}>
                    📦 Đơn hàng của tôi
                  </div>
                  <div className={`acct-tab ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => setActiveTab('profile')}>
                    👤 Thông tin cá nhân
                  </div>
                  <div className={`acct-tab ${activeTab === 'address' ? 'active' : ''}`} onClick={() => setActiveTab('address')}>
                    📍 Sổ địa chỉ
                  </div>
                  <div className="acct-tab" style={{ color: 'var(--red)' }}>
                    ↩ Đăng xuất
                  </div>
                </aside>

                <div>
                  {activeTab === 'orders' && (
                    <div className="card-block">
                      <h3>Lịch sử đơn hàng</h3>
                      <div className="order-row">
                        <div>
                          <b>#GA-1042</b>
                          <div style={{ fontSize: '12px', color: '#5b6b57' }}>20/07/2026 — 2 sản phẩm</div>
                        </div>
                        <span className="status-pill status-done">Đã giao</span>
                        <b>1.050.000₫</b>
                        <button className="btn-ghost" style={{ fontSize: '12.5px' }}>Chi tiết</button>
                      </div>
                      <div className="order-row">
                        <div>
                          <b>#GA-1035</b>
                          <div style={{ fontSize: '12px', color: '#5b6b57' }}>02/06/2026 — 1 sản phẩm</div>
                        </div>
                        <span className="status-pill status-done">Đã giao</span>
                        <b>320.000₫</b>
                        <button className="btn-ghost" style={{ fontSize: '12.5px' }}>Chi tiết</button>
                      </div>
                    </div>
                  )}

                  {activeTab === 'profile' && (
                    <div className="card-block">
                      <h3>Thông tin cá nhân</h3>
                      <div className="field-row">
                        <div className="field">
                          <label>Họ và tên</label>
                          <input type="text" defaultValue="Anh Vũ" />
                        </div>
                        <div className="field">
                          <label>Số điện thoại</label>
                          <input type="tel" defaultValue="0901 234 506" />
                        </div>
                      </div>
                      <div className="field">
                        <label>Địa chỉ Email</label>
                        <input type="email" defaultValue="anh.vu@email.com" disabled />
                      </div>
                      <button className="btn btn-primary" onClick={() => alert('Cập nhật thông tin thành công!')}>Lưu thay đổi</button>
                    </div>
                  )}

                  {activeTab === 'address' && (
                    <div className="card-block">
                      <h3>Sổ địa chỉ</h3>
                      <div style={{ padding: '16px', border: '1.5px solid var(--line)', borderRadius: '12px', marginBottom: '16px' }}>
                        <div style={{ fontWeight: 700, marginBottom: '4px' }}>Địa chỉ mặc định</div>
                        <p style={{ fontSize: '13.5px', color: '#5b6b57' }}>Anh Vũ — 0901 234 506<br />123 Đường Lê Lợi, Phường Bến Thành, Quận 1, TP.HCM</p>
                      </div>
                      <button className="btn btn-outline">+ Thêm địa chỉ mới</button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        </section>
      </main>
      <Footer />
    </>
  );
}
