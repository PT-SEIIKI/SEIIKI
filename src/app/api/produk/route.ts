import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getUser } from '@/lib/auth';

export async function GET() {
  try {
    const produk = await prisma.produk.findMany({
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
    });
    return NextResponse.json(produk);
  } catch (error) {
    console.error('Error fetching produk:', error);
    return NextResponse.json({ error: 'Gagal mengambil data produk' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getUser(req);
    if (!user || !['ADMIN', 'ADMIN_KONSULTASI'].includes(user.role)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { nama, harga, deskripsi, kategori, imageUrl, isActive, order } = body;

    if (!nama || harga === undefined || !deskripsi) {
      return NextResponse.json({ error: 'Nama, harga, dan deskripsi wajib diisi' }, { status: 400 });
    }

    const produk = await prisma.produk.create({
      data: {
        nama,
        harga: Number(harga),
        deskripsi,
        kategori: kategori || null,
        imageUrl: imageUrl || null,
        isActive: isActive !== undefined ? Boolean(isActive) : true,
        order: order !== undefined ? Number(order) : 0,
      },
    });

    return NextResponse.json(produk, { status: 201 });
  } catch (error) {
    console.error('Error creating produk:', error);
    return NextResponse.json({ error: 'Gagal menambahkan produk' }, { status: 500 });
  }
}
