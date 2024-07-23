"use client";
import { ThemeProvider } from "next-themes";
import PullToRefresh from "pulltorefreshjs";
import { ReactNode, useEffect } from "react";
import { detectOS } from "../utils";
import AuthProvider from "./authProvider";
import { useRouter } from "next/navigation";

export const GlobalProviders = ({ children }: { children: ReactNode }) => {

  const router = useRouter();

  useEffect(() => {
    if (window && router && detectOS() === "iOS") {
      PullToRefresh.init({
        mainElement: "body",
        onRefresh() {
          router.refresh();
        },
      });
    }
  }, [router]);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <AuthProvider>{children}</AuthProvider>
    </ThemeProvider>
  );
};
