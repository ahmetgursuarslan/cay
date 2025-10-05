// @ts-nocheck
import * as React from 'react';
import { Link } from 'react-router';

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold text-gray-900 mt-6 md:mt-8">Profil</h1>
      <div className="bg-white border rounded-xl p-5">
        <p className="text-gray-700">Devam etmek için giriş yapın veya kayıt olun.</p>
        <div className="mt-4 flex gap-3">
          <Link to="/login" className="px-4 py-2 rounded-lg bg-gray-900 text-white font-medium hover:bg-gray-800">Giriş</Link>
          <Link to="/signup" className="px-4 py-2 rounded-lg bg-emerald-600 text-white font-medium hover:bg-emerald-700">Kayıt Ol</Link>
        </div>
      </div>
    </div>
  );
}


