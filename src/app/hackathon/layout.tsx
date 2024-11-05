import { headers } from "next/headers";
import { ReactNode } from "react";
import { Share_Tech_Mono } from "next/font/google";
import { Rankings } from "./components/Rankings";
import Image from "next/image";
const techMono = Share_Tech_Mono({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export default async function HackathonLayout({ children }: { children: ReactNode }) {
  const isHackathonEnabled = process.env.HACKATHON_ENABLE === "TRUE";
  
  if (!isHackathonEnabled) {
    return (
      <main className={`z-20 fixed inset-0 flex flex-col items-center justify-center bg-black text-[#4AF626] ${techMono.className} tracking-wider`}>
        <h1 className="text-2xl mb-4">Hackathon Coming Soon</h1>
        <p className="text-[#4AF626]/70">Stay tuned for our upcoming hackathon event!</p>
      </main>
    );
  }

  const headersList = await headers();
  const userAgent = headersList.get?.("user-agent") ?? "";
  const isDesktop = !userAgent.toLowerCase().includes("mobile");

  if (isDesktop) {
    return (
      <main
        className={`z-20 fixed inset-0 flex text-xs hdvh wdvw items-center justify-center bg-black text-[#4AF626] overflow-hidden ${techMono.className} tracking-wider`}
      >
        <div className="relative flex flex-col h-5/6 w-3/4 p-4 rounded-lg border border-[#4AF626] bg-black/90 font-mono text-[#4AF626] shadow-lg shadow-[#4AF626]/20">
          {children}
        </div>

        <div className="absolute bottom-1 flex items-center gap-x-2">
          <span className="text-sm">powered by </span>
          <Image
            src="general/STLblack.png"
            alt=""
            width={64}
            height={64}
            className="rounded-lg"
          />
        </div>
      </main>
    );
  }

  return (
    <main
      className={`z-20 fixed inset-0 flex flex-col text-xs hdvh wdvw items-center justify-center p-2 bg-black text-[#4AF626] overflow-hidden ${techMono.className} tracking-wider`}
    >
      {children}

      <div className="absolute bottom-1 flex items-center gap-x-2">
        <span className="text-sm">powered by </span>
        <Image
          src="general/STLblack.png"
          alt=""
          width={64}
          height={64}
          className="rounded-lg"
        />
      </div>
    </main>
  );
}
