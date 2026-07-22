import { google } from 'googleapis';

const GOOGLE_CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL;
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
const GOOGLE_CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID;

function getCalendarClient() {
 if (!GOOGLE_CLIENT_EMAIL || !GOOGLE_PRIVATE_KEY || !GOOGLE_CALENDAR_ID) {
 return null;
 }

 const auth = new google.auth.JWT({
 email: GOOGLE_CLIENT_EMAIL,
 key: GOOGLE_PRIVATE_KEY,
 scopes: ['https://www.googleapis.com/auth/calendar'],
 });

 return google.calendar({ version: 'v3', auth });
}

export interface GCalEvent {
 id: string;
 summary: string;
 description?: string;
 start: string; // ISO date or YYYY-MM-DD
 end: string; // ISO date or YYYY-MM-DD
}

/**
 * Consulta eventos existentes en Google Calendar para bloquear fechas ocupadas
 */
export async function fetchGoogleCalendarEvents(timeMin: Date, timeMax: Date): Promise<GCalEvent[]> {
 const calendar = getCalendarClient();
 if (!calendar || !GOOGLE_CALENDAR_ID) {
 console.log('[Google Calendar API] Credenciales no configuradas. Usando sincronizador simulado.');
 return [];
 }

 try {
 const res = await calendar.events.list({
 calendarId: GOOGLE_CALENDAR_ID,
 timeMin: timeMin.toISOString(),
 timeMax: timeMax.toISOString(),
 singleEvents: true,
 orderBy: 'startTime',
 });

 const items = res.data.items || [];
 return items.map((item) => ({
 id: item.id || '',
 summary: item.summary || 'Reserva Externa (Google Calendar)',
 description: item.description || '',
 start: item.start?.date || item.start?.dateTime || '',
 end: item.end?.date || item.end?.dateTime || '',
 }));
 } catch (error) {
 console.error('[Google Calendar API Error] Error al listar eventos:', error);
 return [];
 }
}

/**
 * Crea un nuevo evento en Google Calendar al aprobar una reserva
 */
export async function createGoogleCalendarEvent(params: {
 cabinName: string;
 clientName: string;
 clientEmail: string;
 clientPhone: string;
 guestsCount: number;
 startDate: Date;
 endDate: Date;
 totalARS: number;
 totalUSD: number;
}): Promise<string | null> {
 const calendar = getCalendarClient();
 const summary = `Reserva Confirmada: ${params.cabinName} - ${params.clientName}`;
 const description = `
Cabaña: ${params.cabinName}
Cliente: ${params.clientName}
Email: ${params.clientEmail}
Teléfono: ${params.clientPhone}
Huéspedes: ${params.guestsCount}
Monto Total: $${params.totalARS.toLocaleString('es-AR')} ARS / US$${params.totalUSD} USD
Check-in: ${params.startDate.toLocaleDateString('es-AR')}
Check-out: ${params.endDate.toLocaleDateString('es-AR')}
 `.trim();

 if (!calendar || !GOOGLE_CALENDAR_ID) {
 console.log('[Google Calendar API Mock] Evento simulado exitosamente:', summary);
 return `mock-gcal-evt-${Date.now()}`;
 }

 try {
 // Google Calendar 'date' end is exclusive for all-day events
 const startDateStr = params.startDate.toISOString().split('T')[0];
 const endDateStr = params.endDate.toISOString().split('T')[0];

 const eventRes = await calendar.events.insert({
 calendarId: GOOGLE_CALENDAR_ID,
 requestBody: {
 summary,
 description,
 start: { date: startDateStr },
 end: { date: endDateStr },
 colorId: '10', // Verde bosque en Google Calendar
 },
 });

 console.log('[Google Calendar API] Evento creado:', eventRes.data.id);
 return eventRes.data.id || null;
 } catch (error) {
 console.error('[Google Calendar API Error] Error al crear evento:', error);
 return `fallback-evt-${Date.now()}`;
 }
}

/**
 * Elimina un evento de Google Calendar si se cancela una reserva
 */
export async function deleteGoogleCalendarEvent(eventId: string): Promise<boolean> {
 if (eventId.startsWith('mock-') || eventId.startsWith('fallback-')) {
 console.log('[Google Calendar API Mock] Eliminación de evento simulado:', eventId);
 return true;
 }

 const calendar = getCalendarClient();
 if (!calendar || !GOOGLE_CALENDAR_ID) return false;

 try {
 await calendar.events.delete({
 calendarId: GOOGLE_CALENDAR_ID,
 eventId,
 });
 console.log('[Google Calendar API] Evento eliminado:', eventId);
 return true;
 } catch (error) {
 console.error('[Google Calendar API Error] Error al eliminar evento:', error);
 return false;
 }
}
