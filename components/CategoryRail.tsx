'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { Category } from '@/lib/categories';
import CategoryIcon from './CategoryIcon';

export default function CategoryRail({ categories }: { categories: Category[] }) {
  const [active, setActive] = useState(0);
  const wheelLock = useRef(false);
  const wheelAccum = useRef(0);
  const dragState = useRef<{ startY: number; startIndex: number; dragging: boolean }>({
    startY: 0,
    startIndex: 0,
    dragging: false,
  });

  const go = useCallback(
    (dir: 1 | -1) => {
      setActive((i) => Math.min(categories.length - 1, Math.max(0, i + dir)));
    },
    [categories.length]
  );

  const jump = useCallback((i: number) => {
    setActive(Math.min(categories.length - 1, Math.max(0, i)));
  }, [categories.length]);

  function onWheel(e: React.WheelEvent) {
    e.preventDefault();
    if (wheelLock.current) return;
    wheelAccum.current += e.deltaY;
    if (Math.abs(wheelAccum.current) > 44) {
      go(wheelAccum.current > 0 ? 1 : -1);
      wheelAccum.current = 0;
      wheelLock.current = true;
      setTimeout(() => {
        wheelLock.current = false;
      }, 520);
    }
  }

  function onPointerDown(e: React.PointerEvent) {
    (e.target as Element).setPointerCapture(e.pointerId);
    dragState.current = { startY: e.clientY, startIndex: active, dragging: true };
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!dragState.current.dragging) return;
    const delta = e.clientY - dragState.current.startY;
    const step = 46; // px per category step
    const shift = Math.round(delta / step);
    if (shift !== 0) {
      jump(dragState.current.startIndex + shift);
    }
  }

  function onPointerUp() {
    dragState.current.dragging = false;
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') { e.preventDefault(); go(1); }
    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') { e.preventDefault(); go(-1); }
  }

  // gentle auto-advance the very first time, so the interaction is discoverable
  const introRan = useRef(false);
  useEffect(() => {
    if (introRan.current) return;
    introRan.current = true;
    const t = setTimeout(() => setActive(1), 2600);
    return () => clearTimeout(t);
  }, []);

  const cat = categories[active];

  return (
    <div
      className="mood-stage w-full"
      style={{ minHeight: 'clamp(480px, 78vh, 720px)' }}
      onWheel={onWheel}
    >
      {/* background layers, one per category, cross-fading */}
      {categories.map((c, i) => (
        <div key={c.slug} className="mood-layer" style={{ opacity: i === active ? 1 : 0, zIndex: i === active ? 1 : 0 }}>
          {c.heroImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={c.heroImage} alt="" />
          ) : (
            <div className="w-full h-full" style={{ background: `radial-gradient(circle at 30% 20%, ${c.mood.to}55, transparent 55%), linear-gradient(160deg, ${c.mood.from}, ${c.mood.to})` }} />
          )}
          <div
            className="mood-scrim"
            style={{ background: `linear-gradient(150deg, ${c.mood.from}CC 10%, ${c.mood.to}66 85%)` }}
          />
          <div className="mood-scrim-top" />
          <div className="diya-dots absolute inset-0 opacity-20" />
        </div>
      ))}

      {/* foreground copy */}
      <div className="relative z-10 h-full flex flex-col justify-end md:justify-center px-6 sm:px-10 md:px-14 py-10 md:py-16" style={{ minHeight: 'clamp(480px, 78vh, 720px)' }}>
        <div key={cat.slug} className="rise-in max-w-xl">
          <div
            className="text-[11px] tracking-[0.22em] uppercase mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1"
            style={{ color: cat.mood.ink, background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.28)' }}
          >
            <CategoryIcon name={cat.icon} className="w-3.5 h-3.5" />
            {cat.eyebrow}
          </div>
          <h1
            className="font-display text-[clamp(28px,5vw,46px)] leading-[1.18]"
            style={{ color: cat.mood.ink }}
          >
            {cat.headline}
          </h1>
          <p className="mt-4 text-[14.5px] max-w-md" style={{ color: cat.mood.ink, opacity: 0.86 }}>
            {cat.blurb}
          </p>
          <div className="mt-7 flex items-center gap-4">
            <Link
              href={`/category/${cat.slug}`}
              className="inline-flex items-center gap-2 text-[13px] font-semibold rounded-full px-6 py-3 transition-transform hover:-translate-y-0.5"
              style={{ background: cat.mood.ink, color: cat.mood.from }}
            >
              Explore {cat.eyebrow.split('&')[0].trim()}
            </Link>
            <span className="font-hand text-lg" style={{ color: cat.mood.accent }}>
              made once, just for this
            </span>
          </div>
        </div>
      </div>

      {/* the knob rail — drag, scroll, or click a dot */}
      <div
        className="knob-track absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-5 py-5 px-2.5 rounded-full"
        style={{ background: 'rgba(255,255,255,0.14)', border: '1px solid rgba(255,255,255,0.3)', backdropFilter: 'blur(14px)' }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onKeyDown={onKeyDown}
        role="listbox"
        aria-label="Choose a gifting occasion"
        tabIndex={0}
      >
        {categories.map((c, i) => (
          <button
            key={c.slug}
            type="button"
            role="option"
            aria-selected={i === active}
            aria-label={c.eyebrow}
            onClick={() => jump(i)}
            className="knob-dot rounded-full flex items-center justify-center"
            style={{
              width: i === active ? 34 : 20,
              height: i === active ? 34 : 20,
              background: i === active ? c.mood.ink : 'rgba(255,255,255,0.5)',
              transform: i === active ? 'scale(1)' : 'scale(1)',
            }}
          >
            {i === active && (
              <CategoryIcon name={c.icon} className="w-4 h-4" />
            )}
          </button>
        ))}
      </div>

      {/* progress hint, bottom-left on mobile */}
      <div className="absolute left-6 bottom-5 z-20 flex gap-1.5 md:hidden">
        {categories.map((c, i) => (
          <span
            key={c.slug}
            className="h-1 rounded-full transition-all duration-300"
            style={{ width: i === active ? 22 : 8, background: i === active ? cat.mood.ink : 'rgba(255,255,255,0.4)' }}
          />
        ))}
      </div>
    </div>
  );
}
