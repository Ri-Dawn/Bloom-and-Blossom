import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { sendPaymentAwaitingVerification } from '@/lib/email';
import type { Order } from '@/lib/types';

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const db = supabaseAdmin();

  const { data, error } = await db
    .from('orders')
    .update({ payment_status: 'awaiting_verification', updated_at: new Date().toISOString() })
    .eq('id', params.id)
    .select()
    .single();

  if (error || !data) return NextResponse.json({ error: 'Order not found' }, { status: 404 });

  try {
    await sendPaymentAwaitingVerification(data as Order);
  } catch (e) {
    console.error('Email send failed', e);
  }

  return NextResponse.json({ ok: true });
}
