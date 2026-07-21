'use client';

import React, { useState } from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { X, CheckCircle2, MessageSquare, ShieldCheck, User, Mail, Phone, Users as UsersIcon } from 'lucide-react';
import { formatCabinPrice } from './CabinCard';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  cabin: {
    id: string;
    name: string;
    capacity: number;
    priceARS: number;
    priceUSD: number;
    baseCurrency?: string;
  };
  startDate: Date;
  endDate: Date;
  nightsCount: number;
}

export default function ReservationModal({
  isOpen,
  onClose,
  cabin,
  startDate,
  endDate,
  nightsCount,
}: ReservationModalProps) {
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [guestsCount, setGuestsCount] = useState(1);
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const totalARS = cabin.priceARS * nightsCount;
  const totalUSD = cabin.priceUSD * nightsCount;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // 1. Save to DB via API
      const res = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cabinId: cabin.id,
          clientName,
          clientEmail,
          clientPhone,
          guestsCount,
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
          totalARS,
          totalUSD,
          notes,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Error al guardar la solicitud');
      }

      // 2. Build WhatsApp message strictly formatted in cabin baseCurrency
      const formattedTotal = formatCabinPrice({
        priceARS: totalARS,
        priceUSD: totalUSD,
        baseCurrency: cabin.baseCurrency,
      });

      const textMessage = `
*SOLICITUD DE RESERVA - CABAÑAS SANTA ROSA DE CALAMUCHITA* 🏡
--------------------------------------------------
*Cabaña:* ${cabin.name}
*Cliente:* ${clientName}
*Teléfono:* ${clientPhone}
*Email:* ${clientEmail}
*Huéspedes:* ${guestsCount} persona(s)
*Check-in:* ${format(startDate, 'dd/MM/yyyy')}
*Check-out:* ${format(endDate, 'dd/MM/yyyy')} (${nightsCount} noches)
*Monto Total Estimado:* ${formattedTotal}
*Notas:* ${notes || 'Sin observaciones'}
--------------------------------------------------
_Enviado desde el sitio web oficial de reservas._
      `.trim();

      const waPhone = '5493546000000'; // Owner phone
      const waUrl = `https://wa.me/${waPhone}?text=${encodeURIComponent(textMessage)}`;

      setSubmitted(true);

      setTimeout(() => {
        window.open(waUrl, '_blank');
      }, 1000);
    } catch (err: any) {
      setError(err.message || 'Ocurrió un error inesperado');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
      <div className="glass-card max-w-lg w-full rounded-3xl border border-white/10 overflow-hidden shadow-2xl relative">
        
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between gradient-emerald">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300">Solicitud de Reserva</span>
            <h3 className="text-xl font-bold text-white">{cabin.name}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form or Confirmation State */}
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10 animate-bounce" />
              </div>
              <h4 className="text-xl font-bold text-white">¡Solicitud Generada con Éxito!</h4>
              <p className="text-slate-300 text-xs leading-relaxed max-w-sm mx-auto">
                Tu solicitud fue registrada en el sistema del complejo. Abriendo WhatsApp para enviar los detalles al propietario...
              </p>
              <div className="pt-4">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-500 text-white"
                >
                  Cerrar Ventana
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Summary box */}
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between text-xs">
                <div>
                  <div className="text-slate-400">Estadía:</div>
                  <div className="font-bold text-white">
                    {format(startDate, 'dd MMM', { locale: es })} ➔ {format(endDate, 'dd MMM yyyy', { locale: es })} ({nightsCount} noches)
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-slate-400">Monto Total:</div>
                  <div className="font-extrabold text-amber-400 text-sm">
                    {formatCabinPrice({ priceARS: totalARS, priceUSD: totalUSD, baseCurrency: cabin.baseCurrency })}
                  </div>
                </div>
              </div>

              {error && (
                <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-500/50 text-rose-300 text-xs font-semibold">
                  {error}
                </div>
              )}

              {/* Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Nombre Completo *</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Ej. María González"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-900/80 border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Email *</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="email"
                      required
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      placeholder="maria@gmail.com"
                      className="w-full pl-10 pr-3 py-2.5 bg-slate-900/80 border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">WhatsApp / Celular *</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="tel"
                      required
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      placeholder="+54 9 351 1234567"
                      className="w-full pl-10 pr-3 py-2.5 bg-slate-900/80 border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>
              </div>

              {/* Guests Count */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Cantidad de Huéspedes (Máx. {cabin.capacity}) *
                </label>
                <div className="relative">
                  <UsersIcon className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="number"
                    min={1}
                    max={cabin.capacity}
                    required
                    value={guestsCount}
                    onChange={(e) => setGuestsCount(Math.min(cabin.capacity, Math.max(1, parseInt(e.target.value) || 1)))}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-900/80 border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Comentarios / Consultas</label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Ej. Horario estimado de llegada, viajo con mascota pequeña, etc."
                  className="w-full p-3 bg-slate-900/80 border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-amber-400 resize-none"
                />
              </div>

              {/* Action Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                {loading ? (
                  <span>Procesando...</span>
                ) : (
                  <>
                    <MessageSquare className="w-4 h-4" />
                    Enviar Solicitud vía WhatsApp
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Sin cargos por adelantado. El dueño confirmará tu reserva.</span>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
}
