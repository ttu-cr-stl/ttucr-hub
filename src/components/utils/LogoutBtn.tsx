"use client";
import { usePrivy } from "@privy-io/react-auth";
import { LogOut } from "react-feather";
import { SettingsItem } from "../pages/settings/SettingsItem";

export const LogoutBtn = () => {
  const { logout } = usePrivy();

  return (
    <SettingsItem
      onClick={() => {
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
