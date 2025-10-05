// @ts-nocheck
import * as React from 'react';
import { Image as ImageIcon } from 'lucide-react';

export default function PhotoCheckPage() {
  return (
    <div className="space-y-6 max-w-xl mx-auto">
      <h1 className="text-xl font-semibold text-gray-900 mt-6 md:mt-8">Fotoğraf Kontrolü</h1>
      <div className="bg-white border rounded-xl p-5 space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
            <ImageIcon className="text-amber-600" size={20} />
          </div>
          <p className="text-gray-700">Profil fotoğraflarının kaynağını kontrol edin.</p>
        </div>
        <input type="file" className="w-full border rounded-lg px-3 py-2" />
        <button className="px-4 py-2 rounded-lg bg-amber-500 text-white font-medium hover:bg-amber-600">Analiz Et</button>
      </div>
    </div>
  );
}
