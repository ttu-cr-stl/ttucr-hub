import NavBar from "@/components/layout/NavBar";


export const revalidate = 1200; // 20 minutes

export default function AppLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="relative w-full h-dvh px-4 scrollbar-hide overflow-y-scroll">
      <div className="pb-20">{children}</div>

      <NavBar />
    </main>
  );
}
