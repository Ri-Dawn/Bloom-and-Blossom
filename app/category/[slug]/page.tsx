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
        <div
          className="mood-stage relative overflow-hidden"
          style={{ minHeight: '260px' }}
        >
          <div className="mood-layer" style={{ opacity: 1 }}>
            {cat.heroImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={cat.heroImage} alt="" />
            ) : (
              <div className="w-full h-full" style={{ background: `linear-gradient(160deg, ${cat.mood.from}, ${cat.mood.to})` }} />
            )}
            <div className="mood-scrim" style={{ background: `linear-gradient(150deg, ${cat.mood.from}CC 10%, ${cat.mood.to}66 85%)` }} />
            <div className="mood-scrim-top" />
          </div>
          <div className="relative z-10 h-full flex flex-col justify-end gap-8 p-8 md:p-10" style={{ minHeight: '260px' }}>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full flex items-center justify-center shrink-0" style={{ background: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.35)', color: cat.mood.ink }}>
                <CategoryIcon name={cat.icon} className="w-7 h-7" />
              </div>
              <div>
                <div className="text-[11px] tracking-[0.14em] uppercase mb-1" style={{ color: cat.mood.ink, opacity: 0.85 }}>{cat.eyebrow}</div>
                <h1 className="font-display text-2xl md:text-[30px] leading-tight" style={{ color: cat.mood.ink }}>{cat.headline}</h1>
              </div>
            </div>
          </div>
        </div>
        <p className="mt-5 text-[14px] text-stone900/80 max-w-2xl">{cat.blurb}</p>
      </section>

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
                <div className="h-28 relative overflow-hidden">
                  {item.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full" style={{ background: `linear-gradient(160deg, ${cat.mood.from}33, ${cat.mood.to}33)` }} />
                  )}
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

      <ChatWidget sessionId={`category-${cat.slug}`} context={cat.eyebrow} />
    </main>
  );
}
