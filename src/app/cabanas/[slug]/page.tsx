'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  Users,
  MapPin,
  CheckCircle2,
  Navigation,
  Compass,
  ArrowLeft,
  Calendar as CalendarIcon,
  Sparkles,
  PhoneCall,
} from 'lucide-react';
import Calendar from '@/components/Calendar';
import PhotoCarousel from '@/components/PhotoCarousel';
import ReservationModal from '@/components/ReservationModal';
import InteractiveMap from '@/components/InteractiveMap';
import { formatCabinPrice } from '@/components/CabinCard';

export default function CabinDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [cabin, setCabin] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [selectedRange, setSelectedRange] = useState<{ startDate: Date | null; endDate: Date | null }>({
    startDate: null,
    endDate: null,
  });
  const [nightsCount, setNightsCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function fetchCabin() {
      try {
        const res = await fetch(`/api/cabins/${slug}`);
        if (!res.ok) throw new Error('Cabaña no encontrada');
        const data = await res.json();
        setCabin(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    if (slug) fetchCabin();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 rounded-full border-4 border-amber-400 border-t-transparent animate-spin" />
        <p className="text-slate-400 text-sm font-medium">Cargando detalles de la cabaña...</p>
      </div>
    );
  }

  if (error || !cabin) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4 text-center px-4">
        <h2 className="text-2xl font-bold text-rose-400">Cabaña no encontrada</h2>
        <p className="text-slate-400 text-sm">No pudimos encontrar la información de esta cabaña.</p>
        <Link href="/" className="px-6 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs">
          Volver al Catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Breadcrumb & Navigation */}
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-amber-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Volver al Catálogo de Cabañas
        </Link>
        <div className="text-xs text-slate-500">Santa Rosa de Calamuchita</div>
      </div>

      {/* Main Grid: Header & Media */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left Col (2 cols): Details */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Main Photo Carousel */}
          <PhotoCarousel images={cabin.images} cabinName={cabin.name} />

          {/* Title & Description */}
          <div className="space-y-4">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white">{cabin.name}</h1>
            <p className="text-amber-400 text-sm font-semibold flex items-center gap-2">
              <MapPin className="w-4 h-4" /> {cabin.address}
            </p>
            <p className="text-slate-300 text-sm leading-relaxed font-light">{cabin.description}</p>
          </div>

          {/* Equipamiento y Comodidades */}
          <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              Equipamiento y Comodidades
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {cabin.amenities.map((item: string, idx: number) => (
                <div key={idx} className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-xs font-semibold text-slate-200">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Mapa Interactivo y Puntos de Interés */}
          <InteractiveMap
            cabinName={cabin.name}
            address={cabin.address}
            latitude={cabin.latitude}
            longitude={cabin.longitude}
            nearPoints={cabin.nearPoints || []}
            farPoints={cabin.farPoints || []}
          />

        </div>

        {/* Right Col (1 col): Calendar & Sticky Reservation Widget */}
        <div className="space-y-6 lg:sticky lg:top-24">
          
          {/* Price Header Card */}
          <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-4 gradient-emerald">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">Tarifa por Noche</span>
              <span className="text-xs text-slate-200">Temporada 2026</span>
            </div>
            <div className="text-3xl font-extrabold text-amber-300">
              {formatCabinPrice(cabin)}
            </div>
            <p className="text-[11px] text-slate-200 leading-tight">
              Sin comisiones extra. Tarifa fija administrada directamente por los dueños.
            </p>
          </div>

          {/* Availability Calendar */}
          <Calendar
            priceARS={cabin.priceARS}
            priceUSD={cabin.priceUSD}
            baseCurrency={cabin.baseCurrency || 'ARS'}
            reservations={cabin.reservations || []}
            blockedDates={cabin.blockedDates || []}
            gcalEvents={cabin.gcalEvents || []}
            onSelectRange={(range, nights) => {
              setSelectedRange(range);
              setNightsCount(nights);
            }}
          />

          {/* Action Trigger Button */}
          <button
            disabled={!selectedRange.startDate || !selectedRange.endDate || nightsCount === 0}
            onClick={() => setIsModalOpen(true)}
            className={`w-full py-4 px-6 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-2xl transition-all ${
              selectedRange.startDate && selectedRange.endDate && nightsCount > 0
                ? 'gradient-gold text-slate-950 hover:scale-105 shadow-amber-500/30'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-white/5'
            }`}
          >
            <CalendarIcon className="w-5 h-5" />
            {selectedRange.startDate && selectedRange.endDate && nightsCount > 0
              ? `Solicitar Reserva (${nightsCount} Noches)`
              : 'Seleccioná Check-in y Check-out'}
          </button>

          <a
            href={`https://wa.me/5493546000000?text=Hola!%20Consulta%20directa%20por%20caba%C3%B1a%20${encodeURIComponent(cabin.name)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 px-4 rounded-xl text-xs font-semibold glass-card text-amber-400 hover:text-white flex items-center justify-center gap-2 border-amber-500/20"
          >
            <PhoneCall className="w-4 h-4" /> Hacer consulta previa por WhatsApp
          </a>

        </div>

      </div>

      {/* Reservation Modal */}
      {selectedRange.startDate && selectedRange.endDate && (
        <ReservationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          cabin={cabin}
          startDate={selectedRange.startDate}
          endDate={selectedRange.endDate}
          nightsCount={nightsCount}
        />
      )}

    </div>
  );
}
