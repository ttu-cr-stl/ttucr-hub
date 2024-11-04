import { headers } from "next/headers";
import { ReactNode } from "react";
import { Share_Tech_Mono } from "next/font/google";

const techMono = Share_Tech_Mono({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export default async function HackathonLayout({ children }: { children: ReactNode }) {
  const headersList = await headers();
  const userAgent = headersList.get?.("user-agent") ?? "";
  const isDesktop = !userAgent.toLowerCase().includes("mobile");

  if (isDesktop) {
    return (
      <main className={`z-20 fixed inset-0 flex text-xs hdvh wdvw items-center justify-center bg-black text-[#4AF626] overflow-hidden ${techMono.className} tracking-wider`}>
        {children}
      </main>
    );
  }

  return (
    <div className={`flex min-h-screen ${techMono.className} tracking-wider`}>
      <main className="flex-1 p-6">{children}</main>
      <aside className="w-80 border-l border-[#4AF626]/20 bg-black/95 p-4 text-[#4AF626]">
        {/* <LeaderboardComponent /> */}
      </aside>
    </div>
  );
}
