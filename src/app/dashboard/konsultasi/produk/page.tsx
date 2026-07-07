'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Loader2, Plus, Pencil, Trash2, Package, X, ImageIcon } from 'lucide-react';
import { AdminAuthGuard } from '@/components/auth/admin-auth-guard';

interface Produk {
  id: string;
  nama: string;
  harga: number;
  deskripsi: string;
  imageUrl: string | null;
  isActive: boolean;
  order: number;
}

function formatRupiah(value: number) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(value);
}

function ImageUpload({ value, onChange }: { value: string; onChange: (url: string) => void }) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    setError('');
    setIsUploading(true);
    try {
      const form = new FormData();
      form.append('file', file);
      const res = await fetch('/api/produk/upload', { method: 'POST', body: form });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Gagal upload');
      onChange(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal mengupload gambar');
    } finally { setIsUploading(false); }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  return (
    <div className="space-y-2">
      <Label>Gambar Produk</Label>
      {value ? (
        <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
          <img src={value} alt="Preview" className="object-cover w-full h-full" />
          <button type="button" onClick={() => onChange('')} className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 text-white rounded-full p-1 transition-colors">
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <div
          onClick={() => inputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={e => e.preventDefault()}
          className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-[#09bce4]/30 rounded-xl p-8 cursor-pointer hover:border-[#09bce4]/60 hover:bg-[#09bce4]/5 transition-colors"
        >
          {isUploading ? <Loader2 className="h-8 w-8 animate-spin text-[#09bce4]" /> : <ImageIcon className="h-8 w-8 text-[#09bce4]/50" />}
          <div className="text-center">
            <p className="text-sm font-medium text-gray-600">{isUploading ? 'Mengupload...' : 'Klik atau seret gambar ke sini'}</p>
            <p className="text-xs text-gray-400 mt-0.5">JPG, PNG, WebP — Maks. 5MB</p>
          </div>
        </div>
      )}
      <input ref={inputRef} type="file" accept="image/jpeg,image/jpg,image/png,image/webp" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

function FormDialog({ open, onClose, editData, onSaved }: {
  open: boolean; onClose: () => void; editData: Produk | null; onSaved: () => void;
}) {
  const [form, setForm] = useState({ nama: '', harga: '', deskripsi: '', imageUrl: '', isActive: true, order: '0' });
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (editData) {
      setForm({ nama: editData.nama, harga: String(editData.harga), deskripsi: editData.deskripsi, imageUrl: editData.imageUrl || '', isActive: editData.isActive, order: String(editData.order) });
    } else {
      setForm({ nama: '', harga: '', deskripsi: '', imageUrl: '', isActive: true, order: '0' });
    }
    setError('');
  }, [editData, open]);

  const handleSave = async () => {
    if (!form.nama || !form.harga || !form.deskripsi) { setError('Nama, harga, dan deskripsi wajib diisi'); return; }
    if (isNaN(Number(form.harga)) || Number(form.harga) < 0) { setError('Harga harus berupa angka yang valid'); return; }
    setIsSaving(true); setError('');
    try {
      const url = editData ? `/api/produk/${editData.id}` : '/api/produk';
      const res = await fetch(url, {
        method: editData ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nama: form.nama, harga: Number(form.harga), deskripsi: form.deskripsi, imageUrl: form.imageUrl || null, isActive: form.isActive, order: Number(form.order) || 0 }),
      });
      if (!res.ok) { const d = await res.json(); throw new Error(d.error || 'Gagal menyimpan'); }
      onSaved(); onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan');
    } finally { setIsSaving(false); }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-[#0a2a4a]">{editData ? 'Edit' : 'Tambah'} Produk</DialogTitle>
          <DialogDescription>Isi detail produk kelistrikan</DialogDescription>
        </DialogHeader>
        {error && <Alert variant="destructive"><AlertDescription>{error}</AlertDescription></Alert>}
        <div className="space-y-4">
          <ImageUpload value={form.imageUrl} onChange={url => setForm(f => ({ ...f, imageUrl: url }))} />
          <div className="space-y-2">
            <Label>Nama Produk <span className="text-red-500">*</span></Label>
            <Input value={form.nama} onChange={e => setForm(f => ({ ...f, nama: e.target.value }))} placeholder="Contoh: Kabel NYY 3x4mm" className="h-11" />
          </div>
          <div className="space-y-2">
            <Label>Harga (Rp) <span className="text-red-500">*</span></Label>
            <Input type="number" min="0" value={form.harga} onChange={e => setForm(f => ({ ...f, harga: e.target.value }))} placeholder="Contoh: 150000" className="h-11" />
          </div>
          <div className="space-y-2">
            <Label>Deskripsi <span className="text-red-500">*</span></Label>
            <Textarea value={form.deskripsi} onChange={e => setForm(f => ({ ...f, deskripsi: e.target.value }))} placeholder="Deskripsi lengkap produk..." rows={3} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Urutan</Label>
              <Input type="number" min="0" value={form.order} onChange={e => setForm(f => ({ ...f, order: e.target.value }))} className="h-11" />
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <div className="flex items-center gap-2 pt-2.5">
                <Switch checked={form.isActive} onCheckedChange={v => setForm(f => ({ ...f, isActive: v }))} />
                <span className="text-sm text-gray-500">{form.isActive ? 'Aktif' : 'Nonaktif'}</span>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter className="mt-2">
          <Button variant="outline" onClick={onClose} className="border-gray-200">Batal</Button>
          <Button onClick={handleSave} disabled={isSaving} className="bg-[#09bce4] hover:bg-[#09bce4]/90 text-white">
            {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {editData ? 'Simpan Perubahan' : 'Tambah Produk'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function ProdukAdminPage() {
  const [produkList, setProdukList] = useState<Produk[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editData, setEditData] = useState<Produk | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    const data = await fetch('/api/produk').then(r => r.json()).catch(() => []);
    setProdukList(Array.isArray(data) ? data : []);
    setIsLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const handleDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    await fetch(`/api/produk/${deleteId}`, { method: 'DELETE' });
    setDeleteId(null); setIsDeleting(false); fetchData();
  };

  return (
    <AdminAuthGuard allowedRoles={['ADMIN', 'ADMIN_KONSULTASI']}>
      <div className="space-y-6">

        {/* Page Header */}
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Package className="h-5 w-5 text-[#09bce4]" />
              <h1 className="text-2xl font-bold text-[#0a2a4a]">Produk</h1>
            </div>
            <p className="text-gray-500 text-sm">Kelola produk kelistrikan yang ditampilkan di halaman publik</p>
          </div>
          <Button onClick={() => { setEditData(null); setDialogOpen(true); }} className="bg-[#09bce4] hover:bg-[#09bce4]/90 text-white shadow-sm">
            <Plus className="mr-2 h-4 w-4" /> Tambah Produk
          </Button>
        </div>

        {/* Table Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-[#0a2a4a]">Daftar Produk</h2>
              <p className="text-xs text-gray-400 mt-0.5">{produkList.length} produk terdaftar</p>
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-12"><Loader2 className="h-6 w-6 animate-spin text-[#09bce4]" /></div>
          ) : produkList.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4 text-gray-400">
              <Package className="h-12 w-12 opacity-25" />
              <p className="text-sm">Belum ada produk.</p>
              <Button onClick={() => { setEditData(null); setDialogOpen(true); }} size="sm" className="bg-[#09bce4] hover:bg-[#09bce4]/90 text-white">
                <Plus className="mr-2 h-4 w-4" /> Tambah Produk
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50/70">
                    <TableHead className="text-xs font-bold text-gray-500 uppercase tracking-wide">Gambar</TableHead>
                    <TableHead className="text-xs font-bold text-gray-500 uppercase tracking-wide">Nama Produk</TableHead>
                    <TableHead className="text-xs font-bold text-gray-500 uppercase tracking-wide">Harga</TableHead>
                    <TableHead className="text-xs font-bold text-gray-500 uppercase tracking-wide">Status</TableHead>
                    <TableHead className="text-xs font-bold text-gray-500 uppercase tracking-wide">Urutan</TableHead>
                    <TableHead className="text-right text-xs font-bold text-gray-500 uppercase tracking-wide">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {produkList.map(p => (
                    <TableRow key={p.id} className="hover:bg-[#09bce4]/5 transition-colors">
                      <TableCell>
                        <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center shrink-0">
                          {p.imageUrl
                            ? <img src={p.imageUrl} alt={p.nama} className="object-cover w-full h-full" />
                            : <Package className="h-5 w-5 text-gray-300" />}
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="font-semibold text-[#0a2a4a]">{p.nama}</p>
                        <p className="text-xs text-gray-400 line-clamp-1 mt-0.5">{p.deskripsi}</p>
                      </TableCell>
                      <TableCell>
                        <span className="font-bold text-[#09bce4] whitespace-nowrap">{formatRupiah(p.harga)}</span>
                      </TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${p.isActive ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-gray-100 text-gray-500'}`}>
                          {p.isActive ? 'Aktif' : 'Nonaktif'}
                        </span>
                      </TableCell>
                      <TableCell className="text-gray-400">{p.order}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button variant="ghost" size="sm" onClick={() => { setEditData(p); setDialogOpen(true); }} aria-label={`Edit produk ${p.nama}`} className="text-gray-400 hover:text-[#09bce4] hover:bg-[#09bce4]/10">
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => setDeleteId(p.id)} aria-label={`Hapus produk ${p.nama}`} className="text-gray-400 hover:text-red-500 hover:bg-red-50">
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
        </div>
      </div>

      <FormDialog open={dialogOpen} onClose={() => setDialogOpen(false)} editData={editData} onSaved={fetchData} />

      <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-[#0a2a4a]">Hapus Produk</DialogTitle>
            <DialogDescription>Apakah Anda yakin ingin menghapus produk ini? Tindakan ini tidak dapat dibatalkan.</DialogDescription>
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
