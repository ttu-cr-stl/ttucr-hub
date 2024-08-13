"use client";
import LoginBtn from "@/components/utils/LoginBtn";
import { useAddToHomeScreen } from "@/lib/hooks/useAddtoHomeScreen";
import Image from "next/image";
import { Plus } from "react-feather";

export default function Login() {
  const { isInstallable, handleAddToHomeScreen } = useAddToHomeScreen();

  return (
    <div className="flex items-center justify-center h-dvh w-dvw bg-gradient-to-t from-red-300 from-0% via-red-100 to-transparent to-45%">
      {isInstallable && (
        <div onClick={handleAddToHomeScreen} className="absolute bottom-2 flex items-center mx-auto gap-x-1 p-2 bg-white/10 backdrop-blur-sm border border-white rounded-md text-sm cursor-pointer z-10">
          <span className="text-white">Add to Home</span>   
          <div className="size-6 bg-white rounded-md flex items-center justify-center">
            <Plus className="text-red-300" size={16} />
          </div>
        </div>
      )}
      <div className="absolute top-5 right-5">
        <Image
          src="general/stl-black.png"
          alt=""
          width={60}
          height={60}
          className="rounded-lg"
        />
      </div>
      <main className="relative h-full w-full flex flex-col items-center justify-center space-y-6 ">
        <div className="relative w-64 h-32 self-center aspect-auto">
          <Image
            src="general/TTULogoBig.png"
            alt=""
            fill
            style={{
              objectFit: "contain",
            }}
          />
        </div>
        <LoginBtn />
        <div className="flex flex-col gap-y-1 text-xs text-gray-900 text-center mt-6">
          <span>
            made with <b>&hearts;</b> by Students, for Students
          </span>
          <span> - The Startup & Tech Lab</span>
        </div>
      </main>
    </div>
  );
}
