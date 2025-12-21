import { Search, LogOut } from 'lucide-react';
import { Logo } from './logo';

interface MovieListHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  userEmail: string | undefined;
  onLogout: () => void;
}

export function MovieListHeader({
  searchQuery,
  onSearchChange,
  userEmail,
  onLogout,
}: MovieListHeaderProps) {
  return (
    <header
      className="sticky top-0 z-40 border-b bg-graphite border-subtle"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between w-full">
          <Logo />

          <div className="flex items-center gap-4">
            {/* Search Bar */}
            <div className="relative w-64 md:w-80">
              <Search
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-soft-gray"
              />
              <input
                type="text"
                placeholder="Search movies…"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-12 pr-4 py-2 rounded-lg outline-none transition-all bg-deep-navy text-pure-white focus-orange-ring"
              />
            </div>

            {/* Logout Button */}
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all text-pure-white bg-white/10 hover:bg-orange/20 focus-orange-ring"
              title={`Logged in as: ${userEmail}`}
              aria-label="Logout"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
