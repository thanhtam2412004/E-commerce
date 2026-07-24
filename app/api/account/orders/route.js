import { cookies } from 'next/headers';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import Order from '@/models/Order';

const SESSION_COOKIE = 'ga_session';

/**
 * GET /api/account/orders
 * Trả về lịch sử đơn hàng của user đang đăng nhập
 * Tìm theo userId (đặt hàng khi đã login) HOẶC email (guest checkout)
 */
export async function GET() {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE);

  if (!session?.value) {
    return Response.json({ success: false, error: 'Chưa đăng nhập.' }, { status: 401 });
  }

  const conn = await dbConnect();
  if (!conn) {
    return Response.json({ success: false, error: 'Không thể kết nối cơ sở dữ liệu.' }, { status: 503 });
  }

  try {
    const user = await User.findById(session.value);
    if (!user) {
      return Response.json({ success: false, error: 'Phiên đăng nhập không hợp lệ.' }, { status: 401 });
    }

    // Lấy đơn theo userId hoặc email (guest orders)
    const orders = await Order.find({
      $or: [
        { userId: user._id },
        { 'customerInfo.email': user.email },
      ],
    })
      .sort({ createdAt: -1 })
      .lean();

    return Response.json({ success: true, orders });
  } catch (err) {
    return Response.json({ success: false, error: err.message }, { status: 500 });
  }
}
