"use client";

import React from "react";
import gsap from "gsap";
import TestimonialCard from "./TestimonialCard";
import Heading2 from "./reusable/Heading2";

interface Testimonial {
  id: number;
  name: string;
  text: string;
  rating: number;
  image?: string;
}

interface Props {
  data: Testimonial[];
  title?: string;
  subtitle?: string;
}

const Testimonials = ({
  data,
  title = "What our customers say",
  subtitle = "Join thousands of happy customers enjoying authentic Bengali street food",
}: Props) => {
  const trackRef = React.useRef<HTMLDivElement | null>(null);
  const tweenRef = React.useRef<gsap.core.Tween | null>(null);

  React.useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const maxScrollLeft = el.scrollWidth - el.clientWidth;
    if (maxScrollLeft <= 0) return;

    const tween = gsap.to(el, {
      scrollLeft: maxScrollLeft,
      duration: 15,
      ease: "none",
      repeat: -1,
      yoyo: true,
    });

    tweenRef.current = tween;

    return () => {
      tween.kill();
      tweenRef.current = null;
    };
  }, [data]); // 👈 important (re-run if data changes)

  return (
    <>
      <div>
        <div className="mb-8">
          <Heading2 subHeading={subtitle}>{title}</Heading2>
        </div>

        <div
          ref={trackRef}
          className="flex gap-6 overflow-x-auto p-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          onMouseEnter={() => tweenRef.current?.pause()}
          onMouseLeave={() => tweenRef.current?.resume()}
        >
          {data.map((testimonial) => (
            <TestimonialCard
              key={testimonial.id}
              id={testimonial.id}
              name={testimonial.name}
              text={testimonial.text}
              rating={testimonial.rating}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Testimonials;
