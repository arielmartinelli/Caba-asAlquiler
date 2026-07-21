'use client';

import React, { useState } from 'react';
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
  isBefore,
  isWithinInterval,
  differenceInDays,
} from 'date-fns';
import { es } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Lock } from 'lucide-react';

interface Range {
  startDate: Date | null;
  endDate: Date | null;
}

interface CalendarProps {
  priceARS: number;
  priceUSD: number;
  baseCurrency?: string; // 'ARS' or 'USD'
  reservations: { startDate: string; endDate: string; status: string }[];
  blockedDates: { startDate: string; endDate: string; reason?: string }[];
  gcalEvents: { start: string; end: string; summary: string }[];
  onSelectRange: (range: Range, nights: number) => void;
}

export default function Calendar({
  priceARS,
  priceUSD,
  baseCurrency = 'ARS',
  reservations = [],
  blockedDates = [],
  gcalEvents = [],
  onSelectRange,
}: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [range, setRange] = useState<Range>({ startDate: null, endDate: null });

  const formatPriceTotal = (nights: number) => {
    if (baseCurrency === 'USD') {
      return `US$ ${(priceUSD * nights).toLocaleString('en-US')}`;
    }
    return `$ ${(priceARS * nights).toLocaleString('es-AR')} ARS`;
  };

  // Convert blocked date sources into structured ranges
  const isDateBlocked = (date: Date): { blocked: boolean; reason?: string } => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (isBefore(date, today)) {
      return { blocked: true, reason: 'Fecha pasada' };
    }

    // Check APPROVED / PENDING reservations
    for (const res of reservations) {
      const start = new Date(res.startDate);
      const end = new Date(res.endDate);
      start.setHours(0, 0, 0, 0);
      end.setHours(0, 0, 0, 0);
      if (isWithinInterval(date, { start, end })) {
        return { blocked: true, reason: res.status === 'APPROVED' ? 'Reservado' : 'Solicitud pendiente' };
      }
    }

    // Check manual blocked dates
    for (const block of blockedDates) {
      const start = new Date(block.startDate);
      const end = new Date(block.endDate);
      start.setHours(0, 0, 0, 0);
      end.setHours(0, 0, 0, 0);
      if (isWithinInterval(date, { start, end })) {
        return { blocked: true, reason: block.reason || 'Mantenimiento' };
      }
    }

    // Check Google Calendar events
    for (const gcal of gcalEvents) {
      if (!gcal.start) continue;
      const start = new Date(gcal.start);
      const end = new Date(gcal.end || gcal.start);
      start.setHours(0, 0, 0, 0);
      end.setHours(0, 0, 0, 0);
      if (isWithinInterval(date, { start, end })) {
        return { blocked: true, reason: 'Ocupado en Google Calendar' };
      }
    }

    return { blocked: false };
  };

  const handleDateClick = (date: Date) => {
    const { blocked } = isDateBlocked(date);
    if (blocked) return;

    if (!range.startDate || (range.startDate && range.endDate)) {
      const newRange = { startDate: date, endDate: null };
      setRange(newRange);
      onSelectRange(newRange, 0);
    } else if (range.startDate && !range.endDate) {
      if (isBefore(date, range.startDate)) {
        const newRange = { startDate: date, endDate: null };
        setRange(newRange);
        onSelectRange(newRange, 0);
      } else {
        let valid = true;
        let curr = range.startDate;
        while (isBefore(curr, date)) {
          if (isDateBlocked(curr).blocked) {
            valid = false;
            break;
          }
          curr = addDays(curr, 1);
        }

        if (valid) {
          const newRange = { startDate: range.startDate, endDate: date };
          setRange(newRange);
          const nights = differenceInDays(date, range.startDate);
          onSelectRange(newRange, nights);
        } else {
          const newRange = { startDate: date, endDate: null };
          setRange(newRange);
          onSelectRange(newRange, 0);
        }
      }
    }
  };

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const rows = [];
  let days = [];
  let day = startDate;

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      const cloneDay = day;
      const { blocked, reason } = isDateBlocked(cloneDay);
      const isSelectedStart = range.startDate && isSameDay(cloneDay, range.startDate);
      const isSelectedEnd = range.endDate && isSameDay(cloneDay, range.endDate);
      const isInRange =
        range.startDate &&
        range.endDate &&
        isWithinInterval(cloneDay, { start: range.startDate, end: range.endDate });

      const isCurrentMonth = isSameMonth(cloneDay, monthStart);

      days.push(
        <button
          key={cloneDay.toISOString()}
          disabled={blocked || !isCurrentMonth}
          onClick={() => handleDateClick(cloneDay)}
          className={`h-12 w-full rounded-xl flex flex-col items-center justify-center relative transition-all text-xs font-semibold ${
            !isCurrentMonth ? 'opacity-20 cursor-default' : ''
          } ${
            blocked
              ? 'bg-rose-950/30 text-rose-400/50 line-through cursor-not-allowed border border-rose-900/20'
              : isSelectedStart || isSelectedEnd
              ? 'gradient-gold text-slate-950 font-extrabold shadow-lg scale-105 z-10'
              : isInRange
              ? 'bg-emerald-800/40 text-emerald-200 border border-emerald-500/30'
              : 'hover:bg-emerald-600/20 text-slate-200 hover:text-white hover:scale-105 border border-white/5'
          }`}
          title={blocked ? `No disponible: ${reason}` : format(cloneDay, 'dd MMMM yyyy', { locale: es })}
        >
          <span>{format(cloneDay, 'd')}</span>
          {blocked && isCurrentMonth && (
            <Lock className="w-2.5 h-2.5 text-rose-400/70 absolute bottom-1" />
          )}
        </button>
      );
      day = addDays(day, 1);
    }
    rows.push(
      <div key={day.toISOString()} className="grid grid-cols-7 gap-1.5">
        {days}
      </div>
    );
    days = [];
  }

  const nightsCount =
    range.startDate && range.endDate ? differenceInDays(range.endDate, range.startDate) : 0;

  return (
    <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-6">
      
      {/* Header with Month Selector */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-white">
          <CalendarIcon className="w-5 h-5 text-amber-400" />
          <h3 className="font-bold text-lg capitalize">
            {format(currentMonth, 'MMMM yyyy', { locale: es })}
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={prevMonth}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextMonth}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 gap-1.5 text-center text-xs font-bold text-amber-400 uppercase tracking-wider">
        <span>Lun</span>
        <span>Mar</span>
        <span>Mié</span>
        <span>Jue</span>
        <span>Vie</span>
        <span>Sáb</span>
        <span>Dom</span>
      </div>

      {/* Days Grid */}
      <div className="space-y-1.5">{rows}</div>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-between text-xs text-slate-400 pt-4 border-t border-white/10 gap-2">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-emerald-600 border border-emerald-400"></span>
          <span>Disponible</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-amber-400"></span>
          <span>Seleccionado</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-rose-950 border border-rose-900"></span>
          <span>No disponible</span>
        </div>
      </div>

      {/* Selection Summary Box */}
      {range.startDate && (
        <div className="glass-card p-4 rounded-2xl bg-emerald-950/40 border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <div className="text-xs text-slate-400 font-medium">Fechas Seleccionadas</div>
            <div className="text-sm font-bold text-white flex items-center gap-2 justify-center sm:justify-start">
              <span>{format(range.startDate, 'dd MMM yyyy', { locale: es })}</span>
              {range.endDate ? (
                <>
                  <span>➔</span>
                  <span>{format(range.endDate, 'dd MMM yyyy', { locale: es })}</span>
                </>
              ) : (
                <span className="text-amber-400 text-xs font-normal animate-pulse">(Seleccioná fecha de check-out)</span>
              )}
            </div>
          </div>

          {nightsCount > 0 && (
            <div className="text-right">
              <div className="text-xs text-slate-400 font-medium">{nightsCount} Noche(s)</div>
              <div className="text-lg font-extrabold text-amber-400">
                Total: {formatPriceTotal(nightsCount)}
              </div>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
