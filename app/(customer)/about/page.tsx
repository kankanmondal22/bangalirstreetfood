import Heading2 from "@/components/reusable/Heading2";
import Image from "next/image";

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
    <div className="group rounded-2xl bg-white p-6 text-center shadow-sm transition hover:-translate-y-2 hover:shadow-lg">
      <div className="relative mx-auto h-32 w-32 overflow-hidden rounded-full">
        <Image src={imageSrc} alt={name} fill className="object-cover" />
      </div>

      <h3 className="mt-4 text-lg font-semibold text-gray-900">{name}</h3>
      <p className="text-sm text-teal-600">{role}</p>
    </div>
  );
};

const AboutPage = () => {
  return (
    <div className="mx-auto mt-16 max-w-6xl px-4 py-8">
      <h1 className="font-handwriting mt-8 mb-2 text-center text-7xl font-semibold">
        Our Story
      </h1>
      <p className="text-center text-gray-700">
        Discover the passion and dedication behind our travel agency, committed
        to making your journeys unforgettable.
      </p>
      <section className="py-16">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 lg:grid-cols-2">
          <Image
            src="/gallery/bsf1.jpeg"
            alt="travel"
            width={500}
            height={400}
            className="rounded-2xl object-cover shadow-md"
          />

          <div>
            <Heading2>Our Journey</Heading2>
            <p className="mt-4 text-gray-500">
              What started as a passion for exploring new places has grown into
              a mission to help others experience the beauty of travel.
            </p>
            <p className="mt-3 text-gray-500">
              From local trips to dream destinations, we ensure every journey is
              smooth, memorable, and full of joy.
            </p>
          </div>
        </div>
      </section>
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
    </div>
  );
};

export default AboutPage;
