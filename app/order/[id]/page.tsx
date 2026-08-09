'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { STATUS_STEPS } from '@/lib/types';
import ChatWidget from '@/components/ChatWidget';

function OrderInner({ id }: { id: string }) {
  const params = useSearchParams();
  const email = params.get('email') ?? '';
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/orders/${id}?email=${encodeURIComponent(email)}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Order not found');
        setOrder(data.order);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Order not found');
      } finally {
        setLoading(false);
      }
    }
    if (email) load();
    else {
      setError('Missing email — please track your order from the Track Order page.');
      setLoading(false);
    }
  }, [id, email]);

  if (loading) return <div className="pt-24 text-center text-stone500">Loading…</div>;
  if (error || !order)
    return <div className="pt-24 text-center text-rani px-4">{error || 'Order not found'}</div>;

  const currentIndex = STATUS_STEPS.findIndex((s) => s.key === order.status);

  return (
    <main className="max-w-xl mx-auto px-4 pt-10 pb-24">
      <div className="text-[11px] tracking-[0.14em] uppercase text-stone500 mb-2">Order {order.id}</div>
      <h1 className="font-display text-2xl text-stone900 mb-1">{order.item_name}</h1>
      <div className="text-[12.5px] text-stone500 mb-8">
        Placed {new Date(order.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
      </div>

      {order.payment_status !== 'paid' && (
        <div className="glass-tile p-4 mb-6 text-[12.5px]">
          Payment status: <span className="text-rani font-semibold">{order.payment_status.replace('_', ' ')}</span>
          {order.payment_status === 'pending' && (
            <div className="mt-2">
              <a href={`/pay/${order.id}`} className="text-rani font-semibold">Complete payment →</a>
            </div>
          )}
        </div>
      )}

      <div className="glass-tile p-6 mb-6">
        <div className="flex justify-between">
          {STATUS_STEPS.map((step, i) => (
            <div key={step.key} className="flex-1 text-center">
              <div
                className={`w-2.5 h-2.5 rounded-full mx-auto mb-2 ${
                  i <= currentIndex ? 'bg-rani' : 'bg-stone300'
                }`}
              />
              <div className={`text-[10px] leading-tight ${i === currentIndex ? 'text-rani font-semibold' : 'text-stone500'}`}>
                {step.label}
              </div>
            </div>
          ))}
        </div>
        {order.status === 'dispatched' && order.tracking_number && (
          <div className="mt-6 pt-5 border-t border-stone100 text-[13px]">
            <div className="text-stone500">Courier</div>
            <div className="text-stone900 font-semibold">{order.courier_name || '—'} · {order.tracking_number}</div>
            {order.tracking_url && (
              <a href={order.tracking_url} target="_blank" className="text-rani font-semibold inline-block mt-2">
                Live tracking →
              </a>
            )}
          </div>
        )}
        <p className="text-[11px] text-stone500 mt-5">
          We message you automatically at every stage — no need to check in.
        </p>
      </div>

      <div className="glass-tile p-5 text-[12.5px]">
        <div className="text-stone500 mb-1">Shipping to</div>
        <div className="text-stone900">{order.shipping_address}</div>
      </div>

      <ChatWidget sessionId={order.id} context={order.item_name} />
    </main>
  );
}

export default function OrderPage({ params }: { params: { id: string } }) {
  return (
    <Suspense fallback={<div className="pt-24 text-center text-stone500">Loading…</div>}>
      <OrderInner id={params.id} />
    </Suspense>
  );
}
