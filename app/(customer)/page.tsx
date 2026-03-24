// import BeachScene from "@/components/AnimatedBeachScene";
// import { ComponentExample } from "@/components/component-example";
import HeroVideo from "@/components/HeroVideo";
import Home from "@/components/home";
import PackageGallery from "@/components/PackageGallery";
import SocialMediaVideoCard from "@/components/SocialMediaVideoCard";
// import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    //hero

    <div className="w-full">
      {/* <div className="mx-w-5xl">
                <Image
                    src="/hero.png"
                    width={1920}
                    height={1080}
                    alt="Hero Image"
                    className="w-full max-w-5xl mx-auto h-auto object-cover m-2"
                />
            </div> */}
      <HeroVideo />
      <Home />
      <SocialMediaVideoCard />
        <PackageGallery />

      {/* <div className="m-6">
        <Button variant="shadow" className="">
          Click me
        </Button>
      </div> */}
      {/* <section className="bg-background rounded-t-3xl pt-6">
        <ComponentExample />{" "}
      </section> */}
    </div>
  );
}
