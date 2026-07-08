'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import {
  FileText,
  Gem,
  GitBranch,
  Handshake,
  Home,
  Info,
  Map,
  PencilRuler,
  ShieldCheck,
  Siren,
  Users,
  Wrench,
  BarChart,
  Scale,
  MessageSquareText,
  ClipboardList,
} from 'lucide-react';

export const profileComponents: { title: string; href: string; description: string, icon: React.ReactNode }[] = [
  {
    title: 'Tentang Kami',
    href: '/profil/tentang-kami',
    description: 'Sejarah, legalitas, dan nilai-nilai perusahaan kami.',
    icon: <Info className="h-4 w-4" />
  },
  {
    title: 'Visi & Misi',
    href: '/profil/visi-misi',
    description: 'Tujuan dan komitmen kami dalam industri kelistrikan.',
    icon: <Gem className="h-4 w-4" />
  },
  {
    title: 'Struktur Organisasi',
    href: '/profil/struktur-organisasi',
    description: 'Kenali tim profesional di belakang layar kami.',
    icon: <Users className="h-4 w-4" />
  },
  {
    title: 'Dokumen Perijinan',
    href: '/profil/dokumen-perijinan',
    description: 'Lihat akreditasi dan lisensi resmi kami.',
    icon: <ShieldCheck className="h-4 w-4" />
  },
  {
    title: 'Daftar PJT-TT',
    href: '/profil/daftar-pjt-tt',
    description: 'Penanggung Jawab Teknik Tegangan Rendah.',
    icon: <Users className="h-4 w-4" />
  },
  {
    title: 'Alamat Kantor',
    href: '/profil/alamat-kantor',
    description: 'Temukan lokasi kantor kami.',
    icon: <Map className="h-4 w-4" />
  },
  {
    title: 'Peralatan',
    href: '/profil/peralatan',
    description: 'Peralatan inspeksi dan pengujian berstandar tinggi.',
    icon: <Wrench className="h-4 w-4" />
  },
];

export const sloComponents: { title: string; href: string; description: string, icon: React.ReactNode }[] = [
    {
        title: 'Informasi SLO',
        href: '/slo/informasi',
        description: 'Pahami apa itu SLO dan mengapa itu penting.',
        icon: <Info className="h-4 w-4" />
    },
    {
        title: 'Pendaftaran SLO',
        href: 'https://siujang.esdm.go.id/',
        description: 'Ajukan permohonan sertifikasi baru di sini.',
        icon: <Home className="h-4 w-4" />
    },
    {
        title: 'Verifikasi SLO',
        href: 'https://siujang.esdm.go.id/Cek-Validalitas-Sertifikat',
        description: 'Periksa keaslian dan status SLO Anda.',
        icon: <ShieldCheck className="h-4 w-4" />
    },
];

export const legalitasComponents: { title: string; href: string; description: string, icon: React.ReactNode }[] = [
    {
        title: 'PLTD',
        href: 'https://siujang.esdm.go.id/View-Profil-Badan-Usaha/MjgxNzIx',
        description: 'Legalitas Pembangkit Listrik Tenaga Diesel.',
        icon: <Scale className="h-4 w-4" />
    },
    {
        title: 'PLTS',
        href: 'https://siujang.esdm.go.id/View-Profil-Badan-Usaha/MjgxNzIx?page=1',
        description: 'Legalitas Pembangkit Listrik Tenaga Surya.',
        icon: <Scale className="h-4 w-4" />
    },
    {
        title: 'IPTL Tegangan Menengah',
        href: 'https://siujang.esdm.go.id/View-Profil-Badan-Usaha/MjgxNzIx?page=2',
        description: 'Legalitas Instalasi Penyediaan Tenaga Listrik Tegangan Menengah.',
        icon: <Scale className="h-4 w-4" />
    }
];

export function MainNav({ transparent = false }: { transparent?: boolean }) {
  const pathname = usePathname();

  /* Shared style helpers */
  const triggerCls = (active: boolean) =>
    cn(
      'transition-colors duration-200',
      transparent
        ? cn(
            'text-white/90 hover:text-white bg-transparent hover:bg-white/15 data-[state=open]:bg-white/15',
            active && 'text-white bg-white/20'
          )
        : cn(active && 'bg-accent text-accent-foreground')
    );

  const linkCls = (active: boolean) =>
    cn(
      navigationMenuTriggerStyle(),
      'transition-colors duration-200',
      transparent
        ? cn(
            'text-white/90 hover:text-white bg-transparent hover:bg-white/15',
            active && 'text-white bg-white/20'
          )
        : cn(active && 'bg-accent text-accent-foreground')
    );

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={linkCls(pathname === '/')}>
            <Link href="/">Home</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className={triggerCls(pathname.startsWith('/profil'))}>
            Profil
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {profileComponents.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                  icon={component.icon}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className={triggerCls(pathname.startsWith('/slo'))}>
            SLO
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {sloComponents.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                  icon={component.icon}
                  {...(component.href.startsWith('http') && {
                    target: '_blank',
                    rel: 'noopener noreferrer',
                  })}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild className={linkCls(pathname.startsWith('/layanan'))}>
            <Link href="/layanan">Layanan</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild className={linkCls(pathname.startsWith('/intek'))}>
            <Link href="/intek">INTEK</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild className={linkCls(pathname.startsWith('/produk'))}>
            <Link href="/produk">Produk</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild className={linkCls(pathname === '/karir')}>
            <Link href="/karir">Karir</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild className={linkCls(pathname === '/kontak')}>
            <Link href="/kontak">Kontak Kami</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className={triggerCls(pathname.startsWith('/legalitas'))}>
            Legalitas Kami
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[300px] gap-3 p-4 md:w-[400px]">
              {legalitasComponents.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                  icon={component.icon}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'> & { icon?: React.ReactNode }
>(({ className, title, children, icon, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className
          )}
          {...props}
        >
          <div className="flex items-center gap-2 text-sm font-medium leading-none">
            {icon}
            {title}
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';
