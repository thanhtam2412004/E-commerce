import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import Order from '@/models/Order';

// GET /api/admin/customers?q=&page=&limit=
export async function GET(request) {
  const conn = await dbConnect();
  if (!conn) return Response.json({ success: false, error: 'DB unavailable' }, { status: 503 });

  const { searchParams } = new URL(request.url);
  const q     = searchParams.get('q')?.trim() || '';
  const page  = Math.max(1, Number(searchParams.get('page'))  || 1);
  const limit = Math.min(50, Math.max(1, Number(searchParams.get('limit')) || 20));

  const filter = { role: 'customer' };
  if (q) {
    filter.$or = [
      { name:  { $regex: q, $options: 'i' } },
      { email: { $regex: q, $options: 'i' } },
      { phone: { $regex: q, $options: 'i' } },
    ];
  }

  try {
    const [users, total] = await Promise.all([
      User.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).lean(),
      User.countDocuments(filter),
    ]);

    // Đếm số đơn hàng mỗi user (theo userId + email)
    const enriched = await Promise.all(users.map(async (u) => {
      const orderCount = await Order.countDocuments({
        $or: [{ userId: u._id }, { 'customerInfo.email': u.email }],
      });
      return { ...u, orderCount };
    }));

    return Response.json({ success: true, data: enriched, pagination: { total, page, limit, totalPages: Math.ceil(total / limit) } });
  } catch (err) {
    return Response.json({ success: false, error: err.message }, { status: 500 });
  }
}
