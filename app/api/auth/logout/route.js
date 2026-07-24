import { cookies } from 'next/headers';

const SESSION_COOKIE = 'ga_session';

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, '', { maxAge: 0, path: '/' });

  return Response.json({ success: true, message: 'Đã đăng xuất.' });
}
