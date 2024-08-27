"use client";
import { useAuthUser } from "@/lib/providers/authProvider";
import { NavPath } from "@/lib/types";
import { isTTUEmail } from "@/lib/utils";
import { usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next-nprogress-bar";
import { FC, ReactNode, useEffect } from "react";
import { EmailNotTTU } from "../views/EmailNotTTU";
import { SplashScreen } from "../views/SplashScreen";

const AuthChecker: FC<{ children: ReactNode }> = ({ children }) => {
  const { ready, authenticated, user: PrivyUser } = usePrivy();
  const router = useRouter();
  const { user } = useAuthUser();

  useEffect(() => {
    if (ready && !authenticated) {
      router.push(NavPath.LOGIN);
    }
  }, [authenticated, ready, router]);

  if (!ready || (authenticated && !user)) {
    // Show splash screen while the PrivyProvider or AuthProvider initializes
    return <SplashScreen />;
  }

  if (PrivyUser && PrivyUser.email && !isTTUEmail(PrivyUser.email.address)) {
    return <EmailNotTTU />;
  }

  return <>{authenticated && <>{children}</>}</>;
};

export default AuthChecker;
