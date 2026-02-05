
import Link from 'next/link';
import { TickerSearch } from './ticker-search';
import { UserNav } from './user-nav';

export function MainNav() {
  return (
    <header className="border-b">
      <div className="flex h-16 items-center px-4 gap-4">
        <Link href="/" className="font-bold text-xl flex items-center gap-2">
            ⚡ VortexGPT
        </Link>
        <div className="ml-auto flex items-center space-x-4">
          <TickerSearch />
          <UserNav />
        </div>
      </div>
    </header>
  );
}
