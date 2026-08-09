'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function PayPage({ params }: { params: { orderId: string } }) {
  const [email, setEmail] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [checking, setChecking] = useState(false);
  const [orderData, setOrderData] = useState<any>(null);
  const [payment, setPayment] = useState<{ upiLink: string; qrSrc: string } | null>(null);
  const [err, setErr] = useState('');

  async function lookup() {
    setChecking(true);
    setErr('');
    try {
      const res = await fetch(`/api/orders/${params.orderId}?email=${encodeURIComponent(email)}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Order not found');
      setOrderData(data.order);
      setPayment(data.payment);
      setUnlocked(true);
    } catch (e) {
      setErr(e instanceof Error ? e.message : 'Order not found');
    } finally {
      setChecking(false);
    }
  }

  async function markPaid() {
    await fetch(`/api/orders/${params.orderId}/confirm-payment`, { method: 'POST' });
    setConfirmed(true);
  }

  if (!unlocked) {
    return (
      <main className="max-w-sm mx-auto px-4 pt-16 text-center">
        <div className="glass-tile p-6">
          <div className="font-display text-xl mb-3">Confirm it&apos;s you</div>
          <p className="text-[12.5px] text-stone500 mb-4">Enter the email you used at checkout to see your payment details.</p>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            className="w-full rounded-lg border border-stone300 bg-white/70 px-3 py-2.5 text-[13px] mb-3"
          />
          {err && <div className="text-rani text-[12px] mb-3">{err}</div>}
          <button onClick={lookup} disabled={checking} className="w-full bg-stone900 text-stone50 rounded-full py-2.5 text-[13px] font-semibold">
            {checking ? 'Checking…' : 'Continue'}
          </button>
        </div>
      </main>
    );
  }

  const upiLink = payment?.upiLink ?? '';
  const qrSrc = payment?.qrSrc ?? '';

  return (
    <main className="max-w-sm mx-auto px-4 pt-10 pb-20 text-center">
      <div className="text-[11px] tracking-[0.14em] uppercase text-stone500 mb-2">Order {params.orderId}</div>
      <h1 className="font-display text-2xl text-stone900 mb-6">₹{Number(orderData.amount).toLocaleString('en-IN')}</h1>

      {!confirmed ? (
        <>
          <div className="glass-tile p-6 mb-5">
            <img src={qrSrc} alt="UPI QR code" width={220} height={220} className="mx-auto rounded-xl" />
            <p className="text-[12px] text-stone500 mt-4">Scan with any UPI app — GPay, PhonePe, Paytm, or your banking app.</p>
            <a href={upiLink} className="inline-block mt-3 text-[12px] text-rani font-semibold">
              Or tap to open your UPI app →
            </a>
          </div>
          <button onClick={markPaid} className="w-full bg-stone900 text-stone50 rounded-full py-3.5 text-[13px] font-semibold uppercase tracking-wide">
            I&apos;ve Paid — Notify Us
          </button>
          <p className="text-[11px] text-stone500 mt-3">
            We&apos;ll verify the payment and confirm your order shortly — usually within a few hours.
          </p>
        </>
      ) : (
        <div className="glass-tile p-8">
          <div className="font-display text-xl text-stone900 mb-2">Thank you</div>
          <p className="text-[13px] text-stone500 mb-5">We&apos;ll confirm your payment and your order will begin. You&apos;ll get an email the moment it&apos;s confirmed.</p>
          <Link href={`/order/${params.orderId}`} className="text-rani text-[13px] font-semibold">
            Track this order →
          </Link>
        </div>
      )}
    </main>
  );
}
