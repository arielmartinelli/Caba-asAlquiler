'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, User, ShieldCheck, ArrowRight, Trees } from 'lucide-react';

export default function AdminLoginPage() {
 const router = useRouter();
 const [username, setUsername] = useState('');
 const [password, setPassword] = useState('');
 const [error, setError] = useState('');
 const [loading, setLoading] = useState(false);

 const handleLogin = async (e: React.FormEvent) => {
 e.preventDefault();
 setLoading(true);
 setError('');

 try {
 const res = await fetch('/api/admin/login', {
 method: 'POST',
 headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify({ username, password }),
 });

 const data = await res.json();

 if (!res.ok) {
 throw new Error(data.error || 'Credenciales incorrectas');
 }

 router.push('/admin/dashboard');
 } catch (err: any) {
 setError(err.message);
 } finally {
 setLoading(false);
 }
 };

 return (
 <div className="min-h-[75vh] flex items-center justify-center px-4 py-12 bg-slate-50">
 <div className="bg-white max-w-md w-full p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
 
 <div className="text-center space-y-3">
 <div className="w-12 h-12 rounded-2xl bg-rose-500 flex items-center justify-center mx-auto shadow-md">
 <Trees className="w-7 h-7 text-white fill-current" />
 </div>
 <h1 className="text-2xl font-extrabold text-slate-900">Acceso Propietarios</h1>
 <p className="text-xs text-slate-500">
 Ingresá tus credenciales para administrar precios, bloquear fechas y gestionar reservas.
 </p>
 </div>

 {error && (
 <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-xs font-semibold text-center">
 {error}
 </div>
 )}

 <form onSubmit={handleLogin} className="space-y-4">
 <div>
 <label className="block text-xs font-bold text-slate-700 mb-1">Usuario Admin</label>
 <div className="relative">
 <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
 <input
 type="text"
 required
 value={username}
 onChange={(e) => setUsername(e.target.value)}
 placeholder="admin"
 className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs focus:outline-none focus:border-rose-500"
 />
 </div>
 </div>

 <div>
 <label className="block text-xs font-bold text-slate-700 mb-1">Contraseña</label>
 <div className="relative">
 <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
 <input
 type="password"
 required
 value={password}
 onChange={(e) => setPassword(e.target.value)}
 placeholder="••••••••"
 className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs focus:outline-none focus:border-rose-500"
 />
 </div>
 </div>

 <button
 type="submit"
 disabled={loading}
 className="w-full py-3.5 px-4 rounded-full font-bold text-xs bg-rose-500 hover:bg-rose-600 text-white flex items-center justify-center gap-2 shadow-md transition-all"
 >
 {loading ? 'Iniciando sesión...' : 'Ingresar al Panel'}
 <ArrowRight className="w-4 h-4" />
 </button>
 </form>

 <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-500 text-center">
 Credenciales iniciales: <br />
 <span className="font-mono text-rose-500 font-bold">admin</span> / <span className="font-mono text-rose-500 font-bold">admin123</span>
 </div>

 </div>
 </div>
 );
}
