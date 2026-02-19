import Hero from "@/components/hero";
import Link from "next/link";

const features = [
    {
        title: "Best Tour Packages",
        description:
            "Carefully curated domestic and international packages for couples, families, and groups.",
    },
    {
        title: "Easy Booking Support",
        description:
            "Quick assistance for itinerary planning, hotel booking, transport, and visa guidance.",
    },
    {
        title: "Safe & Trusted Travel",
        description:
            "Travel with confidence through transparent pricing and dedicated trip support.",
    },
];

const topDestinations = [
    "Darjeeling",
    "Sikkim",
    "Goa",
    "Kerala",
    "Dubai",
    "Thailand",
];

export default function Home() {
    return (
        <div className="text-gray-900">
            <Hero />
            <section className="mx-auto max-w-5xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-10">
                <div className="grid items-center gap-10 lg:grid-cols-2">
                    <div>
                        <h1 className="text-2sxl font-bold leading-tight sm:text-5xl">
                            Explore the World with Comfort & Confidence
                        </h1>
                        <p className="mt-5 text-base leading-7 text-gray-600 sm:text-lg">
                            Discover handpicked tour packages, smooth bookings,
                            and personalized travel planning for your next
                            unforgettable journey.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-4">
                            <Link
                                href="/contact"
                                className="rounded-lg bg-teal-600 px-5 py-3 font-semibold text-white transition hover:bg-teal-700"
                            >
                                Book Your Tour
                            </Link>
                            <Link
                                href="/about"
                                className="rounded-lg border border-gray-300 px-5 py-3 font-semibold text-gray-700 transition hover:bg-teal-100"
                            >
                                Learn More
                            </Link>
                        </div>
                    </div>
                    <div className="rounded-lg border bg-orange-200 border-red-400 p-6 sm:p-8">
                        <p className="font-bold text-red-900 text-3xl">
                            Notice Board
                        </p>
                        <ul className="mt-5 space-y-3 text-gray-700">
                            <li> Affordable packages for every budget</li>
                            <li> Customized itinerary planning</li>
                            <li> Friendly travel experts and 24/7 support</li>
                            <li> Trusted by happy travelers across India</li>
                            <li> Friendly travel experts and 24/7 support</li>
                            <li> Trusted by happy travelers across India</li>
                        </ul>
                    </div>
                </div>
            </section>
            <section className="">
                <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                    <div className="rounded-lg bg-linear-to-br from-teal-50 to-cyan-100 p-6 shadow-sm sm:p-8">
                        <h2 className="text-2xl font-semibold">
                            Why Book With Us?
                        </h2>
                        <ul className="mt-5 space-y-3 text-gray-700">
                            <li> Affordable packages for every budget</li>
                            <li> Customized itinerary planning</li>
                            <li> Friendly travel experts and 24/7 support</li>
                            <li> Trusted by happy travelers across India</li>
                        </ul>
                    </div>
                </div>
            </section>
            {/* our service */}
            <section className="py-16">
                <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-10 text-center">
                        <h2 className="text-2xl font-bold sm:text-3xl">
                            Our Services
                        </h2>
                        <p className="mt-3 text-gray-600">
                            End-to-end travel solutions to make your trip simple
                            and memorable.
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {features.map((feature) => (
                            <article
                                key={feature.title}
                                className="rounded-r-lg border-l-4 border-teal-600 bg-teal-50/50 p-6 shadow-sm"
                            >
                                <h3 className="text-lg font-semibold text-gray-900">
                                    {feature.title}
                                </h3>
                                <p className="mt-3 text-sm leading-6 text-gray-600">
                                    {feature.description}
                                </p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="rounded-lg border border-gray-200 p-6 sm:p-8">
                    <h2 className="text-2xl font-bold sm:text-3xl">
                        Top Destinations
                    </h2>
                    <p className="mt-3 text-gray-600">
                        Popular travel choices from our customers.
                    </p>

                    <div className="mt-6 flex flex-wrap gap-3">
                        {topDestinations.map((destination) => (
                            <span
                                key={destination}
                                className="rounded-full bg-teal-50 px-4 py-2 text-sm font-medium text-teal-700"
                            >
                                {destination}
                            </span>
                        ))}
                    </div>

                    <div className="mt-8">
                        <Link
                            href="/contact"
                            className="inline-flex rounded-lg bg-teal-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-700"
                        >
                            Start Planning Today
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
