import { cookies } from 'next/headers';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

const SESSION_COOKIE = 'ga_session';

export async function GET() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE);

  if (!sessionCookie?.value) {
    return Response.json({ success: false, user: null }, { status: 401 });
  }

  const conn = await dbConnect();
  if (!conn) {
    return Response.json({ success: false, error: 'Không thể kết nối cơ sở dữ liệu.' }, { status: 503 });
  }

  try {
    const user = await User.findById(sessionCookie.value);
    if (!user) {
      // Cookie tồn tại nhưng user không tồn tại → xóa cookie
      cookieStore.set(SESSION_COOKIE, '', { maxAge: 0, path: '/' });
      return Response.json({ success: false, user: null }, { status: 401 });
    }

    return Response.json({
      success: true,
      user: { id: user._id, name: user.name, email: user.email, role: user.role, phone: user.phone },
    });
  } catch (err) {
    return Response.json({ success: false, error: err.message }, { status: 500 });
  }
}
