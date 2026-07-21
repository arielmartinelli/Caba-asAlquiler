'use client';

import React from 'react';
import { Star, Quote, CheckCircle2, HeartHandshake } from 'lucide-react';

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
        'Tener bajada directa al río Santa Rosa fue lo mejor de las vacaciones. Los chicos disfrutaron de la piscina y los adultos del asador con vista a la agua. 100% recomendable, volveremos seguro.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    },
    {
      name: 'Carlos & Amigos (Grupo de 9)',
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
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center space-y-4 mb-12">
        <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest bg-emerald-950 px-3.5 py-1.5 rounded-full border border-emerald-500/30">
          Experiencias Reales
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
          Lo que dicen nuestros huéspedes
        </h2>
        <p className="text-slate-400 text-sm max-w-2xl mx-auto">
          Reseñas verificadas de familias y parejas que disfrutaron su estadía en Calamuchita.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((item, idx) => (
          <div
            key={idx}
            className="glass-card p-6 rounded-3xl border border-white/10 flex flex-col justify-between relative group hover:border-amber-500/30 transition-all hover:-translate-y-1 shadow-xl"
          >
            <Quote className="w-10 h-10 text-emerald-500/20 absolute top-6 right-6" />

            <div className="space-y-4">
              {/* Stars */}
              <div className="flex items-center gap-1">
                {[...Array(item.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Comment */}
              <p className="text-xs text-slate-300 italic leading-relaxed">
                "{item.comment}"
              </p>
            </div>

            {/* Author */}
            <div className="flex items-center gap-3 pt-6 mt-4 border-t border-white/5">
              <img
                src={item.avatar}
                alt={item.name}
                className="w-11 h-11 rounded-full object-cover border-2 border-emerald-500/40"
              />
              <div className="space-y-0.5">
                <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                  {item.name}
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" title="Reserva Verificada" />
                </h4>
                <div className="text-[11px] text-amber-400 font-medium">{item.cabin}</div>
                <div className="text-[10px] text-slate-400">{item.location} • {item.date}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
