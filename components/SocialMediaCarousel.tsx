"use client";

import React, { useRef } from "react";
import { Button } from "./ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import SocialVideoCard from "./SocialVideoCard";
import Heading2 from "./reusable/Heading2";

interface Props {
  videos: { src: string }[];
  title?: string;
  subtitle?: string;
}

const SocialMediaCarousel = ({
  videos,
  title = "The Stories we created",
  subtitle = "Watch our latest videos and see the magic unfold",
}: Props) => {
  const trackRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <div className="mb-1 flex flex-wrap items-center justify-between gap-3">
        <Heading2>{title}</Heading2>

        <div className="flex gap-2">
          <Button
            size="icon"
            onClick={() =>
              trackRef.current?.scrollBy({ left: -340, behavior: "smooth" })
            }
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>

          <Button
            size="icon"
            onClick={() =>
              trackRef.current?.scrollBy({ left: 340, behavior: "smooth" })
            }
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <p className="mb-5 text-sm text-zinc-600 sm:text-base">{subtitle}</p>

      <div
        ref={trackRef}
        className="flex snap-x gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {videos.map((video, index) => (
          <SocialVideoCard key={index} src={video.src} index={index} />
        ))}
      </div>
    </>
  );
};

export default SocialMediaCarousel;
