import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';

export const dynamic = 'force-dynamic';

/**
 * GET /api/products
 *
 * Query params:
 *   q        - tìm theo tên (regex, case-insensitive)
 *   tag      - filter theo tag (Focus|Energy|Calm|Beauty|Immunity), comma-separated
 *   minPrice - lọc giá từ (VND)
 *   maxPrice - lọc giá đến (VND)
 *   sort     - newest | price_asc | price_desc | featured (default: newest)
 *   page     - trang hiện tại (default: 1)
 *   limit    - số sản phẩm / trang (default: 12, max: 48)
 *   featured - "true" → chỉ lấy sản phẩm nổi bật
 */
export async function GET(request) {
  const conn = await dbConnect();
  if (!conn) {
    return Response.json({ success: false, error: 'Không thể kết nối cơ sở dữ liệu.' }, { status: 503 });
  }

  const { searchParams } = new URL(request.url);

  const q        = searchParams.get('q')?.trim()        || '';
  const tag      = searchParams.get('tag')              || '';
  const minPrice = Number(searchParams.get('minPrice')) || 0;
  const maxPrice = Number(searchParams.get('maxPrice')) || 0;
  const sort     = searchParams.get('sort')             || 'newest';
  const featured = searchParams.get('featured')         === 'true';
  const page     = Math.max(1, Number(searchParams.get('page'))  || 1);
  const limit    = Math.min(48, Math.max(1, Number(searchParams.get('limit')) || 12));

  // ── Build filter ──────────────────────────────────────────────────────────
  const filter = {};

  if (q) {
    filter.name = { $regex: q, $options: 'i' };
  }

  if (tag) {
    // Hỗ trợ multi-tag: ?tag=Focus,Energy
    const tags = tag.split(',').map((t) => t.trim()).filter(Boolean);
    if (tags.length === 1) {
      filter.tag = tags[0];
    } else if (tags.length > 1) {
      filter.tag = { $in: tags };
    }
  }

  if (minPrice > 0 || maxPrice > 0) {
    filter.price = {};
    if (minPrice > 0) filter.price.$gte = minPrice;
    if (maxPrice > 0) filter.price.$lte = maxPrice;
  }

  if (featured) {
    filter.isFeatured = true;
  }

  // ── Build sort ────────────────────────────────────────────────────────────
  const sortMap = {
    newest:     { createdAt: -1 },
    price_asc:  { price: 1 },
    price_desc: { price: -1 },
    featured:   { isFeatured: -1, createdAt: -1 },
  };
  const sortObj = sortMap[sort] ?? sortMap.newest;

  // ── Query ────────────────────────────────────────────────────────────────
  try {
    const skip  = (page - 1) * limit;
    const total = await Product.countDocuments(filter);
    const products = await Product.find(filter)
      .sort(sortObj)
      .skip(skip)
      .limit(limit)
      .lean();

    return Response.json({
      success: true,
      data: products,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    return Response.json({ success: false, error: err.message }, { status: 500 });
  }
}
