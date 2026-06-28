'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Loader2, Upload, CheckCircle, CreditCard, Building2 } from 'lucide-react';

interface MetodePembayaran {
  id: string;
  namaBank: string;
  nomorRekening: string;
  namaPemilik: string;
  deskripsi: string | null;
}

function PembayaranContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get('id');

  const [methods, setMethods] = useState<MetodePembayaran[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      router.replace('/layanan');
      return;
    }
    fetch('/api/metode-pembayaran')
      .then(r => r.json())
      .then(data => { setMethods(data); setIsLoading(false); })
      .catch(() => setIsLoading(false));
  }, [id, router]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedFile(file);
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (ev) => setPreview(ev.target?.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !id) return;
    setIsUploading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      const res = await fetch(`/api/konsultasi/${id}/payment`, {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Gagal mengupload bukti pembayaran');
      }

      setIsSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan');
    } finally {
      setIsUploading(false);
    }
  };

  if (!id) return null;

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-lg text-center">
          <CardContent className="pt-10 pb-10 space-y-4">
            <div className="flex justify-center">
              <div className="rounded-full bg-green-100 p-4">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Pembayaran Terkirim!</h2>
            <p className="text-muted-foreground">
              Bukti pembayaran Anda telah berhasil diupload. Tim SEIIKI akan memverifikasi
              dan menghubungi Anda melalui WhatsApp.
            </p>
            <Button className="w-full mt-4" onClick={() => router.push('/')}>
              Kembali ke Beranda
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Pembayaran Konsultasi</h1>
          <p className="text-muted-foreground mt-2">
            Silakan transfer ke salah satu rekening berikut dan upload bukti pembayaran
          </p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-primary" />
              Metode Pembayaran
            </CardTitle>
            <CardDescription>Transfer ke salah satu rekening di bawah ini</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
            ) : methods.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">
                Belum ada metode pembayaran. Hubungi admin.
              </p>
            ) : (
              <div className="space-y-4">
                {methods.map((method) => (
                  <div
                    key={method.id}
                    className="border rounded-xl p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200"
                  >
                    <div className="flex items-start gap-3">
                      <div className="bg-blue-100 rounded-lg p-2">
                        <Building2 className="h-5 w-5 text-blue-700" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-bold text-gray-900">{method.namaBank}</span>
                          <Badge variant="secondary" className="text-xs">Transfer Bank</Badge>
                        </div>
                        <p className="text-2xl font-mono font-bold text-blue-800 mt-1 tracking-wider">
                          {method.nomorRekening}
                        </p>
                        <p className="text-sm text-gray-700 mt-1">a/n {method.namaPemilik}</p>
                        {method.deskripsi && (
                          <p className="text-xs text-muted-foreground mt-1">{method.deskripsi}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5 text-primary" />
              Upload Bukti Pembayaran
            </CardTitle>
            <CardDescription>
              Upload foto/screenshot bukti transfer Anda (JPG, PNG, atau PDF)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-primary transition-colors">
              <input
                type="file"
                id="payment-proof"
                accept="image/*,.pdf"
                onChange={handleFileChange}
                className="hidden"
              />
              <label htmlFor="payment-proof" className="cursor-pointer">
                {preview ? (
                  <div className="space-y-3">
                    <img src={preview} alt="Preview" className="max-h-48 mx-auto rounded-lg object-contain" />
                    <p className="text-sm text-green-600 font-medium">{selectedFile?.name}</p>
                    <p className="text-xs text-muted-foreground">Klik untuk ganti file</p>
                  </div>
                ) : selectedFile ? (
                  <div className="space-y-2">
                    <CheckCircle className="h-10 w-10 text-green-500 mx-auto" />
                    <p className="text-sm font-medium text-gray-700">{selectedFile.name}</p>
                    <p className="text-xs text-muted-foreground">Klik untuk ganti file</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Upload className="h-10 w-10 text-gray-400 mx-auto" />
                    <p className="text-sm font-medium text-gray-700">Klik untuk pilih file</p>
                    <p className="text-xs text-muted-foreground">JPG, PNG, atau PDF (maks. 10MB)</p>
                  </div>
                )}
              </label>
            </div>

            <Button
              className="w-full"
              size="lg"
              onClick={handleUpload}
              disabled={!selectedFile || isUploading}
            >
              {isUploading ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Mengupload...</>
              ) : (
                <><Upload className="mr-2 h-4 w-4" /> Kirim Bukti Pembayaran</>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function PembayaranPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    }>
      <PembayaranContent />
    </Suspense>
  );
}
