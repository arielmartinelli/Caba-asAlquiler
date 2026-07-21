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
  baseCurrency?: string; // 'ARS' or 'USD'
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
    <div className="bg-white rounded-3xl overflow-hidden flex flex-col h-full border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 group">
      
      {/* Airbnb Image Container */}
      <div className="relative h-64 w-full overflow-hidden bg-slate-100">
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
          className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white text-slate-700 shadow-sm transition-all hover:scale-110"
          title="Guardar en favoritos"
        >
          <Heart className={`w-4 h-4 transition-colors ${liked ? 'fill-rose-500 text-rose-500' : 'text-slate-700'}`} />
        </button>

        {/* Capacity Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1.5 rounded-full text-xs font-extrabold text-slate-900 bg-white/90 backdrop-blur-md shadow-sm border border-slate-200/80 flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-rose-500" /> Hasta {cabin.capacity} Huéspedes
          </span>
        </div>

        {/* Airbnb Rating Badge */}
        <div className="absolute bottom-4 left-4 bg-slate-900/85 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white shadow-md flex items-center gap-1">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span>4.98</span>
          <span className="text-slate-300 text-[10px] font-normal">(28)</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-lg font-bold text-slate-900 group-hover:text-rose-500 transition-colors leading-snug">
              {cabin.name}
            </h3>
          </div>

          <p className="text-xs text-slate-500 flex items-center gap-1 font-medium">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" /> {cabin.address}
          </p>

          <p className="text-slate-600 text-xs line-clamp-2 leading-relaxed font-normal pt-1">
            {cabin.description}
          </p>
        </div>

        {/* Amenities & Price Section */}
        <div className="space-y-4 pt-2 border-t border-slate-100">
          <div className="flex flex-wrap gap-1.5">
            {cabin.amenities.slice(0, 3).map((amenity, idx) => (
              <span
                key={idx}
                className="text-[11px] bg-slate-100 border border-slate-200/60 px-2.5 py-1 rounded-md text-slate-700 font-medium flex items-center gap-1"
              >
                <CheckCircle2 className="w-3 h-3 text-emerald-600" /> {amenity}
              </span>
            ))}
            {cabin.amenities.length > 3 && (
              <span className="text-[11px] bg-slate-100 px-2 py-1 rounded-md text-slate-500 font-medium">
                +{cabin.amenities.length - 3} más
              </span>
            )}
          </div>

          {/* Airbnb Price & Action Button */}
          <div className="flex items-center justify-between pt-2">
            <div>
              <span className="text-xs text-slate-400 block font-medium">Precio por noche</span>
              <span className="text-xl font-extrabold text-slate-900">
                {formatCabinPrice(cabin)}
              </span>
            </div>

            <Link
              href={`/cabanas/${cabin.slug}`}
              className="px-4 py-2.5 rounded-xl font-bold text-xs bg-rose-500 hover:bg-rose-600 text-white flex items-center gap-1.5 shadow-md transition-all hover:scale-105"
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
