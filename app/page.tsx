import Link from 'next/link';
import { CATEGORIES } from '@/lib/categories';
import CategoryIcon from '@/components/CategoryIcon';
import ChatWidget from '@/components/ChatWidget';

export default function HomePage() {
  return (
    <main>
      {/* ---------- hero ---------- */}
      <section className="relative overflow-hidden px-4 pt-14 pb-20">
        <div className="floating-glass w-72 h-72 -top-10 -left-16" />
        <div className="floating-glass w-56 h-56 top-20 right-0" style={{ animationDelay: '3s' }} />
        <div className="jali-bg absolute inset-0 -z-10 opacity-60" />

        <div className="relative max-w-3xl mx-auto text-center">
          <div className="text-[11px] tracking-[0.2em] uppercase text-stone500 mb-4">
            Handworked · One Story at a Time
          </div>
          <h1 className="font-display text-[clamp(30px,6vw,52px)] leading-[1.2] text-stone900">
            Before you enter as a bride, walk in carrying every woman who ever{' '}
            <span className="hand-underline text-rani">
              wished
              <svg viewBox="0 0 90 12" preserveAspectRatio="none">
                <path d="M2,9 C26,1 60,12 88,3" stroke="#B0225A" strokeWidth="2.2" fill="none" strokeLinecap="round" />
              </svg>
            </span>{' '}
            you well.
          </h1>
          <p className="mt-5 text-[15px] text-stone900/80 max-w-xl mx-auto">
            Every piece here is made once, for one person — never stocked, never repeated the same way twice.
          </p>
        </div>
      </section>

      {/* ---------- glass tile category grid ---------- */}
      <section id="categories" className="px-4 pb-24">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
          {CATEGORIES.map((cat, i) => (
            <Link
              href={`/category/${cat.slug}`}
              key={cat.slug}
              className={`glass-tile flex flex-col items-center justify-center text-center gap-3 p-6 md:p-8 ${
                i === 0 ? 'col-span-2 md:col-span-1' : ''
              }`}
              style={{ minHeight: '190px' }}
            >
              <div className="w-14 h-14 rounded-full glass-pill flex items-center justify-center text-rani">
                <CategoryIcon name={cat.icon} className="w-7 h-7" />
              </div>
              <div className="font-display text-[18px] text-stone900">{cat.eyebrow}</div>
              <div className="text-[11px] text-stone500">{cat.items.length} styles to begin from</div>
            </Link>
          ))}
        </div>
      </section>

      {/* ---------- the atelier strip ---------- */}
      <section className="px-4 pb-24">
        <div className="max-w-4xl mx-auto glass-tile p-8 md:p-10 grid md:grid-cols-2 gap-8 items-center">
          <div className="h-44 rounded-2xl bg-stone300/60 flex items-center justify-center text-stone500 text-[11px] uppercase tracking-wide">
            founder photo
          </div>
          <div>
            <div className="text-[11px] tracking-[0.14em] uppercase text-stone500 mb-2">The Atelier</div>
            <h2 className="font-display text-2xl text-stone900">Made once, never restocked</h2>
            <p className="mt-3 text-[14px] text-stone900/80">
              Every piece is built after you write to us, not before — which is the whole reason it takes fourteen days.
            </p>
            <p className="font-hand text-rani text-xl mt-3">— from our worktable to your wrist</p>
            <Link href="/atelier" className="inline-block mt-4 text-[13px] font-semibold text-stone900 border border-stone900 rounded-full px-5 py-2 hover:bg-stone900 hover:text-stone50 transition-colors">
              Meet the maker
            </Link>
          </div>
        </div>
      </section>

      <footer className="bg-stone900 text-stone50 px-4 py-10">
        <div className="max-w-5xl mx-auto flex flex-wrap justify-between gap-6 text-[12px]">
          <div>© Bloom &amp; Blossom</div>
          <div className="flex gap-5">
            <Link href="/track" className="hover:text-rani">Track Order</Link>
            <Link href="/atelier" className="hover:text-rani">The Atelier</Link>
          </div>
        </div>
      </footer>

      <ChatWidget sessionId="general-enquiry" context="General enquiry" />
    </main>
  );
}
