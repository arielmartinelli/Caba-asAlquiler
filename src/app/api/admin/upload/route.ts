import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/auth';
import fs from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
 try {
 const session = await getAdminSession();
 if (!session) {
 return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
 }

 const formData = await request.formData();
 const file = formData.get('file') as File | null;
 const cabinId = formData.get('cabinId') as string | null;

 if (!file) {
 return NextResponse.json({ error: 'No se envió ningún archivo' }, { status: 400 });
 }

 const bytes = await file.arrayBuffer();
 const buffer = Buffer.from(bytes);

 const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
 if (!fs.existsSync(uploadsDir)) {
 fs.mkdirSync(uploadsDir, { recursive: true });
 }

 const ext = path.extname(file.name) || '.jpg';
 const filename = `cabin_${Date.now()}_${Math.random().toString(36).substring(7)}${ext}`;
 const filePath = path.join(uploadsDir, filename);

 fs.writeFileSync(filePath, buffer);

 const imageUrl = `/uploads/${filename}`;

 return NextResponse.json({
 success: true,
 imageUrl,
 filename,
 });
 } catch (error) {
 console.error('Error uploading photo:', error);
 return NextResponse.json({ error: 'Error al subir la imagen' }, { status: 500 });
 }
}
