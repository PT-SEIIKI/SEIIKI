'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Users, Clock, CheckCircle, CreditCard } from 'lucide-react';
import { AdminAuthGuard } from '@/components/auth/admin-auth-guard';

interface Stats {
  total: number;
  menunggu: number;
  diterima: number;
  selesai: number;
}

export default function DashboardKonsultasiPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/konsultasi')
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data)) {
          setStats({
            total: data.length,
            menunggu: data.filter((s: any) => s.status === 'MENUNGGU_PEMBAYARAN').length,
            diterima: data.filter((s: any) => s.status === 'PEMBAYARAN_DITERIMA').length,
            selesai: data.filter((s: any) => s.status === 'SELESAI').length,
          });
        }
      })
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <AdminAuthGuard allowedRoles={['ADMIN', 'ADMIN_KONSULTASI']}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard Layanan</h1>
          <p className="text-muted-foreground">Ringkasan data konsultasi masuk</p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Konsultasi</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{stats?.total ?? 0}</p>
                <p className="text-xs text-muted-foreground mt-1">Semua pengajuan</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Menunggu Pembayaran</CardTitle>
                <Clock className="h-4 w-4 text-yellow-500" />
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-yellow-600">{stats?.menunggu ?? 0}</p>
                <p className="text-xs text-muted-foreground mt-1">Belum upload bukti</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Pembayaran Diterima</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-green-600">{stats?.diterima ?? 0}</p>
                <p className="text-xs text-muted-foreground mt-1">Sudah upload bukti</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Selesai</CardTitle>
                <CreditCard className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-blue-600">{stats?.selesai ?? 0}</p>
                <p className="text-xs text-muted-foreground mt-1">Konsultasi selesai</p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </AdminAuthGuard>
  );
}
