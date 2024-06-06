import { CarousselForm } from "@/components/pages/onboarding/CarousselForm";

export default function Onboarding() {
  return <main className="relative h-full w-full flex flex-col py-20 px-6 space-y-12">
    <span className="text-xl">Hey, <span className="text-accent">Red Raider</span>! <br/> Tell us about yourself...</span>
    <CarousselForm />
  </main>;
}
