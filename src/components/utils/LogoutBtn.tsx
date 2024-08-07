"use client";
import { User } from "@prisma/client";
import { usePrivy } from "@privy-io/react-auth";
import { useLocalStorage } from "usehooks-ts";
import { SettingsItem } from "../pages/settings/SettingsItem";
import { LogOut } from "react-feather";

export const LogoutBtn = () => {
  const { logout } = usePrivy();
  const [__, setUser] = useLocalStorage<User | null>("authUser", null);

  return (
    <SettingsItem
      onClick={() => {
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
