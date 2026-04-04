import Heading2 from "@/components/reusable/Heading2";
import Image from "next/image";
import { StatItem, WhyBestFeature, memberData } from "@/lib/constants";
import HomeSections from "@/components/reusable/HomeSections";
import { Button } from "@/components/ui/button";
// import { Plus } from "lucide-react";

const TeamMemberCard = ({
  name,
  role,
  imageSrc,
}: {
  name: string;
  role: string;
  imageSrc: string;
}) => {
  return (
    <div className="group relative aspect-3/4 cursor-pointer overflow-hidden rounded-lg shadow-sm transition-shadow duration-300 hover:shadow-lg">
      {/* Full bleed image */}
      <Image src={imageSrc} alt={name} fill className="object-cover" />

      {/* Gradient overlay - always visible at bottom */}
      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />

      {/* Name overlay at bottom */}
      <div className="absolute right-0 bottom-0 left-0 p-4">
        <div className="bg-black/40 py-4">
          <p className="text-sm leading-tight font-semibold text-white">
            {name}
          </p>
          <p className="mt-0.5 text-xs text-teal-300">{role}</p>
        </div>
        {/* Teal accent line matching your primary */}
      </div>
    </div>
  );
};

const AboutPage = () => {
  return (
    <div className="mx-auto w-full overflow-x-hidden">
      {/* Hero with full-width masked bottom */}

      <div
        className="hero-mask-intersect relative mx-auto mb-10 flex items-center overflow-hidden px-6 py-16 sm:-mx-8 sm:min-h-80 sm:px-10 lg:min-h-125"
        style={{
          backgroundImage: "url('/Andaman-and-Nicobar-Islands-Package-1.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-1 mx-auto w-full max-w-6xl p-8 text-white">
          <p className="mb-2 text-xs font-semibold tracking-[0.25em] uppercase sm:text-sm">
            About
          </p>
          <h1 className="font-handwriting mb-2text-4xl mb-4 font-semibold sm:text-5xl md:text-6xl lg:text-7xl">
            Our Story
          </h1>
          <p className="max-w-2xl text-sm text-gray-100/90 sm:text-base">
            Discover the passion and dedication behind our travel agency,
            committed to making your journeys unforgettable.
          </p>
        </div>
      </div>
      {/* Heading */}
      <div className="text-center">
        <Heading2>Meet Our Team</Heading2>
        <p className="mt-3 text-gray-500">
          The people who make your journeys unforgettable
        </p>
      </div>

      {/* Team Grid */}
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <TeamMemberCard
          name="Sourav"
          role="Founder & CEO"
          imageSrc="/gallery/bsf1.jpeg"
        />
        <TeamMemberCard
          name="Anirban"
          role="Travel Expert"
          imageSrc="/gallery/bsf1.jpeg"
        />
        <TeamMemberCard
          name="Rohit"
          role="Tour Manager"
          imageSrc="/gallery/bsf1.jpeg"
        />
      </div>

      {/* Why We Are The Best */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 lg:grid-cols-2">
          {/* Left: Text + Features */}
          <div>
            <h3 className="text-primary text-2xl font-semibold sm:text-3xl">
              Why we are the best?
            </h3>
            <p className="mt-4 text-sm text-gray-500 sm:text-base">
              What started as a passion for exploring new places has grown into
              a mission to help others experience the beauty of travel.
            </p>
            <p className="mt-3 text-sm text-gray-500 sm:text-base">
              From local trips to dream destinations, we ensure every journey is
              smooth, memorable, and full of joy.
            </p>

            <div className="mt-8 space-y-5">
              {WhyBestFeature.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex items-start gap-3 sm:gap-4">
                  <Icon className="text-primary mt-1 h-6 w-6 shrink-0 sm:h-8 sm:w-8" />
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 sm:text-base">
                      {title}
                    </h4>
                    <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Overlapping Images */}
          <div className="relative mx-auto h-70 w-full max-w-sm sm:h-85 lg:h-105 lg:max-w-none">
            <div className="bg-primary/10 absolute right-5 -bottom-1.5 h-[60%] w-[63%]" />
            <div className="absolute top-0 left-0 z-10 h-[55%] w-[70%] overflow-hidden shadow-md">
              <Image
                src="/gallery/bsf1.jpeg"
                alt="Travel gear"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute right-0 bottom-5 z-20 h-[60%] w-[62%] overflow-hidden shadow-lg">
              <Image
                src="/gallery/bsf2.jpeg"
                alt="Traveler on mountain"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <HomeSections className="max-w-none bg-gray-50">
        <div className="mx-auto max-w-6xl px-4 py-10 text-center sm:py-16">
          <p className="text-primary text-xs font-semibold tracking-widest uppercase sm:text-sm">
            Bangalir Street Food
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-gray-900 sm:text-3xl">
            Your Ultimate Travel Solution
          </h2>

          <div className="mt-10 grid grid-cols-2 gap-6 sm:mt-12 sm:grid-cols-4 sm:gap-10">
            {StatItem.map(({ icon: Icon, value, label }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-2 sm:gap-3"
              >
                <div className="text-primary">
                  <Icon size={32} strokeWidth={1.2} className="sm:hidden" />
                  <Icon
                    size={36}
                    strokeWidth={1.2}
                    className="hidden sm:block"
                  />
                </div>
                <span className="text-2xl font-semibold text-gray-900 sm:text-3xl">
                  {value}
                </span>
                <span className="text-xs text-gray-500 sm:text-sm">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </HomeSections>

      {/* CTA Banner */}
      <section
        className="relative mx-auto mt-10 max-w-6xl overflow-hidden rounded-2xl bg-cover bg-center text-center text-white sm:mt-12"
        style={{ backgroundImage: "url('/gallery/bsf3.jpeg')" }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-1 flex h-full w-full flex-col items-center p-16 px-6 backdrop-blur xl:p-32">
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

      {/* Team Members */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <p className="text-primary text-xs font-semibold tracking-widest uppercase sm:text-sm">
            Our Team
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-gray-900 sm:text-3xl">
            Let&apos;s See Our Member
          </h2>
          <p className="mx-auto mt-3 max-w-md text-xs text-gray-500 sm:text-sm">
            Meet the dedicated people behind every unforgettable journey we
            craft for you.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3">
            {memberData.map(({ id, name, role, image }) => (
              <TeamMemberCard
                key={id}
                name={name}
                role={role}
                imageSrc={image}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
