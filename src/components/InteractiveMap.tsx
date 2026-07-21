'use client';

import React, { useState } from 'react';
import { MapPin, Navigation, Compass, Sparkles, ExternalLink, Waves, Utensils, Mountain } from 'lucide-react';

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

  // Google Maps Search / OpenStreetMap embed URL
  const mapEmbedUrl = `https://maps.google.com/maps?q=${latitude},${longitude}&hl=es&z=15&output=embed`;
  const googleMapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;

  return (
    <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
            <MapPin className="w-3.5 h-3.5" /> Ubicación Exacta
          </div>
          <h3 className="text-2xl font-extrabold text-white">{cabinName}</h3>
          <p className="text-xs text-slate-300 flex items-center gap-1.5 mt-1 font-medium">
            <Navigation className="w-4 h-4 text-amber-400 shrink-0" />
            {address}
          </p>
        </div>

        <a
          href={googleMapsDirectionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-3 rounded-2xl font-bold text-xs bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center gap-2 shadow-lg transition-all hover:scale-105 shrink-0"
        >
          <span>Cómo Llegar (Google Maps)</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      {/* Embedded Map Container */}
      <div className="relative w-full h-[320px] sm:h-[400px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
        <iframe
          title={`Mapa de ubicación de ${cabinName}`}
          src={mapEmbedUrl}
          width="100%"
          height="100%"
          style={{ border: 0, filter: 'contrast(1.05) saturate(1.1)' }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />

        {/* Floating Custom Badge */}
        <div className="absolute top-4 left-4 bg-slate-950/90 backdrop-blur-md px-4 py-2 rounded-xl border border-amber-500/40 text-xs font-bold text-white shadow-xl flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
          <span>{cabinName}</span>
        </div>
      </div>

      {/* Points of Interest Tabs & Grid */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center gap-3 border-b border-white/10 pb-3">
          <button
            onClick={() => setActiveTab('near')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'near'
                ? 'bg-amber-500 text-slate-950 shadow-lg'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Waves className="w-4 h-4" />
            Cercanos (A pie / 2 min)
          </button>
          <button
            onClick={() => setActiveTab('far')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'far'
                ? 'bg-emerald-600 text-white shadow-lg'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
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
              className="p-3.5 rounded-2xl bg-slate-900/60 border border-white/5 flex items-center justify-between gap-3 hover:border-amber-500/30 transition-all"
            >
              <div className="flex items-center gap-2.5">
                <Compass className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-xs font-bold text-white">{pt.name}</span>
              </div>
              <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-500/20 shrink-0">
                {pt.distance}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
