import dbConnect from '@/lib/mongodb';
import Category from '@/models/Category';

export async function GET() {
  const conn = await dbConnect();
  if (!conn) return Response.json({ success: false, error: 'DB unavailable' }, { status: 503 });
  try {
    const categories = await Category.find().sort({ name: 1 }).lean();
    return Response.json({ success: true, data: categories });
  } catch (err) {
    return Response.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(request) {
  const conn = await dbConnect();
  if (!conn) return Response.json({ success: false, error: 'DB unavailable' }, { status: 503 });
  let body;
  try { body = await request.json(); } catch { return Response.json({ success: false, error: 'Invalid JSON' }, { status: 400 }); }

  const { name, desc } = body;
  if (!name?.trim()) return Response.json({ success: false, error: 'Tên danh mục là bắt buộc.' }, { status: 400 });

  const slug = name.trim().toLowerCase()
    .replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, 'a').replace(/[èéẹẻẽêềếệểễ]/g, 'e')
    .replace(/[ìíịỉĩ]/g, 'i').replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, 'o')
    .replace(/[ùúụủũưừứựửữ]/g, 'u').replace(/đ/g, 'd')
    .replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

  try {
    const category = await Category.create({ name: name.trim(), slug, desc: desc?.trim() || '' });
    return Response.json({ success: true, category }, { status: 201 });
  } catch (err) {
    if (err.code === 11000) return Response.json({ success: false, error: 'Tên danh mục đã tồn tại.' }, { status: 409 });
    return Response.json({ success: false, error: err.message }, { status: 400 });
  }
}
