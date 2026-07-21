'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ShieldCheck, Clock, Dog, Shirt, CreditCard } from 'lucide-react';

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
      icon: <Dog className="w-5 h-5 text-rose-500" />,
    },
    {
      question: '¿Cuáles son los horarios de Check-In y Check-Out?',
      answer:
        'El Check-in se realiza a partir de las 14:00 hs y el Check-out es hasta las 10:00 hs. En caso de requerir un horario especial (Early check-in o Late check-out), coordinar previamente con los dueños sujeto a disponibilidad.',
      icon: <Clock className="w-5 h-5 text-emerald-600" />,
    },
    {
      question: '¿Qué incluye la ropa de blanco y servicios?',
      answer:
        'Todas las estadías incluyen juegos completos de sábanas de primera calidad, toallas y toallones para baño, secador de pelo, elementos de limpieza iniciales y leña de cortesía para el hogar o salamandra.',
      icon: <Shirt className="w-5 h-5 text-slate-700" />,
    },
    {
      question: '¿Cómo funciona el proceso de seña y métodos de pago?',
      answer:
        'Para congelar la fecha de tu reserva solicitamos una seña del 30% o 50% del total mediante transferencia bancaria, Mercado Pago o depósito. El saldo restante se liquida al momento del ingreso en efectivo, transferencia o dólares (US$).',
      icon: <CreditCard className="w-5 h-5 text-rose-500" />,
    },
    {
      question: '¿Cuál es la política de cancelación o cambio de fecha?',
      answer:
        'Entendemos los imprevistos. Si cancelás con al menos 15 días de anticipación a tu check-in, la seña queda acreditada como saldo a favor para reprogramar tu estadía dentro de los siguientes 6 meses.',
      icon: <ShieldCheck className="w-5 h-5 text-emerald-600" />,
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center space-y-3 mb-10">
        <span className="text-xs font-bold text-rose-500 uppercase tracking-widest bg-rose-50 px-3.5 py-1.5 rounded-full border border-rose-200">
          Preguntas Frecuentes
        </span>
        <h2 className="text-3xl font-extrabold text-slate-900">
          Todo lo que necesitás saber
        </h2>
        <p className="text-slate-500 text-xs sm:text-sm max-w-lg mx-auto">
          Respuestas claras sobre los servicios, señas y estadías en Calamuchita.
        </p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden ${
                isOpen ? 'border-rose-300 shadow-md' : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <button
                onClick={() => toggleFAQ(idx)}
                className="w-full p-5 flex items-center justify-between text-left gap-4"
              >
                <div className="flex items-center gap-3.5">
                  <div className="p-2 rounded-xl bg-slate-50 border border-slate-200 shrink-0">
                    {faq.icon}
                  </div>
                  <span className="text-sm font-bold text-slate-900 leading-snug">
                    {faq.question}
                  </span>
                </div>
                <div
                  className={`p-1.5 rounded-full transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-rose-500 bg-rose-50' : 'text-slate-400'
                  }`}
                >
                  <ChevronDown className="w-5 h-5" />
                </div>
              </button>

              {isOpen && (
                <div className="px-6 pb-6 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100">
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
