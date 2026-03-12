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

const Packages = async () => {
  const packagesData = await fetchPackagesForGrid(1, 20);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero / Header */}
      <section className="bg-teal-700 text-white py-14 px-4 text-center">
        <h1 className="text-3xl md:text-4xl font-bold">Our Packages</h1>
        <p className="mt-2 text-teal-100 max-w-xl mx-auto text-sm md:text-base">
          Explore our hand-picked travel experiences. Pick the one that excites
          you and book your next adventure today!
        </p>
      </section>

      {/* Package Grid */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {packagesData.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>

        {packagesData.length === 0 && (
          <p className="text-center text-gray-500 py-20">
            No packages available right now. Check back soon!
          </p>
        )}
      </section>
      <div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </main>
  );
};

export default Packages;
