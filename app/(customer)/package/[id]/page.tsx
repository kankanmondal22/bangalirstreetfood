import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UUID } from "crypto";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPackageDetailsById } from "@/actions/package.action";

const IndividualPackagePage = async ({
  params,
}: {
  params: Promise<{ id: string | UUID }>;
}) => {
  const { id } = await params;
  const packageDetails = await getPackageDetailsById(id);

  if (!packageDetails) return notFound();

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Image */}
      <div className="relative mx-2 max-h-112 overflow-hidden bg-teal-50">
        <Image
          src={packageDetails.thumbnail || "/placeholder.jpg"}
          alt={packageDetails.title}
          width={1500}
          height={1500}
          priority
          className="h-full max-h-112 w-full object-cover"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />
        {/* Title overlay */}
        <div className="absolute right-0 bottom-0 left-0 mx-auto max-w-5xl p-6 md:p-10">
          <Badge className="mb-3 bg-teal-600 text-white">
            {packageDetails.duration}
          </Badge>
          <h1 className="text-2xl leading-tight font-bold text-white md:text-4xl">
            {packageDetails.title}
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 py-8 lg:grid-cols-3">
        {/* Left Column – Details */}
        <div className="space-y-8 lg:col-span-2">
          {/* Description */}
          <section>
            <h2 className="mb-4 text-lg font-semibold text-gray-900">
              Package Overview
            </h2>
            <p className="leading-relaxed text-gray-700">
              {packageDetails.description}
            </p>
          </section>
          {/* Highlights */}
          <section>
            <h2 className="mb-4 text-lg font-semibold text-gray-900">
              Highlights
            </h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {packageDetails.highlights.map((highlight) => (
                <div
                  key={highlight}
                  className="flex items-start gap-3 rounded-lg border border-gray-200 bg-white p-4"
                >
                  <svg
                    className="mt-0.5 h-5 w-5 shrink-0 text-teal-600"
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
            <h2 className="mb-4 text-lg font-semibold text-gray-900">
              Available Dates
            </h2>
            <div className="flex flex-wrap gap-2">
              {packageDetails.availableDates.map((date) => {
                const d = new Date(date);
                const isPast = d < new Date();
                return (
                  <div
                    key={date}
                    className={`min-w-28 rounded-lg border px-4 py-3 text-center ${
                      isPast
                        ? "border-gray-200 bg-gray-50 text-gray-400 line-through"
                        : "border-teal-600 bg-teal-50 text-teal-800"
                    }`}
                  >
                    <p className="text-xs font-medium uppercase">
                      {d.toLocaleDateString("en-IN", {
                        weekday: "short",
                      })}
                    </p>
                    <p className="text-lg font-bold">
                      {d.toLocaleDateString("en-IN", {
                        day: "numeric",
                      })}
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
            <h2 className="mb-4 text-lg font-semibold text-gray-900">
              Trip Details
            </h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <InfoCard label="Duration" value={packageDetails.duration} />
              <InfoCard
                label="Max Group Size"
                value={`${packageDetails.maxGroupSize} people`}
              />
              <InfoCard
                label="Min. Booking"
                value={`₹${packageDetails.minBookingAmount.toLocaleString("en-IN")}`}
              />
              <InfoCard
                label="Available Dates"
                value={`${packageDetails.availableDates.length} dates`}
              />
              <div className="col-span-full">
                <Separator />
                <table className="mt-6 w-full border-collapse overflow-hidden rounded-lg border border-teal-600 text-left">
                  <thead>
                    <tr className="bg-teal-600 text-white">
                      <th className="p-3 text-sm font-semibold">Day</th>
                      <th className="p-3 text-sm font-semibold">Activities</th>
                    </tr>
                  </thead>
                  <tbody>
                    {packageDetails.itinerary.map((day, index) => (
                      <tr
                        key={day.day + "-" + index}
                        className={`border-b border-teal-600 ${
                          index % 2 === 0 ? "bg-teal-50/50" : "bg-white"
                        }`}
                      >
                        <td className="p-3 text-sm font-semibold whitespace-nowrap text-teal-700">
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
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Per Adult</p>
                    <p className="text-2xl font-bold text-teal-600">
                      ₹{packageDetails.pricePerAdult.toLocaleString("en-IN")}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Per Child</p>
                    <p className="text-2xl font-bold text-gray-800">
                      ₹{packageDetails.pricePerChild.toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="rounded-lg border border-amber-200 bg-amber-50 p-3">
                  <p className="text-xs text-amber-800">
                    <span className="font-semibold">Minimum booking:</span> ₹
                    {packageDetails.minBookingAmount.toLocaleString("en-IN")}{" "}
                    per person to confirm. Pay the rest later.
                  </p>
                </div>
              </div>

              {/* CTA */}
              <Button asChild className="w-full" size="lg">
                <Link href={`/booking/${packageDetails.id}`}>Book Now</Link>
              </Button>
              <p className="text-center text-xs text-gray-400">
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
      <p className="mt-0.5 text-sm font-semibold text-gray-900">{value}</p>
    </div>
  );
}

export default IndividualPackagePage;
