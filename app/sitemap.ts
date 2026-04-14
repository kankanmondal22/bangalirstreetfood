import type { MetadataRoute } from "next";
import { BASE_URL } from "../lib/constants";


export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${BASE_URL}/`,
      lastModified: new Date("2026-04-14"),
      changeFrequency: "yearly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date("2026-04-14"),
      changeFrequency: "monthly",
      priority: 0.7,
    },{
      url: `${BASE_URL}/gallery`,
      lastModified: new Date("2026-04-14"),
      changeFrequency: "monthly",
      priority: 0.6,
    },{
      url: `${BASE_URL}/package`,
      lastModified: new Date("2026-04-14"),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
