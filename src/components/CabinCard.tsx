'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Users, MapPin, CheckCircle2, ArrowRight, Star, Heart } from 'lucide-react';

export interface CabinData {
  id: string;
  slug: string;
  name: string;
  capacity: number;
  description: string;
  address: string;
  priceARS: number;
  priceUSD: number;
  baseCurrency?: string;
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
  const [liked, setLiked] = useState(false);

  return (
    <div className="airbnb-card overflow-hidden flex flex-col h-full group">
      
      {/* Airbnb Image Container */}
      <div className="relative h-64 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
        <Image
          src={cabin.images[0] || '/images/cabin-sendero.jpg'}
          alt={cabin.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Favorite Heart Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setLiked(!liked);
          }}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/90 dark:bg-slate-900/90 text-slate-700 dark:text-slate-200 shadow-md transition-all hover:scale-110"
          title="Guardar en favoritos"
        >
          <Heart className={`w-4 h-4 transition-colors ${liked ? 'fill-rose-500 text-rose-500' : 'text-slate-700 dark:text-slate-200'}`} />
        </button>

        {/* Capacity Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1.5 rounded-full text-xs font-extrabold text-slate-900 dark:text-white bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-sm border border-slate-200/80 dark:border-slate-800 flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-rose-500" /> Hasta {cabin.capacity} Huéspedes
          </span>
        </div>

        {/* Rating Badge */}
        <div className="absolute bottom-4 left-4 bg-slate-900/85 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white shadow-md flex items-center gap-1">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span>4.98</span>
          <span className="text-slate-300 text-[10px] font-normal">(28)</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg font-extrabold text-slate-900 dark:text-white group-hover:text-rose-500 transition-colors leading-snug">
            {cabin.name}
          </h3>

          <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 font-medium">
            <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" /> {cabin.address}
          </p>

          <p className="text-slate-600 dark:text-slate-300 text-xs line-clamp-2 leading-relaxed font-normal pt-1">
            {cabin.description}
          </p>
        </div>

        {/* Amenities & Price Section */}
        <div className="space-y-4 pt-3 border-t border-slate-100 dark:border-slate-800/80">
          <div className="flex flex-wrap gap-1.5">
            {cabin.amenities.slice(0, 3).map((amenity, idx) => (
              <span
                key={idx}
                className="text-[11px] bg-slate-100 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 px-2.5 py-1 rounded-md text-slate-700 dark:text-slate-300 font-medium flex items-center gap-1"
              >
                <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" /> {amenity}
              </span>
            ))}
            {cabin.amenities.length > 3 && (
              <span className="text-[11px] bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md text-slate-500 dark:text-slate-400 font-medium">
                +{cabin.amenities.length - 3} más
              </span>
            )}
          </div>

          {/* Airbnb Price & Action Button */}
          <div className="flex items-center justify-between pt-2">
            <div>
              <span className="text-[11px] text-slate-400 dark:text-slate-400 block font-semibold uppercase tracking-wider">Noche desde</span>
              <span className="text-xl font-extrabold text-slate-900 dark:text-white">
                {formatCabinPrice(cabin)}
              </span>
            </div>

            <Link
              href={`/cabanas/${cabin.slug}`}
              className="px-4 py-2.5 rounded-full font-bold text-xs btn-airbnb flex items-center gap-1.5 shadow-md"
            >
              <span>Ver Cabaña</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
}
