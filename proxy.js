import { NextResponse } from 'next/server';

const SESSION_COOKIE = 'ga_session';

/**
 * Proxy bảo mật route /admin/*
 * - Chưa login          → redirect /admin/login
 * - Login nhưng không phải admin → redirect /admin/login + xóa cookie
 * - Admin hợp lệ        → cho qua
 */
export async function proxy(request) {
  const { pathname } = request.nextUrl;

  // Bỏ qua /admin/login để tránh redirect loop
  if (pathname === '/admin/login') {
    return NextResponse.next();
  }

  const sessionCookie = request.cookies.get(SESSION_COOKIE);

  if (!sessionCookie?.value) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  // Gọi /api/auth/me để xác minh session + role
  try {
    const meUrl = new URL('/api/auth/me', request.url);
    const res = await fetch(meUrl, {
      headers: { Cookie: `${SESSION_COOKIE}=${sessionCookie.value}` },
    });

    if (!res.ok) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    const data = await res.json();

    if (data.user?.role !== 'admin') {
      const response = NextResponse.redirect(new URL('/admin/login', request.url));
      response.cookies.delete(SESSION_COOKIE);
      return response;
    }

    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }
}

export const config = {
  matcher: '/admin/:path*',
};
