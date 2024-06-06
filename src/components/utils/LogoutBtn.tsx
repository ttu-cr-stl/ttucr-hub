"use client";
import { User } from "@prisma/client";
import { usePrivy } from "@privy-io/react-auth";
import { useLocalStorage } from "usehooks-ts";
import { Button } from "../ui/button";

export const LogoutBtn = () => {
  const { logout } = usePrivy();
  const [_, setPrevAuth] = useLocalStorage("prev-authenticated", false);
  const [__, setUser] = useLocalStorage<User | null>("authUser", null);

  return (
    <Button
      onClick={() => {
        setPrevAuth(false);
        setUser(null)
        logout();
      }}
    >
      Log out
    </Button>
  );
};
