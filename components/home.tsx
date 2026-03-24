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

const socialVideos = [
  {
    src: "https://youtube.com/shorts/2cAhgYgrs8w?si=skP3ma8vSIBGlsaq",
  },
  {
    src: "https://youtube.com/shorts/2cAhgYgrs8w?si=skP3ma8vSIBGlsaq",
  },
  {
    src: "https://www.facebook.com/reel/1607947723575668",
  },
  {
    src: "https://www.facebook.com/reel/1607947723575668",
  },
];

const getYouTubeEmbedUrl = (url: string) => {
  try {
    const parsed = new URL(url);

    if (parsed.hostname.includes("youtu.be")) {
      const id = parsed.pathname.replace("/", "");
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }

    if (parsed.hostname.includes("youtube.com")) {
      if (parsed.pathname.startsWith("/shorts/")) {
        const id = parsed.pathname.split("/shorts/")[1]?.split("/")[0];
        return id ? `https://www.youtube.com/embed/${id}` : null;
      }

      const id = parsed.searchParams.get("v");
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }

    return null;
  } catch {
    return null;
  }
};

const getFacebookEmbedUrl = (url: string) => {
  try {
    const parsed = new URL(url);

    if (
      !parsed.hostname.includes("facebook.com") &&
      !parsed.hostname.includes("fb.watch")
    ) {
      return null;
    }

    let canonicalVideoUrl = url;

    if (parsed.hostname.includes("facebook.com")) {
      if (parsed.pathname.startsWith("/share/v/")) {
        const videoId = parsed.pathname.split("/share/v/")[1]?.split("/")[0];
        if (videoId) {
          canonicalVideoUrl = `https://www.facebook.com/watch/?v=${videoId}`;
        }
      }
    }

    if (parsed.hostname.includes("fb.watch")) {
      const videoId = parsed.pathname.replaceAll("/", "");
      if (videoId) {
        canonicalVideoUrl = `https://www.facebook.com/watch/?v=${videoId}`;
      }
    }

    return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(canonicalVideoUrl)}&show_text=false&width=500`;
  } catch {
    return null;
  }
};

const Home = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<ReturnType<typeof gsap.to> | null>(null);
  const socialTrackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const startMarquee = () => {
      const totalWidth = track.scrollWidth / 2;
      if (!totalWidth) return;

      tweenRef.current?.kill();
      gsap.set(track, { x: 0 });

      tweenRef.current = gsap.to(track, {
        x: -totalWidth,
        duration: 50,
        ease: "none",
        repeat: -1,
      });
    };

    const handleResize = () => startMarquee();
    const handleWindowLoad = () => startMarquee();

    startMarquee();
    window.addEventListener("resize", handleResize);
    window.addEventListener("load", handleWindowLoad);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("load", handleWindowLoad);
      tweenRef.current?.kill();
      tweenRef.current = null;
    };
  }, []);

  return (
    <div>
      {/* <div className="my-6 flex w-full gap-6 px-4">
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
      </div> */}

      {/* Image Marquee Section */}
      <h1 className="mx-auto max-w-6xl px-4 pt-4 pb-6 text-3xl font-extrabold text-red-950 sm:text-4xl md:text-5xl">
        Escape & Explore with us
      </h1>
      <section
        className="mx-auto max-w-6xl overflow-hidden px-4"
        onMouseEnter={() => tweenRef.current?.pause()}
        onMouseLeave={() => tweenRef.current?.resume()}
      >
        <div ref={trackRef} className="flex gap-4 object-contain">
          {[...images, ...images].map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="group relative shrink-0 overflow-hidden"
            >
              <Image
                src={item.src}
                alt={item.title}
                width={380}
                height={260}
                className="h-auto w-[72vw] max-w-95 rounded-2xl transition-transform duration-300 group-hover:scale-105 sm:w-[320px] md:w-95"
              />
              {/* Always visible title */}
              <div className="bg-liner-to-t absolute inset-x-0 bottom-0 from-black to-transparent p-4">
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
      {/* Social Media Videos Section */}
      <section className="mx-auto mt-10 max-w-6xl px-4 sm:mt-12">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-2xl font-bold text-red-950 sm:text-3xl">
            Social Media Videos
          </h2>
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Scroll social videos left"
              className="rounded-full border border-red-900 px-2.5 py-1.5 text-sm text-red-900 transition-colors hover:bg-red-900 hover:text-white sm:px-3 sm:py-2 sm:text-base"
              onClick={() =>
                socialTrackRef.current?.scrollBy({
                  left: -340,
                  behavior: "smooth",
                })
              }
            >
              ←
            </button>
            <button
              type="button"
              aria-label="Scroll social videos right"
              className="rounded-full border border-red-900 px-2.5 py-1.5 text-sm text-red-900 transition-colors hover:bg-red-900 hover:text-white sm:px-3 sm:py-2 sm:text-base"
              onClick={() =>
                socialTrackRef.current?.scrollBy({
                  left: 340,
                  behavior: "smooth",
                })
              }
            >
              →
            </button>
          </div>
        </div>

        <div
          ref={socialTrackRef}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {socialVideos.map((video, index) =>
            (() => {
              const youtubeEmbedUrl = getYouTubeEmbedUrl(video.src);
              const facebookEmbedUrl = getFacebookEmbedUrl(video.src);
              const socialEmbedUrl = youtubeEmbedUrl ?? facebookEmbedUrl;

              return (
                <article
                  key={index}
                  className="w-[82vw] max-w-[320px] shrink-0 snap-start overflow-hidden rounded-xl border border-red-100 bg-white shadow-sm sm:w-[320px]"
                >
                  {socialEmbedUrl ? (
                    <iframe
                      className="h-96 w-full bg-black sm:h-140"
                      src={socialEmbedUrl}
                      title={`Social video ${index + 1}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  ) : (
                    <video
                      className="h-96 w-full bg-black object-cover sm:h-140"
                      src={video.src}
                      controls
                      preload="metadata"
                    />
                  )}
                </article>
              );
            })(),
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
