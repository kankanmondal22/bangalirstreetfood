"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

// "use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
// import gsap from "gsap";
// import { useRef } from "react";
import { useGSAP } from "@gsap/react";

export default function NotFound() {
  const raysRef = useRef<SVGGElement>(null);

  useGSAP(() => {
    gsap.to(raysRef.current, {
      rotate: 360,
      transformOrigin: "center",
      duration: 30,
      repeat: -1,
      ease: "linear",
    });
  });

  return (
    <div className="flex min-h-[100vh] flex-col items-center justify-center bg-[url(/bg404.png)] bg-cover bg-center px-6 text-center">
      {/* Spiral Sun */}
      <svg
        width="148"
        height="148"
        viewBox="0 0 140 140"
        fill="none"
        className="mb-6"
      >
        {/* Sun center */}
        <g>
          {/* base sun */}
          <circle cx="68" cy="68" r="22" fill="#FDB813" />
        </g>

        {/* Spiral Rays */}
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

      {/* 404 text */}
      <h1 className="mb-3 text-7xl font-bold text-gray-900">404</h1>

      <p className="mb-6 max-w-md text-xl text-gray-600">
        Looks like this road doesn’t lead to any street food stall. Let’s take
        you back home.
      </p>

      <Button asChild size="xl" variant="accent">
        <Link href="/">Back to Home</Link>
      </Button>
    </div>
  );
}
