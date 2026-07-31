'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function BlogCard({ blog }) {
  const router = useRouter();

  return (
    <div className="blog-card" onClick={() => router.push(`/blog/${blog.id}`)}>
      <div className="blog-photo" style={{ background: blog.grad }}>
        {blog.image ? (
          <Image
            src={blog.image}
            alt={blog.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            style={{ objectFit: 'cover', borderRadius: '16px' }}
          />
        ) : (
          <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#26402A" strokeWidth="1.4">
            <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
          </svg>
        )}
      </div>
      <div className="date">{blog.date}</div>
      <h3>{blog.title}</h3>
      <p>{blog.desc}</p>
    </div>
  );
}
