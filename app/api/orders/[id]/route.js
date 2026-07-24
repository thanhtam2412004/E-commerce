import { cookies } from 'next/headers';
import dbConnect from '@/lib/mongodb';
import Order from '@/models/Order';

const SESSION_COOKIE = 'ga_session';

/**
 * GET /api/orders/[id]
 * Trả về chi tiết đơn hàng theo MongoDB _id hoặc orderNumber (#GA-xxxx)
 * Chỉ cho phép: chính user đặt hoặc admin
 */
export async function GET(request, { params }) {
  const conn = await dbConnect();
  if (!conn) {
    return Response.json({ success: false, error: 'Không thể kết nối cơ sở dữ liệu.' }, { status: 503 });
  }

  const { id } = await params;

  try {
    // Tìm theo _id hoặc orderNumber
    const query = id.startsWith('#GA-') || id.startsWith('GA-')
      ? { orderNumber: id.startsWith('#') ? id : `#${id}` }
      : { _id: id };

    const order = await Order.findOne(query).lean();

    if (!order) {
      return Response.json({ success: false, error: 'Không tìm thấy đơn hàng.' }, { status: 404 });
    }

    // Kiểm tra quyền: phải là chủ đơn hoặc admin
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(SESSION_COOKIE);

    if (sessionCookie?.value) {
      // User đã đăng nhập — chỉ được xem đơn của mình (hoặc admin xem tất cả)
      const { default: User } = await import('@/models/User');
      const user = await User.findById(sessionCookie.value);

      const isOwner = order.userId?.toString() === sessionCookie.value;
      const isAdmin = user?.role === 'admin';

      if (!isOwner && !isAdmin) {
        return Response.json({ success: false, error: 'Không có quyền xem đơn hàng này.' }, { status: 403 });
      }
    }
    // Guest: không check quyền (biết orderNumber là truy cập được)

    return Response.json({ success: true, order });
  } catch (err) {
    return Response.json({ success: false, error: err.message }, { status: 500 });
  }
}
