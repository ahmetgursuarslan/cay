// @ts-nocheck
import * as React from 'react';

export default function SignupPage() {
  return (
    <div className="max-w-md mx-auto space-y-6">
      <h1 className="text-xl font-semibold text-gray-900 mt-6 md:mt-8">Kayıt Ol</h1>
      <div className="bg-white border rounded-xl p-5 space-y-3">
        <input className="w-full border rounded-lg px-3 py-2" placeholder="Ad Soyad" />
        <input className="w-full border rounded-lg px-3 py-2" placeholder="E-posta" />
        <input className="w-full border rounded-lg px-3 py-2" type="password" placeholder="Şifre" />
        <button className="w-full mt-2 px-4 py-2 rounded-lg bg-emerald-600 text-white font-medium hover:bg-emerald-700">Hesap Oluştur</button>
      </div>
    </div>
  );
}

