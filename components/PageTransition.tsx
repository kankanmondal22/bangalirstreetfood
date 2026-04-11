// components/PageTransition.tsx
"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface Props {
  children: ReactNode;
  duration?: number; // default 0.45s, pass longer for data pages
}

const PageTransition = ({ children, duration = 0.45 }: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(ref.current, {
        opacity: 0,
        y: 18,
        duration,
        ease: "power2.out",
        clearProps: "all",
      });
    },
    { scope: ref },
  );

  return <div ref={ref}>{children}</div>;
};

export default PageTransition;
