import BeachScene from "@/components/AnimatedBeachScene";
import { ComponentExample } from "@/components/component-example";
import Image from "next/image";

export default function Page() {
    return (
        //hero

        <div>
            <div className="mx-w-5xl">
                <Image
                    src="/hero.png"
                    width={1920}
                    height={1080}
                    alt="Hero Image"
                    className="w-full max-w-5xl mx-auto h-auto object-cover m-2"
                />
                <BeachScene />
            </div>
            <ComponentExample />{" "}
        </div>
    );
}
