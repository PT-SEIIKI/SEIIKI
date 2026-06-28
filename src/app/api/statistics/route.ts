import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const statistics = await prisma.statistics.findMany({
      orderBy: { order: 'asc' },
    });
    return NextResponse.json(statistics);
  } catch (error) {
    console.error('Error fetching statistics:', error);
    return NextResponse.json([], { status: 200 });
  }
}
