'use client'

import { NavPath } from "@/components/layout/NavBar";
import { Button } from "@/components/ui/button";
import { useLogin, usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";


export default function Index() {

  const {ready, authenticated} = usePrivy();
  const router = useRouter();

  const {login} = useLogin({
    onComplete: (user, isNewUser, wasAlreadyAuthenticated) => {
      console.log(user, isNewUser, wasAlreadyAuthenticated);
      // Any logic you'd like to execute if the user is/becomes authenticated while this
      // component is mounted
      router.push(NavPath.HOME)
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

  if (ready && authenticated) {
    router.push(NavPath.HOME)
  }

  return (
    <main className="relative h-dvh w-dvw flex flex-col items-center justify-center">
      <Button onClick={login}>
        Login
      </Button>
    </main>
  );
}
