'use client';

import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Loader2, CheckCircle, TrendingUp, History, MapPin } from 'lucide-react';
import { AdminAuthGuard } from '@/components/auth/admin-auth-guard';

interface Submission {
  id: string;
  nama: string;
  noWhatsapp: string;
  alamatLokasi: string | null;
  latitude: number;
  longitude: number;
  status: string;
  nominal: number | null;
  createdAt: string;
}

function formatRupiah(value: number) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(value);
}

export default function RiwayatTransaksiPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/konsultasi')
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data)) setSubmissions(data.filter((s: Submission) => s.status === 'PEMBAYARAN_DITERIMA'));
      })
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, []);

  const totalPendapatan = submissions.reduce((sum, s) => sum + (s.nominal || 0), 0);

  return (
    <AdminAuthGuard allowedRoles={['ADMIN', 'ADMIN_KONSULTASI']}>
      <div className="space-y-6">

        {/* Page Header */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <History className="h-5 w-5 text-[#09bce4]" />
            <h1 className="text-2xl font-bold text-[#0a2a4a]">Riwayat Transaksi</h1>
          </div>
          <p className="text-gray-500 text-sm">Data customer yang pembayarannya sudah dikonfirmasi</p>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-32 gap-3">
            <Loader2 className="h-7 w-7 animate-spin text-[#09bce4]" />
            <p className="text-sm text-gray-400">Memuat data...</p>
          </div>
        ) : (
          <>
            {/* Stat Cards */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">Total Transaksi</span>
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-emerald-600" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-emerald-600">{submissions.length}</p>
                <p className="text-xs text-gray-400 mt-1">Pembayaran berhasil diterima</p>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">Total Pendapatan</span>
                  <div className="w-9 h-9 rounded-xl bg-[#09bce4]/10 flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-[#09bce4]" />
                  </div>
                </div>
                <p className="text-xl font-bold text-[#09bce4] leading-tight">{formatRupiah(totalPendapatan)}</p>
                <p className="text-xs text-gray-400 mt-1">Akumulasi seluruh transaksi</p>
              </div>
            </div>

            {/* Table Card */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-50">
                <h2 className="text-base font-bold text-[#0a2a4a]">Daftar Transaksi</h2>
                <p className="text-xs text-gray-400 mt-0.5">{submissions.length} transaksi dengan status Pembayaran Diterima</p>
              </div>

              {submissions.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 gap-3 text-gray-400">
                  <History className="h-10 w-10 opacity-30" />
                  <p className="text-sm">Belum ada transaksi yang diterima.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50/70">
                        <TableHead className="text-xs font-bold text-gray-500 uppercase tracking-wide w-[50px]">No</TableHead>
                        <TableHead className="text-xs font-bold text-gray-500 uppercase tracking-wide">Nama Customer</TableHead>
                        <TableHead className="text-xs font-bold text-gray-500 uppercase tracking-wide">WhatsApp</TableHead>
                        <TableHead className="text-xs font-bold text-gray-500 uppercase tracking-wide">Lokasi</TableHead>
                        <TableHead className="text-xs font-bold text-gray-500 uppercase tracking-wide">Nominal</TableHead>
                        <TableHead className="text-xs font-bold text-gray-500 uppercase tracking-wide">Status</TableHead>
                        <TableHead className="text-xs font-bold text-gray-500 uppercase tracking-wide">Tanggal</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {submissions.map((s, idx) => (
                        <TableRow key={s.id} className="hover:bg-[#09bce4]/5 transition-colors">
                          <TableCell className="text-gray-400 text-sm">{idx + 1}</TableCell>
                          <TableCell className="font-semibold text-[#0a2a4a]">{s.nama}</TableCell>
                          <TableCell>
                            <a href={`https://wa.me/${s.noWhatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline text-sm">
                              {s.noWhatsapp}
                            </a>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1 text-xs text-gray-400 max-w-[180px]">
                              <MapPin className="h-3 w-3 text-[#09bce4] shrink-0" />
                              <span className="truncate">{s.alamatLokasi || `${s.latitude?.toFixed(4)}, ${s.longitude?.toFixed(4)}`}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            {s.nominal ? (
                              <span className="font-bold text-[#09bce4]">{formatRupiah(s.nominal)}</span>
                            ) : (
                              <span className="text-gray-300 text-sm">—</span>
                            )}
                          </TableCell>
                          <TableCell>
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                              <CheckCircle className="h-3 w-3" /> Diterima
                            </span>
                          </TableCell>
                          <TableCell className="text-sm text-gray-400 whitespace-nowrap">
                            {new Date(s.createdAt).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </AdminAuthGuard>
  );
}
