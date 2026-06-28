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
import { Button } from '@/components/ui/button';
import { Home, Settings, Briefcase, GalleryHorizontal, FileText, Contact, BarChart, ChevronDown, User, Shield, MessageSquareText, ClipboardList } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as React from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/auth-context';

export function DashboardSidebar() {
  const pathname = usePathname();
  const { user } = useAuth();
  const role = user?.role || '';

  const isAdmin = role === 'ADMIN' || role === 'EDITOR';
  const isKonsultasiAdmin = role === 'ADMIN' || role === 'ADMIN_KONSULTASI';
  const isIntekAdmin = role === 'ADMIN' || role === 'ADMIN_INTEK';

  // Role-specific landing page
  const homeHref = isKonsultasiAdmin && !isAdmin ? '/dashboard/konsultasi'
    : isIntekAdmin && !isAdmin ? '/dashboard/intek'
    : '/dashboard';

  return (
    <>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <Link href={homeHref}><Logo className="h-8 w-auto" /></Link>
          <div className="flex-1" />
          <SidebarTrigger />
        </div>
      </SidebarHeader>

      <SidebarContent className="p-2">
        <SidebarMenu>

          {/* Home — only for main admin */}
          {isAdmin && (
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === '/dashboard'}>
                <Link href="/dashboard"><Home /> Beranda</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )}

          {/* Konsultasi Dashboard */}
          {isKonsultasiAdmin && (
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname.startsWith('/dashboard/konsultasi')}>
                <Link href="/dashboard/konsultasi"><MessageSquareText /> Konsultasi</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )}

          {/* INTEK Dashboard */}
          {isIntekAdmin && (
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname.startsWith('/dashboard/intek')}>
                <Link href="/dashboard/intek"><ClipboardList /> INTEK</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )}

          {/* Main admin sections */}
          {isAdmin && (
            <>
              <SidebarGroup>
                <Collapsible defaultOpen={pathname.startsWith('/dashboard/profil')}>
                  <CollapsibleTrigger className="w-full">
                    <SidebarMenuButton className='justify-between w-full'>
                      <div className='flex items-center gap-2'>
                        <User /> Profil
                      </div>
                      <ChevronDown className="h-4 w-4 transition-transform [&[data-state=open]]:rotate-180" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="flex flex-col gap-1 ml-4 mt-1 pl-4 border-l">
                      <Link href="/dashboard/profil/tentang-kami" className={cn("text-sm p-1 rounded", pathname === '/dashboard/profil/tentang-kami' ? 'text-primary font-semibold' : 'text-muted-foreground hover:text-foreground')}>Tentang Kami</Link>
                      <Link href="/dashboard/profil/visi-misi" className={cn("text-sm p-1 rounded", pathname === '/dashboard/profil/visi-misi' ? 'text-primary font-semibold' : 'text-muted-foreground hover:text-foreground')}>Visi & Misi</Link>
                      <Link href="/dashboard/profil/struktur-organisasi" className={cn("text-sm p-1 rounded", pathname === '/dashboard/profil/struktur-organisasi' ? 'text-primary font-semibold' : 'text-muted-foreground hover:text-foreground')}>Struktur Organisasi</Link>
                      <Link href="/dashboard/profil/dokumen-perijinan" className={cn("text-sm p-1 rounded", pathname === '/dashboard/profil/dokumen-perijinan' ? 'text-primary font-semibold' : 'text-muted-foreground hover:text-foreground')}>Dokumen Perijinan</Link>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </SidebarGroup>

              <SidebarGroup>
                <Collapsible defaultOpen={pathname.startsWith('/dashboard/slo')}>
                  <CollapsibleTrigger className="w-full">
                    <SidebarMenuButton className='justify-between w-full'>
                      <div className='flex items-center gap-2'>
                        <Shield /> Layanan SLO
                      </div>
                      <ChevronDown className="h-4 w-4 transition-transform [&[data-state=open]]:rotate-180" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="flex flex-col gap-1 ml-4 mt-1 pl-4 border-l">
                      <Link href="/dashboard/slo/pendaftaran" className={cn("text-sm p-1 rounded", pathname === '/dashboard/slo/pendaftaran' ? 'text-primary font-semibold' : 'text-muted-foreground hover:text-foreground')}>Pendaftaran</Link>
                      <Link href="/dashboard/slo/keluhan" className={cn("text-sm p-1 rounded", pathname === '/dashboard/slo/keluhan' ? 'text-primary font-semibold' : 'text-muted-foreground hover:text-foreground')}>Keluhan</Link>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </SidebarGroup>

              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname.startsWith('/dashboard/galeri')}>
                  <Link href="/dashboard/galeri"><GalleryHorizontal /> Galeri</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname.startsWith('/dashboard/karir')}>
                  <Link href="/dashboard/karir"><Briefcase /> Karir</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname.startsWith('/dashboard/kontak')}>
                  <Link href="/dashboard/kontak"><Contact /> Pesan Kontak</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname.startsWith('/dashboard/survey')}>
                  <Link href="/dashboard/survey"><BarChart /> Survey</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </>
          )}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          {isAdmin && (
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/dashboard/pengaturan"><Settings /> Pengaturan</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )}
        </SidebarMenu>
      </SidebarFooter>
    </>
  );
}
