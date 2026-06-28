'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import {
  LayoutDashboard, Users, History, CreditCard, Package,
  Settings, ClipboardList, MessageSquareText, LogOut, ChevronDown, ChevronRight,
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

function getInitial(name: string) {
  return name ? name.charAt(0).toUpperCase() : '?';
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
    groups.push({ label: 'Layanan', icon: <MessageSquareText className="h-3.5 w-3.5" />, items: layananItems, prefix: '/dashboard/konsultasi' });
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
    <div className="flex flex-col h-full select-none">

      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-white/8">
        <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
          <span className="text-xs font-bold text-white">S</span>
        </div>
        <div>
          <p className="text-sm font-semibold text-white leading-none">SEIIKI</p>
          <p className="text-[10px] text-white/40 mt-0.5 leading-none">Admin Panel</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-0.5">

        {/* Groups */}
        {groups.map(group => {
          const isGroupOpen = expanded[group.label] ?? true;
          return (
            <div key={group.label} className="mb-1">
              <button
                onClick={() => setExpanded(p => ({ ...p, [group.label]: !isGroupOpen }))}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-white/40 hover:text-white/70 transition-colors text-xs font-semibold uppercase tracking-wider"
              >
                {group.icon}
                <span className="flex-1 text-left">{group.label}</span>
                {isGroupOpen
                  ? <ChevronDown className="h-3 w-3" />
                  : <ChevronRight className="h-3 w-3" />}
              </button>

              {isGroupOpen && (
                <div className="mt-0.5 space-y-0.5">
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
                          'flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all',
                          isActive
                            ? 'bg-white/10 text-white font-medium'
                            : 'text-white/50 hover:text-white hover:bg-white/5'
                        )}
                      >
                        <span className={cn(isActive ? 'text-white' : 'text-white/40')}>
                          {item.icon}
                        </span>
                        {item.label}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}

        {/* INTEK standalone */}
        {isIntekAdmin && (
          <Link
            href="/dashboard/intek"
            onClick={handleNav}
            className={cn(
              'flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all',
              pathname.startsWith('/dashboard/intek')
                ? 'bg-white/10 text-white font-medium'
                : 'text-white/50 hover:text-white hover:bg-white/5'
            )}
          >
            <ClipboardList className={cn('h-4 w-4', pathname.startsWith('/dashboard/intek') ? 'text-white' : 'text-white/40')} />
            INTEK
          </Link>
        )}

        {/* Pengaturan */}
        {isAdmin && (
          <Link
            href="/dashboard/pengaturan"
            onClick={handleNav}
            className={cn(
              'flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all',
              pathname.startsWith('/dashboard/pengaturan')
                ? 'bg-white/10 text-white font-medium'
                : 'text-white/50 hover:text-white hover:bg-white/5'
            )}
          >
            <Settings className={cn('h-4 w-4', pathname.startsWith('/dashboard/pengaturan') ? 'text-white' : 'text-white/40')} />
            Pengaturan
          </Link>
        )}

      </nav>

      {/* User footer */}
      {user && (
        <div className="border-t border-white/8 p-3">
          <div className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-white/5 transition-colors">
            <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center shrink-0">
              <span className="text-sm font-semibold text-white">{getInitial(user.name)}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate leading-none">{user.name}</p>
              <p className="text-[10px] text-white/40 mt-1 leading-none">{getRoleLabel(user.role)}</p>
            </div>
            <button
              onClick={handleLogout}
              className="text-white/30 hover:text-white/80 transition-colors"
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
