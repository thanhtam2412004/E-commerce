import { cookies } from 'next/headers';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

// Session đơn giản: lưu userId trong httpOnly cookie (không dùng JWT để tránh thêm dependency)
const SESSION_COOKIE = 'ga_session';
const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 ngày (giây)

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

  const { email, password } = body;

  if (!email || !password) {
    return Response.json({ success: false, error: 'Vui lòng nhập email và mật khẩu.' }, { status: 400 });
  }

  try {
    // Cần select password vì schema có select: false
    const user = await User.findOne({ email: email.toLowerCase().trim() }).select('+password');

    if (!user) {
      return Response.json({ success: false, error: 'Email hoặc mật khẩu không đúng.' }, { status: 401 });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return Response.json({ success: false, error: 'Email hoặc mật khẩu không đúng.' }, { status: 401 });
    }

    // Ghi session cookie
    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE, user._id.toString(), {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      maxAge: SESSION_MAX_AGE,
      // secure: true  — bật khi deploy production HTTPS
    });

    return Response.json({
      success: true,
      message: 'Đăng nhập thành công!',
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    return Response.json({ success: false, error: err.message }, { status: 500 });
  }
}
