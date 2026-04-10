"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const PageLoader = ({ onComplete }: { onComplete: () => void }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const raysRef = useRef<SVGGElement>(null);
  const sunRef = useRef<SVGCircleElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const dotsRef = useRef<HTMLSpanElement[]>([]);
  const progressRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      // Sun pulse in
      tl.from(sunRef.current, {
        scale: 0,
        opacity: 0,
        duration: 0,
        ease: "back.out(1.7)",
        transformOrigin: "center",
      })
        // Title drops in
        .from(
          titleRef.current,
          {
            y: -30,
            opacity: 0,
            duration: 0.5,
            ease: "back.out(1.4)",
          },
          "-=0.2",
        )
        // Progress bar fills
        .to(
          progressRef.current,
          {
            width: "100%",
            duration: 1.1,
            ease: "power1.inOut",
          },
          "+=0.1",
        )
        // Fade out loader
        .to(
          containerRef.current,
          {
            opacity: 0,
            duration: 0.5,
            ease: "power2.inOut",
            onComplete,
          },
          "+=0.2",
        );

      // Rays spin continuously — separate from timeline
      gsap.to(raysRef.current, {
        rotate: 360,
        transformOrigin: "center",
        duration: 30,
        repeat: -1,
        ease: "linear",
      });

      // Dots bounce in loop
      dotsRef.current.forEach((dot, i) => {
        gsap.to(dot, {
          y: -6,
          duration: 0.4,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
          delay: i * 0.15,
        });
      });
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[url(/loding.png)] bg-cover bg-center"
    >
      {/* Overlay so text is readable */}
      <div className="absolute inset-0 bg-white/60" />

      <div className="relative z-10 flex flex-col items-center">
        {/* Same spiral sun as error page */}
        <svg
          width="120"
          height="120"
          viewBox="0 0 140 140"
          fill="none"
          className="mb-4"
        >
          <circle ref={sunRef} cx="68" cy="68" r="22" fill="#FDB813" />
          <g
            ref={raysRef}
            stroke="#FDB813"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          >
            {Array.from({ length: 10 }).map((_, i) => (
              <g key={i} transform={`rotate(${i * 36} 70 70)`}>
                <path d="M60 15 C75 30 45 40 60 55" />
              </g>
            ))}
          </g>
        </svg>

        {/* Title — matches your font style */}
        <h1
          ref={titleRef}
          className="text-5xl font-semibold text-gray-900 sm:text-6xl"
        >
          Loading
        </h1>

        {/* Bouncing dots */}
        <div className="mt-2 flex items-center gap-1">
          {[".", ".", "."].map((dot, i) => (
            <span
              key={i}
              ref={(el) => {
                if (el) dotsRef.current[i] = el;
              }}
              className="inline-block text-2xl font-bold"
              style={{ color: "#FDB813" }}
            >
              {dot}
            </span>
          ))}
        </div>

        {/* Progress bar */}
        <div className="mt-8 h-2 w-56 overflow-hidden rounded-full bg-gray-200 sm:w-72">
          <div
            ref={progressRef}
            className="h-full rounded-full"
            style={{
              width: "0%",
              background: "linear-gradient(90deg, #FDB813 0%, #F97316 100%)",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default PageLoader;
