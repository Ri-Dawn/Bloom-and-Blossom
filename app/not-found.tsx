import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="max-w-sm mx-auto px-4 pt-24 text-center">
      <div className="glass-tile p-8">
        <div className="font-display text-2xl text-stone900 mb-2">This page wandered off</div>
        <p className="text-[13px] text-stone500 mb-5">Even our best-kept pieces sometimes need a second look.</p>
        <Link href="/" className="text-rani text-[13px] font-semibold">
          Back to Bloom &amp; Blossom →
        </Link>
      </div>
    </main>
  );
}
