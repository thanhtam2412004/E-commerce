import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BlogCard from '@/components/BlogCard';
import { mockBlogs } from '@/data/mockData';

const articleContent = {
  '1': {
    category: 'Nguồn gốc Matcha',
    intro: 'Matcha Mộc Châu mang một bản sắc riêng được hình thành từ độ cao, khí hậu, thổ nhưỡng và kỹ thuật chế tác tại vùng cao nguyên phía Bắc Việt Nam.',
    quote: 'Một vùng trồng khác biệt không tạo ra bản sao của matcha Nhật Bản, mà tạo nên một hương vị matcha mang dấu ấn riêng.',
    sections: [
      {
        title: 'Khí hậu cao nguyên tạo nên vị trà đặc trưng',
        text: 'Ở độ cao trên 1.050m, Mộc Châu có khí hậu mát mẻ, nhiều sương và chênh lệch nhiệt độ ngày đêm rõ rệt. Nhịp sinh trưởng chậm giúp búp trà tích lũy amino acid, tạo vị umami dịu, hậu ngọt thanh và hương thực vật tươi.',
      },
      {
        title: 'Thổ nhưỡng bazan và nguồn nước tự nhiên',
        text: 'Đất đỏ bazan giàu khoáng cùng nguồn nước suối trong lành nuôi dưỡng những đồi trà xanh quanh năm. Điều kiện này mang đến sắc xanh sáng và cấu trúc hương vị cân bằng, ít chát gắt khi được thu hái đúng thời điểm.',
      },
      {
        title: 'Khác biệt nằm ở cách chế tác',
        text: 'Lá trà non được che nắng trước thu hoạch, hấp để khóa màu rồi sấy và tách gân trước khi nghiền chậm bằng cối đá granit. So với phong cách Nhật Bản truyền thống, matcha Mộc Châu thường có hương cỏ non rõ hơn và hậu vị gần gũi với trà Việt.',
      },
    ],
  },
  '2': {
    category: 'Nghi thức Matcha',
    intro: 'Một nghi thức matcha ngắn vào buổi sáng giúp bạn bắt đầu ngày mới chậm rãi, tỉnh táo và có chủ đích mà không cần quá nhiều dụng cụ.',
    quote: 'Năm phút dành cho matcha có thể trở thành khoảng lặng giúp bạn định hình cả một ngày.',
    sections: [
      {
        title: 'Bước 1: Làm nóng và chuẩn bị dụng cụ',
        text: 'Tráng chawan và chasen bằng nước ấm để làm nóng bát, đồng thời giúp nan tre mềm và bền hơn. Lau khô bát trước khi rây 2g matcha để bột tơi mịn, không bị vón.',
      },
      {
        title: 'Bước 2: Đánh matcha đúng kỹ thuật',
        text: 'Thêm khoảng 60–70ml nước ở 75–80°C. Giữ chasen thẳng, đánh nhanh theo chuyển động hình chữ M hoặc W trong 15–20 giây cho đến khi mặt trà xuất hiện lớp bọt mịn.',
      },
      {
        title: 'Bước 3: Uống chậm và đặt mục tiêu',
        text: 'Thưởng thức khi matcha còn ấm, chú ý đến hương thơm, vị umami và nhịp thở. Trước khi bắt đầu công việc, hãy chọn một mục tiêu quan trọng nhất để nguồn năng lượng tỉnh táo được sử dụng có chủ đích.',
      },
    ],
  },
  '3': {
    category: 'Sức khỏe & Matcha',
    intro: 'Matcha cung cấp toàn bộ phần lá trà được nghiền mịn, vì vậy giữ lại nhiều hợp chất tự nhiên hơn so với cách pha trà rồi bỏ bã.',
    quote: 'Giá trị của matcha đến từ sự kết hợp cân bằng giữa caffeine, L-theanine và các chất chống oxy hóa.',
    sections: [
      {
        title: '1. Hỗ trợ tập trung ổn định',
        text: 'L-theanine kết hợp với caffeine giúp duy trì sự tỉnh táo êm dịu, hạn chế cảm giác bồn chồn thường gặp khi dùng đồ uống nhiều caffeine.',
      },
      {
        title: '2. Bổ sung chất chống oxy hóa',
        text: 'Matcha giàu catechin, đặc biệt là EGCG. Những hợp chất này góp phần bảo vệ tế bào trước stress oxy hóa khi được kết hợp cùng chế độ ăn cân bằng.',
      },
      {
        title: '3. Hỗ trợ năng lượng và chuyển hóa',
        text: 'Một tách matcha trước khi vận động có thể cung cấp năng lượng vừa phải. Caffeine và catechin cũng được nghiên cứu về vai trò hỗ trợ quá trình chuyển hóa tự nhiên.',
      },
      {
        title: '4. Tạo cảm giác thư giãn',
        text: 'L-theanine liên quan đến trạng thái thư giãn nhưng vẫn tỉnh táo, phù hợp cho thiền, đọc sách hoặc những khoảng nghỉ cần sự bình tâm.',
      },
      {
        title: '5. Nuôi dưỡng thói quen lành mạnh',
        text: 'Khi dùng không quá nhiều đường, matcha là lựa chọn linh hoạt thay cho đồ uống ngọt. Bạn có thể pha với nước, sữa hạt hoặc dùng trong bữa sáng.',
      },
    ],
  },
  '4': {
    category: 'Kiến thức Matcha',
    intro: 'Ceremonial Grade và Culinary Grade khác nhau về nguyên liệu, màu sắc, hương vị và mục đích sử dụng. Chọn đúng loại giúp bạn có trải nghiệm ngon hơn và tránh lãng phí.',
    quote: 'Loại matcha tốt nhất không phải lúc nào cũng đắt nhất, mà là loại phù hợp nhất với cách bạn sử dụng.',
    sections: [
      {
        title: 'Ceremonial Grade: dành để uống nguyên chất',
        text: 'Ceremonial Grade thường làm từ những búp non đầu vụ, có màu xanh ngọc sáng, bột rất mịn và vị umami rõ. Loại này phù hợp để pha usucha với nước, nơi hương vị matcha được cảm nhận trọn vẹn.',
      },
      {
        title: 'Culinary Grade: đậm vị khi kết hợp nguyên liệu',
        text: 'Culinary Grade có màu xanh sẫm hơn và vị trà mạnh, hơi chát để không bị lấn át bởi sữa, đường hoặc bột bánh. Đây là lựa chọn hợp lý cho latte, smoothie, kem và món nướng.',
      },
      {
        title: 'Cách lựa chọn nhanh',
        text: 'Nếu bạn uống matcha với nước, hãy ưu tiên Ceremonial Grade. Nếu pha latte mỗi ngày hoặc làm bánh, Culinary Grade mang lại màu sắc, hương vị và chi phí cân bằng hơn. Luôn kiểm tra ngày đóng gói và nguồn gốc thay vì chỉ nhìn nhãn phân hạng.',
      },
    ],
  },
  '5': {
    category: 'Bảo quản Matcha',
    intro: 'Ánh sáng, nhiệt, độ ẩm và oxy đều làm matcha mất màu và hương nhanh chóng. Bảo quản đúng giúp mỗi lần mở hộp vẫn giữ được sắc xanh và vị umami tươi mới.',
    quote: 'Matcha tươi cần được bảo vệ như một nguyên liệu nhạy cảm, không phải một loại bột khô thông thường.',
    sections: [
      {
        title: 'Dùng bao bì kín và chống ánh sáng',
        text: 'Giữ matcha trong hộp thiếc hoặc hũ thủy tinh sẫm màu có nắp kín. Sau mỗi lần dùng, ép bớt không khí trong túi và đóng nắp ngay để hạn chế oxy hóa.',
      },
      {
        title: 'Bảo quản nơi mát và khô',
        text: 'Hộp chưa mở có thể để trong ngăn mát tủ lạnh. Khi lấy ra, hãy chờ hộp trở về nhiệt độ phòng rồi mới mở để tránh hơi nước ngưng tụ làm bột vón và giảm chất lượng.',
      },
      {
        title: 'Tránh mùi mạnh và dùng sớm sau khi mở',
        text: 'Matcha dễ hấp thụ mùi từ cà phê, gia vị hoặc thực phẩm trong tủ lạnh. Nên dùng trong 4–6 tuần sau khi mở, lấy bột bằng muỗng sạch và khô, đồng thời tránh đặt hộp gần bếp hoặc cửa sổ.',
      },
    ],
  },
  '6': {
    category: 'Công thức Matcha',
    intro: 'Một ly matcha latte chuẩn quán cần matcha được đánh mịn, tỷ lệ sữa cân bằng và lớp bọt mềm. Công thức cơ bản dưới đây có thể dùng cho cả phiên bản nóng lẫn lạnh.',
    quote: 'Latte ngon bắt đầu từ việc đánh matcha với nước trước khi thêm sữa, không khuấy bột trực tiếp vào sữa.',
    sections: [
      {
        title: 'Nguyên liệu cho một ly',
        text: 'Chuẩn bị 2g matcha, 50ml nước nóng 75–80°C, 150–180ml sữa tươi hoặc sữa hạt và 5–10ml mật ong hoặc syrup tùy khẩu vị. Với latte lạnh, thêm một cốc đá viên.',
      },
      {
        title: 'Đánh nền matcha thật mịn',
        text: 'Rây matcha vào bát, thêm nước nóng rồi dùng chasen đánh nhanh theo hình chữ M trong khoảng 20 giây. Khi bề mặt có bọt nhỏ, mịn và không còn cục bột, phần nền matcha đã sẵn sàng.',
      },
      {
        title: 'Hoàn thiện latte nóng hoặc lạnh',
        text: 'Với latte nóng, tạo bọt sữa ở khoảng 55–60°C rồi rót chậm vào matcha. Với latte lạnh, cho syrup, đá và sữa vào ly trước, sau đó rót matcha lên trên để tạo lớp màu đẹp; khuấy đều trước khi uống.',
      },
    ],
  },
};

