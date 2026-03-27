"use client";

import React from "react";
import { Star } from "lucide-react";
import gsap from "gsap";

interface Testimonial {
  id: number;
  name: string;
  text: string;
  rating: number;
  image?: string;
}

const Testimonials = () => {
  const trackRef = React.useRef<HTMLDivElement | null>(null);
  const tweenRef = React.useRef<gsap.core.Tween | null>(null);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Rahul Singh",
      text: "Best street food I've had in Kolkata! The puchka was absolutely amazing.",
      rating: 5,
    },
    {
      id: 2,
      name: "Priya Dey",
      text: "The jhuchaka rolls are incredible. Fresh, flavorful, and reasonably priced!",
      rating: 5,
    },
    {
      id: 3,
      name: "Arjun Gupta",
      text: "Finally found authentic Bengali street food. Highly recommend to everyone!",
      rating: 5,
    },
    {
      id: 4,
      name: "Sneha Mukherjee",
      text: "Great taste and quality. The customer service is excellent too!",
      rating: 4,
    },
    {
      id: 5,
      name: "Sneha Mukherjee",
      text: "Great taste and quality. The customer service is excellent too!",
      rating: 4,
    },
    {
      id: 6,
      name: "Sneha Mukherjee",
      text: "Great taste and quality. The customer service is excellent too!",
      rating: 4,
    },
    {
      id: 7,
      name: "Sneha Mukherjee",
      text: "Great taste and quality. The customer service is excellent too!",
      rating: 4,
    },
    {
      id: 8,
      name: "Sneha Mukherjee",
      text: "Great taste and quality. The customer service is excellent too!",
      rating: 4,
    },
    {
      id: 9,
      name: "Sneha Mukherjee",
      text: "Great taste and quality. The customer service is excellent too!",
      rating: 4,
    },
    {
      id: 10,
      name: "Sneha Mukherjee",
      text: "Great taste and quality. The customer service is excellent too!",
      rating: 4,
    },
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        size={16}
        className={
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }
      />
    ));
  };

  React.useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const maxScrollLeft = el.scrollWidth - el.clientWidth;
    if (maxScrollLeft <= 0) return;

    const tween = gsap.to(el, {
      scrollLeft: maxScrollLeft,
      duration: 50,
      ease: "none",
      repeat: -1,
      yoyo: true,
    });

    tweenRef.current = tween;

    return () => {
      tween.kill();
      tweenRef.current = null;
    };
  }, []);

  return (
    <section className="mx-auto max-w-6xl px-4 md:py-8">
      <div>
        <div className="mb-8">
          <div className="flex w-full flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <h2 className="mb-3 text-2xl font-bold text-red-950 md:text-3xl">
              What our customers say
            </h2>
          </div>
          <p className="text-sm text-gray-600 sm:text-base">
            Join thousands of happy customers enjoying authentic Bengali street
            food
          </p>
        </div>

        <div
          ref={trackRef}
          className="flex gap-6 overflow-x-auto p-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          onMouseEnter={() => tweenRef.current?.pause()}
          onMouseLeave={() => tweenRef.current?.resume()}
        >
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="w-72 shrink-0 rounded-lg bg-white p-6 shadow-md transition-shadow transition-transform duration-300 hover:scale-[1.03] hover:shadow-lg"
            >
              <div className="mb-4 flex gap-1">
                {renderStars(testimonial.rating)}
              </div>

              <p className="mb-4 line-clamp-4 text-sm text-gray-700">
                {testimonial.text}
              </p>

              <div className="border-t pt-4">
                <p className="font-semibold text-gray-900">
                  {testimonial.name}
                </p>
                <p className="text-xs text-gray-500">Verified Customer</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
