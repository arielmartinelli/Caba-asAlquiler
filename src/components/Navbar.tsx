'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Trees, MapPin, UserCheck, Menu, X, PhoneCall, Search, Globe, Sun, Moon } from 'lucide-react';
import WeatherWidget from './WeatherWidget';
import { useCurrency } from './CurrencyContext';
import { useTheme } from './ThemeContext';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currency, setCurrency } = useCurrency();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo - Airbnb Inspired Coral / Emerald */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-2xl bg-rose-500 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              <Trees className="w-6 h-6 fill-current text-white" />
            </div>
            <div>
              <span className="text-lg sm:text-xl font-extrabold tracking-tight text-rose-500 block leading-tight">
                cabañas<span className="text-slate-900 dark:text-white font-bold">calamuchita</span>
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1 font-medium">
                <MapPin className="w-3 h-3 text-rose-500" /> Santa Rosa de Calamuchita
              </span>
            </div>
          </Link>

          {/* Airbnb Floating Search Pill */}
          <div className="hidden md:flex items-center gap-3 airbnb-search-bar px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 dark:bg-slate-800 dark:border-slate-700 shadow-sm">
            <a href="#catalogo" className="px-3 py-1 hover:text-rose-500 transition-colors">
              Cabañas (3)
            </a>
            <span className="text-slate-300 dark:text-slate-600">|</span>
            <a href="#ubicacion" className="px-3 py-1 hover:text-rose-500 transition-colors">
              Ubicación
            </a>
            <span className="text-slate-300 dark:text-slate-600">|</span>
            <a href="#faq" className="px-3 py-1 hover:text-rose-500 transition-colors">
              Preguntas
            </a>
            <div className="w-7 h-7 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-sm ml-1">
              <Search className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Right Menu Controls */}
          <div className="hidden md:flex items-center gap-3">
            
            {/* Weather Badge */}
            <WeatherWidget />

            {/* Theme Toggle Button (Light/Dark Switcher) */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-amber-400 transition-all"
              title={theme === 'light' ? 'Cambiar a Modo Oscuro' : 'Cambiar a Modo Claro'}
            >
              {theme === 'light' ? (
                <Moon className="w-4 h-4 text-slate-700" />
              ) : (
                <Sun className="w-4 h-4 text-amber-400" />
              )}
            </button>

            {/* Currency Selector (ARS / USD) */}
            <button
              onClick={() => setCurrency(currency === 'ARS' ? 'USD' : 'ARS')}
              className="flex items-center gap-1.5 px-3 py-2 rounded-full border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
              title="Cambiar moneda"
            >
              <Globe className="w-4 h-4 text-slate-500 dark:text-slate-400" />
              <span>{currency === 'ARS' ? '$ ARS' : 'US$ USD'}</span>
            </button>

            {/* Direct WhatsApp Contact Button */}
            <a
              href="https://wa.me/5493546000000?text=Hola!%20Quisiera%20consultar%20por%20alquiler%20de%20caba%C3%B1as%20en%20Santa%20Rosa%20de%20Calamuchita"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold bg-rose-500 hover:bg-rose-600 text-white shadow-md transition-all hover:scale-105"
            >
              <PhoneCall className="w-3.5 h-3.5" /> Consultar
            </a>

            {/* Admin Login Button */}
            <Link
              href="/admin/login"
              className="p-2.5 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-all"
              title="Acceso Administración"
            >
              <UserCheck className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-amber-400"
            >
              {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-amber-400" />}
            </button>
            <button
              onClick={() => setCurrency(currency === 'ARS' ? 'USD' : 'ARS')}
              className="px-2.5 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200"
            >
              {currency}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 px-6 pt-4 pb-6 space-y-4 shadow-xl">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-semibold text-slate-900 dark:text-white hover:text-rose-500"
          >
            Inicio & Cabañas
          </Link>
          <a
            href="#catalogo"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-semibold text-slate-900 dark:text-white hover:text-rose-500"
          >
            Nuestras 3 Cabañas
          </a>
          <a
            href="#ubicacion"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-semibold text-slate-900 dark:text-white hover:text-rose-500"
          >
            Ubicación & Mapa
          </a>
          <a
            href="https://wa.me/5493546000000?text=Hola!%20Consulta%20por%20caba%C3%B1as"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center py-3 rounded-full font-bold bg-rose-500 text-white shadow-md"
          >
            Contactar por WhatsApp
          </a>
          <Link
            href="/admin/login"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-center py-2.5 rounded-full text-xs font-bold text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700"
          >
            Panel Propietario / Admin
          </Link>
        </div>
      )}
    </header>
  );
}
