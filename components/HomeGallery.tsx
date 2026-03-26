import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const galleryImages = [
  { src: "/pahar.jpeg", alt: "Mountain view" },
  { src: "/pahar2.jpeg", alt: "Hill landscape" },
  { src: "/kalokodhai.jpeg", alt: "Food close-up" },
  { src: "/sadakodhai.jpeg", alt: "Street food platter" },
  { src: "/hero.png", alt: "Travel destination" },
  { src: "/khobarchoriadin.png", alt: "Local experience" },
];

const HomeGallery = () => {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-8 sm:py-10">
      <div className="flex items-center justify-between">
        <div className="mb-5 sm:mb-6">
          <h2 className="text-2xl font-bold text-red-950 sm:text-3xl">
            Gallery
          </h2>
          <p className="mt-1 text-sm text-zinc-600 sm:text-base">
            Moments from our tours and food experiences.
          </p>
        </div>
        <Button asChild className="font-medium">
          <Link href={"/gallery"}>
            View More
            <ArrowRight className="h-5 w-5" />
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {galleryImages.map((image, index) => (
          <article
            key={`${image.src}-${index}`}
            className="group overflow-hidden rounded-xl border border-red-100 bg-white p-2 shadow-sm"
          >
            <Image
              src={image.src}
              alt={image.alt}
              height={500}
              width={500}
              // fill
              // sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="aspect-3/2 w-full rounded-xl object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </article>
        ))}
      </div>
    </section>
  );
};

export default HomeGallery;
