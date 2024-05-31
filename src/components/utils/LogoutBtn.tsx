"use client"
import { usePrivy } from "@privy-io/react-auth";
import { useLocalStorage } from "usehooks-ts";
import { Button } from "../ui/button";

export const LogoutBtn = () => {

  const { logout } = usePrivy();
  const [_, setPrevAuth] = useLocalStorage("prev-authenticated", false);

  return (
    <Button
      onClick={() => {
        setPrevAuth(false);
        logout();
      }}
    >
      Log out
    </Button>
  );
};
