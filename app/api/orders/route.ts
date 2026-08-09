import { NextRequest, NextResponse } from 'next/server';
import { customAlphabet } from 'nanoid';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { ADMIN_COOKIE, verifySessionToken } from '@/lib/auth';

const genId = customAlphabet('0123456789', 4);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      customer_name,
      customer_email,
      customer_phone,
      shipping_address,
      country,
      category,
      item_name,
      customisation,
      amount,
    } = body;

    if (!customer_name || !customer_email || !shipping_address || !item_name || !amount) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const id = `BB-${genId()}`;
    const db = supabaseAdmin();

    const { error } = await db.from('orders').insert({
      id,
      customer_name,
      customer_email,
      customer_phone: customer_phone || null,
      shipping_address,
      country: country || 'IN',
      category,
      item_name,
      customisation: customisation || {},
      amount,
      currency: 'INR',
      status: 'received',
      payment_status: 'pending',
    });

    if (error) throw error;

    await db.from('order_status_history').insert({
      order_id: id,
      status: 'received',
      note: 'Order placed by customer.',
    });

    return NextResponse.json({ id });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Could not create order' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  // Admin-only: list recent orders
  const token = req.cookies.get(ADMIN_COOKIE)?.value;
  if (!verifySessionToken(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const db = supabaseAdmin();
  const { data, error } = await db.from('orders').select('*').order('created_at', { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ orders: data });
}
