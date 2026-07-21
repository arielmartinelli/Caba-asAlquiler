'use client';

import React from 'react';
import { Trees, MapPin, Phone, Mail, ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 pt-16 pb-12 text-slate-600 dark:text-slate-400 text-xs transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-rose-500 flex items-center justify-center text-white">
                <Trees className="w-5 h-5 fill-current" />
              </div>
              <span className="text-base font-extrabold text-slate-900 dark:text-white">
                cabañas<span className="text-rose-500">calamuchita</span>
              </span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
              Complejo de alquiler directo de cabañas en Santa Rosa de Calamuchita, Valle de Calamuchita, Córdoba.
            </p>
          </div>

          {/* Cabins Links */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white mb-4 uppercase tracking-wider">Cabañas</h4>
            <ul className="space-y-2.5">
              <li>
                <a href="/cabanas/sendero-de-montana" className="hover:text-rose-500 transition-colors">
                  🌲 Cabaña Sendero (Hasta 5 pers.)
                </a>
              </li>
              <li>
                <a href="/cabanas/orilla-del-rio" className="hover:text-rose-500 transition-colors">
                  🌊 Cabaña Orilla del Río (Hasta 7 pers.)
                </a>
              </li>
              <li>
                <a href="/cabanas/gran-cumbres" className="hover:text-rose-500 transition-colors">
                  ⛰️ Cabaña Gran Cumbres (Hasta 10 pers.)
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white mb-4 uppercase tracking-wider">Contacto Directo</h4>
            <ul className="space-y-2.5">
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-rose-500 shrink-0" />
                <span>Santa Rosa de Calamuchita, Córdoba</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>+54 9 3546 000000</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                <span>reservas@cabanascalamuchita.com.ar</span>
              </li>
            </ul>
          </div>

          {/* Guarantee */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white mb-4 uppercase tracking-wider">Garantía de Reserva</h4>
            <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700/60 space-y-2">
              <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold text-xs">
                <ShieldCheck className="w-4 h-4" /> Alquiler Directo Propietario
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-normal">
                Reservá directamente sin cargos administrativos extras. Sincronización oficial con Google Calendar.
              </p>
            </div>
          </div>

        </div>

        <div className="border-t border-slate-200 dark:border-slate-800 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between text-slate-500 dark:text-slate-400 text-xs">
          <p>© 2026 Cabañas Santa Rosa de Calamuchita. Inspirado en el estándar de calidad Airbnb.</p>
          <div className="flex items-center gap-4 mt-4 sm:mt-0">
            <a href="/admin/login" className="hover:text-rose-500 transition-colors font-medium">
              Acceso Propietario / Admin
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
