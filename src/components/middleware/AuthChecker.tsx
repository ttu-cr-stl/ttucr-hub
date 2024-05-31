"use client";
import { usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";
import { FC, ReactNode } from "react";
import { useLocalStorage } from "usehooks-ts";
import { SplashScreen } from "../utils/SplashScreen";

const AuthChecker: FC<{ children: ReactNode }> = ({ children }) => {
  const { ready, authenticated } = usePrivy();
  const router = useRouter();
  const [prevAuth] = useLocalStorage("prev-authenticated", false);

  if (!prevAuth) {
    router.push("/login");
    return <SplashScreen />;
  }

  if (!ready) {
    // Do nothing while the PrivyProvider initializes with updated user state
    return <SplashScreen />;
  }

  if (ready && !authenticated) {
    router.push("/login");
  }

  return <>{authenticated && <>{children}</>}</>;
};

export default AuthChecker;
