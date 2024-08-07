import { getUserByUsername } from "@/db/users";
import { Event, Org, User } from "@prisma/client";
import { PrivyProvider, usePrivy } from "@privy-io/react-auth";
import { createContext, useContext, useEffect } from "react";
import { extractUsername } from "../utils";
import { useLocalStorage } from "usehooks-ts";

const privyId = process.env.NEXT_PUBLIC_PRIVY_APP_ID;

const authContext = createContext<
  (User & { orgs?: Org[]; events?: Event[] }) | null
>(null);

export const useAuthUser = () => {
  return useContext(authContext);
};

const AuthUserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useLocalStorage<
    (User & { orgs: Org[]; events: Event[] }) | null
  >("authUser", null);
  const { user: privyUser } = usePrivy();

  useEffect(() => {
    if (privyUser?.email?.address && user === null) {
      getUserByUsername(extractUsername(privyUser?.email?.address)).then(
        (u) => {
          if (u !== user) setUser(u);
        }
      );
    }
  }, [privyUser, setUser, user]);

  return <authContext.Provider value={user}>{children}</authContext.Provider>;
};

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PrivyProvider
      appId={privyId || ""}
      config={{
        // Display email and wallet as login methods
        loginMethods: ["email"],
        // Customize Privy's appearance in your app
        appearance: {
          theme: "light",
          accentColor: "#9C4544",
          logo: "/TTULogoBig.png",
          landingHeader: "Login with @ttu.edu email",
        },
        // Create embedded wallets for users who don't have a wallet
        embeddedWallets: {
          createOnLogin: "off",
        },
      }}
    >
      <AuthUserProvider>{children}</AuthUserProvider>
    </PrivyProvider>
  );
}
