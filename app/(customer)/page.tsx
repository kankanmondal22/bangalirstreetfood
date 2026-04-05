import GalleryGrid from "@/components/GalleryGrid";
import HeroVideo from "@/components/HeroVideo";
import Heading2 from "@/components/reusable/Heading2";
import HomeSections from "@/components/reusable/HomeSections";
import SocialMediaCarousel from "@/components/SocialMediaCarousel";
import Testimonials from "@/components/Testimonials";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  testimonialsData,
  videos,
  images,
  faqData,
  memberData,
  whyChooseUsData,
} from "@/lib/constants";

export default function Page() {
  return (
    //hero
    <div className="w-full">
      {/* hero section */}
      <HeroVideo />
      <HomeSections>
        <Heading2>Explore the World with Us</Heading2>
        <div className="my-12 grid grid-cols-3 gap-8">
          {memberData.map((member, index) => (
            <div
              key={member.id}
              className={`${index % 3 === 1 ? "-rotate-3" : "rotate-3"} bg-white object-cover p-3 pb-6 shadow`}
            >
              <Image
                src={member.image}
                height={500}
                width={500}
                alt={member.name}
                className="aspect-3/2 object-cover"
              ></Image>
              <p className="font-handwriting mt-3 text-center text-xl font-bold text-gray-800">
                {member.name}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-16 max-w-5xl text-center text-lg text-gray-600">
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
        <div className="mx-auto max-w-6xl p-8">
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
      <HomeSections className="max-w-none bg-teal-500">
        <Heading2
          className="text-white"
          subHeading="Travel smarter, safer, and more beautifully with us"
          subHeadingClassName="text-teal-100"
        >
          Why Choose Us
        </Heading2>

        {/* Grid */}
        <div className="mx-auto mt-8 grid max-w-6xl gap-6 sm:mt-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Card */}
          {whyChooseUsData.map((item) => (
            <div
              key={item.id}
              className="group relative rounded-md bg-white shadow-sm backdrop-blur-md transition-all duration-300 sm:p-6"
            >
              <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-teal-400/20 to-transparent opacity-0 transition-opacity duration-300" />
              <div className="relative z-10">
                <h3 className="text-base font-semibold text-gray-800 sm:text-lg">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs text-gray-500 sm:text-sm">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </HomeSections>
      {/* FAQ Section */}
      <HomeSections>
        <Heading2>Frequently Asked Questions</Heading2>
        <Accordion type="single" collapsible className="mt-6 w-full gap-y-4">
          {faqData.map((faq) => (
            <AccordionItem
              value={`item-${faq.id}`}
              className="rounded bg-white px-4 py-2 shadow-sm"
              key={faq.id}
            >
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>
                <p>{faq.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </HomeSections>
    </div>
  );
}
