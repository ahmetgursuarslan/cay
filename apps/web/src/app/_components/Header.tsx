import { Coffee, Bell } from 'lucide-react';
import { Link, useLocation } from 'react-router';

const navItems = [
  { to: '/', label: 'Ana Sayfa' },
  { to: '/search', label: 'Ara' },
  { to: '/reviews', label: 'Yorumlar' },
  { to: '/safety', label: 'Güvenlik' },
  { to: '/profile', label: 'Profil' },
];

export default function Header() {
  const location = useLocation();
  const showBorder = location?.pathname !== '/';
  return (
    <header className={`fixed top-0 left-0 right-0 z-40 bg-white dark:bg-neutral-900 ${showBorder ? 'border-b border-gray-200 dark:border-neutral-800' : ''}`}>
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Coffee size={22} className="text-emerald-600" />
          <span className="text-emerald-600 font-semibold text-lg">Çay</span>
        </Link>
        <div className="flex items-center gap-2">
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map(({ to, label }) => {
              const active = location.pathname === to || (to !== '/' && location.pathname.startsWith(to + '/'));
              return (
                <Link
                  key={to}
                  to={to}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    active ? 'bg-emerald-600 text-white' : 'text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-neutral-800'
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </nav>
          <Link
            to="/notification-settings"
            aria-label="Bildirim ayarları"
            className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center hover:bg-emerald-200 transition-colors dark:bg-emerald-900/40 dark:hover:bg-emerald-900/60"
          >
            <Bell size={18} className="text-emerald-700" />
          </Link>
        </div>
      </div>
    </header>
  );
}
