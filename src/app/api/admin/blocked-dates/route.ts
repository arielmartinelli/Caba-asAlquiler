import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getAdminSession } from '@/lib/auth';

export async function GET() {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const blocked = await db.blockedDate.findMany({
      include: { cabin: { select: { name: true, slug: true } } },
      orderBy: { startDate: 'desc' },
    });

    return NextResponse.json(blocked);
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener fechas bloqueadas' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const { cabinId, startDate, endDate, reason } = await request.json();

    if (!cabinId || !startDate || !endDate) {
      return NextResponse.json({ error: 'Campos requeridos faltantes' }, { status: 400 });
    }

    const created = await db.blockedDate.create({
      data: {
        cabinId,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        reason: reason || 'Bloqueo Manual / Mantenimiento',
      },
      include: { cabin: true },
    });

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error('Error creating blocked date:', error);
    return NextResponse.json({ error: 'Error al crear bloqueo de fecha' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID no proporcionado' }, { status: 400 });
    }

    await db.blockedDate.delete({ where: { id } });
    return NextResponse.json({ success: true, message: 'Bloqueo eliminado' });
  } catch (error) {
    return NextResponse.json({ error: 'Error al eliminar bloqueo' }, { status: 500 });
  }
}
