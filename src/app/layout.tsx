import { GlobalProviders } from "@/lib/providers";
import "@/lib/styles/globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  // TODO: Update metadata
  title: "TTU@CR Hub",
  description: "The place to catch up on Campus Activities, Student Orgs & fellow Students",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  console.log(SpeedInsights, Analytics);

  return (
    <html lang="en">
      <body className="relative self-center h-dvh w-dvw sm:h-[667px] sm:w-[375px] bg-stone-300 *:bg-white">
      <Analytics />
      <SpeedInsights />
        {/* <div className="block sm:hidden"> */}
        <GlobalProviders>{children}</GlobalProviders>
        {/* </div> */}

        {/* <div className="hidden sm:flex justify-center items-center h-dvh w-dvw">
          <span>Come back on mobile...</span>
        </div> */}
      </body>
    </html>
  );
}
