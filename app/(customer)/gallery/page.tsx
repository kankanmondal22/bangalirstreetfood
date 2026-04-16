"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import ImageLightbox from "@/components/ImageLightbox";
import WavyHero from "@/components/WavyHero";

type GalleryImageData = {
  id: string;
  src: string;
  name: string;
  tags: "kashmir" | "andaman" | "vizag" | "misc";
};

const tags = ["all", "kashmir", "andaman", "vizag", "misc"] as const;
// sample images for travel
const galleryImages: GalleryImageData[] = [
  {
    id: "1",
    src: "/gallery/bsf1.jpeg",
    name: "Beach Sunset",
    tags: "kashmir",
  },
  {
    id: "2",
    src: "/gallery/bsf2.jpeg",
    name: "I love Pahalgam",
    tags: "kashmir",
  },
  {
    id: "3",
    src: "/gallery/bsf3.jpeg",
    name: "City Skyline",
    tags: "misc",
  },
  {
    id: "4",
    src: "/gallery/bsf4.jpeg",
    name: "Forest Trail",
    tags: "misc",
  },
  {
    id: "5",
    src: "/gallery/bsf5.jpeg",
    name: "Desert Dunes",
    tags: "misc",
  },
  {
    id: "6",
    src: "/gallery/bsf6.jpeg",
    name: "Snowy Mountains",
    tags: "misc",
  },
  {
    id: "7",
    src: "/gallery/bsf7.jpeg",
    name: "Tropical Paradise",
    tags: "kashmir",
  },
  {
    id: "8",
    src: "/gallery/bsf8.jpeg",
    name: "Countryside Road",
    tags: "misc",
  },
  {
    id: "9",
    src: "/gallery/bsf9.jpeg",
    name: "Lakeside Cabin",
    tags: "misc",
  },
  {
    id: "10",
    src: "/gallery/bsf10.jpeg",
    name: "Sunrise Over Hills",
    tags: "misc",
  },
  {
    id: "11",
    src: "/gallery/bsf11.jpeg",
    name: "City Street",
    tags: "misc",
  },
  {
    id: "12",
    src: "/gallery/bsf12.jpeg",
    name: "Ocean Waves",
    tags: "misc",
  },
  {
    id: "13",
    src: "/gallery/bsf13.jpeg",
    name: "Countryside Sunset",
    tags: "misc",
  },
];

const rotations = ["-rotate-3", "rotate-2", "-rotate-1", "rotate-3"];

const GalleryPage = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [filterTag, setFilterTag] = useState<
    "all" | "kashmir" | "andaman" | "vizag" | "misc"
  >("all");
  const filteredData = useMemo(() => {
    if (filterTag === "all") return galleryImages;
    return galleryImages.filter((image) => image.tags === filterTag);
  }, [filterTag]);
  const lightboxImages = useMemo(
    () =>
      galleryImages.map((image) => ({
        src: image.src,
        alt: image.name,
        title: image.name,
      })),
    [],
  );

  return (
    <>
      <WavyHero
        title="Gallery"
        subtitle=""
        description="Explore our vibrant gallery showcasing the essence of Bangalore Street
          Food."
        bgImage="/pahar.jpeg"
      />

      <div className="mx-auto mt-16 max-w-6xl px-4 py-8">
        <div className="mb-12 flex w-fit gap-2">
          {tags.map((tagItem) => {
            return (
              <button
                key={tagItem}
                onClick={() => setFilterTag(tagItem)}
                className={`${filterTag === tagItem ? "bg-teal-700" : "bg-teal-500"} px-2 py-1 text-white capitalize hover:bg-teal-900`}
              >
                {tagItem}
              </button>
            );
          })}
        </div>
        <div className="grid grid-cols-1 gap-16 sm:grid-cols-2 lg:grid-cols-3">
          {filteredData.map((image, index) => (
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
    </>
  );
};

export default GalleryPage;
