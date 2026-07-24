import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(request) {
  const conn = await dbConnect();
  if (!conn) {
    return Response.json({ success: false, error: 'Không thể kết nối cơ sở dữ liệu.' }, { status: 503 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ success: false, error: 'Dữ liệu không hợp lệ.' }, { status: 400 });
  }

  const { name, email, password, phone } = body;

  if (!name || !email || !password) {
    return Response.json({ success: false, error: 'Vui lòng điền đầy đủ họ tên, email và mật khẩu.' }, { status: 400 });
  }

  if (password.length < 6) {
    return Response.json({ success: false, error: 'Mật khẩu cần ít nhất 6 ký tự.' }, { status: 400 });
  }

  try {
    const existing = await User.findOne({ email: email.toLowerCase().trim() });
    if (existing) {
      return Response.json({ success: false, error: 'Email này đã được đăng ký.' }, { status: 409 });
    }

    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password,
      phone: phone?.trim() || '',
      role: 'customer',
    });

    return Response.json(
      {
        success: true,
        message: 'Đăng ký thành công!',
        user: { id: user._id, name: user.name, email: user.email, role: user.role },
      },
      { status: 201 }
    );
  } catch (err) {
    // Duplicate key race condition
    if (err.code === 11000) {
      return Response.json({ success: false, error: 'Email này đã được đăng ký.' }, { status: 409 });
    }
    return Response.json({ success: false, error: err.message }, { status: 500 });
  }
}
