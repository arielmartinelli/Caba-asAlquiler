import React from 'react';
import Link from 'next/link';
import { db } from '@/lib/db';
import CabinCard, { CabinData } from '@/components/CabinCard';
import { Trees, MapPin, Sparkles, Compass, ShieldCheck, HeartHandshake, CheckCircle2, ChevronRight, PhoneCall } from 'lucide-react';

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
    <div className="space-y-24 pb-16">
      
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden hero-pattern pt-12">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/40 via-slate-950/80 to-slate-950" />
        
        {/* Glow Spheres */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-600/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 text-center space-y-8 z-10">
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-widest shadow-xl">
            <Sparkles className="w-4 h-4 text-amber-400" /> Valle de Calamuchita, Córdoba
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-tight">
            Descansá en la Naturaleza de <br />
            <span className="gradient-text">Santa Rosa de Calamuchita</span>
          </h1>

          <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
            3 Cabañas exclusivas equipadas para 5, 7 y 10 personas. Vistas panorámicas a las sierras, bajada al río, piscinas y todas las comodidades.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a
              href="#catalogo"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-sm bg-emerald-600 hover:bg-emerald-500 text-white shadow-2xl hover:shadow-emerald-500/40 transition-all hover:scale-105 flex items-center justify-center gap-2"
            >
              Ver Nustras 3 Cabañas
              <ChevronRight className="w-4 h-4" />
            </a>
            <a
              href="https://wa.me/5493546000000?text=Hola!%20Consulta%20disponibilidad"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-sm glass-card text-emerald-400 hover:text-white border-emerald-500/30 hover:bg-emerald-900/40 transition-all flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-4 h-4 text-emerald-400" />
              Consulta Directa WhatsApp
            </a>
          </div>

          {/* Quick Features Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-12 text-left max-w-4xl mx-auto">
            <div className="glass-card p-4 rounded-2xl border border-white/5 space-y-1">
              <div className="text-amber-400 font-bold text-base">3 Cabañas</div>
              <div className="text-slate-400 text-xs">De 5, 7 y 10 personas</div>
            </div>
            <div className="glass-card p-4 rounded-2xl border border-white/5 space-y-1">
              <div className="text-emerald-400 font-bold text-base">Río y Montaña</div>
              <div className="text-slate-400 text-xs">Ubicaciones estratégicas</div>
            </div>
            <div className="glass-card p-4 rounded-2xl border border-white/5 space-y-1">
              <div className="text-cyan-400 font-bold text-base">Totalmente Equipadas</div>
              <div className="text-slate-400 text-xs">Piscina, Wi-Fi, Parrilla</div>
            </div>
            <div className="glass-card p-4 rounded-2xl border border-white/5 space-y-1">
              <div className="text-emerald-400 font-bold text-base">Sincro Calendar</div>
              <div className="text-slate-400 text-xs">Fechas actualizadas live</div>
            </div>
          </div>

        </div>
      </section>

      {/* Catalog Section */}
      <section id="catalogo" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest bg-emerald-950 px-3 py-1.5 rounded-full border border-emerald-500/30">
            Catálogo Oficial
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
            Elegí la Cabaña Perfecta para tu Estadía
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            Cada cabaña está diseñada para ofrecer una experiencia única según la cantidad de huéspedes. Seleccioná una para consultar disponibilidad y reservar.
          </p>
        </div>

        {/* Cabins Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cabins.map((cabin) => (
            <CabinCard key={cabin.id} cabin={cabin} />
          ))}
        </div>
      </section>

      {/* Ubicación & Puntos de Interés */}
      <section id="ubicacion" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card p-8 md:p-12 rounded-3xl border border-white/10 relative overflow-hidden space-y-8">
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest bg-amber-950/80 px-3 py-1.5 rounded-full border border-amber-500/30">
                Ubicación Privilegiada
              </span>
              <h3 className="text-3xl font-extrabold text-white">
                Santa Rosa de Calamuchita: Naturaleza, Gastronomía y Paseos
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Ubicadas en una zona estratégica del Valle de Calamuchita, nuestras 3 cabañas te permiten estar a pasos del río Santa Rosa y a pocos minutos de los principales atractivos de las sierras de Córdoba.
              </p>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Compass className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-white">Atracciones Cercanas (A pie o 2 min)</h4>
                    <p className="text-xs text-slate-400">Río Santa Rosa, Balneario El Puchuqui, Paseo del Remanso, restaurantes tradicionales.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-white">Atracciones Turísticas Cercanas</h4>
                    <p className="text-xs text-slate-400">Villa General Belgrano (10 min), Cerro Vía Crucis, La Cumbrecita, Reserva La Cascada.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Box */}
            <div className="glass-card p-6 rounded-2xl bg-emerald-950/30 border-emerald-500/20 space-y-4">
              <h4 className="text-base font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                ¿Por qué elegir nuestras Cabañas?
              </h4>
              <ul className="space-y-3 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Trato directo con los dueños (sin comisiones de plataformas).</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Fechas sincronizadas en tiempo real con Google Calendar API.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Opción de pago y cotización en Pesos Argentinos ($) o Dólares (US$).</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Totalmente equipadas con ropa de blanco, vajilla, piscina y Wi-Fi.</span>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
