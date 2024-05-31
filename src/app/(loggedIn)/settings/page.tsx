"use client";
import { Button } from "@/components/ui/button";
import { usePrivy } from "@privy-io/react-auth";
import { useLocalStorage } from "usehooks-ts";

export default function Settings() {
  const { updateEmail, logout, user, linkEmail } = usePrivy();
  const [prevAuth, setPrevAuth] = useLocalStorage("prev-authenticated", false);

  return (
    <div className="flex flex-col space-y-10 px-4 pt-10 w-[90vw]">
      <span className=" w-56 text-wrap">
        {JSON.stringify(user?.linkedAccounts)}
      </span>

      <Button
        onClick={() => {
          setPrevAuth(false);
          logout();
        }}
      >
        Log out
      </Button>

      <Button onClick={linkEmail}>Add your email</Button>
    </div>
  );
}
