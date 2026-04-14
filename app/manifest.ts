import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Bangalir Street Food",
    short_name: "BSF Tour",
    description:
      "Explore unforgettable travel experiences across India with Bangalir Street Food — your trusted tour and travel partner.",
    start_url: "/",
    display: "browser",
    background_color: "#F3F4F6",
    theme_color: "#0B4F4A",
    icons: []
  };
}
