"use client";

import { useEffect, useRef } from "react";

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);

  // useEffect(() => {
  //     const video = videoRef.current;
  //     if (!video) return;

  //     const setSlowPlayback = () => {
  //         video.playbackRate = 0.5;
  //     };

  //     setSlowPlayback();
  //     video.addEventListener("loadedmetadata", setSlowPlayback);

  //     return () => {
  //         video.removeEventListener("loadedmetadata", setSlowPlayback);
  //     };
  // }, []);

  // useEffect(() => {
  //     const video = videoRef.current;
  //     const section = sectionRef.current;
  //     if (!video || !section) return;

  //     let animationFrame = 0;

  //     const updatePosition = () => {
  //         const viewportCenter = window.scrollY + window.innerHeight / 2;
  //         const sectionCenter = section.offsetTop + section.offsetHeight / 2;
  //         const distanceFromCenter = viewportCenter - sectionCenter;
  //         const offset = Math.max(
  //             -120,
  //             Math.min(120, distanceFromCenter * 0.2),
  //         );

  //         video.style.transform = `translate3d(0, ${offset}px, 0)`;
  //         animationFrame = 0;
  //     };

  //     const onScroll = () => {
  //         if (animationFrame) return;
  //         animationFrame = window.requestAnimationFrame(updatePosition);
  //     };

  //     updatePosition();
  //     window.addEventListener("scroll", onScroll, { passive: true });
  //     window.addEventListener("resize", onScroll);

  //     return () => {
  //         window.removeEventListener("scroll", onScroll);
  //         window.removeEventListener("resize", onScroll);
  //         if (animationFrame) {
  //             window.cancelAnimationFrame(animationFrame);
  //         }
  //     };
  // }, []);

  return (
    <section ref={sectionRef} className="my-2 w-full px-2">
      <video
        ref={videoRef}
        className="mx-auto block h-auto w-full object-contain will-change-transform md:max-w-6xl"
        src="/herovideo.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster="/herovideo.png"
      />
    </section>
  );
}
