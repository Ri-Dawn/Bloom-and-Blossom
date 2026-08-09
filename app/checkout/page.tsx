'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function CheckoutInner() {
  const params = useSearchParams();
  const router = useRouter();

  const cat = params.get('cat') ?? '';
  const item = params.get('item') ?? '';
  const name = params.get('name') ?? 'Custom Piece';
  const price = Number(params.get('price') ?? '0');
  const customisationRaw = params.get('customisation');
  const customisation = customisationRaw ? JSON.parse(customisationRaw) : {};

  const [form, setForm] = useState({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    shipping_address: '',
    country: 'IN',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function placeOrder() {
    if (!form.customer_name || !form.customer_email || !form.shipping_address) {
      setError('Please fill in your name, email, and shipping address.');
      return;
    }
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          category: cat,
          item_name: name,
          customisation,
          amount: price,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Something went wrong');
      router.push(`/pay/${data.id}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="max-w-3xl mx-auto px-4 pt-8 pb-20">
      <h1 className="font-display text-2xl text-stone900 mb-6">Checkout</h1>

      <div className="glass-tile p-5 mb-6 flex justify-between items-center">
        <div>
          <div className="font-display text-[17px] text-stone900">{name}</div>
          {customisation?.charms?.length > 0 && (
            <div className="text-[12px] text-stone500 mt-1">Charms: {customisation.charms.join(', ')}</div>
          )}
          {customisation?.engrave && <div className="text-[12px] text-stone500">&quot;{customisation.engrave}&quot;</div>}
        </div>
        <div className="font-display text-xl text-rani">₹{price.toLocaleString('en-IN')}</div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="glass-tile p-5 flex flex-col gap-3 md:col-span-2">
          <label className="text-[12px] text-stone500">Full name</label>
          <input className="rounded-lg border border-stone300 bg-white/70 px-3 py-2.5 text-[13px]" value={form.customer_name} onChange={(e) => update('customer_name', e.target.value)} />
        </div>
        <div className="glass-tile p-5 flex flex-col gap-3">
          <label className="text-[12px] text-stone500">Email</label>
          <input type="email" className="rounded-lg border border-stone300 bg-white/70 px-3 py-2.5 text-[13px]" value={form.customer_email} onChange={(e) => update('customer_email', e.target.value)} />
        </div>
        <div className="glass-tile p-5 flex flex-col gap-3">
          <label className="text-[12px] text-stone500">Phone</label>
          <input className="rounded-lg border border-stone300 bg-white/70 px-3 py-2.5 text-[13px]" value={form.customer_phone} onChange={(e) => update('customer_phone', e.target.value)} />
        </div>
        <div className="glass-tile p-5 flex flex-col gap-3">
          <label className="text-[12px] text-stone500">Country</label>
          <select className="rounded-lg border border-stone300 bg-white/70 px-3 py-2.5 text-[13px]" value={form.country} onChange={(e) => update('country', e.target.value)}>
            <option value="IN">India</option>
            <option value="OTHER">Outside India</option>
          </select>
        </div>
        <div className="glass-tile p-5 flex flex-col gap-3">
          <label className="text-[12px] text-stone500">Shipping address</label>
          <textarea className="rounded-lg border border-stone300 bg-white/70 px-3 py-2.5 text-[13px] min-h-[70px]" value={form.shipping_address} onChange={(e) => update('shipping_address', e.target.value)} />
        </div>
      </div>

      {form.country !== 'IN' && (
        <div className="mt-4 glass-tile p-4 text-[12px] text-stone500">
          Payment for international orders is by UPI (works for many NRE/NRO Indian bank accounts) — if that doesn&apos;t work for you, mention it in the Design Studio chat after placing your order and we&apos;ll sort an alternative.
        </div>
      )}

      {error && <div className="mt-4 text-[13px] text-rani">{error}</div>}

      <button
        onClick={placeOrder}
        disabled={submitting}
        className="mt-6 w-full bg-stone900 text-stone50 rounded-full py-3.5 text-[13px] font-semibold uppercase tracking-wide disabled:opacity-50"
      >
        {submitting ? 'Placing order…' : `Place Order — ₹${price.toLocaleString('en-IN')}`}
      </button>
      <p className="text-[11px] text-stone500 text-center mt-3">
        You&apos;ll pay by UPI on the next screen — straight to our account, no card details needed.
      </p>
    </main>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="pt-24 text-center text-stone500">Loading…</div>}>
      <CheckoutInner />
    </Suspense>
  );
}
