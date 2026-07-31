'use client';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BlogCard from '@/components/BlogCard';
import { mockBlogs } from '@/data/mockData';

export default function BlogDetailPage({ params }) {
  const blog = mockBlogs.find((b) => b.id === params?.id) || mockBlogs[0];
  const relatedBlogs = mockBlogs.slice(1, 4);

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
                <div className="eyebrow" style={{ justifyContent: 'center' }}>Kiến thức Matcha</div>
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
                {blog.image && (
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    priority
                    sizes="(max-width: 900px) 100vw, 900px"
                    style={{ objectFit: 'cover' }}
                  />
                )}
              </div>

              <div className="article-body">
                <p>Matcha từ lâu đã trở thành một phần không thể thiếu trong văn hóa trà đạo và phong cách sống hiện đại. Tuy nhiên, nguồn gốc thổ dưỡng của búp trà lại đóng vai trò quyết định đến hàm lượng chất chống oxy hóa EGCG và vị umami tự nhiên.</p>

                <blockquote>
                  "Một tách matcha chuẩn vị không chỉ đánh thức giác quan mà còn mang lại sự tĩnh lặng sâu thẳm trong tâm trí."
                </blockquote>

                <p>Tại vùng cao nguyên Mộc Châu với độ cao hơn 1.050m so với mực nước biển, sương mù bao phủ quanh năm cùng chất đất đỏ bazán màu mỡ đã tạo nên những búp trà xanh mướt, giàu diệp tính. Quy trình che phủ nắng 21 ngày trước khi thu hoạch giúp tích tụ hàm lượng L-theanine tối đa.</p>

                <p>Khi được xay mịn thủ công bằng cối đá granit với tốc độ chậm, bột matcha giữ được sắc xanh ngọc bảo nguyên bản mà không bị sinh nhiệt làm đắng chát.</p>
              </div>

              <h2 className="related-title" style={{ textAlign: 'center', marginTop: '60px' }}>Bài viết liên quan</h2>
              <div className="blog-grid">
                {relatedBlogs.map((b) => (
                  <BlogCard key={b.id} blog={b} />
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
