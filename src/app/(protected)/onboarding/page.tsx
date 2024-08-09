import { CarousselForm } from "@/components/pages/onboarding/CarousselForm";
import Image from "next/image";

export default function Onboarding() {
  return (
    <main className="relative h-full w-full flex flex-col py-20 px-6 space-y-12">
      <div className="absolute top-5 right-5 flex items-center justify-center size-20 bg-white rounded-lg self-end aspect-auto">
        <Image
          src="general/TTULogo-local.webp"
          alt=""
          width={100}
          height={100}
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
