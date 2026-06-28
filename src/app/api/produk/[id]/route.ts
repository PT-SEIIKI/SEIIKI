import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getUser } from '@/lib/auth';

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await getUser(req);
    if (!user || !['ADMIN', 'ADMIN_KONSULTASI'].includes(user.role)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();
    const { nama, harga, deskripsi, kategori, imageUrl, isActive, order } = body;

    if (!nama || harga === undefined || !deskripsi) {
      return NextResponse.json({ error: 'Nama, harga, dan deskripsi wajib diisi' }, { status: 400 });
    }

    const produk = await prisma.produk.update({
      where: { id },
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

    return NextResponse.json(produk);
  } catch (error) {
    console.error('Error updating produk:', error);
    return NextResponse.json({ error: 'Gagal mengupdate produk' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await getUser(req);
    if (!user || !['ADMIN', 'ADMIN_KONSULTASI'].includes(user.role)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    await prisma.produk.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting produk:', error);
    return NextResponse.json({ error: 'Gagal menghapus produk' }, { status: 500 });
  }
}
