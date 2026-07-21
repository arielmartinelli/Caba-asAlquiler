'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Users, MapPin, CheckCircle2, ArrowRight } from 'lucide-react';

export interface CabinData {
  id: string;
  slug: string;
  name: string;
  capacity: number;
  description: string;
  address: string;
  priceARS: number;
  priceUSD: number;
  baseCurrency?: string; // 'ARS' or 'USD' (Configurado por el Administrador)
  amenities: string[];
  images: string[];
}

export function formatCabinPrice(cabin: { priceARS: number; priceUSD: number; baseCurrency?: string }) {
  if (cabin.baseCurrency === 'USD') {
    return `US$ ${cabin.priceUSD.toLocaleString('en-US')}`;
  }
  return `$ ${cabin.priceARS.toLocaleString('es-AR')} ARS`;
}

export default function CabinCard({ cabin }: { cabin: CabinData }) {
  const getCapacityColor = (cap: number) => {
    if (cap <= 5) return 'from-emerald-500 to-teal-600';
    if (cap <= 7) return 'from-cyan-500 to-blue-600';
    return 'from-amber-500 to-orange-600';
  };

  return (
    <div className="glass-card glass-card-hover rounded-3xl overflow-hidden flex flex-col h-full border border-white/10 group">
      
      {/* Image Container */}
      <div className="relative h-64 w-full overflow-hidden">
        <Image
          src={cabin.images[0] || '/images/cabin-sendero.jpg'}
          alt={cabin.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

        {/* Capacity Badge */}
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1.5 rounded-full text-xs font-bold text-white shadow-lg bg-gradient-to-r ${getCapacityColor(cabin.capacity)} flex items-center gap-1.5 backdrop-blur-md`}>
            <Users className="w-3.5 h-3.5" /> Hasta {cabin.capacity} Personas
          </span>
        </div>

        {/* Price Tag Badge - Strictly configured by Admin */}
        <div className="absolute bottom-4 right-4 bg-slate-950/85 backdrop-blur-md border border-white/10 px-4 py-2 rounded-2xl">
          <div className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold text-right">Por noche</div>
          <div className="text-xl font-extrabold text-amber-400">
            {formatCabinPrice(cabin)}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
            {cabin.name}
          </h3>
          <p className="text-xs text-amber-400/90 flex items-center gap-1.5 mt-1 font-medium">
            <MapPin className="w-3.5 h-3.5 shrink-0" /> {cabin.address}
          </p>
          <p className="text-slate-300 text-xs mt-3 line-clamp-2 leading-relaxed">
            {cabin.description}
          </p>
        </div>

        {/* Top Amenities Pills */}
        <div className="space-y-3 pt-2">
          <div className="flex flex-wrap gap-1.5">
            {cabin.amenities.slice(0, 4).map((amenity, idx) => (
              <span
                key={idx}
                className="text-[11px] bg-white/5 border border-white/10 px-2.5 py-1 rounded-lg text-slate-300 flex items-center gap-1"
              >
                <CheckCircle2 className="w-3 h-3 text-emerald-400" /> {amenity}
              </span>
            ))}
            {cabin.amenities.length > 4 && (
              <span className="text-[11px] bg-white/5 px-2 py-1 rounded-lg text-slate-400 font-medium">
                +{cabin.amenities.length - 4} más
              </span>
            )}
          </div>

          {/* Action Button */}
          <Link
            href={`/cabanas/${cabin.slug}`}
            className="w-full mt-4 py-3 px-4 rounded-2xl font-bold text-xs bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center gap-2 shadow-lg hover:shadow-emerald-600/30 transition-all group-hover:translate-x-0.5"
          >
            Ver Detalle, Galería y Reservar
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

    </div>
  );
}
