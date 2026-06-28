import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { notifyPaymentReceived } from '@/lib/whatsapp';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

export const runtime = 'nodejs';

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'File tidak ditemukan' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDir = join(process.cwd(), 'uploads', 'payments');
    await mkdir(uploadDir, { recursive: true });

    const filename = `${id}-${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    const filepath = join(uploadDir, filename);
    await writeFile(filepath, buffer);

    const paymentProofUrl = `/uploads/payments/${filename}`;

    const submission = await prisma.konsultasiSubmission.update({
      where: { id },
      data: { paymentProofUrl, status: 'PEMBAYARAN_DITERIMA' },
    });

    // Kirim notifikasi WhatsApp ke admin (non-blocking)
    notifyPaymentReceived(submission).catch((err) =>
      console.error('[WA] Notifikasi gagal:', err)
    );

    return NextResponse.json(submission);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Terjadi kesalahan server' }, { status: 500 });
  }
}
