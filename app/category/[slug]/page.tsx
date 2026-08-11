import Link from 'next/link';
import { notFound } from 'next/navigation';
import { findCategory } from '@/lib/categories';
import CategoryIcon from '@/components/CategoryIcon';
import ChatWidget from '@/components/ChatWidget';

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const cat = findCategory(params.slug);
  if (!cat) return notFound();

  return (
    <main className="px-4 pb-24">
      <section className="max-w-4xl mx-auto pt-8 pb-10">
        <div className="mood-stage relative overflow-hidden" style={{ minHeight: '240px' }}>
          <div className="absolute inset-0" style={{ background: `linear-gradient(150deg, ${cat.mood.from}, ${cat.mood.to})` }} />
          <div className="absolute inset-0 diya-dots opacity-10" />
          <div className="relative z-10 h-full flex flex-col justify-end gap-8 p-8 md:p-10" style={{ minHeight: '240px' }}>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full flex items-center justify-center shrink-0" style={{ background: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.35)', color: cat.mood.ink }}>
                <CategoryIcon name={cat.icon} className="w-7 h-7" />
              </div>
              <div>
                <div className="text-[11px] tracking-[0.14em] uppercase mb-1" style={{ color: cat.mood.ink, opacity: 0.85 }}>
                  {cat.eyebrow}{cat.comingSoon ? ' · Coming Soon' : ''}
                </div>
                <h1 className="font-display text-2xl md:text-[30px] leading-tight" style={{ color: cat.mood.ink }}>{cat.headline}</h1>
              </div>
            </div>
          </div>
        </div>
        <p className="mt-5 text-[14px] text-stone900/80 max-w-2xl">{cat.blurb}</p>
      </section>

      {cat.comingSoon ? (
        <section className="max-w-2xl mx-auto text-center py-10">
          <p className="text-[14px] text-stone500">
            This collection is still being made. Check back soon, or use Design Studio in the corner to ask us directly.
          </p>
          <Link href="/" className="inline-block mt-6 text-[13px] font-semibold text-stone900 border border-stone900 rounded-full px-5 py-2 hover:bg-stone900 hover:text-stone50 transition-colors">
            Back to all occasions
          </Link>
        </section>
      ) : (
        <section className="max-w-4xl mx-auto">
          <div className="text-[11px] tracking-[0.12em] uppercase text-stone500 mb-4 px-1">
            Starting points — every one of these is a beginning, not a finished piece
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {cat.items.map((item) => {
              const href = item.customisable
                ? `/studio?cat=${cat.slug}&item=${item.slug}`
                : `/checkout?cat=${cat.slug}&item=${item.slug}&price=${item.price}&name=${encodeURIComponent(item.name)}`;
              return (
                <Link href={href} key={item.slug} className="glass-tile overflow-hidden flex flex-col">
                  <div className="h-28 relative overflow-hidden flex items-center justify-center" style={{ background: `linear-gradient(160deg, ${cat.mood.from}22, ${cat.mood.to}22)` }}>
                    <CategoryIcon name={cat.icon} className="w-8 h-8" style={{ color: cat.mood.from }} />
                  </div>
                  <div className="p-4">
                    <div className="font-display text-[15px] text-stone900 leading-snug">{item.name}</div>
                    <div className="text-[13px] font-semibold text-rani mt-1">₹{item.price.toLocaleString('en-IN')}</div>
                    {item.customisable ? (
                      <div className="text-[10px] text-stone500 mt-1">Add charms, initials, a photo</div>
                    ) : (
                      <div className="text-[10px] text-stone500 mt-1">Buy as shown</div>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      <ChatWidget sessionId={`category-${cat.slug}`} context={cat.eyebrow} />
    </main>
  );
}
