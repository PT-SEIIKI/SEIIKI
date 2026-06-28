'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Eye, MapPin, CheckCircle, Clock, XCircle } from 'lucide-react';
import { AdminAuthGuard } from '@/components/auth/admin-auth-guard';

interface Submission {
  id: string;
  nama: string;
  noWhatsapp: string;
  latitude: number;
  longitude: number;
  alamatLokasi: string | null;
  status: string;
  paymentProofUrl: string | null;
  createdAt: string;
}

const STATUS_CONFIG: Record<string, { label: string; variant: 'default' | 'secondary' | 'outline'; icon: React.ReactNode }> = {
  MENUNGGU_PEMBAYARAN: { label: 'Menunggu Pembayaran', variant: 'secondary', icon: <Clock className="h-3 w-3" /> },
  PEMBAYARAN_DITERIMA: { label: 'Pembayaran Diterima', variant: 'default', icon: <CheckCircle className="h-3 w-3" /> },
  SELESAI: { label: 'Selesai', variant: 'outline', icon: <CheckCircle className="h-3 w-3" /> },
};

function DetailDialog({ submission, open, onClose, onStatusChange }: {
  submission: Submission | null;
  open: boolean;
  onClose: () => void;
  onStatusChange: (id: string, status: string) => Promise<void>;
}) {
  const [updatingStatus, setUpdatingStatus] = useState(false);

  if (!submission) return null;

  const mapUrl = submission.latitude
    ? `https://www.openstreetmap.org/export/embed.html?bbox=${submission.longitude - 0.01},${submission.latitude - 0.01},${submission.longitude + 0.01},${submission.latitude + 0.01}&layer=mapnik&marker=${submission.latitude},${submission.longitude}`
    : null;

  const mapsLink = `https://maps.google.com/?q=${submission.latitude},${submission.longitude}`;

  const handleStatusChange = async (newStatus: string) => {
    setUpdatingStatus(true);
    await onStatusChange(submission.id, newStatus);
    setUpdatingStatus(false);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Detail Customer</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-muted-foreground">Nama</span>
              <p className="mt-1 font-semibold">{submission.nama}</p>
            </div>
            <div>
              <span className="font-medium text-muted-foreground">WhatsApp</span>
              <p className="mt-1">
                <a
                  href={`https://wa.me/${submission.noWhatsapp.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 underline"
                >
                  {submission.noWhatsapp}
                </a>
              </p>
            </div>
            <div className="col-span-2">
              <span className="font-medium text-muted-foreground">Lokasi</span>
              <p className="mt-1">{submission.alamatLokasi || `${submission.latitude}, ${submission.longitude}`}</p>
              <a href={mapsLink} target="_blank" rel="noopener noreferrer" className="text-xs text-primary underline mt-0.5 inline-block">
                Buka di Google Maps
              </a>
            </div>
            <div>
              <span className="font-medium text-muted-foreground">Tanggal</span>
              <p className="mt-1">{new Date(submission.createdAt).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
            </div>
            <div>
              <span className="font-medium text-muted-foreground block mb-1">Status</span>
              <div className="flex items-center gap-2">
                {updatingStatus ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Select defaultValue={submission.status} onValueChange={handleStatusChange}>
                    <SelectTrigger className="h-8 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MENUNGGU_PEMBAYARAN">Menunggu Pembayaran</SelectItem>
                      <SelectItem value="PEMBAYARAN_DITERIMA">Pembayaran Diterima</SelectItem>
                      <SelectItem value="SELESAI">Selesai</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              </div>
            </div>
          </div>

          {submission.paymentProofUrl && (
            <div>
              <span className="font-medium text-muted-foreground text-sm">Bukti Pembayaran</span>
              <a
                href={submission.paymentProofUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 block text-primary text-sm hover:underline"
              >
                Lihat Bukti Pembayaran →
              </a>
            </div>
          )}

          {mapUrl && (
            <div>
              <span className="font-medium text-muted-foreground text-sm">Peta Lokasi</span>
              <iframe
                src={mapUrl}
                width="100%"
                height="200"
                style={{ border: 0, borderRadius: 8 }}
                className="mt-1"
                title="Lokasi"
                sandbox="allow-scripts allow-same-origin"
              />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function CustomerPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selected, setSelected] = useState<Submission | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState('ALL');

  const fetchData = async () => {
    setIsLoading(true);
    const data = await fetch('/api/konsultasi').then(r => r.json()).catch(() => []);
    setSubmissions(Array.isArray(data) ? data : []);
    setIsLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const handleStatusChange = async (id: string, status: string) => {
    await fetch(`/api/konsultasi/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    await fetchData();
    setSelected(prev => prev ? { ...prev, status } : prev);
  };

  const filtered = filterStatus === 'ALL'
    ? submissions
    : submissions.filter(s => s.status === filterStatus);

  return (
    <AdminAuthGuard allowedRoles={['ADMIN', 'ADMIN_KONSULTASI']}>
      <div className="space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Customer</h1>
            <p className="text-muted-foreground">Data pengajuan konsultasi dari halaman Layanan</p>
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-52">
              <SelectValue placeholder="Filter status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">Semua Status</SelectItem>
              <SelectItem value="MENUNGGU_PEMBAYARAN">Menunggu Pembayaran</SelectItem>
              <SelectItem value="PEMBAYARAN_DITERIMA">Pembayaran Diterima</SelectItem>
              <SelectItem value="SELESAI">Selesai</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Daftar Customer</CardTitle>
            <CardDescription>
              {filtered.length} dari {submissions.length} data ditampilkan
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-6 w-6 animate-spin" />
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                Belum ada data customer.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nama</TableHead>
                      <TableHead>WhatsApp</TableHead>
                      <TableHead>Lokasi</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Tanggal</TableHead>
                      <TableHead className="text-right">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filtered.map(s => (
                      <TableRow key={s.id}>
                        <TableCell className="font-medium">{s.nama}</TableCell>
                        <TableCell>{s.noWhatsapp}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground max-w-[160px]">
                            <MapPin className="h-3 w-3 shrink-0" />
                            <span className="truncate">{s.alamatLokasi || `${s.latitude?.toFixed(4)}, ${s.longitude?.toFixed(4)}`}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={STATUS_CONFIG[s.status]?.variant}>
                            <span className="flex items-center gap-1">
                              {STATUS_CONFIG[s.status]?.icon}
                              {STATUS_CONFIG[s.status]?.label || s.status}
                            </span>
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                          {new Date(s.createdAt).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => { setSelected(s); setDetailOpen(true); }}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
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

      <DetailDialog
        submission={selected}
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
        onStatusChange={handleStatusChange}
      />
    </AdminAuthGuard>
  );
}
