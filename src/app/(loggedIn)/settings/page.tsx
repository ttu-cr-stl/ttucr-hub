"use client";
import { Button } from "@/components/ui/button";
import { usePrivy } from "@privy-io/react-auth";

export default function Settings() {
  const { logout, user } = usePrivy();

  return (
    <div className="flex flex-col space-y-10 px-4 pt-10 w-[90vw]">
      <span className=" w-56 text-wrap">
        {JSON.stringify(user?.linkedAccounts)}
      </span>

      <Button onClick={logout}>Log out</Button>
    </div>
  );
}
