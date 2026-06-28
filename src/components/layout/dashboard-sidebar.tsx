'use client';
import {
  SidebarHeader,
  SidebarTrigger,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { Logo } from '@/components/icons';
import { MessageSquareText, ClipboardList, Settings } from 'lucide-react';
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
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname.startsWith('/dashboard/konsultasi')}>
                <Link href="/dashboard/konsultasi">
                  <MessageSquareText />
                  Layanan
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
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
