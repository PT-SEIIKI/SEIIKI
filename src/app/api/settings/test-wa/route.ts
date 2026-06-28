import { NextRequest, NextResponse } from 'next/server';
import { getUser } from '@/lib/auth';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const user = await getUser(request);
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { wa_fonnte_token, wa_admin_number } = await request.json();

    if (!wa_fonnte_token || !wa_admin_number) {
      return NextResponse.json({ success: false, message: 'Token dan nomor admin harus diisi' }, { status: 400 });
    }

    const message =
      `✅ *Test Notifikasi SEIIKI*\n\n` +
      `Konfigurasi WhatsApp berhasil!\n` +
      `Notifikasi pembayaran konsultasi akan dikirim ke nomor ini secara otomatis.\n\n` +
      `_Pesan ini dikirim dari sistem SEIIKI._`;

    const res = await fetch('https://api.fonnte.com/send', {
      method: 'POST',
      headers: {
        Authorization: wa_fonnte_token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        target: wa_admin_number,
        message,
        countryCode: '62',
      }),
    });

    const data = await res.json();

    if (!res.ok || !data.status) {
      return NextResponse.json({
        success: false,
        message: `Gagal kirim pesan: ${data.reason || data.message || 'Periksa token dan nomor'}`,
      });
    }

    return NextResponse.json({ success: true, message: 'Pesan test berhasil dikirim ke WhatsApp admin!' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: 'Terjadi kesalahan server' }, { status: 500 });
  }
}
