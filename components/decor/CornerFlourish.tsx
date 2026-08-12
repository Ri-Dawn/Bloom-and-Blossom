'use client';

import type { CSSProperties } from 'react';

// A single quiet gold flourish — the "one or two elements" that earn their
// place, instead of a whole scene of moving parts. Used sparingly.
export function CornerFlourish({ className, flip, style }: { className?: string; flip?: boolean; style?: CSSProperties }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      style={flip ? { ...style, transform: 'rotate(180deg)' } : style}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M4 30 C20 12,30 12,30 4 M4 30 C20 40,40 40,60 22" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

export function HeroFlourish({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 120 28" fill="none" className={className} style={style} xmlns="http://www.w3.org/2000/svg">
      <path d="M0 14 C 30 2, 40 26, 60 14 S 90 2, 120 14" stroke="currentColor" strokeWidth="1" />
      <circle cx="60" cy="14" r="3" fill="currentColor" />
    </svg>
  );
}
