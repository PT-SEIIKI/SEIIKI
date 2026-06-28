'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Loader2, MessageCircle, Phone, Key, CheckCircle, ExternalLink, DollarSign } from 'lucide-react';
import { AdminAuthGuard } from '@/components/auth/admin-auth-guard';

function formatRupiah(value: string) {
  const num = Number(value.replace(/\D/g, ''));
  if (isNaN(num)) return '';
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num);
}

export default function KonsultasiSettingPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [error, setError] = useState('');
  const [isTestingWA, setIsTestingWA] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);

  const [settings, setSettings] = useState({
    wa_fonnte_token: '',
    wa_admin_number: '',
    harga_konsultasi: '',
  });

  useEffect(() => {
    fetch('/api/settings')
      .then(r => r.json())
      .then(data => {
        if (data && !data.error) {
          setSettings({
            wa_fonnte_token: data.wa_fonnte_token || '',
            wa_admin_number: data.wa_admin_number || '',
            harga_konsultasi: data.harga_konsultasi || '',
          });
        }
      })
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    setError('');
    setSaveSuccess(false);
    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      if (!res.ok) throw new Error('Gagal menyimpan pengaturan');
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan');
    } finally {
      setIsSaving(false);
    }
  };

  const handleTestWA = async () => {
    setIsTestingWA(true);
    setTestResult(null);
    try {
      const res = await fetch('/api/settings/test-wa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      const data = await res.json();
      setTestResult({
        success: res.ok && data.success,
        message: data.message || (res.ok ? 'Pesan test berhasil dikirim!' : 'Gagal'),
      });
    } catch {
      setTestResult({ success: false, message: 'Gagal terhubung ke server' });
    } finally {
      setIsTestingWA(false);
    }
  };

  const isWAConfigured = settings.wa_fonnte_token && settings.wa_admin_number;

  return (
    <AdminAuthGuard allowedRoles={['ADMIN', 'ADMIN_KONSULTASI']}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Setting</h1>
          <p className="text-muted-foreground">Konfigurasi layanan konsultasi</p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>
        ) : (
          <>
            {error && <Alert variant="destructive"><AlertDescription>{error}</AlertDescription></Alert>}
            {saveSuccess && (
              <Alert className="border-green-200 bg-green-50">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">Pengaturan berhasil disimpan!</AlertDescription>
              </Alert>
            )}

            {/* Harga Konsultasi */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-blue-600" />
                  Harga Konsultasi
                </CardTitle>
                <CardDescription>
                  Nominal biaya yang harus dibayar customer sebelum teknisi datang ke lokasi
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="harga">Harga Konsultasi (Rp)</Label>
                  <Input
                    id="harga"
                    type="number"
                    min="0"
                    placeholder="Contoh: 150000"
                    value={settings.harga_konsultasi}
                    onChange={e => setSettings(s => ({ ...s, harga_konsultasi: e.target.value }))}
                  />
                  {settings.harga_konsultasi && (
                    <p className="text-sm font-medium text-blue-700">
                      = {formatRupiah(settings.harga_konsultasi)}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    Harga ini akan ditampilkan di halaman pembayaran konsultasi.
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSave} disabled={isSaving}>
                  {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Simpan
                </Button>
              </CardFooter>
            </Card>

            {/* Notifikasi WhatsApp */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <MessageCircle className="h-5 w-5 text-green-600" />
                      Notifikasi WhatsApp Otomatis
                    </CardTitle>
                    <CardDescription>
                      Pesan WA otomatis terkirim ke admin saat ada pembayaran masuk. Menggunakan{' '}
                      <a href="https://fonnte.com" target="_blank" rel="noopener noreferrer" className="text-primary underline inline-flex items-center gap-0.5">
                        Fonnte <ExternalLink className="h-3 w-3" />
                      </a>
                    </CardDescription>
                  </div>
                  <Badge
                    className={isWAConfigured ? 'bg-green-100 text-green-800 border-green-200' : ''}
                    variant={isWAConfigured ? 'outline' : 'secondary'}
                  >
                    {isWAConfigured ? '✓ Aktif' : 'Belum dikonfigurasi'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-5">
                {testResult && (
                  <Alert
                    variant={testResult.success ? 'default' : 'destructive'}
                    className={testResult.success ? 'border-green-200 bg-green-50' : ''}
                  >
                    <AlertDescription className={testResult.success ? 'text-green-800' : ''}>
                      {testResult.message}
                    </AlertDescription>
                  </Alert>
                )}

                <div className="rounded-lg bg-blue-50 border border-blue-100 p-4 text-sm text-blue-800 space-y-1">
                  <p className="font-semibold">Cara mendapatkan Token Fonnte:</p>
                  <ol className="list-decimal list-inside space-y-1 text-blue-700">
                    <li>Daftar di <a href="https://fonnte.com" target="_blank" rel="noopener noreferrer" className="underline">fonnte.com</a></li>
                    <li>Hubungkan nomor WhatsApp Anda (scan QR)</li>
                    <li>Salin Token dari halaman perangkat</li>
                  </ol>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="wa_token" className="flex items-center gap-2">
                    <Key className="h-4 w-4" /> Token Fonnte
                  </Label>
                  <Input
                    id="wa_token"
                    type="password"
                    placeholder="Masukkan token dari Fonnte"
                    value={settings.wa_fonnte_token}
                    onChange={e => setSettings(s => ({ ...s, wa_fonnte_token: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="wa_admin" className="flex items-center gap-2">
                    <Phone className="h-4 w-4" /> Nomor WA Admin (Penerima Notifikasi)
                  </Label>
                  <Input
                    id="wa_admin"
                    type="tel"
                    placeholder="Contoh: 628123456789"
                    value={settings.wa_admin_number}
                    onChange={e => setSettings(s => ({ ...s, wa_admin_number: e.target.value }))}
                  />
                  <p className="text-xs text-muted-foreground">Format: 628xxx (tanpa +)</p>
                </div>
              </CardContent>
              <CardFooter className="flex gap-3">
                <Button onClick={handleSave} disabled={isSaving}>
                  {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Simpan
                </Button>
                <Button variant="outline" onClick={handleTestWA} disabled={isTestingWA || !isWAConfigured}>
                  {isTestingWA && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Kirim Pesan Test
                </Button>
              </CardFooter>
            </Card>
          </>
        )}
      </div>
    </AdminAuthGuard>
  );
}
