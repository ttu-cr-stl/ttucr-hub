"use client";
import { ThemeProvider } from "next-themes";
import PullToRefresh from "pulltorefreshjs";
import { ReactNode, useEffect } from "react";
import { detectOS } from "../utils";
import AuthProvider from "./authProvider";

export const GlobalProviders = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    if (window && detectOS() === "iOS") {
      PullToRefresh.init({
        mainElement: "main",
        onRefresh() {
          window.location.reload();
        },
      });
    }
  }, []);

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
