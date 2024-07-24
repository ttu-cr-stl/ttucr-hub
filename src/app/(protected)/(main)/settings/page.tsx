import { SettingsItem } from "@/components/pages/settings/SettingsItem";
import { LogoutBtn } from "@/components/utils/LogoutBtn";
import { ThemeToggle } from "@/components/utils/ThemeToggle";
import Link from "next/link";
import { ChevronRight, Moon } from "react-feather";


export default function Settings() {
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
        <ThemeToggle />
        <LogoutBtn />
      </div>

      <div className="flex flex-col gap-y-1 text-xs text-black/50 text-center mt-6">
        <span> made with ❤ by Students, for Students</span>
        <span> - The Startup & Tech Lab</span>
      </div>
    </div>
  );
}
