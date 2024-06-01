"use client";
import { usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";
import { FC, ReactNode, useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";
import { SplashScreen } from "../utils/SplashScreen";

const AuthChecker: FC<{ children: ReactNode }> = ({ children }) => {
  const { ready, authenticated } = usePrivy();
  const router = useRouter();
  const [prevAuth] = useLocalStorage("prev-authenticated", false);

  useEffect(() => {
    if (!prevAuth || (ready && !authenticated)) {
      router.push("/login");
    }

  }, [authenticated, prevAuth, ready, router]);

  if (!prevAuth) {
    return <SplashScreen />;
  }

  if (!ready) {
    // Do nothing while the PrivyProvider initializes with updated user state
    return <SplashScreen />;
  }

  if (ready && !authenticated) {
    return <SplashScreen />;
  }

  return <>{authenticated && <>{children}</>}</>;
};

export default AuthChecker;
