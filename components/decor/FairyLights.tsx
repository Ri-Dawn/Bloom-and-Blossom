'use client';

// The single string of lights that runs across the top of every section —
// "one thread running through all of them," made literal. Real soft-glow
// bulbs on a curved wire, tinted to the section's accent colour.

export default function FairyLights({ color, className }: { color: string; className?: string }) {
  const width = 800;
  const height = 110;
  const bulbCount = 13;

  const point = (t: number) => {
    const x = t * width;
    const y = 30 + Math.sin(t * Math.PI * 1.7) * 26 + Math.sin(t * Math.PI * 0.6 + 1) * 10;
    return { x, y: y + 24 };
  };

  const wirePath = Array.from({ length: 40 }, (_, i) => point(i / 39))
    .map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
    .join(' ');

  return (
    <svg viewBox={`0 0 ${width} ${height}`} fill="none" className={className} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
      <defs>
        <radialGradient id="bulbGlow" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#fffaf0" />
          <stop offset="55%" stopColor={color} />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </radialGradient>
      </defs>
      <path d={wirePath} stroke={color} strokeOpacity="0.4" strokeWidth="1" fill="none" />
      {Array.from({ length: bulbCount }).map((_, i) => {
        const t = i / (bulbCount - 1);
        const p = point(t);
        const r = 4.5 + (i % 3);
        return (
          <circle
            key={i}
            className="fairylight-bulb"
            style={{ animationDelay: `${(i % 7) * 0.28}s`, filter: `drop-shadow(0 0 ${r * 1.6}px ${color})` }}
            cx={p.x}
            cy={p.y}
            r={r}
            fill="url(#bulbGlow)"
          />
        );
      })}
    </svg>
  );
}
