'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Maximize2, X, Camera } from 'lucide-react';

interface PhotoCarouselProps {
  images: string[];
  cabinName: string;
}

export default function PhotoCarousel({ images = [], cabinName }: PhotoCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const photoList = images.length > 0 ? images : ['/images/cabin-sendero.jpg'];

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? photoList.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === photoList.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="space-y-4">
      
      {/* Main Image Container */}
      <div className="relative h-[420px] sm:h-[480px] w-full rounded-3xl overflow-hidden glass-card border border-white/10 shadow-2xl group">
        <Image
          src={photoList[currentIndex]}
          alt={`${cabinName} - Foto ${currentIndex + 1}`}
          fill
          className="object-cover transition-all duration-500 group-hover:scale-105"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />

        {/* Counter Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-slate-950/80 text-amber-400 backdrop-blur-md border border-white/10 flex items-center gap-1.5">
            <Camera className="w-3.5 h-3.5" />
            {currentIndex + 1} / {photoList.length} Fotos
          </span>
        </div>

        {/* Fullscreen Expand Button */}
        <button
          onClick={() => setLightboxOpen(true)}
          className="absolute top-4 right-4 p-2.5 rounded-full bg-slate-950/80 hover:bg-amber-500 text-white hover:text-slate-950 transition-all backdrop-blur-md border border-white/10"
          title="Ver en pantalla completa"
        >
          <Maximize2 className="w-4 h-4" />
        </button>

        {/* Navigation Arrows */}
        {photoList.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-950/70 hover:bg-amber-500 text-white hover:text-slate-950 transition-all backdrop-blur-md border border-white/10 opacity-90 hover:opacity-100 hover:scale-110"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-950/70 hover:bg-amber-500 text-white hover:text-slate-950 transition-all backdrop-blur-md border border-white/10 opacity-90 hover:opacity-100 hover:scale-110"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails Strip */}
      {photoList.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-thin">
          {photoList.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`relative h-20 w-28 shrink-0 rounded-xl overflow-hidden transition-all ${
                currentIndex === idx
                  ? 'ring-2 ring-amber-400 scale-105 opacity-100'
                  : 'opacity-50 hover:opacity-100 border border-white/10'
              }`}
            >
              <Image src={img} alt={`Thumb ${idx + 1}`} fill className="object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-xl flex items-center justify-center p-4">
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 text-white hover:bg-rose-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="relative w-full max-w-5xl h-[80vh]">
            <Image
              src={photoList[currentIndex]}
              alt={`${cabinName} Fullscreen`}
              fill
              className="object-contain"
            />
          </div>

          {photoList.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-6 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/10 hover:bg-amber-500 text-white hover:text-slate-950 transition-all"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-6 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/10 hover:bg-amber-500 text-white hover:text-slate-950 transition-all"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </>
          )}
        </div>
      )}

    </div>
  );
}
