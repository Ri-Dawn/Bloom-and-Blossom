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
      <section className="max-w-4xl mx-auto pt-12 pb-10">
        <div className="glass-tile p-8 md:p-10 flex flex-col md:flex-row gap-8 items-center">
          <div className="w-20 h-20 rounded-full glass-pill flex items-center justify-center text-rani shrink-0">
            <CategoryIcon name={cat.icon} className="w-10 h-10" />
          </div>
          <div>
            <div className="text-[11px] tracking-[0.14em] uppercase text-stone500 mb-2">{cat.eyebrow}</div>
            <h1 className="font-display text-2xl md:text-[32px] leading-tight text-stone900">{cat.headline}</h1>
            <p className="mt-3 text-[14px] text-stone900/80">{cat.blurb}</p>
          </div>
        </div>
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
              <Link href={href} key={item.slug} className="glass-tile p-4 flex flex-col gap-3">
                <div className="h-24 rounded-xl bg-stone300/60" />
                <div>
                  <div className="font-display text-[15px] text-stone900 leading-snug">{item.name}</div>
                  <div className="text-[13px] font-semibold text-rani mt-1">₹{item.price.toLocaleString('en-IN')}</div>
                  {!item.customisable && (
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
