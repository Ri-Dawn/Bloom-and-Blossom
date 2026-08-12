import Link from 'next/link';
import { CATEGORIES } from '@/lib/categories';
import ScrollStory from '@/components/ScrollStory';
import ChatWidget from '@/components/ChatWidget';
import { HeroFlourish } from '@/components/decor/CornerFlourish';

const INK = '#3A1015';
const WINE = '#7A1230';

export default function HomePage() {
  return (
    <main style={{ background: '#FBF3E8' }}>
      {/* ---------- opening beat ---------- */}
      <section className="px-6 pt-20 pb-16 text-center max-w-2xl mx-auto">
        <HeroFlourish className="w-[110px] h-6 mx-auto mb-8 opacity-55" style={{ color: '#A9762F' }} />
        <div className="font-display italic text-[17px] mb-4" style={{ color: '#A9762F' }}>Bloom &amp; Blossom</div>
        <h1 className="font-display text-[clamp(28px,4.6vw,40px)] leading-[1.25]" style={{ color: INK }}>
          Every piece begins the same way — with someone&apos;s name, and a reason to remember them by.
        </h1>
        <p className="mt-5 text-[14.5px]" style={{ color: '#7A5D4E' }}>
          Rakhi, kaleere, a bangle for the nine months of waiting. Nothing here is made until you write to us first.
        </p>
        <div className="w-12 h-px mx-auto mt-8" style={{ background: '#A9762F88' }} />
      </section>

      {/* ---------- the scroll storyline ---------- */}
      <ScrollStory categories={CATEGORIES} />

      {/* ---------- the atelier strip ---------- */}
      <section className="px-4 py-24" style={{ background: '#FBF3E8' }}>
        <div className="max-w-4xl mx-auto glass-tile p-8 md:p-10 grid md:grid-cols-2 gap-8 items-center">
          <div className="h-44 rounded-2xl bg-stone300/60 flex items-center justify-center text-stone500 text-[11px] uppercase tracking-wide">
            founder photo
          </div>
          <div>
            <div className="text-[11px] tracking-[0.14em] uppercase text-stone500 mb-2">The Atelier</div>
            <h2 className="font-display text-2xl" style={{ color: INK }}>Made once, never restocked</h2>
            <p className="mt-3 text-[14px]" style={{ color: '#7A5D4E' }}>
              Every piece is built after you write to us, not before — which is the whole reason it takes fourteen days.
            </p>
            <p className="font-display italic text-lg mt-3" style={{ color: '#A9762F' }}>— from our worktable to your wrist</p>
            <Link href="/atelier" className="inline-block mt-4 text-[12px] tracking-[0.08em] uppercase font-semibold rounded-sm px-5 py-2.5 border transition-colors" style={{ borderColor: INK, color: INK }}>
              Meet the maker
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- footer: composed, not an afterthought ---------- */}
      <footer style={{ background: '#2B0F16', color: '#E9CFA8' }} className="px-6 sm:px-14 pt-16 pb-10">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between gap-10 pb-11" style={{ borderBottom: '1px solid rgba(233,207,168,0.18)' }}>
          <div>
            <div className="font-display text-[24px]" style={{ color: '#F3E4C8' }}>Bloom &amp; Blossom</div>
            <div className="font-display italic text-[14px] mt-2" style={{ color: '#C9974B' }}>— from our worktable to your wrist</div>
          </div>
          <div className="flex gap-12">
            <div>
              <div className="text-[10.5px] tracking-[0.16em] uppercase mb-3" style={{ color: '#8A6A52' }}>Shop</div>
              {CATEGORIES.slice(0, 4).map((c) => (
                <Link key={c.slug} href={`/category/${c.slug}`} className="block text-[13px] mb-2 opacity-85 hover:opacity-100">
                  {c.eyebrow.split('&')[0].trim()}
                </Link>
              ))}
            </div>
            <div>
              <div className="text-[10.5px] tracking-[0.16em] uppercase mb-3" style={{ color: '#8A6A52' }}>Studio</div>
              <Link href="/track" className="block text-[13px] mb-2 opacity-85 hover:opacity-100">Track Order</Link>
              <Link href="/atelier" className="block text-[13px] mb-2 opacity-85 hover:opacity-100">The Atelier</Link>
            </div>
          </div>
        </div>
        <div className="max-w-5xl mx-auto flex flex-wrap justify-between gap-3 pt-6 text-[11.5px]" style={{ color: '#8A6A52' }}>
          <div>© Bloom &amp; Blossom</div>
          <div>Made once, never restocked</div>
        </div>
      </footer>

      <ChatWidget sessionId="general-enquiry" context="General enquiry" />
    </main>
  );
}
