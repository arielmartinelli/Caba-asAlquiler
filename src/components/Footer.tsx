'use client';

import React from 'react';
import { Trees, MapPin, Phone, Mail, Calendar, ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-emerald-950/60 border-t border-white/10 mt-24 pt-16 pb-12 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg gradient-forest flex items-center justify-center">
                <Trees className="w-6 h-6 text-emerald-400" />
              </div>
              <span className="text-lg font-bold text-white">Cabañas Calamuchita</span>
            </div>
            <p className="text-xs leading-relaxed text-slate-400">
              Complejo de cabañas de alquiler en Santa Rosa de Calamuchita, Córdoba, Argentina. Disfrutá del río, la montaña y la serenidad de las sierras.
            </p>
          </div>

          {/* Col 2: Capacidades */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Cabañas Disponibles</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="/cabanas/sendero-de-montana" className="hover:text-emerald-400 transition-colors">
                  🌲 Cabaña Sendero (Hasta 5 pers.)
                </a>
              </li>
              <li>
                <a href="/cabanas/orilla-del-rio" className="hover:text-emerald-400 transition-colors">
                  🌊 Cabaña Orilla del Río (Hasta 7 pers.)
                </a>
              </li>
              <li>
                <a href="/cabanas/gran-cumbres" className="hover:text-emerald-400 transition-colors">
                  ⛰️ Cabaña Gran Cumbres (Hasta 10 pers.)
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Ubicación & Contacto */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Contacto & Ubicación</h4>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Santa Rosa de Calamuchita, Valle de Calamuchita, Córdoba</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>+54 9 3546 000000</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>reservas@cabanascalamuchita.com.ar</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Garantía */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Garantía de Reserva</h4>
            <div className="glass-card p-4 rounded-xl space-y-2 border-emerald-500/20">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
                <ShieldCheck className="w-4 h-4" /> Sincronización Oficial
              </div>
              <p className="text-[11px] leading-tight text-slate-300">
                Reserva directa con los dueños y confirmación instantánea sincronizada con Google Calendar API.
              </p>
            </div>
          </div>

        </div>

        <div className="border-t border-white/5 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Cabañas Santa Rosa de Calamuchita. Todos los derechos reservados.</p>
          <div className="flex items-center gap-4 mt-4 sm:mt-0">
            <a href="/admin/login" className="hover:text-amber-400 transition-colors">Acceso Propietario / Admin</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
