import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import Category from '@/models/Category';
import Product from '@/models/Product';
import Blog from '@/models/Blog';

const seedCategories = [
  { name: 'Focus', slug: 'focus', desc: 'Sản phẩm hỗ trợ tập trung và làm việc hiệu quả', count: 4 },
  { name: 'Energy', slug: 'energy', desc: 'Sản phẩm tăng cường năng lượng và sức bền', count: 3 },
  { name: 'Calm', slug: 'calm', desc: 'Sản phẩm thư giãn và cân bằng tâm trí', count: 1 },
  { name: 'Beauty', slug: 'beauty', desc: 'Sản phẩm chăm sóc sắc đẹp và làn da', count: 3 },
  { name: 'Immunity', slug: 'immunity', desc: 'Sản phẩm tăng cường hệ miễn dịch', count: 1 },
];

const seedProducts = [
  { name: 'Matcha Mộc Châu Cổ Điển', slug: 'matcha-moc-chau-co-dien', tag: 'Focus', cat: 'Ceremonial Grade', desc: 'Vị umami đậm, hậu ngọt thanh — lý tưởng cho buổi sáng tập trung.', price: 285000, rawPrice: 285000, stock: 48, grad: 'linear-gradient(150deg,#DCE6C8,#B9C9A6)', images: ['/images/matcha-moc-chau-co-dien.jpg'], isFeatured: true },
  { name: 'Matcha Genki Boost', slug: 'matcha-genki-boost', tag: 'Energy', cat: 'Đặc tuyển', desc: 'Kết hợp matcha và nhân sâm nhẹ — năng lượng bền vững.', price: 320000, rawPrice: 320000, stock: 32, grad: 'linear-gradient(150deg,#F3E3C2,#D9AE6C)', images: ['/images/matcha-genki-boost.jpg'], isFeatured: true },
  { name: 'Matcha Lavender Calm', slug: 'matcha-lavender-calm', tag: 'Calm', cat: 'Đêm thư giãn', desc: 'Hoà quyện oải hương dịu nhẹ — làm chậm nhịp sống.', price: 305000, rawPrice: 305000, stock: 25, grad: 'linear-gradient(150deg,#E4D9E8,#C9B8D6)', images: ['/images/matcha-lavender-calm.jpg'], isFeatured: false },
  { name: 'Matcha Glow Collagen', slug: 'matcha-glow-collagen', tag: 'Beauty', cat: 'Chăm sóc da', desc: 'Bổ sung collagen thuỷ phân — làn da căng mướt.', price: 349000, rawPrice: 349000, stock: 20, grad: 'linear-gradient(150deg,#F0D8DC,#E0AEB6)', images: ['/images/matcha-glow-collagen.jpg'], isFeatured: true },
  { name: 'Matcha Immune Shield', slug: 'matcha-immune-shield', tag: 'Immunity', cat: 'Đề kháng', desc: 'Bổ sung vitamin C tự nhiên — tăng cường đề kháng.', price: 315000, rawPrice: 315000, stock: 40, grad: 'linear-gradient(150deg,#D8E8DC,#A8C9B0)', images: ['/images/matcha-immune-shield.png', '/images/matcha-immune-shield-detail.png'], isFeatured: false },
  { name: 'Matcha Zen Morning', slug: 'matcha-zen-morning', tag: 'Focus', cat: 'Ceremonial Grade', desc: 'Dòng nhẹ nhàng cho người mới bắt đầu uống matcha.', price: 265000, rawPrice: 265000, stock: 55, grad: 'linear-gradient(150deg,#DCE6C8,#B9C9A6)', images: ['/images/matcha-zen-morning.png'], isFeatured: true },
  { name: 'Matcha Citrus Spark', slug: 'matcha-citrus-spark', tag: 'Energy', cat: 'Đặc tuyển', desc: 'Hương cam quýt tươi mát, đánh thức năng lượng.', price: 298000, rawPrice: 298000, stock: 18, grad: 'linear-gradient(150deg,#F3E3C2,#D9AE6C)', images: ['/images/matcha-citrus-spark.png'], isFeatured: false },
  { name: 'Matcha Rose Radiance', slug: 'matcha-rose-radiance', tag: 'Beauty', cat: 'Chăm sóc da', desc: 'Chiết xuất hoa hồng — nuôi dưỡng làn da từ bên trong.', price: 339000, rawPrice: 339000, stock: 22, grad: 'linear-gradient(150deg,#F0D8DC,#E0AEB6)', images: ['/images/matcha-rose-radiance.png'], isFeatured: false },
  { name: 'Matcha Fresh Latte', slug: 'matcha-fresh-latte', tag: 'Energy', cat: 'Đồ uống pha sẵn', desc: 'Matcha latte đóng chai mịn màng, thanh mát — sẵn sàng thưởng thức mọi lúc.', price: 69000, rawPrice: 69000, stock: 60, grad: 'linear-gradient(150deg,#DCE8D2,#A8C49A)', isFeatured: false },
  { name: 'Matcha Energy Bites', slug: 'matcha-energy-bites', tag: 'Energy', cat: 'Đồ ăn nhẹ lành mạnh', desc: 'Bộ đồ ăn nhẹ từ matcha nguyên chất, hạt và trái cây tự nhiên — thơm ngon, giàu chất xơ, tiếp thêm năng lượng lành mạnh mỗi ngày.', longDesc: 'Khám phá bộ sưu tập đồ ăn nhẹ matcha gồm bánh quy, thanh năng lượng, viên protein, granola, cụm hạnh nhân và trái cây sấy phủ matcha. Mỗi món được làm từ nguyên liệu có nguồn gốc thực vật, không chất bảo quản nhân tạo, cân bằng giữa vị matcha thanh dịu và độ ngọt tự nhiên.', features: ['Matcha nguyên chất, giàu chất chống oxy hoá', 'Nguyên liệu có nguồn gốc thực vật', 'Không màu nhân tạo và không chất bảo quản', 'Giàu chất xơ, hỗ trợ năng lượng và sự tập trung'], variants: ['Bánh quy Matcha', 'Thanh năng lượng Matcha', 'Bánh protein Matcha', 'Granola Matcha', 'Cụm hạnh nhân Matcha', 'Trái cây sấy phủ Matcha'], images: ['/images/matcha-energy-bites.jpg', '/images/matcha-energy-bites-varieties.jpg'], price: 125000, rawPrice: 125000, stock: 45, grad: 'linear-gradient(150deg,#E8DFC8,#C9AD75)', isFeatured: false },
  { name: 'Green Atelier Premium Gift Box', slug: 'green-atelier-premium-gift-box', tag: 'Focus', cat: 'Hộp quà cao cấp', desc: 'Hộp quà matcha sang trọng gồm trà tuyển chọn và phụ kiện pha chế thủ công.', price: 689000, rawPrice: 689000, stock: 15, grad: 'linear-gradient(150deg,#E7DCC5,#B98B3E)', images: ['/images/green-atelier-premium-gift-box.jpg', '/images/functional-matcha-collection.jpg'], isFeatured: true },
];

