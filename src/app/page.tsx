"use client";
import { Button } from "@/components/ui/button";
import LoginBtn from "@/components/utils/LoginBtn";
import { NavPath } from "@/lib/utils/consts";
import { usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";

export default function Index() {
  const { authenticated } = usePrivy();
  const router = useRouter();

  return (
    <main className="relative h-dvh w-dvw flex flex-col items-center justify-center">
      {authenticated ? (
        <>
          <Button onClick={() => router.push(NavPath.HOME)}>Continue</Button>
        </>
      ) : (
        <>
          <LoginBtn />
        </>
      )}
    </main>
  );
}
