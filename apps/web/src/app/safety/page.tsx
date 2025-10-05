// @ts-nocheck
import * as React from 'react';
import {
  AlertOctagon,
  AlertTriangle,
  Shield,
  ShieldCheck,
  MapPin,
  Users,
  Eye,
  Camera,
  ExternalLink,
  Phone,
} from 'lucide-react';

export default function SafetyPage() {
  const safetyTips = [
    {
      Icon: MapPin,
      title: 'İlk Buluşma Yeri',
      desc: 'İlk buluşmayı kalabalık ve güvenli alanlarda yapın.',
      bullets: [
        'Kafe, restoran gibi kalabalık yerleri tercih edin',
        'Evlerde buluşmaya hayır deyin',
        'Alkol alınan yerlerden kaçının',
        'Ulaşımı kolay yerler seçin',
      ],
      color: 'bg-emerald-600',
    },
    {
      Icon: Users,
      title: 'Arkadaş Desteği',
      desc: 'Buluşma öncesi/sonrası yakınlarınızı bilgilendirin.',
      bullets: [
        'Nerede, kimle buluştuğunuzu paylaşın',
        'Buluşma saati ve yerini bildirin',
        'Düzenli mesaj atarak durumunuzu bildirin',
        'Acil durum kod kelimesi belirleyin',
      ],
      color: 'bg-blue-600',
    },
    {
      Icon: Eye,
      title: 'Kişiyi Tanıma',
      desc: 'Buluşmadan önce kişiyi yeterince tanıyın.',
      bullets: [
        'Video görüşme ile gerçekliğini doğrulayın',
        'Sosyal medya profillerini kontrol edin',
        'Ortak arkadaşlarınızı sorun',
        'İş ve yaşam detaylarını öğrenin',
      ],
      color: 'bg-amber-500',
    },
    {
      Icon: Camera,
      title: 'Fotoğraf Güvenliği',
      desc: 'Kişisel fotoğraflarınızı paylaşırken seçici olun.',
      bullets: [
        'Adresinizi gösteren fotoğrafları paylaşmayın',
        'İş yerinizin görüldüğü fotoğraflardan kaçının',
        'Çocukların fotoğraflarını paylaşmayın',
        'Kişisel eşyalarınızı ifşa eden detaylardan kaçının',
      ],
      color: 'bg-violet-600',
    },
  ];

  const redFlags = [
    { flag: 'Kişisel bilgileri çok hızlı istiyor', severity: 'high' },
    { flag: 'Buluşma yerini eve davet ediyor', severity: 'high' },
    { flag: 'Telefon/video görüşmesi yapmak istemiyor', severity: 'medium' },
    { flag: 'Sosyal medya hesapları çok yeni', severity: 'medium' },
    { flag: 'Fotoğraflar abartılı profesyonel görünüyor', severity: 'low' },
    { flag: 'İşi/yaşamı hakkında net bilgi vermiyor', severity: 'medium' },
    { flag: 'Para konularını sık gündeme getiriyor', severity: 'high' },
    { flag: 'Ailesi/arkadaşlarından hiç bahsetmiyor', severity: 'low' },
  ];

  const severityUI = {
    high: { label: 'Yüksek Risk', cls: 'bg-red-100 text-red-700' },
    medium: { label: 'Orta Risk', cls: 'bg-amber-100 text-amber-700' },
    low: { label: 'Düşük Risk', cls: 'bg-gray-100 text-gray-700' },
  };

  return (
    <div className="space-y-10">
      {/* Page header */}
      <section className="mt-6 md:mt-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Güvenlik Merkezi</h1>
            <p className="text-sm text-gray-600">Güvenli flört için önemli ipuçları</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center">
            <AlertOctagon className="text-white" size={18} />
          </div>
        </div>
      </section>

      {/* Emergency contacts */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <AlertOctagon className="text-red-600" size={18} />
          <h2 className="text-base font-semibold text-gray-900">Acil Durum Numaraları</h2>
        </div>
        <div className="grid gap-3">
          <EmergencyContact name="Polis" number="155" description="Acil durumlar için" />
          <EmergencyContact name="Kadın Acil Hattı" number="183" description="Şiddet hattı" />
          <EmergencyContact name="Mor Çatı" number="0212 292 52 31" description="Danışma ve dayanışma" />
        </div>
      </section>

      {/* Safety tips */}
      <section className="space-y-4">
        <h2 className="text-base font-semibold text-gray-900">Güvenlik İpuçları</h2>
        <div className="grid gap-4">
          {safetyTips.map(({ Icon, title, desc, bullets, color }) => (
            <div key={title} className="bg-white border rounded-xl p-5">
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${color}`}>
                  <Icon className="text-white" size={18} />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
                  <p className="text-sm text-gray-600">{desc}</p>
                </div>
              </div>
              <ul className="mt-3 list-disc pl-5 text-sm text-gray-700 space-y-1">
                {bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Red flags */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <AlertTriangle className="text-red-600" size={18} />
          <h2 className="text-base font-semibold text-gray-900">Dikkat Etmeniz Gerekenler</h2>
        </div>
        <p className="text-sm text-gray-600">
          Bu davranışları gösteren kişilerde dikkatli olun ve güvende hissetmiyorsanız buluşmayın:
        </p>
        <div className="grid gap-2">
          {redFlags.map(({ flag, severity }) => (
            <div key={flag} className="bg-white border rounded-xl p-4 flex items-start gap-3">
              <ShieldCheck className="text-emerald-600 mt-0.5" size={18} />
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm text-gray-900 font-medium">{flag}</p>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${severityUI[severity].cls}`}>
                    {severityUI[severity].label}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Safety resources CTA */}
      <section className="bg-emerald-600 text-white rounded-2xl p-6 text-center">
        <div className="flex items-center justify-center">
          <Shield size={28} className="text-white" />
        </div>
        <h3 className="mt-2 text-lg font-semibold">Güvenliğiniz Önceliğimiz</h3>
        <p className="mt-1 opacity-90">
          Şüpheli bir durumla karşılaşırsanız hemen yardım alın. Güvenliğiniz her şeyden önemlidir.
        </p>
        <a
          href="#"
          className="inline-flex items-center gap-2 mt-4 bg-white text-emerald-700 font-semibold px-4 py-2 rounded-full hover:bg-emerald-50"
        >
          Destek Al <ExternalLink size={16} />
        </a>
      </section>
    </div>
  );
}

function EmergencyContact({ name, number, description }) {
  return (
    <div className="bg-white border rounded-xl p-4 flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
        <Phone className="text-red-600" size={18} />
      </div>
      <div className="flex-1">
        <p className="text-sm font-semibold text-gray-900">{name}</p>
        <p className="text-xs text-gray-600">{description}</p>
      </div>
      <a href={`tel:${number}`} className="text-emerald-700 font-medium hover:underline">
        {number}
      </a>
    </div>
  );
}
