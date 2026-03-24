"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import ImageLightbox from "@/components/ImageLightbox";

type GalleryImageData = {
  id: string;
  src: string;
  name: string;
  tags: string[];
};
// sample images for travel
const sampleData: GalleryImageData[] = [
  {
    id: "1",
    src: "/pahar.jpeg",
    name: "Beach Sunset",
    tags: ["beach", "sunset", "travel"],
  },
  {
    id: "2",
    src: "/pahar.jpeg",
    name: "Mountain Hike",
    tags: ["mountain", "hiking", "adventure"],
  },
  {
    id: "3",
    src: "/pahar2.jpeg",
    name: "City Skyline",
    tags: ["city", "skyline", "night"],
  },
];

const GalleryPage = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const lightboxImages = useMemo(
    () =>
      sampleData.map((image) => ({
        src: image.src,
        alt: image.name,
        title: image.name,
      })),
    [],
  );

  return (
    <div className="mx-auto mt-16 max-w-6xl px-4 py-8">
      <h1 className="mt-4 mb-6 text-center text-5xl font-semibold">Gallery</h1>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {sampleData.map((image, index) => (
          <button
            key={image.id}
            type="button"
            onClick={() => setSelectedIndex(index)}
            className="border-grays-700 rounded-xl border-2 p-2 text-left transition"
          >
            <Image
              src={image.src}
              alt={image.name}
              width={400}
              height={300}
              className="h-56 w-full rounded-xl object-cover"
            />
          </button>
        ))}
      </div>

      <ImageLightbox
        images={lightboxImages}
        isOpen={selectedIndex !== null}
        initialIndex={selectedIndex ?? 0}
        onClose={() => setSelectedIndex(null)}
      />
    </div>
  );
};

export default GalleryPage;
