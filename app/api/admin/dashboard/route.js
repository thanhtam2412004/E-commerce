import dbConnect from '@/lib/mongodb';
import Order from '@/models/Order';
import User from '@/models/User';
import Product from '@/models/Product';

/**
 * GET /api/admin/dashboard
 * Trả về stats tổng quan cho admin dashboard
 */
export async function GET() {
  const conn = await dbConnect();
  if (!conn) {
    return Response.json({ success: false, error: 'DB unavailable' }, { status: 503 });
  }

  try {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfLastMonth   = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59);

    // Chạy song song tất cả queries
    const [
      totalOrders,
      thisMonthOrders,
      lastMonthOrders,
      totalCustomers,
      thisMonthCustomers,
      totalProducts,
      recentOrders,
      monthlyRevenue,
    ] = await Promise.all([
      Order.countDocuments(),
      Order.countDocuments({ createdAt: { $gte: startOfMonth } }),
      Order.countDocuments({ createdAt: { $gte: startOfLastMonth, $lte: endOfLastMonth } }),
      User.countDocuments({ role: 'customer' }),
      User.countDocuments({ role: 'customer', createdAt: { $gte: startOfMonth } }),
      Product.countDocuments(),
      // 10 đơn hàng gần nhất
      Order.find()
        .sort({ createdAt: -1 })
        .limit(10)
        .lean(),
      // Doanh thu 6 tháng gần nhất
      Order.aggregate([
        {
          $match: {
            status: { $ne: 'cancelled' },
            createdAt: {
              $gte: new Date(now.getFullYear(), now.getMonth() - 5, 1),
            },
          },
        },
        {
          $group: {
            _id: {
              year:  { $year: '$createdAt' },
              month: { $month: '$createdAt' },
            },
            revenue: { $sum: '$total' },
            orders:  { $sum: 1 },
          },
        },
        { $sort: { '_id.year': 1, '_id.month': 1 } },
      ]),
    ]);

    // Tính tổng doanh thu
    const revenueResult = await Order.aggregate([
      { $match: { status: { $ne: 'cancelled' } } },
      { $group: { _id: null, total: { $sum: '$total' } } },
    ]);
    const totalRevenue = revenueResult[0]?.total ?? 0;

    const thisMonthRevenueResult = await Order.aggregate([
      { $match: { status: { $ne: 'cancelled' }, createdAt: { $gte: startOfMonth } } },
      { $group: { _id: null, total: { $sum: '$total' } } },
    ]);
    const thisMonthRevenue = thisMonthRevenueResult[0]?.total ?? 0;

    const lastMonthRevenueResult = await Order.aggregate([
      { $match: { status: { $ne: 'cancelled' }, createdAt: { $gte: startOfLastMonth, $lte: endOfLastMonth } } },
      { $group: { _id: null, total: { $sum: '$total' } } },
    ]);
    const lastMonthRevenue = lastMonthRevenueResult[0]?.total ?? 0;

    // Tính % tăng trưởng
    const orderGrowth   = lastMonthOrders   > 0 ? (((thisMonthOrders   - lastMonthOrders)   / lastMonthOrders)   * 100).toFixed(1) : null;
    const revenueGrowth = lastMonthRevenue  > 0 ? (((thisMonthRevenue  - lastMonthRevenue)  / lastMonthRevenue)  * 100).toFixed(1) : null;

    return Response.json({
      success: true,
      stats: {
        totalRevenue,
        thisMonthRevenue,
        revenueGrowth,
        totalOrders,
        thisMonthOrders,
        orderGrowth,
        totalCustomers,
        thisMonthCustomers,
        totalProducts,
      },
      recentOrders,
      monthlyRevenue,
    });
  } catch (err) {
    return Response.json({ success: false, error: err.message }, { status: 500 });
  }
}
