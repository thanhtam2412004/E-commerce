'use client';
import AdminSidebar from '@/components/AdminSidebar';
import AdminTopbar from '@/components/AdminTopbar';

export default function AdminDashboardPage() {
  return (
    <div className="admin-app show">
      <AdminSidebar />
      <div className="admin-main">
        <AdminTopbar title="Dashboard Overview" />
        <div className="admin-content">
          <div className="stat-grid">
            <div className="stat-card">
              <div className="lbl">Tổng doanh thu</div>
              <div className="val">148,2tr₫</div>
              <div className="delta">▲ 12.4% so với tháng trước</div>
            </div>
            <div className="stat-card">
              <div className="lbl">Tổng đơn hàng</div>
              <div className="val">1,284</div>
              <div className="delta">▲ 6.1%</div>
            </div>
            <div className="stat-card">
              <div className="lbl">Tổng khách hàng</div>
              <div className="val">2,430</div>
              <div className="delta">▲ 3.8%</div>
            </div>
            <div className="stat-card">
              <div className="lbl">Sản phẩm đang bán</div>
              <div className="val">32</div>
              <div className="delta" style={{ color: '#8b9584' }}>Ổn định</div>
            </div>
          </div>

          <div className="chart-grid">
            <div className="chart-card">
              <h4>Doanh thu theo tháng (Triệu VNĐ)</h4>
              <div className="bar-chart">
                <div className="bar" style={{ height: '40%' }}></div>
                <div className="bar" style={{ height: '55%' }}></div>
                <div className="bar" style={{ height: '48%' }}></div>
                <div className="bar" style={{ height: '70%' }}></div>
                <div className="bar" style={{ height: '62%' }}></div>
                <div className="bar" style={{ height: '85%' }}></div>
                <div className="bar" style={{ height: '78%' }}></div>
                <div className="bar" style={{ height: '95%' }}></div>
              </div>
            </div>
            <div className="chart-card">
              <h4>Tăng trưởng đơn hàng</h4>
              <svg height="160" viewBox="0 0 220 160" width="100%">
                <polyline fill="none" points="0,120 30,100 60,110 90,70 120,80 150,40 180,55 220,20" stroke="#B98B3E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"></polyline>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
