'use client';

import React, { useState } from 'react';
import { MapPin, Navigation, Compass, ExternalLink, Waves, Mountain } from 'lucide-react';

interface InteractiveMapProps {
  cabinName: string;
  address: string;
  latitude: number;
  longitude: number;
  nearPoints: { name: string; distance: string }[];
  farPoints: { name: string; distance: string }[];
}

export default function InteractiveMap({
  cabinName,
  address,
  latitude,
  longitude,
  nearPoints = [],
  farPoints = [],
}: InteractiveMapProps) {
  const [activeTab, setActiveTab] = useState<'near' | 'far'>('near');

  const mapEmbedUrl = `https://maps.google.com/maps?q=${latitude},${longitude}&hl=es&z=15&output=embed`;
  const googleMapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;

  return (
    <div className="bg-white dark:bg-[#151c28] p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800/60 text-rose-600 dark:text-rose-400 text-xs font-extrabold uppercase tracking-wider mb-2">
            <MapPin className="w-3.5 h-3.5" /> Ubicación Exacta
          </div>
          <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">{cabinName}</h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 flex items-center gap-1.5 mt-1 font-semibold">
            <Navigation className="w-4 h-4 text-slate-400 shrink-0" />
            {address}
          </p>
        </div>

        <a
          href={googleMapsDirectionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-3 rounded-full font-bold text-xs bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white flex items-center justify-center gap-2 shadow-md transition-all hover:scale-105 shrink-0"
        >
          <span>Abrir Google Maps</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Embedded Map Container */}
      <div className="relative w-full h-[320px] sm:h-[380px] rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-inner">
        <iframe
          title={`Mapa de ubicación de ${cabinName}`}
          src={mapEmbedUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />

        {/* Floating Airbnb Pin Badge */}
        <div className="absolute top-4 left-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-4 py-2 rounded-full border border-slate-200 dark:border-slate-800 text-xs font-extrabold text-slate-900 dark:text-white shadow-md flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
          <span>{cabinName}</span>
        </div>
      </div>

      {/* Points of Interest Tabs */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
          <button
            onClick={() => setActiveTab('near')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'near'
                ? 'bg-rose-500 text-white shadow-sm'
                : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Waves className="w-4 h-4" />
            Cercanos (A pie / 2 min)
          </button>
          <button
            onClick={() => setActiveTab('far')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'far'
                ? 'bg-slate-900 dark:bg-slate-800 text-white shadow-sm'
                : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Mountain className="w-4 h-4" />
            Paseos Turísticos (5 a 20 min)
          </button>
        </div>

        {/* Points Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {(activeTab === 'near' ? nearPoints : farPoints).map((pt, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-center justify-between gap-3 hover:border-slate-300 dark:hover:border-slate-600 transition-all"
            >
              <div className="flex items-center gap-2.5">
                <Compass className="w-4 h-4 text-slate-500 shrink-0" />
                <span className="text-xs font-extrabold text-slate-900 dark:text-white">{pt.name}</span>
              </div>
              <span className="text-[11px] font-extrabold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-800 px-2.5 py-1 rounded-full border border-slate-200 dark:border-slate-700 shrink-0 shadow-2xs">
                {pt.distance}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
