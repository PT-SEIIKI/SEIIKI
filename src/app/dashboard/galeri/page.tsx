'use client';

import { useState, useRef } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, Trash2, ImageIcon, X } from 'lucide-react';
import { AdminAuthGuard } from '@/components/auth/admin-auth-guard';

interface GalleryImage {
  id: string;
  src: string;
  name: string;
}

const defaultImages: GalleryImage[] = [
  { id: '1', src: '/kegiatan-2.png', name: 'kegiatan-2.png' },
  { id: '2', src: '/kegiatan-3.png', name: 'kegiatan-3.png' },
  { id: '3', src: '/kegiatan-4.png', name: 'kegiatan-4.png' },
  { id: '4', src: '/kegiatan-5.png', name: 'kegiatan-5.png' },
  { id: '5', src: '/kegiatan-6.png', name: 'kegiatan-6.png' },
  { id: '6', src: '/kegiatan-7.png', name: 'kegiatan-7.png' },
  { id: '7', src: '/kegiatan-8.png', name: 'kegiatan-8.png' },
  { id: '8', src: '/kegiatan-9.png', name: 'kegiatan-9.png' },
  { id: '9', src: '/kegiatan-10.png', name: 'kegiatan-10.png' },
  { id: '10', src: '/kegiatan-11.png', name: 'kegiatan-11.png' },
];

export default function DashboardGaleriPage() {
  const [images, setImages] = useState<GalleryImage[]>(defaultImages);
  const [selected, setSelected] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleDelete = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
    if (selected === id) setSelected(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newImages: GalleryImage[] = files.map((file) => ({
      id: Date.now().toString() + Math.random(),
      src: URL.createObjectURL(file),
      name: file.name,
    }));
    setImages((prev) => [...prev, ...newImages]);
    if (fileRef.current) fileRef.current.value = '';
  };

  return (
    <AdminAuthGuard allowedRoles={['ADMIN']}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Kelola Galeri</h1>
            <p className="text-muted-foreground mt-1">Tambah, hapus, atau atur gambar di galeri publik.</p>
          </div>
          <Button onClick={() => fileRef.current?.click()} className="gap-2">
            <Upload className="h-4 w-4" />
            Unggah Gambar
          </Button>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ImageIcon className="h-5 w-5" />
              Gambar Galeri ({images.length})
            </CardTitle>
            <CardDescription>
              Klik gambar untuk pratinjau. Catatan: perubahan pada halaman ini hanya tersimpan di sesi ini. Untuk perubahan permanen, unggah gambar ke folder <code className="text-xs bg-muted px-1 rounded">public/</code> di server.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {images.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
                <ImageIcon className="h-12 w-12 mb-4 opacity-30" />
                <p>Belum ada gambar. Unggah gambar pertama Anda.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {images.map((img) => (
                  <div
                    key={img.id}
                    className="group relative aspect-square rounded-xl overflow-hidden border-2 border-transparent hover:border-primary transition-all cursor-pointer shadow-sm"
                    onClick={() => setSelected(img.src)}
                  >
                    <img src={img.src} alt={img.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-200" />
                    <button
                      onClick={(e) => { e.stopPropagation(); handleDelete(img.id); }}
                      className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Lightbox */}
        {selected && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
            <button className="absolute top-4 right-4 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors" onClick={() => setSelected(null)}>
              <X className="h-6 w-6 text-white" />
            </button>
            <img src={selected} alt="Preview" className="max-w-4xl max-h-[85vh] object-contain rounded-xl shadow-2xl" onClick={(e) => e.stopPropagation()} />
          </div>
        )}
      </div>
    </AdminAuthGuard>
  );
}
