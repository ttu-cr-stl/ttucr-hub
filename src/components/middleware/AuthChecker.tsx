"use client";
import { useAuthUser } from "@/lib/providers/authProvider";
import { isTTUEmail } from "@/lib/utils";
import { usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";
import { FC, ReactNode, useEffect } from "react";
import { EmailNotTTU } from "../views/EmailNotTTU";
import { SplashScreen } from "../views/SplashScreen";

const AuthChecker: FC<{ children: ReactNode }> = ({ children }) => {
  const { ready, authenticated, user: PrivyUser } = usePrivy();
  const router = useRouter();
  const { user } = useAuthUser();

  useEffect(() => {
    if (ready && !authenticated) {
      router.push("/login");
    }
  }, [authenticated, ready, router]);

  if (!ready) {
    // Do nothing while the PrivyProvider initializes with updated user state
    return <SplashScreen />;
  }

  if (!user && authenticated) {
    // Do nothing while the AuthProvider initializes with updated user state
    return <SplashScreen />;
  }

  if (PrivyUser && PrivyUser.email && !isTTUEmail(PrivyUser.email.address)) {
    return <EmailNotTTU />;
  }

  return <>{authenticated && <>{children}</>}</>;
};

export default AuthChecker;
