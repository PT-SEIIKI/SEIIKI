'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Loader2, CheckCircle, TrendingUp } from 'lucide-react';
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
        if (Array.isArray(data)) {
          const filtered = data.filter((s: Submission) => s.status === 'PEMBAYARAN_DITERIMA');
          setSubmissions(filtered);
        }
      })
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, []);

  const totalPendapatan = submissions.reduce((sum, s) => sum + (s.nominal || 0), 0);

  return (
    <AdminAuthGuard allowedRoles={['ADMIN', 'ADMIN_KONSULTASI']}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Riwayat Transaksi</h1>
          <p className="text-muted-foreground">Data customer yang pembayarannya sudah diterima</p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <>
            <div className="grid gap-4 sm:grid-cols-2">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total Transaksi</CardTitle>
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-green-600">{submissions.length}</p>
                  <p className="text-xs text-muted-foreground mt-1">Pembayaran berhasil diterima</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total Pendapatan</CardTitle>
                  <TrendingUp className="h-4 w-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                  <p className="text-xl font-bold text-blue-600 leading-tight">{formatRupiah(totalPendapatan)}</p>
                  <p className="text-xs text-muted-foreground mt-1">Akumulasi seluruh transaksi</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Daftar Transaksi</CardTitle>
                <CardDescription>
                  {submissions.length} transaksi dengan status Pembayaran Diterima
                </CardDescription>
              </CardHeader>
              <CardContent>
                {submissions.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    Belum ada transaksi yang diterima.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>No</TableHead>
                          <TableHead>Nama Customer</TableHead>
                          <TableHead>WhatsApp</TableHead>
                          <TableHead>Lokasi</TableHead>
                          <TableHead>Nominal</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Tanggal</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {submissions.map((s, idx) => (
                          <TableRow key={s.id}>
                            <TableCell className="text-muted-foreground text-sm">{idx + 1}</TableCell>
                            <TableCell className="font-medium">{s.nama}</TableCell>
                            <TableCell>
                              <a
                                href={`https://wa.me/${s.noWhatsapp.replace(/\D/g, '')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-green-600 hover:underline"
                              >
                                {s.noWhatsapp}
                              </a>
                            </TableCell>
                            <TableCell className="text-sm text-muted-foreground max-w-[180px] truncate">
                              {s.alamatLokasi || `${s.latitude?.toFixed(4)}, ${s.longitude?.toFixed(4)}`}
                            </TableCell>
                            <TableCell>
                              {s.nominal ? (
                                <span className="font-semibold text-blue-700">{formatRupiah(s.nominal)}</span>
                              ) : (
                                <span className="text-muted-foreground text-sm">—</span>
                              )}
                            </TableCell>
                            <TableCell>
                              <Badge variant="default" className="bg-green-600">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Diterima
                              </Badge>
                            </TableCell>
                            <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                              {new Date(s.createdAt).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </AdminAuthGuard>
  );
}
