'use client';
import { useEffect, useState } from 'react';
import AdminSidebar from '@/components/AdminSidebar';
import AdminTopbar from '@/components/AdminTopbar';

const STATUS_MAP = {
  pending:   { label: 'Chờ xác nhận', cls: 'status-pending' },
  confirmed: { label: 'Đã xác nhận',  cls: 'status-confirmed' },
  shipping:  { label: 'Đang giao',    cls: 'status-shipping' },
  done:      { label: 'Đã giao',      cls: 'status-done' },
  cancelled: { label: 'Đã huỷ',       cls: 'status-cancelled' },
};

function fmt(n) { return (n ?? 0).toLocaleString('vi-VN'); }
function fmtM(n) { return ((n ?? 0) / 1_000_000).toFixed(1) + 'tr₫'; }

export default function AdminDashboardPage() {
  const [stats, setStats] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [monthly, setMonthly] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/dashboard')
      .then((r) => r.json())
      .then((d) => {
        if (d.success) {
          setStats(d.stats);
          setRecentOrders(d.recentOrders);
          setMonthly(d.monthlyRevenue);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const maxRevenue = monthly.reduce((m, r) => Math.max(m, r.revenue), 1);

  return (
    <div className="admin-app show">
      <AdminSidebar />
      <div className="admin-main">
        <AdminTopbar title="Dashboard Overview" />
        <div className="admin-content">

          {/* ── Stat Cards ── */}
          <div className="stat-grid">
            <div className="stat-card">
              <div className="lbl">Tổng doanh thu</div>
              <div className="val">{loading ? '...' : fmtM(stats?.totalRevenue)}</div>
              <div className="delta" style={{ color: stats?.revenueGrowth >= 0 ? undefined : '#e74c3c' }}>
                {stats?.revenueGrowth != null
                  ? `${stats.revenueGrowth >= 0 ? '▲' : '▼'} ${Math.abs(stats.revenueGrowth)}% so với tháng trước`
                  : 'Tháng đầu tiên'}
              </div>
            </div>
            <div className="stat-card">
              <div className="lbl">Tổng đơn hàng</div>
              <div className="val">{loading ? '...' : fmt(stats?.totalOrders)}</div>
              <div className="delta">
                {stats?.orderGrowth != null
                  ? `${stats.orderGrowth >= 0 ? '▲' : '▼'} ${Math.abs(stats.orderGrowth)}% so với tháng trước`
                  : `Tháng này: ${stats?.thisMonthOrders ?? 0}`}
              </div>
            </div>
            <div className="stat-card">
              <div className="lbl">Tổng khách hàng</div>
              <div className="val">{loading ? '...' : fmt(stats?.totalCustomers)}</div>
              <div className="delta">▲ {stats?.thisMonthCustomers ?? 0} mới tháng này</div>
            </div>
            <div className="stat-card">
              <div className="lbl">Sản phẩm đang bán</div>
              <div className="val">{loading ? '...' : fmt(stats?.totalProducts)}</div>
              <div className="delta" style={{ color: '#8b9584' }}>Ổn định</div>
            </div>
          </div>

          <div className="chart-grid">
            {/* ── Bar chart doanh thu 6 tháng ── */}
            <div className="chart-card">
              <h4>Doanh thu theo tháng (Triệu VNĐ)</h4>
              <div className="bar-chart">
                {monthly.length === 0
                  ? <p style={{ color: '#5b6b57', fontSize: '13px', padding: '20px 0' }}>Chưa có dữ liệu</p>
                  : monthly.map((m) => (
                      <div
                        key={`${m._id.year}-${m._id.month}`}
                        className="bar"
                        style={{ height: `${Math.round((m.revenue / maxRevenue) * 100)}%` }}
                        title={`Th${m._id.month}/${m._id.year}: ${fmtM(m.revenue)}`}
                      />
                    ))}
              </div>
            </div>

            {/* ── Đơn hàng gần nhất ── */}
            <div className="chart-card">
              <h4>Đơn hàng gần nhất</h4>
              {recentOrders.length === 0
                ? <p style={{ color: '#5b6b57', fontSize: '13px' }}>Chưa có đơn hàng</p>
                : recentOrders.slice(0, 5).map((o) => {
                    const st = STATUS_MAP[o.status] ?? { label: o.status, cls: '' };
                    return (
                      <div key={o._id} style={{
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        padding: '8px 0', borderBottom: '1px solid var(--line)',
                        fontSize: '13px',
                      }}>
                        <div>
                          <b>{o.orderNumber}</b>
                          <div style={{ color: '#5b6b57', fontSize: '12px' }}>{o.customerInfo?.name}</div>
                        </div>
                        <span className={`status-pill ${st.cls}`}>{st.label}</span>
                        <b>{o.total.toLocaleString('vi-VN')}₫</b>
                      </div>
                    );
                  })}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
