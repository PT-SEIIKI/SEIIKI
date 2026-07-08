'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { AdminAuthGuard } from '@/components/auth/admin-auth-guard';
import { MessageCircle, Search, CheckCircle2 } from 'lucide-react';

interface Complaint {
  id: string;
  nama: string;
  email: string;
  noHp: string;
  keluhan: string;
  status: 'BARU' | 'DIPROSES' | 'SELESAI';
  createdAt: string;
}

const STATUS_COLORS: Record<string, 'default' | 'secondary' | 'outline'> = {
  BARU:     'default',
  DIPROSES: 'secondary',
  SELESAI:  'outline',
};

export default function DashboardKeluhanSLOPage() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [search, setSearch] = useState('');

  const filtered = complaints.filter(
    (c) =>
      c.nama.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()),
  );

  const updateStatus = (id: string, status: Complaint['status']) => {
    setComplaints((prev) => prev.map((c) => (c.id === id ? { ...c, status } : c)));
  };

  return (
    <AdminAuthGuard allowedRoles={['ADMIN']}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Keluhan SLO</h1>
          <p className="text-muted-foreground mt-1">Tangani keluhan dan pengaduan terkait layanan SLO.</p>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-3 gap-4">
          {(['BARU', 'DIPROSES', 'SELESAI'] as const).map((s) => (
            <Card key={s}>
              <CardContent className="pt-6 flex items-center gap-4">
                <div className="p-3 rounded-xl bg-primary/10">
                  {s === 'SELESAI' ? <CheckCircle2 className="h-5 w-5 text-primary" /> : <MessageCircle className="h-5 w-5 text-primary" />}
                </div>
                <div>
                  <p className="text-2xl font-bold">{complaints.filter((c) => c.status === s).length}</p>
                  <p className="text-xs text-muted-foreground capitalize">{s.charAt(0) + s.slice(1).toLowerCase()}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Daftar Keluhan</CardTitle>
                <CardDescription>{filtered.length} keluhan ditemukan</CardDescription>
              </div>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Cari nama / email..." className="pl-9 h-9" value={search} onChange={(e) => setSearch(e.target.value)} />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
                <MessageCircle className="h-12 w-12 mb-4 opacity-30" />
                <p className="font-medium">Belum ada keluhan masuk</p>
                <p className="text-sm mt-1">Keluhan dari pengguna akan tampil di sini.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filtered.map((c) => (
                  <div key={c.id} className="p-4 rounded-xl border border-border hover:border-primary/30 transition-colors">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-sm">{c.nama}</span>
                          <Badge variant={STATUS_COLORS[c.status]} className="text-xs">{c.status}</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">{c.email} · {c.noHp} · {new Date(c.createdAt).toLocaleDateString('id-ID')}</p>
                        <p className="text-sm leading-relaxed">{c.keluhan}</p>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        {c.status !== 'SELESAI' && (
                          <Button size="sm" variant="outline" onClick={() => updateStatus(c.id, c.status === 'BARU' ? 'DIPROSES' : 'SELESAI')}>
                            {c.status === 'BARU' ? 'Proses' : 'Selesaikan'}
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminAuthGuard>
  );
}
