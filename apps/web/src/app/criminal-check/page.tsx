// @ts-nocheck
import * as React from 'react';
import { AlertTriangle } from 'lucide-react';

export default function CriminalCheckPage() {
  return (
    <div className="space-y-6 max-w-xl mx-auto">
      <h1 className="text-xl font-semibold text-gray-900">Suç Kaydı Kontrolü</h1>
      <div className="bg-white border rounded-xl p-5 space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
            <AlertTriangle className="text-red-600" size={20} />
          </div>
          <p className="text-gray-700">Risk göstergelerini tarayın (temsilidir).</p>
        </div>
        <input className="w-full border rounded-lg px-3 py-2" placeholder="İsim veya kimlik bilgisi" />
        <button className="px-4 py-2 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700">Kontrol Et</button>
      </div>
    </div>
  );
}


