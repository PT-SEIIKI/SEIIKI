'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Loader2, Plus, Pencil, Trash2, Building2, CreditCard } from 'lucide-react';
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

function FormDialog({ open, onClose, editData, onSaved }: {
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
    if (!form.namaBank || !form.nomorRekening || !form.namaPemilik) { setError('Nama bank, nomor rekening, dan nama pemilik wajib diisi'); return; }
    setIsSaving(true); setError('');
    try {
      const url = editData ? `/api/metode-pembayaran/${editData.id}` : '/api/metode-pembayaran';
      const res = await fetch(url, { method: editData ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      if (!res.ok) { const d = await res.json(); throw new Error(d.error || 'Gagal menyimpan'); }
      onSaved(); onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan');
    } finally { setIsSaving(false); }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-[#0a2a4a]">{editData ? 'Edit' : 'Tambah'} Metode Pembayaran</DialogTitle>
          <DialogDescription>Isi detail rekening bank untuk metode pembayaran</DialogDescription>
        </DialogHeader>
        {error && <Alert variant="destructive"><AlertDescription>{error}</AlertDescription></Alert>}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Nama Bank <span className="text-red-500">*</span></Label>
            <Input value={form.namaBank} onChange={e => setForm(f => ({ ...f, namaBank: e.target.value }))} placeholder="Contoh: Bank BCA" className="h-11" />
          </div>
          <div className="space-y-2">
            <Label>Nomor Rekening <span className="text-red-500">*</span></Label>
            <Input value={form.nomorRekening} onChange={e => setForm(f => ({ ...f, nomorRekening: e.target.value }))} placeholder="Contoh: 1234567890" className="h-11" />
          </div>
          <div className="space-y-2">
            <Label>Nama Pemilik Rekening <span className="text-red-500">*</span></Label>
            <Input value={form.namaPemilik} onChange={e => setForm(f => ({ ...f, namaPemilik: e.target.value }))} placeholder="Nama sesuai rekening" className="h-11" />
          </div>
          <div className="space-y-2">
            <Label>Deskripsi (opsional)</Label>
            <Input value={form.deskripsi} onChange={e => setForm(f => ({ ...f, deskripsi: e.target.value }))} placeholder="Keterangan tambahan" className="h-11" />
          </div>
        </div>
        <DialogFooter className="mt-2">
          <Button variant="outline" onClick={onClose} className="border-gray-200">Batal</Button>
          <Button onClick={handleSave} disabled={isSaving} className="bg-[#09bce4] hover:bg-[#09bce4]/90 text-white">
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
    setDeleteId(null); setIsDeleting(false); fetchData();
  };

  return (
    <AdminAuthGuard allowedRoles={['ADMIN', 'ADMIN_KONSULTASI']}>
      <div className="space-y-6">

        {/* Page Header */}
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <CreditCard className="h-5 w-5 text-[#09bce4]" />
              <h1 className="text-2xl font-bold text-[#0a2a4a]">Metode Pembayaran</h1>
            </div>
            <p className="text-gray-500 text-sm">Kelola rekening bank untuk pembayaran konsultasi</p>
          </div>
          <Button onClick={() => { setEditData(null); setDialogOpen(true); }} className="bg-[#09bce4] hover:bg-[#09bce4]/90 text-white shadow-sm">
            <Plus className="mr-2 h-4 w-4" /> Tambah Rekening
          </Button>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-50">
            <h2 className="text-base font-bold text-[#0a2a4a]">Daftar Rekening</h2>
            <p className="text-xs text-gray-400 mt-0.5">Rekening yang ditampilkan kepada customer saat pembayaran</p>
          </div>

          <div className="p-6">
            {isLoading ? (
              <div className="flex justify-center py-12"><Loader2 className="h-6 w-6 animate-spin text-[#09bce4]" /></div>
            ) : methods.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 gap-3 text-gray-400">
                <CreditCard className="h-10 w-10 opacity-30" />
                <p className="text-sm">Belum ada metode pembayaran.</p>
                <Button onClick={() => { setEditData(null); setDialogOpen(true); }} size="sm" className="bg-[#09bce4] hover:bg-[#09bce4]/90 text-white mt-1">
                  <Plus className="mr-2 h-4 w-4" /> Tambah Rekening
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {methods.map(m => (
                  <div key={m.id} className="flex items-center gap-4 p-4 rounded-2xl border border-[#09bce4]/20 bg-gradient-to-r from-[#09bce4]/5 to-[#0b3160]/5 hover:from-[#09bce4]/8 hover:to-[#0b3160]/8 transition-colors">
                    <div className="bg-[#09bce4]/15 rounded-xl p-2.5 shrink-0">
                      <Building2 className="h-5 w-5 text-[#09bce4]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-[#0a2a4a]">{m.namaBank}</span>
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${m.isActive ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-gray-100 text-gray-500'}`}>
                          {m.isActive ? 'Aktif' : 'Nonaktif'}
                        </span>
                      </div>
                      <p className="text-lg font-mono font-bold text-[#09bce4] mt-0.5">{m.nomorRekening}</p>
                      <p className="text-sm text-gray-500">a/n {m.namaPemilik}</p>
                      {m.deskripsi && <p className="text-xs text-gray-400 mt-0.5">{m.deskripsi}</p>}
                    </div>
                    <div className="flex gap-1 shrink-0">
                      <Button variant="ghost" size="sm" onClick={() => { setEditData(m); setDialogOpen(true); }} aria-label={`Edit rekening ${m.namaBank}`} className="text-gray-400 hover:text-[#09bce4] hover:bg-[#09bce4]/10">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => setDeleteId(m.id)} aria-label={`Hapus rekening ${m.namaBank}`} className="text-gray-400 hover:text-red-500 hover:bg-red-50">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <FormDialog open={dialogOpen} onClose={() => setDialogOpen(false)} editData={editData} onSaved={fetchData} />

      <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-[#0a2a4a]">Hapus Metode Pembayaran</DialogTitle>
            <DialogDescription>Apakah Anda yakin ingin menghapus rekening ini? Tindakan ini tidak dapat dibatalkan.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteId(null)} className="border-gray-200">Batal</Button>
            <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
              {isDeleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Hapus
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminAuthGuard>
  );
}
