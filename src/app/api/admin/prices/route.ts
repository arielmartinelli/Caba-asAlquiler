import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getAdminSession } from '@/lib/auth';

export async function PATCH(request: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const { cabinId, priceARS, priceUSD } = await request.json();

    if (!cabinId || priceARS === undefined || priceUSD === undefined) {
      return NextResponse.json({ error: 'Faltan parámetros de precio' }, { status: 400 });
    }

    const updated = await db.cabin.update({
      where: { id: cabinId },
      data: {
        priceARS: Number(priceARS),
        priceUSD: Number(priceUSD),
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating prices:', error);
    return NextResponse.json({ error: 'Error al actualizar precios' }, { status: 500 });
  }
}
