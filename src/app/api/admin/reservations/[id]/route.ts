import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getAdminSession } from '@/lib/auth';
import { createGoogleCalendarEvent, deleteGoogleCalendarEvent } from '@/lib/gcal';

export async function PATCH(
 request: NextRequest,
 { params }: { params: { id: string } }
) {
 try {
 const session = await getAdminSession();
 if (!session) {
 return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
 }

 const { status } = await request.json();

 if (!['APPROVED', 'REJECTED', 'CANCELLED', 'PENDING'].includes(status)) {
 return NextResponse.json({ error: 'Estado no válido' }, { status: 400 });
 }

 const reservation = await db.reservation.findUnique({
 where: { id: params.id },
 include: { cabin: true },
 });

 if (!reservation) {
 return NextResponse.json({ error: 'Reserva no encontrada' }, { status: 404 });
 }

 let gcalEventId = reservation.gcalEventId;

 // Handle Google Calendar sync on status change
 if (status === 'APPROVED' && reservation.status !== 'APPROVED') {
 // Create Google Calendar Event
 gcalEventId = await createGoogleCalendarEvent({
 cabinName: reservation.cabin.name,
 clientName: reservation.clientName,
 clientEmail: reservation.clientEmail,
 clientPhone: reservation.clientPhone,
 guestsCount: reservation.guestsCount,
 startDate: reservation.startDate,
 endDate: reservation.endDate,
 totalARS: reservation.totalARS,
 totalUSD: reservation.totalUSD,
 });
 } else if ((status === 'CANCELLED' || status === 'REJECTED') && reservation.gcalEventId) {
 // Delete Google Calendar Event
 await deleteGoogleCalendarEvent(reservation.gcalEventId);
 gcalEventId = null;
 }

 const updated = await db.reservation.update({
 where: { id: params.id },
 data: {
 status,
 gcalEventId,
 },
 include: { cabin: true },
 });

 return NextResponse.json(updated);
 } catch (error) {
 console.error('Error updating reservation:', error);
 return NextResponse.json({ error: 'Error al actualizar reserva' }, { status: 500 });
 }
}
