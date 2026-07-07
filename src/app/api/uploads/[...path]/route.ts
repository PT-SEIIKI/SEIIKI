import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { join, resolve } from 'path';

export const runtime = 'nodejs';

const ALLOWED_EXTENSIONS = new Set(['jpg', 'jpeg', 'png', 'gif', 'webp', 'pdf']);

export async function GET(_request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  try {
    const { path } = await params;
    const uploadsRoot = resolve(process.cwd(), 'uploads');
    const filePath = resolve(uploadsRoot, ...path);

    // Prevent path traversal: ensure resolved path is inside uploads dir
    if (!filePath.startsWith(uploadsRoot + '/') && filePath !== uploadsRoot) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

    const ext = path[path.length - 1].split('.').pop()?.toLowerCase() ?? '';
    if (!ALLOWED_EXTENSIONS.has(ext)) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

    const file = await readFile(filePath);
    const contentTypeMap: Record<string, string> = {
      jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png',
      gif: 'image/gif', webp: 'image/webp', pdf: 'application/pdf',
    };
    const contentType = contentTypeMap[ext] || 'application/octet-stream';
    return new NextResponse(file, { headers: { 'Content-Type': contentType } });
  } catch {
    return NextResponse.json({ error: 'File not found' }, { status: 404 });
  }
}
