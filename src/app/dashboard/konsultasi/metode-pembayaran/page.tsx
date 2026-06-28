'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Loader2, Plus, Pencil, Trash2, Building2 } from 'lucide-react';
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

function FormDialog({
  open, onClose, editData, onSaved,
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
    if (!form.namaBank || !form.nomorRekening || !form.namaPemilik) {
      setError('Nama bank, nomor rekening, dan nama pemilik wajib diisi');
      return;
    }
    setIsSaving(true);
    setError('');
    try {
      const url = editData ? `/api/metode-pembayaran/${editData.id}` : '/api/metode-pembayaran';
      const res = await fetch(url, {
        method: editData ? 'PUT' : 'POST',
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
          <DialogDescription>Isi detail rekening bank untuk metode pembayaran</DialogDescription>
        </DialogHeader>
        {error && <Alert variant="destructive"><AlertDescription>{error}</AlertDescription></Alert>}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Nama Bank <span className="text-red-500">*</span></Label>
            <Input value={form.namaBank} onChange={e => setForm(f => ({ ...f, namaBank: e.target.value }))} placeholder="Contoh: Bank BCA" />
          </div>
          <div className="space-y-2">
            <Label>Nomor Rekening <span className="text-red-500">*</span></Label>
            <Input value={form.nomorRekening} onChange={e => setForm(f => ({ ...f, nomorRekening: e.target.value }))} placeholder="Contoh: 1234567890" />
          </div>
          <div className="space-y-2">
            <Label>Nama Pemilik Rekening <span className="text-red-500">*</span></Label>
            <Input value={form.namaPemilik} onChange={e => setForm(f => ({ ...f, namaPemilik: e.target.value }))} placeholder="Nama sesuai rekening" />
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
            {editData ? 'Simpan Perubahan' : 'Tambah Rekening'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function MetodePembayaranPage() {
  const [methods, setMethods] = useState<MetodePembayaran[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editData, setEditData] = useState<MetodePembayaran | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    const data = await fetch('/api/metode-pembayaran').then(r => r.json()).catch(() => []);
    setMethods(Array.isArray(data) ? data : []);
    setIsLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const handleDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    await fetch(`/api/metode-pembayaran/${deleteId}`, { method: 'DELETE' });
    setDeleteId(null);
    setIsDeleting(false);
    fetchData();
  };

  return (
    <AdminAuthGuard allowedRoles={['ADMIN', 'ADMIN_KONSULTASI']}>
      <div className="space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Metode Pembayaran</h1>
            <p className="text-muted-foreground">Kelola rekening bank untuk pembayaran konsultasi</p>
          </div>
          <Button onClick={() => { setEditData(null); setDialogOpen(true); }}>
            <Plus className="mr-2 h-4 w-4" /> Tambah Rekening
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Daftar Rekening</CardTitle>
            <CardDescription>Rekening yang ditampilkan kepada customer saat pembayaran</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-6 w-6 animate-spin" />
              </div>
            ) : methods.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                Belum ada metode pembayaran. Klik &ldquo;Tambah Rekening&rdquo; untuk menambahkan.
              </div>
            ) : (
              <div className="space-y-4">
                {methods.map(m => (
                  <div key={m.id} className="flex items-center gap-4 p-4 border rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-100">
                    <div className="bg-blue-100 rounded-lg p-2 shrink-0">
                      <Building2 className="h-5 w-5 text-blue-700" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-gray-900">{m.namaBank}</span>
                        <Badge variant={m.isActive ? 'default' : 'secondary'} className="text-xs">
                          {m.isActive ? 'Aktif' : 'Nonaktif'}
                        </Badge>
                      </div>
                      <p className="text-lg font-mono font-bold text-blue-800 mt-0.5">{m.nomorRekening}</p>
                      <p className="text-sm text-gray-600">a/n {m.namaPemilik}</p>
                      {m.deskripsi && <p className="text-xs text-muted-foreground mt-0.5">{m.deskripsi}</p>}
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <Button variant="ghost" size="sm" onClick={() => { setEditData(m); setDialogOpen(true); }}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive" onClick={() => setDeleteId(m.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <FormDialog open={dialogOpen} onClose={() => setDialogOpen(false)} editData={editData} onSaved={fetchData} />

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
    </AdminAuthGuard>
  );
}
