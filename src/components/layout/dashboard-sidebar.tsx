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
} from '@/components/ui/sidebar';
import { Logo } from '@/components/icons';
import { MessageSquareText, ClipboardList, Settings, LayoutDashboard, Users, CreditCard, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';

export function DashboardSidebar() {
  const pathname = usePathname();
  const { user } = useAuth();
  const role = user?.role || '';

  const isKonsultasiAdmin = role === 'ADMIN' || role === 'ADMIN_KONSULTASI';
  const isIntekAdmin = role === 'ADMIN' || role === 'ADMIN_INTEK';
  const isAdmin = role === 'ADMIN';

  const layananLinks = [
    { href: '/dashboard/konsultasi', label: 'Dashboard', icon: <LayoutDashboard className="h-4 w-4" />, exact: true },
    { href: '/dashboard/konsultasi/customer', label: 'Customer', icon: <Users className="h-4 w-4" /> },
    { href: '/dashboard/konsultasi/metode-pembayaran', label: 'Metode Pembayaran', icon: <CreditCard className="h-4 w-4" /> },
    { href: '/dashboard/konsultasi/setting', label: 'Setting', icon: <Settings className="h-4 w-4" /> },
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

          {/* Layanan (Konsultasi) — with sub-menu */}
          {isKonsultasiAdmin && (
            <SidebarGroup>
              <Collapsible defaultOpen={pathname.startsWith('/dashboard/konsultasi')}>
                <CollapsibleTrigger className="w-full">
                  <SidebarMenuButton className="justify-between w-full">
                    <div className="flex items-center gap-2">
                      <MessageSquareText className="h-4 w-4" />
                      Layanan
                    </div>
                    <ChevronDown className="h-4 w-4 transition-transform duration-200 [&[data-state=open]]:rotate-180" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="flex flex-col gap-0.5 ml-4 mt-1 pl-3 border-l">
                    {layananLinks.map(link => {
                      const isActive = link.exact
                        ? pathname === link.href
                        : pathname === link.href;
                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          className={cn(
                            'flex items-center gap-2 text-sm px-2 py-1.5 rounded-md transition-colors',
                            isActive
                              ? 'text-primary font-semibold bg-primary/10'
                              : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                          )}
                        >
                          {link.icon}
                          {link.label}
                        </Link>
                      );
                    })}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </SidebarGroup>
          )}

          {/* INTEK */}
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
