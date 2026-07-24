import dbConnect from '@/lib/mongodb';
import Order from '@/models/Order';

const VALID_STATUSES = ['pending', 'confirmed', 'shipping', 'done', 'cancelled'];

// Luồng trạng thái hợp lệ: không cho phép đi ngược
const TRANSITIONS = {
  pending:   ['confirmed', 'cancelled'],
  confirmed: ['shipping', 'cancelled'],
  shipping:  ['done', 'cancelled'],
  done:      [],
  cancelled: [],
};

// PATCH /api/admin/orders/[id] — chỉ cập nhật status
export async function PATCH(request, { params }) {
  const conn = await dbConnect();
  if (!conn) return Response.json({ success: false, error: 'DB unavailable' }, { status: 503 });

  const { id } = await params;
  let body;
  try { body = await request.json(); } catch { return Response.json({ success: false, error: 'Invalid JSON' }, { status: 400 }); }

  const { status } = body;
  if (!status || !VALID_STATUSES.includes(status)) {
    return Response.json({ success: false, error: 'Trạng thái không hợp lệ.' }, { status: 400 });
  }

  try {
    const order = await Order.findById(id);
    if (!order) return Response.json({ success: false, error: 'Không tìm thấy đơn hàng.' }, { status: 404 });

    const allowed = TRANSITIONS[order.status] ?? [];
    if (!allowed.includes(status)) {
      return Response.json({
        success: false,
        error: `Không thể chuyển từ "${order.status}" sang "${status}".`,
      }, { status: 400 });
    }

    order.status = status;
    await order.save();
    return Response.json({ success: true, order });
  } catch (err) {
    return Response.json({ success: false, error: err.message }, { status: 500 });
  }
}
