'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, MessageCircle, Phone, Key, CheckCircle, ExternalLink, DollarSign, Settings, Save, Send } from 'lucide-react';
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
          setSettings({ wa_fonnte_token: data.wa_fonnte_token || '', wa_admin_number: data.wa_admin_number || '', harga_konsultasi: data.harga_konsultasi || '' });
        }
      })
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, []);

  const handleSave = async () => {
    setIsSaving(true); setError(''); setSaveSuccess(false);
    try {
      const res = await fetch('/api/settings', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(settings) });
      if (!res.ok) throw new Error('Gagal menyimpan pengaturan');
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan');
    } finally { setIsSaving(false); }
  };

  const handleTestWA = async () => {
    setIsTestingWA(true); setTestResult(null);
    try {
      const res = await fetch('/api/settings/test-wa', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(settings) });
      const data = await res.json();
      setTestResult({ success: res.ok && data.success, message: data.message || (res.ok ? 'Pesan test berhasil dikirim!' : 'Gagal') });
    } catch {
      setTestResult({ success: false, message: 'Gagal terhubung ke server' });
    } finally { setIsTestingWA(false); }
  };

  const isWAConfigured = settings.wa_fonnte_token && settings.wa_admin_number;

  return (
    <AdminAuthGuard allowedRoles={['ADMIN', 'ADMIN_KONSULTASI']}>
      <div className="space-y-6">

        {/* Page Header */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Settings className="h-5 w-5 text-[#09bce4]" />
            <h1 className="text-2xl font-bold text-[#0a2a4a]">Setting Layanan</h1>
          </div>
          <p className="text-gray-500 text-sm">Konfigurasi harga konsultasi dan notifikasi WhatsApp</p>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-32 gap-3">
            <Loader2 className="h-7 w-7 animate-spin text-[#09bce4]" />
            <p className="text-sm text-gray-400">Memuat pengaturan...</p>
          </div>
        ) : (
          <>
            {error && <Alert variant="destructive"><AlertDescription>{error}</AlertDescription></Alert>}
            {saveSuccess && (
              <Alert className="border-emerald-200 bg-emerald-50">
                <CheckCircle className="h-4 w-4 text-emerald-600" />
                <AlertDescription className="text-emerald-800 font-medium">Pengaturan berhasil disimpan!</AlertDescription>
              </Alert>
            )}

            {/* Harga Konsultasi */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-50">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-[#09bce4]/10 flex items-center justify-center">
                    <DollarSign className="h-5 w-5 text-[#09bce4]" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-[#0a2a4a]">Harga Konsultasi</h2>
                    <p className="text-xs text-gray-400">Nominal biaya yang harus dibayar customer sebelum teknisi datang</p>
                  </div>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="harga" className="text-sm font-semibold text-gray-700">Harga Konsultasi (Rp)</Label>
                  <Input
                    id="harga"
                    type="number"
                    min="0"
                    placeholder="Contoh: 150000"
                    value={settings.harga_konsultasi}
                    onChange={e => setSettings(s => ({ ...s, harga_konsultasi: e.target.value }))}
                    className="h-11 max-w-xs"
                  />
                  {settings.harga_konsultasi && (
                    <p className="text-sm font-bold text-[#09bce4]">= {formatRupiah(settings.harga_konsultasi)}</p>
                  )}
                  <p className="text-xs text-gray-400">Harga ini akan ditampilkan di halaman pembayaran konsultasi.</p>
                </div>
                <Button onClick={handleSave} disabled={isSaving} className="bg-[#09bce4] hover:bg-[#09bce4]/90 text-white">
                  {isSaving ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Menyimpan...</> : <><Save className="mr-2 h-4 w-4" />Simpan Harga</>}
                </Button>
              </div>
            </div>

            {/* Notifikasi WhatsApp */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-50">
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center">
                      <MessageCircle className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div>
                      <h2 className="text-base font-bold text-[#0a2a4a]">Notifikasi WhatsApp Otomatis</h2>
                      <p className="text-xs text-gray-400">
                        Pesan WA otomatis saat ada pembayaran masuk via{' '}
                        <a href="https://fonnte.com" target="_blank" rel="noopener noreferrer" className="text-[#09bce4] underline inline-flex items-center gap-0.5">
                          Fonnte <ExternalLink className="h-3 w-3" />
                        </a>
                      </p>
                    </div>
                  </div>
                  <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${isWAConfigured ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-gray-100 text-gray-500'}`}>
                    {isWAConfigured ? '✓ Aktif' : 'Belum dikonfigurasi'}
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-5">
                {testResult && (
                  <Alert variant={testResult.success ? 'default' : 'destructive'} className={testResult.success ? 'border-emerald-200 bg-emerald-50' : ''}>
                    <AlertDescription className={testResult.success ? 'text-emerald-800' : ''}>{testResult.message}</AlertDescription>
                  </Alert>
                )}

                <div className="rounded-xl bg-[#09bce4]/5 border border-[#09bce4]/15 p-4 text-sm text-[#0a2a4a]/80">
                  <p className="font-bold text-[#0a2a4a] mb-2">Cara mendapatkan Token Fonnte:</p>
                  <ol className="list-decimal list-inside space-y-1 text-gray-600">
                    <li>Daftar di <a href="https://fonnte.com" target="_blank" rel="noopener noreferrer" className="text-[#09bce4] underline">fonnte.com</a></li>
                    <li>Hubungkan nomor WhatsApp Anda (scan QR)</li>
                    <li>Salin Token dari halaman perangkat</li>
                  </ol>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="wa_token" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <Key className="h-4 w-4 text-[#09bce4]" /> Token Fonnte
                  </Label>
                  <Input id="wa_token" type="password" placeholder="Masukkan token dari Fonnte" value={settings.wa_fonnte_token} onChange={e => setSettings(s => ({ ...s, wa_fonnte_token: e.target.value }))} className="h-11" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="wa_admin" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <Phone className="h-4 w-4 text-[#09bce4]" /> Nomor WA Admin (Penerima Notifikasi)
                  </Label>
                  <Input id="wa_admin" type="tel" placeholder="Contoh: 628123456789" value={settings.wa_admin_number} onChange={e => setSettings(s => ({ ...s, wa_admin_number: e.target.value }))} className="h-11" />
                  <p className="text-xs text-gray-400">Format: 628xxx (tanpa tanda +)</p>
                </div>

                <div className="flex flex-wrap gap-3 pt-1">
                  <Button onClick={handleSave} disabled={isSaving} className="bg-[#09bce4] hover:bg-[#09bce4]/90 text-white">
                    {isSaving ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Menyimpan...</> : <><Save className="mr-2 h-4 w-4" />Simpan Token</>}
                  </Button>
                  <Button variant="outline" onClick={handleTestWA} disabled={isTestingWA || !isWAConfigured} className="border-gray-200 text-gray-600 hover:border-[#09bce4]/40 hover:text-[#0a2a4a]">
                    {isTestingWA ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Mengirim...</> : <><Send className="mr-2 h-4 w-4" />Kirim Pesan Test</>}
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </AdminAuthGuard>
  );
}
