import Image from "next/image";

export const SplashScreen = () => (
  <main className="relative h-dvh w-dvw flex items-center justify-center">
    <div className="relative w-2/3 h-96 aspect-auto">
      <Image
        priority
        src="/LogoSTL.png"
        alt=""
        fill
        style={{
          objectFit: "contain",
        }}
      />
    </div>
  </main>
);
