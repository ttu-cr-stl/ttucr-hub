"use client";
import { isTTUEmail } from "@/lib/utils";
import { usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";
import { FC, ReactNode, useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";
import { EmailNotTTU } from "../views/EmailNotTTU";
import { SplashScreen } from "../views/SplashScreen";

const AuthChecker: FC<{ children: ReactNode }> = ({ children }) => {
  const { ready, authenticated, user: PrivyUser } = usePrivy();
  const router = useRouter();

  useEffect(() => {
    if (ready && !authenticated) {
      router.push("/login");
    }
  }, [authenticated, ready, router]);

  if (!ready) {
    // Do nothing while the PrivyProvider initializes with updated user state
    return <SplashScreen />;
  }

  if (ready && !authenticated) {
    return <SplashScreen />;
  }

  if (PrivyUser && PrivyUser.email && !isTTUEmail(PrivyUser.email.address)) {
    return <EmailNotTTU />;
  }

  return <>{authenticated && <>{children}</>}</>;
};

export default AuthChecker;
