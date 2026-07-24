import './globals.css';

export const metadata = {
  title: 'Green Atelier — Matcha Mộc Châu Chế Tác Thủ Công',
  description: 'Trà matcha nguyên chất từ cao nguyên Mộc Châu, chế tác thủ công cho từng khoảnh khắc chăm sóc bản thân.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body>
        <div id="storefront-shell">
          {children}
        </div>
      </body>
    </html>
  );
}
