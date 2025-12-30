import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { checkAdminAuth, unauthorizedResponse } from '@/lib/auth';

export async function GET() {
  try {
    const result = await query('SELECT * FROM images ORDER BY created_at DESC');
    return NextResponse.json(result.rows);
  } catch (error) {
    return NextResponse.json([]);
  }
}

export async function POST(request: NextRequest) {
  if (!checkAdminAuth(request)) return unauthorizedResponse();
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const altText = formData.get('alt_text') as string || '';

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const uint8Array = new Uint8Array(bytes);

    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    await mkdir(uploadDir, { recursive: true });

    const uniqueName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    const filePath = path.join(uploadDir, uniqueName);
    await writeFile(filePath, uint8Array);

    const url = `/uploads/${uniqueName}`;
    const result = await query(
      'INSERT INTO images (name, url, alt_text) VALUES ($1, $2, $3) RETURNING *',
      [file.name, url, altText]
    );

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  if (!checkAdminAuth(request)) return unauthorizedResponse();
  try {
    const { id } = await request.json();
    await query('DELETE FROM images WHERE id = $1', [id]);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
