import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';
import { signAdminToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
 try {
 const { username, password } = await request.json();

 if (!username || !password) {
 return NextResponse.json({ error: 'Usuario y contraseña son requeridos' }, { status: 400 });
 }

 const admin = await db.adminUser.findUnique({
 where: { username },
 });

 if (!admin) {
 return NextResponse.json({ error: 'Credenciales inválidas' }, { status: 401 });
 }

 const isMatch = await bcrypt.compare(password, admin.password);
 if (!isMatch) {
 return NextResponse.json({ error: 'Credenciales inválidas' }, { status: 401 });
 }

 const token = signAdminToken({
 userId: admin.id,
 username: admin.username,
 });

 const response = NextResponse.json({
 success: true,
 message: 'Login exitoso',
 user: { username: admin.username },
 });

 response.cookies.set('admin_token', token, {
 httpOnly: true,
 secure: process.env.NODE_ENV === 'production',
 sameSite: 'lax',
 maxAge: 60 * 60 * 24 * 7, // 7 días
 path: '/',
 });

 return response;
 } catch (error) {
 console.error('Error on admin login:', error);
 return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
 }
}

export async function DELETE() {
 const response = NextResponse.json({ success: true, message: 'Sesión cerrada' });
 response.cookies.delete('admin_token');
 return response;
}
