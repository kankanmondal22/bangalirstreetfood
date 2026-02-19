import Link from "next/link";

const contactCards = [
    {
        title: "Call Us",
        value: "+91 98765 43210",
        hint: "Mon - Sat, 9:00 AM - 8:00 PM",
    },
    {
        title: "Email",
        value: "travel@bangalirstreetfood.com",
        hint: "We usually reply within 24 hours",
    },
    {
        title: "Office",
        value: "Kolkata, West Bengal",
        hint: "Visit us for personalized trip planning",
    },
];

const Contact = () => {
    return (
        <main className="text-gray-900">
            <section className=" text-teal-950">
                <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
                    <p className="mb-3 inline-block rounded-full bg-white/20 px-4 py-1 text-sm font-medium">
                        Contact Our Travel Experts
                    </p>
                    <h1 className="max-w-3xl text-3xl font-bold leading-tight sm:text-5xl">
                        Let’s Plan Your Perfect Trip
                    </h1>
                    <p className="mt-5 max-w-2xl text-sm leading-7 text-teal-900 sm:text-base">
                        Share your destination, budget, and travel dates. Our
                        team will create the best tour package for you with
                        transparent pricing and end-to-end support.
                    </p>
                </div>
            </section>

            <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
                <div className="grid gap-6 md:grid-cols-3">
                    {contactCards.map((card) => (
                        <article
                            key={card.title}
                            className="rounded-lg border border-teal-100 bg-teal-50 p-5"
                        >
                            <h2 className="text-sm font-semibold uppercase tracking-wide text-teal-700">
                                {card.title}
                            </h2>
                            <p className="mt-2 text-lg font-semibold text-teal-900">
                                {card.value}
                            </p>
                            <p className="mt-1 text-sm text-teal-700">
                                {card.hint}
                            </p>
                        </article>
                    ))}
                </div>
            </section>

            <section className="mx-auto max-w-5xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-20">
                <div className="grid gap-8 rounded-lg border border-teal-100 bg-white p-6 shadow-sm lg:grid-cols-5 lg:p-8">
                    <div className="lg:col-span-2">
                        <h2 className="text-2xl font-bold text-teal-900">
                            Send Us Your Travel Details
                        </h2>
                        <p className="mt-3 text-sm leading-6 text-gray-600">
                            Fill out this form and our team will contact you
                            with a personalized itinerary and best available
                            pricing.
                        </p>

                        <div className="mt-6 space-y-4 rounded-lg bg-teal-50 p-4">
                            <p className="text-sm font-semibold text-teal-800">
                                Quick Assistance
                            </p>
                            <p className="text-sm text-teal-700">
                                Prefer direct conversation? Call us now and we
                                will help you instantly.
                            </p>
                            <a
                                href="tel:+919876543210"
                                className="inline-flex rounded-lg bg-teal-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-700"
                            >
                                Call Now
                            </a>
                        </div>
                    </div>

                    <form className="space-y-4 lg:col-span-3">
                        <div className="grid gap-4 sm:grid-cols-2">
                            <input
                                type="text"
                                placeholder="Full Name"
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none ring-teal-300 focus:ring"
                            />
                            <input
                                type="tel"
                                placeholder="Phone Number"
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none ring-teal-300 focus:ring"
                            />
                        </div>

                        <input
                            type="email"
                            placeholder="Email Address"
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none ring-teal-300 focus:ring"
                        />

                        <div className="grid gap-4 sm:grid-cols-2">
                            <input
                                type="text"
                                placeholder="Preferred Destination"
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none ring-teal-300 focus:ring"
                            />
                            <input
                                type="text"
                                placeholder="Travel Date"
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none ring-teal-300 focus:ring"
                            />
                        </div>

                        <textarea
                            rows={5}
                            placeholder="Tell us about your trip requirements"
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none ring-teal-300 focus:ring"
                        />

                        <div className="flex flex-wrap gap-3">
                            <button
                                type="submit"
                                className="rounded-lg bg-teal-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-700"
                            >
                                Submit Inquiry
                            </button>
                            <Link
                                href="/about"
                                className="rounded-lg border border-teal-200 px-5 py-3 text-sm font-semibold text-teal-800 transition hover:bg-teal-50"
                            >
                                Know More About Us
                            </Link>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    );
};

export default Contact;
