import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';
import { mockProducts } from '@/data/mockData';

export const dynamic = 'force-dynamic';

const catalogAdditions = [
  {
    name: 'Matcha Fresh Latte',
    slug: 'matcha-fresh-latte',
    tag: 'Energy',
    cat: 'Đồ uống pha sẵn',
    desc: 'Matcha latte đóng chai mịn màng, thanh mát — sẵn sàng thưởng thức mọi lúc.',
    price: 69000,
    rawPrice: 69000,
    stock: 60,
    grad: 'linear-gradient(150deg,#DCE8D2,#A8C49A)',
    isFeatured: false,
  },
  {
    name: 'Matcha Energy Bites',
    slug: 'matcha-energy-bites',
    tag: 'Energy',
    cat: 'Đồ ăn nhẹ lành mạnh',
    desc: 'Bộ đồ ăn nhẹ từ matcha nguyên chất, hạt và trái cây tự nhiên — thơm ngon, giàu chất xơ, tiếp thêm năng lượng lành mạnh mỗi ngày.',
    longDesc: 'Khám phá bộ sưu tập đồ ăn nhẹ matcha gồm bánh quy, thanh năng lượng, viên protein, granola, cụm hạnh nhân và trái cây sấy phủ matcha. Mỗi món được làm từ nguyên liệu có nguồn gốc thực vật, không chất bảo quản nhân tạo, cân bằng giữa vị matcha thanh dịu và độ ngọt tự nhiên.',
    features: ['Matcha nguyên chất, giàu chất chống oxy hoá', 'Nguyên liệu có nguồn gốc thực vật', 'Không màu nhân tạo và không chất bảo quản', 'Giàu chất xơ, hỗ trợ năng lượng và sự tập trung'],
    variants: ['Bánh quy Matcha', 'Thanh năng lượng Matcha', 'Bánh protein Matcha', 'Granola Matcha', 'Cụm hạnh nhân Matcha', 'Trái cây sấy phủ Matcha'],
    images: ['/images/matcha-energy-bites.jpg', '/images/matcha-energy-bites-varieties.jpg'],
    price: 125000,
    rawPrice: 125000,
    stock: 45,
    grad: 'linear-gradient(150deg,#E8DFC8,#C9AD75)',
    isFeatured: false,
  },
  {
    name: 'Green Atelier Premium Gift Box',
    slug: 'green-atelier-premium-gift-box',
    tag: 'Focus',
    cat: 'Hộp quà cao cấp',
    desc: 'Hộp quà matcha sang trọng gồm trà tuyển chọn và phụ kiện pha chế thủ công.',
    price: 689000,
    rawPrice: 689000,
    stock: 15,
    grad: 'linear-gradient(150deg,#E7DCC5,#B98B3E)',
    images: ['/images/green-atelier-premium-gift-box.jpg', '/images/functional-matcha-collection.jpg'],
    isFeatured: true,
  },
];

