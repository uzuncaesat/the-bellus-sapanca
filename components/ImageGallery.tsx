'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';

interface ImageGalleryProps {
  images: string[];
  villaName: string;
}

export default function ImageGallery({ images, villaName }: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const lightboxRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [30, -30]);
  const rotateY = useTransform(x, [-100, 100], [-30, 30]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;

      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          goToLightboxPrevious();
          break;
        case 'ArrowRight':
          e.preventDefault();
          goToLightboxNext();
          break;
        case 'Escape':
          e.preventDefault();
          closeLightbox();
          break;
        case '+':
        case '=':
          e.preventDefault();
          setZoom((prev) => Math.min(prev + 0.2, 3));
          break;
        case '-':
          e.preventDefault();
          setZoom((prev) => Math.max(prev - 0.2, 0.5));
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, lightboxIndex]);

  // Fullscreen API
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      lightboxRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
    setZoom(1);
    x.set(0);
    y.set(0);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setZoom(1);
    x.set(0);
    y.set(0);
  };

  const goToLightboxPrevious = () => {
    setLightboxIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    setZoom(1);
    x.set(0);
    y.set(0);
  };

  const goToLightboxNext = () => {
    setLightboxIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    setZoom(1);
    x.set(0);
    y.set(0);
  };

  // Swipe gestures
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(0);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && lightboxOpen) {
      goToLightboxNext();
    }
    if (isRightSwipe && lightboxOpen) {
      goToLightboxPrevious();
    }
  };

  const resetZoom = () => {
    setZoom(1);
    x.set(0);
    y.set(0);
  };

  if (images.length === 0) {
    return null;
  }

  return (
    <>
      {/* Main Gallery */}
      <div className="relative w-full">
        {/* Main Image */}
        <div className="relative h-[500px] md:h-[600px] w-full rounded-2xl overflow-hidden shadow-large">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full h-full"
            >
              <Image
                src={images[currentIndex]}
                alt={`${villaName} - Görsel ${currentIndex + 1}`}
                fill
                className="object-cover cursor-zoom-in"
                onClick={() => openLightbox(currentIndex)}
                priority={currentIndex === 0}
                sizes="100vw"
              />
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          {images.length > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm hover:bg-white text-luxury-dark p-3 rounded-full shadow-large transition-all duration-200 z-10 hover:scale-110"
                aria-label="Önceki görsel"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm hover:bg-white text-luxury-dark p-3 rounded-full shadow-large transition-all duration-200 z-10 hover:scale-110"
                aria-label="Sonraki görsel"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}

          {/* Image Counter */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium shadow-large">
              {currentIndex + 1} / {images.length}
            </div>
          )}
        </div>

        {/* Thumbnail Strip */}
        {images.length > 1 && (
          <div className="flex gap-2 mt-4 overflow-x-auto pb-2 scrollbar-hide">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
                className={`relative h-20 md:h-24 min-w-[80px] md:min-w-[120px] rounded-xl overflow-hidden border-2 transition-all duration-200 flex-shrink-0 ${
                  currentIndex === index
                    ? 'border-whatsapp scale-105 shadow-medium'
                    : 'border-transparent hover:border-gray-300'
                }`}
              >
                <Image
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 80px, 120px"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox with Zoom */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            ref={lightboxRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/98 flex items-center justify-center p-4"
            onClick={closeLightbox}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-50 text-white hover:text-gray-300 transition-colors p-2 bg-black/50 rounded-full backdrop-blur-sm"
              aria-label="Kapat"
            >
              <X size={28} />
            </button>

            {/* Zoom Controls */}
            <div className="absolute top-4 left-4 z-50 flex gap-2">
              <button
                onClick={() => setZoom((prev) => Math.min(prev + 0.2, 3))}
                className="text-white hover:text-gray-300 transition-colors p-2 bg-black/50 rounded-full backdrop-blur-sm"
                aria-label="Yakınlaştır"
              >
                <ZoomIn size={20} />
              </button>
              <button
                onClick={() => setZoom((prev) => Math.max(prev - 0.2, 0.5))}
                className="text-white hover:text-gray-300 transition-colors p-2 bg-black/50 rounded-full backdrop-blur-sm"
                aria-label="Uzaklaştır"
              >
                <ZoomOut size={20} />
              </button>
              <button
                onClick={toggleFullscreen}
                className="text-white hover:text-gray-300 transition-colors p-2 bg-black/50 rounded-full backdrop-blur-sm"
                aria-label="Tam ekran"
              >
                <Maximize2 size={20} />
              </button>
            </div>

            <div
              className="relative max-w-7xl w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  ref={imageRef}
                  key={lightboxIndex}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="relative w-full h-full max-h-[90vh] cursor-grab active:cursor-grabbing"
                  style={{
                    scale: zoom,
                    x,
                    y,
                    rotateX,
                    rotateY,
                  }}
                  drag
                  dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
                  onDoubleClick={resetZoom}
                >
                  <Image
                    src={images[lightboxIndex]}
                    alt={`${villaName} - Görsel ${lightboxIndex + 1}`}
                    fill
                    className="object-contain"
                    sizes="100vw"
                    draggable={false}
                  />
                </motion.div>
              </AnimatePresence>

              {images.length > 1 && (
                <>
                  <button
                    onClick={goToLightboxPrevious}
                    className="absolute left-4 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-200 backdrop-blur-sm z-10"
                    aria-label="Önceki görsel"
                  >
                    <ChevronLeft size={32} />
                  </button>
                  <button
                    onClick={goToLightboxNext}
                    className="absolute right-4 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-200 backdrop-blur-sm z-10"
                    aria-label="Sonraki görsel"
                  >
                    <ChevronRight size={32} />
                  </button>
                </>
              )}

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium">
                {lightboxIndex + 1} / {images.length}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  );
}
