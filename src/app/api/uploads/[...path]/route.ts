import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { join } from 'path';

export const runtime = 'nodejs';

export async function GET(_request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  try {
    const { path } = await params;
    const filePath = join(process.cwd(), 'uploads', ...path);
    const file = await readFile(filePath);
    const ext = path[path.length - 1].split('.').pop()?.toLowerCase();
    const contentTypeMap: Record<string, string> = {
      jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png',
      gif: 'image/gif', webp: 'image/webp', pdf: 'application/pdf',
    };
    const contentType = contentTypeMap[ext || ''] || 'application/octet-stream';
    return new NextResponse(file, { headers: { 'Content-Type': contentType } });
  } catch {
    return NextResponse.json({ error: 'File not found' }, { status: 404 });
  }
}
