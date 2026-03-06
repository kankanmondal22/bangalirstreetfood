import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export interface PackageCardProps {
  id: string;
  title: string;
  duration: string;
  pricePerAdult: number;
  pricePerChild: number;
  maxParticipants: number;
  images: string[];
  highlights: string[];
  availableDates: string[];
  minBookingAmount: number;
}

export default function PackageCard({ pkg }: { pkg: PackageCardProps }) {
  const upcomingDates = pkg.availableDates
    .map((d) => new Date(d))
    .filter((d) => d >= new Date())
    .sort((a, b) => a.getTime() - b.getTime());

  const upcomingDatesCount = upcomingDates.length;
  const nextDate = upcomingDates[0];

  const formattedNextDate = nextDate
    ? nextDate.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "No upcoming dates";

  return (
    <Card className="group flex flex-col h-full overflow-hidden transition-shadow hover:shadow-md pt-0">
      {/* Image */}
      <div className="relative overflow-hidden">
        <Image
          src={pkg.images[0]}
          alt={pkg.title}
          width={600}
          height={400}
          className="w-full aspect-4/3 object-cover transition-transform duration-300 group-hover:scale-105 bg-teal-50"
        />
        {/* Duration badge overlaid on image */}
        <Badge
          variant="default"
          className="absolute top-3 left-3 bg-teal-600 text-white shadow-sm"
        >
          {pkg.duration}
        </Badge>
      </div>

      {/* Content */}
      <CardHeader className="pb-0">
        <CardTitle className="text-lg font-semibold leading-snug min-h-14 line-clamp-2">
          {pkg.title}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 space-y-3 pb-0">
        {/* Highlights (show up to 3) */}
        <div className="flex flex-wrap gap-1.5">
          {pkg.highlights.slice(0, 3).map((h) => (
            <Badge
              key={h}
              variant="outline"
              className="text-xs font-normal text-gray-600"
            >
              {h}
            </Badge>
          ))}
        </div>

        <Separator />

        {/* Pricing row */}
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <p className="text-gray-500 text-xs">Per Adult</p>
            <p className="font-semibold text-gray-900">
              ₹{pkg.pricePerAdult.toLocaleString("en-IN")}
            </p>
          </div>
          <div>
            <p className="text-gray-500 text-xs">Per Child</p>
            <p className="font-semibold text-gray-900">
              ₹{pkg.pricePerChild.toLocaleString("en-IN")}
            </p>
          </div>
        </div>

        {/* Meta info row */}
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <svg
              className="h-3.5 w-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            Next: {formattedNextDate}
          </span>
          {upcomingDatesCount > 1 && (
            <Badge variant="secondary" className="text-xs font-normal">
              +{upcomingDatesCount - 1} more date
              {upcomingDatesCount > 2 ? "s" : ""}
            </Badge>
          )}
        </div>
      </CardContent>

      {/* Actions */}
      <CardFooter className="flex gap-2 pt-0 mt-auto">
        <Button variant="outline" className="flex-1" asChild>
          <Link href={`/package/${pkg.id}`}>View Details</Link>
        </Button>
        <Button className="flex-1" asChild>
          <Link href={`/booking/${pkg.id}`}>Book Now</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
