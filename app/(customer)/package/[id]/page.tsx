import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { packageData } from "@/mockData";
import { UUID } from "crypto";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

const IndividualPackagePage = async ({
  params,
}: {
  params: Promise<{ id: string | UUID }>;
}) => {
  const { id } = await params;
  const pkg = packageData.find((p) => p.id === id);

  if (!pkg) return notFound();

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Image */}
      <div className="relative w-full max-h-112 overflow-hidden bg-teal-50">
        <Image
          src={pkg.images[0]}
          alt={pkg.title}
          width={1500}
          height={1500}
          priority
          className="w-full h-full max-h-112 object-cover"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />
        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 max-w-5xl mx-auto">
          <Badge className="mb-3 bg-teal-600 text-white">{pkg.duration}</Badge>
          <h1 className="text-2xl md:text-4xl font-bold text-white leading-tight">
            {pkg.title}
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column – Details */}
        <div className="lg:col-span-2 space-y-8">
          {/* Description */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Package Overview
            </h2>
            <p className="text-gray-700 leading-relaxed">{pkg.description}</p>
          </section>
          {/* Highlights */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Highlights
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {pkg.highlights.map((highlight) => (
                <div
                  key={highlight}
                  className="flex items-start gap-3 rounded-lg border border-gray-200 bg-white p-4"
                >
                  <svg
                    className="h-5 w-5 text-teal-600 mt-0.5 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-sm text-gray-700">{highlight}</span>
                </div>
              ))}
            </div>
          </section>

          <Separator />

          {/* Available Dates */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Available Dates
            </h2>
            <div className="flex flex-wrap gap-2">
              {pkg.availableDates.map((date) => {
                const d = new Date(date);
                const isPast = d < new Date();
                return (
                  <div
                    key={date}
                    className={`rounded-lg border px-4 py-3 text-center min-w-28 ${
                      isPast
                        ? "border-gray-200 bg-gray-50 text-gray-400 line-through"
                        : "border-teal-600 bg-teal-50 text-teal-800"
                    }`}
                  >
                    <p className="text-xs font-medium uppercase">
                      {d.toLocaleDateString("en-IN", { weekday: "short" })}
                    </p>
                    <p className="text-lg font-bold">
                      {d.toLocaleDateString("en-IN", { day: "numeric" })}
                    </p>
                    <p className="text-xs">
                      {d.toLocaleDateString("en-IN", {
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

          <Separator />

          {/* Info Grid */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Trip Details
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <InfoCard label="Duration" value={pkg.duration} />
              <InfoCard
                label="Max Group Size"
                value={`${pkg.maxParticipants} people`}
              />
              <InfoCard
                label="Min. Booking"
                value={`₹${pkg.minBookingAmount.toLocaleString("en-IN")}`}
              />
              <InfoCard
                label="Available Dates"
                value={`${pkg.availableDates.length} dates`}
              />
              <div className="col-span-full">
                <Separator />
                <table className="w-full text-left mt-6 border-collapse overflow-hidden rounded-lg border border-teal-600">
                  <thead>
                    <tr className="bg-teal-600 text-white">
                      <th className="p-3 text-sm font-semibold">Day</th>
                      <th className="p-3 text-sm font-semibold">Activities</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pkg.itinerary.map((day, index) => (
                      <tr
                        key={day.day}
                        className={`border-b border-teal-600 ${
                          index % 2 === 0 ? "bg-teal-50/50" : "bg-white"
                        }`}
                      >
                        <td className="p-3 text-sm font-semibold text-teal-700 whitespace-nowrap">
                          Day {day.day}
                        </td>
                        <td className="p-3 text-sm text-gray-700">
                          {day.activities}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            {/* iterinary table */}
          </section>
        </div>

        {/* Right Column – Pricing Sidebar */}
        <div className="lg:col-span-1">
          <Card className="sticky top-8 shadow-md">
            <CardHeader className="pb-0">
              <CardTitle className="text-lg">Pricing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Price rows */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">Per Adult</p>
                    <p className="text-2xl font-bold text-teal-600">
                      ₹{pkg.pricePerAdult.toLocaleString("en-IN")}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Per Child</p>
                    <p className="text-2xl font-bold text-gray-800">
                      ₹{pkg.pricePerChild.toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="rounded-lg bg-amber-50 border border-amber-200 p-3">
                  <p className="text-xs text-amber-800">
                    <span className="font-semibold">Minimum booking:</span> ₹
                    {pkg.minBookingAmount.toLocaleString("en-IN")} per person to
                    confirm. Pay the rest later.
                  </p>
                </div>
              </div>

              {/* CTA */}
              <Button asChild className="w-full" size="lg">
                <Link href={`/booking/${pkg.id}`}>Book Now</Link>
              </Button>
              <p className="text-xs text-center text-gray-400">
                No hidden charges. Free cancellation up to 48hrs before travel.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
};

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-center">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-sm font-semibold text-gray-900 mt-0.5">{value}</p>
    </div>
  );
}

export default IndividualPackagePage;