function getFallbackProducts({ q, tag, minPrice, maxPrice, sort, featured, page, limit }) {
  const tags = tag.split(',').map((value) => value.trim()).filter(Boolean);
  let products = mockProducts.map((product, index) => ({
    ...product,
    _id: product.id,
    stock: 99,
    isFeatured: index < 4 || product.id === '11',
  }));

  if (q) {
    const normalizedQuery = q.toLocaleLowerCase('vi');
    products = products.filter((product) =>
      product.name.toLocaleLowerCase('vi').includes(normalizedQuery)
    );
  }
  if (tags.length) {
    products = products.filter((product) => tags.includes(product.tag));
  }
  if (minPrice > 0) {
    products = products.filter((product) => product.rawPrice >= minPrice);
  }
  if (maxPrice > 0) {
    products = products.filter((product) => product.rawPrice <= maxPrice);
  }
  if (featured) {
    products = products.filter((product) => product.isFeatured);
  }

  if (sort === 'price_asc') {
    products.sort((a, b) => a.rawPrice - b.rawPrice);
  } else if (sort === 'price_desc') {
    products.sort((a, b) => b.rawPrice - a.rawPrice);
  } else if (sort === 'featured') {
    products.sort((a, b) => Number(b.isFeatured) - Number(a.isFeatured));
  } else {
    products.reverse();
  }

  const total = products.length;
  const skip = (page - 1) * limit;

  return {
    success: true,
    data: products.slice(skip, skip + limit),
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.max(1, Math.ceil(total / limit)),
    },
    source: 'fallback',
  };
}

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
  const { searchParams } = new URL(request.url);

  const q        = searchParams.get('q')?.trim()        || '';
  const tag      = searchParams.get('tag')              || '';
  const minPrice = Number(searchParams.get('minPrice')) || 0;
  const maxPrice = Number(searchParams.get('maxPrice')) || 0;
  const sort     = searchParams.get('sort')             || 'newest';
  const featured = searchParams.get('featured')         === 'true';
  const page     = Math.max(1, Number(searchParams.get('page'))  || 1);
  const limit    = Math.min(48, Math.max(1, Number(searchParams.get('limit')) || 12));
  const queryOptions = { q, tag, minPrice, maxPrice, sort, featured, page, limit };

  const conn = await dbConnect();
  if (!conn) {
    return Response.json(getFallbackProducts(queryOptions));
  }

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
    await Product.bulkWrite(
      catalogAdditions.map((product) => ({
        updateOne: {
          filter: { slug: product.slug },
          update: { $setOnInsert: product },
          upsert: true,
        },
      }))
    );
    await Product.updateOne(
      { slug: 'green-atelier-premium-gift-box' },
      { $set: { images: ['/images/green-atelier-premium-gift-box.jpg', '/images/functional-matcha-collection.jpg'] } }
    );
    await Product.updateOne(
      { slug: 'matcha-moc-chau-co-dien' },
      { $set: { images: ['/images/matcha-moc-chau-co-dien.jpg'] } }
    );
    await Product.updateOne(
      { slug: 'matcha-glow-collagen' },
      { $set: { images: ['/images/matcha-glow-collagen.jpg'] } }
    );
    await Product.updateOne(
      { slug: 'matcha-genki-boost' },
      { $set: { images: ['/images/matcha-genki-boost.jpg'] } }
    );
    await Product.updateOne(
      { slug: 'matcha-immune-shield' },
      { $set: { images: ['/images/matcha-immune-shield.png'] } }
    );
    await Product.updateOne(
      { slug: 'matcha-rose-radiance' },
      { $set: { images: ['/images/matcha-rose-radiance.png'] } }
    );
    await Product.updateOne(
      { slug: 'matcha-citrus-spark' },
      { $set: { images: ['/images/matcha-citrus-spark.png'] } }
    );
    await Product.updateOne(
      { slug: 'matcha-energy-bites' },
      {
        $set: {
          tag: 'Energy',
          desc: 'Bộ đồ ăn nhẹ từ matcha nguyên chất, hạt và trái cây tự nhiên — thơm ngon, giàu chất xơ, tiếp thêm năng lượng lành mạnh mỗi ngày.',
          longDesc: 'Khám phá bộ sưu tập đồ ăn nhẹ matcha gồm bánh quy, thanh năng lượng, viên protein, granola, cụm hạnh nhân và trái cây sấy phủ matcha. Mỗi món được làm từ nguyên liệu có nguồn gốc thực vật, không chất bảo quản nhân tạo, cân bằng giữa vị matcha thanh dịu và độ ngọt tự nhiên.',
          features: ['Matcha nguyên chất, giàu chất chống oxy hoá', 'Nguyên liệu có nguồn gốc thực vật', 'Không màu nhân tạo và không chất bảo quản', 'Giàu chất xơ, hỗ trợ năng lượng và sự tập trung'],
          variants: ['Bánh quy Matcha', 'Thanh năng lượng Matcha', 'Bánh protein Matcha', 'Granola Matcha', 'Cụm hạnh nhân Matcha', 'Trái cây sấy phủ Matcha'],
          images: ['/images/matcha-energy-bites.jpg', '/images/matcha-energy-bites-varieties.jpg'],
        },
      }
    );

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
