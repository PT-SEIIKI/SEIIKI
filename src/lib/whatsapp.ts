import { prisma } from '@/lib/db';

export async function getSetting(key: string): Promise<string | null> {
  try {
    const s = await prisma.setting.findUnique({ where: { key } });
    return s?.value ?? null;
  } catch {
    return null;
  }
}

export async function sendWhatsAppNotification(opts: {
  targetNumber: string;
  message: string;
}): Promise<boolean> {
  try {
    const token = await getSetting('wa_fonnte_token');
    if (!token) {
      console.warn('[WA] Fonnte token belum dikonfigurasi');
      return false;
    }

    const res = await fetch('https://api.fonnte.com/send', {
      method: 'POST',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        target: opts.targetNumber,
        message: opts.message,
        countryCode: '62',
      }),
    });

    const data = await res.json();
    if (!res.ok || !data.status) {
      console.error('[WA] Gagal kirim pesan:', data);
      return false;
    }
    return true;
  } catch (err) {
    console.error('[WA] Error kirim pesan:', err);
    return false;
  }
}

export async function notifyPaymentReceived(submission: {
  id: string;
  nama: string;
  noWhatsapp: string;
  alamatLokasi: string | null;
  latitude: number;
  longitude: number;
}): Promise<void> {
  const adminNumber = await getSetting('wa_admin_number');
  if (!adminNumber) {
    console.warn('[WA] Nomor admin belum dikonfigurasi');
    return;
  }

  const lokasi = submission.alamatLokasi || `${submission.latitude.toFixed(6)}, ${submission.longitude.toFixed(6)}`;
  const mapsLink = `https://maps.google.com/?q=${submission.latitude},${submission.longitude}`;

  const message =
    `🔔 *PEMBAYARAN DITERIMA - Konsultasi SEIIKI*\n\n` +
    `👤 *Nama:* ${submission.nama}\n` +
    `📱 *WhatsApp:* ${submission.noWhatsapp}\n` +
    `📍 *Lokasi:* ${lokasi}\n` +
    `🗺️ *Maps:* ${mapsLink}\n` +
    `🆔 *ID:* ${submission.id}\n\n` +
    `Segera tindak lanjuti konsultasi ini.`;

  await sendWhatsAppNotification({
    targetNumber: adminNumber,
    message,
  });
}
