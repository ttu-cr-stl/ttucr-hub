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
      className={cn(
        inter.className,
        "bg-[#F5F5F5] dark:bg-gray-500 text-black"
      )}
    >
      <body className="self-center h-dvh w-dvw lg:flex lg:items-center lg:justify-center">
        <Analytics />
        <SpeedInsights />

        <GlobalProviders>
          <div className="relative lg:w-[375px] lg:h-[812px] lg:overflow-hidden lg:border lg:border-gray-300 lg:rounded-3xl lg:shadow-lg">
            {children}
          </div>
          <div className="hidden lg:block lg:ml-8 lg:max-w-md">
            <h1 className="text-2xl font-bold mb-4">Welcome to TTU@CR Hub</h1>
            <p className="text-gray-600">
              This app is optimized for mobile devices. For the best experience, please visit on your smartphone or use the simulated mobile view on the left.
            </p>
          </div>
        </GlobalProviders>
      </body>
    </html>
  );
}