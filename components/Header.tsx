import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-40 px-3 pt-3">
      <div className="mx-auto max-w-5xl glass-pill rounded-full px-5 py-2.5 flex items-center justify-between shadow-[0_4px_20px_rgba(42,33,26,0.08)]">
        <Link href="/" className="flex items-center gap-2">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#B0225A" strokeWidth="1.5">
            <ellipse cx="12" cy="6" rx="2.2" ry="3.2" />
            <ellipse cx="12" cy="18" rx="2.2" ry="3.2" />
            <ellipse cx="6" cy="12" rx="3.2" ry="2.2" />
            <ellipse cx="18" cy="12" rx="3.2" ry="2.2" />
            <circle cx="12" cy="12" r="1.8" fill="#B0225A" stroke="none" />
          </svg>
          <span className="font-display text-[17px] text-stone900 tracking-wide">Bloom &amp; Blossom</span>
        </Link>
        <nav className="flex items-center gap-4 text-[12px] text-stone900">
          <Link href="/track" className="hover:text-rani hidden sm:inline">Track Order</Link>
          <Link href="/atelier" className="hover:text-rani hidden sm:inline">The Atelier</Link>
          <Link href="/#categories" className="hover:text-rani">Shop</Link>
        </nav>
      </div>
    </header>
  );
}
