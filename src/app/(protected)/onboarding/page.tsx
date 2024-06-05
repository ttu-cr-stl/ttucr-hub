import { CarousselForm } from "@/components/pages/onboarding/CarousselForm";

export default function Onboarding() {
  return <main className="relative h-full w-full flex flex-col justify-center px-6 space-y-8">
    <span className="text-lg">Hey! <br/> Tell us about yourself...</span>
    <CarousselForm />
  </main>;
}
