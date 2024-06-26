import { Button } from "@/components/ui/shadcn/button";
import { LogoutBtn } from "@/components/utils/LogoutBtn";
import Image from "next/image";
import Link from "next/link";

export default function Settings() {
  return (
    <div className="flex flex-col min-h-dvh w-full space-y-10 px-4 pt-6">
      <div className="relative flex items-center w-full px-4 h-24">
        <h1 className="z-10 text-xl text-black font-bold"> Settings </h1>
        <Image
          src="/Banner.png"
          className="absolute top-0 left-0 w-dvw h-full"
          alt=""
          fill
          style={{
            objectFit: "contain",
          }}
        />
      </div>
      
      {/* <div className="flex flex-col items-center justify-center space-y-2 px-4 pt-10"></div> */}
      <Link href="/settings/profile">
        <Button className="w-full max-w-md">Edit Profile</Button>
      </Link>
      <LogoutBtn/>
    </div>
  );
}
