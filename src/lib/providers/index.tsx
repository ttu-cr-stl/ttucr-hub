"use client";
import { ThemeProvider } from "next-themes";
import PullToRefresh from "pulltorefreshjs";
import { ReactNode } from "react";
import AuthProvider from "./authProvider";
import { detectOS } from "../utils";

export const GlobalProviders = ({ children }: { children: ReactNode }) => {

  if (detectOS() === "iOS") {
    PullToRefresh.init({
      mainElement: "body",
      onRefresh() {
        window.location.reload();
      },
    });
  }

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
