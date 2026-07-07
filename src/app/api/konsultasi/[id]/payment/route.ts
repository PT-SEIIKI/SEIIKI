import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { notifyPaymentReceived } from '@/lib/whatsapp';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

export const runtime = 'nodejs';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const ALLOWED_MIME = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'application/pdf']);

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    // Verify submission exists and is still awaiting payment
    // This prevents tampering with already-processed or non-existent submissions
    const existing = await prisma.konsultasiSubmission.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: 'Pengajuan tidak ditemukan' }, { status: 404 });
    }
    if (existing.status !== 'MENUNGGU_PEMBAYARAN') {
      return NextResponse.json(
        { error: 'Pengajuan sudah diproses, bukti pembayaran tidak dapat diubah' },
        { status: 409 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'File tidak ditemukan' }, { status: 400 });
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: 'Ukuran file maksimal 5 MB' }, { status: 400 });
    }

    // Validate MIME type
    if (!ALLOWED_MIME.has(file.type)) {
      return NextResponse.json({ error: 'Tipe file tidak diizinkan' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDir = join(process.cwd(), 'uploads', 'payments');
    await mkdir(uploadDir, { recursive: true });

    const safeOriginalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_').slice(0, 100);
    const filename = `${id}-${Date.now()}-${safeOriginalName}`;
    const filepath = join(uploadDir, filename);
    await writeFile(filepath, buffer);

    const paymentProofUrl = `/uploads/payments/${filename}`;

    const submission = await prisma.konsultasiSubmission.update({
      where: { id },
      data: { paymentProofUrl },
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
