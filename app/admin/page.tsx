'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { STATUS_STEPS } from '@/lib/types';

export default function AdminPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [selected, setSelected] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [reply, setReply] = useState('');
  const [courier, setCourier] = useState('');
  const [trackingNumber, setTrackingNumber] = useState('');
  const [trackingUrl, setTrackingUrl] = useState('');
  const router = useRouter();

  async function loadOrders() {
    const res = await fetch('/api/orders');
    if (res.status === 401) return router.push('/admin/login');
    const data = await res.json();
    setOrders(data.orders ?? []);
  }

  useEffect(() => {
    loadOrders();
  }, []);

  async function selectOrder(o: any) {
    setSelected(o);
    setCourier(o.courier_name || '');
    setTrackingNumber(o.tracking_number || '');
    setTrackingUrl(o.tracking_url || '');
    const res = await fetch(`/api/chat?session=${encodeURIComponent(o.id)}`);
    const data = await res.json();
    setMessages(data.messages ?? []);
  }

  async function updateStatus(status: string) {
    await fetch(`/api/orders/${selected.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, courier_name: courier, tracking_number: trackingNumber, tracking_url: trackingUrl }),
    });
    await loadOrders();
    setSelected((s: any) => ({ ...s, status }));
  }

  async function confirmPayment() {
    await fetch(`/api/orders/${selected.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ payment_status: 'paid' }),
    });
    await loadOrders();
    setSelected((s: any) => ({ ...s, payment_status: 'paid' }));
  }

  async function sendReply() {
    if (!reply.trim()) return;
    await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ session_id: selected.id, sender: 'shop', message_type: 'text', content: reply }),
    });
    setReply('');
    const res = await fetch(`/api/chat?session=${encodeURIComponent(selected.id)}`);
    const data = await res.json();
    setMessages(data.messages ?? []);
  }

  async function logout() {
    await fetch('/api/admin/login', { method: 'DELETE' });
    router.push('/admin/login');
  }

  return (
    <main className="max-w-6xl mx-auto px-4 pt-8 pb-24">
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-display text-2xl text-stone900">Admin</h1>
        <button onClick={logout} className="text-[12px] text-stone500 underline">Log out</button>
      </div>

      <div className="grid md:grid-cols-[1fr_1.4fr] gap-6">
        <div className="glass-tile p-3 max-h-[70vh] overflow-y-auto">
          {orders.length === 0 && <div className="p-4 text-[12.5px] text-stone500">No orders yet.</div>}
          {orders.map((o) => (
            <button
              key={o.id}
              onClick={() => selectOrder(o)}
              className={`w-full text-left p-3 rounded-lg mb-1 text-[12.5px] ${
                selected?.id === o.id ? 'bg-rani/10 border border-rani' : 'hover:bg-white/60'
              }`}
            >
              <div className="flex justify-between">
                <span className="font-semibold text-stone900">{o.id}</span>
                <span className="text-stone500">₹{Number(o.amount).toLocaleString('en-IN')}</span>
              </div>
              <div className="text-stone500">{o.item_name} — {o.customer_name}</div>
              <div className="flex gap-2 mt-1">
                <span className="text-[10px] uppercase tracking-wide text-rani">{o.status.replace('_', ' ')}</span>
                <span className="text-[10px] uppercase tracking-wide text-stone500">{o.payment_status.replace('_', ' ')}</span>
              </div>
            </button>
          ))}
        </div>

        {selected ? (
          <div className="glass-tile p-5">
            <div className="font-display text-xl mb-1">{selected.item_name}</div>
            <div className="text-[12.5px] text-stone500 mb-4">
              {selected.customer_name} · {selected.customer_email} · {selected.customer_phone}
            </div>
            <div className="text-[12.5px] text-stone900 mb-4">{selected.shipping_address}</div>

            {selected.customisation && Object.keys(selected.customisation).length > 0 && (
              <div className="text-[12px] text-stone500 mb-4">
                Customisation: {JSON.stringify(selected.customisation)}
              </div>
            )}

            {selected.payment_status !== 'paid' ? (
              <button onClick={confirmPayment} className="bg-stone900 text-stone50 rounded-full px-4 py-2 text-[12px] font-semibold mb-5">
                Confirm Payment Received
              </button>
            ) : (
              <div className="text-[12px] text-green-700 mb-5">✓ Payment confirmed</div>
            )}

            <div className="grid grid-cols-2 gap-2 mb-3">
              <input value={courier} onChange={(e) => setCourier(e.target.value)} placeholder="Courier name" className="rounded-lg border border-stone300 px-3 py-2 text-[12.5px]" />
              <input value={trackingNumber} onChange={(e) => setTrackingNumber(e.target.value)} placeholder="Tracking number" className="rounded-lg border border-stone300 px-3 py-2 text-[12.5px]" />
              <input value={trackingUrl} onChange={(e) => setTrackingUrl(e.target.value)} placeholder="Tracking URL" className="rounded-lg border border-stone300 px-3 py-2 text-[12.5px] col-span-2" />
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {STATUS_STEPS.map((s) => (
                <button
                  key={s.key}
                  onClick={() => updateStatus(s.key)}
                  className={`text-[11px] px-3 py-1.5 rounded-full border ${
                    selected.status === s.key ? 'bg-rani text-white border-rani' : 'border-stone300 text-stone900'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>

            <div className="border-t border-stone100 pt-4">
              <div className="text-[12px] text-stone500 mb-2">Design Studio conversation</div>
              <div className="max-h-56 overflow-y-auto flex flex-col gap-2 mb-3">
                {messages.map((m) => (
                  <div key={m.id} className={`text-[12px] px-3 py-2 rounded-lg max-w-[85%] ${m.sender === 'shop' ? 'self-end bg-stone900 text-stone50' : 'self-start bg-white border border-stone100'}`}>
                    {m.message_type === 'voice' ? <audio controls src={m.content} className="w-48 h-8" /> : m.content}
                  </div>
                ))}
                {messages.length === 0 && <div className="text-[11.5px] text-stone500">No messages yet.</div>}
              </div>
              <div className="flex gap-2">
                <input value={reply} onChange={(e) => setReply(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && sendReply()} placeholder="Reply…" className="flex-1 rounded-lg border border-stone300 px-3 py-2 text-[12.5px]" />
                <button onClick={sendReply} className="bg-stone900 text-stone50 rounded-lg px-4 text-[12px]">Send</button>
              </div>
            </div>
          </div>
        ) : (
          <div className="glass-tile p-8 text-center text-stone500 text-[13px]">Select an order to view details.</div>
        )}
      </div>
    </main>
  );
}
