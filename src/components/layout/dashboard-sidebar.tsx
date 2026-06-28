'use client';
import {
  SidebarHeader,
  SidebarTrigger,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
} from '@/components/ui/sidebar';
import { Logo } from '@/components/icons';
import { MessageSquareText, ClipboardList, Settings, LayoutDashboard, Users, CreditCard, Package, History } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';

export function DashboardSidebar() {
  const pathname = usePathname();
  const { user } = useAuth();
  const role = user?.role || '';

  const isKonsultasiAdmin = role === 'ADMIN' || role === 'ADMIN_KONSULTASI';
  const isIntekAdmin = role === 'ADMIN' || role === 'ADMIN_INTEK';
  const isAdmin = role === 'ADMIN';

  const layananLinks = [
    { href: '/dashboard/konsultasi', label: 'Dashboard', icon: <LayoutDashboard className="h-4 w-4" />, exact: true },
    { href: '/dashboard/konsultasi/customer', label: 'Customer', icon: <Users className="h-4 w-4" />, exact: false },
    { href: '/dashboard/konsultasi/riwayat-transaksi', label: 'Riwayat Transaksi', icon: <History className="h-4 w-4" />, exact: false },
    { href: '/dashboard/konsultasi/metode-pembayaran', label: 'Metode Pembayaran', icon: <CreditCard className="h-4 w-4" />, exact: false },
    { href: '/dashboard/konsultasi/produk', label: 'Produk', icon: <Package className="h-4 w-4" />, exact: false },
    { href: '/dashboard/konsultasi/setting', label: 'Setting', icon: <Settings className="h-4 w-4" />, exact: false },
  ];

  return (
    <>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <Link href="/dashboard">
            <Logo className="h-8 w-auto" />
          </Link>
          <div className="flex-1" />
          <SidebarTrigger />
        </div>
      </SidebarHeader>

      <SidebarContent className="p-2">
        <SidebarMenu>

          {isKonsultasiAdmin && (
            <SidebarGroup>
              <SidebarGroupLabel className="flex items-center gap-2 text-xs font-semibold text-muted-foreground px-2 mb-1">
                <MessageSquareText className="h-3.5 w-3.5" />
                Layanan
              </SidebarGroupLabel>
              {layananLinks.map(link => {
                const isActive = link.exact
                  ? pathname === link.href
                  : pathname.startsWith(link.href);
                return (
                  <SidebarMenuItem key={link.href}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <Link href={link.href}>
                        {link.icon}
                        {link.label}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarGroup>
          )}

          {isIntekAdmin && (
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname.startsWith('/dashboard/intek')}>
                <Link href="/dashboard/intek">
                  <ClipboardList />
                  INTEK
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )}

        </SidebarMenu>
      </SidebarContent>

      {isAdmin && (
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname.startsWith('/dashboard/pengaturan')}>
                <Link href="/dashboard/pengaturan">
                  <Settings />
                  Pengaturan
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      )}
    </>
  );
}
