import Link from "next/link";

const highlights = [
    {
        title: "Domestic & International Tours",
        description:
            "From weekend escapes to global adventures, we design travel plans that fit your budget and style.",
    },
    {
        title: "Customized Itineraries",
        description:
            "Every trip is tailored around your interests with the right mix of sightseeing, comfort, and local experiences.",
    },
    {
        title: "Hotel, Transport & Visa Support",
        description:
            "We handle bookings and travel support so you can focus on enjoying your journey stress-free.",
    },
];

const reasons = [
    "Experienced local travel experts",
    "Transparent pricing with no hidden charges",
    "24/7 travel assistance during your trip",
    "Trusted by families, couples, and groups",
];

const About = () => {
    return (
        <main className="text-gray-900">
            <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
                <div className="grid items-center gap-10 lg:grid-cols-2">
                    <div>
                        <h1 className="text-3xl font-bold leading-tight sm:text-4xl">
                            Your Trusted Tour & Travel Partner
                        </h1>
                        <p className="mt-5 text-base leading-7 text-gray-600 sm:text-lg">
                            We are a customer-focused tour and travel agency
                            dedicated to creating memorable journeys. Whether
                            you are planning a family holiday, honeymoon,
                            corporate trip, or group tour, our team ensures
                            every detail is carefully managed.
                        </p>
                        <p className="mt-4 text-base leading-7 text-gray-600 sm:text-lg">
                            Our mission is simple: make travel easy, safe, and
                            exciting for everyone.
                        </p>
                        <div className="mt-8 flex flex-wrap gap-4">
                            <Link
                                href="/contact"
                                className="rounded-lg bg-teal-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-700"
                            >
                                Plan Your Trip
                            </Link>
                            <Link
                                href="/"
                                className="rounded-lg border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
                            >
                                Explore Home
                            </Link>
                        </div>
                    </div>

                    <div className="rounded-lg bg-linear-to-br from-teal-50 to-cyan-100 p-6 shadow-sm sm:p-8">
                        <h2 className="text-2xl font-semibold">
                            Why Travelers Choose Us
                        </h2>
                        <ul className="mt-6 list-disc space-y-3 pl-5">
                            {reasons.map((reason) => (
                                <li key={reason} className="text-gray-700">
                                    {reason}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            <section className="py-16">
                <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-10 text-center">
                        <h2 className="text-2xl font-bold sm:text-3xl">
                            What We Offer
                        </h2>
                        <p className="mt-3 text-gray-600">
                            Complete travel solutions for comfortable and
                            unforgettable experiences.
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 border-t-2 border-teal-950/30">
                        {highlights.map((item) => (
                            <article
                                key={item.title}
                                className="rounded-b-lg border border-gray-200 bg-white p-6 shadow-sm"
                            >
                                <h3 className="text-lg font-semibold text-gray-900">
                                    {item.title}
                                </h3>
                                <p className="mt-3 text-sm leading-6 text-gray-600">
                                    {item.description}
                                </p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="rounded-lg bg-teal-600 px-6 py-10 text-center text-white sm:px-10">
                    <h2 className="text-2xl font-bold sm:text-3xl">
                        Let’s Plan Your Next Adventure
                    </h2>
                    <p className="mx-auto mt-3 max-w-2xl text-teal-100">
                        Tell us your dream destination and travel dates. We will
                        create a personalized plan with the best routes, stays,
                        and experiences.
                    </p>
                    <Link
                        href="/contact"
                        className="mt-6 inline-flex rounded-lg bg-white px-5 py-3 font-semibold text-teal-700 transition hover:bg-teal-50"
                    >
                        Contact Us Today
                    </Link>
                </div>
            </section>
        </main>
    );
};

export default About;
