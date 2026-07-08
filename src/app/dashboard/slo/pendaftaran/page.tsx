'use client';

import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { AdminAuthGuard } from '@/components/auth/admin-auth-guard';
import { Search, ClipboardList, Clock, CheckCircle2, XCircle, FileCheck } from 'lucide-react';

interface SloApp {
  id: string;
  applicantName: string;
  applicantPhone: string;
  applicantEmail: string;
  installationAddress: string;
  installationType: string;
  powerRating: number;
  status: string;
  registrationNumber: string | null;
  createdAt: string;
}

const STATUS_CONFIG: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline'; icon: React.ElementType }> = {
  PENDING:    { label: 'Menunggu',    variant: 'secondary',    icon: Clock },
  IN_REVIEW:  { label: 'Ditinjau',   variant: 'default',      icon: ClipboardList },
  APPROVED:   { label: 'Disetujui',  variant: 'default',      icon: CheckCircle2 },
  REJECTED:   { label: 'Ditolak',    variant: 'destructive',  icon: XCircle },
  CERTIFIED:  { label: 'Tersertifikasi', variant: 'outline',  icon: FileCheck },
};

function statusBadge(status: string) {
  const cfg = STATUS_CONFIG[status] || { label: status, variant: 'secondary' as const, icon: Clock };
  const Icon = cfg.icon;
  return (
    <Badge variant={cfg.variant} className="gap-1">
      <Icon className="h-3 w-3" />
      {cfg.label}
    </Badge>
  );
}

export default function DashboardPendaftaranSLOPage() {
  const [apps, setApps] = useState<SloApp[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    // SLO applications endpoint not yet implemented — show empty state
    setLoading(false);
  }, []);

  const filtered = apps.filter(
    (a) =>
      a.applicantName.toLowerCase().includes(search.toLowerCase()) ||
      a.applicantEmail.toLowerCase().includes(search.toLowerCase()) ||
      (a.registrationNumber || '').toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <AdminAuthGuard allowedRoles={['ADMIN']}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Data Pendaftaran SLO</h1>
          <p className="text-muted-foreground mt-1">Lihat dan kelola data pengajuan SLO yang masuk.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(STATUS_CONFIG).map(([key, cfg]) => {
            const Icon = cfg.icon;
            const count = apps.filter((a) => a.status === key).length;
            return (
              <Card key={key}>
                <CardContent className="pt-6 flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{count}</p>
                    <p className="text-xs text-muted-foreground">{cfg.label}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between gap-4">
              <div>
                <CardTitle>Daftar Pendaftar SLO</CardTitle>
                <CardDescription>{filtered.length} pendaftaran ditemukan</CardDescription>
              </div>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Cari nama / email / no. daftar..." className="pl-9 h-9" value={search} onChange={(e) => setSearch(e.target.value)} />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
              </div>
            ) : filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
                <ClipboardList className="h-12 w-12 mb-4 opacity-30" />
                <p className="font-medium">Belum ada data pendaftaran SLO</p>
                <p className="text-sm mt-1">Pendaftaran yang masuk akan tampil di sini.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 font-medium text-muted-foreground">Nama</th>
                      <th className="text-left py-3 px-2 font-medium text-muted-foreground">Email</th>
                      <th className="text-left py-3 px-2 font-medium text-muted-foreground">Tipe</th>
                      <th className="text-left py-3 px-2 font-medium text-muted-foreground">Daya</th>
                      <th className="text-left py-3 px-2 font-medium text-muted-foreground">Status</th>
                      <th className="text-left py-3 px-2 font-medium text-muted-foreground">Tanggal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((app) => (
                      <tr key={app.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                        <td className="py-3 px-2 font-medium">{app.applicantName}</td>
                        <td className="py-3 px-2 text-muted-foreground">{app.applicantEmail}</td>
                        <td className="py-3 px-2">{app.installationType.replace(/_/g, ' ')}</td>
                        <td className="py-3 px-2">{app.powerRating.toLocaleString()} VA</td>
                        <td className="py-3 px-2">{statusBadge(app.status)}</td>
                        <td className="py-3 px-2 text-muted-foreground">{new Date(app.createdAt).toLocaleDateString('id-ID')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminAuthGuard>
  );
}
