'use client';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BlogCard from '@/components/BlogCard';
import { mockBlogs } from '@/data/mockData';

export default function BlogPage() {
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
                <span className="cur">Blog & Kiến thức</span>
              </div>
              <div className="page-head">
                <h1>Nhật ký Green Atelier</h1>
                <p>Khám phá kiến thức về trà matcha, nghệ thuật pha chế và lối sống lành mạnh.</p>
              </div>

              <div className="blog-grid">
                {mockBlogs.map((blog) => (
                  <BlogCard key={blog.id} blog={blog} />
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
