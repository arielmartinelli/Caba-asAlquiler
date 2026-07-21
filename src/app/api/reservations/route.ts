import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getAdminSession } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      cabinId,
      clientName,
      clientEmail,
      clientPhone,
      guestsCount,
      startDate,
      endDate,
      totalARS,
      totalUSD,
      notes,
    } = body;

    if (!cabinId || !clientName || !clientEmail || !clientPhone || !startDate || !endDate) {
      return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start >= end) {
      return NextResponse.json({ error: 'La fecha de check-out debe ser posterior a check-in' }, { status: 400 });
    }

    // Verify cabin exists
    const cabin = await db.cabin.findUnique({ where: { id: cabinId } });
    if (!cabin) {
      return NextResponse.json({ error: 'Cabaña no encontrada' }, { status: 404 });
    }

    // Check date overlap with APPROVED reservations
    const overlappingReservation = await db.reservation.findFirst({
      where: {
        cabinId,
        status: 'APPROVED',
        OR: [
          {
            startDate: { lte: end },
            endDate: { gte: start },
          },
        ],
      },
    });

    if (overlappingReservation) {
      return NextResponse.json({ error: 'Las fechas seleccionadas ya están reservadas' }, { status: 409 });
    }

    // Check overlap with BlockedDates
    const overlappingBlock = await db.blockedDate.findFirst({
      where: {
        cabinId,
        startDate: { lte: end },
        endDate: { gte: start },
      },
    });

    if (overlappingBlock) {
      return NextResponse.json({ error: 'Las fechas seleccionadas no están disponibles (Mantenimiento)' }, { status: 409 });
    }

    // Create reservation request in PENDING state
    const reservation = await db.reservation.create({
      data: {
        cabinId,
        clientName,
        clientEmail,
        clientPhone,
        guestsCount: Number(guestsCount) || 1,
        startDate: start,
        endDate: end,
        totalARS: Number(totalARS) || 0,
        totalUSD: Number(totalUSD) || 0,
        status: 'PENDING',
        notes: notes || '',
      },
      include: {
        cabin: true,
      },
    });

    return NextResponse.json(reservation, { status: 201 });
  } catch (error) {
    console.error('Error creating reservation:', error);
    return NextResponse.json({ error: 'Error interno al procesar solicitud' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const reservations = await db.reservation.findMany({
      include: {
        cabin: {
          select: {
            name: true,
            slug: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(reservations);
  } catch (error) {
    console.error('Error listing reservations:', error);
    return NextResponse.json({ error: 'Error al obtener reservas' }, { status: 500 });
  }
}
