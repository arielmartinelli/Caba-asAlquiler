import React from 'react';
import Link from 'next/link';
import { db } from '@/lib/db';
import CabinCard, { CabinData } from '@/components/CabinCard';
import TestimonialsSection from '@/components/TestimonialsSection';
import FAQSection from '@/components/FAQSection';
import { Trees, MapPin, Sparkles, Compass, ShieldCheck, HeartHandshake, CheckCircle2, ChevronRight, PhoneCall, Search, Star, Award, Shield } from 'lucide-react';

export const revalidate = 0; // Dynamic rendering

async function getCabins(): Promise<CabinData[]> {
  try {
    const cabins = await db.cabin.findMany({
      orderBy: { capacity: 'asc' },
    });
    return cabins.map((c) => ({
      ...c,
      amenities: JSON.parse(c.amenities || '[]'),
      nearPoints: JSON.parse(c.nearPoints || '[]'),
      farPoints: JSON.parse(c.farPoints || '[]'),
      images: JSON.parse(c.images || '[]'),
    }));
  } catch (err) {
    console.error('Error fetching cabins:', err);
    return [];
  }
}

export default async function HomePage() {
  const cabins = await getCabins();

  return (
    <div className="space-y-16 pb-16 bg-slate-50">
      
      {/* Airbnb Hero Banner */}
      <section className="relative py-16 sm:py-24 bg-gradient-to-b from-white to-slate-100 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 text-center space-y-8">
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-50 border border-rose-200 text-rose-600 text-xs font-extrabold uppercase tracking-wider shadow-sm">
            <Award className="w-4 h-4 text-rose-500" /> Alquiler Directo en Santa Rosa de Calamuchita
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-slate-900 leading-tight max-w-4xl mx-auto">
            Encontrá tu cabaña ideal en las <span className="text-rose-500">Sierras de Córdoba</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
            Complejo de 3 cabañas equipadas para 5, 7 y 10 personas. Vistas panorámicas a la montaña, bajada directa al río, piscina y parrilla.
          </p>

          {/* Airbnb Search Box Floating Container */}
          <div className="max-w-3xl mx-auto bg-white p-3 rounded-full border border-slate-200 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="px-6 py-2 text-left sm:border-r border-slate-200 w-full">
              <span className="text-[10px] font-bold text-slate-900 uppercase tracking-wider block">Ubicación</span>
              <span className="text-xs text-slate-500 font-medium">Santa Rosa de Calamuchita</span>
            </div>
            <div className="px-6 py-2 text-left sm:border-r border-slate-200 w-full">
              <span className="text-[10px] font-bold text-slate-900 uppercase tracking-wider block">Capacidad</span>
              <span className="text-xs text-slate-500 font-medium">Hasta 10 Huéspedes</span>
            </div>
            <div className="px-6 py-2 text-left w-full">
              <span className="text-[10px] font-bold text-slate-900 uppercase tracking-wider block">Garantía</span>
              <span className="text-xs font-semibold text-emerald-600">Trato Directo Sin Comisión</span>
            </div>
            <a
              href="#catalogo"
              className="w-full sm:w-auto px-8 py-4 rounded-full font-bold text-xs bg-rose-500 hover:bg-rose-600 text-white shadow-md transition-all flex items-center justify-center gap-2 shrink-0"
            >
              <Search className="w-4 h-4" /> Buscar Cabañas
            </a>
          </div>

          {/* Airbnb Key Benefits Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 text-left max-w-4xl mx-auto">
            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm space-y-1">
              <div className="text-slate-900 font-bold text-sm flex items-center gap-1.5">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" /> 4.98 Estrellas
              </div>
              <div className="text-slate-500 text-xs">Evaluación de huéspedes</div>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm space-y-1">
              <div className="text-emerald-600 font-bold text-sm flex items-center gap-1.5">
                <Shield className="w-4 h-4" /> Reserva Segura
              </div>
              <div className="text-slate-500 text-xs">Directo con los dueños</div>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm space-y-1">
              <div className="text-slate-900 font-bold text-sm">Río y Montaña</div>
              <div className="text-slate-500 text-xs">Ubicación estratégica</div>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm space-y-1">
              <div className="text-rose-500 font-bold text-sm">Google Calendar</div>
              <div className="text-slate-500 text-xs">Disponibilidad en tiempo real</div>
            </div>
          </div>

        </div>
      </section>

      {/* Catalog Section */}
      <section id="catalogo" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 pt-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <span className="text-xs font-bold text-rose-500 uppercase tracking-widest bg-rose-50 px-3 py-1.5 rounded-full border border-rose-200">
              Cabañas Exclusivas
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-2">
              Nuestras 3 Cabañas en Calamuchita
            </h2>
          </div>
          <p className="text-slate-500 text-xs sm:text-sm max-w-md">
            Seleccioná la opción perfecta según la cantidad de personas y disfrutá de unas vacaciones inolvidables.
          </p>
        </div>

        {/* Cabins Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cabins.map((cabin) => (
            <CabinCard key={cabin.id} cabin={cabin} />
          ))}
        </div>
      </section>

      {/* Testimoniales de Huéspedes */}
      <div className="bg-white py-12 border-y border-slate-200">
        <TestimonialsSection />
      </div>

      {/* Ubicación & Puntos de Interés */}
      <section id="ubicacion" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 md:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <span className="text-xs font-bold text-rose-500 uppercase tracking-widest bg-rose-50 px-3 py-1.5 rounded-full border border-rose-200">
                Ubicación Inmejorable
              </span>
              <h3 className="text-3xl font-extrabold text-slate-900">
                Santa Rosa de Calamuchita: Naturaleza, Gastronomía y Río
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Ubicadas en puntos estratégicos del Valle de Calamuchita, nuestras cabañas combinan acceso directo al río Santa Rosa con cercanía al centro comercial y atractivos turísticos.
              </p>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Compass className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Atracciones Cercanas (A pie)</h4>
                    <p className="text-xs text-slate-500">Río Santa Rosa, Balneario El Puchuqui, Paseo del Remanso, restaurantes tradicionales.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Paseos de Calamuchita</h4>
                    <p className="text-xs text-slate-500">Villa General Belgrano (10 min), Cerro Vía Crucis, La Cumbrecita, Reserva La Cascada.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Box */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
              <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                Garantía de Alquiler Directo
              </h4>
              <ul className="space-y-3 text-xs text-slate-600">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Trato 100% directo con los dueños sin comisiones extras.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Calendario de fechas disponible sincronizado live con Google Calendar.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Opción de abonar en Pesos Argentinos ($) o Dólares (US$).</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Totalmente equipadas con vajilla, ropa de blanco, piscina y Wi-Fi.</span>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* Preguntas Frecuentes FAQ */}
      <div className="bg-white py-12 border-t border-slate-200">
        <FAQSection />
      </div>

    </div>
  );
}
