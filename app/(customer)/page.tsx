import GalleryGrid from "@/components/GalleryGrid";
import HeroVideo from "@/components/HeroVideo";
import Heading2 from "@/components/reusable/Heading2";
import HomeSections from "@/components/reusable/HomeSections";
import SocialMediaCarousel from "@/components/SocialMediaCarousel";
import Testimonials from "@/components/Testimonials";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const testimonialsData = [
  {
    id: 1,
    name: "Ankita Roy",
    text: "The Darjeeling trip was perfectly organized. Hotels, transport, everything was smooth. Highly recommended!",
    rating: 5,
  },
  {
    id: 2,
    name: "Sourav Das",
    text: "Amazing experience in Sikkim! The team was very supportive and made our journey stress-free.",
    rating: 5,
  },
  {
    id: 3,
    name: "Riya Sharma",
    text: "Loved the Goa package. Great itinerary and budget-friendly pricing. Will definitely travel again!",
    rating: 4,
  },
  {
    id: 4,
    name: "Arindam Ghosh",
    text: "Very professional service. The guide was knowledgeable and friendly throughout the trip.",
    rating: 5,
  },
  {
    id: 5,
    name: "Neha Kapoor",
    text: "Everything was well planned, from pickup to hotel stays. Had an unforgettable experience!",
    rating: 5,
  },
  {
    id: 6,
    name: "Rahul Verma",
    text: "Good service overall. Minor delays, but the team handled everything nicely.",
    rating: 4,
  },
  {
    id: 7,
    name: "Priyanka Sen",
    text: "Best travel agency I’ve used so far. Very reliable and affordable packages.",
    rating: 5,
  },
];

const videos = [
  { src: "https://youtube.com/shorts/tgpjk1iYs6U?si=C0QmwyxVSCuBjfJD" },
  { src: "https://youtube.com/shorts/t35zgT7x1fk?si=QVW_DykSD-fmeqIE" },
  { src: "https://youtube.com/shorts/MNTHqYfCkWg?si=M3kTkXl_0-xVXz25" },
  { src: "https://www.facebook.com/reel/1231792572373049" },
  { src: "https://www.facebook.com/reel/1606883560603961" },
  { src: "https://youtube.com/shorts/t35zgT7x1fk?si=QVW_DykSD-fmeqIE" },
];

const images = [
  "/gallery/bsf1.jpeg",
  "/gallery/bsf2.jpeg",
  "/gallery/bsf3.jpeg",
  "/gallery/bsf4.jpeg",
  "/gallery/bsf5.jpeg",
  "/gallery/bsf6.jpeg",
  "/gallery/bsf7.jpeg",
  "/gallery/bsf8.jpeg",
];
export default function Page() {
  return (
    //hero
    <div className="w-full">
      {/* hero section */}
      <HeroVideo />
      <HomeSections>
        <Heading2>Explore the World with Us</Heading2>
        <div className="grid grid-cols-3 gap-8 my-12">
          <div className="rotate-3 bg-white object-cover p-3 pb-6 shadow">
            <Image
              src="/gallery/bsf1.jpeg"
              height={500}
              width={500}
              alt="bsf1"
              className="aspect-3/2 object-cover"
            ></Image>
            <p className="font-handwriting mt-3 text-center text-xl font-bold text-gray-800">
              Rohit
            </p>
          </div>
          <div className="-rotate-3 bg-white object-cover p-3 pb-6 shadow">
            <Image
              src="/gallery/bsf1.jpeg"
              height={500}
              width={500}
              alt="bsf1"
              className="aspect-3/2 object-cover"
            ></Image>
            <p className="font-handwriting mt-3 text-center text-xl font-bold text-gray-800">
              Anirban
            </p>
          </div>
          <div className="rotate-3 bg-white object-cover p-3 pb-6 shadow">
            <Image
              src="/gallery/bsf1.jpeg"
              height={500}
              width={500}
              alt="bsf1"
              className="aspect-3/2 object-cover"
            ></Image>
            <p className="font-handwriting mt-3 text-center text-xl font-bold text-gray-800">
              Sourav
            </p>
          </div>
        </div>
        <p className="mt-16">
          Discover unforgettable journeys with our expertly crafted travel
          experiences, designed to take you from Kolkata to your dream
          destinations across India and beyond. Whether you are seeking serene
          mountains, vibrant beaches, or cultural adventures, we offer
          affordable and well-planned tour packages tailored to every kind of
          traveler. With a focus on comfort, safety, and memorable moments, we
          ensure every trip becomes a story worth sharing.
        </p>

        {/* CTA */}
        <div className="mx-auto flex w-fit gap-4">
          {" "}
          <Button asChild className="mx-auto mt-6" size="xl">
            <Link href="/package">View Packages</Link>
          </Button>
          <Button asChild className="mx-auto mt-6" size="xl" variant="outline">
            <Link href="/package">View Packages</Link>
          </Button>
        </div>
      </HomeSections>
      {/* The Stories we created*/}
      <HomeSections className="max-w-none bg-amber-50">
        <div className="mx-auto max-w-6xl">
          <SocialMediaCarousel
            videos={videos}
            title="The Stories we created"
            subtitle="Real moments from our customers"
          />
        </div>
      </HomeSections>
      {/* What people say */}
      <HomeSections>
        <Testimonials
          data={testimonialsData}
          title="What Travelers Say"
          subtitle="Real experiences from our happy customers"
        />
      </HomeSections>
      {/* Picture Gallery */}
      <HomeSections>
        <Heading2>Picture Gallery</Heading2>
        <GalleryGrid images={images} />
      </HomeSections>
      {/* why choose us */}
      <HomeSections>
        <Heading2 subHeading="Travel smarter, safer, and more beautifully with us">
          Why Choose Us
        </Heading2>

        {/* Grid */}
        <div className="mt-8 grid gap-6 sm:mt-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Card */}
          <div className="group relative rounded-2xl bg-white/70 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg sm:p-6">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-teal-400/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="relative z-10">
              <h3 className="text-base font-semibold text-gray-800 sm:text-lg">
                Comfort Travel
              </h3>
              <p className="mt-2 text-xs text-gray-500 sm:text-sm">
                Smooth journeys with premium transport & planning.
              </p>
            </div>
          </div>

          {/* Card */}
          <div className="group relative rounded-2xl bg-white/70 p-5 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg sm:p-6">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-teal-400/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="relative z-10">
              <h3 className="text-base font-semibold text-gray-800 sm:text-lg">
                Best Pricing
              </h3>
              <p className="mt-2 text-xs text-gray-500 sm:text-sm">
                Affordable packages with no hidden costs.
              </p>
            </div>
          </div>

          {/* Card */}
          <div className="group relative rounded-2xl bg-white/70 p-5 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg sm:p-6">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-teal-400/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="relative z-10">
              <h3 className="text-base font-semibold text-gray-800 sm:text-lg">
                Expert Guides
              </h3>
              <p className="mt-2 text-xs text-gray-500 sm:text-sm">
                Travel with professionals who know every corner.
              </p>
            </div>
          </div>

          {/* Card */}
          <div className="group relative rounded-2xl bg-white/70 p-5 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg sm:p-6">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-teal-400/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="relative z-10">
              <h3 className="text-base font-semibold text-gray-800 sm:text-lg">
                Happy Travelers
              </h3>
              <p className="mt-2 text-xs text-gray-500 sm:text-sm">
                Loved by hundreds of satisfied customers.
              </p>
            </div>
          </div>
        </div>
      </HomeSections>
    </div>
  );
}
