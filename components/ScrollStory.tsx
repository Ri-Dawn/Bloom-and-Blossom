'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Category } from '@/lib/categories';
import CategoryIcon from './CategoryIcon';
import { MotifFor } from './decor/Motifs';
import FairyLights from './decor/FairyLights';
import RakhiTieAnimation from './decor/RakhiTieAnimation';
import TravelingLight from './TravelingLight';
import ParticleField from './ParticleField';

function hexToRgb(hex: string) {
  const clean = hex.replace('#', '');
  const bigint = parseInt(clean, 16);
  return { r: (bigint >> 16) & 255, g: (bigint >> 8) & 255, b: bigint & 255 };
}

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

function applyMood(cat: Category) {
  const from = hexToRgb(cat.mood.from);
  const to = hexToRgb(cat.mood.to);
  const root = document.documentElement.style;
  root.setProperty('--current-mood', cat.mood.accent);
  root.setProperty(
    '--current-mood-wash',
    `linear-gradient(120deg, rgba(${from.r},${from.g},${from.b},0.22), rgba(${to.r},${to.g},${to.b},0.13))`
  );
}

function Section({ cat, index }: { cat: Category; index: number }) {
  const sectionRef = useRef<HTMLElement>(null);
  const topWrapRef = useRef<HTMLDivElement>(null);
  const bottomWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      // gentle parallax: the motif strips drift against the scroll
      if (topWrapRef.current) {
        gsap.fromTo(
          topWrapRef.current,
          { y: -26 },
          {
            y: 26,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.6,
            },
          }
        );
      }
      if (bottomWrapRef.current) {
        gsap.fromTo(
          bottomWrapRef.current,
          { y: 18 },
          {
            y: -18,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.6,
            },
          }
        );
      }
      // hand the header the current occasion's colour as this section
      // crosses the middle of the viewport, in either scroll direction
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => applyMood(cat),
        onEnterBack: () => applyMood(cat),
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [cat.mood.accent]);

  return (
    <section
      ref={sectionRef}
      id={cat.slug}
      className="relative flex items-center overflow-hidden"
      style={{ minHeight: 'clamp(520px, 92vh, 900px)' }}
    >
      <div className="absolute inset-0" style={{ background: `linear-gradient(150deg, ${cat.mood.from}, ${cat.mood.to})` }} />
      <div className="absolute inset-0 diya-dots opacity-15" />

      <div ref={topWrapRef} className="absolute top-0 left-0 right-0">
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <FairyLights color={cat.mood.accent} className="w-full h-[100px] md:h-[130px]" />
        </motion.div>
      </div>

      <div ref={bottomWrapRef} className="absolute bottom-0 left-0 right-0">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 0.55, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="scale-y-[-1]"
          style={{ color: cat.mood.accent }}
        >
          <MotifFor motif={cat.motif} className="w-full h-[90px] md:h-[120px]" />
        </motion.div>
      </div>

      {cat.motif === 'rakhi' && (
        <div className="hidden lg:block absolute right-10 top-1/2 -translate-y-1/2 w-[240px] pointer-events-none opacity-95">
          <RakhiTieAnimation triggerRef={sectionRef} ink={cat.mood.ink} accent={cat.mood.accent} />
        </div>
      )}

      <div className="relative z-10 max-w-2xl mx-auto px-6 sm:px-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] tracking-[0.2em] uppercase mb-6"
          style={{ color: cat.mood.ink, background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.28)' }}
        >
          <CategoryIcon name={cat.icon} className="w-3.5 h-3.5" />
          {cat.eyebrow}
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-[clamp(26px,4.6vw,44px)] leading-[1.2]"
          style={{ color: cat.mood.ink }}
        >
          {cat.headline}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 0.88, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 text-[14.5px]"
          style={{ color: cat.mood.ink }}
        >
          {cat.blurb}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8"
        >
          <Link
            href={`/category/${cat.slug}`}
            className="inline-flex items-center gap-2 text-[13px] font-semibold rounded-full px-6 py-3 transition-transform hover:-translate-y-0.5"
            style={{ background: cat.mood.ink, color: cat.mood.from }}
          >
            Explore {cat.eyebrow.split('&')[0].trim()}
          </Link>
        </motion.div>

        <div className="mt-5 text-[11px] tracking-[0.14em] uppercase" style={{ color: cat.mood.ink, opacity: 0.5 }}>
          {String(index + 1).padStart(2, '0')} — keep scrolling
        </div>
      </div>
    </section>
  );
}

export default function ScrollStory({ categories }: { categories: Category[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const colors = categories.map((c) => c.mood.accent);

  return (
    <div ref={containerRef} className="relative">
      <ParticleField />
      <TravelingLight containerRef={containerRef} colors={colors} />

      <div className="fixed right-4 sm:right-6 top-1/2 -translate-y-1/2 z-30 hidden sm:flex flex-col gap-4">
        {categories.map((c) => (
          <a
            key={c.slug}
            href={`#${c.slug}`}
            aria-label={c.eyebrow}
            className="w-2.5 h-2.5 rounded-full border border-white/50 hover:scale-125 transition-transform"
            style={{ background: 'rgba(255,255,255,0.35)' }}
          />
        ))}
      </div>

      {categories.map((cat, i) => (
        <Section key={cat.slug} cat={cat} index={i} />
      ))}
    </div>
  );
}
