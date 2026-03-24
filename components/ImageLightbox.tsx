"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

type LightboxImage = {
  src: string;
  alt: string;
  title?: string;
};

interface ImageLightboxProps {
  images: LightboxImage[];
  isOpen: boolean;
  initialIndex?: number;
  onClose: () => void;
}

export default function ImageLightbox({
  images,
  isOpen,
  initialIndex = 0,
  onClose,
}: ImageLightboxProps) {
  const safeInitialIndex = useMemo(() => {
    if (!images.length) return 0;
    if (initialIndex < 0) return 0;
    if (initialIndex > images.length - 1) return images.length - 1;
    return initialIndex;
  }, [images.length, initialIndex]);

  const [currentIndex, setCurrentIndex] = useState(safeInitialIndex);
  const [lastInitialIndex, setLastInitialIndex] = useState(safeInitialIndex);

  // Reset currentIndex when initialIndex changes
  if (safeInitialIndex !== lastInitialIndex) {
    setCurrentIndex(safeInitialIndex);
    setLastInitialIndex(safeInitialIndex);
  }

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !images.length) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
      }
      if (event.key === "ArrowRight") {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [images.length, isOpen, onClose]);

  if (!isOpen || !images.length) return null;

  const currentImage = images[currentIndex];
  const goPrev = () =>
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  const goNext = () => setCurrentIndex((prev) => (prev + 1) % images.length);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-md"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Image lightbox"
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 rounded-full border border-white/30 bg-black/50 p-2 text-white hover:bg-black/70"
        aria-label="Close lightbox"
      >
        <X className="h-5 w-5" />
      </button>

      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          goPrev();
        }}
        className="absolute left-4 rounded-full border border-white/30 bg-black/70 p-2 text-white hover:bg-black/70"
        aria-label="Previous image"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <div
        className="relative w-full max-w-5xl rounded-xl p-3"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="relative h-[45vh] w-full overflow-hidden rounded-lg sm:h-[60vh]">
          <Image
            src={currentImage.src}
            alt={currentImage.alt}
            fill
            className="object-contain"
            sizes="100vw"
            priority
          />
        </div>

        <div className="mt-3 text-center text-sm text-white/90">
          {currentImage.title ?? currentImage.alt}
        </div>
      </div>

      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          goNext();
        }}
        className="absolute right-4 rounded-full border border-white/30 bg-black/50 p-2 text-white hover:bg-black/70"
        aria-label="Next image"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
    </div>
  );
}
