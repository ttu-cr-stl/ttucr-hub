import LoginBtn from "@/components/utils/LoginBtn";
import Image from "next/image";

export default function Login() {
  return (
    <div className="flex items-center justify-center h-full w-full bg-gradient-to-t from-red-300 from-0% via-red-100 to-transparent to-45%">
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