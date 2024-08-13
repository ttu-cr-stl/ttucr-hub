import { getUserByUsername, internalUpdateUserByUsername } from "@/db/users";
import { Event, Org, User } from "@prisma/client";
import { PrivyProvider, usePrivy } from "@privy-io/react-auth";
import { createContext, useContext, useEffect, useState } from "react";
import { extractUsername } from "../utils";

const privyId = process.env.NEXT_PUBLIC_PRIVY_APP_ID;

const authContext = createContext<{
  user: (User & { orgs?: Org[]; events?: Event[] }) | null;
  updateUser: (data: Partial<User>) => Promise<User | null>;
}>({ user: null, updateUser: () => Promise.resolve(null) });

export const useAuthUser = () => {
  return useContext(authContext);
};

const AuthUserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<
    ({ orgs: Org[]; events: Event[] } & User) | null
  >(null);
  const { user: privyUser } = usePrivy();

  useEffect(() => {
    if (privyUser?.email?.address && user === null) {
      getUserByUsername(extractUsername(privyUser?.email?.address)).then((u) =>
        setUser(u)
      );
    }
    if (privyUser === null && user !== null) {
      setUser(null);
    }
  }, [privyUser, setUser, user]);

  const updateUser = async (data: Partial<User>) => {
    if (privyUser?.email?.address) {
      try {
        const u = await internalUpdateUserByUsername(
          extractUsername(privyUser.email.address),
          data
        );
        setUser(u);
      } catch (e) {
        console.error(e);
      }
    }
    return user;
  };

  return (
    <authContext.Provider value={{ user, updateUser }}>
      {children}
    </authContext.Provider>
  );
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
          logo: "/TTULogo-local.webp",
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
