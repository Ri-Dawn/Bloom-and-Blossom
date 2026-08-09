import { NextRequest, NextResponse } from 'next/server';
import { ADMIN_COOKIE, makeSessionToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const { password } = await req.json();
  if (!process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Admin password not configured' }, { status: 500 });
  }
  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Incorrect password' }, { status: 401 });
  }
  const token = makeSessionToken();
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 14, // 14 days
    path: '/',
  });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, '', { maxAge: 0, path: '/' });
  return res;
}
