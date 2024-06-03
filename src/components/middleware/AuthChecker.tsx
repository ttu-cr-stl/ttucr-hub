"use client";
import { usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";
import { FC, ReactNode, useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";
import { SplashScreen } from "../utils/SplashScreen";
import { EmailNotTTU } from "../utils/EmailNotTTU";

const AuthChecker: FC<{ children: ReactNode }> = ({ children }) => {
  const { ready, authenticated, user } = usePrivy();
  const router = useRouter();
  const [prevAuth] = useLocalStorage("prev-authenticated", false);

  useEffect(() => {
    if (!prevAuth || (ready && !authenticated)) {
      router.push("/login");
    }
    
  }, [authenticated, prevAuth, ready, router, user, user?.email?.address]);

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

  if (user && user.email && /(?!.*@ttu\.edu)/.test(user.email.address)) {
    return <EmailNotTTU />;
  }

  return <>{authenticated && <>{children}</>}</>;
};

export default AuthChecker;
