import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';

// GET /api/admin/products?q=&tag=&page=&limit=
export async function GET(request) {
  const conn = await dbConnect();
  if (!conn) return Response.json({ success: false, error: 'DB unavailable' }, { status: 503 });

  const { searchParams } = new URL(request.url);
  const q     = searchParams.get('q')?.trim() || '';
  const tag   = searchParams.get('tag')       || '';
  const page  = Math.max(1, Number(searchParams.get('page'))  || 1);
  const limit = Math.min(50, Math.max(1, Number(searchParams.get('limit')) || 20));

  const filter = {};
  if (q)   filter.name = { $regex: q, $options: 'i' };
  if (tag) filter.tag  = tag;

  try {
    const [products, total] = await Promise.all([
      Product.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).lean(),
      Product.countDocuments(filter),
    ]);
    return Response.json({ success: true, data: products, pagination: { total, page, limit, totalPages: Math.ceil(total / limit) } });
  } catch (err) {
    return Response.json({ success: false, error: err.message }, { status: 500 });
  }
}

// POST /api/admin/products
export async function POST(request) {
  const conn = await dbConnect();
  if (!conn) return Response.json({ success: false, error: 'DB unavailable' }, { status: 503 });

  let body;
  try { body = await request.json(); } catch { return Response.json({ success: false, error: 'Invalid JSON' }, { status: 400 }); }

  const { name, tag, cat, desc, price, stock, grad, isFeatured } = body;
  if (!name || !tag || !price) return Response.json({ success: false, error: 'name, tag, price là bắt buộc.' }, { status: 400 });

  // Sinh slug từ tên
  const slug = name.toLowerCase()
    .replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, 'a')
    .replace(/[èéẹẻẽêềếệểễ]/g, 'e')
    .replace(/[ìíịỉĩ]/g, 'i')
    .replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, 'o')
    .replace(/[ùúụủũưừứựửữ]/g, 'u')
    .replace(/[ỳýỵỷỹ]/g, 'y')
    .replace(/đ/g, 'd')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    + '-' + Date.now();

  try {
    const product = await Product.create({
      name: name.trim(), slug, tag, cat: cat?.trim() || tag,
      desc: desc?.trim() || '', price: Number(price), rawPrice: Number(price),
      stock: Number(stock) || 0,
      grad: grad || 'linear-gradient(150deg,#DCE6C8,#B9C9A6)',
      isFeatured: isFeatured ?? false,
    });
    return Response.json({ success: true, product }, { status: 201 });
  } catch (err) {
    return Response.json({ success: false, error: err.message }, { status: 400 });
  }
}
