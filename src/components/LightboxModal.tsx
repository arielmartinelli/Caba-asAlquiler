'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

interface LightboxModalProps {
  images: string[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onSelectIndex: (idx: number) => void;
}

export default function LightboxModal({
  images,
  currentIndex,
  isOpen,
  onClose,
  onSelectIndex,
}: LightboxModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onSelectIndex((currentIndex + 1) % images.length);
      if (e.key === 'ArrowLeft') onSelectIndex((currentIndex - 1 + images.length) % images.length);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, images.length, onClose, onSelectIndex]);

  if (!isOpen || !images.length) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-slate-950/95 backdrop-blur-2xl flex flex-col justify-between p-4 sm:p-8 animate-fadeIn">
      
      {/* Top Header */}
      <div className="flex items-center justify-between z-10">
        <div className="text-xs text-amber-400 font-bold tracking-widest uppercase bg-slate-900/80 border border-white/10 px-4 py-2 rounded-full">
          Foto {currentIndex + 1} de {images.length}
        </div>
        <button
          onClick={onClose}
          className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all hover:scale-110"
          title="Cerrar (Esc)"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Main Image Container */}
      <div className="relative flex-1 my-4 flex items-center justify-center overflow-hidden">
        {/* Previous Button */}
        <button
          onClick={() => onSelectIndex((currentIndex - 1 + images.length) % images.length)}
          className="absolute left-2 sm:left-6 z-20 p-3.5 rounded-full bg-slate-900/80 hover:bg-emerald-600 text-white border border-white/10 transition-all hover:scale-110 shadow-2xl"
          title="Anterior (flecha izquierda)"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Current Photo */}
        <div className="relative max-w-5xl max-h-[75vh] w-full h-full flex items-center justify-center">
          <Image
            src={images[currentIndex]}
            alt={`Fotografía ${currentIndex + 1}`}
            fill
            className="object-contain rounded-2xl shadow-2xl transition-all duration-300 select-none"
            priority
          />
        </div>

        {/* Next Button */}
        <button
          onClick={() => onSelectIndex((currentIndex + 1) % images.length)}
          className="absolute right-2 sm:right-6 z-20 p-3.5 rounded-full bg-slate-900/80 hover:bg-emerald-600 text-white border border-white/10 transition-all hover:scale-110 shadow-2xl"
          title="Siguiente (flecha derecha)"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Bottom Thumbnail Strip */}
      <div className="flex items-center justify-center gap-3 overflow-x-auto py-2 px-4 z-10 max-w-3xl mx-auto">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => onSelectIndex(idx)}
            className={`relative w-16 h-12 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
              idx === currentIndex
                ? 'border-amber-400 scale-110 shadow-lg'
                : 'border-white/10 opacity-50 hover:opacity-100'
            }`}
          >
            <Image src={img} alt={`Miniatura ${idx + 1}`} fill className="object-cover" />
          </button>
        ))}
      </div>

    </div>
  );
}
