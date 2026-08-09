import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { ADMIN_COOKIE, verifySessionToken } from '@/lib/auth';
import { sendNewChatNotice } from '@/lib/email';

export async function GET(req: NextRequest) {
  const session = req.nextUrl.searchParams.get('session');
  if (!session) return NextResponse.json({ error: 'Missing session' }, { status: 400 });
  const db = supabaseAdmin();
  const { data, error } = await db
    .from('chat_messages')
    .select('*')
    .eq('session_id', session)
    .order('created_at', { ascending: true });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ messages: data });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { session_id, sender, message_type, content, context } = body;
  if (!session_id || !sender || !message_type || !content) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  // Only admins may post as 'shop'; anyone can post as 'customer' for their own session.
  if (sender === 'shop') {
    const isAdmin = verifySessionToken(req.cookies.get(ADMIN_COOKIE)?.value);
    if (!isAdmin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const db = supabaseAdmin();
  const { error } = await db.from('chat_messages').insert({
    session_id,
    sender,
    message_type,
    content,
  });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  if (sender === 'customer') {
    try {
      const preview = message_type === 'voice' ? '🎤 New voice note' : content.slice(0, 140);
      await sendNewChatNotice(context ? `${session_id} (${context})` : session_id, preview);
    } catch (e) {
      console.error('Email send failed', e);
    }
  }

  return NextResponse.json({ ok: true });
}
