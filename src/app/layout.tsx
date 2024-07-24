import { GlobalProviders } from "@/lib/providers";
import "@/lib/styles/globals.css";
import { cn } from "@/lib/utils/cn";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import PullToRefresh from "@/components/utils/PullToRefresh";

const APP_NAME = "TTU@CR Hub";
const APP_DEFAULT_TITLE = "TTU@CR Hub";
const APP_TITLE_TEMPLATE = "%s - TTU@CR Hub";
const APP_DESCRIPTION =
  "The place to catch up on Campus Events, Student Organizations & fellow Students at the TTU@CR Campus. Built for Students, by Students.";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#F5F5F5",
};

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(inter.className, "bg-[#F5F5F5] dark:bg-gray-500 text-black")}
    >
      {/* <PullToRefresh /> */}
      <body className="relative self-center h-dvh w-dvw">
        <Analytics />
        <SpeedInsights />

        <GlobalProviders>{children}</GlobalProviders>
      </body>
    </html>
  );
}
