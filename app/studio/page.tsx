'use client';

import { Suspense, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { findItem } from '@/lib/categories';
import ChatWidget from '@/components/ChatWidget';

const BASE_OPTIONS = ['Ink', 'Stone', 'Sand', 'Rani'];
const CHARMS = ['Heart', 'Flower', 'Star', 'Moon', 'Bell', 'Evil Eye'];

function StudioInner() {
  const params = useSearchParams();
  const router = useRouter();
  const catSlug = params.get('cat') ?? '';
  const itemSlug = params.get('item') ?? '';
  const found = findItem(catSlug, itemSlug);

  const [base, setBase] = useState(0);
  const [charms, setCharms] = useState<string[]>([]);
  const [engrave, setEngrave] = useState('');
  const [sessionId] = useState(() => `pre-order-${catSlug}-${itemSlug}-${Date.now().toString(36)}`);

  const price = useMemo(() => {
    if (!found) return 0;
    return found.item.price + charms.length * 150 + (engrave ? 100 : 0);
  }, [found, charms, engrave]);

  if (!found) {
    return <div className="max-w-lg mx-auto pt-24 px-4 text-center text-stone500">Item not found.</div>;
  }

  function toggleCharm(c: string) {
    setCharms((prev) => (prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]));
  }

  function continueToCheckout() {
    const customisation = { base: BASE_OPTIONS[base], charms, engrave };
    const qs = new URLSearchParams({
      cat: catSlug,
      item: itemSlug,
      price: String(price),
      name: found!.item.name,
      customisation: JSON.stringify(customisation),
    });
    router.push(`/checkout?${qs.toString()}`);
  }

  return (
    <main className="max-w-4xl mx-auto px-4 pt-8 pb-28">
      <div className="text-[12px] text-stone500 mb-6">Customising: {found.item.name}</div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="glass-tile p-6">
          <div className="flex justify-between text-[11px] text-stone500 mb-3">
            <span>Live preview</span>
            <span className="font-display text-[18px] text-stone900">₹{price.toLocaleString('en-IN')}</span>
          </div>
          <div className="h-64 rounded-xl bg-stone300/50 flex items-center justify-center text-stone500 text-[12px] text-center p-6">
            {found.item.name}
            <br />
            {charms.length ? charms.join(', ') : 'no charms yet'}
            {engrave && <>
              <br />&quot;{engrave}&quot;
            </>}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="glass-tile p-5">
            <div className="font-display text-[16px] mb-3">Base</div>
            <div className="flex gap-3">
              {BASE_OPTIONS.map((b, i) => (
                <button
                  key={b}
                  onClick={() => setBase(i)}
                  className={`w-9 h-9 rounded-full border-2 ${base === i ? 'border-rani' : 'border-stone300'}`}
                  style={{
                    background: ['#2A211A', '#A98B68', '#D8C4AC', '#B0225A'][i],
                  }}
                  aria-label={b}
                />
              ))}
            </div>
          </div>

          <div className="glass-tile p-5">
            <div className="font-display text-[16px] mb-1">Charms</div>
            <div className="text-[11px] text-stone500 mb-3">+ ₹150 each</div>
            <div className="grid grid-cols-3 gap-2">
              {CHARMS.map((c) => (
                <button
                  key={c}
                  onClick={() => toggleCharm(c)}
                  className={`rounded-lg border px-2 py-2 text-[11px] ${
                    charms.includes(c) ? 'border-rani bg-rani/10 text-rani' : 'border-stone300 bg-white/50'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="glass-tile p-5">
            <div className="font-display text-[16px] mb-3">Name or Text</div>
            <input
              value={engrave}
              onChange={(e) => setEngrave(e.target.value)}
              placeholder="Their name, exactly as you'd say it"
              className="w-full rounded-lg border border-stone300 bg-white/70 px-3 py-2.5 text-[13px] outline-none focus:border-rani"
            />
            <div className="text-[11px] text-stone500 mt-2">+ ₹100 for lettering, once you add a name</div>
          </div>

          <button
            onClick={continueToCheckout}
            className="bg-stone900 text-stone50 rounded-full py-3 text-[13px] font-semibold uppercase tracking-wide"
          >
            Continue to Checkout — ₹{price.toLocaleString('en-IN')}
          </button>
          <p className="text-[11px] text-stone500 text-center">
            Still unsure? Use the Design Studio chat below — type it, or send a voice note.
          </p>
        </div>
      </div>

      <ChatWidget sessionId={sessionId} context={found.item.name} />
    </main>
  );
}

export default function StudioPage() {
  return (
    <Suspense fallback={<div className="pt-24 text-center text-stone500">Loading…</div>}>
      <StudioInner />
    </Suspense>
  );
}
