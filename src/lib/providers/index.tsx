"use client";
import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";
import AuthProvider from "./authProvider";

export const GlobalProviders = ({ children }: { children: ReactNode }) => {
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
