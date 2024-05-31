import { PrivyProvider } from "@privy-io/react-auth";

const privyId = process.env.NEXT_PUBLIC_PRIVY_APP_ID;


export default function AuthProvider({ children }: { children: React.ReactNode }) {
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
            logo: "/LogoSTL.png",
            landingHeader: "Login with @ttu.edu email",
          },
          // Create embedded wallets for users who don't have a wallet
          embeddedWallets: {
            createOnLogin: "off",
          },
        }}
      >
        {children}
      </PrivyProvider>
    );
}