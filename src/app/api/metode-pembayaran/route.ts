import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getUser } from '@/lib/auth';
import { z } from 'zod';

export const runtime = 'nodejs';

const schema = z.object({
  namaBank: z.string().min(1),
  nomorRekening: z.string().min(1),
  namaPemilik: z.string().min(1),
  deskripsi: z.string().optional(),
  isActive: z.boolean().optional().default(true),
  order: z.number().optional().default(0),
});

export async function GET() {
  try {
    const methods = await prisma.metodePembayaran.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    });
    return NextResponse.json(methods);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Terjadi kesalahan server' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getUser(request);
    if (!user || (user.role !== 'ADMIN' && user.role !== 'ADMIN_KONSULTASI')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const body = await request.json();
    const data = schema.parse(body);
    const method = await prisma.metodePembayaran.create({ data });
    return NextResponse.json(method, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 });
    }
    console.error(error);
    return NextResponse.json({ error: 'Terjadi kesalahan server' }, { status: 500 });
  }
}
