'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, Plus, Pencil, Trash2, CreditCard, Users, Eye, CheckCircle, Clock, MapPin } from 'lucide-react';
import { AdminAuthGuard } from '@/components/auth/admin-auth-guard';

interface MetodePembayaran {
  id: string;
  namaBank: string;
  nomorRekening: string;
  namaPemilik: string;
  deskripsi: string | null;
  isActive: boolean;
  order: number;
}

interface KonsultasiSubmission {
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

const STATUS_LABELS: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
  MENUNGGU_PEMBAYARAN: { label: 'Menunggu Pembayaran', variant: 'secondary' },
  PEMBAYARAN_DITERIMA: { label: 'Pembayaran Diterima', variant: 'default' },
  SELESAI: { label: 'Selesai', variant: 'outline' },
};

function MetodePembayaranDialog({
  open,
  onClose,
  editData,
  onSaved,
}: {
  open: boolean;
  onClose: () => void;
  editData: MetodePembayaran | null;
  onSaved: () => void;
}) {
  const [form, setForm] = useState({ namaBank: '', nomorRekening: '', namaPemilik: '', deskripsi: '', isActive: true });
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (editData) {
      setForm({ namaBank: editData.namaBank, nomorRekening: editData.nomorRekening, namaPemilik: editData.namaPemilik, deskripsi: editData.deskripsi || '', isActive: editData.isActive });
    } else {
      setForm({ namaBank: '', nomorRekening: '', namaPemilik: '', deskripsi: '', isActive: true });
    }
    setError('');
  }, [editData, open]);

  const handleSave = async () => {
    setIsSaving(true);
    setError('');
    try {
      const url = editData ? `/api/metode-pembayaran/${editData.id}` : '/api/metode-pembayaran';
      const method = editData ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.error || 'Gagal menyimpan');
      }
      onSaved();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{editData ? 'Edit' : 'Tambah'} Metode Pembayaran</DialogTitle>
          <DialogDescription>Isi detail rekening bank</DialogDescription>
        </DialogHeader>
        {error && <Alert variant="destructive"><AlertDescription>{error}</AlertDescription></Alert>}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Nama Bank</Label>
            <Input value={form.namaBank} onChange={e => setForm(f => ({ ...f, namaBank: e.target.value }))} placeholder="Contoh: Bank BCA" />
          </div>
          <div className="space-y-2">
            <Label>Nomor Rekening</Label>
            <Input value={form.nomorRekening} onChange={e => setForm(f => ({ ...f, nomorRekening: e.target.value }))} placeholder="Contoh: 1234567890" />
          </div>
          <div className="space-y-2">
            <Label>Nama Pemilik Rekening</Label>
            <Input value={form.namaPemilik} onChange={e => setForm(f => ({ ...f, namaPemilik: e.target.value }))} placeholder="Nama pemilik rekening" />
          </div>
          <div className="space-y-2">
            <Label>Deskripsi (opsional)</Label>
            <Input value={form.deskripsi} onChange={e => setForm(f => ({ ...f, deskripsi: e.target.value }))} placeholder="Keterangan tambahan" />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Batal</Button>
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {editData ? 'Simpan Perubahan' : 'Tambah'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function DetailSubmissionDialog({ submission, open, onClose }: { submission: KonsultasiSubmission | null; open: boolean; onClose: () => void }) {
  if (!submission) return null;
  const mapUrl = submission.latitude
    ? `https://www.openstreetmap.org/export/embed.html?bbox=${submission.longitude - 0.01},${submission.latitude - 0.01},${submission.longitude + 0.01},${submission.latitude + 0.01}&layer=mapnik&marker=${submission.latitude},${submission.longitude}`
    : null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Detail Konsultasi</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div><span className="font-medium text-muted-foreground">Nama</span><p className="mt-1">{submission.nama}</p></div>
            <div><span className="font-medium text-muted-foreground">WhatsApp</span><p className="mt-1">{submission.noWhatsapp}</p></div>
            <div className="col-span-2"><span className="font-medium text-muted-foreground">Lokasi</span><p className="mt-1">{submission.alamatLokasi || `${submission.latitude}, ${submission.longitude}`}</p></div>
            <div><span className="font-medium text-muted-foreground">Status</span><div className="mt-1"><Badge variant={STATUS_LABELS[submission.status]?.variant}>{STATUS_LABELS[submission.status]?.label || submission.status}</Badge></div></div>
            <div><span className="font-medium text-muted-foreground">Tanggal</span><p className="mt-1">{new Date(submission.createdAt).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })}</p></div>
          </div>
          {submission.paymentProofUrl && (
            <div>
              <span className="font-medium text-muted-foreground text-sm">Bukti Pembayaran</span>
              <a href={submission.paymentProofUrl} target="_blank" rel="noopener noreferrer" className="mt-1 block text-primary text-sm hover:underline">Lihat File</a>
            </div>
          )}
          {mapUrl && (
            <div>
              <span className="font-medium text-muted-foreground text-sm">Peta Lokasi</span>
              <iframe src={mapUrl} width="100%" height="200" style={{ border: 0, borderRadius: 8 }} className="mt-1" title="Lokasi" sandbox="allow-scripts allow-same-origin" />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function DashboardKonsultasiPage() {
  const [methods, setMethods] = useState<MetodePembayaran[]>([]);
  const [submissions, setSubmissions] = useState<KonsultasiSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editData, setEditData] = useState<MetodePembayaran | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState<KonsultasiSubmission | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [tab, setTab] = useState('submissions');

  const fetchAll = async () => {
    setIsLoading(true);
    const [m, s] = await Promise.all([
      fetch('/api/metode-pembayaran').then(r => r.json()).catch(() => []),
      fetch('/api/konsultasi').then(r => r.json()).catch(() => []),
    ]);
    setMethods(Array.isArray(m) ? m : []);
    setSubmissions(Array.isArray(s) ? s : []);
    setIsLoading(false);
  };

  useEffect(() => { fetchAll(); }, []);

  const handleDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    await fetch(`/api/metode-pembayaran/${deleteId}`, { method: 'DELETE' });
    setDeleteId(null);
    setIsDeleting(false);
    fetchAll();
  };

  const menunggu = submissions.filter(s => s.status === 'MENUNGGU_PEMBAYARAN').length;
  const diterima = submissions.filter(s => s.status === 'PEMBAYARAN_DITERIMA').length;

  return (
    <AdminAuthGuard allowedRoles={['ADMIN', 'ADMIN_KONSULTASI']}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard Konsultasi</h1>
          <p className="text-muted-foreground">Kelola metode pembayaran dan data konsultasi masuk</p>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Total Konsultasi</CardTitle></CardHeader>
            <CardContent><p className="text-3xl font-bold">{submissions.length}</p></CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3" /> Menunggu Pembayaran</CardTitle></CardHeader>
            <CardContent><p className="text-3xl font-bold text-yellow-600">{menunggu}</p></CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-1"><CheckCircle className="h-3 w-3" /> Pembayaran Diterima</CardTitle></CardHeader>
            <CardContent><p className="text-3xl font-bold text-green-600">{diterima}</p></CardContent>
          </Card>
        </div>

        <Tabs value={tab} onValueChange={setTab}>
          <TabsList>
            <TabsTrigger value="submissions"><Users className="h-4 w-4 mr-2" /> Data Konsultasi</TabsTrigger>
            <TabsTrigger value="payment"><CreditCard className="h-4 w-4 mr-2" /> Metode Pembayaran</TabsTrigger>
          </TabsList>

          {/* Submissions Tab */}
          <TabsContent value="submissions">
            <Card>
              <CardHeader>
                <CardTitle>Data Pengajuan Konsultasi</CardTitle>
                <CardDescription>Daftar semua pengguna yang telah mengisi formulir konsultasi</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex justify-center py-10"><Loader2 className="h-6 w-6 animate-spin" /></div>
                ) : submissions.length === 0 ? (
                  <div className="text-center py-10 text-muted-foreground">Belum ada data konsultasi masuk.</div>
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
                        {submissions.map(s => (
                          <TableRow key={s.id}>
                            <TableCell className="font-medium">{s.nama}</TableCell>
                            <TableCell>{s.noWhatsapp}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1 text-xs text-muted-foreground max-w-[180px] truncate">
                                <MapPin className="h-3 w-3 shrink-0" />
                                <span className="truncate">{s.alamatLokasi || `${s.latitude?.toFixed(4)}, ${s.longitude?.toFixed(4)}`}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant={STATUS_LABELS[s.status]?.variant}>{STATUS_LABELS[s.status]?.label || s.status}</Badge>
                            </TableCell>
                            <TableCell className="text-sm text-muted-foreground">
                              {new Date(s.createdAt).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}
                            </TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm" onClick={() => { setSelectedSubmission(s); setDetailOpen(true); }}>
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
          </TabsContent>

          {/* Payment Methods Tab */}
          <TabsContent value="payment">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Metode Pembayaran</CardTitle>
                  <CardDescription>Kelola rekening bank untuk pembayaran konsultasi</CardDescription>
                </div>
                <Button onClick={() => { setEditData(null); setDialogOpen(true); }}>
                  <Plus className="mr-2 h-4 w-4" /> Tambah Rekening
                </Button>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex justify-center py-10"><Loader2 className="h-6 w-6 animate-spin" /></div>
                ) : methods.length === 0 ? (
                  <div className="text-center py-10 text-muted-foreground">Belum ada metode pembayaran.</div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Bank</TableHead>
                          <TableHead>No. Rekening</TableHead>
                          <TableHead>Nama Pemilik</TableHead>
                          <TableHead>Deskripsi</TableHead>
                          <TableHead className="text-right">Aksi</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {methods.map(m => (
                          <TableRow key={m.id}>
                            <TableCell className="font-medium">{m.namaBank}</TableCell>
                            <TableCell className="font-mono">{m.nomorRekening}</TableCell>
                            <TableCell>{m.namaPemilik}</TableCell>
                            <TableCell className="text-muted-foreground text-sm">{m.deskripsi || '-'}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button variant="ghost" size="sm" onClick={() => { setEditData(m); setDialogOpen(true); }}>
                                  <Pencil className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive" onClick={() => setDeleteId(m.id)}>
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Dialogs */}
        <MetodePembayaranDialog open={dialogOpen} onClose={() => setDialogOpen(false)} editData={editData} onSaved={fetchAll} />
        <DetailSubmissionDialog submission={selectedSubmission} open={detailOpen} onClose={() => setDetailOpen(false)} />

        {/* Delete Confirm */}
        <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Hapus Metode Pembayaran</DialogTitle>
              <DialogDescription>Apakah Anda yakin ingin menghapus rekening ini? Tindakan ini tidak dapat dibatalkan.</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDeleteId(null)}>Batal</Button>
              <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
                {isDeleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Hapus
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminAuthGuard>
  );
}
