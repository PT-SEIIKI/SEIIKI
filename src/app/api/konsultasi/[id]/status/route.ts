import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyAuth } from '@/lib/auth';

export const runtime = 'nodejs';

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const auth = await verifyAuth(request);
    if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id } = await params;
    const { status } = await request.json();

    const validStatuses = ['MENUNGGU_PEMBAYARAN', 'PEMBAYARAN_DITERIMA', 'SELESAI'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: 'Status tidak valid' }, { status: 400 });
    }

    const submission = await prisma.konsultasiSubmission.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json(submission);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Terjadi kesalahan server' }, { status: 500 });
  }
}
