"use client";

import { SettingsItem } from "@/components/pages/settings/SettingsItem";
import { Card, CardContent, CardHeader } from "@/components/ui/shadcn/card";
import { LogoutBtn } from "@/components/utils/LogoutBtn";
import { useAddToHomeScreen } from "@/lib/hooks/useAddtoHomeScreen";
import Link from "next/link";
import { ChevronRight, Plus } from "react-feather";

const Settings = () => {
  const { isInstallable, handleAddToHomeScreen } = useAddToHomeScreen();

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
        {/* <ThemeToggle /> */}
        <LogoutBtn />
      </div>

      <div className="flex flex-col gap-y-1 text-xs text-black/50 text-center mt-6">
        <span>
          made with <b>&hearts;</b> by Students, for Students
        </span>
        <span> - The Startup & Tech Lab</span>
      </div>

      {isInstallable && (
        <div className="mt-24">
          <Card className="bg-red-50 border-red-200 shadow-sm">
            <CardHeader>
              <button
                onClick={handleAddToHomeScreen}
                className="w-fit mx-auto py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
              >
                <div className="flex items-center mx-auto gap-x-2">
                  <div className="flex items-center justify-center w-6 h-6 bg-white rounded-md text-red-500">
                    <Plus size={16} />
                  </div>
                  <span className="mr-2">Add to Home Screen</span>
                </div>
              </button>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-red-600 mb-4">
                Install TTU@CR Hub on your device for quick access and a better
                experience!
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Settings;
