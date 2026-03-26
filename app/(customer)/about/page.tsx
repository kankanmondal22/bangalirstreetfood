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
    <div className="flex flex-col items-center space-y-4 bg-sky-200">
      <Image
        src={imageSrc}
        alt={name}
        width={150}
        height={150}
        className="w-full max-w-64 rounded-full bg-amber-100 object-cover"
      />
      <h3 className="text-lg font-semibold">{name}</h3>
      <p className="text-sm text-gray-600">{role}</p>
    </div>
  );
};

const AboutPage = () => {
  return (
    <div className="m-2 mx-auto w-full max-w-6xl">
      <h1>Bangalir Street Food</h1>
      <div>
        <h2>Our Team</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <TeamMemberCard
            name="John Doe"
            role="Founder & CEO"
            imageSrc="/team/1.jpg"
          />
          <TeamMemberCard
            name="John Doe"
            role="Founder & CEO"
            imageSrc="/team/1.jpg"
          />
          <TeamMemberCard
            name="John Doe"
            role="Founder & CEO"
            imageSrc="/team/1.jpg"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
