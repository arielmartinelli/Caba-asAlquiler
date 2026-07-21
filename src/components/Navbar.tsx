'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Trees, MapPin, UserCheck, Menu, X, PhoneCall } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 glass-card border-b border-white/10 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-xl gradient-emerald flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
              <Trees className="w-7 h-7 text-amber-400" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-white block group-hover:text-amber-400 transition-colors">
                Cabañas Calamuchita
              </span>
              <span className="text-xs text-amber-400 flex items-center gap-1 font-medium">
                <MapPin className="w-3 h-3" /> Santa Rosa de Calamuchita
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
              Inicio & Cabañas
            </Link>
            <a href="#catalogo" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
              Nuestras 3 Cabañas
            </a>
            <a href="#ubicacion" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
              Ubicación & Entorno
            </a>

            {/* Direct WhatsApp Contact Button */}
            <a
              href="https://wa.me/5493546000000?text=Hola!%20Quisiera%20consultar%20por%20alquiler%20de%20caba%C3%B1as%20en%20Santa%20Rosa%20de%20Calamuchita"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg transition-all hover:scale-105"
            >
              <PhoneCall className="w-4 h-4" /> Consultar WhatsApp
            </a>

            {/* Admin Login Link */}
            <Link
              href="/admin/login"
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-amber-400 transition-colors border border-white/10 px-3 py-2 rounded-lg"
              title="Acceso Administración"
            >
              <UserCheck className="w-4 h-4" /> Admin
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-card border-t border-white/10 px-4 pt-4 pb-6 space-y-3">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-slate-200 hover:text-amber-400"
          >
            Inicio & Cabañas
          </Link>
          <a
            href="#catalogo"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-slate-200 hover:text-amber-400"
          >
            Nuestras Cabañas
          </a>
          <a
            href="https://wa.me/5493546000000?text=Hola!%20Consulta%20por%20caba%C3%B1as"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center py-2.5 rounded-xl font-bold bg-emerald-600 text-white"
          >
            Contactar por WhatsApp
          </a>
          <Link
            href="/admin/login"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-center py-2 rounded-xl text-xs text-amber-400 border border-amber-400/30"
          >
            Panel de Administración
          </Link>
        </div>
      )}
    </nav>
  );
}
