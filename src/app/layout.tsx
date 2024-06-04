import { GlobalProviders } from "@/lib/providers";
import "@/lib/styles/globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TTU@CR Hub",
  description:
    "The place to catch up on Campus Activities, Student Orgs & fellow Students",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="relative self-center h-dvh w-dvw md:h-[667px] md:w-[375px] bg-stone-300 *:bg-white text-black">
        <Analytics />
        <SpeedInsights />

        <GlobalProviders>{children}</GlobalProviders>
      </body>
    </html>
  );
}
