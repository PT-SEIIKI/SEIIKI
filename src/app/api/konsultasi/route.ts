import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getUser } from '@/lib/auth';
import { z } from 'zod';

export const runtime = 'nodejs';

const submitSchema = z.object({
  nama: z.string().min(1),
  noWhatsapp: z.string().min(1),
  latitude: z.number(),
  longitude: z.number(),
  alamatLokasi: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = submitSchema.parse(body);
    const submission = await prisma.konsultasiSubmission.create({ data });
    return NextResponse.json(submission, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 });
    }
    console.error(error);
    return NextResponse.json({ error: 'Terjadi kesalahan server' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const user = await getUser(request);
    if (!user || (user.role !== 'ADMIN' && user.role !== 'ADMIN_KONSULTASI')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const submissions = await prisma.konsultasiSubmission.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(submissions);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Terjadi kesalahan server' }, { status: 500 });
  }
}
