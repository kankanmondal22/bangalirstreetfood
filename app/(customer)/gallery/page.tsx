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
    src: "/gallery/bsf1.jpeg",
    name: "Beach Sunset",
    tags: ["beach", "sunset", "travel"],
  },
  {
    id: "2",
    src: "/gallery/bsf2.jpeg",
    name: "I love Pahalgam",
    tags: ["mountain", "hiking", "adventure"],
  },
  {
    id: "3",
    src: "/gallery/bsf3.jpeg",
    name: "City Skyline",
    tags: ["city", "skyline", "night"],
  },
  {
    id: "4",
    src: "/gallery/bsf4.jpeg",
    name: "Forest Trail",
    tags: ["forest", "trail", "nature"],
  },
  {
    id: "5",
    src: "/gallery/bsf5.jpeg",
    name: "Desert Dunes",
    tags: ["desert", "dunes", "sunset"],
  },
  {
    id: "6",
    src: "/gallery/bsf6.jpeg",
    name: "Snowy Mountains",
    tags: ["snow", "mountains", "winter"],
  },
  {
    id: "7",
    src: "/gallery/bsf7.jpeg",
    name: "Tropical Paradise",
    tags: ["tropical", "paradise", "beach"],
  },
  {
    id: "8",
    src: "/gallery/bsf8.jpeg",
    name: "Countryside Road",
    tags: ["countryside", "road", "travel"],
  },
  {
    id: "9",
    src: "/gallery/bsf9.jpeg",
    name: "Lakeside Cabin",
    tags: ["lake", "cabin", "nature"],
  },
  {
    id: "10",
    src: "/gallery/bsf10.jpeg",
    name: "Sunrise Over Hills",
    tags: ["sunrise", "hills", "scenery"],
  },
  {
    id: "11",
    src: "/gallery/bsf11.jpeg",
    name: "City Street",
    tags: ["city", "street", "urban"],
  },
  {
    id: "12",
    src: "/gallery/bsf12.jpeg",
    name: "Ocean Waves",
    tags: ["ocean", "waves", "beach"],
  },
  {
    id: "13",
    src: "/gallery/bsf13.jpeg",
    name: "Countryside Sunset",
    tags: ["countryside", "sunset", "nature"],
  },
];

const rotations = ["-rotate-3", "rotate-2", "-rotate-1", "rotate-3"];

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
      <h1 className="font-handwriting mt-8 mb-2 text-center text-7xl font-semibold">
        Gallery
      </h1>
      <p className="mb-12 text-center text-gray-700">
        Explore our vibrant gallery showcasing the essence of Bangalore Street
        Food.
      </p>

      <div className="grid grid-cols-1 gap-16 sm:grid-cols-2 lg:grid-cols-3">
        {sampleData.map((image, index) => (
          <button
            key={image.id}
            type="button"
            onClick={() => setSelectedIndex(index)}
            className={`${rotations[index % rotations.length]} bg-white p-3 pb-6 shadow transition-all duration-300 hover:rotate-0 hover:shadow-xl`}
          >
            <Image
              src={image.src}
              alt={image.name}
              width={400}
              height={300}
              className="h-56 w-full object-cover brightness-95 contrast-95 sepia-[0.2]"
            />
            <p className="font-handwriting mt-3 text-center text-xl font-bold text-gray-800">
              {image.name}
            </p>
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
