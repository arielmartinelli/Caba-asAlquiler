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
  Star,
  Award,
  ShieldCheck,
  Share2,
  Heart,
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
        <div className="w-12 h-12 rounded-full border-4 border-rose-500 border-t-transparent animate-spin" />
        <p className="text-slate-500 text-sm font-medium">Cargando cabaña...</p>
      </div>
    );
  }

  if (error || !cabin) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4 text-center px-4">
        <h2 className="text-2xl font-bold text-rose-500">Cabaña no encontrada</h2>
        <p className="text-slate-500 text-sm">No pudimos encontrar la información de esta cabaña.</p>
        <Link href="/" className="px-6 py-2.5 rounded-full bg-rose-500 text-white font-bold text-xs">
          Volver al Catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Breadcrumb & Airbnb Top Actions */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-rose-500 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Catálogo de Cabañas
        </Link>
        <div className="flex items-center gap-4 text-xs font-bold text-slate-700">
          <span className="flex items-center gap-1 cursor-pointer hover:underline">
            <Share2 className="w-3.5 h-3.5" /> Compartir
          </span>
          <span className="flex items-center gap-1 cursor-pointer hover:underline text-rose-500">
            <Heart className="w-3.5 h-3.5 fill-current" /> Guardar
          </span>
        </div>
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
        
        {/* Left Column (2 cols): Photos & Listing Info */}
        <div className="lg:col-span-2 space-y-10">
          
          {/* Main Photo Gallery */}
          <PhotoCarousel images={cabin.images} cabinName={cabin.name} />

          {/* Title & Superhost Header */}
          <div className="space-y-4 border-b border-slate-200 pb-8">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-extrabold text-slate-900 bg-slate-100 border border-slate-200">
                ★ 4.98 • 28 evaluaciones
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-extrabold text-emerald-700 bg-emerald-50 border border-emerald-200 flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-emerald-600" /> Propietario Verificado
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">{cabin.name}</h1>
            
            <p className="text-slate-600 text-sm font-medium flex items-center gap-2">
              <MapPin className="w-4 h-4 text-rose-500" /> {cabin.address}
            </p>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs font-medium text-slate-700">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-rose-500" />
                <span>Capacidad máxima para {cabin.capacity} huéspedes</span>
              </div>
              <span className="text-emerald-600 font-bold">100% Equipado</span>
            </div>

            <p className="text-slate-700 text-sm leading-relaxed font-normal pt-2">{cabin.description}</p>
          </div>

          {/* Airbnb Style Amenities List */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-rose-500" />
              Lo que ofrece este alojamiento
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {cabin.amenities.map((item: string, idx: number) => (
                <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/60">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="text-xs font-semibold text-slate-800">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Map & Nearby Places */}
          <InteractiveMap
            cabinName={cabin.name}
            address={cabin.address}
            latitude={cabin.latitude}
            longitude={cabin.longitude}
            nearPoints={cabin.nearPoints || []}
            farPoints={cabin.farPoints || []}
          />

        </div>

        {/* Right Column (1 col): Sticky Airbnb Reservation Card */}
        <div className="space-y-6 lg:sticky lg:top-24">
          
          {/* Price Header Card */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-lg space-y-4">
            <div className="flex items-baseline justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-2xl font-extrabold text-slate-900">
                  {formatCabinPrice(cabin)}
                </span>
                <span className="text-xs text-slate-500 ml-1 font-medium">/ noche</span>
              </div>
              <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                ★ 4.98
              </span>
            </div>

            <p className="text-xs text-slate-500 leading-normal">
              Sin comisiones de plataforma. Alquiler directo gestionado por los dueños.
            </p>

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

            {/* Main Action Button */}
            <button
              disabled={!selectedRange.startDate || !selectedRange.endDate || nightsCount === 0}
              onClick={() => setIsModalOpen(true)}
              className={`w-full py-4 px-6 rounded-full font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all ${
                selectedRange.startDate && selectedRange.endDate && nightsCount > 0
                  ? 'bg-rose-500 hover:bg-rose-600 text-white hover:scale-105 shadow-rose-500/30'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <CalendarIcon className="w-4 h-4" />
              {selectedRange.startDate && selectedRange.endDate && nightsCount > 0
                ? `Solicitar Reserva (${nightsCount} Noches)`
                : 'Seleccioná Fechas en el Calendario'}
            </button>

            <a
              href={`https://wa.me/5493546000000?text=Hola!%20Consulta%20directa%20por%20caba%C3%B1a%20${encodeURIComponent(cabin.name)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-full text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 flex items-center justify-center gap-2 transition-all"
            >
              <PhoneCall className="w-4 h-4 text-emerald-600" /> Consulta Directa por WhatsApp
            </a>
          </div>

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
