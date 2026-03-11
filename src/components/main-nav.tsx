import Link from 'next/link';
import { UserNav } from './user-nav';

export function MainNav() {
  return (
    <div className="flex w-full items-center justify-between">
        <div className="flex gap-6 md:gap-10">
            <Link href="/" className="font-bold text-xl flex items-center gap-2 group">
                <svg className="w-8 h-8 text-primary group-hover:rotate-180 transition-transform duration-700 ease-in-out" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-1.25.29-2.42.8-3.46l11.66 11.66c-1.04.51-2.21.8-3.46.8zm4.46-1.8L4.8 6.54C5.84 6.03 7.01 5.74 8.26 5.74c1.19 0 2.31.26 3.3.71l-5.61 5.61 1.41 1.41 6.84-6.84c1.47 1.05 2.62 2.47 3.26 4.14l-6.17 6.17 1.41 1.41 5.92-5.92c.16.8.24 1.63.24 2.49 0 1.25-.29 2.42-.8 3.46z" fill="currentColor"/>
                </svg>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">VortexGPT</span>
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