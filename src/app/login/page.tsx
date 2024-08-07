import LoginBtn from "@/components/utils/LoginBtn";
import Image from "next/image";

export default function Login() {
  return (
    <main className="relative h-full w-full flex flex-col items-center justify-center space-y-6">
      <div className="relative w-32 h-32 self-center aspect-auto">
        {/* <Image
          src="general/TTULogo.png"
          alt=""
          fill
          style={{
            objectFit: "contain",
          }}
        /> */}
      </div>
      <span className="text-lg font-bold text-center mb-4">
        Welcome to <b>TTU@CR HUB,</b> <br />
        <span className="text-accent">Red Raider</span>!
      </span>
      <LoginBtn />
    </main>
  );
}
