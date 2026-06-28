'use client';

import { useState } from 'react';
import { DashboardSidebar } from '@/components/layout/dashboard-sidebar';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#F8F9FB]">
      {/* Backdrop mobile */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-40 w-60 flex flex-col bg-zinc-950 text-white
          transition-transform duration-200 ease-in-out
          ${open ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 md:static md:z-auto
        `}
      >
        <DashboardSidebar onClose={() => setOpen(false)} />
      </aside>

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile topbar */}
        <header className="md:hidden flex items-center h-14 px-4 bg-white border-b border-zinc-200">
          <Button variant="ghost" size="icon" onClick={() => setOpen(true)}>
            <Menu className="h-5 w-5" />
          </Button>
          <span className="ml-3 font-semibold text-sm text-zinc-900">SEIIKI Admin</span>
        </header>

        <main className="flex-1 p-5 sm:p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
