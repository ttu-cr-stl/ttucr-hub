"use client";
import LoginBtn from "@/components/utils/LoginBtn";
import { NavPath } from "@/lib/utils/consts";
import { usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";

export default function Index() {
  const { ready, authenticated } = usePrivy();
  const router = useRouter();

  if (!ready) {
    // Do nothing while the PrivyProvider initializes with updated user state
    return (
      <main className="relative h-dvh w-dvw flex flex-col items-center justify-center">
        <span>Loading...</span>
      </main>
    );
  }

  if (authenticated) {
    router.push(NavPath.HOME);

    return (
      <main className="relative h-dvh w-dvw flex flex-col items-center justify-center">
        <span>Loading...</span>
      </main>
    );
  }

  return (
    <main className="relative h-dvh w-dvw flex flex-col items-center justify-center">
     <LoginBtn />
    </main>
  );
}
