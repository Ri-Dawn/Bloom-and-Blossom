import Link from 'next/link';
import { notFound } from 'next/navigation';
import { findCategory } from '@/lib/categories';
import CategoryIcon from '@/components/CategoryIcon';
import { CornerFlourish } from '@/components/decor/CornerFlourish';
import ChatWidget from '@/components/ChatWidget';

const INK = '#3A1015';
const WINE = '#7A1230';

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const cat = findCategory(params.slug);
  if (!cat) return notFound();

  return (
    <main className="px-4 pb-24" style={{ background: '#FBF3E8' }}>
      <section className="max-w-4xl mx-auto pt-12 pb-10 text-center relative">
        <CornerFlourish className="absolute top-0 left-0 w-14 h-14 hidden md:block opacity-50" style={{ color: cat.mood.accent }} />
        <CornerFlourish flip className="absolute top-0 right-0 w-14 h-14 hidden md:block opacity-50" style={{ color: cat.mood.accent }} />
        <div className="glow-badge inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] tracking-[0.2em] uppercase mb-6" style={{ color: WINE }}>
          <CategoryIcon name={cat.icon} className="w-3.5 h-3.5" />
          {cat.eyebrow}{cat.comingSoon ? ' · Coming Soon' : ''}
        </div>
        <h1 className="font-display italic text-2xl md:text-[32px] leading-tight max-w-2xl mx-auto" style={{ color: INK }}>{cat.headline}</h1>
        <p className="mt-4 text-[14px] max-w-xl mx-auto" style={{ color: '#7A5D4E' }}>{cat.blurb}</p>
      </section>

      {cat.comingSoon ? (
        <section className="max-w-2xl mx-auto text-center py-10">
          <p className="text-[14px] text-stone500">
            This collection is still being made. Check back soon, or use Design Studio in the corner to ask us directly.
          </p>
          <Link href="/" className="inline-block mt-6 text-[12px] tracking-[0.08em] uppercase font-semibold rounded-sm px-6 py-3 border" style={{ borderColor: INK, color: INK }}>
            Back to all occasions
          </Link>
        </section>
      ) : (
        <section className="max-w-4xl mx-auto">
          <div className="gold-thread-divider mb-8" />
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
                  <div className="h-24 relative overflow-hidden flex items-center justify-center" style={{ background: `${cat.mood.accent}18` }}>
                    <CategoryIcon name={cat.icon} className="w-7 h-7" style={{ color: cat.mood.accent }} />
                  </div>
                  <div className="p-4">
                    <div className="font-display text-[15px] text-stone900 leading-snug">{item.name}</div>
                    <div className="text-[13px] font-semibold mt-1" style={{ color: WINE }}>₹{item.price.toLocaleString('en-IN')}</div>
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
