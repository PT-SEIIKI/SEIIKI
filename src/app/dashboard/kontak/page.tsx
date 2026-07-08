'use client';

import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { AdminAuthGuard } from '@/components/auth/admin-auth-guard';
import { Mail, Search, Inbox, ExternalLink } from 'lucide-react';

interface ContactMessage {
  id: string;
  nama: string;
  email: string;
  subjek: string;
  pesan: string;
  createdAt: string;
  read: boolean;
}

export default function DashboardKontakPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<ContactMessage | null>(null);

  useEffect(() => {
    // Contact messages endpoint not yet implemented — show empty state
    setLoading(false);
  }, []);

  const filtered = messages.filter(
    (m) =>
      m.nama.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase()) ||
      m.subjek.toLowerCase().includes(search.toLowerCase()),
  );

  const unread = messages.filter((m) => !m.read).length;

  return (
    <AdminAuthGuard allowedRoles={['ADMIN']}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Pesan Masuk</h1>
            <p className="text-muted-foreground mt-1">
              Pesan dari formulir kontak website.
              {unread > 0 && <span className="ml-2 text-primary font-semibold">{unread} belum dibaca</span>}
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Message list */}
          <div className="md:col-span-1 space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Cari pesan..." className="pl-9 h-9" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>

            <Card className="overflow-hidden">
              <CardContent className="p-0">
                {loading ? (
                  <div className="flex justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
                  </div>
                ) : filtered.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                    <Inbox className="h-10 w-10 mb-3 opacity-30" />
                    <p className="text-sm font-medium">Kotak masuk kosong</p>
                    <p className="text-xs mt-1">Pesan akan tampil di sini saat ada yang menghubungi.</p>
                  </div>
                ) : (
                  <ul className="divide-y">
                    {filtered.map((msg) => (
                      <li
                        key={msg.id}
                        onClick={() => setSelected(msg)}
                        className={`px-4 py-3 cursor-pointer hover:bg-muted/40 transition-colors ${selected?.id === msg.id ? 'bg-muted/60' : ''}`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <p className={`text-sm truncate ${!msg.read ? 'font-semibold' : 'font-medium'}`}>{msg.nama}</p>
                          {!msg.read && <Badge className="text-[10px] px-1.5 py-0 shrink-0">Baru</Badge>}
                        </div>
                        <p className="text-xs text-muted-foreground truncate mt-0.5">{msg.subjek}</p>
                        <p className="text-xs text-muted-foreground mt-1">{new Date(msg.createdAt).toLocaleDateString('id-ID')}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Message detail */}
          <div className="md:col-span-2">
            <Card className="h-full">
              {selected ? (
                <>
                  <CardHeader className="border-b">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{selected.subjek || '(Tanpa Subjek)'}</CardTitle>
                        <CardDescription>
                          Dari: <span className="font-medium text-foreground">{selected.nama}</span> &lt;{selected.email}&gt;
                          <span className="ml-3 text-xs">{new Date(selected.createdAt).toLocaleString('id-ID')}</span>
                        </CardDescription>
                      </div>
                      <a href={`mailto:${selected.email}?subject=Re: ${encodeURIComponent(selected.subjek)}`} className="flex items-center gap-1 text-xs text-primary hover:underline">
                        Balas via Email <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{selected.pesan}</p>
                  </CardContent>
                </>
              ) : (
                <CardContent className="flex flex-col items-center justify-center h-full py-20 text-muted-foreground">
                  <Mail className="h-12 w-12 mb-4 opacity-20" />
                  <p className="text-sm">Pilih pesan untuk membacanya</p>
                </CardContent>
              )}
            </Card>
          </div>
        </div>
      </div>
    </AdminAuthGuard>
  );
}
