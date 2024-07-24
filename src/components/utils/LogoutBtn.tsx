"use client";
import { User } from "@prisma/client";
import { usePrivy } from "@privy-io/react-auth";
import { LogOut } from "lucide-react";
import { useLocalStorage } from "usehooks-ts";
import { SettingsItem } from "../pages/settings/SettingsItem";

export const LogoutBtn = () => {
  const { logout } = usePrivy();
  const [_, setPrevAuth] = useLocalStorage("prev-authenticated", false);
  const [__, setUser] = useLocalStorage<User | null>("authUser", null);

  return (
    <SettingsItem
      onClick={() => {
        setPrevAuth(false);
        setUser(null);
        logout();
      }}
    >
      <span>Log Out</span>
      <div className="flex items-center justify-center size-10 rounded-xl bg-red-500 text-white">
        <LogOut />
      </div>
    </SettingsItem>
  );
};
