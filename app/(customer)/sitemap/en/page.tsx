// import { Heading1 } from "lucide-react";
import sitemap from "@/app/sitemap";
import { BASE_URL } from "@/lib/constants";

const SitemapPage = () => {
  return (
    <div className="mx-auto mt-16 max-w-6xl px-4 py-8 min-h-[60svh]">
      <h1 className="mt-8 text-3xl font-bold">Sitemap</h1>
      <ul className="list-inside list-disc py-8">
        {sitemap().map((entry) => (
          <li
            key={entry.url}
            className="hover:text-primary mb-2 hover:underline"
          >
            <a
              href={entry.url}
              target="_blank"
              rel="noopener noreferrer"
              className="capitalize"
            >
              {entry.url
                .replace(BASE_URL, "")
                .replace("/", " ")
                .replace("-", " ")
                .trim() || "Home"}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SitemapPage;
