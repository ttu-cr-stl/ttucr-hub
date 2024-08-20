import Image from "next/image";
import { LogoutBtn } from "../utils/LogoutBtn";

export const EmailNotTTU = () => (
  <main className="relative h-dvh w-dvw flex flex-col items-center justify-center space-y-4">
    <div className="relative w-2/3 h-32 aspect-auto">
      <Image
        src="/LogoSTL.png"
        alt=""
        fill
        sizes="(max-width: 375px) 100vw, (max-width: 768px) 375px, 800px"
        style={{
          objectFit: "contain",
        }}
      />
    </div>
    <span>Sorry, you must login in with a @ttu.edu email!</span>
    <LogoutBtn />
  </main>
);
