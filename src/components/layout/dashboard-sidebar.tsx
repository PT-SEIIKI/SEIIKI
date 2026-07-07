'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import {
  LayoutDashboard, Users, History, CreditCard, Package,
  Settings, ClipboardList, MessageSquareText, LogOut,
  ChevronDown, ChevronRight, ExternalLink, Zap,
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
  exact?: boolean;
}

interface NavGroup {
  label: string;
  icon: React.ReactNode;
  items: NavItem[];
  prefix: string;
}

function getRoleLabel(role: string) {
  const map: Record<string, string> = {
    ADMIN: 'Administrator',
    ADMIN_KONSULTASI: 'Admin Layanan',
    ADMIN_INTEK: 'Admin INTEK',
    EDITOR: 'Editor',
    USER: 'User',
  };
  return map[role] || role;
}

function getInitials(name: string) {
  return name
    ? name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase()
    : '?';
}

export function DashboardSidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const role = user?.role || '';

  const isKonsultasiAdmin = role === 'ADMIN' || role === 'ADMIN_KONSULTASI';
  const isIntekAdmin = role === 'ADMIN' || role === 'ADMIN_INTEK';
  const isAdmin = role === 'ADMIN';

  const layananItems: NavItem[] = [
    { href: '/dashboard/konsultasi', label: 'Dashboard', icon: <LayoutDashboard className="h-4 w-4" />, exact: true },
    { href: '/dashboard/konsultasi/customer', label: 'Customer', icon: <Users className="h-4 w-4" /> },
    { href: '/dashboard/konsultasi/riwayat-transaksi', label: 'Riwayat Transaksi', icon: <History className="h-4 w-4" /> },
    { href: '/dashboard/konsultasi/metode-pembayaran', label: 'Metode Pembayaran', icon: <CreditCard className="h-4 w-4" /> },
    { href: '/dashboard/konsultasi/produk', label: 'Produk', icon: <Package className="h-4 w-4" /> },
    { href: '/dashboard/konsultasi/setting', label: 'Setting', icon: <Settings className="h-4 w-4" /> },
  ];

  const groups: NavGroup[] = [];
  if (isKonsultasiAdmin) {
    groups.push({
      label: 'Layanan',
      icon: <MessageSquareText className="h-3.5 w-3.5" />,
      items: layananItems,
      prefix: '/dashboard/konsultasi',
    });
  }

  const [expanded, setExpanded] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {};
    groups.forEach(g => { init[g.label] = pathname.startsWith(g.prefix); });
    return init;
  });

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  const handleNav = () => { if (onClose) onClose(); };

  return (
    /* Navy-to-deep-navy gradient — matches the website hero palette */
    <div className="flex flex-col h-full select-none bg-gradient-to-b from-[#0a2a4a] via-[#0b3160] to-[#0a2a4a]">

      {/* ── Logo ─────────────────────────────────────── */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-white/10">
        <div className="w-9 h-9 rounded-xl bg-[#09bce4] flex items-center justify-center shrink-0 shadow-lg shadow-[#09bce4]/30">
          <Zap className="h-4 w-4 text-white" strokeWidth={2.5} />
        </div>
        <div>
          <p className="text-sm font-bold text-white leading-none tracking-wide">SEIIKI</p>
          <p className="text-[10px] text-blue-300/50 mt-0.5 leading-none">Admin Panel</p>
        </div>
        <Link
          href="/"
          target="_blank"
          onClick={handleNav}
          className="ml-auto text-blue-300/30 hover:text-blue-300/70 transition-colors"
          aria-label="Buka halaman website"
          title="Lihat website"
        >
          <ExternalLink className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* ── Nav ──────────────────────────────────────── */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-0.5">

        {/* Groups */}
        {groups.map(group => {
          const isGroupOpen = expanded[group.label] ?? true;
          return (
            <div key={group.label} className="mb-2">
              {/* Group header */}
              <button
                onClick={() => setExpanded(p => ({ ...p, [group.label]: !isGroupOpen }))}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-blue-300/50 hover:text-blue-200 transition-colors text-[11px] font-bold uppercase tracking-widest"
              >
                {group.icon}
                <span className="flex-1 text-left">{group.label}</span>
                {isGroupOpen
                  ? <ChevronDown className="h-3 w-3" />
                  : <ChevronRight className="h-3 w-3" />}
              </button>

              {isGroupOpen && (
                <div className="mt-1 space-y-0.5">
                  {group.items.map(item => {
                    const isActive = item.exact
                      ? pathname === item.href
                      : pathname.startsWith(item.href);
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={handleNav}
                        className={cn(
                          'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-150',
                          isActive
                            ? 'bg-[#09bce4] text-white font-semibold shadow-md shadow-[#09bce4]/25'
                            : 'text-blue-200/60 hover:text-white hover:bg-white/8'
                        )}
                      >
                        <span className={cn(
                          'transition-colors',
                          isActive ? 'text-white' : 'text-blue-300/50 group-hover:text-white'
                        )}>
                          {item.icon}
                        </span>
                        {item.label}
                        {isActive && (
                          <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white/60" />
                        )}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}

        {/* Divider before standalone items */}
        {(isIntekAdmin || isAdmin) && (
          <div className="my-3 border-t border-white/8" />
        )}

        {/* INTEK standalone */}
        {isIntekAdmin && (
          <Link
            href="/dashboard/intek"
            onClick={handleNav}
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-150',
              pathname.startsWith('/dashboard/intek')
                ? 'bg-[#09bce4] text-white font-semibold shadow-md shadow-[#09bce4]/25'
                : 'text-blue-200/60 hover:text-white hover:bg-white/8'
            )}
          >
            <ClipboardList className={cn(
              'h-4 w-4',
              pathname.startsWith('/dashboard/intek') ? 'text-white' : 'text-blue-300/50'
            )} />
            INTEK
            {pathname.startsWith('/dashboard/intek') && (
              <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white/60" />
            )}
          </Link>
        )}

        {/* Pengaturan */}
        {isAdmin && (
          <Link
            href="/dashboard/pengaturan"
            onClick={handleNav}
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-150',
              pathname.startsWith('/dashboard/pengaturan')
                ? 'bg-[#09bce4] text-white font-semibold shadow-md shadow-[#09bce4]/25'
                : 'text-blue-200/60 hover:text-white hover:bg-white/8'
            )}
          >
            <Settings className={cn(
              'h-4 w-4',
              pathname.startsWith('/dashboard/pengaturan') ? 'text-white' : 'text-blue-300/50'
            )} />
            Pengaturan
            {pathname.startsWith('/dashboard/pengaturan') && (
              <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white/60" />
            )}
          </Link>
        )}
      </nav>

      {/* ── User footer ──────────────────────────────── */}
      {user && (
        <div className="border-t border-white/10 p-3">
          <div className="flex items-center gap-3 px-2 py-2.5 rounded-xl hover:bg-white/6 transition-colors group">
            {/* Avatar */}
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#09bce4] to-[#0a8eb8] flex items-center justify-center shrink-0 shadow">
              <span className="text-xs font-bold text-white">{getInitials(user.name)}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate leading-none">{user.name}</p>
              <p className="text-[10px] text-blue-300/50 mt-1 leading-none">{getRoleLabel(user.role)}</p>
            </div>
            <button
              onClick={handleLogout}
              className="text-blue-300/30 hover:text-red-400 transition-colors p-1 rounded-lg hover:bg-red-400/10"
              title="Keluar"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
