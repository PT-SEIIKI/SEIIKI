'use client';

import { useState } from 'react';
import { DashboardSidebar } from '@/components/layout/dashboard-sidebar';
import { Menu, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#F0F4F8]">
      {/* Backdrop mobile */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-[#0a2a4a]/60 backdrop-blur-sm md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-40 w-60 flex flex-col
          shadow-2xl shadow-[#0a2a4a]/40
          transition-transform duration-200 ease-in-out
          ${open ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 md:static md:z-auto
        `}
      >
        <DashboardSidebar onClose={() => setOpen(false)} />
      </aside>

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile topbar — navy to match sidebar */}
        <header className="md:hidden flex items-center h-14 px-4 bg-gradient-to-r from-[#0a2a4a] to-[#0b3160] shadow-md">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setOpen(true)}
            aria-label="Buka menu navigasi"
            className="text-white/70 hover:text-white hover:bg-white/10"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2 ml-3">
            <div className="w-6 h-6 rounded-lg bg-[#09bce4] flex items-center justify-center">
              <Zap className="h-3 w-3 text-white" strokeWidth={2.5} />
            </div>
            <span className="font-bold text-sm text-white tracking-wide">SEIIKI</span>
          </div>
        </header>

        <main className="flex-1 p-5 sm:p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
