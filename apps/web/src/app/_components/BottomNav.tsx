import { Home, MessageSquare, Shield, User, Search } from 'lucide-react';
import { Link, useLocation } from 'react-router';

const items = [
  { to: '/', label: 'Ana Sayfa', Icon: Home },
  { to: '/search', label: 'Ara', Icon: Search },
  { to: '/reviews', label: 'Yorumlar', Icon: MessageSquare },
  { to: '/safety', label: 'Güvenlik', Icon: Shield },
  { to: '/profile', label: 'Profil', Icon: User },
];

export default function BottomNav() {
  const location = useLocation();
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-neutral-900/90 backdrop-blur-sm border-t border-gray-200 dark:border-neutral-800 pb-[calc(env(safe-area-inset-bottom))]">
      <ul className="grid grid-cols-5 py-2">
        {items.map(({ to, label, Icon }) => {
          const active = location.pathname === to || (to !== '/' && location.pathname.startsWith(to + '/'));
          return (
            <li key={to} className="flex items-center justify-center">
              <Link
                to={to}
                className={`flex flex-col items-center gap-1 px-2 py-1 text-[11px] ${
                  active ? 'text-emerald-600' : 'text-gray-500 dark:text-gray-400'
                }`}
              >
                <Icon size={22} className={active ? 'text-emerald-600' : 'text-gray-500 dark:text-gray-400'} />
                <span className="font-medium">{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
