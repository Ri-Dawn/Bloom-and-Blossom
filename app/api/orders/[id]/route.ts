import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { ADMIN_COOKIE, verifySessionToken } from '@/lib/auth';
import { sendStatusUpdate, sendOrderConfirmed } from '@/lib/email';
import { buildUpiLink, qrImageUrl } from '@/lib/upi';
import type { Order } from '@/lib/types';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const db = supabaseAdmin();
  const isAdmin = verifySessionToken(req.cookies.get(ADMIN_COOKIE)?.value);
  const email = req.nextUrl.searchParams.get('email');

  const { data, error } = await db.from('orders').select('*').eq('id', params.id).single();
  if (error || !data) return NextResponse.json({ error: 'Order not found' }, { status: 404 });

  if (!isAdmin) {
    if (!email || email.toLowerCase() !== (data.customer_email as string).toLowerCase()) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }
  }

  const { data: history } = await db
    .from('order_status_history')
    .select('*')
    .eq('order_id', params.id)
    .order('created_at', { ascending: true });

  const upiLink = buildUpiLink({
    vpa: process.env.UPI_VPA || '',
    amount: Number(data.amount),
    note: `Order ${params.id}`,
  });

  return NextResponse.json({
    order: data,
    history: history ?? [],
    payment: { upiLink, qrSrc: qrImageUrl(upiLink) },
  });
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const isAdmin = verifySessionToken(req.cookies.get(ADMIN_COOKIE)?.value);
  if (!isAdmin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const db = supabaseAdmin();

  const updates: Partial<Order> & { updated_at: string } = {
    updated_at: new Date().toISOString(),
  };
  if (body.status) updates.status = body.status;
  if (body.payment_status) updates.payment_status = body.payment_status;
  if (body.courier_name !== undefined) updates.courier_name = body.courier_name;
  if (body.tracking_number !== undefined) updates.tracking_number = body.tracking_number;
  if (body.tracking_url !== undefined) updates.tracking_url = body.tracking_url;

  const { data, error } = await db.from('orders').update(updates).eq('id', params.id).select().single();
  if (error || !data) return NextResponse.json({ error: 'Could not update order' }, { status: 500 });

  if (body.status) {
    await db.from('order_status_history').insert({
      order_id: params.id,
      status: body.status,
      note: body.note ?? null,
    });
    try {
      const trackUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/order/${params.id}`;
      await sendStatusUpdate(data as Order, trackUrl);
    } catch (e) {
      console.error('Email send failed', e);
    }
  }

  if (body.payment_status === 'paid') {
    try {
      const trackUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/order/${params.id}`;
      await sendOrderConfirmed(data as Order, trackUrl);
    } catch (e) {
      console.error('Email send failed', e);
    }
  }

  return NextResponse.json({ order: data });
}
