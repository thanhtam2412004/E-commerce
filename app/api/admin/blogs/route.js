import dbConnect from '@/lib/mongodb';
import Blog from '@/models/Blog';

export async function GET(request) {
  const conn = await dbConnect();
  if (!conn) return Response.json({ success: false, error: 'DB unavailable' }, { status: 503 });

  const { searchParams } = new URL(request.url);
  const q      = searchParams.get('q')?.trim()  || '';
  const status = searchParams.get('status')      || '';
  const page   = Math.max(1, Number(searchParams.get('page'))  || 1);
  const limit  = Math.min(50, Math.max(1, Number(searchParams.get('limit')) || 20));

  const filter = {};
  if (q)      filter.title = { $regex: q, $options: 'i' };
  if (status) filter.status = status;

  try {
    const [blogs, total] = await Promise.all([
      Blog.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).lean(),
      Blog.countDocuments(filter),
    ]);
    return Response.json({ success: true, data: blogs, pagination: { total, page, limit, totalPages: Math.ceil(total / limit) } });
  } catch (err) {
    return Response.json({ success: false, error: err.message }, { status: 500 });
  }
}

function makeSlug(title) {
  return title.toLowerCase()
    .replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, 'a').replace(/[èéẹẻẽêềếệểễ]/g, 'e')
    .replace(/[ìíịỉĩ]/g, 'i').replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, 'o')
    .replace(/[ùúụủũưừứựửữ]/g, 'u').replace(/[ỳýỵỷỹ]/g, 'y').replace(/đ/g, 'd')
    .replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
    + '-' + Date.now();
}

export async function POST(request) {
  const conn = await dbConnect();
  if (!conn) return Response.json({ success: false, error: 'DB unavailable' }, { status: 503 });
  let body;
  try { body = await request.json(); } catch { return Response.json({ success: false, error: 'Invalid JSON' }, { status: 400 }); }

  const { title, desc, content, grad, status } = body;
  if (!title?.trim()) return Response.json({ success: false, error: 'Tiêu đề là bắt buộc.' }, { status: 400 });

  try {
    const now  = new Date();
    const date = `${now.getDate()} Th${now.getMonth() + 1}, ${now.getFullYear()}`;
    const blog = await Blog.create({
      title: title.trim(), slug: makeSlug(title),
      desc: desc?.trim() || '', content: content?.trim() || '',
      date, grad: grad || 'linear-gradient(160deg,#DCE6C8,#B9C9A6)',
      status: status || 'draft',
    });
    return Response.json({ success: true, blog }, { status: 201 });
  } catch (err) {
    return Response.json({ success: false, error: err.message }, { status: 400 });
  }
}
