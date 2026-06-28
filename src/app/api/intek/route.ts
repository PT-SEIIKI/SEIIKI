import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getUser } from '@/lib/auth';
import { z } from 'zod';

export const runtime = 'nodejs';

const submitSchema = z.object({
  namaInstalasi: z.string().min(1),
  dayaTerpasang: z.string().min(1),
  alamat: z.string().min(1),
  noHp: z.string().min(1),
  tanggalMulai: z.string().min(1),
  tenagaTeknikLapangan: z.string().min(1),
  tenagaTeknikSistem: z.string().min(1),
  jenisProject: z.string().min(1),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = submitSchema.parse(body);
    const submission = await prisma.intekSubmission.create({
      data: {
        ...data,
        tanggalMulai: new Date(data.tanggalMulai),
      },
    });
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
    if (!user || (user.role !== 'ADMIN' && user.role !== 'ADMIN_INTEK')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const submissions = await prisma.intekSubmission.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(submissions);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Terjadi kesalahan server' }, { status: 500 });
  }
}
