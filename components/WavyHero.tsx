"use client";
import React from "react";

type WavyHeroProps = {
  title: string;
  subtitle?: string;
  description?: string;
  bgImage: string;
};

const WavyHero = ({
  title,
  subtitle,
  description,
  bgImage,
}: WavyHeroProps) => {
  return (
    <div
      className="hero-mask-intersect relative mx-auto mb-10 flex items-center overflow-hidden px-6 py-16 sm:-mx-8 sm:min-h-80 sm:px-10 lg:min-h-[500px]"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-6xl p-8 text-white">
        
        {subtitle && (
          <p className="mb-2 text-xs font-semibold tracking-[0.25em] uppercase sm:text-sm">
            {subtitle}
          </p>
        )}

        <h1 className="font-handwriting mb-4 text-4xl font-semibold sm:text-5xl md:text-6xl lg:text-7xl">
          {title}
        </h1>

        {description && (
          <p className="max-w-2xl text-sm text-gray-100/90 sm:text-base">
            {description}
          </p>
        )}

      </div>
    </div>
  );
};

export default WavyHero;