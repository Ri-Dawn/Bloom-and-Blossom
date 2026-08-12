'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Category } from '@/lib/categories';
import CategoryIcon from './CategoryIcon';
import RakhiTieAnimation from './decor/RakhiTieAnimation';
import { CornerFlourish } from './decor/CornerFlourish';
import TravelingLight from './TravelingLight';

const INK = '#3A1015'; // one wine ink, used for every headline on the site
const WINE = '#7A1230'; // the one CTA colour, used everywhere

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

function applyMood(cat: Category) {
  document.documentElement.style.setProperty('--current-mood', cat.mood.accent);
}

function Section({ cat, index }: { cat: Category; index: number }) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => applyMood(cat),
        onEnterBack: () => applyMood(cat),
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [cat]);

  return (
    <section
      ref={sectionRef}
      id={cat.slug}
      className="relative flex items-center overflow-hidden"
      style={{ minHeight: 'clamp(460px, 78vh, 760px)', background: index % 2 === 0 ? '#FBF3E8' : '#F7E9DA' }}
    >
      <div className="gold-thread-divider absolute top-0 left-0 right-0" />
      <CornerFlourish className="section-flourish absolute top-9 left-14 w-16 h-16 hidden md:block" style={{ color: cat.mood.accent }} />
      <CornerFlourish flip className="section-flourish absolute bottom-9 right-14 w-16 h-16 hidden md:block" style={{ color: cat.mood.accent }} />

      {cat.motif === 'rakhi' && !cat.comingSoon && (
        <div className="hidden lg:block absolute right-10 top-1/2 -translate-y-1/2 w-[200px] pointer-events-none opacity-80">
          <RakhiTieAnimation triggerRef={sectionRef} ink={INK} accent={cat.mood.accent} />
        </div>
      )}

      <div className="relative z-10 max-w-2xl mx-auto px-6 sm:px-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="glow-badge inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] tracking-[0.2em] uppercase mb-7"
          style={{ color: WINE, borderColor: `${cat.mood.accent}88` }}
        >
          <CategoryIcon name={cat.icon} className="w-3.5 h-3.5" />
          {cat.eyebrow}
          {cat.comingSoon && <span className="opacity-60">· Coming Soon</span>}
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          className="font-display italic text-[clamp(26px,4.4vw,42px)] leading-[1.25]"
          style={{ color: INK }}
        >
          {cat.headline}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="mt-5 text-[14.5px]"
          style={{ color: '#7A5D4E' }}
        >
          {cat.blurb}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className="mt-9"
        >
          {cat.comingSoon ? (
            <span
              className="inline-flex items-center gap-2 text-[12px] tracking-[0.08em] uppercase font-semibold rounded-sm px-6 py-3 border"
              style={{ borderColor: INK, color: INK, opacity: 0.6 }}
            >
              Notify me when it's ready
            </span>
          ) : (
            <Link
              href={`/category/${cat.slug}`}
              className="glow-cta inline-flex items-center gap-2 text-[12px] tracking-[0.08em] uppercase font-semibold rounded-sm px-7 py-3.5 transition-transform hover:-translate-y-0.5"
              style={{ background: WINE, color: '#FBF3E8' }}
            >
              Explore {cat.eyebrow.split('&')[0].trim()}
            </Link>
          )}
        </motion.div>
      </div>
    </section>
  );
}

export default function ScrollStory({ categories }: { categories: Category[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const colors = categories.map((c) => c.mood.accent);

  return (
    <div ref={containerRef} className="relative">
      <TravelingLight containerRef={containerRef} colors={colors} />

      <div className="fixed right-4 sm:right-6 top-1/2 -translate-y-1/2 z-30 hidden sm:flex flex-col gap-4">
        {categories.map((c) => (
          <a
            key={c.slug}
            href={`#${c.slug}`}
            aria-label={c.eyebrow}
            className="w-2 h-2 rounded-full border hover:scale-125 transition-transform"
            style={{ borderColor: '#A9762F88', background: 'rgba(169,118,47,0.25)' }}
          />
        ))}
      </div>

      {categories.map((cat, i) => (
        <Section key={cat.slug} cat={cat} index={i} />
      ))}
    </div>
  );
}
