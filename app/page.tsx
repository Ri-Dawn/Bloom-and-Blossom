import Link from 'next/link';
import { CATEGORIES } from '@/lib/categories';
import ScrollStory from '@/components/ScrollStory';
import ChatWidget from '@/components/ChatWidget';

export default function HomePage() {
  return (
    <main>
      {/* ---------- opening beat ---------- */}
      <section className="px-6 pt-14 pb-6 text-center max-w-2xl mx-auto">
        <div className="text-[11px] tracking-[0.22em] uppercase text-stone500 mb-3">Bloom &amp; Blossom</div>
        <h1 className="font-display text-[clamp(28px,5vw,42px)] text-stone900 leading-tight">
          Every occasion. One thread running through all of them.
        </h1>
        <p className="font-hand text-rani text-xl mt-3">scroll — the site changes with you</p>
      </section>

      {/* ---------- the scroll storyline ---------- */}
      <ScrollStory categories={CATEGORIES} />

      {/* ---------- the atelier strip ---------- */}
      <section className="px-4 py-24">
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
        <div className="footer-thread max-w-5xl mx-auto mb-8" />
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
