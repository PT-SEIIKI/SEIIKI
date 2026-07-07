'use client';

import { useState, useEffect } from 'react';
import { Loader2, Users, Clock, CheckCircle, TrendingUp, ArrowUpRight } from 'lucide-react';
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
      <div className="bg-white border border-gray-100 rounded-xl shadow-xl p-4 text-sm min-w-[160px]">
        <p className="font-bold text-gray-800 mb-2">{label}</p>
        <p className="text-[#09bce4] font-semibold">{formatRupiah(payload[0]?.value || 0)}</p>
        <p className="text-gray-400 text-xs mt-1">{payload[1]?.value || 0} transaksi</p>
      </div>
    );
  }
  return null;
}

const statCards = (total: number, menunggu: number, diterima: number, totalPendapatan: number) => [
  {
    label: 'Total Konsultasi',
    value: total,
    sub: 'Semua pengajuan masuk',
    icon: <Users className="h-5 w-5" />,
    gradient: 'from-[#09bce4] to-[#0a8eb8]',
    iconBg: 'bg-white/20',
    textColor: 'text-white',
  },
  {
    label: 'Menunggu Pembayaran',
    value: menunggu,
    sub: 'Belum upload bukti',
    icon: <Clock className="h-5 w-5" />,
    gradient: 'from-amber-400 to-orange-500',
    iconBg: 'bg-white/20',
    textColor: 'text-white',
  },
  {
    label: 'Pembayaran Diterima',
    value: diterima,
    sub: 'Transaksi selesai',
    icon: <CheckCircle className="h-5 w-5" />,
    gradient: 'from-emerald-400 to-green-600',
    iconBg: 'bg-white/20',
    textColor: 'text-white',
  },
  {
    label: 'Total Pendapatan',
    value: formatRupiah(totalPendapatan),
    sub: 'Dari pembayaran diterima',
    icon: <TrendingUp className="h-5 w-5" />,
    gradient: 'from-violet-500 to-purple-700',
    iconBg: 'bg-white/20',
    textColor: 'text-white',
    isRupiah: true,
  },
];

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
  const cards = statCards(total, menunggu, diterima, totalPendapatan);

  return (
    <AdminAuthGuard allowedRoles={['ADMIN', 'ADMIN_KONSULTASI']}>
      <div className="space-y-8">
        {/* Page Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Dashboard Layanan</h1>
            <p className="text-gray-500 text-sm mt-1">Ringkasan data konsultasi masuk</p>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Live
          </div>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-32 gap-3">
            <Loader2 className="h-8 w-8 animate-spin text-[#09bce4]" />
            <p className="text-sm text-gray-400">Memuat data...</p>
          </div>
        ) : (
          <>
            {/* Stat Cards */}
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {cards.map((card) => (
                <div
                  key={card.label}
                  className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${card.gradient} p-5 shadow-lg`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`${card.iconBg} rounded-xl p-2.5 text-white`}>
                      {card.icon}
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-white/60" />
                  </div>
                  <p className="text-white/80 text-xs font-medium mb-1">{card.label}</p>
                  <p className={`font-bold text-white ${card.isRupiah ? 'text-lg leading-tight' : 'text-3xl'}`}>
                    {card.value}
                  </p>
                  <p className="text-white/60 text-xs mt-1">{card.sub}</p>

                  {/* Decorative circle */}
                  <div className="absolute -right-4 -bottom-4 w-20 h-20 rounded-full bg-white/10" />
                  <div className="absolute -right-1 -bottom-8 w-12 h-12 rounded-full bg-white/10" />
                </div>
              ))}
            </div>

            {/* Chart */}
            <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-50 flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-gray-900">Grafik Pendapatan</h2>
                  <p className="text-xs text-gray-400 mt-0.5">6 bulan terakhir</p>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-400">
                  <span className="w-2.5 h-2.5 rounded-sm bg-[#09bce4] inline-block" />
                  Pendapatan
                </div>
              </div>

              <div className="px-4 py-6">
                {monthlyData.every(d => d.pendapatan === 0) ? (
                  <div className="flex flex-col items-center justify-center h-52 text-gray-300 gap-3">
                    <TrendingUp className="h-10 w-10" />
                    <p className="text-sm">Belum ada data pendapatan</p>
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height={240}>
                    <BarChart data={monthlyData} margin={{ top: 4, right: 8, left: 8, bottom: 4 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" vertical={false} />
                      <XAxis
                        dataKey="bulan"
                        tick={{ fontSize: 12, fill: '#9ca3af' }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis
                        tick={{ fontSize: 11, fill: '#9ca3af' }}
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={v =>
                          v >= 1_000_000 ? `${(v / 1_000_000).toFixed(0)}jt`
                          : v >= 1_000 ? `${(v / 1_000).toFixed(0)}rb`
                          : String(v)
                        }
                      />
                      <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f0f9ff', radius: 4 }} />
                      <Bar dataKey="pendapatan" fill="#09bce4" radius={[6, 6, 0, 0]} maxBarSize={48} />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>

            {/* Summary footer */}
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { label: 'Tingkat Konversi', value: total > 0 ? `${Math.round((diterima / total) * 100)}%` : '—', sub: 'Pengajuan → Pembayaran' },
                { label: 'Masih Menunggu', value: `${menunggu} pengajuan`, sub: 'Perlu tindak lanjut' },
                { label: 'Rata-rata Pendapatan', value: diterima > 0 ? formatRupiah(totalPendapatan / diterima) : '—', sub: 'Per transaksi selesai' },
              ].map(({ label, value, sub }) => (
                <div key={label} className="rounded-2xl border border-gray-100 bg-white px-5 py-4 shadow-sm">
                  <p className="text-xs text-gray-400 font-medium mb-1">{label}</p>
                  <p className="text-lg font-bold text-gray-900">{value}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{sub}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </AdminAuthGuard>
  );
}
