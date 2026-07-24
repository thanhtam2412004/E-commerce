'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const STATUS_MAP = {
  pending:   { label: 'Chờ xác nhận', cls: 'status-pending' },
  confirmed: { label: 'Đã xác nhận',  cls: 'status-confirmed' },
  shipping:  { label: 'Đang giao',    cls: 'status-shipping' },
  done:      { label: 'Đã giao',      cls: 'status-done' },
  cancelled: { label: 'Đã huỷ',       cls: 'status-cancelled' },
};

function formatDate(isoStr) {
  if (!isoStr) return '';
  return new Date(isoStr).toLocaleDateString('vi-VN', {
    day: '2-digit', month: '2-digit', year: 'numeric',
  });
}

export default function AccountPage() {
  const router = useRouter();
  const [activeTab, setActiveTab]   = useState('orders');

  // User & orders data
  const [user, setUser]             = useState(null);
  const [orders, setOrders]         = useState([]);
  const [loadingUser, setLoadingUser]     = useState(true);
  const [loadingOrders, setLoadingOrders] = useState(false);

  // Profile form
  const [profileForm, setProfileForm] = useState({ name: '', phone: '' });
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileMsg, setProfileMsg]   = useState('');

  // Order detail expand
  const [expandedOrder, setExpandedOrder] = useState(null);

  // ── Load user on mount ──────────────────────────────────────────────────
  useEffect(() => {
    fetch('/api/account/me')
      .then((r) => r.json())
      .then((data) => {
        if (!data.success) {
          // Chưa login → redirect
          router.push('/login');
          return;
        }
        setUser(data.user);
        setProfileForm({ name: data.user.name, phone: data.user.phone || '' });
      })
      .catch(() => router.push('/login'))
      .finally(() => setLoadingUser(false));
  }, [router]);

  // ── Load orders khi chuyển tab ──────────────────────────────────────────
  useEffect(() => {
    if (activeTab !== 'orders' || !user) return;
    setLoadingOrders(true);
    fetch('/api/account/orders')
      .then((r) => r.json())
      .then((data) => {
        if (data.success) setOrders(data.orders);
      })
      .catch(() => {})
      .finally(() => setLoadingOrders(false));
  }, [activeTab, user]);

  // ── Logout ───────────────────────────────────────────────────────────────
  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/');
    router.refresh();
  };

  // ── Save profile ─────────────────────────────────────────────────────────
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setProfileSaving(true);
    setProfileMsg('');
    try {
      const res = await fetch('/api/account/me', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileForm),
      });
      const data = await res.json();
      if (data.success) {
        setUser((u) => ({ ...u, name: data.user.name, phone: data.user.phone }));
        setProfileMsg('✓ Cập nhật thành công!');
      } else {
        setProfileMsg(data.error || 'Có lỗi xảy ra.');
      }
    } catch {
      setProfileMsg('Có lỗi xảy ra.');
    } finally {
      setProfileSaving(false);
      setTimeout(() => setProfileMsg(''), 3000);
    }
  };

  // ── Loading skeleton ─────────────────────────────────────────────────────
  if (loadingUser) {
    return (
      <>
        <Header />
        <main>
          <section className="page active">
            <section className="inner">
              <div className="wrap" style={{ padding: '80px 0', textAlign: 'center', color: '#5b6b57' }}>
                Đang tải...
              </div>
            </section>
          </section>
        </main>
        <Footer />
      </>
    );
  }

  if (!user) return null;

  const avatarChar = user.name?.charAt(0)?.toUpperCase() || '?';

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
                {/* SIDEBAR */}
                <aside className="account-side">
                  <div className="acct-user">
                    <div className="avatar">{avatarChar}</div>
                    <div>
                      <h4>{user.name}</h4>
                      <span>{user.email}</span>
                    </div>
                  </div>

                  {[
                    { key: 'orders',  icon: '📦', label: 'Đơn hàng của tôi' },
                    { key: 'profile', icon: '👤', label: 'Thông tin cá nhân' },
                    { key: 'address', icon: '📍', label: 'Sổ địa chỉ' },
                  ].map(({ key, icon, label }) => (
                    <div
                      key={key}
                      className={`acct-tab ${activeTab === key ? 'active' : ''}`}
                      onClick={() => setActiveTab(key)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => e.key === 'Enter' && setActiveTab(key)}
                    >
                      {icon} {label}
                    </div>
                  ))}

                  <div
                    className="acct-tab"
                    style={{ color: 'var(--red, #c0392b)', cursor: 'pointer' }}
                    onClick={handleLogout}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && handleLogout()}
                  >
                    ↩ Đăng xuất
                  </div>
                </aside>

                {/* MAIN CONTENT */}
                <div>

                  {/* ── Tab: Đơn hàng ── */}
                  {activeTab === 'orders' && (
                    <div className="card-block">
                      <h3>Lịch sử đơn hàng</h3>

                      {loadingOrders ? (
                        <p style={{ color: '#5b6b57', padding: '20px 0' }}>Đang tải đơn hàng...</p>
                      ) : orders.length === 0 ? (
                        <div style={{ padding: '32px 0', textAlign: 'center' }}>
                          <p style={{ color: '#5b6b57', marginBottom: '16px' }}>Bạn chưa có đơn hàng nào.</p>
                          <Link href="/shop" className="btn btn-primary">Khám phá sản phẩm</Link>
                        </div>
                      ) : (
                        orders.map((order) => {
                          const st = STATUS_MAP[order.status] ?? { label: order.status, cls: '' };
                          const isExpanded = expandedOrder === order._id;
                          return (
                            <div key={order._id} style={{ marginBottom: '12px' }}>
                              <div className="order-row">
                                <div>
                                  <b>{order.orderNumber}</b>
                                  <div style={{ fontSize: '12px', color: '#5b6b57' }}>
                                    {formatDate(order.createdAt)} — {order.items.length} sản phẩm
                                  </div>
                                </div>
                                <span className={`status-pill ${st.cls}`}>{st.label}</span>
                                <b>{order.total.toLocaleString('vi-VN')}₫</b>
                                <button
                                  className="btn-ghost"
                                  style={{ fontSize: '12.5px' }}
                                  onClick={() => setExpandedOrder(isExpanded ? null : order._id)}
                                >
                                  {isExpanded ? 'Ẩn' : 'Chi tiết'}
                                </button>
                              </div>

                              {/* Order detail expand */}
                              {isExpanded && (
                                <div style={{
                                  margin: '8px 0 0',
                                  padding: '16px',
                                  background: 'var(--cream-1, #f9f7f3)',
                                  borderRadius: '12px',
                                  border: '1px solid var(--line)',
                                }}>
                                  {order.items.map((item, i) => (
                                    <div key={i} style={{
                                      display: 'flex', justifyContent: 'space-between',
                                      fontSize: '13.5px', padding: '4px 0',
                                    }}>
                                      <span>{item.name} × {item.qty}</span>
                                      <b>{(item.price * item.qty).toLocaleString('vi-VN')}₫</b>
                                    </div>
                                  ))}
                                  <div style={{
                                    display: 'flex', justifyContent: 'space-between',
                                    fontSize: '13px', color: '#5b6b57',
                                    borderTop: '1px solid var(--line)', marginTop: '8px', paddingTop: '8px',
                                  }}>
                                    <span>Phí vận chuyển</span>
                                    <span>{order.shipping.toLocaleString('vi-VN')}₫</span>
                                  </div>
                                  <div style={{
                                    display: 'flex', justifyContent: 'space-between',
                                    fontWeight: 700, marginTop: '4px',
                                  }}>
                                    <span>Tổng cộng</span>
                                    <span>{order.total.toLocaleString('vi-VN')}₫</span>
                                  </div>
                                  <div style={{ fontSize: '12px', color: '#5b6b57', marginTop: '8px' }}>
                                    Giao đến: {order.customerInfo?.address}
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })
                      )}
                    </div>
                  )}

                  {/* ── Tab: Profile ── */}
                  {activeTab === 'profile' && (
                    <div className="card-block">
                      <h3>Thông tin cá nhân</h3>
                      <form onSubmit={handleSaveProfile}>
                        <div className="field-row">
                          <div className="field">
                            <label htmlFor="acc-name">Họ và tên</label>
                            <input
                              id="acc-name"
                              type="text"
                              value={profileForm.name}
                              onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                              required
                            />
                          </div>
                          <div className="field">
                            <label htmlFor="acc-phone">Số điện thoại</label>
                            <input
                              id="acc-phone"
                              type="tel"
                              value={profileForm.phone}
                              onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                              placeholder="0901 234 567"
                            />
                          </div>
                        </div>
                        <div className="field">
                          <label>Địa chỉ Email</label>
                          <input type="email" value={user.email} disabled />
                        </div>
                        {profileMsg && (
                          <p style={{
                            color: profileMsg.startsWith('✓') ? 'var(--matcha, #6B8E4E)' : 'var(--red, #c0392b)',
                            fontSize: '13.5px', marginBottom: '8px',
                          }}>
                            {profileMsg}
                          </p>
                        )}
                        <button
                          type="submit"
                          className="btn btn-primary"
                          disabled={profileSaving}
                        >
                          {profileSaving ? 'Đang lưu...' : 'Lưu thay đổi'}
                        </button>
                      </form>
                    </div>
                  )}

                  {/* ── Tab: Address ── */}
                  {activeTab === 'address' && (
                    <div className="card-block">
                      <h3>Sổ địa chỉ</h3>
                      {/* Lấy địa chỉ từ đơn hàng gần nhất */}
                      {orders.length > 0 && orders[0].customerInfo?.address ? (
                        <div style={{
                          padding: '16px', border: '1.5px solid var(--line)',
                          borderRadius: '12px', marginBottom: '16px',
                        }}>
                          <div style={{ fontWeight: 700, marginBottom: '4px' }}>Địa chỉ gần nhất</div>
                          <p style={{ fontSize: '13.5px', color: '#5b6b57' }}>
                            {orders[0].customerInfo.name} — {orders[0].customerInfo.phone}<br />
                            {orders[0].customerInfo.address}
                          </p>
                        </div>
                      ) : (
                        <p style={{ color: '#5b6b57', marginBottom: '16px', fontSize: '13.5px' }}>
                          Chưa có địa chỉ. Địa chỉ sẽ được lưu sau khi bạn đặt hàng.
                        </p>
                      )}
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
