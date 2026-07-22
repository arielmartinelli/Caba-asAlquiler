import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/auth';
import { db } from '@/lib/db';

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
    const base64Data = buffer.toString('base64');
    const mimeType = file.type || 'image/jpeg';

    // Store in Neon Postgres
    const storedImage = await db.storedImage.create({
      data: {
        data: base64Data,
        mimeType: mimeType,
      },
    });

    const imageUrl = `/api/images/${storedImage.id}`;

    return NextResponse.json({
      success: true,
      imageUrl,
      filename: file.name,
    });
  } catch (error) {
    console.error('Error uploading photo:', error);
    return NextResponse.json({ error: 'Error al guardar la imagen en la base de datos' }, { status: 500 });
  }
}
