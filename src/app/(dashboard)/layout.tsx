
import { MainNav } from "@/components/main-nav";
import { WatchlistSidebar } from "@/components/watchlist-sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <MainNav />
      <div className="flex flex-1 overflow-hidden">
        <WatchlistSidebar />
        <main className="flex-1 overflow-y-auto bg-background p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
