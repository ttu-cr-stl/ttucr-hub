'use client'
import { Button } from "@/components/ui/button";
import { NavPath } from "@/lib/utils/consts";
import { useLogin, usePrivy } from "@privy-io/react-auth";
import Link from "next/link";
import { useRouter } from "next/navigation";


export default function Index() {

  const {ready, authenticated} = usePrivy();
  const router = useRouter();

  const {login} = useLogin({
    onComplete: (user, isNewUser, wasAlreadyAuthenticated) => {
      console.log(user, isNewUser, wasAlreadyAuthenticated);
      // Any logic you'd like to execute if the user is/becomes authenticated while this
      // component is mounted

      if (isNewUser) {
        router.push(NavPath.ONBOARDING); // Do check for @ttu email in onboarding /^[A-Za-z0-9._%+-]+@testdomain\.com$/.test(user.email?.toString() || "")
      } else {
        router.push(NavPath.HOME);
      }
    },
    onError: (error) => {
      console.log(error);
      // Any logic you'd like to execute after a user exits the login flow or there is an error
      // Display warning toast, etc.
    },
  });

  if (!ready) {
    // Do nothing while the PrivyProvider initializes with updated user state
    return <></>;
  }

  return (
    <main className="relative h-dvh w-dvw flex flex-col items-center justify-center">

      {authenticated ? <>

        <Button onClick={() => router.push(NavPath.HOME)}>Continue</Button>

      </>:<>

        <Button onClick={login}>Login</Button>

      </>}
    </main>
  );
}
