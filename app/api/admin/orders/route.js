import dbConnect from '@/lib/mongodb';
import Order from '@/models/Order';

const VALID_STATUSES = ['pending', 'confirmed', 'shipping', 'done', 'cancelled'];

// GET /api/admin/orders?status=&q=&page=&limit=
export async function GET(request) {
  const conn = await dbConnect();
  if (!conn) return Response.json({ success: false, error: 'DB unavailable' }, { status: 503 });

  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status') || '';
  const q      = searchParams.get('q')?.trim() || '';
  const page   = Math.max(1, Number(searchParams.get('page'))  || 1);
  const limit  = Math.min(50, Math.max(1, Number(searchParams.get('limit')) || 20));

  const filter = {};
  if (status && VALID_STATUSES.includes(status)) filter.status = status;
  if (q) {
    filter.$or = [
      { orderNumber: { $regex: q, $options: 'i' } },
      { 'customerInfo.name':  { $regex: q, $options: 'i' } },
      { 'customerInfo.email': { $regex: q, $options: 'i' } },
    ];
  }

  try {
    const [orders, total] = await Promise.all([
      Order.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).lean(),
      Order.countDocuments(filter),
    ]);
    return Response.json({ success: true, data: orders, pagination: { total, page, limit, totalPages: Math.ceil(total / limit) } });
  } catch (err) {
    return Response.json({ success: false, error: err.message }, { status: 500 });
  }
}
