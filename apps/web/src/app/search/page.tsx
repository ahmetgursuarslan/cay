// @ts-nocheck
import * as React from 'react';
import { useState, useMemo } from 'react';
import { Search as SearchIcon, AlertTriangle, UserCheck, MessageSquare } from 'lucide-react';
import { Link } from 'react-router';

const testData = [
  {
    id: 'p1',
    name: 'Ayşe Demir',
    phone: '+90 532 111 22 33',
    socials: { instagram: 'instagram.com/ayse.demir' },
    risk: 'low',
    reviewsCount: 5,
    notes: 'Gerçek hesap, karşılıklı takip mevcut.',
  },
  {
    id: 'p2',
    name: 'Mehmet Yılmaz',
    phone: '+90 555 444 33 22',
    socials: { twitter: 'twitter.com/mehmtyilmaz' },
    risk: 'medium',
    reviewsCount: 2,
    notes: 'Video görüşme yapmak istemedi, temkinli olun.',
  },
  {
    id: 'p3',
    name: 'Zeynep Kaya',
    phone: '+90 530 000 11 22',
    socials: { instagram: 'instagram.com/zey.kaya' },
    risk: 'low',
    reviewsCount: 0,
    notes: 'Yeni hesap, az paylaşım.',
  },
  {
    id: 'p4',
    name: 'Can Aydın',
    phone: '+90 533 987 65 43',
    socials: { tiktok: 'tiktok.com/@canaydn' },
    risk: 'high',
    reviewsCount: 3,
    notes: 'Para talebi ve aceleci davranış bildirimleri mevcut.',
  },
];

const riskMeta = {
  low: { label: 'Düşük Risk', cls: 'bg-emerald-100 text-emerald-700' },
  medium: { label: 'Orta Risk', cls: 'bg-amber-100 text-amber-700' },
  high: { label: 'Yüksek Risk', cls: 'bg-red-100 text-red-700' },
};

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [touched, setTouched] = useState(false);

  const normalized = (s: string) => s.toLowerCase().replace(/\s+/g, '');
  const digits = (s: string) => s.replace(/\D+/g, '');

  const results = useMemo(() => {
    if (!query) return [];
    const q = normalized(query);
    const qDigits = digits(query);
    return testData.filter((p) => {
      const nameHit = normalized(p.name).includes(q);
      const phoneHit = digits(p.phone).includes(qDigits);
      const socialsHit = Object.values(p.socials ?? {}).some((v) => normalized(v).includes(q));
      return nameHit || (qDigits && phoneHit) || socialsHit;
    });
  }, [query]);

  const showNoResults = touched && query && results.length === 0;

  return (
    <div className="space-y-8">
      <header className="space-y-1 mt-6 md:mt-8">
        <h1 className="text-xl font-semibold text-gray-900">Hızlı Arama</h1>
        <p className="text-gray-600">İsim, telefon veya sosyal bağlantıyla arayın.</p>
      </header>

      <div className="bg-white border rounded-xl p-4">
        <div className="flex items-center gap-2">
          <div className="shrink-0 w-9 h-9 rounded-lg bg-emerald-100 flex items-center justify-center">
            <SearchIcon size={18} className="text-emerald-700" />
          </div>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && setTouched(true)}
            placeholder="Örn: Ayşe, +9053..., instagram.com/ayse..."
            className="flex-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
          <button
            onClick={() => setTouched(true)}
            className="px-4 py-2 rounded-lg bg-emerald-600 text-white font-medium hover:bg-emerald-700"
          >
            Ara
          </button>
          <button
            onClick={() => {
              setQuery('');
              setTouched(false);
            }}
            className="px-3 py-2 rounded-lg border font-medium text-gray-700 hover:bg-gray-50"
          >
            Temizle
          </button>
        </div>

        {/* Suggestions */}
        {!touched && (
          <div className="mt-3 text-sm text-gray-600">
            Örnekler: <span className="font-medium">Ayşe</span>, <span className="font-medium">+90 555</span>,{' '}
            <span className="font-medium">instagram.com/ayse</span>
          </div>
        )}
      </div>

      {/* Results */}
      {touched && query && (
        <section className="space-y-3">
          <h2 className="text-base font-semibold text-gray-900">Sonuçlar</h2>
          <div className="grid gap-3">
            {results.map((p) => (
              <div key={p.id} className="bg-white border rounded-xl p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{p.name}</p>
                    <p className="text-xs text-gray-600">{p.phone}</p>
                    <p className="text-xs text-gray-600">
                      {Object.values(p.socials).join(' • ')}
                    </p>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${riskMeta[p.risk].cls}`}>
                    {riskMeta[p.risk].label}
                  </span>
                </div>
                <p className="mt-2 text-sm text-gray-700">{p.notes}</p>
                <div className="mt-3 flex items-center gap-2">
                  <Link
                    to="/verify-profile"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700"
                  >
                    <UserCheck size={16} /> Doğrula
                  </Link>
                  <Link
                    to="/reviews"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border text-sm font-medium hover:bg-gray-50"
                  >
                    <MessageSquare size={16} /> Yorumlar ({p.reviewsCount})
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {showNoResults && (
            <div className="bg-white border rounded-xl p-4 flex items-center gap-3">
              <AlertTriangle className="text-amber-600" size={18} />
              <p className="text-sm text-gray-700">Sonuç bulunamadı. Yazımı kontrol edin veya farklı anahtar kelimeler deneyin.</p>
            </div>
          )}
        </section>
      )}
    </div>
  );
}
