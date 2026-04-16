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

// !! Types alada file e rakhbi @kankanmondal22
type SocialLinkProps = {
  href: string;
  icon: string;
  label: string;
};

// !! Component alada file e rakhbi @kankanmondal22
const SocialLink = ({ href, icon, label }: SocialLinkProps) => (
  <Link
    href={href}
    className="inline-flex items-center rounded px-2 py-1 font-medium text-white"
  >
    <Image
      src={icon}
      alt={label}
      className="h-12 w-12"
      height={100}
      width={100}
    />
  </Link>
);

export default function Page() {
  return (
    //hero
    <div className="w-full">
      {/* hero section */}
      <HeroVideo />
      <HomeSections className="max-w-none bg-linear-to-br from-gray-100 to-gray-200">
        <div className="mx-auto grid max-w-6xl grid-cols-1 md:grid-cols-2">
          <div className="relative flex flex-col items-center">
            {memberData.map((member, index) => {
              const offset =
                index % 3 === 0
                  ? "-translate-x-12"
                  : index % 3 === 1
                    ? "translate-x-12"
                    : "-translate-x-8";
              const rotate =
                index % 3 === 0
                  ? "-rotate-3"
                  : index % 3 === 1
                    ? "rotate-3"
                    : "rotate-8";

              return (
                <div
                  key={member.id}
                  className={`relative ${offset} ${rotate} ${index !== 0 ? "-mt-28" : ""} bg-white p-3 pb-6 shadow-md transition-transform duration-300 hover:-translate-y-28`}
                  style={{ zIndex: index }}
                >
                  <Image
                    src={member.image}
                    height={300}
                    width={300}
                    alt={member.name}
                    className="aspect-3/2 object-cover"
                  />

                  <p className="font-handwriting mt-3 text-center text-xl font-bold text-gray-800">
                    {member.name}
                  </p>
                </div>
              );
            })}
          </div>
          <div>
            <Heading2>Explore the World with Us</Heading2>

            <p className="mt-16 max-w-5xl text-center text-gray-800">
              We didn&apos;t start in an office — we started on the road with a
              camera. As YouTube travel vloggers, we&apos;ve explored
              India&apos;s best-kept secrets on a shoestring. Now we&apos;re
              bringing that same energy (and budget wisdom!) to plan the perfect
              trip for you.
            </p>
            <p className="mt-6 max-w-5xl text-center text-gray-800">
              No hidden charges. No cookie-cutter itineraries. Just real trips,
              just like we used to take.
            </p>
            <div className="mx-auto mt-6 flex w-fit gap-4">
              {" "}
              <Button asChild>
                <Link href="/about">Read Our Full Story</Link>
              </Button>
              <Button asChild className="bg-gray-50" variant="outline">
                <Link href="/package">View Packages</Link>
              </Button>
            </div>
          </div>
        </div>
      </HomeSections>
      {/* The Stories we created*/}
      <HomeSections className="max-w-none">
        <div className="mx-auto max-w-6xl p-8">
          <SocialMediaCarousel
            videos={videos}
            title="See It Before You Book It"
            subtitle="We've actually been there. Watch our vlogs from Kashmir, Andaman, and Vizag — and imagine yourself in the frame."
          />
          <p className="mt-8 flex items-center justify-center text-lg">
            Follow Us on{" "}
            <SocialLink
              href="https://www.facebook.com/@bangalirstreetfood"
              icon="/icons/facebook.png"
              label="Facebook"
            />
            <SocialLink
              href="https://www.youtube.com/@bangalirstreetfood"
              icon="/icons/youtube.png"
              label="YouTube"
            />
            <SocialLink
              href="https://www.instagram.com/@bangalirstreetfood"
              icon="/icons/instagram.png"
              label="Instagram"
            />
            {" and "}
            for more travel stories and tips!
          </p>
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
            <div key={item.id} className="group rounded-md bg-white sm:p-6">
              <div className=" ">
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
      {/* CTA section */}
      <section
        className="relative mx-auto mb-32 max-w-6xl overflow-hidden rounded-2xl bg-cover bg-center text-center text-white"
        style={{ backgroundImage: "url('/pahar.jpeg')" }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-1 flex h-full w-full flex-col items-center p-16 px-6 backdrop-blur-xs xl:p-32">
          <h2 className="text-2xl leading-snug font-semibold sm:text-3xl">
            If You Have Any Question
            <br />
            You will Ask US
          </h2>
          <Button className="mt-6 w-fit text-white" size={"xl"}>
            Contact Us
          </Button>
        </div>
      </section>
    </div>
  );
}
