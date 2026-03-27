// import BeachScene from "@/components/AnimatedBeachScene";
// import { ComponentExample } from "@/components/component-example";
// import { PropertyCard } from "@/components/DynamicCard";
import HeroVideo from "@/components/HeroVideo";
// import Home from "@/components/home";
import HomeGallery from "@/components/HomeGallery";
import SocialMediaVideoCard from "@/components/SocialMediaVideoCard";
import Testimonials from "@/components/Testimonials";
// import FacebookPost from "@/components/socials/FacebookPost";
// import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    //hero

    <div className="w-full">
      <HeroVideo />
      <SocialMediaVideoCard />
      {/* <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-3">
        <PropertyCard
          title="Beachfront Villa"
          description="Experience the ultimate beachfront getaway in our luxurious villa, where you can wake up to the sound of waves, enjoy stunning ocean views from your private terrace, and relax in your own infinity pool just steps away from the sandy shore."
          badges={["4.8 ★★★★★", "3 Night Stay"]}
          imageUrl="/pahar.jpeg"
        />
        <PropertyCard
          title="Beachfront Villa"
          description="Experience the ultimate beachfront getaway in our luxurious villa, where you can wake up to the sound of waves, enjoy stunning ocean views from your private terrace, and relax in your own infinity pool just steps away from the sandy shore."
          badges={["4.8 ★★★★★", "3 Night Stay"]}
          imageUrl="/pahar2.jpeg"
        />
      </div> */}
      <Testimonials />
      {/* <Home /> */}

      <HomeGallery />
    </div>
  );
}
