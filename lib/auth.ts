import { createHmac, timingSafeEqual } from 'crypto';

const COOKIE_NAME = 'bb_admin';

function secret() {
  const s = process.env.ADMIN_SESSION_SECRET;
  if (!s) throw new Error('ADMIN_SESSION_SECRET is missing. Check .env.local');
  return s;
}

export function makeSessionToken() {
  const payload = `admin:${Date.now()}`;
  const sig = createHmac('sha256', secret()).update(payload).digest('hex');
  return Buffer.from(`${payload}.${sig}`).toString('base64url');
}

export function verifySessionToken(token: string | undefined | null) {
  if (!token) return false;
  try {
    const decoded = Buffer.from(token, 'base64url').toString('utf8');
    const [payload, sig] = decoded.split('.');
    if (!payload || !sig) return false;
    const expected = createHmac('sha256', secret()).update(payload).digest('hex');
    const a = Buffer.from(sig);
    const b = Buffer.from(expected);
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

export const ADMIN_COOKIE = COOKIE_NAME;
