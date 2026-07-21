'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ShieldCheck, Heart, Clock, Sparkles, Dog, Shirt, CreditCard } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  icon: React.ReactNode;
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      question: '¿Aceptan mascotas en las cabañas?',
      answer:
        'Sí, en Cabaña Sendero de Montaña y Cabaña Orilla del Río aceptamos mascotas educadas de tamaño pequeño a mediano, bajo petición previa al momento de consultar. Pedimos cuidar las instalaciones y no dejarlas solas dentro de la propiedad.',
      icon: <Dog className="w-5 h-5 text-amber-400" />,
    },
    {
      question: '¿Cuáles son los horarios de Check-In y Check-Out?',
      answer:
        'El Check-in se realiza a partir de las 14:00 hs y el Check-out es hasta las 10:00 hs. En caso de requerir un horario especial (Early check-in o Late check-out), coordinar previamente con los dueños sujeto a disponibilidad.',
      icon: <Clock className="w-5 h-5 text-emerald-400" />,
    },
    {
      question: '¿Qué incluye la ropa de blanco y servicios?',
      answer:
        'Todas las estadías incluyen juegos completos de sábanas de primera calidad, toallas y toallones para baño, secador de pelo, elementos de limpieza iniciales y leña de cortesía para el hogar o salamandra.',
      icon: <Shirt className="w-5 h-5 text-cyan-400" />,
    },
    {
      question: '¿Cómo funciona el proceso de seña y métodos de pago?',
      answer:
        'Para congelar la fecha de tu reserva solicitamos una seña del 30% o 50% del total mediante transferencia bancaria, Mercado Pago o depósito. El saldo restante se liquida al momento del ingreso en efectivo, transferencia o dólares (US$).',
      icon: <CreditCard className="w-5 h-5 text-amber-400" />,
    },
    {
      question: '¿Cuál es la política de cancelación o cambio de fecha?',
      answer:
        'Entendemos los imprevistos. Si cancelás con al menos 15 días de anticipación a tu check-in, la seña queda acreditada como saldo a favor para reprogramar tu estadía dentro de los siguientes 6 meses.',
      icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center space-y-4 mb-10">
        <span className="text-xs font-bold text-amber-400 uppercase tracking-widest bg-amber-950/80 px-3.5 py-1.5 rounded-full border border-amber-500/30">
          Resolvé tus Dudas
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white flex items-center justify-center gap-2">
          Preguntas Frecuentes <HelpCircle className="w-7 h-7 text-amber-400 inline" />
        </h2>
        <p className="text-slate-400 text-sm max-w-xl mx-auto">
          Todo lo que necesitás saber antes de tu viaje a Santa Rosa de Calamuchita.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className={`glass-card rounded-2xl border transition-all duration-300 overflow-hidden ${
                isOpen ? 'border-amber-500/40 bg-slate-900/90 shadow-xl' : 'border-white/10 hover:border-white/20'
              }`}
            >
              <button
                onClick={() => toggleFAQ(idx)}
                className="w-full p-5 flex items-center justify-between text-left gap-4"
              >
                <div className="flex items-center gap-3.5">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 shrink-0">
                    {faq.icon}
                  </div>
                  <span className="text-base font-bold text-white leading-snug">
                    {faq.question}
                  </span>
                </div>
                <div
                  className={`p-2 rounded-full bg-white/5 transition-transform duration-300 ${
                    isOpen ? 'rotate-180 text-amber-400 bg-amber-500/10' : 'text-slate-400'
                  }`}
                >
                  <ChevronDown className="w-5 h-5" />
                </div>
              </button>

              {isOpen && (
                <div className="px-6 pb-6 pt-2 text-sm text-slate-300 leading-relaxed border-t border-white/5 animate-fadeIn">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
