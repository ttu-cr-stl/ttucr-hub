import { CarousselForm } from "@/components/pages/onboarding/CarousselForm";
import Image from "next/image";

export default function Onboarding() {
  return (
    <main className="relative h-full w-full flex flex-col py-20 px-6 space-y-12">
      <div className="fixed top-0 right-0 w-20 h-20 self-end aspect-auto">
        <Image
          src="general/TTULogo.png"
          alt=""
          fill
          style={{
            objectFit: "contain",
          }}
        />
      </div>
      <span className="text-xl">
        Hey, <span className="text-accent">Red Raider</span>! <br /> Tell us
        about yourself...
      </span>
      <CarousselForm />
    </main>
  );
}
