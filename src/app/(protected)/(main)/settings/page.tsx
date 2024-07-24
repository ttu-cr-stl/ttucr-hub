import Link from "next/link";
import { ReactNode } from "react";
import { ChevronRight, LogOut, Moon } from "react-feather";

export default function Explore() {
  return (
    <div className="flex flex-col pt-8">
      <span className="text-3xl font-bold mb-6">Settings</span>
      <div className="flex flex-col gap-y-2">
        <Link href="/settings/profile">
          <SettingsItem>
            <span>Profile</span>
            <div className="flex items-center justify-center size-10 rounded-xl bg-black text-white">
              <ChevronRight />
            </div>
          </SettingsItem>
        </Link>
        <SettingsItem>
          <span>Dark Mode</span>
          <div className="flex items-center justify-center size-10 rounded-xl bg-black text-white">
            <Moon />
          </div>
        </SettingsItem>
        <SettingsItem>
          <span>Log Out</span>
          <div className="flex items-center justify-center size-10 rounded-xl bg-red-500 text-white">
            <LogOut />
          </div>
        </SettingsItem>
      </div>

      <div className="flex flex-col gap-y-1 text-xs text-black/50 text-center mt-6">
        <span> made with ❤ by Students, for Students</span>
        <span> - The Startup & Tech Lab</span>
      </div>
    </div>
  );
}

export const SettingsItem = ({children, onClick}: {children: ReactNode, onClick?: () => any}) => (
  <div onClick={onClick} className="flex justify-between items-center w-full h-12 rounded-lg bg-white pl-4 pr-1 text-xl shadow-sm">
    {children}
  </div>
)
