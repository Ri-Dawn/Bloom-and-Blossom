'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function TrackPage() {
  const [orderId, setOrderId] = useState('');
  const [email, setEmail] = useState('');
  const router = useRouter();

  function go() {
    if (!orderId || !email) return;
    router.push(`/order/${orderId.trim()}?email=${encodeURIComponent(email.trim())}`);
  }

  return (
    <main className="max-w-sm mx-auto px-4 pt-16 text-center">
      <div className="glass-tile p-7">
        <div className="font-display text-2xl text-stone900 mb-2">Track Your Order</div>
        <p className="text-[12.5px] text-stone500 mb-5">Enter your order ID and the email you used at checkout.</p>
        <input
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          placeholder="Order ID, e.g. BB-4471"
          className="w-full rounded-lg border border-stone300 bg-white/70 px-3 py-2.5 text-[13px] mb-3"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
          className="w-full rounded-lg border border-stone300 bg-white/70 px-3 py-2.5 text-[13px] mb-4"
        />
        <button onClick={go} className="w-full bg-stone900 text-stone50 rounded-full py-2.5 text-[13px] font-semibold">
          Track
        </button>
      </div>
    </main>
  );
}
