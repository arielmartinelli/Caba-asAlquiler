'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import {
  Calendar as CalendarIcon,
  CheckCircle,
  XCircle,
  Lock,
  DollarSign,
  LogOut,
  RefreshCw,
  Clock,
  ShieldCheck,
  Building,
  Upload,
  Plus,
  Trash2,
  Image as ImageIcon,
} from 'lucide-react';
import Image from 'next/image';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'pending' | 'approved' | 'prices' | 'photos' | 'blocked'>('pending');

  const [reservations, setReservations] = useState<any[]>([]);
  const [cabins, setCabins] = useState<any[]>([]);
  const [blockedDates, setBlockedDates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Price & Currency Edit State
  const [cabinSettings, setCabinSettings] = useState<{
    [key: string]: { priceARS: number; priceUSD: number; baseCurrency: string; images: string[] };
  }>({});
  const [savingSettings, setSavingSettings] = useState(false);
  const [settingsMsg, setSettingsMsg] = useState('');

  // Uploading Photo State
  const [uploadingCabinId, setUploadingCabinId] = useState<string | null>(null);

  // Blocked Date Form State
  const [blockCabinId, setBlockCabinId] = useState('');
  const [blockStart, setBlockStart] = useState('');
  const [blockEnd, setBlockEnd] = useState('');
  const [blockReason, setBlockReason] = useState('Mantenimiento / Reparaciones');
  const [blockSubmitting, setBlockSubmitting] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const resRes = await fetch('/api/reservations');
      if (resRes.status === 401) {
        router.push('/admin/login');
        return;
      }
      const resData = await resRes.json();
      setReservations(resData || []);

      const cabRes = await fetch('/api/cabins');
      const cabData = await cabRes.json();
      setCabins(cabData || []);

      const cs: any = {};
      (cabData || []).forEach((c: any) => {
        cs[c.id] = {
          priceARS: c.priceARS,
          priceUSD: c.priceUSD,
          baseCurrency: c.baseCurrency || 'ARS',
          images: c.images || [],
        };
      });
      setCabinSettings(cs);

      const blockRes = await fetch('/api/admin/blocked-dates');
      const blockData = await blockRes.json();
      setBlockedDates(blockData || []);
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogout = async () => {
    await fetch('/api/admin/login', { method: 'DELETE' });
    router.push('/admin/login');
  };

  const handleUpdateStatus = async (id: string, status: 'APPROVED' | 'REJECTED' | 'CANCELLED') => {
    try {
      const res = await fetch(`/api/admin/reservations/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        fetchData();
      }
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const handleSaveCabinSettings = async (cabinId: string) => {
    setSavingSettings(true);
    setSettingsMsg('');
    try {
      const current = cabinSettings[cabinId];
      const res = await fetch(`/api/admin/cabins/${cabinId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          priceARS: current.priceARS,
          priceUSD: current.priceUSD,
          baseCurrency: current.baseCurrency,
        }),
      });
      if (res.ok) {
        setSettingsMsg('¡Configuración guardada exitosamente!');
        setTimeout(() => setSettingsMsg(''), 3000);
        fetchData();
      }
    } catch (err) {
      console.error('Error saving settings:', err);
    } finally {
      setSavingSettings(false);
    }
  };

  const handleFileUpload = async (cabinId: string, file: File) => {
    setUploadingCabinId(cabinId);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('cabinId', cabinId);

      const uploadRes = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      if (uploadRes.ok) {
        const { imageUrl } = await uploadRes.json();
        const currentImages = cabinSettings[cabinId]?.images || [];
        const updatedImages = [...currentImages, imageUrl];

        await fetch(`/api/admin/cabins/${cabinId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ images: updatedImages }),
        });

        fetchData();
      }
    } catch (err) {
      console.error('Error uploading image:', err);
    } finally {
      setUploadingCabinId(null);
    }
  };

  const handleDeletePhoto = async (cabinId: string, photoIdx: number) => {
    try {
      const currentImages = [...(cabinSettings[cabinId]?.images || [])];
      currentImages.splice(photoIdx, 1);

      await fetch(`/api/admin/cabins/${cabinId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ images: currentImages }),
      });

      fetchData();
    } catch (err) {
      console.error('Error deleting photo:', err);
    }
  };

  const handleCreateBlock = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!blockCabinId || !blockStart || !blockEnd) return;
    setBlockSubmitting(true);
    try {
      const res = await fetch('/api/admin/blocked-dates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cabinId: blockCabinId,
          startDate: blockStart,
          endDate: blockEnd,
          reason: blockReason,
        }),
      });

      if (res.ok) {
        setBlockStart('');
        setBlockEnd('');
        fetchData();
      }
    } catch (err) {
      console.error('Error creating block:', err);
    } finally {
      setBlockSubmitting(false);
    }
  };

  const handleDeleteBlock = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/blocked-dates?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchData();
      }
    } catch (err) {
      console.error('Error deleting block:', err);
    }
  };

  const pendingReservations = reservations.filter((r) => r.status === 'PENDING');
  const approvedReservations = reservations.filter((r) => r.status === 'APPROVED');

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="flex items-center gap-3 text-slate-950 font-bold text-sm">
          <RefreshCw className="w-5 h-5 animate-spin text-rose-500" />
          Cargando Panel de Control...
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Admin Top Header */}
      <div className="bg-slate-950 p-6 sm:p-8 rounded-3xl text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div>
          <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" /> Propietario / Administrador
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">Panel de Gestión de Reservas y Cabañas</h1>
          <p className="text-xs text-slate-300 mt-1">Santa Rosa de Calamuchita - Control de Fotos, Monedas y Google Calendar</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchData}
            className="p-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-2 transition-all"
          >
            <RefreshCw className="w-4 h-4" /> Refrescar
          </button>
          <button
            onClick={handleLogout}
            className="p-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold flex items-center gap-2 transition-all shadow-sm"
          >
            <LogOut className="w-4 h-4" /> Cerrar Sesión
          </button>
        </div>
      </div>

      {/* Quick Metrics Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-2xl border border-slate-300 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-slate-950">{pendingReservations.length}</div>
            <div className="text-xs text-slate-600 font-bold">Solicitudes Pendientes</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-300 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-slate-950">{approvedReservations.length}</div>
            <div className="text-xs text-slate-600 font-bold">Reservas Aprobadas (Google Cal)</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-300 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
            <Building className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-slate-950">{cabins.length}</div>
            <div className="text-xs text-slate-600 font-bold">Cabañas Complejo</div>
          </div>
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="flex border-b border-slate-300 gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => setActiveTab('pending')}
          className={`px-5 py-3 rounded-2xl text-xs font-extrabold transition-all flex items-center gap-2 border ${
            activeTab === 'pending'
              ? 'bg-rose-500 text-white border-rose-500 shadow-md'
              : 'bg-white text-slate-700 hover:text-slate-950 border-slate-300 hover:bg-slate-100'
          }`}
        >
          <Clock className="w-4 h-4" />
          Solicitudes Pendientes ({pendingReservations.length})
        </button>

        <button
          onClick={() => setActiveTab('approved')}
          className={`px-5 py-3 rounded-2xl text-xs font-extrabold transition-all flex items-center gap-2 border ${
            activeTab === 'approved'
              ? 'bg-rose-500 text-white border-rose-500 shadow-md'
              : 'bg-white text-slate-700 hover:text-slate-950 border-slate-300 hover:bg-slate-100'
          }`}
        >
          <CheckCircle className="w-4 h-4" />
          Reservas Confirmadas ({approvedReservations.length})
        </button>

        <button
          onClick={() => setActiveTab('prices')}
          className={`px-5 py-3 rounded-2xl text-xs font-extrabold transition-all flex items-center gap-2 border ${
            activeTab === 'prices'
              ? 'bg-rose-500 text-white border-rose-500 shadow-md'
              : 'bg-white text-slate-700 hover:text-slate-950 border-slate-300 hover:bg-slate-100'
          }`}
        >
          <DollarSign className="w-4 h-4" />
          Precios y Moneda Base
        </button>

        <button
          onClick={() => setActiveTab('photos')}
          className={`px-5 py-3 rounded-2xl text-xs font-extrabold transition-all flex items-center gap-2 border ${
            activeTab === 'photos'
              ? 'bg-rose-500 text-white border-rose-500 shadow-md'
              : 'bg-white text-slate-700 hover:text-slate-950 border-slate-300 hover:bg-slate-100'
          }`}
        >
          <ImageIcon className="w-4 h-4" />
          Galería y Subida de Fotos
        </button>

        <button
          onClick={() => setActiveTab('blocked')}
          className={`px-5 py-3 rounded-2xl text-xs font-extrabold transition-all flex items-center gap-2 border ${
            activeTab === 'blocked'
              ? 'bg-rose-500 text-white border-rose-500 shadow-md'
              : 'bg-white text-slate-700 hover:text-slate-950 border-slate-300 hover:bg-slate-100'
          }`}
        >
          <Lock className="w-4 h-4" />
          Mantenimiento ({blockedDates.length})
        </button>
      </div>

      {/* TAB 1: Pending Reservations */}
      {activeTab === 'pending' && (
        <div className="bg-white p-6 rounded-3xl border border-slate-300 shadow-md space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-extrabold text-slate-950">Solicitudes de Reserva Pendientes de Aprobación</h3>
            <span className="text-xs text-amber-700 bg-amber-50 px-3 py-1.5 rounded-full border border-amber-200 font-bold">
              Al aprobar, se crea evento en Google Calendar y se bloquea la fecha
            </span>
          </div>

          {pendingReservations.length === 0 ? (
            <div className="text-center py-12 text-slate-600 text-xs font-semibold">
              No hay solicitudes pendientes en este momento.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-950">
                <thead className="text-[11px] uppercase tracking-wider text-slate-800 border-b border-slate-300 bg-slate-100 font-extrabold">
                  <tr>
                    <th className="p-3">Cabaña</th>
                    <th className="p-3">Cliente / Contacto</th>
                    <th className="p-3">Fechas</th>
                    <th className="p-3">Huéspedes</th>
                    <th className="p-3">Monto Estimado</th>
                    <th className="p-3">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {pendingReservations.map((r) => (
                    <tr key={r.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-3 font-extrabold text-slate-950">{r.cabin.name}</td>
                      <td className="p-3 space-y-0.5">
                        <div className="font-bold text-slate-900">{r.clientName}</div>
                        <div className="text-emerald-700 font-mono text-[11px] font-bold">{r.clientPhone}</div>
                        <div className="text-slate-600 text-[11px]">{r.clientEmail}</div>
                      </td>
                      <td className="p-3 font-bold text-slate-900">
                        {format(new Date(r.startDate), 'dd/MM/yyyy')} ➔ {format(new Date(r.endDate), 'dd/MM/yyyy')}
                      </td>
                      <td className="p-3 font-bold text-amber-700">{r.guestsCount} pers.</td>
                      <td className="p-3 font-extrabold text-emerald-700">
                        {r.totalARS.toLocaleString('es-AR')} ARS / {r.totalUSD} USD
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleUpdateStatus(r.id, 'APPROVED')}
                            className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] shadow-sm flex items-center gap-1"
                          >
                            <CheckCircle className="w-3.5 h-3.5" /> Aprobar & Sincronizar
                          </button>
                          <button
                            onClick={() => handleUpdateStatus(r.id, 'REJECTED')}
                            className="px-3 py-1.5 rounded-lg bg-rose-100 hover:bg-rose-200 border border-rose-300 text-rose-700 font-bold text-[11px] flex items-center gap-1"
                          >
                            <XCircle className="w-3.5 h-3.5" /> Rechazar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: Approved Reservations */}
      {activeTab === 'approved' && (
        <div className="bg-white p-6 rounded-3xl border border-slate-300 shadow-md space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-extrabold text-slate-950">Reservas Confirmadas & Google Calendar API</h3>
            <span className="text-xs text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200 font-bold">
              Sincronizadas con Google Calendar
            </span>
          </div>

          {approvedReservations.length === 0 ? (
            <div className="text-center py-12 text-slate-600 text-xs font-semibold">
              No hay reservas confirmadas activas.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-950">
                <thead className="text-[11px] uppercase tracking-wider text-slate-800 border-b border-slate-300 bg-slate-100 font-extrabold">
                  <tr>
                    <th className="p-3">Cabaña</th>
                    <th className="p-3">Cliente</th>
                    <th className="p-3">Fechas</th>
                    <th className="p-3">Monto</th>
                    <th className="p-3">Google Calendar</th>
                    <th className="p-3">Acción</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {approvedReservations.map((r) => (
                    <tr key={r.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-3 font-extrabold text-slate-950">{r.cabin.name}</td>
                      <td className="p-3">
                        <div className="font-bold text-slate-900">{r.clientName}</div>
                        <div className="text-slate-600 text-[11px] font-medium">{r.clientPhone}</div>
                      </td>
                      <td className="p-3 font-bold text-slate-900">
                        {format(new Date(r.startDate), 'dd/MM/yyyy')} ➔ {format(new Date(r.endDate), 'dd/MM/yyyy')}
                      </td>
                      <td className="p-3 font-extrabold text-slate-900">
                        {r.totalARS.toLocaleString('es-AR')} ARS
                      </td>
                      <td className="p-3">
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 inline-flex items-center gap-1">
                          <CheckCircle className="w-3.5 h-3.5" /> Evento Creado OK
                        </span>
                      </td>
                      <td className="p-3">
                        <button
                          onClick={() => handleUpdateStatus(r.id, 'CANCELLED')}
                          className="px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-300 text-[11px] font-bold"
                        >
                          Cancelar Reserva
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: Prices & Base Currency Selection */}
      {activeTab === 'prices' && (
        <div className="bg-white p-6 rounded-3xl border border-slate-300 shadow-md space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-extrabold text-slate-950">Gestión de Tarifas y Selección de Moneda Base</h3>
              <p className="text-xs text-slate-700 font-medium">Elegí si cobrás por defecto en Pesos (ARS) o Dólares (USD) por cada cabaña.</p>
            </div>
            {settingsMsg && (
              <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-300">
                {settingsMsg}
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cabins.map((cabin) => (
              <div key={cabin.id} className="p-6 rounded-2xl bg-slate-50 border border-slate-300 space-y-4">
                <div className="space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-rose-600">Hasta {cabin.capacity} Huéspedes</span>
                  <h4 className="text-base font-extrabold text-slate-950">{cabin.name}</h4>
                </div>

                {/* Base Currency Selection */}
                <div>
                  <label className="block text-xs text-slate-800 font-bold mb-1">Moneda Principal de Tarifa</label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setCabinSettings({
                          ...cabinSettings,
                          [cabin.id]: {
                            ...cabinSettings[cabin.id],
                            baseCurrency: 'ARS',
                          },
                        })
                      }
                      className={`flex-1 py-2 text-xs font-extrabold rounded-xl border transition-all ${
                        cabinSettings[cabin.id]?.baseCurrency === 'ARS'
                          ? 'bg-rose-500 text-white border-rose-500 shadow-sm'
                          : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                      }`}
                    >
                      ARS (Pesos)
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setCabinSettings({
                          ...cabinSettings,
                          [cabin.id]: {
                            ...cabinSettings[cabin.id],
                            baseCurrency: 'USD',
                          },
                        })
                      }
                      className={`flex-1 py-2 text-xs font-extrabold rounded-xl border transition-all ${
                        cabinSettings[cabin.id]?.baseCurrency === 'USD'
                          ? 'bg-rose-500 text-white border-rose-500 shadow-sm'
                          : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                      }`}
                    >
                      USD (Dólares)
                    </button>
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <div>
                    <label className="block text-xs text-slate-800 font-bold mb-1">Precio Noche (ARS)</label>
                    <input
                      type="number"
                      value={cabinSettings[cabin.id]?.priceARS ?? cabin.priceARS}
                      onChange={(e) =>
                        setCabinSettings({
                          ...cabinSettings,
                          [cabin.id]: {
                            ...cabinSettings[cabin.id],
                            priceARS: parseFloat(e.target.value) || 0,
                          },
                        })
                      }
                      className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-slate-950 text-xs font-mono font-bold focus:border-rose-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-800 font-bold mb-1">Precio Noche (USD)</label>
                    <input
                      type="number"
                      value={cabinSettings[cabin.id]?.priceUSD ?? cabin.priceUSD}
                      onChange={(e) =>
                        setCabinSettings({
                          ...cabinSettings,
                          [cabin.id]: {
                            ...cabinSettings[cabin.id],
                            priceUSD: parseFloat(e.target.value) || 0,
                          },
                        })
                      }
                      className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-slate-950 text-xs font-mono font-bold focus:border-rose-500 focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  onClick={() => handleSaveCabinSettings(cabin.id)}
                  disabled={savingSettings}
                  className="w-full py-2.5 rounded-xl text-xs font-extrabold btn-airbnb shadow-sm hover:scale-[1.01] transition-transform"
                >
                  Guardar Configuración
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: Photos Upload & Gallery Management */}
      {activeTab === 'photos' && (
        <div className="bg-white p-6 rounded-3xl border border-slate-300 shadow-md space-y-8">
          <div className="space-y-1">
            <h3 className="text-lg font-extrabold text-slate-950">Galería de Fotos por Cabaña</h3>
            <p className="text-xs text-slate-700 font-medium">
              Subí fotos desde tu computadora o agregá enlaces de imágenes. Serán mostradas en el carrusel de la vista pública.
            </p>
          </div>

          <div className="space-y-8">
            {cabins.map((cabin) => {
              const currentImages = cabinSettings[cabin.id]?.images || [];
              return (
                <div key={cabin.id} className="p-6 rounded-2xl bg-slate-50 border border-slate-300 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
                    <div>
                      <h4 className="text-base font-extrabold text-slate-950">{cabin.name}</h4>
                      <span className="text-xs text-slate-600 font-medium">{currentImages.length} fotos en el carrusel</span>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-2">
                      <label className="px-4 py-2 rounded-xl text-xs font-extrabold bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer flex items-center gap-1.5 shadow-sm">
                        <Upload className="w-4 h-4" />
                        {uploadingCabinId === cabin.id ? 'Subiendo...' : 'Subir Imagen'}
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              handleFileUpload(cabin.id, e.target.files[0]);
                            }
                          }}
                        />
                      </label>
                    </div>
                  </div>

                  {/* Photo Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
                    {currentImages.map((img: string, idx: number) => (
                      <div key={idx} className="relative h-28 rounded-xl overflow-hidden group border border-slate-300 shadow-xs">
                        <Image src={img} alt={`Foto ${idx + 1}`} fill className="object-cover" />
                        <button
                          onClick={() => handleDeletePhoto(cabin.id, idx)}
                          className="absolute top-2 right-2 p-1.5 rounded-full bg-rose-600 text-white opacity-0 group-hover:opacity-100 transition-opacity shadow"
                          title="Eliminar foto"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                        <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded text-[10px] bg-slate-950/80 text-white font-mono">
                          #{idx + 1}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 5: Maintenance / Blocked Dates */}
      {activeTab === 'blocked' && (
        <div className="bg-white p-6 rounded-3xl border border-slate-300 shadow-md space-y-8">
          
          {/* Form to create block */}
          <div className="space-y-4">
            <h3 className="text-lg font-extrabold text-slate-950">Forzar Estado "No Disponible" (Mantenimiento)</h3>
            <p className="text-xs text-slate-700 font-medium">Bloqueá un rango de fechas en el calendario público para reparaciones o uso privado.</p>

            <form onSubmit={handleCreateBlock} className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">Seleccionar Cabaña *</label>
                <select
                  required
                  value={blockCabinId}
                  onChange={(e) => setBlockCabinId(e.target.value)}
                  className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-slate-950 text-xs font-bold focus:outline-none focus:border-rose-500"
                >
                  <option value="">-- Elegir Cabaña --</option>
                  {cabins.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">Fecha Desde *</label>
                <input
                  type="date"
                  required
                  value={blockStart}
                  onChange={(e) => setBlockStart(e.target.value)}
                  className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-slate-950 text-xs font-bold focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">Fecha Hasta *</label>
                <input
                  type="date"
                  required
                  value={blockEnd}
                  onChange={(e) => setBlockEnd(e.target.value)}
                  className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-slate-950 text-xs font-bold focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <button
                  type="submit"
                  disabled={blockSubmitting}
                  className="w-full py-2.5 px-4 rounded-xl font-bold text-xs bg-rose-600 hover:bg-rose-700 text-white flex items-center justify-center gap-1.5 shadow"
                >
                  <Plus className="w-4 h-4" /> Bloquear Fechas
                </button>
              </div>
            </form>
          </div>

          {/* List of active blocks */}
          <div className="space-y-4 pt-4 border-t border-slate-200">
            <h4 className="text-sm font-extrabold text-slate-950">Bloqueos de Mantenimiento Activos</h4>

            {blockedDates.length === 0 ? (
              <div className="text-center py-8 text-slate-600 text-xs font-medium">
                No hay bloqueos manuales activos.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-950">
                  <thead className="text-[11px] uppercase tracking-wider text-slate-800 border-b border-slate-300 bg-slate-100 font-extrabold">
                    <tr>
                      <th className="p-3">Cabaña</th>
                      <th className="p-3">Rango Bloqueado</th>
                      <th className="p-3">Motivo</th>
                      <th className="p-3">Acción</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {blockedDates.map((b) => (
                      <tr key={b.id} className="hover:bg-slate-50 transition-colors">
                        <td className="p-3 font-extrabold text-slate-950">{b.cabin.name}</td>
                        <td className="p-3 font-bold text-rose-600">
                          {format(new Date(b.startDate), 'dd/MM/yyyy')} ➔ {format(new Date(b.endDate), 'dd/MM/yyyy')}
                        </td>
                        <td className="p-3 text-slate-700 font-medium">{b.reason || 'Mantenimiento'}</td>
                        <td className="p-3">
                          <button
                            onClick={() => handleDeleteBlock(b.id)}
                            className="p-2 rounded-lg bg-rose-100 text-rose-700 hover:bg-rose-200 transition-colors"
                            title="Eliminar bloqueo"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

        </div>
      )}

    </div>
  );
}