const seedBlogs = [
  { title: 'Vì sao Matcha Mộc Châu khác biệt so với matcha Nhật Bản?', slug: 'matcha-moc-chau-vs-nhat-ban', desc: 'Khám phá thổ nhưỡng và quy trình xay đá truyền thống.', content: 'Matcha từ lâu đã trở thành một phần không thể thiếu trong văn hóa trà đạo và phong cách sống hiện đại...', date: '18 Th7, 2026', grad: 'linear-gradient(160deg,#DCE6C8,#8FAE6C)', status: 'published' },
  { title: 'Nghi thức pha matcha buổi sáng giúp bạn tập trung cả ngày', slug: 'nghi-thuc-pha-matcha-buoi-sang', desc: 'Ba bước đơn giản với chasen và chawan.', content: 'Pha một tách matcha không chỉ là việc hoà tan bột trà mà còn là một nghi thức chánh niệm...', date: '10 Th7, 2026', grad: 'linear-gradient(160deg,#F3E3C2,#D9AE6C)', status: 'published' },
  { title: '5 công dụng của matcha bạn có thể chưa biết', slug: '5-cong-dung-cua-matcha', desc: 'Từ Focus đến Immunity — lợi ích khoa học của trà xanh.', content: 'L-theanine, EGCG, chlorophyll — những hợp chất đặc biệt làm nên sức mạnh của matcha...', date: '2 Th7, 2026', grad: 'linear-gradient(160deg,#E4D9E8,#C9B8D6)', status: 'published' },
  { title: 'Phân biệt Ceremonial Grade và Culinary Grade', slug: 'ceremonial-vs-culinary-grade', desc: 'Loại nào phù hợp để uống, loại nào để làm bánh?', content: 'Hai dòng matcha phổ biến nhất trên thị trường — mỗi loại có đặc tính và ứng dụng riêng biệt...', date: '24 Th6, 2026', grad: 'linear-gradient(160deg,#D8E8DC,#A8C9B0)', status: 'published' },
  { title: 'Bảo quản matcha đúng cách để giữ trọn hương vị', slug: 'bao-quan-matcha-dung-cach', desc: 'Những sai lầm phổ biến khiến matcha nhanh mất vị.', content: 'Matcha rất nhạy cảm với ánh sáng, nhiệt độ và độ ẩm — đây là những bí quyết bảo quản đúng cách...', date: '15 Th6, 2026', grad: 'linear-gradient(160deg,#F0D8DC,#E0AEB6)', status: 'published' },
  { title: 'Matcha latte tại nhà: công thức chuẩn quán', slug: 'matcha-latte-tai-nha', desc: 'Tỷ lệ đánh bột và sữa để có lớp bọt mịn hoàn hảo.', content: 'Để có một ly matcha latte chuẩn vị quán cà phê tại nhà, bạn chỉ cần vài dụng cụ đơn giản...', date: '5 Th6, 2026', grad: 'linear-gradient(160deg,#DCE6C8,#B9C9A6)', status: 'published' },
];

export async function GET() {
  const connection = await dbConnect();

  if (!connection) {
    return Response.json(
      {
        success: false,
        error: 'MongoDB is unavailable. Add your current IP to the Atlas whitelist or run a local MongoDB instance.',
      },
      { status: 503 }
    );
  }

  try {
    // Xóa dữ liệu cũ trước khi seed
    await User.deleteMany({ role: 'admin' });
    await Category.deleteMany({});
    await Product.deleteMany({});
    await Blog.deleteMany({});

    // Seed Admin user
    const adminUser = await User.create({
      name: 'Green Atelier Admin',
      email: 'admin@greenatelier.vn',
      password: 'admin@GA2026',
      role: 'admin',
    });

    // Seed Categories
    const categories = await Category.insertMany(seedCategories);

    // Seed Products
    const products = await Product.insertMany(seedProducts);

    // Seed Blogs
    const blogs = await Blog.insertMany(seedBlogs);

    return Response.json({
      success: true,
      message: 'Seeded database successfully!',
      counts: {
        users: 1,
        categories: categories.length,
        products: products.length,
        blogs: blogs.length,
      },
    });
  } catch (error) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
