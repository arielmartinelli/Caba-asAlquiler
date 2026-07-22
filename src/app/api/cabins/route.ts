import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
 try {
 const cabins = await db.cabin.findMany({
 orderBy: { capacity: 'asc' },
 });

 const formattedCabins = cabins.map((c) => ({
 ...c,
 amenities: JSON.parse(c.amenities || '[]'),
 nearPoints: JSON.parse(c.nearPoints || '[]'),
 farPoints: JSON.parse(c.farPoints || '[]'),
 images: JSON.parse(c.images || '[]'),
 }));

 return NextResponse.json(formattedCabins);
 } catch (error) {
 console.error('Error fetching cabins:', error);
 return NextResponse.json({ error: 'Error al obtener cabañas' }, { status: 500 });
 }
}
