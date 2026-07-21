import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { fetchGoogleCalendarEvents } from '@/lib/gcal';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const cabin = await db.cabin.findUnique({
      where: { slug: params.slug },
      include: {
        reservations: {
          where: {
            status: { in: ['APPROVED', 'PENDING'] },
          },
          select: {
            id: true,
            startDate: true,
            endDate: true,
            status: true,
          },
        },
        blockedDates: {
          select: {
            id: true,
            startDate: true,
            endDate: true,
            reason: true,
          },
        },
      },
    });

    if (!cabin) {
      return NextResponse.json({ error: 'Cabaña no encontrada' }, { status: 404 });
    }

    // Fetch Google Calendar events for the next 12 months to sync blocked dates
    const now = new Date();
    const futureLimit = new Date();
    futureLimit.setFullYear(now.getFullYear() + 1);

    const gcalEvents = await fetchGoogleCalendarEvents(now, futureLimit);

    const formattedCabin = {
      ...cabin,
      amenities: JSON.parse(cabin.amenities || '[]'),
      nearPoints: JSON.parse(cabin.nearPoints || '[]'),
      farPoints: JSON.parse(cabin.farPoints || '[]'),
      images: JSON.parse(cabin.images || '[]'),
      gcalEvents,
    };

    return NextResponse.json(formattedCabin);
  } catch (error) {
    console.error('Error fetching cabin detail:', error);
    return NextResponse.json({ error: 'Error al obtener detalle de cabaña' }, { status: 500 });
  }
}
