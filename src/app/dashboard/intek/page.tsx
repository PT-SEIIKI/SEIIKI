'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Loader2, Search, ClipboardList } from 'lucide-react';
import { AdminAuthGuard } from '@/components/auth/admin-auth-guard';

interface IntekSubmission {
  id: string;
  namaInstalasi: string;
  dayaTerpasang: string;
  alamat: string;
  noHp: string;
  tanggalMulai: string;
  tenagaTeknikLapangan: string;
  tenagaTeknikSistem: string;
  jenisProject: string;
  createdAt: string;
}

export default function DashboardIntekPage() {
  const [submissions, setSubmissions] = useState<IntekSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('/api/intek')
      .then(r => r.json())
      .then(data => { setSubmissions(Array.isArray(data) ? data : []); setIsLoading(false); })
      .catch(() => setIsLoading(false));
  }, []);

  const filtered = submissions.filter(s =>
    s.namaInstalasi.toLowerCase().includes(search.toLowerCase()) ||
    s.alamat.toLowerCase().includes(search.toLowerCase()) ||
    s.jenisProject.toLowerCase().includes(search.toLowerCase()) ||
    s.tenagaTeknikLapangan.toLowerCase().includes(search.toLowerCase()) ||
    s.tenagaTeknikSistem.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminAuthGuard allowedRoles={['ADMIN', 'ADMIN_INTEK']}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard INTEK</h1>
          <p className="text-muted-foreground">Data Inspeksi Teknik yang masuk</p>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                <ClipboardList className="h-3 w-3" /> Total Data INTEK
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{submissions.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Bulan Ini</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">
                {submissions.filter(s => {
                  const d = new Date(s.createdAt);
                  const now = new Date();
                  return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
                }).length}
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle>Data INTEK</CardTitle>
                <CardDescription>Semua data inspeksi teknik yang telah dikirim</CardDescription>
              </div>
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  className="pl-9"
                  placeholder="Cari instalasi, alamat..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center py-10">
                <Loader2 className="h-6 w-6 animate-spin" />
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-10 text-muted-foreground">
                {search ? 'Tidak ada data yang cocok dengan pencarian.' : 'Belum ada data INTEK masuk.'}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[180px]">Nama Instalasi / Pelanggan</TableHead>
                      <TableHead>Daya Terpasang</TableHead>
                      <TableHead className="min-w-[160px]">Alamat</TableHead>
                      <TableHead>No HP</TableHead>
                      <TableHead>Tanggal Mulai</TableHead>
                      <TableHead>Tenaga Teknik Lapangan</TableHead>
                      <TableHead>Tenaga Teknik Sistem</TableHead>
                      <TableHead>Jenis Project</TableHead>
                      <TableHead>Dikirim</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filtered.map(s => (
                      <TableRow key={s.id}>
                        <TableCell className="font-medium">{s.namaInstalasi}</TableCell>
                        <TableCell>{s.dayaTerpasang}</TableCell>
                        <TableCell className="text-sm text-muted-foreground max-w-[160px]">
                          <span className="line-clamp-2">{s.alamat}</span>
                        </TableCell>
                        <TableCell>{s.noHp}</TableCell>
                        <TableCell className="text-sm">
                          {new Date(s.tanggalMulai).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}
                        </TableCell>
                        <TableCell>{s.tenagaTeknikLapangan}</TableCell>
                        <TableCell>{s.tenagaTeknikSistem}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">{s.jenisProject}</Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
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
      </div>
    </AdminAuthGuard>
  );
}