export default async function BlogDetailPage({ params }) {
  const { id } = await params;
  const blog = mockBlogs.find((item) => item.id === id) || mockBlogs[0];
  const article = articleContent[blog.id];
  const relatedBlogs = mockBlogs.filter((item) => item.id !== blog.id).slice(0, 3);

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
                <Link href="/blog">Blog</Link>
                <span className="sep">/</span>
                <span className="cur">Chi tiết bài viết</span>
              </div>

              <div className="article-head">
                <div className="eyebrow" style={{ justifyContent: 'center' }}>{article.category}</div>
                <h1>{blog.title}</h1>
                <div className="article-meta">{blog.date} • Tác giả: Green Atelier Editorial</div>
              </div>

              <div
                className="article-cover"
                style={{
                  background: blog.grad,
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  priority
                  sizes="(max-width: 900px) 100vw, 900px"
                  style={{ objectFit: 'cover' }}
                />
              </div>

              <article className="article-body">
                <p>{article.intro}</p>
                <blockquote>&ldquo;{article.quote}&rdquo;</blockquote>
                {article.sections.map((section) => (
                  <section key={section.title}>
                    <h2 style={{ margin: '32px 0 12px', fontSize: '24px' }}>{section.title}</h2>
                    <p>{section.text}</p>
                  </section>
                ))}
              </article>

              <h2 className="related-title" style={{ textAlign: 'center', marginTop: '60px' }}>Bài viết liên quan</h2>
              <div className="blog-grid">
                {relatedBlogs.map((relatedBlog) => (
                  <BlogCard key={relatedBlog.id} blog={relatedBlog} />
                ))}
              </div>
            </div>
          </section>
        </section>
      </main>
      <Footer />
    </>
  );
}
