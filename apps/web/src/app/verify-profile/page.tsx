// @ts-nocheck
import * as React from 'react';
import { UserCheck } from 'lucide-react';

export default function VerifyProfilePage() {
  return (
    <div className="space-y-6 max-w-xl mx-auto">
      <h1 className="text-xl font-semibold text-gray-900 mt-6 md:mt-8">Profil Doğrulama</h1>
      <div className="bg-white border rounded-xl p-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
            <UserCheck className="text-blue-600" size={20} />
          </div>
          <p className="text-gray-700">Kimlik doğrulama adımlarını tamamlayın.</p>
        </div>
        <button className="mt-4 px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700">Devam Et</button>
      </div>
    </div>
  );
}

