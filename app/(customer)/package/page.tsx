import { packageData } from "@/mockData";
import PackageCard from "@/components/PackageCard";

const Packages = () => {
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
          {packageData.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>

        {packageData.length === 0 && (
          <p className="text-center text-gray-500 py-20">
            No packages available right now. Check back soon!
          </p>
        )}
      </section>
    </main>
  );
};

export default Packages;
