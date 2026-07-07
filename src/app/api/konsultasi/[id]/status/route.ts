import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getUser } from '@/lib/auth';

export const runtime = 'nodejs';

const ALLOWED_ROLES = new Set(['ADMIN', 'ADMIN_KONSULTASI']);

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const auth = await getUser(request);
    if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    // Only admin and admin_konsultasi may change consultation status
    if (!ALLOWED_ROLES.has(auth.role)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { id } = await params;
    const { status } = await request.json();

    const validStatuses = ['MENUNGGU_PEMBAYARAN', 'PEMBAYARAN_DITERIMA'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: 'Status tidak valid' }, { status: 400 });
    }

    let nominal: number | undefined;
    if (status === 'PEMBAYARAN_DITERIMA') {
      const hargaSetting = await prisma.setting.findUnique({ where: { key: 'harga_konsultasi' } });
      if (hargaSetting?.value) {
        nominal = parseInt(hargaSetting.value, 10) || 0;
      }
    }

    const submission = await prisma.konsultasiSubmission.update({
      where: { id },
      data: { status, ...(nominal !== undefined ? { nominal } : {}) },
    });

    return NextResponse.json(submission);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Terjadi kesalahan server' }, { status: 500 });
  }
}
