'use client';

// Hand-drawn line-art decorative motifs, one per occasion.
// Every path uses currentColor so a single `color` style controls the tint.

export function RakhiMotif({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 160" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* mauli thread, looping */}
      <path d="M10 40 C 90 10, 130 90, 200 50 S 320 10, 390 40" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.55" />
      {/* hanging bells */}
      {[60, 140, 200, 265, 335].map((x, i) => (
        <g key={x} opacity={0.9 - i * 0.06}>
          <line x1={x} y1="46" x2={x} y2="78" stroke="currentColor" strokeWidth="1" />
          <circle cx={x} cy="90" r="10" stroke="currentColor" strokeWidth="1.4" />
          <circle cx={x} cy="90" r="2" fill="currentColor" />
          <path d={`M${x - 6} 100 L${x} 112 L${x + 6} 100`} stroke="currentColor" strokeWidth="1" />
        </g>
      ))}
      {/* tiny marigold dots along the top */}
      {Array.from({ length: 14 }).map((_, i) => (
        <circle key={i} cx={20 + i * 27} cy={14 + (i % 2) * 6} r="2.4" fill="currentColor" opacity="0.5" />
      ))}
    </svg>
  );
}

export function KaleereMotif({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 200" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* bangle bar */}
      <line x1="30" y1="18" x2="370" y2="18" stroke="currentColor" strokeWidth="2" />
      {Array.from({ length: 9 }).map((_, i) => {
        const x = 45 + i * 40;
        const len = 60 + (i % 3) * 26;
        return (
          <g key={i} opacity={0.85 - (i % 3) * 0.08}>
            <line x1={x} y1="18" x2={x} y2={18 + len} stroke="currentColor" strokeWidth="1" />
            <circle cx={x} cy={18 + len + 8} r="7" stroke="currentColor" strokeWidth="1.3" />
            {i % 3 === 0 && <path d={`M${x - 5} ${18 + len + 20} q5 10 10 0`} stroke="currentColor" strokeWidth="1" />}
          </g>
        );
      })}
    </svg>
  );
}

export function BabyMotif({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 180" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* mobile bar */}
      <line x1="140" y1="14" x2="260" y2="14" stroke="currentColor" strokeWidth="1.4" />
      <line x1="200" y1="0" x2="200" y2="14" stroke="currentColor" strokeWidth="1.4" />
      {/* crescent moon */}
      <g transform="translate(90,50)">
        <path d="M18 0 A18 18 0 1 0 18 36 A13 13 0 1 1 18 0 Z" stroke="currentColor" strokeWidth="1.3" fill="none" />
      </g>
      {/* stars */}
      {[[160, 30], [230, 60], [300, 24], [330, 90], [60, 100]].map(([x, y], i) => (
        <path
          key={i}
          d={`M${x} ${y - 6} L${x + 1.6} ${y - 1.6} L${x + 6} ${y} L${x + 1.6} ${y + 1.6} L${x} ${y + 6} L${x - 1.6} ${y + 1.6} L${x - 6} ${y} L${x - 1.6} ${y - 1.6} Z`}
          fill="currentColor"
          opacity={0.7}
        />
      ))}
      {/* soft dotted arc, like a cradle swing */}
      <path d="M40 140 Q200 190 360 140" stroke="currentColor" strokeWidth="1" strokeDasharray="2 6" opacity="0.5" />
    </svg>
  );
}

export function CharmsMotif({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 160" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* delicate bracelet arc with cherry-sprig charms */}
      <path d="M20 90 Q200 40 380 90" stroke="currentColor" strokeWidth="1.3" opacity="0.6" />
      {[70, 150, 230, 310].map((x, i) => (
        <g key={x} transform={`translate(${x},${96 - (i % 2) * 6})`} opacity={0.9}>
          <line x1="0" y1="0" x2="0" y2="18" stroke="currentColor" strokeWidth="1" />
          <circle cx="-5" cy="26" r="6" fill="currentColor" opacity="0.85" />
          <circle cx="6" cy="30" r="6" fill="currentColor" opacity="0.85" />
          <path d="M-8 16 Q0 6 8 16" stroke="currentColor" strokeWidth="1" />
        </g>
      ))}
    </svg>
  );
}

export function FriendshipMotif({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 140" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* fairy light string with paper-lantern bulbs */}
      <path d="M10 20 Q100 70 200 24 T390 20" stroke="currentColor" strokeWidth="1.2" opacity="0.55" />
      {Array.from({ length: 10 }).map((_, i) => {
        const t = i / 9;
        const x = 10 + t * 380;
        const y = 20 + Math.sin(t * Math.PI * 1.4) * 26 + 18;
        return (
          <g key={i} opacity={0.85}>
            <line x1={x} y1={y - 12} x2={x} y2={y} stroke="currentColor" strokeWidth="0.8" />
            <circle cx={x} cy={y + 6} r="6" stroke="currentColor" strokeWidth="1.2" />
          </g>
        );
      })}
    </svg>
  );
}

export function MotifFor({ motif, className }: { motif: string; className?: string }) {
  switch (motif) {
    case 'rakhi':
      return <RakhiMotif className={className} />;
    case 'kaleere':
      return <KaleereMotif className={className} />;
    case 'baby':
      return <BabyMotif className={className} />;
    case 'charms':
      return <CharmsMotif className={className} />;
    case 'friendship':
      return <FriendshipMotif className={className} />;
    default:
      return null;
  }
}
