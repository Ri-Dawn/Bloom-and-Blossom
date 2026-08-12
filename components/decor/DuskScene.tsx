'use client';

// The Dusk Temple scene: a moonlit archway with a glowing string of lights
// swagged across it. Positions are computed with plain trig (no Math.random,
// no DOM path APIs) so server and client render identically.

const STAR_COUNT = 34;
const BULB_COUNT = 16;

function swagPoint(t: number, width: number) {
  const x = t * width;
  const y = 60 + Math.sin(t * Math.PI * 1.7) * 34 + Math.sin(t * Math.PI * 0.6 + 1) * 14;
  return { x, y };
}

export default function DuskScene({ className }: { className?: string }) {
  const width = 1400;

  return (
    <div className={className} aria-hidden>
      <svg viewBox={`0 0 ${width} 420`} preserveAspectRatio="xMidYMin slice" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="moonGlow" cx="35%" cy="30%" r="65%">
            <stop offset="0%" stopColor="#FFF6DE" />
            <stop offset="55%" stopColor="#E9CFA8" />
            <stop offset="100%" stopColor="#C9974B" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="bulbGlow2" cx="35%" cy="30%" r="65%">
            <stop offset="0%" stopColor="#FFE9B0" />
            <stop offset="60%" stopColor="#F2B705" />
            <stop offset="100%" stopColor="#F2B705" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* stars, deterministic placement */}
        {Array.from({ length: STAR_COUNT }).map((_, i) => {
          const x = (i * 137.5) % width;
          const y = 12 + ((i * 53) % 180);
          const r = 1 + (i % 3) * 0.5;
          return <circle key={i} cx={x} cy={y} r={r} fill="#F3E4C8" opacity={0.3 + ((i * 7) % 5) / 10} className="dusk-star" style={{ animationDelay: `${(i % 6) * 0.5}s` }} />;
        })}

        {/* moon */}
        <circle cx={width / 2} cy="60" r="34" fill="url(#moonGlow)" />

        {/* archway */}
        <path
          d={`M${width / 2 - 280} 420 V220 C${width / 2 - 280} 90, ${width / 2 - 150} 20, ${width / 2} 20 C${width / 2 + 150} 20, ${width / 2 + 280} 90, ${width / 2 + 280} 220 V420`}
          stroke="#E9CFA8"
          strokeWidth="2"
          opacity="0.22"
          fill="none"
        />
        <path
          d={`M${width / 2 - 240} 420 V235 C${width / 2 - 240} 130, ${width / 2 - 140} 55, ${width / 2} 55 C${width / 2 + 140} 55, ${width / 2 + 240} 130, ${width / 2 + 240} 235 V420`}
          stroke="#C9974B"
          strokeWidth="1.4"
          opacity="0.4"
          fill="none"
        />

        {/* the string of lights, swagged across the top */}
        <path
          d={Array.from({ length: 40 }, (_, i) => swagPoint(i / 39, width)).map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ')}
          stroke="#C9974B"
          strokeOpacity="0.45"
          strokeWidth="1"
          fill="none"
        />
        {Array.from({ length: BULB_COUNT }).map((_, i) => {
          const t = i / (BULB_COUNT - 1);
          const p = swagPoint(t, width);
          return (
            <circle
              key={i}
              className="dusk-bulb"
              style={{ animationDelay: `${(i % 7) * 0.3}s` }}
              cx={p.x}
              cy={p.y}
              r="6"
              fill="url(#bulbGlow2)"
            />
          );
        })}
      </svg>
    </div>
  );
}
