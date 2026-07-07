'use client';

import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Eye, MapPin, CheckCircle, Clock, ShieldCheck, FileImage, ImageOff, Users, RefreshCw } from 'lucide-react';
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

const STATUS_CONFIG: Record<string, { label: string; className: string; icon: React.ReactNode }> = {
  MENUNGGU_PEMBAYARAN: {
    label: 'Menunggu Pembayaran',
    className: 'bg-amber-50 text-amber-700 border border-amber-200',
    icon: <Clock className="h-3 w-3" />,
  },
  PEMBAYARAN_DITERIMA: {
    label: 'Pembayaran Diterima',
    className: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    icon: <CheckCircle className="h-3 w-3" />,
  },
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
  const cfg = STATUS_CONFIG[submission.status];

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

  const canVerify = submission.status === 'MENUNGGU_PEMBAYARAN' && !!submission.paymentProofUrl;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-[#0a2a4a]">Detail Customer</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">

          {canVerify && !verifySuccess && (
            <div className="rounded-xl border-2 border-amber-200 bg-amber-50 p-4 space-y-3">
              <div className="flex items-start gap-2">
                <FileImage className="h-5 w-5 text-amber-600 mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-amber-800">Bukti pembayaran telah diupload</p>
                  <p className="text-sm text-amber-700 mt-0.5">Periksa bukti di bawah, lalu klik tombol verifikasi.</p>
                </div>
              </div>
              <Button
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                onClick={handleVerify}
                disabled={updatingStatus}
              >
                {updatingStatus
                  ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Memverifikasi...</>
                  : <><ShieldCheck className="mr-2 h-4 w-4" />Verifikasi Pembayaran</>}
              </Button>
            </div>
          )}

          {verifySuccess && (
            <Alert className="border-emerald-200 bg-emerald-50">
              <CheckCircle className="h-4 w-4 text-emerald-600" />
              <AlertDescription className="text-emerald-800 font-medium">
                Pembayaran berhasil diverifikasi!
              </AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Nama</span>
              <p className="mt-1 font-bold text-gray-900">{submission.nama}</p>
            </div>
            <div>
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">WhatsApp</span>
              <p className="mt-1">
                <a href={`https://wa.me/${submission.noWhatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-emerald-600 underline font-medium">
                  {submission.noWhatsapp}
                </a>
              </p>
            </div>
            <div className="col-span-2">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Lokasi Instalasi</span>
              <p className="mt-1 text-gray-700">{submission.alamatLokasi || `${submission.latitude}, ${submission.longitude}`}</p>
              <a href={mapsLink} target="_blank" rel="noopener noreferrer" className="text-xs text-[#09bce4] underline mt-0.5 inline-block">
                Buka di Google Maps →
              </a>
            </div>
            <div>
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Tanggal</span>
              <p className="mt-1 text-gray-700">{new Date(submission.createdAt).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
            </div>
            <div>
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide block mb-1.5">Status</span>
              {updatingStatus ? <Loader2 className="h-4 w-4 animate-spin text-[#09bce4]" /> : (
                <Select value={submission.status} onValueChange={handleStatusChange}>
                  <SelectTrigger className="h-8 text-xs border-[#09bce4]/30">
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
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide block mb-2">Bukti Pembayaran</span>
              {imgError ? (
                <div className="flex flex-col items-center justify-center gap-2 border rounded-xl p-6 bg-gray-50 text-gray-400">
                  <ImageOff className="h-8 w-8" />
                  <p className="text-sm">Gagal memuat gambar</p>
                  <a href={proofApiUrl} target="_blank" rel="noopener noreferrer" className="text-[#09bce4] text-xs underline">Buka langsung →</a>
                </div>
              ) : (
                <div>
                  <img src={proofApiUrl} alt="Bukti Pembayaran" className="w-full rounded-xl border object-contain max-h-64" onError={() => setImgError(true)} />
                  <a href={proofApiUrl} target="_blank" rel="noopener noreferrer" className="mt-1 inline-block text-[#09bce4] text-xs underline">Buka di tab baru →</a>
                </div>
              )}
            </div>
          )}

          {mapUrl && (
            <div>
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide block mb-2">Peta Lokasi</span>
              <iframe src={mapUrl} width="100%" height="200" style={{ border: 0, borderRadius: 12 }} title="Lokasi" sandbox="allow-scripts allow-same-origin" />
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

  const filtered = filterStatus === 'ALL' ? submissions : submissions.filter(s => s.status === filterStatus);

  return (
    <AdminAuthGuard allowedRoles={['ADMIN', 'ADMIN_KONSULTASI']}>
      <div className="space-y-6">

        {/* Page Header */}
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Users className="h-5 w-5 text-[#09bce4]" />
              <h1 className="text-2xl font-bold text-[#0a2a4a]">Customer</h1>
            </div>
            <p className="text-gray-500 text-sm">Data pengajuan konsultasi dari halaman Layanan</p>
          </div>
          <div className="flex items-center gap-3">
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-52 border-gray-200 text-sm">
                <SelectValue placeholder="Filter status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">Semua Status</SelectItem>
                <SelectItem value="MENUNGGU_PEMBAYARAN">Menunggu Pembayaran</SelectItem>
                <SelectItem value="PEMBAYARAN_DITERIMA">Pembayaran Diterima</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" onClick={fetchData} aria-label="Refresh data" className="border-gray-200 text-gray-600 hover:text-[#0a2a4a] hover:border-[#09bce4]/40">
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Count row */}
        <div className="flex gap-3 flex-wrap">
          {[
            { label: 'Total', count: submissions.length, color: 'bg-[#09bce4]/10 text-[#09bce4]' },
            { label: 'Menunggu Pembayaran', count: submissions.filter(s => s.status === 'MENUNGGU_PEMBAYARAN').length, color: 'bg-amber-50 text-amber-700' },
            { label: 'Pembayaran Diterima', count: submissions.filter(s => s.status === 'PEMBAYARAN_DITERIMA').length, color: 'bg-emerald-50 text-emerald-700' },
          ].map(({ label, count, color }) => (
            <div key={label} className={`${color} px-4 py-2 rounded-xl text-sm font-semibold`}>
              {count} {label}
            </div>
          ))}
        </div>

        {/* Table Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-[#0a2a4a]">Daftar Customer</h2>
              <p className="text-xs text-gray-400 mt-0.5">{filtered.length} dari {submissions.length} data ditampilkan</p>
            </div>
          </div>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
              <Loader2 className="h-7 w-7 animate-spin text-[#09bce4]" />
              <p className="text-sm text-gray-400">Memuat data...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3 text-gray-400">
              <Users className="h-10 w-10 opacity-30" />
              <p className="text-sm">Belum ada data customer.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50/70">
                    <TableHead className="text-xs font-bold text-gray-500 uppercase tracking-wide">Nama</TableHead>
                    <TableHead className="text-xs font-bold text-gray-500 uppercase tracking-wide">WhatsApp</TableHead>
                    <TableHead className="text-xs font-bold text-gray-500 uppercase tracking-wide">Lokasi</TableHead>
                    <TableHead className="text-xs font-bold text-gray-500 uppercase tracking-wide">Status</TableHead>
                    <TableHead className="text-xs font-bold text-gray-500 uppercase tracking-wide">Bukti</TableHead>
                    <TableHead className="text-xs font-bold text-gray-500 uppercase tracking-wide">Tanggal</TableHead>
                    <TableHead className="text-right text-xs font-bold text-gray-500 uppercase tracking-wide">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map(s => {
                    const cfg = STATUS_CONFIG[s.status];
                    return (
                      <TableRow key={s.id} className="hover:bg-[#09bce4]/5 transition-colors">
                        <TableCell className="font-semibold text-[#0a2a4a]">{s.nama}</TableCell>
                        <TableCell>
                          <a href={`https://wa.me/${s.noWhatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline text-sm">
                            {s.noWhatsapp}
                          </a>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 text-xs text-gray-400 max-w-[160px]">
                            <MapPin className="h-3 w-3 text-[#09bce4] shrink-0" />
                            <span className="truncate">{s.alamatLokasi || `${s.latitude?.toFixed(4)}, ${s.longitude?.toFixed(4)}`}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${cfg?.className || 'bg-gray-100 text-gray-600'}`}>
                            {cfg?.icon}
                            {cfg?.label || s.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          {s.paymentProofUrl ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#09bce4]/10 text-[#09bce4] border border-[#09bce4]/20">
                              <FileImage className="h-3 w-3" /> Ada
                            </span>
                          ) : (
                            <span className="text-xs text-gray-300">—</span>
                          )}
                        </TableCell>
                        <TableCell className="text-sm text-gray-400 whitespace-nowrap">
                          {new Date(s.createdAt).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => { setSelected(s); setDetailOpen(true); }}
                            aria-label={`Lihat detail ${s.nama}`}
                            className="text-gray-400 hover:text-[#09bce4] hover:bg-[#09bce4]/10"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
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
