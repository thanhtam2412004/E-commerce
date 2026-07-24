import { cookies } from 'next/headers';
import mongoose from 'mongoose';
import dbConnect from '@/lib/mongodb';
import Order from '@/models/Order';
import Product from '@/models/Product';
import User from '@/models/User';

const SHIPPING_FEE = 30000;
const SESSION_COOKIE = 'ga_session';

/** Sinh orderNumber độc lập, không dùng pre-save hook (vì hook không đáng tin trong transaction) */
async function generateOrderNumber(session) {
  const count = await Order.countDocuments().session(session);
  return `#GA-${String(1000 + count + 1).padStart(4, '0')}`;
}

/**
 * POST /api/orders/create
 *
 * Body:
 * {
 *   customerInfo: { name, email, phone, address, note? },
 *   items: [{ id, name, price, qty, grad, cat }],
 *   paymentMethod: 'cod' | 'bank'
 * }
 */
export async function POST(request) {
  const conn = await dbConnect();
  if (!conn) {
    return Response.json({ success: false, error: 'Không thể kết nối cơ sở dữ liệu.' }, { status: 503 });
  }

  // Đọc session (tuỳ chọn — guest checkout được phép)
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE);
  let userId = null;
  if (sessionCookie?.value) {
    try {
      const user = await User.findById(sessionCookie.value);
      if (user) userId = user._id;
    } catch {
      // session không hợp lệ → tiếp tục guest
    }
  }

  // Parse body
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ success: false, error: 'Dữ liệu không hợp lệ.' }, { status: 400 });
  }

  const { customerInfo, items, paymentMethod = 'cod' } = body;

  // ── Validate input ────────────────────────────────────────────────────────
  if (!customerInfo?.name || !customerInfo?.email || !customerInfo?.phone || !customerInfo?.address) {
    return Response.json({ success: false, error: 'Vui lòng điền đầy đủ thông tin người nhận.' }, { status: 400 });
  }

  if (!Array.isArray(items) || items.length === 0) {
    return Response.json({ success: false, error: 'Giỏ hàng trống.' }, { status: 400 });
  }

  if (!['cod', 'bank'].includes(paymentMethod)) {
    return Response.json({ success: false, error: 'Phương thức thanh toán không hợp lệ.' }, { status: 400 });
  }

  // ── Lấy session Mongoose để dùng transaction ─────────────────────────────
  const session = await mongoose.startSession();

  try {
    let createdOrder;

    await session.withTransaction(async () => {
      // 1. Xác minh stock và trừ kho atomic cho từng sản phẩm
      for (const item of items) {
        if (!item.id || item.qty < 1) {
          throw new Error(`Sản phẩm "${item.name || item.id}" không hợp lệ.`);
        }

        const product = await Product.findById(item.id).session(session);

        if (!product) {
          throw new Error(`Sản phẩm "${item.name}" không còn tồn tại.`);
        }

        if (product.stock < item.qty) {
          throw new Error(
            `Sản phẩm "${product.name}" chỉ còn ${product.stock} sản phẩm trong kho (bạn đặt ${item.qty}).`
          );
        }

        // Trừ kho atomic — findOneAndUpdate với điều kiện stock >= qty
        const updated = await Product.findOneAndUpdate(
          { _id: item.id, stock: { $gte: item.qty } },
          { $inc: { stock: -item.qty } },
          { session, new: true }
        );

        if (!updated) {
          // Race condition: người khác vừa mua hết
          throw new Error(`Sản phẩm "${product.name}" vừa hết hàng. Vui lòng thử lại.`);
        }
      }

      // 2. Tính tiền (tính lại server-side, không tin client)
      const productIds = items.map((i) => i.id);
      const dbProducts = await Product.find({ _id: { $in: productIds } }).session(session);
      const productMap = Object.fromEntries(dbProducts.map((p) => [p._id.toString(), p]));

      const orderItems = items.map((item) => {
        const dbP = productMap[item.id];
        return {
          productId: item.id,
          name: dbP?.name ?? item.name,
          price: dbP?.price ?? item.price,   // giá từ DB, không từ client
          qty: item.qty,
          grad: dbP?.grad ?? item.grad ?? '',
        };
      });

      const subtotal = orderItems.reduce((sum, i) => sum + i.price * i.qty, 0);
      const shipping = SHIPPING_FEE;
      const total    = subtotal + shipping;

      // 3. Tạo đơn hàng — sinh orderNumber trực tiếp (không dựa vào pre-save hook trong transaction)
      const orderNumber = await generateOrderNumber(session);

      const order = new Order({
        orderNumber,
        customerInfo: {
          name:    customerInfo.name.trim(),
          email:   customerInfo.email.trim().toLowerCase(),
          phone:   customerInfo.phone.trim(),
          address: customerInfo.address.trim(),
          note:    customerInfo.note?.trim() ?? '',
        },
        userId,
        items: orderItems,
        subtotal,
        shipping,
        total,
        paymentMethod,
        status: 'pending',
      });

      await order.save({ session });
      createdOrder = order;
    });

    return Response.json(
      {
        success: true,
        message: 'Đặt hàng thành công!',
        order: {
          id:            createdOrder._id,
          orderNumber:   createdOrder.orderNumber,
          total:         createdOrder.total,
          status:        createdOrder.status,
          paymentMethod: createdOrder.paymentMethod,
        },
      },
      { status: 201 }
    );
  } catch (err) {
    return Response.json({ success: false, error: err.message }, { status: 400 });
  } finally {
    session.endSession();
  }
}
