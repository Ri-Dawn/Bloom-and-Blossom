'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// A proof-of-concept scroll-scrubbed illustration: the thread draws itself
// onto the wrist, then the bow ties, then the charm drops in — all keyed
// to how far you've scrolled through the Rakhi section. No external
// footage or renders — just an SVG illustration and GSAP doing the scrub.
export default function RakhiTieAnimation({
  triggerRef,
  ink,
  accent,
  className,
}: {
  triggerRef: React.RefObject<HTMLElement>;
  ink: string;
  accent: string;
  className?: string;
}) {
  const threadRef = useRef<SVGPathElement>(null);
  const bowRef = useRef<SVGGElement>(null);
  const charmRef = useRef<SVGGElement>(null);

  useEffect(() => {
    if (!triggerRef.current || !threadRef.current || !bowRef.current || !charmRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set(threadRef.current, { strokeDasharray: 1, strokeDashoffset: 1 });
      gsap.set(bowRef.current, { scale: 0, opacity: 0, transformOrigin: '50% 50%' });
      gsap.set(charmRef.current, { scale: 0, opacity: 0, y: -8, transformOrigin: '50% 50%' });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.4,
        },
      });

      tl.to(threadRef.current, { strokeDashoffset: 0, ease: 'none', duration: 0.65 })
        .to(bowRef.current, { scale: 1, opacity: 1, duration: 0.2, ease: 'back.out(2)' }, '-=0.05')
        .to(charmRef.current, { scale: 1, opacity: 1, y: 0, duration: 0.15, ease: 'back.out(2.5)' });
    }, triggerRef);

    return () => ctx.revert();
  }, [triggerRef]);

  return (
    <svg viewBox="0 0 240 240" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <circle cx="120" cy="120" r="70" stroke={ink} strokeOpacity="0.35" strokeWidth="1.3" />
      <path
        ref={threadRef}
        d="M52 108 C 88 88, 152 132, 188 106 M56 134 C 92 114, 148 158, 184 132"
        pathLength={1}
        stroke={accent}
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <g ref={bowRef}>
        <path d="M120 112 L96 95 C 90 91, 90 105, 96 109 Z" fill={accent} opacity="0.92" />
        <path d="M120 112 L144 95 C 150 91, 150 105, 144 109 Z" fill={accent} opacity="0.92" />
        <circle cx="120" cy="112" r="5.5" fill={ink} stroke={accent} strokeWidth="1.2" />
      </g>
      <g ref={charmRef}>
        <line x1="120" y1="117" x2="120" y2="148" stroke={accent} strokeWidth="1" />
        <circle cx="120" cy="160" r="11" fill="none" stroke={accent} strokeWidth="1.4" />
        <circle cx="120" cy="160" r="3.2" fill={accent} />
      </g>
    </svg>
  );
}
