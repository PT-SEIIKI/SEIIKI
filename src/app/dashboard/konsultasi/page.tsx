'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Users, Clock, CheckCircle, TrendingUp } from 'lucide-react';
import { AdminAuthGuard } from '@/components/auth/admin-auth-guard';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface Submission {
  id: string;
  status: string;
  nominal: number | null;
  createdAt: string;
}

interface MonthlyData {
  bulan: string;
  pendapatan: number;
  transaksi: number;
}

function formatRupiah(value: number) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(value);
}

function buildMonthlyData(submissions: Submission[]): MonthlyData[] {
  const map = new Map<string, { pendapatan: number; transaksi: number }>();
  const now = new Date();

  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    map.set(key, { pendapatan: 0, transaksi: 0 });
  }

  submissions
    .filter(s => s.status === 'PEMBAYARAN_DITERIMA' && s.nominal)
    .forEach(s => {
      const d = new Date(s.createdAt);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      if (map.has(key)) {
        const entry = map.get(key)!;
        entry.pendapatan += s.nominal || 0;
        entry.transaksi += 1;
      }
    });

  const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
  return Array.from(map.entries()).map(([key, val]) => {
    const [, month] = key.split('-');
    return { bulan: MONTHS[parseInt(month, 10) - 1], ...val };
  });
}

function CustomTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border rounded-lg shadow-lg p-3 text-sm">
        <p className="font-semibold mb-1">{label}</p>
        <p className="text-green-700">{formatRupiah(payload[0]?.value || 0)}</p>
        <p className="text-muted-foreground text-xs">{payload[1]?.value || 0} transaksi</p>
      </div>
    );
  }
  return null;
}

export default function DashboardKonsultasiPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/konsultasi')
      .then(r => r.json())
      .then(data => { if (Array.isArray(data)) setSubmissions(data); })
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, []);

  const total = submissions.length;
  const menunggu = submissions.filter(s => s.status === 'MENUNGGU_PEMBAYARAN').length;
  const diterima = submissions.filter(s => s.status === 'PEMBAYARAN_DITERIMA').length;
  const totalPendapatan = submissions
    .filter(s => s.status === 'PEMBAYARAN_DITERIMA')
    .reduce((sum, s) => sum + (s.nominal || 0), 0);

  const monthlyData = buildMonthlyData(submissions);

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
          <>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total Konsultasi</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{total}</p>
                  <p className="text-xs text-muted-foreground mt-1">Semua pengajuan</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Menunggu Pembayaran</CardTitle>
                  <Clock className="h-4 w-4 text-yellow-500" />
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-yellow-600">{menunggu}</p>
                  <p className="text-xs text-muted-foreground mt-1">Belum upload bukti</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Pembayaran Diterima</CardTitle>
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-green-600">{diterima}</p>
                  <p className="text-xs text-muted-foreground mt-1">Transaksi selesai</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total Pendapatan</CardTitle>
                  <TrendingUp className="h-4 w-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                  <p className="text-xl font-bold text-blue-600 leading-tight">{formatRupiah(totalPendapatan)}</p>
                  <p className="text-xs text-muted-foreground mt-1">Dari pembayaran diterima</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Grafik Pendapatan 6 Bulan Terakhir</CardTitle>
              </CardHeader>
              <CardContent>
                {monthlyData.every(d => d.pendapatan === 0) ? (
                  <div className="flex items-center justify-center h-48 text-muted-foreground text-sm">
                    Belum ada data pendapatan
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height={220}>
                    <BarChart data={monthlyData} margin={{ top: 4, right: 8, left: 8, bottom: 4 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="bulan" tick={{ fontSize: 12 }} />
                      <YAxis
                        tick={{ fontSize: 11 }}
                        tickFormatter={v => v >= 1000000 ? `${(v / 1000000).toFixed(0)}jt` : v >= 1000 ? `${(v / 1000).toFixed(0)}rb` : String(v)}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar dataKey="pendapatan" fill="#22c55e" radius={[4, 4, 0, 0]} name="Pendapatan" />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </AdminAuthGuard>
  );
}
