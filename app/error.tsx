"use client";

import { useRef } from "react";
import { useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error;
  unstable_retry: () => void;
}) {
  const raysRef = useRef(null);

  useEffect(() => {
    console.error(error);
  }, [error]);

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
    <div className="flex min-h-[100vh] flex-col items-center justify-center bg-[url(/error.png)] bg-cover bg-center px-6 text-center">
      {/* Same Spiral Sun */}
      <svg
        width="148"
        height="148"
        viewBox="0 0 140 140"
        fill="none"
        className="mb-6"
      >
        <g>
          <circle cx="68" cy="68" r="22" fill="#FDB813" />
        </g>

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

      {/* Error text */}
      <h1 className="mb-3 text-6xl font-bold text-gray-900">Oops!</h1>

      <p className="mb-6 max-w-md text-xl text-gray-600">
        Something went wrong while loading this page. Let’s try again.
      </p>

      {/* Retry button */}
      <Button onClick={() => unstable_retry()} size="xl" variant="accent">
        Try Again
      </Button>
    </div>
  );
}
