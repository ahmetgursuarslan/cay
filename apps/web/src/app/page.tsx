// @ts-nocheck
import * as React from 'react';
import { Search, Image as ImageIcon, UserCheck, Shield, AlertTriangle, Heart } from 'lucide-react';
import { Link } from 'react-router';

export default function Page() {
  return (
    <div className="space-y-10">
      {/* Hero */}
      <section className="pt-4 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
          Güvenle
          <br />
          Flört Et
        </h1>
        <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
          Çay ile tanıştığın kişileri araştır, geçmişlerini öğren ve güvenli flört deneyimi yaşa.
        </p>

        {/* Quick Actions (as Links) */}
        <div className="mt-8 grid grid-cols-3 gap-3 max-w-md mx-auto sm:max-w-lg">
          <Link to="/search" className="flex flex-col items-center gap-2 rounded-xl border bg-white hover:bg-gray-50 transition p-4">
            <Search className="text-emerald-600" size={22} />
            <span className="text-sm font-medium text-gray-800">Hızlı Arama</span>
          </Link>
          <Link to="/photo-check" className="flex flex-col items-center gap-2 rounded-xl border bg-white hover:bg-gray-50 transition p-4">
            <ImageIcon className="text-amber-500" size={22} />
            <span className="text-sm font-medium text-gray-800">Fotoğraf Kontrolü</span>
          </Link>
          <Link to="/verify-profile" className="flex flex-col items-center gap-2 rounded-xl border bg-white hover:bg-gray-50 transition p-4">
            <UserCheck className="text-blue-500" size={22} />
            <span className="text-sm font-medium text-gray-800">Profil Doğrulama</span>
          </Link>
        </div>
      </section>

      {/* Safety Features */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">Güvenlik Araçlarımız</h2>

        <FeatureCard icon={<Search className="text-emerald-600" size={22} />} title="Geçmiş Kontrolü" desc="İsim, telefon veya sosyal profille arama yapın." to="/search" />
        <FeatureCard icon={<ImageIcon className="text-amber-500" size={22} />} title="Ters Görsel Arama" desc="Profil fotoğraflarının gerçekliğini kontrol edin." to="/photo-check" />
        <FeatureCard icon={<UserCheck className="text-blue-500" size={22} />} title="Kimlik Doğrulama" desc="Gerçek kimliği doğrulayın ve sahte profilleri ayıklayın." to="/verify-profile" />
        <FeatureCard icon={<AlertTriangle className="text-red-500" size={22} />} title="Suç Kaydı Kontrolü" desc="Risk göstergelerini gözden geçirin." to="/criminal-check" />
        <FeatureCard icon={<Shield className="text-purple-500" size={22} />} title="Güvenlik İpuçları" desc="Çevrim içi flörtte güvenlik rehberi." to="/safety" />
      </section>

      {/* CTA */}
      <section className="bg-emerald-600 text-white rounded-2xl p-8 text-center">
        <div className="flex items-center justify-center">
          <Heart size={28} className="text-white" />
        </div>
        <h3 className="mt-3 text-xl font-semibold">Güvenli Aşk Başlasın</h3>
        <p className="mt-1 opacity-90 max-w-xl mx-auto">
          Milyonlarca kadın Çay ile güvenle flört ediyor. Sen de katıl!
        </p>
        <Link to="/signup" className="inline-block mt-5 bg-white text-emerald-700 font-semibold px-5 py-2.5 rounded-full hover:bg-emerald-50">
          Hemen Başla
        </Link>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, desc, to }) {
  return (
    <Link to={to} className="block rounded-2xl border bg-white p-5 hover:shadow-sm transition">
      <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">{icon}</div>
      <div className="mt-3">
        <h3 className="text-base font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-600">{desc}</p>
      </div>
    </Link>
  );
}

