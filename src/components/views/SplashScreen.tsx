import Image from "next/image";

export const SplashScreen = () => (
  <main className="relative h-full w-full bg-white flex items-center justify-center">
    <div className="relative w-1/2 h-96 aspect-auto">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/TTULogo-local.webp"
        alt=""
        className="w-full h-full object-contain"
      />
    </div>
  </main>
);
