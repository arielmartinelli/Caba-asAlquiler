'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Trees, MapPin, UserCheck, Menu, X, PhoneCall, Search } from 'lucide-react';
import WeatherWidget from './WeatherWidget';

export default function Navbar() {
 const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

 return (
 <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-slate-200 shadow-sm transition-colors duration-300">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 <div className="flex items-center justify-between h-20">
 
 {/* Brand Logo */}
 <Link href="/" className="flex items-center gap-3 group">
 <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-500 to-pink-500 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
 <Trees className="w-5 h-5 fill-current" />
 </div>
 <div>
 <span className="text-xl font-extrabold tracking-tight text-slate-950 block leading-tight">
 cabañas<span className="text-rose-500">calamuchita</span>
 </span>
 <span className="text-[11px] text-slate-600 flex items-center gap-1 font-medium">
 <MapPin className="w-3 h-3 text-rose-500" /> Santa Rosa de Calamuchita
 </span>
 </div>
 </Link>

 {/* Floating Search Pill */}
 <div className="hidden md:flex items-center gap-2 airbnb-search-pill px-5 py-2.5 text-xs font-semibold text-slate-800">
 <a href="#catalogo" className="px-3 py-1 hover:text-rose-500 transition-colors font-bold">
 Nuestras Cabañas
 </a>
 <span className="text-slate-300">•</span>
 <a href="#ubicacion" className="px-3 py-1 hover:text-rose-500 transition-colors">
 Ubicación
 </a>
 <span className="text-slate-300">•</span>
 <a href="#faq" className="px-3 py-1 hover:text-rose-500 transition-colors">
 Preguntas
 </a>
 <div className="w-7 h-7 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-xs ml-2">
 <Search className="w-3.5 h-3.5" />
 </div>
 </div>

 {/* Right Menu Controls */}
 <div className="hidden md:flex items-center gap-3">
 
 {/* Weather Badge */}
 <WeatherWidget />

 {/* Direct WhatsApp Contact Button */}
 <a
 href="https://wa.me/5493546000000?text=Hola!%20Quisiera%20consultar%20por%20alquiler%20de%20caba%C3%B1as%20en%20Santa%20Rosa%20de%20Calamuchita"
 target="_blank"
 rel="noopener noreferrer"
 className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold btn-airbnb shadow-md"
 >
 <PhoneCall className="w-3.5 h-3.5" /> Consultar
 </a>

 {/* Admin Login Button */}
 <Link
 href="/admin/login"
 className="p-2.5 rounded-full text-slate-600 hover:bg-slate-100 border border-slate-200 transition-all"
 title="Acceso Administración"
 >
 <UserCheck className="w-4 h-4" />
 </Link>
 </div>

 {/* Mobile Controls */}
 <div className="md:hidden flex items-center gap-2">
 <button
 onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
 className="p-2 rounded-full text-slate-800 hover:bg-slate-100 border border-slate-200"
 >
 {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
 </button>
 </div>
 </div>
 </div>

 {/* Mobile Menu Dropdown */}
 {mobileMenuOpen && (
 <div className="md:hidden bg-white border-t border-slate-200 px-6 pt-4 pb-6 space-y-4 shadow-xl">
 <Link
 href="/"
 onClick={() => setMobileMenuOpen(false)}
 className="block text-base font-bold text-slate-950 hover:text-rose-500"
 >
 Inicio & Cabañas
 </Link>
 <a
 href="#catalogo"
 onClick={() => setMobileMenuOpen(false)}
 className="block text-base font-bold text-slate-950 hover:text-rose-500"
 >
 Nuestras 3 Cabañas
 </a>
 <a
 href="#ubicacion"
 onClick={() => setMobileMenuOpen(false)}
 className="block text-base font-bold text-slate-950 hover:text-rose-500"
 >
 Ubicación & Mapa
 </a>
 <a
 href="https://wa.me/5493546000000?text=Hola!%20Consulta%20por%20caba%C3%B1as"
 target="_blank"
 rel="noopener noreferrer"
 className="block text-center py-3 rounded-full font-bold btn-airbnb shadow-md"
 >
 Contactar por WhatsApp
 </a>
 <Link
 href="/admin/login"
 onClick={() => setMobileMenuOpen(false)}
 className="block text-center py-2.5 rounded-full text-xs font-bold text-slate-800 border border-slate-300"
 >
 Panel Propietario / Admin
 </Link>
 </div>
 )}
 </header>
 );
}
