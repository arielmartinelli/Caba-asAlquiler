'use client';

import React, { useEffect, useState } from 'react';
import { Sun, CloudSun, CloudRain, Snowflake, Thermometer } from 'lucide-react';

interface WeatherData {
  temp: number;
  condition: string;
  isDay: boolean;
}

export default function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWeather() {
      try {
        // Open-Meteo API (Free, no API key needed) for Santa Rosa de Calamuchita lat/long
        const res = await fetch(
          'https://api.open-meteo.com/v1/forecast?latitude=-32.0682&longitude=-64.5361&current_weather=true'
        );
        if (!res.ok) throw new Error('Weather fetch failed');
        const data = await res.json();
        const cw = data.current_weather;

        // Interpret Weather Code (WMO code)
        let condition = 'Soleado';
        if (cw.weathercode >= 1 && cw.weathercode <= 3) condition = 'Parcialmente Nublado';
        else if (cw.weathercode >= 45 && cw.weathercode <= 48) condition = 'Niebla';
        else if (cw.weathercode >= 51 && cw.weathercode <= 67) condition = 'Lluvia Ligera';
        else if (cw.weathercode >= 80 && cw.weathercode <= 99) condition = 'Tormentas';

        setWeather({
          temp: Math.round(cw.temperature),
          condition,
          isDay: cw.is_day === 1,
        });
      } catch (err) {
        // Fallback default for Santa Rosa de Calamuchita
        setWeather({ temp: 24, condition: 'Soleado', isDay: true });
      } finally {
        setLoading(false);
      }
    }

    fetchWeather();
  }, []);

  if (loading || !weather) {
    return (
      <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/60 border border-white/10 text-xs text-slate-400 animate-pulse">
        <Thermometer className="w-3.5 h-3.5 text-amber-400" />
        <span>Calamuchita: cargando...</span>
      </div>
    );
  }

  const renderIcon = () => {
    if (weather.condition.includes('Lluvia') || weather.condition.includes('Tormenta')) {
      return <CloudRain className="w-4 h-4 text-cyan-400" />;
    }
    if (weather.condition.includes('Nublado') || weather.condition.includes('Niebla')) {
      return <CloudSun className="w-4 h-4 text-amber-300" />;
    }
    return <Sun className="w-4 h-4 text-amber-400 animate-spin-slow" />;
  };

  return (
    <div
      className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full glass-card border border-amber-500/30 text-xs text-slate-200 shadow-md hover:border-amber-400/50 transition-all cursor-default"
      title={`Santa Rosa de Calamuchita: ${weather.temp}°C - ${weather.condition}`}
    >
      {renderIcon()}
      <div className="flex items-center gap-1">
        <span className="font-bold text-amber-400">{weather.temp}°C</span>
        <span className="text-[11px] text-slate-300 font-medium">Santa Rosa</span>
      </div>
    </div>
  );
}
