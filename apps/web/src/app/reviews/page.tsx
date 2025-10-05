// @ts-nocheck
import * as React from 'react';
import { useMemo, useState } from 'react';
import { Star, ThumbsUp, MessageCircle } from 'lucide-react';

const sampleReviews = [
  {
    id: 'r1',
    subject: 'Ayşe Demir',
    rating: 5,
    text: 'Güvenilir ve saygılı. Buluşma çok keyifliydi.',
    date: '2025-09-12',
    likes: 12,
  },
  {
    id: 'r2',
    subject: 'Mehmet Yılmaz',
    rating: 2,
    text: 'Video görüşmeden kaçındı, hızlıca buluşmak istedi. Dikkatli olun.',
    date: '2025-09-20',
    likes: 4,
  },
  {
    id: 'r3',
    subject: 'Can Aydın',
    rating: 1,
    text: 'Para talebi ve ısrarcı davranış. Bence uzak durun.',
    date: '2025-08-15',
    likes: 9,
  },
  {
    id: 'r4',
    subject: 'Zeynep Kaya',
    rating: 4,
    text: 'Nazik ve planlı, güzel bir sohbet oldu.',
    date: '2025-07-01',
    likes: 7,
  },
];

function Stars({ n }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={16} className={i < n ? 'text-amber-500 fill-amber-500' : 'text-gray-300'} />
      ))}
    </div>
  );
}

export default function ReviewsPage() {
  const [term, setTerm] = useState('');
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState<'new' | 'high' | 'low'>('new');

  const filtered = useMemo(() => {
    let arr = sampleReviews.filter((r) => r.rating >= minRating && r.subject.toLowerCase().includes(term.toLowerCase()));
    if (sortBy === 'new') arr = arr.sort((a, b) => (a.date < b.date ? 1 : -1));
    if (sortBy === 'high') arr = arr.sort((a, b) => b.rating - a.rating);
    if (sortBy === 'low') arr = arr.sort((a, b) => a.rating - b.rating);
    return arr;
  }, [term, minRating, sortBy]);

  const avg = useMemo(() => sampleReviews.reduce((s, r) => s + r.rating, 0) / sampleReviews.length, []);

  return (
    <div className="space-y-8">
      <header className="space-y-1 mt-6 md:mt-8">
        <h1 className="text-xl font-semibold text-gray-900">Yorumlar</h1>
        <p className="text-gray-600">Topluluk geri bildirimleri ve deneyimler.</p>
      </header>

      {/* Summary */}
      <div className="bg-white border rounded-xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Stars n={Math.round(avg)} />
          <span className="text-sm text-gray-700">Ortalama {avg.toFixed(1)} / 5 • {sampleReviews.length} yorum</span>
        </div>
        <div className="text-sm text-gray-500">Güncellenen: {new Date().toLocaleDateString()}</div>
      </div>

      {/* Filters */}
      <div className="bg-white border rounded-xl p-4 flex flex-wrap items-center gap-3">
        <input
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          className="border rounded-lg px-3 py-2 flex-1 min-w-[180px]"
          placeholder="İsim/konu ara (örn: Ayşe)"
        />
        <select
          value={minRating}
          onChange={(e) => setMinRating(Number(e.target.value))}
          className="border rounded-lg px-3 py-2"
        >
          <option value={0}>Tüm Puanlar</option>
          <option value={3}>3+ Puan</option>
          <option value={4}>4+ Puan</option>
        </select>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="border rounded-lg px-3 py-2">
          <option value="new">En Yeni</option>
          <option value="high">En Yüksek Puan</option>
          <option value="low">En Düşük Puan</option>
        </select>
      </div>

      {/* List */}
      <div className="grid gap-3">
        {filtered.map((r) => (
          <div key={r.id} className="bg-white border rounded-xl p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-gray-900">{r.subject}</p>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Stars n={r.rating} />
                  <span>• {new Date(r.date).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <ThumbsUp size={16} /> {r.likes}
              </div>
            </div>
            <p className="mt-2 text-sm text-gray-700">{r.text}</p>
            <div className="mt-3 flex items-center gap-2">
              <button className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border text-sm font-medium hover:bg-gray-50">
                <ThumbsUp size={16} /> Beğen
              </button>
              <button className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border text-sm font-medium hover:bg-gray-50">
                <MessageCircle size={16} /> Yorum yap
              </button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="bg-white border rounded-xl p-4 text-sm text-gray-600">Kriterlere uygun yorum bulunamadı.</div>
        )}
      </div>
    </div>
  );
}
