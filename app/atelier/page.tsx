import ChatWidget from '@/components/ChatWidget';

export default function AtelierPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 pt-12 pb-24">
      <div className="text-[11px] tracking-[0.14em] uppercase text-stone500 mb-3">The Atelier</div>
      <h1 className="font-display text-3xl text-stone900 mb-6">Why nothing here is ever restocked</h1>

      <div className="glass-tile p-6 mb-6">
        <div className="h-56 rounded-xl bg-stone300/60 flex items-center justify-center text-stone500 text-[11px] uppercase tracking-wide">
          founder photo
        </div>
      </div>

      <div className="space-y-4 text-[14.5px] text-stone900/85 leading-relaxed">
        <p>
          Every piece on this site starts the same way — not with a stockroom, but with a message. A name, an
          occasion, a relationship. Bloom &amp; Blossom exists because a rakhi with the right name spelled the
          right way, or a kaleere carrying the right blessing, can&apos;t be bought off a shelf.
        </p>
        <p>
          That&apos;s also why it takes fourteen days. Nothing is sitting in a drawer waiting to be sold to
          someone else — it&apos;s built after you write to us, for you specifically.
        </p>
        <p className="font-hand text-rani text-2xl">— from our worktable to your wrist</p>
      </div>

      <ChatWidget sessionId="atelier-enquiry" context="General enquiry" />
    </main>
  );
}
