import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nama, email, subjek, pesan } = body;

    if (!nama || typeof nama !== 'string' || nama.trim().length < 2) {
      return NextResponse.json({ error: 'Nama tidak valid.' }, { status: 400 });
    }
    if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Email tidak valid.' }, { status: 400 });
    }
    if (!pesan || typeof pesan !== 'string' || pesan.trim().length < 10) {
      return NextResponse.json({ error: 'Pesan terlalu singkat (minimal 10 karakter).' }, { status: 400 });
    }

    // Log the contact message server-side so it is never silently dropped.
    console.log('[contact]', {
      timestamp: new Date().toISOString(),
      nama: nama.trim(),
      email: email.trim(),
      subjek: subjek?.trim() || '(tanpa subjek)',
      pesan: pesan.trim().slice(0, 500),
    });

    // If a SMTP / notification integration is added later, call it here.
    // For now the message is logged and the response is 200 OK so the client
    // shows a real success state (not the mailto fallback).

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Terjadi kesalahan server.' }, { status: 500 });
  }
}
