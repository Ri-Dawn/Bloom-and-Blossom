import Link from 'next/link';
import { CATEGORIES } from '@/lib/categories';
import CategoryIcon from '@/components/CategoryIcon';
import CategoryRail from '@/components/CategoryRail';
import ChatWidget from '@/components/ChatWidget';

export default function HomePage() {
  return (
    <main>
      {/* ---------- living hero: drag/scroll the knob to move through occasions ---------- */}
      <section className="px-3 sm:px-4 pt-4">
        <CategoryRail categories={CATEGORIES} />
        <p className="text-center text-[11px] tracking-[0.16em] uppercase text-stone500 mt-3">
          Scroll, drag the knob, or tap a dot — five occasions, one at a time
        </p>
      </section>

      {/* ---------- quick-access grid, photography behind glass ---------- */}
      <section id="categories" className="px-4 pt-16 pb-20">
        <div className="max-w-5xl mx-auto text-center mb-8">
          <div className="text-[11px] tracking-[0.2em] uppercase text-stone500 mb-3">Every Occasion</div>
          <h2 className="font-display text-[26px] md:text-[32px] text-stone900">Or jump straight to yours</h2>
        </div>
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
          {CATEGORIES.map((cat, i) => (
            <Link
              href={`/category/${cat.slug}`}
              key={cat.slug}
              className={`glass-photo-tile ${i === 0 ? 'col-span-2 md:col-span-1' : ''}`}
              style={{ minHeight: '210px' }}
            >
              {cat.heroImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={cat.heroImage} alt={cat.eyebrow} className="absolute inset-0 w-full h-full object-cover" />
              ) : (
                <div
                  className="absolute inset-0 w-full h-full"
                  style={{ background: `linear-gradient(160deg, ${cat.mood.from}, ${cat.mood.to})` }}
                />
              )}
              <div className="glass-photo-caption flex-col items-start gap-1.5">
                <div className="w-9 h-9 rounded-full flex items-center justify-center mb-1" style={{ background: 'rgba(255,255,255,0.22)', color: cat.mood.ink, border: '1px solid rgba(255,255,255,0.4)' }}>
                  <CategoryIcon name={cat.icon} className="w-4.5 h-4.5" />
                </div>
                <div className="font-display text-[17px]" style={{ color: cat.mood.ink }}>{cat.eyebrow}</div>
                <div className="text-[11px]" style={{ color: cat.mood.ink, opacity: 0.85 }}>{cat.items.length} styles to begin from</div>
              </div>
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
