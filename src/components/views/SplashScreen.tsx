import Image from "next/image";

export const SplashScreen = () => (
  <main className="relative h-dvh w-dvw flex items-center justify-center">
    <div className="relative w-1/2 h-96 aspect-auto">
      <Image
        priority
        src="general/TTULogo.png"
        alt=""
        fill
        style={{
          objectFit: "contain",
        }}
      />
    </div>
  </main>
);
