// @ts-nocheck
import * as React from 'react';

function Switch({ checked, onChange, id }) {
  return (
    <button
      id={id}
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={
        `relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 ` +
        (checked ? 'bg-emerald-600' : 'bg-gray-300 dark:bg-neutral-700')
      }
    >
      <span
        className={
          `inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ` +
          (checked ? 'translate-x-5' : 'translate-x-1')
        }
      />
    </button>
  );
}

export default function NotificationSettingsPage() {
  const [appPush, setAppPush] = React.useState(true);
  const [email, setEmail] = React.useState(false);
  const [sms, setSms] = React.useState(false);

  return (
    <div className="space-y-6 max-w-xl mx-auto">
      <h1 className="text-xl font-semibold text-gray-900 mt-6 md:mt-8">Bildirim Ayarları</h1>

      <div className="bg-white border rounded-xl p-5 space-y-5">
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0">
            <label htmlFor="app-push" className="block text-gray-900 font-medium">Uygulama bildirimleri</label>
            <p className="text-sm text-gray-600 truncate">Uygulama içi push/toast bildirimleri</p>
          </div>
          <Switch id="app-push" checked={appPush} onChange={setAppPush} />
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0">
            <label htmlFor="email" className="block text-gray-900 font-medium">E‑posta bildirimleri</label>
            <p className="text-sm text-gray-600 truncate">Önemli gelişmeler için e‑posta alın</p>
          </div>
          <Switch id="email" checked={email} onChange={setEmail} />
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0">
            <label htmlFor="sms" className="block text-gray-900 font-medium">SMS bildirimleri</label>
            <p className="text-sm text-gray-600 truncate">Doğrulama ve kritik uyarılar</p>
          </div>
          <Switch id="sms" checked={sms} onChange={setSms} />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          className="px-4 py-2 rounded-lg bg-emerald-600 text-white font-medium hover:bg-emerald-700"
          onClick={() => console.log('prefs', { appPush, email, sms })}
        >
          Kaydet
        </button>
      </div>
    </div>
  );
}

