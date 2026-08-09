'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function submit() {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Login failed');
      }
      router.push('/admin');
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="max-w-sm mx-auto px-4 pt-20 text-center">
      <div className="glass-tile p-7">
        <div className="font-display text-2xl text-stone900 mb-4">Admin</div>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && submit()}
          placeholder="Password"
          className="w-full rounded-lg border border-stone300 bg-white/70 px-3 py-2.5 text-[13px] mb-3"
        />
        {error && <div className="text-rani text-[12px] mb-3">{error}</div>}
        <button onClick={submit} disabled={loading} className="w-full bg-stone900 text-stone50 rounded-full py-2.5 text-[13px] font-semibold">
          {loading ? 'Checking…' : 'Enter'}
        </button>
      </div>
    </main>
  );
}
