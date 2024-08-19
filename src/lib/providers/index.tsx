"use client";
import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";
import AuthProvider from "./authProvider";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

export const GlobalProviders = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <ProgressBar
        height="4px"
        color="#9C4544"
        options={{ showSpinner: false }}
        shallowRouting
      />
      <AuthProvider>{children}</AuthProvider>
    </ThemeProvider>
  );
};
