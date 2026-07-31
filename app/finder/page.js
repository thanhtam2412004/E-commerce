'use client';
import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function FinderPage() {
  const [selectedGoal, setSelectedGoal] = useState('Focus');

  const goals = [
    { key: 'Focus', label: 'Tập trung', desc: 'Dành cho công việc và học tập cường độ cao', recProduct: 'Matcha Mộc Châu Cổ Điển', recPrice: '285.000₫', recTag: 'Ceremonial Grade' },
    { key: 'Energy', label: 'Năng lượng', desc: 'Dành cho buổi sáng sung sức và tập luyện', recProduct: 'Matcha Genki Boost', recPrice: '320.000₫', recTag: 'Đặc tuyển' },
    { key: 'Calm', label: 'Thư giãn', desc: 'Giúp thả lỏng tâm trí và giải tỏa căng thẳng', recProduct: 'Matcha Lavender Calm', recPrice: '395.000₫', recTag: 'Đêm thư giãn' },
    { key: 'Beauty', label: 'Sắc đẹp', desc: 'Nuôi dưỡng làn da căng mướt và chống lão hóa', recProduct: 'Matcha Glow Collagen', recPrice: '349.000₫', recTag: 'Chăm sóc da' },
    { key: 'Immunity', label: 'Miễn dịch', desc: 'Tăng cường sức đề kháng và thanh lọc cơ thể', recProduct: 'Matcha Immune Shield', recPrice: '315.000₫', recTag: 'Đề kháng' },
  ];

  const currentGoal = goals.find(g => g.key === selectedGoal) || goals[0];

  return (
    <>
      <Header />
      <main>
        <section className="page active">
          <section className="inner">
            <div className="wrap">
              <div className="breadcrumb" style={{ justifyContent: 'center' }}>
                <Link href="/">Trang chủ</Link>
                <span className="sep">/</span>
                <span className="cur">Matcha Finder</span>
              </div>

              <div className="finder-quiz">
                <div className="eyebrow" style={{ justifyContent: 'center' }}>Bài kiểm tra 1 phút</div>
                <h1 style={{ fontSize: '36px', margin: '14px 0' }}>Mục tiêu sức khỏe lớn nhất của bạn hôm nay là gì?</h1>
                <p style={{ color: '#5b6b57' }}>Chọn 1 công dụng bạn mong muốn nhất để nhận gợi ý tách matcha phù hợp.</p>

                <div className="goal-grid">
                  {goals.map((g) => (
                    <div
                      key={g.key}
                      className={`goal-card ${selectedGoal === g.key ? 'selected' : ''}`}
                      onClick={() => setSelectedGoal(g.key)}
                    >
                      <div style={{ fontSize: '24px', marginBottom: '8px' }}>
                        {g.key === 'Focus' && '🎯'}
                        {g.key === 'Energy' && '⚡'}
                        {g.key === 'Calm' && '🍵'}
                        {g.key === 'Beauty' && '✨'}
                        {g.key === 'Immunity' && '🛡️'}
                      </div>
                      <h4>{g.label}</h4>
                    </div>
                  ))}
                </div>

                <div className="result-panel show">
                  <div className="cat-label" style={{ color: 'var(--gold-light)', marginBottom: '6px' }}>Gợi ý dành riêng cho bạn</div>
                  <h3>Mục tiêu: {currentGoal.label}</h3>
                  <p>{currentGoal.desc}</p>

                  <div className="result-card">
                    <div className="thumb"></div>
                    <div style={{ flex: 1 }}>
                      <span className="cat-label">{currentGoal.recTag}</span>
                      <h4>{currentGoal.recProduct}</h4>
                      <div style={{ color: 'var(--matcha)', fontWeight: 700, fontSize: '15px' }}>{currentGoal.recPrice}</div>
                    </div>
                    <Link href="/shop" className="btn btn-primary btn-sm">Xem chi tiết</Link>
                  </div>
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
