'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, CheckCircle, Mail, Send } from 'lucide-react';

type Status = 'idle' | 'sent' | 'mailto';

export default function ContactForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');
  const [form, setForm] = useState({ nama: '', email: '', subjek: '', pesan: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus('sent');
        setForm({ nama: '', email: '', subjek: '', pesan: '' });
        return;
      }

      // API returned an error — show it, do NOT open mailto automatically.
      const data = await res.json().catch(() => ({}));
      setError(data.error || 'Gagal mengirim pesan. Silakan coba lagi atau kirim email langsung.');
    } catch {
      // Network failure — offer mailto as a manual alternative but don't auto-trigger it.
      setError('Koneksi bermasalah. Klik tombol di bawah untuk mengirim pesan via email langsung.');
    } finally {
      setIsLoading(false);
    }
  };

  const openMailto = () => {
    const subject = encodeURIComponent(form.subjek || 'Pesan dari Website SEIIKI');
    const body = encodeURIComponent(
      `Nama: ${form.nama}\nEmail: ${form.email}\n\n${form.pesan}`
    );
    window.open(`mailto:pt.seyiki@gmail.com?subject=${subject}&body=${body}`);
    setStatus('mailto');
  };

  if (status === 'sent') {
    return (
      <div className="flex flex-col items-center justify-center text-center py-12 space-y-4">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900">Pesan Terkirim!</h3>
        <p className="text-gray-500 max-w-xs">
          Terima kasih telah menghubungi kami. Tim SEIIKI akan merespons dalam 1×24 jam kerja ke alamat email Anda.
        </p>
        <Button variant="outline" onClick={() => setStatus('idle')} className="mt-2">
          Kirim Pesan Lain
        </Button>
      </div>
    );
  }

  if (status === 'mailto') {
    return (
      <div className="flex flex-col items-center justify-center text-center py-12 space-y-4">
        <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center">
          <Mail className="h-8 w-8 text-blue-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900">Email Client Dibuka</h3>
        <p className="text-gray-500 max-w-xs">
          Silakan kirim email yang sudah terisi di aplikasi email Anda. Jika belum terkirim, Anda dapat menghubungi kami langsung di{' '}
          <a href="mailto:pt.seyiki@gmail.com" className="text-[#09bce4] underline font-medium">
            pt.seyiki@gmail.com
          </a>.
        </p>
        <Button variant="outline" onClick={() => { setStatus('idle'); setError(''); }} className="mt-2">
          Kembali ke Formulir
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertDescription className="space-y-2">
            <span>{error}</span>
            {error.includes('email langsung') && (
              <button
                type="button"
                onClick={openMailto}
                className="block text-sm underline font-semibold mt-1"
              >
                Kirim via Email Langsung →
              </button>
            )}
          </AlertDescription>
        </Alert>
      )}

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="nama" className="text-sm font-semibold text-gray-700">
            Nama Lengkap <span className="text-red-500">*</span>
          </Label>
          <Input
            id="nama"
            placeholder="Nama Anda"
            value={form.nama}
            onChange={e => setForm(f => ({ ...f, nama: e.target.value }))}
            required
            className="h-11"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
            Email <span className="text-red-500">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="email@anda.com"
            value={form.email}
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            required
            className="h-11"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="subjek" className="text-sm font-semibold text-gray-700">Subjek</Label>
        <Input
          id="subjek"
          placeholder="Perihal pesan Anda"
          value={form.subjek}
          onChange={e => setForm(f => ({ ...f, subjek: e.target.value }))}
          className="h-11"
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="pesan" className="text-sm font-semibold text-gray-700">
          Pesan <span className="text-red-500">*</span>
        </Label>
        <Textarea
          id="pesan"
          placeholder="Tuliskan pertanyaan atau kebutuhan Anda di sini..."
          rows={5}
          value={form.pesan}
          onChange={e => setForm(f => ({ ...f, pesan: e.target.value }))}
          required
          minLength={10}
        />
      </div>

      <Button
        type="submit"
        className="w-full h-12 bg-[#09bce4] hover:bg-[#09bce4]/90 text-white font-semibold"
        disabled={isLoading}
      >
        {isLoading ? (
          <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Mengirim...</>
        ) : (
          <><Send className="mr-2 h-4 w-4" />Kirim Pesan</>
        )}
      </Button>
    </form>
  );
}
