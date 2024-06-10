import { Button } from "@/components/ui/shadcn/button";
import { LogoutBtn } from "@/components/utils/LogoutBtn";
import Link from "next/link";

export default function Settings() {
  return (
    <div className="flex flex-col space-y-10 px-4 pt-10">
      <span className="text-xl font-bold">Settings</span>
      <Link href="/settings/profile">
        <Button className="w-full">Edit Profile</Button>
      </Link>
      <LogoutBtn />
    </div>
  );
}
