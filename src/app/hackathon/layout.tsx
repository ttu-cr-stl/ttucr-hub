import { Share_Tech_Mono } from "next/font/google";
import { headers } from "next/headers";
import Image from "next/image";
import { ReactNode } from "react";
import { TerminalText } from "./utils/terminalText";

const techMono = Share_Tech_Mono({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export default async function HackathonLayout({
  children,
}: {
  children: ReactNode;
}) {
  const isHackathonEnabled = process.env.HACKATHON_ENABLE === "TRUE";
  const hackathonStartDate = new Date(process.env.DATE_HACKATHON_START ?? "");

  if (!isHackathonEnabled || hackathonStartDate > new Date()) {
    return (
      <main
        className={`z-20 fixed inset-0 flex flex-col items-center justify-center bg-black text-[#4AF626] ${techMono.className} tracking-wider text-lg`}
      >
        <div className="relative flex flex-col h-5/6 w-3/4 p-4 rounded-lg border border-[#4AF626] bg-black/90 font-mono text-[#4AF626] shadow-lg shadow-[#4AF626]/20">
          <div className="flex items-center justify-between w-full border-b border-[#4AF626]/30 pb-2 mb-4">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <div className="flex items-center gap-x-2 text-sm -ml-12">
              TTU Hackathon
            </div>
            <div className=""></div>
          </div>

          <TerminalText 
            text={[
              "TTU Hackathon System Initializing...",
              "Status: Preparing Environment",
              "Join us today at 3:20pm!",
              "Waiting for launch sequence..."
            ]}
            typingSpeed={100}
            lineDelay={1000}
            color="#4AF626"
            showCursor={true}
          />
        </div>
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
