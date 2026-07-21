import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getAdminSession } from '@/lib/auth';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const { images, baseCurrency, priceARS, priceUSD } = await request.json();

    const updateData: any = {};

    if (images !== undefined) {
      updateData.images = JSON.stringify(images);
    }
    if (baseCurrency !== undefined) {
      updateData.baseCurrency = baseCurrency;
    }
    if (priceARS !== undefined) {
      updateData.priceARS = Number(priceARS);
    }
    if (priceUSD !== undefined) {
      updateData.priceUSD = Number(priceUSD);
    }

    const updated = await db.cabin.update({
      where: { id: params.id },
      data: updateData,
    });

    return NextResponse.json({
      ...updated,
      images: JSON.parse(updated.images || '[]'),
    });
  } catch (error) {
    console.error('Error updating cabin settings:', error);
    return NextResponse.json({ error: 'Error al actualizar configuración de la cabaña' }, { status: 500 });
  }
}
