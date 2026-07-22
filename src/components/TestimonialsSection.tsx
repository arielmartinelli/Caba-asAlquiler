'use client';

import React from 'react';
import { Star, CheckCircle2, Award } from 'lucide-react';

interface Testimonial {
 name: string;
 location: string;
 cabin: string;
 date: string;
 rating: number;
 comment: string;
 avatar: string;
}

export default function TestimonialsSection() {
 const testimonials: Testimonial[] = [
 {
 name: 'Mariana & Gustavo',
 location: 'Rosario, Santa Fe',
 cabin: 'Cabaña Sendero de Montaña',
 date: 'Enero 2026',
 rating: 5,
 comment:
 'Una experiencia impecable. La tranquilidad del barrio y la vista a las sierras desde el deck al atardecer son inigualables. La cabaña súper limpia, equipada y el trato de los dueños super atento.',
 avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
 },
 {
 name: 'Familia Rossi',
 location: 'Córdoba Capital',
 cabin: 'Cabaña Orilla del Río',
 date: 'Febrero 2026',
 rating: 5,
 comment:
 'Tener bajada directa al río Santa Rosa fue lo mejor de las vacaciones. Los chicos disfrutaron de la piscina y los adultos del asador con vista al agua. 100% recomendable, volveremos seguro.',
 avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
 },
 {
 name: 'Carlos & Amigos',
 location: 'Buenos Aires',
 cabin: 'Cabaña Gran Cumbres',
 date: 'Diciembre 2025',
 rating: 5,
 comment:
 'Alquilamos Gran Cumbres para fin de año entre 3 familias. Espaciosa, cómoda y con un quincho enorme donde pasamos noches geniales. Excelente la atención y el sistema de reserva directa.',
 avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
 },
 ];

 return (
 <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
 <div className="text-center space-y-3 mb-10">
 <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-rose-600 uppercase tracking-widest bg-rose-50 px-3.5 py-1.5 rounded-full border border-rose-200 ">
 <Award className="w-4 h-4 text-rose-500" /> Evaluación 4.98 ★★★★★
 </div>
 <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 ">
 Opiniones de nuestros huéspedes
 </h2>
 <p className="text-slate-700 text-xs sm:text-sm max-w-xl mx-auto font-medium">
 Reseñas auténticas de quienes disfrutaron sus vacaciones en nuestras cabañas.
 </p>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
 {testimonials.map((item, idx) => (
 <div
 key={idx}
 className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-all"
 >
 <div className="space-y-3">
 <div className="flex items-center gap-1">
 {[...Array(item.rating)].map((_, i) => (
 <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
 ))}
 </div>

 <p className="text-xs text-slate-900 leading-relaxed italic font-normal">
 "{item.comment}"
 </p>
 </div>

 <div className="flex items-center gap-3 pt-4 mt-4 border-t border-slate-100 ">
 <img
 src={item.avatar}
 alt={item.name}
 className="w-10 h-10 rounded-full object-cover border-2 border-rose-400"
 />
 <div>
 <h4 className="text-xs font-extrabold text-slate-950 flex items-center gap-1">
 {item.name}
 <span title="Reserva Verificada">
 <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 " />
 </span>
 </h4>
 <div className="text-[11px] text-rose-500 font-extrabold">{item.cabin}</div>
 <div className="text-[10px] text-slate-500 font-medium">{item.location} • {item.date}</div>
 </div>
 </div>
 </div>
 ))}
 </div>
 </section>
 );
}
