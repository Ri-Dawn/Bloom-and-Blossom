'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Category } from '@/lib/categories';
import CategoryIcon from './CategoryIcon';
import RakhiTieAnimation from './decor/RakhiTieAnimation';
import DuskScene from './decor/DuskScene';
import TravelingLight from './TravelingLight';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

function applyMood(cat: Category) {
  document.documentElement.style.setProperty('--current-mood', cat.mood.accent);
}

function Section({ cat, index }: { cat: Category; index: number }) {
  const sectionRef = useRef<HTMLElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);

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

      // the scene drifts slightly slower than the scroll — a quiet parallax
      if (sceneRef.current) {
        gsap.fromTo(
          sceneRef.current,
          { y: -18 },
          {
            y: 18,
            ease: 'none',
            scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: 0.6 },
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, [cat]);

  return (
    <section
      ref={sectionRef}
      id={cat.slug}
      className="dusk-section relative flex items-center overflow-hidden"
      style={{ minHeight: 'clamp(520px, 88vh, 860px)' }}
    >
      <div ref={sceneRef} className="absolute inset-0">
        <DuskScene className="absolute inset-0" />
      </div>

      {cat.motif === 'rakhi' && !cat.comingSoon && (
        <div className="hidden lg:block absolute right-12 top-[58%] -translate-y-1/2 w-[190px] pointer-events-none opacity-70">
          <RakhiTieAnimation triggerRef={sectionRef} ink="#F3E4C8" accent={cat.mood.accent} />
        </div>
      )}

      <div className="relative z-10 max-w-xl mx-auto px-5 py-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="dusk-glass-card px-8 sm:px-12 py-10 sm:py-12 text-center"
        >
          <div className="dusk-badge inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] tracking-[0.2em] uppercase mb-6">
            <CategoryIcon name={cat.icon} className="w-3.5 h-3.5" />
            {cat.eyebrow}
            {cat.comingSoon && <span className="opacity-60">· Coming Soon</span>}
          </div>

          <h2 className="font-display italic text-[clamp(24px,3.6vw,36px)] leading-[1.3]" style={{ color: '#F6E9D4' }}>
            {cat.headline}
          </h2>

          <p className="mt-3 text-[15px]" style={{ color: '#D9B36C' }}>{cat.hindi}</p>

          <p className="mt-4 text-[13.5px]" style={{ color: '#D8C3B0' }}>
            {cat.blurb}
          </p>

          <div className="mt-8">
            {cat.comingSoon ? (
              <span
                className="inline-flex items-center gap-2 text-[12px] tracking-[0.08em] uppercase font-semibold rounded-sm px-6 py-3 border"
                style={{ borderColor: '#E9CFA8', color: '#E9CFA8', opacity: 0.6 }}
              >
                Notify me when it's ready
              </span>
            ) : (
              <Link
                href={`/category/${cat.slug}`}
                className="dusk-cta inline-flex items-center gap-2 text-[12px] tracking-[0.08em] uppercase font-semibold rounded-sm px-7 py-3.5 transition-transform hover:-translate-y-0.5"
              >
                Explore {cat.eyebrow.split('&')[0].trim()}
              </Link>
            )}
          </div>
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
            style={{ borderColor: '#E9CFA888', background: 'rgba(233,207,168,0.3)' }}
          />
        ))}
      </div>

      {categories.map((cat, i) => (
        <Section key={cat.slug} cat={cat} index={i} />
      ))}
    </div>
  );
}
