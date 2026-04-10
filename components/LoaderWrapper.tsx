"use client";

import { useState, useEffect, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import PageLoader from "@/components/PageLoader";

const LoaderWrapper = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Start loader on next tick to avoid synchronous setState in effect
    const show = setTimeout(() => setLoading(true), 0);

    // Safety fallback — force hide after 4s even if animation stalls
    const fallback = setTimeout(() => setLoading(false), 4000);

    return () => {
      clearTimeout(show);
      clearTimeout(fallback);
    };
  }, [pathname]);

  return (
    <>
      {loading && <PageLoader onComplete={() => setLoading(false)} />}
      <div
        style={{
          opacity: loading ? 0 : 1,
          transition: "opacity 0.4s ease",
        }}
      >
        {children}
      </div>
    </>
  );
};

export default LoaderWrapper;
