import NavBar from "@/components/layout/NavBar";
import { cn } from "@/lib/utils/cn";

export default function AppLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="relative w-full h-[calc(100dvh-4rem)] px-4 pb-8 scrollbar-hide overflow-y-scroll">
      {children}

      <NavBar />
    </main>
  );
}
