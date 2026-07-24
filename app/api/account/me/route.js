import { cookies } from 'next/headers';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

const SESSION_COOKIE = 'ga_session';

async function getSessionUser() {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE);
  if (!session?.value) return null;

  await dbConnect();
  return User.findById(session.value);
}

// ── GET /api/account/me ───────────────────────────────────────────────────────
export async function GET() {
  const user = await getSessionUser();
  if (!user) {
    return Response.json({ success: false, error: 'Chưa đăng nhập.' }, { status: 401 });
  }

  return Response.json({
    success: true,
    user: {
      id:    user._id,
      name:  user.name,
      email: user.email,
      phone: user.phone,
      role:  user.role,
    },
  });
}

// ── PATCH /api/account/me ─────────────────────────────────────────────────────
export async function PATCH(request) {
  const user = await getSessionUser();
  if (!user) {
    return Response.json({ success: false, error: 'Chưa đăng nhập.' }, { status: 401 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ success: false, error: 'Dữ liệu không hợp lệ.' }, { status: 400 });
  }

  const { name, phone } = body;

  // Chỉ cho phép cập nhật name và phone — không cho đổi email/role qua endpoint này
  if (name !== undefined) user.name  = name.trim();
  if (phone !== undefined) user.phone = phone.trim();

  try {
    await user.save();
    return Response.json({
      success: true,
      message: 'Cập nhật thành công!',
      user: { id: user._id, name: user.name, email: user.email, phone: user.phone },
    });
  } catch (err) {
    return Response.json({ success: false, error: err.message }, { status: 500 });
  }
}
