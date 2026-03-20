"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const images = [
  {
    src: "/pahar.jpeg",
    title: "North Sikkim Tour",
    subtitle: "Explore Valleys & Lakes",
    info: "5N/6D • Meals Included • Best Season: Apr-Jun",
    href: "/package/north-sikkim",
  },
  {
    src: "/pahar.jpeg",
    title: "Dooars Adventure",
    subtitle: "10 Best Places",
    info: "3N/4D • Forest Safari • Family Friendly",
    href: "/package/dooars",
  },
  {
    src: "/pahar.jpeg",
    title: "Darjeeling Trip",
    subtitle: "Family & Couple Plans",
    info: "4N/5D • Toy Train • Tea Garden Visit",
    href: "/package/darjeeling",
  },
  {
    src: "/pahar.jpeg",
    title: "Gangtok Getaway",
    subtitle: "Delhi to Sikkim",
    info: "4N/5D • Tsomgo Lake • Local Sightseeing",
    href: "/package/gangtok",
  },
];

const Home = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<ReturnType<typeof gsap.to> | null>(null);

  useEffect(() => {
    if (!trackRef.current) return;
    const totalWidth = trackRef.current.scrollWidth / 2;
    tweenRef.current = gsap.to(trackRef.current, {
      x: -totalWidth,
      duration: 50,
      ease: "none",
      repeat: -1,
    });
  }, []);

  return (
    <div>
      <div className="my-6 flex w-full gap-6 px-4">
        <div className="flex h-64 w-full basis-2/3 items-end"></div>

        <div className="basis-1/3 border-3 border-dashed border-yellow-500 p-4 text-yellow-700">
          <p className="font-bold">Notice</p>
          <ul className="list-disc pl-5">
            <li>North Sikkim Tour: Explore the Valleys...</li>
            <li>10 Best Places to Visit in Dooars</li>
            <li>2026 Book Your Darjeeling Trip...</li>
            <li>Plan a Delhi to Sikkim Trip</li>
          </ul>
        </div>
      </div>

      {/* Image Marquee Section */}
      <h1 className="mx-auto max-w-6xl pb-6 text-7xl font-extrabold text-red-950">
        Escape & Explore with us
      </h1>
      <section
        className="mx-auto max-w-6xl overflow-hidden"
        onMouseEnter={() => tweenRef.current?.pause()}
        onMouseLeave={() => tweenRef.current?.resume()}
      >
        <div ref={trackRef} className="flex gap-4 object-contain">
          {[...images, ...images].map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="group relative flex-shrink-0 overflow-hidden"
            >
              <Image
                src={item.src}
                alt={item.title}
                width={380}
                height={260}
                className="transition-transform duration-300 group-hover:scale-105"
              />
              {/* Always visible title */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black to-transparent p-4">
                <p className="text-2xl font-bold text-white">{item.title}</p>
                {/* Subtitle only on hover */}
                <p className="max-h-0 overflow-hidden text-sm text-gray-200 transition-all duration-300 group-hover:max-h-10">
                  {item.subtitle}
                </p>
                <p className="max-h-0 overflow-hidden text-sm text-gray-200 transition-all duration-300 group-hover:max-h-10">
                  {item.info}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
