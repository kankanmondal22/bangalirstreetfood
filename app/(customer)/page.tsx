import BeachScene from "@/components/AnimatedBeachScene";
import { ComponentExample } from "@/components/component-example";

export default function Page() {
  return (
    //hero

    <div>
      <div className="mx-w-5xl">
        <BeachScene />
      </div>
      <ComponentExample />{" "}
    </div>
  );
}
