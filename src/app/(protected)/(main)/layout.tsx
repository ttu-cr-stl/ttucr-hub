import NavBar from "@/components/layout/NavBar";

export default function AppLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="relative w-full min-h-dvh px-4 pb-20 z-0">
      <div className="flex flex-col overflow-auto ">{children}</div>

      <NavBar />
    </main>
  );
}
