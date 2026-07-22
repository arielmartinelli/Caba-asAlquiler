'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Maximize2, Camera } from 'lucide-react';
import LightboxModal from './LightboxModal';

interface PhotoCarouselProps {
 images: string[];
 cabinName: string;
}

export default function PhotoCarousel({ images = [], cabinName }: PhotoCarouselProps) {
 const [currentIndex, setCurrentIndex] = useState(0);
 const [lightboxOpen, setLightboxOpen] = useState(false);

 const photoList = images.length > 0 ? images : ['/images/cabin-sendero.jpg'];

 const prevSlide = (e?: React.MouseEvent) => {
 e?.stopPropagation();
 setCurrentIndex((prev) => (prev === 0 ? photoList.length - 1 : prev - 1));
 };

 const nextSlide = (e?: React.MouseEvent) => {
 e?.stopPropagation();
 setCurrentIndex((prev) => (prev === photoList.length - 1 ? 0 : prev + 1));
 };

 return (
 <div className="space-y-4">
 
 {/* Main Image Container */}
 <div
 onClick={() => setLightboxOpen(true)}
 className="relative h-[420px] sm:h-[480px] w-full rounded-3xl overflow-hidden glass-card border border-white/10 shadow-2xl group cursor-zoom-in"
 >
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
 onClick={(e) => {
 e.stopPropagation();
 setLightboxOpen(true);
 }}
 className="absolute top-4 right-4 p-2.5 rounded-full bg-slate-950/80 hover:bg-amber-500 text-white hover:text-slate-950 transition-all backdrop-blur-md border border-white/10 shadow-lg"
 title="Ver en pantalla completa"
 >
 <Maximize2 className="w-4 h-4" />
 </button>

 {/* Navigation Arrows */}
 {photoList.length > 1 && (
 <>
 <button
 onClick={prevSlide}
 className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-950/70 hover:bg-amber-500 text-white hover:text-slate-950 transition-all backdrop-blur-md border border-white/10 opacity-90 hover:opacity-100 hover:scale-110 shadow-xl"
 >
 <ChevronLeft className="w-6 h-6" />
 </button>
 <button
 onClick={nextSlide}
 className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-950/70 hover:bg-amber-500 text-white hover:text-slate-950 transition-all backdrop-blur-md border border-white/10 opacity-90 hover:opacity-100 hover:scale-110 shadow-xl"
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
 <LightboxModal
 images={photoList}
 currentIndex={currentIndex}
 isOpen={lightboxOpen}
 onClose={() => setLightboxOpen(false)}
 onSelectIndex={(idx) => setCurrentIndex(idx)}
 />

 </div>
 );
}
