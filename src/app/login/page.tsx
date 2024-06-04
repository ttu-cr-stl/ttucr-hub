import LoginBtn from "@/components/utils/LoginBtn";

export default function Login() {
  return (
    <main className="relative h-full w-full flex flex-col items-center justify-center space-y-10">
      <span className="text-lg font-bold text-center">
        Welcome to <b>TTU@CR HUB,</b> <br />
        <span className="text-accent">Red Raider</span>!
      </span>
      <LoginBtn />
    </main>
  );
}
