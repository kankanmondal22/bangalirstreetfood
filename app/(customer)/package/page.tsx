// import { packageData } from "@/mockData";
import PackageCard from "@/components/PackageCard";
import { fetchPackagesForGrid } from "@/actions/package.action";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const PAGE_SIZE = 3;

function getPageNumbers(
  currentPage: number,
  totalPages: number,
): (number | "ellipsis")[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  if (currentPage <= 4) {
    return [1, 2, 3, 4, 5, "ellipsis", totalPages];
  }
  if (currentPage >= totalPages - 3) {
    return [
      1,
      "ellipsis",
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }
  return [
    1,
    "ellipsis",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "ellipsis",
    totalPages,
  ];
}

const Packages = async ({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) => {
  const { page: pageParam } = await searchParams;
  const currentPage = Math.max(1, parseInt(pageParam ?? "1", 10) || 1);

  const { packages: packagesData, totalCount } = await fetchPackagesForGrid(
    currentPage,
    PAGE_SIZE,
  );

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);
  const pageNumbers = getPageNumbers(currentPage, totalPages);

  return (
    <main className="m-2 min-h-screen bg-gray-50">
      {/* Hero / Header */}
      <section className="px-4 py-14 text-center">
        <h1 className="font-handwriting text-3xl font-bold md:text-4xl">
          Our Packages
        </h1>
        <p className="mx-auto mt-2 max-w-xl text-sm text-teal-700 md:text-base">
          Explore our hand-picked travel experiences. Pick the one that excites
          you and book your next adventure today!
        </p>
      </section>

      {/* Package Grid */}
      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {packagesData.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>

        {packagesData.length === 0 && (
          <p className="py-20 text-center text-gray-500">
            No packages available right now. Check back soon!
          </p>
        )}
      </section>

      {totalPages > 1 && (
        <div className="py-10">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href={`?page=${currentPage - 1}`}
                  aria-disabled={currentPage === 1}
                  className={
                    currentPage === 1
                      ? "pointer-events-none opacity-50"
                      : undefined
                  }
                />
              </PaginationItem>

              {pageNumbers.map((p, i) =>
                p === "ellipsis" ? (
                  <PaginationItem key={`ellipsis-${i}`}>
                    <PaginationEllipsis />
                  </PaginationItem>
                ) : (
                  <PaginationItem key={p}>
                    <PaginationLink
                      href={`?page=${p}`}
                      isActive={p === currentPage}
                    >
                      {p}
                    </PaginationLink>
                  </PaginationItem>
                ),
              )}

              <PaginationItem>
                <PaginationNext
                  href={`?page=${currentPage + 1}`}
                  aria-disabled={currentPage === totalPages}
                  className={
                    currentPage === totalPages
                      ? "pointer-events-none opacity-50"
                      : undefined
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </main>
  );
};

export default Packages;
