'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Eye, MapPin, CheckCircle, Clock, ShieldCheck, FileImage, ImageOff } from 'lucide-react';
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
  nominal: number | null;
  createdAt: string;
}

const STATUS_CONFIG: Record<string, { label: string; variant: 'default' | 'secondary' | 'outline'; icon: React.ReactNode }> = {
  MENUNGGU_PEMBAYARAN: { label: 'Menunggu Pembayaran', variant: 'secondary', icon: <Clock className="h-3 w-3" /> },
  PEMBAYARAN_DITERIMA: { label: 'Pembayaran Diterima', variant: 'default', icon: <CheckCircle className="h-3 w-3" /> },
};

function toApiUrl(url: string | null): string | null {
  if (!url) return null;
  if (url.startsWith('/uploads/')) return url.replace('/uploads/', '/api/uploads/');
  return url;
}

function DetailDialog({ submission, open, onClose, onStatusChange }: {
  submission: Submission | null;
  open: boolean;
  onClose: () => void;
  onStatusChange: (id: string, status: string) => Promise<void>;
}) {
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [verifySuccess, setVerifySuccess] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setVerifySuccess(false);
    setImgError(false);
  }, [submission?.id, open]);

  if (!submission) return null;

  const mapUrl = submission.latitude
    ? `https://www.openstreetmap.org/export/embed.html?bbox=${submission.longitude - 0.01},${submission.latitude - 0.01},${submission.longitude + 0.01},${submission.latitude + 0.01}&layer=mapnik&marker=${submission.latitude},${submission.longitude}`
    : null;

  const mapsLink = `https://maps.google.com/?q=${submission.latitude},${submission.longitude}`;
  const proofApiUrl = toApiUrl(submission.paymentProofUrl);

  const handleStatusChange = async (newStatus: string) => {
    setUpdatingStatus(true);
    await onStatusChange(submission.id, newStatus);
    setUpdatingStatus(false);
  };

  const handleVerify = async () => {
    setUpdatingStatus(true);
    await onStatusChange(submission.id, 'PEMBAYARAN_DITERIMA');
    setVerifySuccess(true);
    setUpdatingStatus(false);
  };

  const canVerify =
    submission.status === 'MENUNGGU_PEMBAYARAN' &&
    !!submission.paymentProofUrl;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Detail Customer</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">

          {canVerify && !verifySuccess && (
            <div className="rounded-xl border-2 border-amber-200 bg-amber-50 p-4 space-y-3">
              <div className="flex items-start gap-2">
                <FileImage className="h-5 w-5 text-amber-600 mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-amber-800">Bukti pembayaran telah diupload</p>
                  <p className="text-sm text-amber-700 mt-0.5">
                    Periksa bukti di bawah, lalu klik tombol verifikasi untuk mengonfirmasi pembayaran.
                  </p>
                </div>
              </div>
              <Button
                className="w-full bg-green-600 hover:bg-green-700 text-white"
                onClick={handleVerify}
                disabled={updatingStatus}
              >
                {updatingStatus ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Memverifikasi...</>
                ) : (
                  <><ShieldCheck className="mr-2 h-4 w-4" /> Verifikasi Pembayaran</>
                )}
              </Button>
            </div>
          )}

          {verifySuccess && (
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800 font-medium">
                Pembayaran berhasil diverifikasi!
              </AlertDescription>
            </Alert>
          )}

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
              {updatingStatus ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Select value={submission.status} onValueChange={handleStatusChange}>
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MENUNGGU_PEMBAYARAN">Menunggu Pembayaran</SelectItem>
                    <SelectItem value="PEMBAYARAN_DITERIMA">Pembayaran Diterima</SelectItem>
                  </SelectContent>
                </Select>
              )}
            </div>
          </div>

          {proofApiUrl && (
            <div>
              <span className="font-medium text-muted-foreground text-sm block mb-2">Bukti Pembayaran</span>
              {imgError ? (
                <div className="flex flex-col items-center justify-center gap-2 border rounded-lg p-6 bg-muted/30 text-muted-foreground">
                  <ImageOff className="h-8 w-8" />
                  <p className="text-sm">Gagal memuat gambar</p>
                  <a
                    href={proofApiUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary text-xs underline"
                  >
                    Buka langsung →
                  </a>
                </div>
              ) : (
                <div className="relative">
                  <img
                    src={proofApiUrl}
                    alt="Bukti Pembayaran"
                    className="w-full rounded-lg border object-contain max-h-64"
                    onError={() => setImgError(true)}
                  />
                  <a
                    href={proofApiUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-block text-primary text-xs underline"
                  >
                    Buka di tab baru →
                  </a>
                </div>
              )}
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
                      <TableHead>Bukti</TableHead>
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
                        <TableCell>
                          {s.paymentProofUrl ? (
                            <Badge variant="outline" className="text-xs border-amber-300 text-amber-700 bg-amber-50">
                              <FileImage className="h-3 w-3 mr-1" /> Ada
                            </Badge>
                          ) : (
                            <span className="text-xs text-muted-foreground">—</span>
                          )}
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
        onClose={() => { setDetailOpen(false); fetchData(); }}
        onStatusChange={handleStatusChange}
      />
    </AdminAuthGuard>
  );
}
