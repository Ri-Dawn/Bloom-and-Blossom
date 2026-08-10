'use client';

import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { RefObject } from 'react';

export default function TravelingLight({
  containerRef,
  colors,
}: {
  containerRef: RefObject<HTMLElement>;
  colors: string[]; // one accent colour per section, in scroll order
}) {
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] });
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });
  const top = useTransform(smooth, [0, 1], ['3%', '95%']);

  const stops = colors.length > 1 ? colors.map((_, i) => i / (colors.length - 1)) : [0];
  const color = useTransform(smooth, stops, colors);
  const glow = useTransform(color, (c) => `0 0 14px 3px ${c}, 0 0 34px 10px ${c}55`);

  return (
    <div
      className="fixed top-0 z-40 hidden md:block pointer-events-none"
      style={{ left: 14, height: '100vh', width: 2 }}
      aria-hidden
    >
      {/* the thread itself */}
      <div className="absolute inset-y-0 left-0 w-px" style={{ background: 'linear-gradient(180deg, transparent, rgba(255,255,255,0.35) 8%, rgba(255,255,255,0.35) 92%, transparent)' }} />
      {/* the traveling light */}
      <motion.span
        className="absolute rounded-full"
        style={{
          top,
          left: -3.5,
          width: 9,
          height: 9,
          backgroundColor: color as unknown as string,
          boxShadow: glow as unknown as string,
        }}
      />
    </div>
  );
}
