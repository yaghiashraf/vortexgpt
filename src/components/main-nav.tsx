import Link from 'next/link';
import { UserNav } from './user-nav';

export function MainNav() {
  return (
    <div className="flex w-full items-center justify-between">
        <div className="flex gap-6 md:gap-10">
            <Link href="/" className="font-bold text-xl flex items-center gap-2">
                <span className="text-primary">⚡</span> VortexGPT
            </Link>
            <nav className="hidden md:flex gap-6">
                <Link
                    href="/dashboard"
                    className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                    Dashboard
                </Link>
                <Link
                    href="/markets"
                    className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                    Markets
                </Link>
            </nav>
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <UserNav />
        </div>
    </div>
  );
}